# Neural Archive Telegram News Moderation MVP

The new bot flow provides a private admin moderation queue and a public news page. It does NOT scrape Telegram channels or use AI automatically.

## Set up the database
1. Create a NEW, dedicated Supabase project for Neural Archive; do not reuse unrelated databases. Check project cost before creating.
2. Apply the SQL in supabase/migrations/20261011_news_moderation.sql.
3. In Vercel -> neural-archive -> Settings -> Environment Variables, add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Production. The latter must be the legacy service_role secret JWT, not an anon or publishable key. It must never go in the browser or git.
4. Retain TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET and TELEGRAM_ADMIN_CHAT_ID.
5. Review and merge the feature PR and wait for Vercel deployment.

## Update Telegram webhook
The current Telegram webhook was registered with allowed_updates = ["message"]. Telegram inline moderation buttons require the "callback_query" update too. On your own Windows PowerShell 5.1 computer:

~~~powershell
$token = Read-Host "BotFather token"
$secret = Read-Host "TELEGRAM_WEBHOOK_SECRET"
$body = @{ url="https://neural-archive-two.vercel.app/api/telegram"; secret_token=$secret; allowed_updates=@("message","callback_query"); drop_pending_updates=$false } | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri ("https://api.telegram.org/bot" + $token + "/setWebhook") -ContentType "application/json" -Body $body
Remove-Variable token, secret, body
~~~

The response should contain ok=true and result=true. Do not post tokens in chat or screenshots.

## Telegram commands
- /status checks the bot and database.
- /add URL | Hebrew title | original Hebrew summary: adds a ready-for-review article. Title must have 8-180 chars; summary 30-1200.
- Sending just a web link creates a draft.
- /edit ID | Hebrew title | original Hebrew summary: completes or modifies an unpublished draft.
- /pending: displays the latest 6 pending items with Approve / Reject / Edit buttons.
- Approval publishes the item in /news. Rejection hides it.
- /start or /help: show all commands.

The database table has RLS enabled with no access for anon/authenticated roles. A server-only service role powers moderation and the read-only public /api/news endpoint.

## Boundaries
- No automatic AI processing, Telegram channel scraping, or automatic publishing in this version.
- Copy only authored summaries and links; do not copy channel media without suitable rights.
- Keep the existing admin and webhook secrets configured.
- This MVP supports one administrator.

## Tests
Node.js 22: node --test tests/news-workflow.test.mjs
GitHub Actions runs the tests on the feature branch.
