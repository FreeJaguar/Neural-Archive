-- Telegram user-client discovery is opt-in and stores only external source links.
-- No Telegram message text, media, account credentials or sessions are retained.
create table if not exists public.telegram_source_cursors (
  source_key text primary key check (source_key ~ '^[0-9a-f]{40}$'),
  source_label text not null check (length(source_label) between 1 and 60),
  last_message_id bigint not null default 0 check (last_message_id >= 0),
  first_seen_at timestamptz not null default now(),
  last_polled_at timestamptz not null default now()
);

create table if not exists public.telegram_discovered_links (
  id bigint generated always as identity primary key,
  source_key text not null references public.telegram_source_cursors(source_key) on delete cascade,
  source_label text not null check (length(source_label) between 1 and 60),
  message_id bigint not null check (message_id > 0),
  source_message_url text not null check (source_message_url like 'https://t.me/%' and length(source_message_url) <= 160),
  external_url text not null unique check (external_url like 'https://%' and length(external_url) <= 1000),
  discovered_at timestamptz not null default now(),
  notified_at timestamptz
);

create index if not exists telegram_discovered_unnotified_idx
  on public.telegram_discovered_links (discovered_at, id) where notified_at is null;

alter table public.telegram_source_cursors enable row level security;
alter table public.telegram_discovered_links enable row level security;

revoke all on table public.telegram_source_cursors from public, anon, authenticated;
revoke all on table public.telegram_discovered_links from public, anon, authenticated;
grant select, insert, update on table public.telegram_source_cursors to service_role;
grant select, insert, update on table public.telegram_discovered_links to service_role;
grant usage, select on sequence public.telegram_discovered_links_id_seq to service_role;

-- No public, authenticated or anonymous read/write policies are added.
-- New discoveries do not change public.news_items or publish anything.
