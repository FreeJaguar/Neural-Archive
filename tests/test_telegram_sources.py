import json
import unittest
from types import SimpleNamespace
from unittest.mock import patch

from scripts import poll_telegram
from scripts.telegram_source_utils import (
    clean_publisher_url,
    discover_publisher_links,
    parse_allowed_hosts,
    parse_authorized_sources,
    stable_source_key,
)


class TelegramSourceValidationTests(unittest.TestCase):
    def test_public_sources_need_individual_permission(self):
        values = json.dumps([
            {"username": "@MyApprovedChannel", "label": "AI News", "permission_confirmed": True},
            {"username": "AnotherGroup", "permission_confirmed": True},
        ])
        self.assertEqual(len(parse_authorized_sources(values)), 2)
        self.assertEqual(parse_authorized_sources(values)[0]["username"], "MyApprovedChannel")

    def test_disallow_missing_permission_and_unrecognized_users(self):
        for sample in [
            "[]",
            json.dumps([{"username": "PublicChannel"}]),
            json.dumps([{"username": "PublicChannel", "permission_confirmed": "true"}]),
            json.dumps([{"username": "1234567", "permission_confirmed": True}]),
            json.dumps([{"username": "https://t.me/PublicChannel", "permission_confirmed": True}]),
            json.dumps([
                {"username": "PublicChannel", "permission_confirmed": True},
                {"username": "publicchannel", "permission_confirmed": True},
            ]),
        ]:
            with self.subTest(sample=sample), self.assertRaises(ValueError):
                parse_authorized_sources(sample)

    def test_hash_source_key_is_stable_and_hides_numeric_id(self):
        self.assertEqual(stable_source_key(1234567), stable_source_key(1234567))
        self.assertNotIn("1234567", stable_source_key(1234567))
        self.assertNotEqual(stable_source_key(1234567), stable_source_key(1234568))


class PublisherLinkTests(unittest.TestCase):
    def setUp(self):
        self.allowed = parse_allowed_hosts("huggingface.co,github.com,blog.google")

    def test_canonical_https_url_removes_tracking_only(self):
        url = clean_publisher_url(
            "https://www.huggingface.co/blog/intro?utm_source=telegram&lang=en#section",
            self.allowed,
        )
        self.assertEqual(url, "https://huggingface.co/blog/intro?lang=en")

    def test_reject_untrusted_masquerading_internal_and_telegram(self):
        for url in [
            "http://huggingface.co/blog/intro",
            "https://huggingface.co.evil.example/blog/intro",
            "https://evil.example/path",
            "https://t.me/channel/123",
            "https://huggingface.co@evil.example/a",
            "https://user:password@huggingface.co/path",
            "https://127.0.0.1/admin",
            "https://huggingface.co:444/blog",
            "https://huggingface.co/blog/" + "a" * 1600,
        ]:
            with self.subTest(url=url):
                self.assertIsNone(clean_publisher_url(url, self.allowed))

    def test_valid_subdomain_and_official_news_links(self):
        self.assertEqual(
            clean_publisher_url("https://api.github.com/repos/a/b", self.allowed),
            "https://api.github.com/repos/a/b",
        )

    def test_limits_link_count_and_supports_hidden_link_entity(self):
        msg = SimpleNamespace(
            raw_text=(
                "https://huggingface.co/blog/a?utm_source=telegram "
                "https://github.com/googleapis/python-genai/releases/tag/v1 "
                "https://evil.example/no"
            ),
            entities=[SimpleNamespace(url="https://blog.google/technology/ai/story")],
        )
        links = discover_publisher_links(msg, self.allowed, limit=2)
        self.assertEqual(len(links), 2)
        self.assertEqual(links[0], "https://huggingface.co/blog/a")

    def test_no_message_or_media_copy_in_discovery(self):
        msg = SimpleNamespace(
            raw_text="Secret private text without any valid publisher links",
            entities=[], photo=b"private-media",
        )
        self.assertEqual(discover_publisher_links(msg, self.allowed), [])


class CollectorGuardTests(unittest.TestCase):
    def setUp(self):
        self.valid = {
            "TG_API_ID": "123456",
            "TG_API_HASH": "a" * 32,
            "TG_STRING_SESSION": "s" * 128,
            "TG_APPROVED_SOURCES_JSON": json.dumps([
                {"username": "ApprovedChannel", "permission_confirmed": True}
            ]),
            "TG_RIGHTS_ACK": "authorized_channels_only",
            "SUPABASE_URL": "https://sample.supabase.co",
            "SUPABASE_SERVICE_ROLE_KEY": "fake-test-value",
        }

    @patch.dict("os.environ", {}, clear=True)
    def test_no_real_action_without_secrets(self):
        with self.assertRaises(ValueError):
            poll_telegram.validate_environment()

    @patch.dict("os.environ", {}, clear=True)
    def test_no_real_action_without_source_rights_acknowledgement(self):
        env = {**self.valid, "TG_RIGHTS_ACK": ""}
        with patch.dict("os.environ", env, clear=True):
            with self.assertRaisesRegex(ValueError, "permission"):
                poll_telegram.validate_environment()

    @patch.dict("os.environ", {}, clear=True)
    def test_valid_config_loads_without_connecting(self):
        with patch.dict("os.environ", self.valid, clear=True):
            api_id, _, sources, hosts = poll_telegram.validate_environment()
            self.assertEqual(api_id, 123456)
            self.assertEqual(sources[0]["username"], "ApprovedChannel")
            self.assertIn("huggingface.co", hosts)

    def test_missing_rights_reports_stage_without_exposing_values(self):
        from io import StringIO
        from contextlib import redirect_stdout

        env = {**self.valid, "TG_RIGHTS_ACK": "not_confirmed"}
        output = StringIO()
        with patch.dict("os.environ", env, clear=True), redirect_stdout(output):
            code = poll_telegram.main()
        self.assertEqual(code, 1)
        self.assertIn("stage=config.rights_ack", output.getvalue())
        self.assertIn("error_type=ValueError", output.getvalue())
        self.assertNotIn(env["TG_STRING_SESSION"], output.getvalue())
        self.assertNotIn(env["TG_API_HASH"], output.getvalue())

    def test_runtime_error_reports_failing_stage_not_secret(self):
        from io import StringIO
        from contextlib import redirect_stdout

        async def private_error():
            poll_telegram.mark_stage("telegram.resolve_source")
            raise ValueError("PrivateSessionValueShouldNeverAppear")

        output = StringIO()
        with patch.object(poll_telegram, "poll_sources", private_error), redirect_stdout(output):
            code = poll_telegram.main()
        self.assertEqual(code, 1)
        self.assertIn("stage=telegram.resolve_source", output.getvalue())
        self.assertNotIn("PrivateSessionValueShouldNeverAppear", output.getvalue())

    @patch.object(poll_telegram, "rest_request")
    def test_first_run_can_baseline_without_fetching_history(self, mock):
        mock.return_value = []
        self.assertIsNone(poll_telegram.get_cursor(stable_source_key(3)))
        self.assertTrue(mock.call_args.args[0] == "telegram_source_cursors")

    @patch.object(poll_telegram, "rest_request")
    def test_existing_cursor_is_reused(self, mock):
        mock.return_value = [{"last_message_id": 928}]
        self.assertEqual(poll_telegram.get_cursor(stable_source_key(3)), 928)


if __name__ == "__main__":
    unittest.main()
