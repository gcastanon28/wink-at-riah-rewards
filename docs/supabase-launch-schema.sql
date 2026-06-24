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

create schema if not exists private;
revoke all on schema private from anon, authenticated;

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

create table if not exists public.points_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  points_change integer not null,
  reason text,
  created_at timestamptz default now()
);

create index if not exists redemptions_user_id_idx
on public.redemptions (user_id);

create index if not exists points_ledger_user_id_idx
on public.points_ledger (user_id);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'avatars',
  'avatars',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.profiles enable row level security;
alter table public.rewards enable row level security;
alter table public.redemptions enable row level security;
alter table public.points_ledger enable row level security;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create or replace function private.redeem_reward(p_reward_id uuid)
returns table (
  id uuid,
  reward_title text,
  points_used integer,
  points_before integer,
  points_after integer,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_profile public.profiles%rowtype;
  v_reward public.rewards%rowtype;
  v_points_after integer;
begin
  if v_user_id is null then
    raise exception 'You must be signed in to redeem rewards.';
  end if;

  select * into v_profile
  from public.profiles
  where profiles.id = v_user_id
  for update;

  if not found then
    raise exception 'Profile not found.';
  end if;

  select * into v_reward
  from public.rewards
  where rewards.id = p_reward_id
    and rewards.active = true;

  if not found then
    raise exception 'Reward is not available.';
  end if;

  if v_profile.points < v_reward.points_cost then
    raise exception 'Not enough points.';
  end if;

  v_points_after := v_profile.points - v_reward.points_cost;

  update public.profiles
  set points = v_points_after,
      updated_at = now()
  where profiles.id = v_user_id;

  insert into public.redemptions (
    user_id,
    reward_title,
    points_used,
    points_before,
    points_after
  )
  values (
    v_user_id,
    v_reward.title,
    v_reward.points_cost,
    v_profile.points,
    v_points_after
  )
  returning redemptions.id,
            redemptions.reward_title,
            redemptions.points_used,
            redemptions.points_before,
            redemptions.points_after,
            redemptions.created_at
  into id, reward_title, points_used, points_before, points_after, created_at;

  insert into public.points_ledger (user_id, points_change, reason)
  values (v_user_id, -v_reward.points_cost, 'Redeemed reward: ' || v_reward.title);

  return next;
end;
$$;

create or replace function public.redeem_reward(p_reward_id uuid)
returns table (
  id uuid,
  reward_title text,
  points_used integer,
  points_before integer,
  points_after integer,
  created_at timestamptz
)
language sql
security invoker
set search_path = public
as $$
  select * from private.redeem_reward(p_reward_id);
$$;

revoke all on function private.redeem_reward(uuid) from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.redeem_reward(uuid) to authenticated;

revoke all on function public.redeem_reward(uuid) from public, anon;
grant execute on function public.redeem_reward(uuid) to authenticated;

revoke update on public.profiles from authenticated;
grant update (
  full_name,
  phone,
  avatar_url,
  email_notifications,
  sms_reminders,
  marketing_offers,
  updated_at
) on public.profiles to authenticated;

revoke insert on public.redemptions from authenticated;

create or replace function public.admin_award_points(
  p_user_id uuid,
  p_points integer,
  p_reason text default 'Appointment points'
)
returns table (
  user_id uuid,
  points_before integer,
  points_after integer,
  points_change integer,
  reason text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.profiles%rowtype;
begin
  if p_user_id is null then
    raise exception 'User ID is required.';
  end if;

  if p_points is null or p_points <= 0 then
    raise exception 'Awarded points must be greater than zero.';
  end if;

  select * into v_profile
  from public.profiles
  where profiles.id = p_user_id
  for update;

  if not found then
    raise exception 'Profile not found.';
  end if;

  update public.profiles
  set points = v_profile.points + p_points,
      updated_at = now()
  where profiles.id = p_user_id;

  insert into public.points_ledger (user_id, points_change, reason)
  values (p_user_id, p_points, coalesce(nullif(p_reason, ''), 'Appointment points'));

  user_id := p_user_id;
  points_before := v_profile.points;
  points_after := v_profile.points + p_points;
  points_change := p_points;
  reason := coalesce(nullif(p_reason, ''), 'Appointment points');

  return next;
end;
$$;

revoke all on function public.admin_award_points(uuid, integer, text) from public, anon, authenticated;
grant execute on function public.admin_award_points(uuid, integer, text) to service_role;

create or replace function private.is_owner_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select lower(coalesce(auth.jwt()->>'email', '')) in (
    'wink.at.riah@gmail.com',
    'gcastanon28@gmail.com',
    'mariahcastanon12@gmail.com'
  );
$$;

revoke all on function private.is_owner_staff() from public, anon, authenticated;

create or replace function public.owner_search_profiles(
  p_search text default ''
)
returns table (
  id uuid,
  email text,
  full_name text,
  phone text,
  points integer,
  tier text,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_search text := trim(coalesce(p_search, ''));
begin
  if not private.is_owner_staff() then
    raise exception 'Staff access required.' using errcode = '42501';
  end if;

  return query
  select
    profiles.id,
    profiles.email,
    profiles.full_name,
    profiles.phone,
    profiles.points,
    profiles.tier,
    profiles.updated_at
  from public.profiles
  where
    v_search = ''
    or profiles.full_name ilike '%' || v_search || '%'
    or profiles.email ilike '%' || v_search || '%'
    or profiles.phone ilike '%' || v_search || '%'
  order by profiles.updated_at desc nulls last, profiles.created_at desc
  limit 50;
end;
$$;

revoke all on function public.owner_search_profiles(text) from public, anon;
grant execute on function public.owner_search_profiles(text) to authenticated;

create or replace function public.owner_award_points(
  p_user_id uuid,
  p_points integer,
  p_reason text default 'Appointment points'
)
returns table (
  user_id uuid,
  email text,
  full_name text,
  points_before integer,
  points_after integer,
  points_change integer,
  reason text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.profiles%rowtype;
  v_reason text := coalesce(nullif(trim(p_reason), ''), 'Appointment points');
  v_created_at timestamptz := now();
begin
  if not private.is_owner_staff() then
    raise exception 'Staff access required.' using errcode = '42501';
  end if;

  if p_user_id is null then
    raise exception 'User ID is required.';
  end if;

  if p_points is null or p_points <= 0 then
    raise exception 'Awarded points must be greater than zero.';
  end if;

  select * into v_profile
  from public.profiles
  where profiles.id = p_user_id
  for update;

  if not found then
    raise exception 'Profile not found.';
  end if;

  update public.profiles
  set points = v_profile.points + p_points,
      updated_at = v_created_at
  where profiles.id = p_user_id;

  insert into public.points_ledger (user_id, points_change, reason, created_at)
  values (p_user_id, p_points, v_reason, v_created_at);

  user_id := p_user_id;
  email := v_profile.email;
  full_name := v_profile.full_name;
  points_before := v_profile.points;
  points_after := v_profile.points + p_points;
  points_change := p_points;
  reason := v_reason;
  created_at := v_created_at;

  return next;
end;
$$;

revoke all on function public.owner_award_points(uuid, integer, text) from public, anon;
grant execute on function public.owner_award_points(uuid, integer, text) to authenticated;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (id = (select auth.uid()));

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check (id = (select auth.uid()));

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

drop policy if exists "Authenticated users can read active rewards" on public.rewards;
create policy "Authenticated users can read active rewards"
on public.rewards for select
to authenticated
using (active = true);

drop policy if exists "Users can read own redemptions" on public.redemptions;
create policy "Users can read own redemptions"
on public.redemptions for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Users can create own redemptions" on public.redemptions;
drop policy if exists "Users can read own point ledger" on public.points_ledger;
create policy "Users can read own point ledger"
on public.points_ledger for select
to authenticated
using (user_id = (select auth.uid()));

-- The app uploads files as: <auth-user-id>/avatar-<timestamp>.<ext>

drop policy if exists "Users can upload own avatar files" on storage.objects;
create policy "Users can upload own avatar files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users can update own avatar files" on storage.objects;
create policy "Users can update own avatar files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Public can read avatar files" on storage.objects;
drop policy if exists "Users can select own avatar files" on storage.objects;
create policy "Users can select own avatar files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
