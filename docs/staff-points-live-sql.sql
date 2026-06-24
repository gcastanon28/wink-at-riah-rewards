create schema if not exists private;
revoke all on schema private from anon, authenticated;

alter table public.profiles enable row level security;

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

create table if not exists public.points_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  points_change integer not null,
  reason text,
  created_at timestamptz default now()
);

create index if not exists points_ledger_user_id_idx
on public.points_ledger (user_id);

alter table public.points_ledger enable row level security;

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

drop policy if exists "Users can read own point ledger" on public.points_ledger;
create policy "Users can read own point ledger"
on public.points_ledger for select
to authenticated
using (user_id = (select auth.uid()));
