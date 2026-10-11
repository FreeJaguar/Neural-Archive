import importlib.util
import json
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from unittest.mock import patch

MODULE = Path(__file__).resolve().parents[1] / "scripts" / "ingest_news.py"
spec = importlib.util.spec_from_file_location("ingest_news", MODULE)
ingest = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ingest)


class FeedParserTests(unittest.TestCase):
    def setUp(self):
        self.feed = ingest.FEEDS[0]
        self.now = datetime.now(timezone.utc)

    def test_rss_with_guid_and_html_excerpt(self):
        date = self.now.strftime("%a, %d %b %Y %H:%M:%S +0000")
        rss = f"""<rss version="2.0"><channel>
            <item>
              <title>AI model release</title>
              <guid isPermaLink="true">https://huggingface.co/blog/new-model</guid>
              <description><![CDATA[<p>New <b>AI</b> model tested.</p>]]></description>
              <pubDate>{date}</pubDate>
            </item>
        </channel></rss>"""
        results = ingest.parse_feed(rss.encode(), self.feed)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["url"], "https://huggingface.co/blog/new-model")
        self.assertEqual(results[0]["excerpt"], "New AI model tested.")

    def test_atom_github_releases(self):
        date = self.now.isoformat().replace("+00:00", "Z")
        feed = ingest.FEEDS[1]
        atom = f"""<feed xmlns="http://www.w3.org/2005/Atom">
        <entry>
          <title>Transformers 5.1</title>
          <link rel="alternate" href="https://github.com/huggingface/transformers/releases/tag/v5.1"/>
          <summary type="html">Library features improve agent compatibility.</summary>
          <updated>{date}</updated>
        </entry></feed>"""
        results = ingest.parse_feed(atom.encode(), feed)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["source_name"], "Hugging Face Transformers releases")

    def test_rejects_foreign_links_and_old_posts(self):
        date = self.now.strftime("%a, %d %b %Y %H:%M:%S +0000")
        rss = f"""<rss><channel><item>
          <title>External article</title><link>https://evil.example/news</link>
          <pubDate>{date}</pubDate></item>
        </channel></rss>"""
        self.assertEqual(ingest.parse_feed(rss.encode(), self.feed), [])
        past = (self.now - timedelta(days=15)).strftime("%a, %d %b %Y %H:%M:%S +0000")
        rss = rss.replace("https://evil.example/news", "https://huggingface.co/blog/old")
        rss = rss.replace(date, past)
        self.assertEqual(ingest.parse_feed(rss.encode(), self.feed), [])

    def test_tracking_params_removed_but_valid_params_preserved(self):
        self.assertEqual(
            ingest.canonical_url("https://huggingface.co/blog/abc?utm_source=tg&lang=en#top", self.feed),
            "https://huggingface.co/blog/abc?lang=en"
        )
        self.assertIsNone(ingest.canonical_url("http://huggingface.co/blog/abc", self.feed))
        self.assertIsNone(ingest.canonical_url("https://huggingface.co.evil.example/blog/abc", self.feed))
        self.assertIsNone(ingest.canonical_url("https://huggingface.co@evil.example/blog/abc", self.feed))
        self.assertIsNone(ingest.canonical_url("https://huggingface.co/private/abc", self.feed))


class ClassificationTests(unittest.TestCase):
    def setUp(self):
        self.article = {
            "source_name": "Hugging Face Blog",
            "published": datetime.now(timezone.utc),
            "url": "https://huggingface.co/blog/new-ai-model",
            "title": "New multilingual AI model released",
            "excerpt": "The blog announced a new multilingual model.",
            "source_host": "huggingface.co",
        }
        self.good = {
            "is_ai": True,
            "score": 89,
            "confidence": 93,
            "category": "models",
            "title_he": "מודל בינה מלאכותית רב לשוני חדש",
            "summary_he": "בפרסום רשמי הוצג מודל רב לשוני חדש, עם מיקוד בשפה ובשימושים מעשיים.",
            "reason_he": "הכרזת מודל רשמית רלוונטית לקטלוג.",
        }

    @patch.dict("os.environ", {"GEMINI_API_KEY": "test-key"})
    @patch.object(ingest, "request_json")
    def test_structured_ai_response(self, mock):
        mock.return_value = {"candidates": [{"content": {"parts": [{"text": json.dumps(self.good)}]}}]}
        result = ingest.classify_article(self.article)
        self.assertEqual(result["score"], 89)
        self.assertEqual(result["category"], "models")
        url, method, *_ = mock.call_args.args
        self.assertEqual(method, "POST")
        self.assertIn("gemini-3.5-flash-lite", url)

    @patch.dict("os.environ", {"GEMINI_API_KEY": "test-key"})
    @patch.object(ingest, "request_json")
    def test_rejects_invalid_confidence(self, mock):
        response = {**self.good, "confidence": 150}
        mock.return_value = {"candidates": [{"content": {"parts": [{"text": json.dumps(response)}]}}]}
        with self.assertRaises(ValueError):
            ingest.classify_article(self.article)

    @patch.object(ingest, "supabase_request")
    def test_high_score_still_goes_to_pending(self, mock):
        response = {**self.good, "score": 100, "confidence": 100}
        mock.return_value = [{"id": 12, "status": "pending"}]
        saved = ingest.insert_candidate(self.article, {
            "is_ai": True,
            "score": 100,
            "confidence": 100,
            "category": "models",
            "title": response["title_he"],
            "summary": response["summary_he"],
            "reason": response["reason_he"],
        })
        self.assertEqual(saved["status"], "pending")
        self.assertEqual(mock.call_args.args[2]["status"], "pending")
        self.assertEqual(mock.call_args.args[2]["submitted_by_chat_id"], "automation:rss")

    @patch.object(ingest, "supabase_request")
    def test_irrelevant_article_is_rejected(self, mock):
        mock.return_value = [{"id": 12, "status": "rejected"}]
        ingest.insert_candidate(self.article, {
            "is_ai": False, "score": 99, "confidence": 95, "category": "other",
            "title": self.good["title_he"], "summary": self.good["summary_he"],
            "reason": "Not relevant",
        })
        self.assertEqual(mock.call_args.args[2]["status"], "rejected")

    @patch.dict("os.environ", {
        "TELEGRAM_BOT_TOKEN": "fake-test-token",
        "TELEGRAM_ADMIN_CHAT_ID": "123456",
    })
    @patch.object(ingest, "request_json")
    def test_notification_buttons_match_existing_webhook(self, mock):
        ingest.notify_admin({
            "id": 25,
            "title": self.good["title_he"],
            "summary": self.good["summary_he"],
            "source_url": self.article["url"],
            "ai_score": 89,
            "ai_confidence": 93,
            "ai_rationale": "Official AI announcement",
        })
        payload = mock.call_args.args[2]
        buttons = payload["reply_markup"]["inline_keyboard"][0]
        self.assertEqual([b["callback_data"] for b in buttons],
                         ["approve:25", "reject:25", "edit:25"])


if __name__ == "__main__":
    unittest.main()
