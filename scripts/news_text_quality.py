"""Conservative Hebrew news copy checks.

A deterministic gate for obvious Unicode corruption plus invariants for a
separate model proofreading pass. It is not a grammar engine and it does not
certify the factual accuracy of a news summary.
"""

from collections import Counter
from difflib import SequenceMatcher
import re
import unicodedata


# These Unicode characters are formatting controls commonly responsible for
# invisible/reordered text in otherwise ordinary Hebrew news copy. Ordinary
# right-to-left/left-to-right marks and emoji ZWJ sequences are NOT removed.
UNSAFE_FORMAT = set(range(0x202A, 0x202F)) | set(range(0x2066, 0x206A))
UNSAFE_FORMAT.update((0x200B, 0x2060, 0xFEFF))
TECH_TOKEN = re.compile(
    r"(?<![A-Za-z0-9])"
    r"(?:[A-Za-z][A-Za-z0-9]*(?:[._-][A-Za-z0-9]+)*(?:\+\+)?"
    r"|\d+(?:[.,]\d+)*(?:%|×)?)"
)
REPEATED = re.compile(r"(?i)(?<!\w)([\w]{3,})\s+\1(?!\w)")
HEBREW = re.compile(r"[\u05D0-\u05EA]")


def clean_spacing(value):
    """Normalize whitespace only. Do not silently mutate technical glyphs."""
    return " ".join(str(value or "").split())


def inspect_text(value):
    """Return stable machine-readable anomaly codes without content in logs."""
    issues = set()
    if not isinstance(value, str):
        return ["not_text"]
    text = value
    if REPEATED.search(text):
        issues.add("repeated_word")

    for i, char in enumerate(text):
        cp = ord(char)
        category = unicodedata.category(char)

        if cp == 0xFFFD:
            issues.add("replacement_character")
        if cp == 0x25A1 and (
            (i > 0 and HEBREW.fullmatch(text[i - 1])) or
            (i + 1 < len(text) and HEBREW.fullmatch(text[i + 1]))
        ):
            issues.add("missing_glyph")
        # Cantillation signs are not normal typography in AI/tech news.
        # Standard Hebrew vowels, mathematical symbols and technical letters
        # are deliberately allowed.
        if 0x0591 <= cp <= 0x05AF:
            issues.add("hebrew_cantillation")
        if cp in UNSAFE_FORMAT:
            issues.add("invisible_formatting")
        if cp == 0x200D:  # Zero-width joiner. Legal inside emoji sequences.
            previous = text[i - 1] if i else ""
            next_char = text[i + 1] if i + 1 < len(text) else ""
            if not (
                previous and next_char and
                (unicodedata.category(previous) == "So") and
                (unicodedata.category(next_char) == "So")
            ):
                issues.add("invisible_formatting")
        if category in ("Cc", "Cs", "Co", "Cn") and char not in ("\n", "\t"):
            issues.add("invalid_unicode_control")
        if category.startswith("M") and not (0x0591 <= cp <= 0x05AF):
            position = i - 1
            while position >= 0 and unicodedata.category(text[position]).startswith("M"):
                position -= 1
            if position < 0 or not unicodedata.category(text[position]).startswith(("L", "N")):
                issues.add("orphan_combining_mark")

    return sorted(issues)


def inspect_copy(title, summary):
    issues = {
        *("title:" + issue for issue in inspect_text(title)),
        *("summary:" + issue for issue in inspect_text(summary)),
    }
    if len(HEBREW.findall(title or "")) < 2:
        issues.add("title:no_hebrew")
    if len(HEBREW.findall(summary or "")) < 4:
        issues.add("summary:no_hebrew")
    if not (8 <= len(title or "") <= 180):
        issues.add("title:invalid_length")
    if not (30 <= len(summary or "") <= 1200):
        issues.add("summary:invalid_length")
    return sorted(issues)


def protected_tokens(title, summary):
    """Keep English technical names, version numbers and numeric facts intact."""
    combined = (title or "") + " " + (summary or "")
    return Counter(token.casefold() for token in TECH_TOKEN.findall(combined))


def inspect_revision(old_title, old_summary, new_title, new_summary):
    """Reject high-risk edits; a model's claim of 'proofread' is insufficient."""
    issues = set(inspect_copy(new_title, new_summary))
    if protected_tokens(old_title, old_summary) != protected_tokens(new_title, new_summary):
        issues.add("technical_tokens_changed")

    old = clean_spacing(old_title + " " + old_summary)
    new = clean_spacing(new_title + " " + new_summary)
    if not old or not new:
        issues.add("empty_revision")
    else:
        if SequenceMatcher(None, old, new, autojunk=False).ratio() < 0.67:
            issues.add("large_rewrite")
        if len(new) > len(old) * 1.4 + 45:
            issues.add("excessive_expansion")
    return sorted(issues)


def editorial_decision(old_title, old_summary, new_title, new_summary, needs_review=False):
    """Return final copy, state and diagnostic codes.

    A potentially distorted revision does not replace the original. The item
    must be stored as a draft and explicitly edited by the administrator.
    """
    original_issues = inspect_copy(old_title, old_summary)
    candidate_title = clean_spacing(new_title)
    candidate_summary = clean_spacing(new_summary)
    candidate_issues = inspect_revision(
        old_title, old_summary, candidate_title, candidate_summary
    )

    if needs_review or candidate_issues:
        notes = sorted(set(original_issues + candidate_issues))
        if needs_review:
            notes.append("model_requested_review")
        return {
            "title": old_title,
            "summary": old_summary,
            "state": "needs_review",
            "issues": sorted(set(notes)),
        }

    changed = candidate_title != old_title or candidate_summary != old_summary
    return {
        "title": candidate_title,
        "summary": candidate_summary,
        "state": "corrected" if changed else "passed",
        "issues": original_issues,
    }
