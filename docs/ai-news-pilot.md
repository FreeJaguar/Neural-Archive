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

## Evidence-aware scoring upgrade

The Gemini response now separates three editorial dimensions: importance (50%), novelty (25%) and audience usefulness (25%). The weighted value is a priority score, not an objective scientific assessment.

The old uncalibrated self-reported confidence is now capped by deterministic checks. The model must return short source-language quotes. The script checks whether each quote is present exactly (after whitespace/Unicode normalization) in the public publisher feed text, or, for specifically whitelisted GitHub projects, official public release notes returned from the GitHub API.

The stored ai_confidence field now represents a conservative *grounding indicator*, displayed in Telegram as "ביסוס מידע". It is NOT a probability of truth, and a matching quote does NOT by itself prove that the summary correctly interprets the text. Short or vague sources, missing quotes or invented quotes force a low indicator. Source kind, source text size, verified quote entries and scoring subcomponents are saved for later audit. This upgrade does not inspect copyrighted full articles or Telegram channel messages.

Bot commands /pending display the evidence metric and an example source quote. If the grounding score is below 60, publishing requires an additional explicit acknowledgement that the moderator checked the original source. Manually edited stories clear their old model-derived scoring metadata to avoid presenting stale confidence.

This is deliberately a cautious pilot. A future phase should add claim-by-claim semantic verification against independent original sources, domain-specific trusted sources and manual calibration using 20-30 reviewed examples. Automatic publishing remains OFF.

Schema prerequisite: apply supabase/migrations/20261011_evidence_grounding.sql before merging this upgrade into production. No new keys or credentials are needed.


## Hebrew language-quality gate

AI news now receives a separate Gemini proofreading pass after classification and before insertion into the approval queue. This is an additional API request for each relevant candidate and can increase API usage/cost.

- A deterministic Unicode validator catches replacement glyphs, suspicious cantillation marks in technology prose, orphan combining marks, unsafe invisible bidirectional controls, repeated words, and clearly malformed characters.
- The proofreading request asks for natural Hebrew spelling and grammar while strictly preserving numeric claims, model/version names, English tokens, formulas and meaning.
- A deterministic comparison rejects proofreading suggestions that add or remove technical terms/numbers, make sweeping rewrites, exceed length limits, or still contain suspicious characters.
- A safe revision is marked "corrected"; unchanged clean text is marked "passed".
- If proofreading fails, the model is uncertain, or the proposed repair may change meaning, the news item is stored as a non-publishable "draft" with language_quality_state="needs_review" and error codes. The Telegram message contains an edit-only action and /pending displays the item as a draft.
- An administrator can use /edit ID | כותרת | תקציר to supply corrected text. The bot then clears stale AI-derived scoring and marks it as human-edited. Drafts cannot be published directly, even by the existing Telegram confirmation button.

The quality check is a useful gate, not a Hebrew spelling guarantee. It cannot detect every awkward sentence or factual misinterpretation. No new sources, scraping permissions, or automatic publishing were introduced.

### Database migration

Apply supabase/migrations/20261011_language_quality.sql BEFORE activating a deployment with the new collector or bot code. It is additive: published/rejected older news remains unchanged and is not automatically reprocessed.

### Tests

Run both suites from the repository root:

- python -m unittest discover -s tests -p 'test_news_*.py' -v
- node --test tests/news-workflow.test.mjs

For a safe first check, manually dispatch AI News Pilot in GitHub Actions, read Telegram notifications, and confirm that clean stories remain approvable while suspicious stories become drafts with an edit button. The recurring NEWS_INGEST_ENABLED flag remains disabled unless the repository owner enables it explicitly.
