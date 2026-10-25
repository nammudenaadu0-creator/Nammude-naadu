-- =========================================================================
-- NAMMUDE NAADU (നമ്മുടെ നാട്) - DATABASE MIGRATION FOR FCM PUSH NOTIFICATIONS
-- Adds FCM device tokens to user profiles, creates notifications audit table,
-- configures RLS security, and sets up trigger foundations.
-- =========================================================================

-- 1. ADD FCM TOKEN COLUMNS TO PROFILES TABLE
alter table public.profiles add column if not exists fcm_token text;
alter table public.profiles add column if not exists fcm_updated_at timestamp with time zone default timezone('utc'::text, now());
alter table public.profiles add column if not exists notifications_enabled boolean default true;

-- Index on fcm_token for fast lookup when querying recipient devices
create index if not exists idx_profiles_fcm_token on public.profiles(fcm_token);

-- 2. CREATE NOTIFICATIONS AUDIT & IN-APP HISTORY TABLE
create table if not exists public.notifications (
  id text primary key,
  user_id text,
  recipient_phone text,
  title text not null,
  body text not null,
  type text default 'general', -- 'chat', 'blood', 'service', 'emergency'
  data jsonb default '{}'::jsonb,
  is_read boolean default false,
  fcm_status text default 'pending', -- 'sent', 'failed', 'expired', 'no_token'
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Indexes for lightning fast notification queries
create index if not exists idx_notifications_user_id on public.notifications(user_id);
create index if not exists idx_notifications_recipient_phone on public.notifications(recipient_phone);
create index if not exists idx_notifications_created_at on public.notifications(created_at desc);

-- 3. ROW LEVEL SECURITY (RLS) FOR NOTIFICATIONS TABLE
alter table public.notifications enable row level security;

drop policy if exists "Allow select own notifications" on public.notifications;
drop policy if exists "Allow service insert notifications" on public.notifications;
drop policy if exists "Allow update own notifications" on public.notifications;
drop policy if exists "Allow delete own notifications" on public.notifications;

-- SELECT: Users can only see notifications sent to their account
create policy "Allow select own notifications" on public.notifications
for select using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and recipient_phone like '%' || public.current_citizen_phone() || '%')
  or (auth.role() = 'service_role')
);

-- INSERT: Edge function and authenticated backend can record delivery audit logs
create policy "Allow service insert notifications" on public.notifications
for insert with check (true);

-- UPDATE: Users can mark their notifications as read
create policy "Allow update own notifications" on public.notifications
for update using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and recipient_phone like '%' || public.current_citizen_phone() || '%')
  or (auth.role() = 'service_role')
);

-- DELETE: Users can dismiss/delete their own notification items
create policy "Allow delete own notifications" on public.notifications
for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and recipient_phone like '%' || public.current_citizen_phone() || '%')
  or (auth.role() = 'service_role')
);

-- 4. ATOMIC RPC FUNCTION TO DETACH FCM TOKEN ON LOGOUT OR DEAD TOKEN
create or replace function public.detach_fcm_token_secure(p_user_id text, p_phone text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_clean_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
begin
  if length(v_clean_phone) > 10 then
    v_clean_phone := right(v_clean_phone, 10);
  end if;

  if p_user_id is not null and length(trim(p_user_id)) > 0 then
    update public.profiles
    set fcm_token = null, fcm_updated_at = now()
    where id = p_user_id;
  end if;

  if length(v_clean_phone) = 10 then
    update public.profiles
    set fcm_token = null, fcm_updated_at = now()
    where phone like '%' || v_clean_phone || '%';
  end if;

  return jsonb_build_object('success', true);
end;
$$;

-- 5. REALTIME REPLICATION FOR IN-APP NOTIFICATIONS
alter publication supabase_realtime add table public.notifications;
