# AI News pilot - setup

This branch adds a manually reviewed AI news discovery workflow.

## Scope
- Reads article headlines and short excerpts from official Hugging Face Blog RSS and two upstream GitHub release Atom feeds.
- Requests structured Hebrew prioritization and summaries from Gemini 3.5 Flash-Lite.
- Writes relevant items to the existing Supabase moderation queue as PENDING. Low-relevance items are REJECTED.
- Optionally notifies the already-connected administrator through Telegram with the existing approve/reject/edit buttons.
- Processes at most four new source URLs per run, within a 96-hour lookback.
- Does NOT collect Telegram channel posts, articles or media, and does NOT publish automatically.

## Before activation
1. Review AI API privacy and billing terms and obtain a Gemini API key from Google AI Studio.
2. Add appropriate private repository Actions secrets for the AI provider, the existing Supabase instance, and the Telegram bot. Never commit their values. The required environment variable names are shown in the workflow file.
3. Apply supabase/migrations/20261011_ai_triage_metadata.sql to the dedicated Neural Archive database.
4. Review and merge the feature branch.
5. Run the AI News Pilot workflow manually from GitHub Actions to validate the real connection.
6. Compare candidate summaries with their original source links before approving any item.
7. To enable the twice-hourly schedule, create the GitHub Actions repository variable NEWS_INGEST_ENABLED with value true. Use false to pause it.

## Quality policy
AI scores indicate likely newsworthiness, not factual verification. During the pilot all relevant items require explicit administrator approval. Calibrate with 20-30 candidates before considering an automatic publishing threshold. Only exact source URL duplication is handled in this phase.

## Tests
Run Python 3.12: python -m unittest discover -s tests -p test_news_ingest.py -v

See the GitHub Actions run for CI results. No API keys are used during unit tests.
