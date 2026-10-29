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
