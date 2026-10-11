#!/usr/bin/env python3
"""One-time LOCAL login utility. Never run this in GitHub Actions.

Run on your own trusted computer, with a dedicated Telegram account.
Its resulting StringSession is an account credential, NOT a bot token.
Paste it directly into the private GitHub Actions repository secret.
Do not post it in chats, screenshots, logs, PRs or source files.
"""

from getpass import getpass
import os

from telethon.sync import TelegramClient
from telethon.sessions import StringSession


def main():
    print("Neural Archive - local Telegram session enrollment")
    print("Use a separate Telegram account with permission for approved channels.")
    print("WARNING: The StringSession grants access to that Telegram account.")
    print("NEVER share this value or commit it to a public repository.\n")

    value = os.getenv("TG_API_ID") or input("Telegram API ID (digits): ").strip()
    try:
        api_id = int(value)
    except ValueError as exc:
        raise SystemExit("Invalid API ID") from exc
    api_hash = os.getenv("TG_API_HASH") or getpass("Telegram API Hash (hidden): ").strip()
    if api_id <= 0 or len(api_hash) != 32:
        raise SystemExit("Invalid API credentials")

    client = TelegramClient(StringSession(), api_id, api_hash)
    try:
        # Telethon prompts for account phone, login code and optional 2FA.
        client.start()
        if not client.is_user_authorized():
            raise SystemExit("Account was not authorized")
        session_value = client.session.save()
        print("\nONLY copy the line below to the GitHub repository secret TG_STRING_SESSION.")
        print("Do not include it in screenshots or messages. Clear your terminal afterward.\n")
        print(session_value)
    finally:
        client.disconnect()


if __name__ == "__main__":
    main()
