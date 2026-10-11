-- Language-quality status is independent from factual grounding and editorial score.
-- Existing stories keep not_checked and are not altered or republished.
alter table public.news_items
  add column if not exists language_quality_state text not null default 'not_checked',
  add column if not exists language_quality_issues jsonb not null default '[]'::jsonb,
  add column if not exists language_checked_at timestamptz;

alter table public.news_items
  add constraint news_language_state_check
  check (language_quality_state in
    ('not_checked', 'passed', 'corrected', 'needs_review', 'human_edited'));

alter table public.news_items
  add constraint news_language_issues_array
  check (jsonb_typeof(language_quality_issues) = 'array');

-- Existing RLS stays enabled. No new anonymous-access policies are granted.
