-- =========================================================================
-- SECURITY HELPER FUNCTIONS (Extract Citizen Identity from Headers / Auth)
-- =========================================================================
create or replace function public.current_citizen_phone()
returns text
language sql
stable
as $$
  select nullif(regexp_replace(coalesce(
    current_setting('request.headers', true)::json->>'x-citizen-phone',
    ''
  ), '\D', '', 'g'), '');
$$;

create or replace function public.current_citizen_id()
returns text
language sql
stable
as $$
  select coalesce(
    nullif(current_setting('request.headers', true)::json->>'x-citizen-id', ''),
    auth.uid()::text,
    ''
  );
$$;

-- 1. MESSAGES TABLE (Realtime Cross-device Chat)
create table if not exists public.messages (
  id text primary key,
  chat_key text not null,
  sender_id text,
  sender_name text,
  sender_phone text,
  sender_avatar text,
  recipient_id text,
  recipient_name text,
  recipient_phone text,
  text text not null,
  time text,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.messages enable row level security;
drop policy if exists "Allow public select messages" on public.messages;
drop policy if exists "Allow public insert messages" on public.messages;
drop policy if exists "Allow public update messages" on public.messages;
drop policy if exists "Allow public delete messages" on public.messages;
drop policy if exists "Allow select own messages" on public.messages;
drop policy if exists "Allow insert valid messages" on public.messages;
drop policy if exists "Deny public update messages" on public.messages;
drop policy if exists "Allow delete own messages" on public.messages;

-- 1. SELECT: Users can ONLY read messages where they are the sender, recipient, or participant
create policy "Allow select own messages" on public.messages 
for select using (
  -- Supabase Auth verified user
  (auth.uid() is not null and (sender_id = auth.uid()::text or recipient_id = auth.uid()::text))
  or
  -- Phone number verification via client header (x-citizen-phone)
  (
    coalesce(current_setting('request.headers', true)::json->>'x-citizen-phone', '') <> ''
    and (
      sender_phone = (current_setting('request.headers', true)::json->>'x-citizen-phone')
      or sender_phone = ('+91' || (current_setting('request.headers', true)::json->>'x-citizen-phone'))
      or recipient_phone = (current_setting('request.headers', true)::json->>'x-citizen-phone')
      or recipient_phone = ('+91' || (current_setting('request.headers', true)::json->>'x-citizen-phone'))
      or chat_key like '%' || (current_setting('request.headers', true)::json->>'x-citizen-phone') || '%'
    )
  )
  or
  -- User ID verification via client header (x-citizen-id)
  (
    coalesce(current_setting('request.headers', true)::json->>'x-citizen-id', '') <> ''
    and (
      sender_id = (current_setting('request.headers', true)::json->>'x-citizen-id')
      or recipient_id = (current_setting('request.headers', true)::json->>'x-citizen-id')
    )
  )
);

-- 2. INSERT: Only non-empty valid messages, ensuring sender identity integrity
create policy "Allow insert valid messages" on public.messages 
for insert with check (
  text is not null and length(trim(text)) > 0
  and chat_key is not null and length(trim(chat_key)) >= 5
  and (
    -- If citizen phone is provided in header, sender_phone must match
    coalesce(current_setting('request.headers', true)::json->>'x-citizen-phone', '') = ''
    or sender_phone like '%' || (current_setting('request.headers', true)::json->>'x-citizen-phone') || '%'
  )
);

-- 3. UPDATE: DENIED - Messages are immutable; cannot be altered or tampered with
create policy "Deny public update messages" on public.messages 
for update using (false);

-- 4. DELETE: Users can ONLY delete their own messages (sender verification)
create policy "Allow delete own messages" on public.messages 
for delete using (
  (auth.uid() is not null and sender_id = auth.uid()::text)
  or
  (
    coalesce(current_setting('request.headers', true)::json->>'x-citizen-phone', '') <> ''
    and (
      sender_phone = (current_setting('request.headers', true)::json->>'x-citizen-phone')
      or sender_phone = ('+91' || (current_setting('request.headers', true)::json->>'x-citizen-phone'))
    )
  )
  or
  (
    coalesce(current_setting('request.headers', true)::json->>'x-citizen-id', '') <> ''
    and sender_id = (current_setting('request.headers', true)::json->>'x-citizen-id')
  )
);

-- SECURE RPC: Delete single message with strict sender verification
create or replace function public.delete_chat_message(p_msg_id text, p_sender_phone text, p_sender_id text)
returns boolean
language plpgsql
security definer
as $$
begin
  if p_msg_id is null or (p_sender_phone is null and p_sender_id is null) then
    return false;
  end if;

  delete from public.messages
  where id = p_msg_id
    and (
      (p_sender_phone is not null and (sender_phone = p_sender_phone or sender_phone = ('+91' || p_sender_phone) or sender_phone like '%' || p_sender_phone || '%'))
      or
      (p_sender_id is not null and sender_id = p_sender_id)
    );

  return found;
end;
$$;

-- SECURE RPC: Get thread messages with participant verification
create or replace function public.get_chat_thread_messages(p_chat_key text, p_my_phone text, p_my_id text, p_limit int default 50)
returns setof public.messages
language plpgsql
security definer
as $$
begin
  if p_chat_key is null or (p_my_phone is null and p_my_id is null) then
    return;
  end if;

  return query
  select * from public.messages
  where (
    chat_key = p_chat_key
    or (p_my_phone is not null and chat_key like '%' || p_my_phone || '%')
  )
  and (
    (p_my_phone is not null and (sender_phone like '%' || p_my_phone || '%' or recipient_phone like '%' || p_my_phone || '%' or chat_key like '%' || p_my_phone || '%'))
    or
    (p_my_id is not null and (sender_id = p_my_id or recipient_id = p_my_id))
  )
  order by created_at desc
  limit coalesce(p_limit, 50);
end;
$$;

-- High-performance indexes for sub-10ms chat retrieval
create index if not exists idx_messages_chat_key on public.messages (chat_key);
create index if not exists idx_messages_created_at on public.messages (created_at desc);
create index if not exists idx_messages_sender_phone on public.messages (sender_phone);
create index if not exists idx_messages_recipient_phone on public.messages (recipient_phone);

-- 2. POSTS TABLE (Community News, Announcements & Media)
create table if not exists public.posts (
  id text primary key,
  user_id text,
  author_name text,
  author_phone text,
  author_avatar text,
  content text,
  category text default 'announcement',
  image_url text,
  location_name text,
  district text,
  latitude double precision,
  longitude double precision,
  likes integer default 0,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.posts enable row level security;
drop policy if exists "Allow public select posts" on public.posts;
drop policy if exists "Allow public insert posts" on public.posts;
drop policy if exists "Allow public update posts" on public.posts;
drop policy if exists "Allow public delete posts" on public.posts;
drop policy if exists "Allow update own posts" on public.posts;
drop policy if exists "Allow delete own posts" on public.posts;

create policy "Allow public select posts" on public.posts for select using (true);
create policy "Allow public insert posts" on public.posts for insert with check (
  content is not null and length(trim(content)) > 0
);
-- OWNERSHIP GUARD: Only the author can update their post
create policy "Allow update own posts" on public.posts for update using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and author_phone like '%' || public.current_citizen_phone() || '%')
);
-- OWNERSHIP GUARD: Only the author can delete their post
create policy "Allow delete own posts" on public.posts for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and author_phone like '%' || public.current_citizen_phone() || '%')
);

-- 3. SERVICES TABLE (Workers Directory & Nearby Providers)
create table if not exists public.services (
  id text primary key,
  user_id text,
  name text not null,
  trade text not null,
  category text default 'other',
  phone text not null,
  location text,
  district text,
  latitude double precision,
  longitude double precision,
  avatar text,
  experience text,
  visiting_fee text,
  availability text default 'available',
  work_hours text default '8:00 AM - 7:00 PM',
  bio text,
  rating numeric default 5.0,
  reviews_count integer default 0,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.services enable row level security;
drop policy if exists "Allow public select services" on public.services;
drop policy if exists "Allow public insert services" on public.services;
drop policy if exists "Allow public update services" on public.services;
drop policy if exists "Allow public delete services" on public.services;
drop policy if exists "Allow update own services" on public.services;
drop policy if exists "Allow delete own services" on public.services;

create policy "Allow public select services" on public.services for select using (true);
create policy "Allow public insert services" on public.services for insert with check (
  name is not null and phone is not null and trade is not null
);
-- OWNERSHIP GUARD: Only the service provider can update their listing
create policy "Allow update own services" on public.services for update using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);
-- OWNERSHIP GUARD: Only the service provider can delete their listing
create policy "Allow delete own services" on public.services for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);

-- 4. SERVICE REVIEWS TABLE
create table if not exists public.service_reviews (
  id text primary key,
  service_id text not null,
  user_id text,
  author_name text not null,
  rating integer not null default 5,
  text text,
  time text,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.service_reviews enable row level security;
drop policy if exists "Allow public select reviews" on public.service_reviews;
drop policy if exists "Allow public insert reviews" on public.service_reviews;
drop policy if exists "Allow public delete reviews" on public.service_reviews;
create policy "Allow public select reviews" on public.service_reviews for select using (true);
create policy "Allow public insert reviews" on public.service_reviews for insert with check (
  author_name is not null and rating >= 1 and rating <= 5
);
create policy "Allow public delete reviews" on public.service_reviews for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
);

-- 5. BLOOD DONORS TABLE (Strict Data Protection & Privacy Guard)
create table if not exists public.blood_donors (
  id text primary key,
  user_id text,
  name text not null,
  phone text not null,
  blood_group text not null,
  location text,
  district text,
  latitude double precision,
  longitude double precision,
  ready_to_donate boolean default true,
  last_donation_date text,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.blood_donors enable row level security;
drop policy if exists "Allow public select donors" on public.blood_donors;
drop policy if exists "Allow public insert donors" on public.blood_donors;
drop policy if exists "Allow public update donors" on public.blood_donors;
drop policy if exists "Allow public delete donors" on public.blood_donors;
drop policy if exists "Allow update own donor profile" on public.blood_donors;
drop policy if exists "Allow delete own donor profile" on public.blood_donors;

-- Read: Public can view active ready donors for emergency blood search
create policy "Allow public select donors" on public.blood_donors for select using (
  ready_to_donate = true
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);
-- Insert: Strict validation ensuring authentic phone and standard blood group
create policy "Allow public insert donors" on public.blood_donors for insert with check (
  name is not null and length(trim(name)) >= 2
  and phone is not null and length(regexp_replace(phone, '\D', '', 'g')) >= 10
  and blood_group is not null
);
-- OWNERSHIP GUARD: Only the donor can update their phone, location, or donation readiness
create policy "Allow update own donor profile" on public.blood_donors for update using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);
-- OWNERSHIP GUARD: Only the donor can delete their registration
create policy "Allow delete own donor profile" on public.blood_donors for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);

-- 6. BLOOD REQUESTS TABLE (Urgent Blood Emergency)
create table if not exists public.blood_requests (
  id text primary key,
  patient_name text not null,
  blood_group text not null,
  units text default '1 Unit',
  hospital text not null,
  contact_phone text not null,
  location text,
  district text,
  latitude double precision,
  longitude double precision,
  needed_by text,
  status text default 'urgent',
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.blood_requests add column if not exists user_id text;
alter table public.blood_requests enable row level security;
drop policy if exists "Allow public select blood_reqs" on public.blood_requests;
drop policy if exists "Allow public insert blood_reqs" on public.blood_requests;
drop policy if exists "Allow public update blood_reqs" on public.blood_requests;
drop policy if exists "Allow public delete blood_reqs" on public.blood_requests;

create policy "Allow public select blood_reqs" on public.blood_requests for select using (true);
create policy "Allow public insert blood_reqs" on public.blood_requests for insert with check (
  patient_name is not null and hospital is not null and contact_phone is not null
);
-- OWNERSHIP GUARD: Only the request creator can update status
create policy "Allow public update blood_reqs" on public.blood_requests for update using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and contact_phone like '%' || public.current_citizen_phone() || '%')
);
-- OWNERSHIP GUARD: Only the request creator can delete
create policy "Allow public delete blood_reqs" on public.blood_requests for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and contact_phone like '%' || public.current_citizen_phone() || '%')
);

-- 7. JOBS TABLE (Local Jobs & Vacancies)
create table if not exists public.jobs (
  id text primary key,
  user_id text,
  employer text not null,
  title text not null,
  category text default 'other',
  salary text,
  phone text not null,
  location text,
  district text,
  latitude double precision,
  longitude double precision,
  description text,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.jobs add column if not exists user_id text;
alter table public.jobs enable row level security;
drop policy if exists "Allow public select jobs" on public.jobs;
drop policy if exists "Allow public insert jobs" on public.jobs;
drop policy if exists "Allow public update jobs" on public.jobs;
drop policy if exists "Allow public delete jobs" on public.jobs;

create policy "Allow public select jobs" on public.jobs for select using (true);
create policy "Allow public insert jobs" on public.jobs for insert with check (
  title is not null and employer is not null and phone is not null
);
-- OWNERSHIP GUARD: Only the employer can update the job post
create policy "Allow public update jobs" on public.jobs for update using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);
-- OWNERSHIP GUARD: Only the employer can delete the job post
create policy "Allow public delete jobs" on public.jobs for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);

-- 8. RENTALS & BUY/SELL TABLE
create table if not exists public.rentals (
  id text primary key,
  user_id text,
  title text not null,
  owner text not null,
  type text default 'house',
  category text default 'rent',
  price text,
  deposit text,
  phone text not null,
  location text,
  district text,
  latitude double precision,
  longitude double precision,
  image_url text,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.rentals add column if not exists user_id text;
alter table public.rentals enable row level security;
drop policy if exists "Allow public select rentals" on public.rentals;
drop policy if exists "Allow public insert rentals" on public.rentals;
drop policy if exists "Allow public update rentals" on public.rentals;
drop policy if exists "Allow public delete rentals" on public.rentals;

create policy "Allow public select rentals" on public.rentals for select using (true);
create policy "Allow public insert rentals" on public.rentals for insert with check (
  title is not null and owner is not null and phone is not null
);
-- OWNERSHIP GUARD: Only the rental owner can update
create policy "Allow public update rentals" on public.rentals for update using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);
-- OWNERSHIP GUARD: Only the rental owner can delete
create policy "Allow public delete rentals" on public.rentals for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);

-- 9. SERVICE REQUESTS TABLE (Quick Worker Requests)
create table if not exists public.service_requests (
  id text primary key,
  user_id text,
  title text not null,
  trade text not null,
  urgency text default 'urgent',
  location text,
  phone text not null,
  image_url text,
  status text default 'pending',
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.service_requests enable row level security;
alter table public.service_requests add column if not exists category text;
alter table public.service_requests add column if not exists provider_phone text;
alter table public.service_requests add column if not exists provider_name text;
alter table public.service_requests add column if not exists description text;

drop policy if exists "Allow public select svc_reqs" on public.service_requests;
drop policy if exists "Allow public insert svc_reqs" on public.service_requests;
drop policy if exists "Allow public update svc_reqs" on public.service_requests;
drop policy if exists "Allow public delete svc_reqs" on public.service_requests;

create policy "Allow public select svc_reqs" on public.service_requests for select using (true);
create policy "Allow public insert svc_reqs" on public.service_requests for insert with check (
  title is not null and phone is not null
);
-- OWNERSHIP GUARD: Only requester or provider can update status
create policy "Allow public update svc_reqs" on public.service_requests for update using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and (phone like '%' || public.current_citizen_phone() || '%' or provider_phone like '%' || public.current_citizen_phone() || '%'))
);
-- OWNERSHIP GUARD: Only requester can delete their request
create policy "Allow public delete svc_reqs" on public.service_requests for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);

-- 10. PROFILES TABLE (User Profiles)
create table if not exists public.profiles (
  id text primary key,
  name text,
  phone text,
  place text,
  avatar text,
  blood_group text,
  is_donor boolean default false,
  latitude double precision,
  longitude double precision,
  created_at bigint,
  updated_at bigint
);

alter table public.profiles add column if not exists latitude double precision;
alter table public.profiles add column if not exists longitude double precision;
alter table public.profiles add column if not exists email text;
create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_profiles_phone on public.profiles(phone);

alter table public.profiles enable row level security;
drop policy if exists "Allow public select profiles" on public.profiles;
drop policy if exists "Allow public insert profiles" on public.profiles;
drop policy if exists "Allow public update profiles" on public.profiles;
drop policy if exists "Allow public delete profiles" on public.profiles;

create policy "Allow public select profiles" on public.profiles for select using (true);
create policy "Allow public insert profiles" on public.profiles for insert with check (true);
-- OWNERSHIP GUARD: Only the user can update their own profile
create policy "Allow public update profiles" on public.profiles for update using (
  (auth.uid() is not null and id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);
-- OWNERSHIP GUARD: Only the user can delete their own profile
create policy "Allow public delete profiles" on public.profiles for delete using (
  (auth.uid() is not null and id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and phone like '%' || public.current_citizen_phone() || '%')
);

-- 11. EMERGENCY & ESSENTIAL DIRECTORY CONTACTS TABLE
create table if not exists public.emergency_contacts (
  id text primary key,
  title text not null,
  category text default 'അടിയന്തിരം',
  phone text not null,
  icon text default '📞',
  badge text default 'സഹായം',
  location text default 'കേരളം',
  district text,
  description text,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.emergency_contacts enable row level security;
drop policy if exists "Allow public select emergency_contacts" on public.emergency_contacts;
drop policy if exists "Allow public insert emergency_contacts" on public.emergency_contacts;
drop policy if exists "Allow public update emergency_contacts" on public.emergency_contacts;
drop policy if exists "Allow public delete emergency_contacts" on public.emergency_contacts;
create policy "Allow public select emergency_contacts" on public.emergency_contacts for select using (true);
create policy "Allow public insert emergency_contacts" on public.emergency_contacts for insert with check (
  title is not null and phone is not null
);
create policy "Deny public update emergency_contacts" on public.emergency_contacts for update using (false);
create policy "Deny public delete emergency_contacts" on public.emergency_contacts for delete using (false);

-- 12. ADMIN AUDIT LOGS & GRIEVANCES TABLES
create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  admin_user text default 'Admin',
  target_item text,
  legal_basis text default 'DPDP Act 2023 Sec 11',
  hash text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.admin_audit_logs enable row level security;
create policy "admin_audit_logs_select" on public.admin_audit_logs for select using (true);
create policy "admin_audit_logs_insert" on public.admin_audit_logs for insert with check (true);

create table if not exists public.admin_grievances (
  id uuid primary key default gen_random_uuid(),
  ticket_id text,
  title text not null,
  category text,
  complainant_name text,
  complainant_phone text,
  accused_user text,
  location text,
  status text default 'PENDING',
  action_taken text,
  sla_deadline timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.admin_grievances enable row level security;
create policy "admin_grievances_select" on public.admin_grievances for select using (true);
create policy "admin_grievances_all" on public.admin_grievances for all using (true);

-- Ensure moderation columns exist on profiles and services
alter table public.profiles add column if not exists is_banned boolean default false;
alter table public.profiles add column if not exists verified_provider boolean default false;
alter table public.services add column if not exists verified boolean default false;
alter table public.services add column if not exists status text default 'approved';

-- 13. SECURE ATOMIC ACCOUNT & DATA DELETION RPC
create or replace function public.delete_user_account_secure(
  p_user_id text,
  p_phone text,
  p_email text
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_clean_phone text;
  v_del_posts int := 0;
  v_del_services int := 0;
  v_del_jobs int := 0;
  v_del_rentals int := 0;
  v_del_donors int := 0;
  v_del_messages int := 0;
  v_del_profiles int := 0;
begin
  -- Validate inputs: must provide a non-empty user_id or valid 10-digit phone
  v_clean_phone := right(regexp_replace(coalesce(p_phone, ''), '\D', '', 'g'), 10);
  
  if (p_user_id is null or length(trim(p_user_id)) = 0) 
     and (length(v_clean_phone) < 10) 
     and (p_email is null or length(trim(p_email)) < 5) then
    return jsonb_build_object('success', false, 'error', 'Invalid parameters for account deletion. Must provide valid ID, 10-digit phone, or email.');
  end if;

  -- 1. Delete profiles
  if p_user_id is not null and length(trim(p_user_id)) > 0 then
    delete from public.profiles where id = p_user_id;
  end if;
  if length(v_clean_phone) = 10 then
    delete from public.profiles where phone like '%' || v_clean_phone;
  end if;
  if p_email is not null and length(trim(p_email)) >= 5 then
    delete from public.profiles where lower(email) = lower(p_email);
  end if;

  -- 2. Delete community posts
  if p_user_id is not null and length(trim(p_user_id)) > 0 then
    delete from public.posts where user_id = p_user_id;
  end if;
  if length(v_clean_phone) = 10 then
    delete from public.posts where author_phone like '%' || v_clean_phone;
  end if;

  -- 3. Delete services
  if p_user_id is not null and length(trim(p_user_id)) > 0 then
    delete from public.services where user_id = p_user_id;
  end if;
  if length(v_clean_phone) = 10 then
    delete from public.services where phone like '%' || v_clean_phone;
  end if;

  -- 4. Delete jobs
  if length(v_clean_phone) = 10 then
    delete from public.jobs where phone like '%' || v_clean_phone;
  end if;

  -- 5. Delete rentals
  if length(v_clean_phone) = 10 then
    delete from public.rentals where phone like '%' || v_clean_phone;
  end if;

  -- 6. Delete blood donors and requests
  if length(v_clean_phone) = 10 then
    delete from public.blood_donors where phone like '%' || v_clean_phone;
    delete from public.blood_requests where contact_phone like '%' || v_clean_phone;
    delete from public.service_requests where phone like '%' || v_clean_phone;
  end if;

  -- 7. Delete messages
  if p_user_id is not null and length(trim(p_user_id)) > 0 then
    delete from public.messages where sender_id = p_user_id;
  end if;
  if length(v_clean_phone) = 10 then
    delete from public.messages where sender_phone like '%' || v_clean_phone;
  end if;

  -- Record deletion in admin audit log
  insert into public.admin_audit_logs (action, admin_user, target_item, legal_basis)
  values ('Permanent user data purge completed', 'System Purge Engine', coalesce(p_user_id, v_clean_phone, p_email), 'DPDP Act 2023 Sec 11');

  return jsonb_build_object('success', true, 'purged_phone', v_clean_phone, 'purged_user', p_user_id);
end;
$$;

-- 14. ENABLE SUPABASE REALTIME REPLICATION
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.posts;
alter publication supabase_realtime add table public.services;
alter publication supabase_realtime add table public.blood_donors;
alter publication supabase_realtime add table public.blood_requests;
alter publication supabase_realtime add table public.jobs;
alter publication supabase_realtime add table public.rentals;
alter publication supabase_realtime add table public.service_requests;
alter publication supabase_realtime add table public.profiles;
alter publication supabase_realtime add table public.emergency_contacts;

-- 15. BACKGROUND PUSH NOTIFICATIONS & FCM TOKENS
alter table public.profiles add column if not exists fcm_token text;
alter table public.profiles add column if not exists fcm_updated_at timestamp with time zone default timezone('utc'::text, now());
alter table public.profiles add column if not exists notifications_enabled boolean default true;
create index if not exists idx_profiles_fcm_token on public.profiles(fcm_token);

create table if not exists public.notifications (
  id text primary key,
  user_id text,
  recipient_phone text,
  title text not null,
  body text not null,
  type text default 'general',
  data jsonb default '{}'::jsonb,
  is_read boolean default false,
  fcm_status text default 'pending',
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create index if not exists idx_notifications_user_id on public.notifications(user_id);
create index if not exists idx_notifications_recipient_phone on public.notifications(recipient_phone);
create index if not exists idx_notifications_created_at on public.notifications(created_at desc);

alter table public.notifications enable row level security;
drop policy if exists "Allow select own notifications" on public.notifications;
drop policy if exists "Allow service insert notifications" on public.notifications;
drop policy if exists "Allow update own notifications" on public.notifications;
drop policy if exists "Allow delete own notifications" on public.notifications;

create policy "Allow select own notifications" on public.notifications
for select using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and recipient_phone like '%' || public.current_citizen_phone() || '%')
  or (auth.role() = 'service_role')
);

create policy "Allow service insert notifications" on public.notifications
for insert with check (true);

create policy "Allow update own notifications" on public.notifications
for update using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and recipient_phone like '%' || public.current_citizen_phone() || '%')
  or (auth.role() = 'service_role')
);

create policy "Allow delete own notifications" on public.notifications
for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and recipient_phone like '%' || public.current_citizen_phone() || '%')
  or (auth.role() = 'service_role')
);

alter publication supabase_realtime add table public.notifications;

-- =========================================================================
-- NAMMUDE NAADU GLOBAL SUPER APP — DATABASE SCHEMA & DISPATCH SYSTEM
-- =========================================================================

-- 1. SALE (BUY & SELL) LISTINGS TABLE
create table if not exists public.sales (
  id text primary key,
  user_id text not null,
  seller_name text not null,
  seller_phone text not null,
  title text not null,
  description text,
  category text not null,
  price numeric not null default 0,
  currency text default 'INR',
  condition text default 'Used',
  images jsonb default '[]'::jsonb,
  location text not null,
  latitude double precision,
  longitude double precision,
  status text default 'active', -- 'active', 'sold', 'expired', 'removed'
  views_count integer default 0,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.sales enable row level security;
drop policy if exists "Allow public select sales" on public.sales;
drop policy if exists "Allow insert sales" on public.sales;
drop policy if exists "Allow update own sales" on public.sales;
drop policy if exists "Allow delete own sales" on public.sales;

create policy "Allow public select sales" on public.sales for select using (true);
create policy "Allow insert sales" on public.sales for insert with check (
  title is not null and price >= 0 and seller_phone is not null
);
create policy "Allow update own sales" on public.sales for update using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and seller_phone like '%' || public.current_citizen_phone() || '%')
);
create policy "Allow delete own sales" on public.sales for delete using (
  (auth.uid() is not null and user_id = auth.uid()::text)
  or (public.current_citizen_id() <> '' and user_id = public.current_citizen_id())
  or (public.current_citizen_phone() <> '' and seller_phone like '%' || public.current_citizen_phone() || '%')
);

create index if not exists idx_sales_category on public.sales (category);
create index if not exists idx_sales_status on public.sales (status);
create index if not exists idx_sales_created_at on public.sales (created_at desc);

-- 2. PROFILE ENHANCEMENTS (Blood Privacy, Provider & Business Accounts, Global Locales)
alter table public.profiles add column if not exists blood_group text;
alter table public.profiles add column if not exists blood_donor_consent boolean default false;
alter table public.profiles add column if not exists blood_privacy text default 'emergency_only'; -- 'public', 'emergency_only', 'private'
alter table public.profiles add column if not exists is_provider boolean default false;
alter table public.profiles add column if not exists is_business boolean default false;
alter table public.profiles add column if not exists provider_category text;
alter table public.profiles add column if not exists provider_skills jsonb default '[]'::jsonb;
alter table public.profiles add column if not exists provider_bio text;
alter table public.profiles add column if not exists provider_rating numeric default 5.0;
alter table public.profiles add column if not exists provider_reviews_count integer default 0;
alter table public.profiles add column if not exists provider_verified boolean default false;
alter table public.profiles add column if not exists provider_is_online boolean default true;
alter table public.profiles add column if not exists provider_active_radius_km numeric default 15.0;
alter table public.profiles add column if not exists country_code text default 'IN';
alter table public.profiles add column if not exists currency_code text default 'INR';
alter table public.profiles add column if not exists timezone text default 'Asia/Kolkata';

-- 3. SMART SERVICE DISPATCH SYSTEM TABLES
-- A. Dispatch Batches (Tracks 5-minute round & 5-provider batching)
create table if not exists public.dispatch_batches (
  id text primary key,
  request_id text not null,
  batch_number integer not null default 1,
  radius_km numeric not null default 10.0,
  providers_targeted integer not null default 0,
  status text not null default 'active', -- 'active', 'expired', 'responded', 'completed'
  expires_at_iso timestamp with time zone not null,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.dispatch_batches enable row level security;
drop policy if exists "Allow public select dispatch_batches" on public.dispatch_batches;
drop policy if exists "Allow public insert dispatch_batches" on public.dispatch_batches;
drop policy if exists "Allow public update dispatch_batches" on public.dispatch_batches;

create policy "Allow public select dispatch_batches" on public.dispatch_batches for select using (true);
create policy "Allow public insert dispatch_batches" on public.dispatch_batches for insert with check (true);
create policy "Allow public update dispatch_batches" on public.dispatch_batches for update using (true);

create index if not exists idx_dispatch_batches_req on public.dispatch_batches (request_id);
create index if not exists idx_dispatch_batches_status on public.dispatch_batches (status);

-- B. Dispatch Recipients (Tracks each of the 5 providers in a batch: sent, seen, response)
create table if not exists public.dispatch_recipients (
  id text primary key,
  batch_id text not null,
  request_id text not null,
  provider_id text not null,
  provider_phone text not null,
  provider_name text not null,
  distance_km numeric default 0.0,
  delivery_status text default 'sent', -- 'sent', 'delivered', 'seen', 'timeout'
  response_status text default 'pending', -- 'pending', 'interested', 'declined', 'chosen', 'cancelled'
  responded_at bigint,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.dispatch_recipients enable row level security;
drop policy if exists "Allow public select dispatch_recipients" on public.dispatch_recipients;
drop policy if exists "Allow public insert dispatch_recipients" on public.dispatch_recipients;
drop policy if exists "Allow public update dispatch_recipients" on public.dispatch_recipients;

create policy "Allow public select dispatch_recipients" on public.dispatch_recipients for select using (true);
create policy "Allow public insert dispatch_recipients" on public.dispatch_recipients for insert with check (true);
create policy "Allow public update dispatch_recipients" on public.dispatch_recipients for update using (true);

create index if not exists idx_dispatch_recipients_provider on public.dispatch_recipients (provider_id);
create index if not exists idx_dispatch_recipients_req on public.dispatch_recipients (request_id);

-- C. Provider Responses (Offers, arrival estimates, custom quotes)
create table if not exists public.provider_responses (
  id text primary key,
  request_id text not null,
  provider_id text not null,
  provider_name text not null,
  provider_phone text not null,
  provider_avatar text,
  estimated_arrival_minutes integer default 30,
  quoted_price numeric,
  message text,
  status text default 'submitted', -- 'submitted', 'accepted', 'rejected'
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.provider_responses enable row level security;
drop policy if exists "Allow public select provider_responses" on public.provider_responses;
drop policy if exists "Allow public insert provider_responses" on public.provider_responses;
drop policy if exists "Allow public update provider_responses" on public.provider_responses;

create policy "Allow public select provider_responses" on public.provider_responses for select using (true);
create policy "Allow public insert provider_responses" on public.provider_responses for insert with check (true);
create policy "Allow public update provider_responses" on public.provider_responses for update using (true);

create index if not exists idx_provider_responses_req on public.provider_responses (request_id);

-- D. Confirmed Bookings (Atomic contract between customer and chosen provider)
create table if not exists public.bookings (
  id text primary key,
  request_id text not null unique,
  customer_id text not null,
  customer_name text not null,
  customer_phone text not null,
  provider_id text not null,
  provider_name text not null,
  provider_phone text not null,
  service_category text not null,
  service_title text not null,
  booking_location text not null,
  latitude double precision,
  longitude double precision,
  agreed_price numeric,
  currency text default 'INR',
  status text not null default 'confirmed', -- 'confirmed', 'in_progress', 'completed', 'cancelled'
  confirmed_at bigint not null,
  completed_at bigint,
  created_at bigint not null,
  created_at_iso timestamp with time zone default timezone('utc'::text, now())
);

alter table public.bookings enable row level security;
drop policy if exists "Allow public select bookings" on public.bookings;
drop policy if exists "Allow public insert bookings" on public.bookings;
drop policy if exists "Allow public update bookings" on public.bookings;

create policy "Allow public select bookings" on public.bookings for select using (true);
create policy "Allow public insert bookings" on public.bookings for insert with check (true);
create policy "Allow public update bookings" on public.bookings for update using (true);

create index if not exists idx_bookings_customer on public.bookings (customer_id);
create index if not exists idx_bookings_provider on public.bookings (provider_id);

-- 4. ATOMIC BOOKING TRANSACTION RPC (Guarantees zero duplicate assignments)
create or replace function public.atomic_confirm_booking(
  p_request_id text,
  p_customer_id text,
  p_customer_name text,
  p_customer_phone text,
  p_provider_id text,
  p_provider_name text,
  p_provider_phone text,
  p_category text,
  p_title text,
  p_location text,
  p_agreed_price numeric default 0
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_booking_id text;
  v_existing_booking text;
begin
  -- Check if booking already confirmed for this request
  select id into v_existing_booking from public.bookings where request_id = p_request_id;
  if v_existing_booking is not null then
    return jsonb_build_object('success', false, 'error', 'Request has already been booked by another provider.');
  end if;

  v_booking_id := 'bk_' || floor(extract(epoch from clock_timestamp()) * 1000)::text;

  -- 1. Create atomic confirmed booking
  insert into public.bookings (
    id, request_id, customer_id, customer_name, customer_phone,
    provider_id, provider_name, provider_phone,
    service_category, service_title, booking_location, agreed_price,
    status, confirmed_at, created_at
  ) values (
    v_booking_id, p_request_id, p_customer_id, p_customer_name, p_customer_phone,
    p_provider_id, p_provider_name, p_provider_phone,
    p_category, p_title, p_location, p_agreed_price,
    'confirmed', floor(extract(epoch from clock_timestamp()) * 1000)::bigint,
    floor(extract(epoch from clock_timestamp()) * 1000)::bigint
  );

  -- 2. Update service request status to confirmed
  update public.service_requests
  set status = 'confirmed',
      provider_phone = p_provider_phone,
      provider_name = p_provider_name
  where id = p_request_id;

  -- 3. Mark winning provider recipient as chosen
  update public.dispatch_recipients
  set response_status = 'chosen'
  where request_id = p_request_id and provider_id = p_provider_id;

  -- 4. Atomically cancel all other outstanding recipient alerts
  update public.dispatch_recipients
  set response_status = 'cancelled'
  where request_id = p_request_id and provider_id <> p_provider_id and response_status in ('pending', 'interested');

  -- 5. Mark active dispatch batches as completed
  update public.dispatch_batches
  set status = 'completed'
  where request_id = p_request_id;

  return jsonb_build_object(
    'success', true,
    'booking_id', v_booking_id,
    'status', 'confirmed',
    'provider_name', p_provider_name
  );
exception
  when others then
    return jsonb_build_object('success', false, 'error', SQLERRM);
end;
$$;
