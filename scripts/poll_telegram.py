#!/usr/bin/env python3
"""Opt-in Telegram link discovery on short-lived GitHub Actions runners.

Only approved public channel/group usernames; stores source pointers and
official publisher links, not chat messages, media or AI-generated content.
No user content is sent to Gemini. No news is published by this collector.
"""

import asyncio
from datetime import datetime, timezone
import json
import os
import urllib.error
import urllib.parse
import urllib.request

from scripts.telegram_source_utils import (
    discover_publisher_links, parse_allowed_hosts, parse_authorized_sources,
    stable_source_key,
)

MAX_MESSAGES_PER_SOURCE = 60
MAX_LINKS_PER_MESSAGE = 3
MAX_NOTIFICATIONS = 8


def rest_request(table, method="GET", *, params=None, payload=None, preference=None):
    base = os.environ["SUPABASE_URL"].rstrip("/")
    parsed = urllib.parse.urlsplit(base)
    if (
        parsed.scheme != "https"
        or not parsed.hostname
        or not parsed.hostname.endswith(".supabase.co")
        or parsed.port is not None
        or parsed.path not in ("", "/")
        or parsed.query
        or parsed.fragment
    ):
        raise ValueError("Expected a genuine HTTPS Supabase project URL")

    api_key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    url = base + "/rest/v1/" + table
    if params:
        url += "?" + urllib.parse.urlencode(params)
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8") if payload is not None else None
    headers = {
        "apikey": api_key,
        "Authorization": "Bearer " + api_key,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "NeuralArchiveTelegramLinkCollector/1.0",
    }
    if preference:
        headers["Prefer"] = preference
    request = urllib.request.Request(url, method=method, data=data, headers=headers)
    with urllib.request.urlopen(request, timeout=25) as response:
        response_data = response.read(150000)
    return json.loads(response_data) if response_data else []


def get_cursor(source_key):
    items = rest_request(
        "telegram_source_cursors", params={
            "select": "last_message_id",
            "source_key": "eq." + source_key,
            "limit": "1",
        },
    )
    return int(items[0]["last_message_id"]) if items else None


def save_cursor(source_key, source_label, last_message_id):
    if last_message_id < 0:
        raise ValueError("Invalid cursor")
    records = rest_request(
        "telegram_source_cursors", method="POST",
        params={"on_conflict": "source_key", "select": "last_message_id"},
        payload={
            "source_key": source_key,
            "source_label": source_label,
            "last_message_id": last_message_id,
            "last_polled_at": datetime.now(timezone.utc).isoformat(),
        },
        preference="resolution=merge-duplicates,return=representation",
    )
    if not records or int(records[0]["last_message_id"]) != last_message_id:
        raise ValueError("Source cursor was not persisted")


def store_discovered_link(source_key, source_label, message_id, username, external_url):
    results = rest_request(
        "telegram_discovered_links", method="POST",
        params={"on_conflict": "external_url", "select": "id"},
        payload={
            "source_key": source_key,
            "source_label": source_label,
            "message_id": message_id,
            "source_message_url": "https://t.me/" + username + "/" + str(message_id),
            "external_url": external_url,
        },
        preference="resolution=ignore-duplicates,return=representation",
    )
    return bool(results)


def notify_new_links():
    """Send only links to the existing admin bot, without Telegram post text."""
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat = os.environ.get("TELEGRAM_ADMIN_CHAT_ID")
    if not token or not chat:
        print("Admin notification is not configured; links remain in the private inbox.")
        return 0

    items = rest_request(
        "telegram_discovered_links", params={
            "select": "id,source_label,source_message_url,external_url",
            "notified_at": "is.null",
            "order": "discovered_at.asc,id.asc",
            "limit": str(MAX_NOTIFICATIONS),
        },
    )
    sent = 0
    for item in items:
        message = (
            "🔎 קישור חדש ממקור Telegram מורשה\n\n"
            "מקור: " + str(item["source_label"])[:60] + "\n"
            "קישור לידיעה המקורית:\n" + str(item["external_url"])[:1000] + "\n\n"
            "הודעת מקור:\n" + str(item["source_message_url"])[:160] + "\n\n"
            "זהו קישור בלבד, לא תקציר AI ולא ידיעה מאושרת.\n"
            "אפשר לעיין במקור ולהוסיף ידיעה דרך /add."
        )
        body = json.dumps({
            "chat_id": chat,
            "text": message,
            "link_preview_options": {"is_disabled": True},
        }, ensure_ascii=False).encode("utf-8")
        req = urllib.request.Request(
            "https://api.telegram.org/bot" + token + "/sendMessage",
            data=body, method="POST",
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            answer = json.loads(response.read(15000))
        if not answer.get("ok"):
            raise ValueError("Telegram notification failed")
        rest_request(
            "telegram_discovered_links", method="PATCH",
            params={"id": "eq." + str(item["id"]), "notified_at": "is.null"},
            payload={"notified_at": datetime.now(timezone.utc).isoformat()},
            preference="return=minimal",
        )
        sent += 1
    return sent


def validate_environment():
    required = (
        "TG_API_ID", "TG_API_HASH", "TG_STRING_SESSION",
        "TG_APPROVED_SOURCES_JSON", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY",
    )
    absent = [name for name in required if not os.getenv(name)]
    if absent:
        raise ValueError("Missing GitHub Actions secrets: " + ", ".join(absent))

    if os.getenv("TG_RIGHTS_ACK") != "authorized_channels_only":
        raise ValueError("Source permissions not confirmed; collector remains disabled")

    api_id = os.environ["TG_API_ID"]
    api_hash = os.environ["TG_API_HASH"]
    if not api_id.isdecimal() or int(api_id) <= 0:
        raise ValueError("Invalid TG_API_ID")
    if len(api_hash) != 32 or not all(c in "0123456789abcdefABCDEF" for c in api_hash):
        raise ValueError("Invalid TG_API_HASH")
    if len(os.environ["TG_STRING_SESSION"]) < 100:
        raise ValueError("Invalid TG_STRING_SESSION")

    sources = parse_authorized_sources(os.environ["TG_APPROVED_SOURCES_JSON"])
    allowed_hosts = parse_allowed_hosts(os.getenv("TG_ALLOWED_PUBLISHER_HOSTS", ""))
    return int(api_id), api_hash, sources, allowed_hosts


async def poll_sources():
    api_id, api_hash, sources, allowed_hosts = validate_environment()

    # No Telethon connection before permission checks and secret validation.
    from telethon import TelegramClient
    from telethon.sessions import StringSession

    client = TelegramClient(
        StringSession(os.environ["TG_STRING_SESSION"]), api_id, api_hash,
        request_retries=2, connection_retries=2, retry_delay=1,
        flood_sleep_threshold=5,
    )
    scanned = 0
    discovered = 0
    baselined = 0

    async with client:
        if not await client.is_user_authorized():
            raise ValueError("Session revoked or no longer authorized")

        for source in sources:
            entity = await client.get_entity("@" + source["username"])
            # Deny public user accounts, bots, and private ID-based lookups.
            if not (getattr(entity, "broadcast", False)
                    or getattr(entity, "megagroup", False)):
                raise ValueError("Configured source is not a public group/channel")
            actual_username = str(getattr(entity, "username", "") or "")
            if actual_username.casefold() != source["username"].casefold():
                raise ValueError("Telegram username did not resolve as configured")
            source_key = stable_source_key(entity.id)
            cursor = get_cursor(source_key)

            if cursor is None:
                # First run deliberately starts from now: no historical scraping.
                recent = await client.get_messages(entity, limit=1)
                latest = int(recent[0].id) if recent else 0
                save_cursor(source_key, source["label"], latest)
                baselined += 1
                continue

            async for message in client.iter_messages(
                entity, min_id=cursor, reverse=True, limit=MAX_MESSAGES_PER_SOURCE
            ):
                if message.id <= cursor:
                    continue
                urls = discover_publisher_links(
                    message, allowed_hosts, limit=MAX_LINKS_PER_MESSAGE
                )
                for url in urls:
                    if store_discovered_link(
                        source_key, source["label"], message.id, source["username"], url
                    ):
                        discovered += 1
                save_cursor(source_key, source["label"], int(message.id))
                scanned += 1

    notified = notify_new_links()
    # No post text, account identifiers, URLs, tokens or sessions are logged.
    print(
        "Authorized sources: " + str(len(sources))
        + " | new baselines: " + str(baselined)
        + " | new messages: " + str(scanned)
        + " | new links: " + str(discovered)
        + " | admin notifications: " + str(notified)
    )


def main():
    try:
        asyncio.run(poll_sources())
    except (ValueError, KeyError, urllib.error.URLError, TimeoutError) as error:
        # Avoid printing exception bodies from secret-bearing network requests.
        print("Telegram discovery stopped safely: " + type(error).__name__)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
