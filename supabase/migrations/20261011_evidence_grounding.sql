-- Evidence-aware triage. Additive migration; published and rejected items stay unchanged.
alter table public.news_items
  add column if not exists ai_evidence jsonb,
  add column if not exists ai_source_kind text,
  add column if not exists ai_source_chars integer,
  add column if not exists ai_importance smallint,
  add column if not exists ai_novelty smallint,
  add column if not exists ai_audience smallint;

alter table public.news_items
  add constraint news_source_chars_nonnegative check (ai_source_chars is null or ai_source_chars >= 0),
  add constraint news_importance_range check (ai_importance between 0 and 100),
  add constraint news_novelty_range check (ai_novelty between 0 and 100),
  add constraint news_audience_range check (ai_audience between 0 and 100),
  add constraint news_evidence_array check (ai_evidence is null or jsonb_typeof(ai_evidence) = 'array');

-- Existing row-level security and lack of public write policies remain unchanged.
