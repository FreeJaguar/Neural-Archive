# Neural Archive Telegram Bot - connection setup

This branch adds a minimal Vercel Serverless Function at `/api/telegram`. It receives private Telegram messages, supports `/start`, `/status` and `/help`, and does NOT collect channel posts, store messages, or publish news.

## 1. Create deployment secrets
In Vercel -> neural-archive -> Settings -> Environment Variables, add these for Production and Preview as relevant:
- `TELEGRAM_BOT_TOKEN`: the private token issued by @BotFather. NEVER share it or commit it.
- `TELEGRAM_WEBHOOK_SECRET`: a fresh secret of 32+ characters drawn from `A-Z a-z 0-9 _ -`. Example generation (Windows PowerShell):
  ```powershell
  $bytes = [byte[]]::new(32); [Security.Cryptography.RandomNumberGenerator]::Fill($bytes); [Convert]::ToHexString($bytes)
  ```
- Later, after the first `/start` test: `TELEGRAM_ADMIN_CHAT_ID` (your numeric private chat ID).

Changes to environment variables require a redeployment to take effect. Do not place tokens in GitHub Actions logs, query strings published anywhere, or frontend JS.

## 2. Deploy this branch
After reviewing the pull request, merge and deploy, or use a protected Preview environment configured with the required secrets. Verify `https://neural-archive-two.vercel.app/api/telegram` responds to GET with `{"ok":true,"service":"neural-archive-telegram"}`.

## 3. Register Telegram webhook on your own machine
Do this LOCALLY so the token is never sent to this chat or placed in your repository.
PowerShell:
```powershell
$token = Read-Host "Paste BotFather token"
$secret = Read-Host "Paste TELEGRAM_WEBHOOK_SECRET"
$uri = "https://api.telegram.org/bot$token/setWebhook"
$body = @{ url="https://neural-archive-two.vercel.app/api/telegram"; secret_token=$secret; allowed_updates=@("message"); drop_pending_updates=$true }
Invoke-RestMethod -Method Post -Uri $uri -ContentType "application/json" -Body ($body | ConvertTo-Json -Depth 5)
Remove-Variable token,secret,uri,body
```
Expected response includes `ok: true`. IMPORTANT: `drop_pending_updates=true` clears earlier queued messages.

## 4. Bootstrap admin
Open @neuralarchivenewsbot in Telegram and send `/start`. The bot replies with your own numeric private chat ID. Enter it as `TELEGRAM_ADMIN_CHAT_ID` in Vercel and redeploy, then send `/status`. Only messages from that chat will be handled thereafter.

## Troubleshooting
- No response: check deployment status, environment variables, and `getWebhookInfo` (run locally with your secret token).
- `403`: missing/incorrect `secret_token` in webhook registration.
- `503`: missing deployment secrets or deployment not restarted after adding them.
- Never post a token in a screenshot, ticket, chat or GitHub repository. If exposed, use BotFather `/revoke` to rotate it immediately.

## Next phase
Add persistent feed/news review queues, primary-source ingestion with appropriate rights, Telegram inline moderation buttons, and a protected administrative UI. This bootstrap intentionally performs none of those actions.
