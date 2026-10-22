-- =========================================================================
-- NAMMUDE NAADU (നമ്മുടെ നാട്) - COMPLETE SUPABASE DATABASE SCHEMA
-- Run this in your Supabase Dashboard -> SQL Editor -> Run
-- =========================================================================

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
create policy "Allow public select messages" on public.messages for select using (true);
create policy "Allow public insert messages" on public.messages for insert with check (true);
create policy "Allow public update messages" on public.messages for update using (true);
create policy "Allow public delete messages" on public.messages for delete using (true);

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
create policy "Allow public select posts" on public.posts for select using (true);
create policy "Allow public insert posts" on public.posts for insert with check (true);
create policy "Allow public update posts" on public.posts for update using (true);
create policy "Allow public delete posts" on public.posts for delete using (true);

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
create policy "Allow public select services" on public.services for select using (true);
create policy "Allow public insert services" on public.services for insert with check (true);
create policy "Allow public update services" on public.services for update using (true);
create policy "Allow public delete services" on public.services for delete using (true);

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
create policy "Allow public insert reviews" on public.service_reviews for insert with check (true);
create policy "Allow public delete reviews" on public.service_reviews for delete using (true);

-- 5. BLOOD DONORS TABLE
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
create policy "Allow public select donors" on public.blood_donors for select using (true);
create policy "Allow public insert donors" on public.blood_donors for insert with check (true);
create policy "Allow public update donors" on public.blood_donors for update using (true);
create policy "Allow public delete donors" on public.blood_donors for delete using (true);

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

alter table public.blood_requests enable row level security;
drop policy if exists "Allow public select blood_reqs" on public.blood_requests;
drop policy if exists "Allow public insert blood_reqs" on public.blood_requests;
drop policy if exists "Allow public update blood_reqs" on public.blood_requests;
drop policy if exists "Allow public delete blood_reqs" on public.blood_requests;
create policy "Allow public select blood_reqs" on public.blood_requests for select using (true);
create policy "Allow public insert blood_reqs" on public.blood_requests for insert with check (true);
create policy "Allow public update blood_reqs" on public.blood_requests for update using (true);
create policy "Allow public delete blood_reqs" on public.blood_requests for delete using (true);

-- 7. JOBS TABLE (Local Jobs & Vacancies)
create table if not exists public.jobs (
  id text primary key,
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

alter table public.jobs enable row level security;
drop policy if exists "Allow public select jobs" on public.jobs;
drop policy if exists "Allow public insert jobs" on public.jobs;
drop policy if exists "Allow public update jobs" on public.jobs;
drop policy if exists "Allow public delete jobs" on public.jobs;
create policy "Allow public select jobs" on public.jobs for select using (true);
create policy "Allow public insert jobs" on public.jobs for insert with check (true);
create policy "Allow public update jobs" on public.jobs for update using (true) with check (true);
create policy "Allow public delete jobs" on public.jobs for delete using (true);

-- 8. RENTALS & BUY/SELL TABLE
create table if not exists public.rentals (
  id text primary key,
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

alter table public.rentals enable row level security;
drop policy if exists "Allow public select rentals" on public.rentals;
drop policy if exists "Allow public insert rentals" on public.rentals;
drop policy if exists "Allow public update rentals" on public.rentals;
drop policy if exists "Allow public delete rentals" on public.rentals;
create policy "Allow public select rentals" on public.rentals for select using (true);
create policy "Allow public insert rentals" on public.rentals for insert with check (true);
create policy "Allow public update rentals" on public.rentals for update using (true) with check (true);
create policy "Allow public delete rentals" on public.rentals for delete using (true);

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
create policy "Allow public insert svc_reqs" on public.service_requests for insert with check (true);
create policy "Allow public update svc_reqs" on public.service_requests for update using (true);
create policy "Allow public delete svc_reqs" on public.service_requests for delete using (true);

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

alter table public.profiles enable row level security;
drop policy if exists "Allow public select profiles" on public.profiles;
drop policy if exists "Allow public insert profiles" on public.profiles;
drop policy if exists "Allow public update profiles" on public.profiles;
drop policy if exists "Allow public delete profiles" on public.profiles;
create policy "Allow public select profiles" on public.profiles for select using (true);
create policy "Allow public insert profiles" on public.profiles for insert with check (true);
create policy "Allow public update profiles" on public.profiles for update using (true);
create policy "Allow public delete profiles" on public.profiles for delete using (true);

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
create policy "Allow public insert emergency_contacts" on public.emergency_contacts for insert with check (true);
create policy "Allow public update emergency_contacts" on public.emergency_contacts for update using (true) with check (true);
create policy "Allow public delete emergency_contacts" on public.emergency_contacts for delete using (true);

-- 12. ENABLE SUPABASE REALTIME REPLICATION
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
