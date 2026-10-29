-- ========================================================
-- Digital Journal & Mood Tracker — Supabase Migration
-- Table: public.journal_entries
-- ========================================================

create table if not exists public.journal_entries (
  id text primary key,
  user_phone text not null,
  user_id text,
  mood text not null check (mood in ('happy','good','okay','sad','stressed')),
  mood_emoji text,
  text text,
  tags text[],
  date_label text,
  created_at bigint not null default extract(epoch from now()) * 1000,
  created_at_iso timestamptz default now()
);

alter table public.journal_entries enable row level security;

-- Only the owner can see their entries (strict privacy)
create policy "Journal: select own" on public.journal_entries
  for select using (
    user_phone = coalesce(current_setting('request.headers', true)::json->>'x-citizen-phone', '')
    or user_id = coalesce(current_setting('request.headers', true)::json->>'x-citizen-id', '')
    or (auth.uid() is not null and user_id = auth.uid()::text)
  );

create policy "Journal: insert own" on public.journal_entries
  for insert with check (
    user_phone = coalesce(current_setting('request.headers', true)::json->>'x-citizen-phone', '')
    or user_id = coalesce(current_setting('request.headers', true)::json->>'x-citizen-id', '')
  );

create policy "Journal: delete own" on public.journal_entries
  for delete using (
    user_phone = coalesce(current_setting('request.headers', true)::json->>'x-citizen-phone', '')
    or user_id = coalesce(current_setting('request.headers', true)::json->>'x-citizen-id', '')
  );

-- UPDATE denied — journal entries are immutable
create policy "Journal: deny update" on public.journal_entries
  for update using (false);

create index if not exists idx_journal_user_phone on public.journal_entries (user_phone);
create index if not exists idx_journal_created_at on public.journal_entries (created_at desc);
