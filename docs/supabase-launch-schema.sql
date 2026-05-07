-- Launch baseline for Wink At Riah Rewards.
-- Review in Supabase SQL Editor before applying to production.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  points integer not null default 0 check (points >= 0),
  tier text not null default 'New Member',
  phone text,
  avatar_url text,
  email_notifications boolean not null default true,
  sms_reminders boolean not null default true,
  marketing_offers boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rewards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  points_cost integer not null check (points_cost > 0),
  active boolean not null default true,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.redemptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  reward_title text not null,
  points_used integer not null check (points_used > 0),
  points_before integer not null check (points_before >= 0),
  points_after integer not null check (points_after >= 0),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.rewards enable row level security;
alter table public.redemptions enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "Authenticated users can read active rewards" on public.rewards;
create policy "Authenticated users can read active rewards"
on public.rewards for select
to authenticated
using (active = true);

drop policy if exists "Users can read own redemptions" on public.redemptions;
create policy "Users can read own redemptions"
on public.redemptions for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can create own redemptions" on public.redemptions;
create policy "Users can create own redemptions"
on public.redemptions for insert
to authenticated
with check (user_id = auth.uid());

-- Create an avatars bucket in the Supabase dashboard or with the Storage API.
-- Recommended: public bucket for profile pictures, max file size set in dashboard.
-- The app uploads files as: <auth-user-id>/avatar-<timestamp>.<ext>

drop policy if exists "Users can upload own avatar files" on storage.objects;
create policy "Users can upload own avatar files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can update own avatar files" on storage.objects;
create policy "Users can update own avatar files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can select own avatar files" on storage.objects;
create policy "Users can select own avatar files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);
