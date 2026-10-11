"""Privacy-minded helpers for approved Telegram source link discovery.

Never copy message text or attachment content to the website or Gemini.
Telegram collection requires permission and compliance with platform rules.
"""
import hashlib
import ipaddress
import json
import re
import urllib.parse

SOURCE_USERNAME = re.compile(r"^[A-Za-z][A-Za-z0-9_]{4,31}$")
HTTPS_URL = re.compile(r"https://[^\s<>\"']+")

DEFAULT_PUBLISHER_HOSTS = (
    "openai.com",
    "anthropic.com",
    "huggingface.co",
    "github.com",
    "deepmind.google",
    "blog.google",
    "ai.google.dev",
    "developers.googleblog.com",
    "microsoft.com",
    "research.microsoft.com",
    "nvidia.com",
    "mistral.ai",
    "meta.com",
    "ai.meta.com",
    "x.ai",
)

TRACKING_PARAMS = {"fbclid", "gclid", "ref", "source", "mc_cid", "mc_eid"}


def parse_authorized_sources(raw):
    """Require an affirmative permission declaration for every source."""
    try:
        rows = json.loads(raw)
    except (ValueError, TypeError) as exc:
        raise ValueError("TG_APPROVED_SOURCES_JSON must be valid JSON") from exc
    if not isinstance(rows, list) or not 1 <= len(rows) <= 12:
        raise ValueError("Expected JSON list of 1-12 approved public sources")
    seen, result = set(), []
    for entry in rows:
        if not isinstance(entry, dict) or entry.get("permission_confirmed") is not True:
            raise ValueError("Every source requires permission_confirmed=true")
        username = entry.get("username", "")
        if not isinstance(username, str):
            raise ValueError("Source usernames must be strings")
        username = username.strip().lstrip("@")
        if not SOURCE_USERNAME.fullmatch(username):
            raise ValueError("Only valid public Telegram usernames are supported")
        if username.casefold() in seen:
            raise ValueError("Duplicate source usernames")
        seen.add(username.casefold())
        label = entry.get("label", username)
        if not isinstance(label, str) or not 1 <= len(label.strip()) <= 60:
            raise ValueError("Invalid source label")
        result.append({"username": username, "label": label.strip()})
    return result


def parse_allowed_hosts(raw):
    """Restrict discovery to trusted external publishers, not arbitrary URLs."""
    values = raw.split(",") if raw else DEFAULT_PUBLISHER_HOSTS
    hosts = []
    for item in values:
        host = str(item).strip().lower().removeprefix("www.")
        if not host or len(host) > 100 or not re.fullmatch(r"[a-z0-9-]+(?:\.[a-z0-9-]+)+", host):
            raise ValueError("Invalid external publisher domain")
        hosts.append(host)
    return set(hosts)


def clean_publisher_url(raw, allowed_hosts):
    """Canonical HTTPS publisher link or None. NEVER fetch returned URLs."""
    raw = str(raw or "").strip().rstrip(").,;!?]}>،؛״")
    if not raw or len(raw) > 1500:
        return None
    try:
        url = urllib.parse.urlsplit(raw)
        hostname = url.hostname
        if (
            url.scheme != "https"
            or not hostname
            or url.username
            or url.password
            or url.port is not None
        ):
            return None
        hostname = hostname.lower().removeprefix("www.")
        try:
            ipaddress.ip_address(hostname)
            return None
        except ValueError:
            pass
        if hostname not in allowed_hosts and not any(
            hostname.endswith("." + approved) for approved in allowed_hosts
        ):
            return None
        if hostname in {"t.me", "telegram.me"}:
            return None
        query = urllib.parse.parse_qsl(url.query, keep_blank_values=True)
        query = [
            (key, value) for key, value in query
            if not key.lower().startswith("utm_") and key.lower() not in TRACKING_PARAMS
        ]
        return urllib.parse.urlunsplit(
            ("https", hostname, url.path or "/", urllib.parse.urlencode(query), "")
        )[:1000]
    except (ValueError, UnicodeError):
        return None


def discover_publisher_links(message, allowed_hosts, *, limit=3):
    """Extract up to limit publisher links, never message body or media."""
    if limit < 1:
        return []
    raw_text = str(getattr(message, "raw_text", "") or "")[:10000]
    supplied_urls = list(HTTPS_URL.findall(raw_text))
    for entity in getattr(message, "entities", None) or ():
        linked = getattr(entity, "url", None)
        if isinstance(linked, str) and linked.startswith("https://"):
            supplied_urls.append(linked)
    result, seen = [], set()
    for raw in supplied_urls:
        url = clean_publisher_url(raw, allowed_hosts)
        if url and url not in seen:
            seen.add(url)
            result.append(url)
        if len(result) >= limit:
            break
    return result


def stable_source_key(peer_id):
    if not isinstance(peer_id, int) or peer_id == 0:
        raise ValueError("Invalid Telegram peer")
    return hashlib.sha256(("telegram-public:" + str(peer_id)).encode()).hexdigest()[:40]
