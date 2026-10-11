-- Add AI triage metadata without changing the existing manual approval flow.
alter table public.news_items
  add column if not exists original_title text,
  add column if not exists original_published_at timestamptz,
  add column if not exists discovered_via text,
  add column if not exists ai_score smallint,
  add column if not exists ai_confidence smallint,
  add column if not exists ai_category text,
  add column if not exists ai_rationale text,
  add column if not exists ai_model text,
  add column if not exists ai_processed_at timestamptz;

alter table public.news_items
  add constraint news_ai_score_range check (ai_score between 0 and 100),
  add constraint news_ai_confidence_range check (ai_confidence between 0 and 100);

create index if not exists news_ai_score_idx
  on public.news_items (ai_score desc, created_at desc)
  where status = 'pending';

-- The existing table remains RLS-protected. No new access policies added.
