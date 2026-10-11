# Neural Archive - authorized Telegram link discovery with GitHub Actions

## What it does
- Uses Telethon and a dedicated Telegram account to check explicitly permitted public channels/groups every 30 minutes.
- The first collection stores only a source checkpoint, **never old history**.
- Later runs extract up to three external publisher HTTPS links per new message.
- Stores just source pointer, original publisher URL and cursor in private Supabase tables.
- Sends discovered source links to the existing Neural Archive admin Telegram bot.
- Does NOT copy message bodies, attachments or media; does NOT send Telegram content to Gemini; does NOT publish news automatically.

## Important limits and permissions
Telegram's content-licensing and AI-scraping terms restrict the collection and AI use of content. A public source or membership alone is not authorization. Only add Telegram sources with express permission for the intended use. The required acknowledgement setting enforces deliberate opt-in but does not replace actual permission.

GitHub scheduled jobs can be delayed or skipped. This is not a realtime Telegram listener. GitHub Actions standard hosted runners on a public repository are free under the published GitHub policy, subject to changes and platform limits.

## Setup
1. Obtain written permission for each public source; do not add unapproved sources. Only public usernames are supported, not invitation links or private chat IDs.
2. Apply the database migration at supabase/migrations/20261011_telegram_discovery.sql to the separate Neural Archive Supabase project.
3. Use a dedicated Telegram account; it should join the approved sources. Create a Telegram API ID and API Hash at https://my.telegram.org under API development tools.
4. On a trusted Windows computer, from the project folder, run:
   - py -m pip install -r requirements-telegram.txt
   - py scripts/create_telegram_session.py
5. The local login script asks for Telegram account confirmation and prints a StringSession locally. Never share it, upload it, screenshot it or commit it. Copy it directly into an encrypted GitHub Actions repository secret and clear your terminal afterward.
6. Open https://github.com/FreeJaguar/Neural-Archive/settings/secrets/actions and add the following secrets:
   - TG_API_ID : numeric API ID from my.telegram.org
   - TG_API_HASH : 32-character API Hash from my.telegram.org
   - TG_STRING_SESSION : output from your locally generated session
   - TG_APPROVED_SOURCES_JSON : JSON array of permitted source usernames
   - TG_RIGHTS_ACK : set to authorized_channels_only only once actual permission is confirmed
7. TG_APPROVED_SOURCES_JSON example below is a placeholder, NOT a real source permission:

       [{"username":"YourAuthorizedChannel","label":"Official AI updates","permission_confirmed":true}]

8. Reuse the existing GitHub Actions secrets SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, TELEGRAM_BOT_TOKEN and TELEGRAM_ADMIN_CHAT_ID. Never add their values to any tracked project files.
9. Optional Actions repository variable TG_ALLOWED_PUBLISHER_HOSTS sets comma-separated publisher hostnames such as openai.com,anthropic.com,huggingface.co,github.com,blog.google. A safe predefined publisher list is used if omitted.

## Test and activate
- Open Actions > Telegram Source Discovery > Run workflow, select main and mode validate. This tests code only and does not access Telegram.
- Once secrets and source permission are configured, choose mode collect to initialize the baseline on Telegram. The first poll deliberately skips previously published posts.
- Repeat collect after a new permitted-channel post to test link discovery and bot alerting.
- Only then, if you want scheduled polling, add GitHub Actions repository VARIABLE TG_SOURCE_POLL_ENABLED with the exact value true. The scheduled workflow starts at minute 13 and 43 of each hour. With a missing or false variable, the schedule does not poll any sources.
- To stop, set the variable false or remove it.
- If the account session is compromised, revoke it in Telegram Settings > Devices and remove the secret from GitHub.

## Security and publishing separation
- Sessions, passwords, message bodies and group media are never stored in Supabase or forwarded to Gemini.
- The private Supabase discovery inbox is telegram_discovered_links. Existing public news_items and the existing editorial approval workflow remain unchanged.
- Deduplication by external URL prevents repeated alerts even if multiple approved channels share the same article.
- Each source keeps a cursor. The cursor only advances after staging the permitted external links for the message; a failed database write can be retried.
- Discovered source links are NOT treated as verified facts. Further summary generation must use independently permitted publisher content and continue to require admin approval.
- Protect the main branch and never expose sensitive GitHub Actions secrets through pull-request jobs.
