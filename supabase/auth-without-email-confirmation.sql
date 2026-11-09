create schema if not exists private;

revoke all on schema private from public, anon, authenticated;

create table if not exists private.owner_accounts (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table private.owner_accounts enable row level security;
revoke all on table private.owner_accounts from public, anon, authenticated;

insert into private.owner_accounts (user_id)
values ('5c838b4c-867d-4a53-8fa7-bb0ee2c72106')
on conflict (user_id) do nothing;

create or replace function public.is_matcha_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from private.owner_accounts
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_matcha_owner() from public;
grant execute on function public.is_matcha_owner() to anon, authenticated;
