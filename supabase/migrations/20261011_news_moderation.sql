-- Apply only to a NEW, dedicated Neural Archive Supabase project.
-- Records submitted via the Telegram bot are private until explicitly published.
create table if not exists public.news_items (
  id bigint generated always as identity primary key,
  source_url text not null unique,
  source_host text not null,
  title text not null default '',
  summary text not null default '',
  status text not null default 'draft'
    check (status in ('draft', 'pending', 'published', 'rejected')),
  telegram_update_id bigint unique,
  submitted_by_chat_id text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  reviewed_at timestamptz,
  published_at timestamptz,
  constraint news_title_limit check (char_length(title) <= 180),
  constraint news_summary_limit check (char_length(summary) <= 1200),
  constraint news_source_limit check (char_length(source_url) <= 2000)
);

create index if not exists news_items_status_created_idx
  on public.news_items (status, created_at desc);

create index if not exists news_items_published_idx
  on public.news_items (published_at desc)
  where status = 'published';

alter table public.news_items enable row level security;

-- No RLS policies are granted for anon/authenticated. All database access
-- must go through authenticated, server-side handlers using a service role key.
revoke all on public.news_items from anon, authenticated;
grant select, insert, update on public.news_items to service_role;
grant usage, select on sequence public.news_items_id_seq to service_role;
