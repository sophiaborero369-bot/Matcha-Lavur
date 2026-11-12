alter table public.reviews
  add column if not exists owner_reply text not null default ''
  check (length(owner_reply) <= 1000);

drop policy if exists "Owner updates review replies" on public.reviews;
create policy "Owner updates review replies" on public.reviews
  for update to authenticated
  using ((select public.is_matcha_owner()))
  with check ((select public.is_matcha_owner()));

revoke update on public.reviews from public, anon, authenticated;
grant update (owner_reply) on public.reviews to authenticated;
