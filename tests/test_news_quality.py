import json
import unittest
from datetime import datetime, timezone
from unittest.mock import Mock, patch

from scripts.news_text_quality import (
    editorial_decision,
    editorial_reason_decision,
    inspect_copy,
    inspect_text,
    protected_tokens,
)
from scripts.news_proofreader import proofread_candidate
from scripts import ingest_news as ingest


ARTICLE = {
    "title": "An AI model is released",
    "excerpt": "The company introduced a multilingual model with an updated API.",
    "source_name": "Official publisher",
    "source_host": "example.com",
    "url": "https://example.com/announcement",
    "published": datetime.now(timezone.utc),
}
ORIGINAL_TITLE = "שוחרר מודל GPT-6 חדש לעיבוד מידע"
ORIGINAL_SUMMARY = "החברה הציגה מודל GPT-6 עם תמיכה ב-C++ וגרסה 2.5 לשימושים מקצועיים."


def mocked_model(title=ORIGINAL_TITLE, summary=ORIGINAL_SUMMARY, needs_review=False,
                 reason="המידע עשוי להיות רלוונטי לפיתוח מודלים חדשים."):
    return {
        "candidates": [{
            "content": {
                "parts": [{
                    "text": json.dumps({
                        "title_he": title,
                        "summary_he": summary,
                        "reason_he": reason,
                        "needs_review": needs_review,
                    })
                }]
            }
        }]
    }


def analysis(title=ORIGINAL_TITLE, summary=ORIGINAL_SUMMARY):
    return {
        "is_ai": True,
        "score": 79,
        "confidence": 75,
        "title": title,
        "summary": summary,
        "category": "models",
        "reason": "המידע עשוי להיות רלוונטי לפיתוח מודלים חדשים.",
    }


def proof(analysis_input, response=None, failure=None):
    mock = Mock(return_value=response or mocked_model())
    if failure:
        mock.side_effect = failure
    result = proofread_candidate(
        ARTICLE, analysis_input, request_json=mock,
        api_base="https://example.invalid/models/", model="test-model",
        api_key="unused-private-test-key",
    )
    return result, mock


class TextChecksTests(unittest.TestCase):
    def test_detects_replacement_and_unsafe_controls(self):
        self.assertIn("replacement_character", inspect_text("המודל � החדש"))
        self.assertIn("invisible_formatting", inspect_text("טכנולוגיה\u200Bחדשה"))
        self.assertIn("invisible_formatting", inspect_text("\u202Eטקסט"))
        self.assertIn("invalid_unicode_control", inspect_text("חדשות\x01טכנולוגיה"))

    def test_catches_hebrew_cantillation_and_orphan_marks(self):
        self.assertIn("hebrew_cantillation", inspect_text("הידיעה ֣על המודל"))
        self.assertIn("orphan_combining_mark", inspect_text("תקלה \u05b0בטקסט"))
        self.assertIn("hebrew_cantillation", inspect_text("ע\u05a3ל"))

    def test_allows_valid_hebrew_vowels_emoji_and_math(self):
        title = "בְּדִיקַת מודל חדש"
        summary = "מחקר חדש על GPT-6, Claude 4.5, C++ ו-O(n²) עם 👩‍💻 ושימושים מקצועיים."
        self.assertEqual(inspect_copy(title, summary), [])

    def test_does_not_treat_a_math_symbol_as_unknown_glyph(self):
        self.assertEqual(inspect_text("עבור המשוואה A □ B הוצג מודל"), [])

    def test_repeated_words_are_flagged(self):
        self.assertIn("repeated_word", inspect_text("המודל המודל החדש זמין"))

    def test_typographical_revision_is_accepted_without_changing_brands(self):
        source = "החברה הציגה מודל GPT-6 עם  תמיכה ב-C++ וגרסה 2.5 לשימושים מקצועיים."
        result = editorial_decision(
            ORIGINAL_TITLE, source, ORIGINAL_TITLE, ORIGINAL_SUMMARY
        )
        self.assertEqual(result["state"], "corrected")
        self.assertEqual(protected_tokens(ORIGINAL_TITLE, source),
                         protected_tokens(result["title"], result["summary"]))

    def test_formula_and_code_notation_must_be_preserved(self):
        old_summary = "נמצא שיפור בביצועים של O(n²) בגרסה C# של המערכת החדשה."
        for revised in [
            old_summary.replace("O(n²)", "O(n³)"),
            old_summary.replace("C#", "C++"),
        ]:
            result = editorial_decision(
                ORIGINAL_TITLE, old_summary, ORIGINAL_TITLE, revised
            )
            self.assertEqual(result["state"], "needs_review")
            self.assertIn("technical_tokens_changed", result["issues"])

    def test_factual_number_change_fails_closed(self):
        changed = ORIGINAL_SUMMARY.replace("2.5", "3.0")
        result = editorial_decision(ORIGINAL_TITLE, ORIGINAL_SUMMARY,
                                    ORIGINAL_TITLE, changed)
        self.assertEqual(result["state"], "needs_review")
        self.assertIn("technical_tokens_changed", result["issues"])
        self.assertEqual(result["summary"], ORIGINAL_SUMMARY)

    def test_safe_fix_removes_malformed_hebrew_character(self):
        corrupted = "החברה הציגה מודל GPT-6 ֣עם תמיכה ב-C++ וגרסה 2.5 לשימושים מקצועיים."
        result = editorial_decision(ORIGINAL_TITLE, corrupted,
                                    ORIGINAL_TITLE, ORIGINAL_SUMMARY)
        self.assertEqual(result["state"], "corrected")
        self.assertEqual(result["summary"], ORIGINAL_SUMMARY)


    def test_reason_corruption_is_rejected_or_repaired(self):
        reason = "המידע עשוי להיות רלוונטי ֣לפיתוח מודלים חדשים."
        bad = editorial_reason_decision(reason, reason)
        self.assertEqual(bad["state"], "needs_review")
        good = editorial_reason_decision(
            reason, "המידע עשוי להיות רלוונטי לפיתוח מודלים חדשים."
        )
        self.assertEqual(good["state"], "corrected")

    def test_proofreading_cannot_silently_remove_evidence_warning(self):
        reason = "לא נמצא במקור ציטוט ראיה תקף. נדרש אימות ידני."
        changed = "זוהי ידיעה מהימנה במיוחד וניתן לאשר אותה ללא חשש."
        result = editorial_reason_decision(reason, changed)
        self.assertEqual(result["state"], "needs_review")
        self.assertIn("reason:warning_removed", result["issues"])

    def test_large_model_rewrite_is_not_allowed(self):
        proposed = "מוצר GPT-6 זמין לציבור הרחב, וגרסה 2.5 מאפשרת להפעיל C++ ולבדוק ביצועים."
        result = editorial_decision(ORIGINAL_TITLE, ORIGINAL_SUMMARY,
                                    ORIGINAL_TITLE, proposed)
        self.assertEqual(result["state"], "needs_review")


class ProofreaderWorkflowTests(unittest.TestCase):
    def test_clean_copy_is_kept_and_gemini_called_once(self):
        result, mock = proof(analysis())
        self.assertEqual(result["language_quality"], "passed")
        self.assertEqual(result["title"], ORIGINAL_TITLE)
        self.assertEqual(mock.call_count, 1)

    def test_corrupt_text_is_corrected_in_independent_pass(self):
        corrupted = ORIGINAL_SUMMARY.replace("עם תמיכה", "֣עם תמיכה")
        result, _ = proof(
            analysis(summary=corrupted),
            mocked_model(summary=ORIGINAL_SUMMARY),
        )
        self.assertEqual(result["language_quality"], "corrected")
        self.assertNotIn("֣", result["summary"])


    def test_broken_explanation_is_corrected_before_telegram(self):
        flawed = "המידע עשוי להיות רלוונטי ֣לפיתוח מודלים חדשים."
        result, _ = proof(
            {**analysis(), "reason": flawed},
            mocked_model(reason="המידע עשוי להיות רלוונטי לפיתוח מודלים חדשים."),
        )
        self.assertEqual(result["language_quality"], "corrected")
        self.assertNotIn("֣", result["reason"])

    def test_dangerous_edit_is_blocked_and_keeps_original(self):
        result, _ = proof(
            analysis(),
            mocked_model(summary=ORIGINAL_SUMMARY.replace("GPT-6", "GPT-7")),
        )
        self.assertEqual(result["language_quality"], "needs_review")
        self.assertEqual(result["summary"], ORIGINAL_SUMMARY)

    def test_quality_service_unavailable_never_approves_news(self):
        result, _ = proof(analysis(), failure=TimeoutError("timeout"))
        self.assertEqual(result["language_quality"], "needs_review")
        self.assertIn("proofreader_unavailable", result["language_issues"])

    def test_model_can_request_manual_review(self):
        result, _ = proof(analysis(), mocked_model(needs_review=True))
        self.assertEqual(result["language_quality"], "needs_review")

    def test_irrelevant_story_is_not_sent_for_extra_ai_review(self):
        data = {**analysis(), "is_ai": False}
        result, mock = proof(data)
        self.assertEqual(result["language_quality"], "not_checked")
        mock.assert_not_called()

    @patch.object(ingest, "supabase_request")
    def test_unresolved_language_news_is_draft_not_pending(self, mock):
        mock.return_value = [{"id": 55, "status": "draft"}]
        article = {**ARTICLE, "source_kind": "publisher_feed"}
        result = ingest.insert_candidate(
            article, {**analysis(), "language_quality": "needs_review",
                      "language_issues": ["summary:replacement_character"]},
        )
        self.assertEqual(result["status"], "draft")
        record = mock.call_args.args[2]
        self.assertEqual(record["status"], "draft")
        self.assertEqual(record["language_quality_state"], "needs_review")

    @patch.object(ingest, "supabase_request")
    def test_clean_news_is_pending_only(self, mock):
        mock.return_value = [{"id": 56, "status": "pending"}]
        ingest.insert_candidate(
            ARTICLE, {**analysis(), "language_quality": "passed", "language_issues": []},
        )
        self.assertEqual(mock.call_args.args[2]["status"], "pending")

    @patch.dict("os.environ", {"TELEGRAM_BOT_TOKEN": "fake", "TELEGRAM_ADMIN_CHAT_ID": "123"})
    @patch.object(ingest, "request_json")
    def test_draft_notification_has_edit_button_but_never_approve(self, mock):
        item = {
            "id": 55, "status": "draft", "language_quality_state": "needs_review",
            "language_quality_issues": ["summary:replacement_character"],
            "title": ORIGINAL_TITLE, "summary": ORIGINAL_SUMMARY,
            "ai_score": 80, "ai_confidence": 30, "ai_rationale": "Short source",
            "source_url": ARTICLE["url"], "ai_evidence": [], "ai_novelty": 60,
            "ai_audience": 80,
        }
        ingest.notify_admin(item)
        payload = mock.call_args.args[2]
        buttons = payload["reply_markup"]["inline_keyboard"][0]
        self.assertEqual(len(buttons), 1)
        self.assertEqual(buttons[0]["callback_data"], "edit:55")
        self.assertIn("טיוטה", payload["text"])


if __name__ == "__main__":
    unittest.main()
