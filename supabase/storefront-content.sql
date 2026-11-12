create table if not exists public.storefront_settings (
  id integer primary key check (id = 1),
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.storefront_settings (id, settings)
values (1, '{
  "brandTitle": "MATCHA LAVUR",
  "logoUrl": "logo.jpg",
  "vouchers": [
    {"code": "LAVUR50", "label": "P50 off", "type": "amt", "val": 50, "min": 300},
    {"code": "WELCOME100", "label": "P100 off", "type": "amt", "val": 100, "min": 500},
    {"code": "FREESHIP", "label": "Free shipping", "type": "ship", "val": 0, "min": 200}
  ],
  "discounts": [
    {"code": "NEWOPEN10", "label": "10% off (New Opening)", "type": "pct", "val": 10, "min": 0},
    {"code": "GRANDOPEN15", "label": "15% off", "type": "pct", "val": 15, "min": 600},
    {"code": "MATCHA20", "label": "20% off", "type": "pct", "val": 20, "min": 1000}
  ],
  "ownerPhoto": "owner1.jfif",
  "sellerPhoto": "owner2.jfif",
  "openDays": [1, 2, 3, 4, 5, 6],
  "openTime": "09:00",
  "closeTime": "18:00",
  "location": "Purok 2, Rosal St., Mintal, Davao City",
  "phone": "0995 863 2194",
  "email": "matchalavur@gmail.com",
  "facebookUrl": "",
  "instagramUrl": "",
  "commercialVideo": "commercial.mp4",
  "commercialPoster": "poster.jpg",
  "gallery": [
    {"image": "photo1.jpg", "caption": "Welcome to MATCHA LAVUR, your home for delicious matcha drinks and sweet treats."},
    {"image": "photo2.jpg", "caption": "Discover our selection of quality matcha powders, ingredients, and handcrafted sweets."},
    {"image": "ube.jfif", "caption": "Enjoy our refreshing signature drinks, carefully prepared with delicious flavors in every cup."},
    {"image": "team.jfif", "caption": "Our dedicated team prepares and packs every order with care to ensure freshness and quality."}
  ]
}'::jsonb)
on conflict (id) do nothing;

alter table public.storefront_settings enable row level security;
drop policy if exists "Storefront content is public" on public.storefront_settings;
create policy "Storefront content is public" on public.storefront_settings
  for select to anon, authenticated using (true);
drop policy if exists "Owner updates storefront content" on public.storefront_settings;
create policy "Owner updates storefront content" on public.storefront_settings
  for update to authenticated
  using ((select public.is_matcha_owner()))
  with check ((select public.is_matcha_owner()));
grant select on public.storefront_settings to anon, authenticated;
grant update on public.storefront_settings to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'matcha-storefront-assets',
  'matcha-storefront-assets',
  true,
  104857600,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Storefront assets are public" on storage.objects;
create policy "Storefront assets are public" on storage.objects
  for select to anon, authenticated using (bucket_id = 'matcha-storefront-assets');
drop policy if exists "Owner manages storefront assets" on storage.objects;
create policy "Owner manages storefront assets" on storage.objects
  for all to authenticated
  using (bucket_id = 'matcha-storefront-assets' and (select public.is_matcha_owner()))
  with check (bucket_id = 'matcha-storefront-assets' and (select public.is_matcha_owner()));

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'storefront_settings'
  ) then
    alter publication supabase_realtime add table public.storefront_settings;
  end if;
end;
$$;
