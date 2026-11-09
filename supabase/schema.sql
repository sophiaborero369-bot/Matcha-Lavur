create extension if not exists pgcrypto;

create or replace function public.is_matcha_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select lower(coalesce((select auth.jwt() ->> 'email'), '')) = 'matchalavur@gmail.com';
$$;

revoke all on function public.is_matcha_owner() from public;
grant execute on function public.is_matcha_owner() to anon, authenticated;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  phone text not null default '',
  address text not null default '',
  bio text not null default '',
  photo_url text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id integer primary key,
  name text not null,
  category text not null check (category in ('Drinks', 'Sweets', 'Powder', 'Merchandise')),
  price numeric(12,2) not null check (price >= 0),
  stock integer not null default 20 check (stock >= 0)
);

insert into public.products (id, name, category, price) values
  (1, 'Blueberry Matcha Spring Latte', 'Drinks', 180),
  (2, 'Dirty Matcha Latte', 'Drinks', 175),
  (3, 'Strawberry Matcha', 'Drinks', 215),
  (4, 'Honey Cinnamon Matcha', 'Drinks', 205),
  (5, 'Iced Matcha Latte', 'Drinks', 175),
  (6, 'Iced Pistachio Matcha Mint Shake', 'Drinks', 225),
  (7, 'Mango Sticky Rice Matcha', 'Drinks', 195),
  (8, 'Matcha Bubble Milk Tea', 'Drinks', 165),
  (9, 'Matcha Ice Cream Latte', 'Drinks', 190),
  (10, 'Matcha Lemonade', 'Drinks', 155),
  (11, 'Matcha Suman', 'Drinks', 190),
  (12, 'Ube Matcha', 'Drinks', 195),
  (13, 'Turkish Delight Matcha', 'Drinks', 220),
  (14, 'Matcha Gateau au Chocolat Cake', 'Sweets', 2200),
  (15, 'Matcha Basque Cheesecake', 'Sweets', 1950),
  (16, 'Matcha Crepe Cake', 'Sweets', 2500),
  (17, 'Matcha Mousse Cake', 'Sweets', 1750),
  (18, 'Matcha Strawberry Cake', 'Sweets', 2150),
  (19, 'Triple Matcha Mousse Cake', 'Sweets', 240),
  (20, 'Matcha Cupcakes with Cinnamon Buttercream (Box of 12)', 'Sweets', 1250),
  (21, 'Matcha Tiramisu', 'Sweets', 220),
  (22, 'Vegan Matcha Mochi (Box of 6)', 'Sweets', 500),
  (23, 'Matcha Cookies (Box of 12)', 'Sweets', 720),
  (24, 'Matcha Powder Ceremonial Grade (100g)', 'Powder', 2500),
  (25, 'Matcha Green Powder (Chocolate Flavor 30g)', 'Powder', 1250),
  (26, 'Original Matcha Latte Powder', 'Powder', 2350),
  (27, 'Matcha Culinary Powder', 'Powder', 1500),
  (28, 'Fukujuen Ceremonial Matcha (Pack of 10 sticks)', 'Powder', 2050),
  (29, 'AquaFlask AquaSip (32oz)', 'Merchandise', 1390),
  (30, '7-Piece Ceramic Matcha Tea Ceremony Gift Set', 'Merchandise', 1800),
  (31, '2 Ceramic Matcha Mug', 'Merchandise', 1200),
  (32, 'Matcha Roll Cow Plush (Sheepydust)', 'Merchandise', 2600),
  (33, 'Monchhichi Keychain', 'Merchandise', 850),
  (34, 'Matcha Green Ring-Handle Folding Umbrella with Retractable Drip Sleeve', 'Merchandise', 680),
  (35, '"But First, Matcha" Canvas Tote Bag', 'Merchandise', 480)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  price = excluded.price;

create table if not exists public.cart_items (
  customer_id uuid not null references auth.users(id) on delete cascade,
  product_id integer not null references public.products(id),
  quantity integer not null check (quantity > 0),
  updated_at timestamptz not null default now(),
  primary key (customer_id, product_id)
);

create table if not exists public.wishlist_items (
  customer_id uuid not null references auth.users(id) on delete cascade,
  product_id integer not null references public.products(id),
  created_at timestamptz not null default now(),
  primary key (customer_id, product_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid not null references auth.users(id),
  customer_name text not null,
  customer_email text not null,
  phone text not null,
  address text not null,
  note text not null default '',
  fulfillment text not null check (fulfillment in ('Pick Up', 'Delivery')),
  delivery_estimate text not null,
  shipping_fee numeric(12,2) not null check (shipping_fee >= 0),
  subtotal numeric(12,2) not null check (subtotal >= 0),
  discount numeric(12,2) not null default 0 check (discount >= 0),
  promo_code text,
  payment_method text not null,
  total numeric(12,2) not null check (total >= 0),
  status text not null default 'To Ship' check (status in (
    'To Ship', 'Preparing', 'Packaging', 'Ready for Pickup', 'Out for Delivery',
    'To Receive', 'Completed', 'Return/Refund', 'Cancelled'
  )),
  refund_reason text,
  refund_decision text check (refund_decision in ('Approved', 'Declined')),
  stock_restored boolean not null default false,
  rated boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id integer not null references public.products(id),
  product_name text not null,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users(id) on delete cascade,
  customer_name text not null,
  product_id integer not null references public.products(id),
  stars integer not null check (stars between 1 and 5),
  review_text text not null,
  photo_url text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.review_votes (
  review_id uuid not null references public.reviews(id) on delete cascade,
  customer_id uuid not null references auth.users(id) on delete cascade,
  primary key (review_id, customer_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users(id) on delete cascade,
  sender_role text not null check (sender_role in ('customer', 'owner')),
  message text not null check (length(message) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists orders_customer_created_idx on public.orders(customer_id, created_at desc);
create index if not exists order_items_order_idx on public.order_items(order_id);
create index if not exists messages_customer_created_idx on public.messages(customer_id, created_at);
create index if not exists reviews_created_idx on public.reviews(created_at desc);

create or replace function public.create_matcha_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    lower(new.email),
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_matcha_user_created on auth.users;
create trigger on_matcha_user_created
after insert on auth.users
for each row execute function public.create_matcha_profile();

insert into public.profiles (id, email, full_name)
select id, lower(coalesce(email, '')), coalesce(raw_user_meta_data ->> 'full_name', '')
from auth.users
on conflict (id) do update set
  email = excluded.email,
  full_name = case
    when public.profiles.full_name = '' then excluded.full_name
    else public.profiles.full_name
  end;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.cart_items enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;
alter table public.review_votes enable row level security;
alter table public.messages enable row level security;

create policy "Profiles readable by account or owner" on public.profiles
  for select to authenticated using (id = (select auth.uid()) or (select public.is_matcha_owner()));
create policy "Users update own profile" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "Public can read products" on public.products
  for select to anon, authenticated using (true);
create policy "Owner manages products" on public.products
  for all to authenticated using ((select public.is_matcha_owner())) with check ((select public.is_matcha_owner()));

create policy "Users manage own cart" on public.cart_items
  for all to authenticated using (customer_id = (select auth.uid())) with check (customer_id = (select auth.uid()));
create policy "Users manage own wishlist" on public.wishlist_items
  for all to authenticated using (customer_id = (select auth.uid())) with check (customer_id = (select auth.uid()));
create policy "Customer or owner reads orders" on public.orders
  for select to authenticated using (customer_id = (select auth.uid()) or (select public.is_matcha_owner()));
create policy "Owner updates orders" on public.orders
  for update to authenticated using ((select public.is_matcha_owner())) with check ((select public.is_matcha_owner()));
create policy "Customer or owner reads order items" on public.order_items
  for select to authenticated using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (o.customer_id = (select auth.uid()) or (select public.is_matcha_owner()))
    )
  );

create policy "Reviews are public" on public.reviews
  for select to anon, authenticated using (true);
create policy "Customers or owner delete reviews" on public.reviews
  for delete to authenticated using (customer_id = (select auth.uid()) or (select public.is_matcha_owner()));
create policy "Customers manage own review votes" on public.review_votes
  for all to authenticated using (customer_id = (select auth.uid())) with check (customer_id = (select auth.uid()));
create policy "Customers read own review votes" on public.review_votes
  for select to authenticated using (customer_id = (select auth.uid()));

create policy "Customer or owner reads messages" on public.messages
  for select to authenticated using (customer_id = (select auth.uid()) or (select public.is_matcha_owner()));
create policy "Customers send own messages" on public.messages
  for insert to authenticated with check (customer_id = (select auth.uid()) and sender_role = 'customer');
create policy "Owner replies to customers" on public.messages
  for insert to authenticated with check ((select public.is_matcha_owner()) and sender_role = 'owner');
create policy "Customer or owner clears messages" on public.messages
  for delete to authenticated using (customer_id = (select auth.uid()) or (select public.is_matcha_owner()));

create or replace function public.place_matcha_order(
  p_customer_name text,
  p_phone text,
  p_address text,
  p_note text,
  p_fulfillment text,
  p_payment_method text,
  p_promo_code text,
  p_promo_mode text,
  p_items jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_customer_id uuid := auth.uid();
  v_email text := lower(coalesce(auth.jwt() ->> 'email', ''));
  v_item jsonb;
  v_product public.products%rowtype;
  v_order_id uuid;
  v_order_number text := 'ML' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
  v_quantity integer;
  v_subtotal numeric(12,2) := 0;
  v_shipping numeric(12,2) := 0;
  v_discount numeric(12,2) := 0;
  v_total numeric(12,2);
  v_is_davao boolean;
  v_has_fresh boolean := false;
  v_has_delayed boolean := false;
  v_estimate text;
  v_payment text := coalesce(nullif(trim(p_payment_method), ''), 'Cash on Delivery');
begin
  if v_customer_id is null then raise exception 'Sign in before placing an order.'; end if;
  if length(trim(coalesce(p_customer_name, ''))) < 2 then raise exception 'Enter your name.'; end if;
  if trim(coalesce(p_phone, '')) !~ '^09[0-9]{9}$' then raise exception 'Enter a valid contact number.'; end if;
  if length(trim(coalesce(p_address, ''))) < 5 then raise exception 'Enter your complete address.'; end if;
  if p_fulfillment not in ('Pick Up', 'Delivery') then raise exception 'Choose pickup or delivery.'; end if;
  if (p_fulfillment = 'Pick Up' and v_payment <> 'Cash on Pickup')
     or (p_fulfillment = 'Delivery' and v_payment <> 'Cash on Delivery') then
    raise exception 'Choose cash on pickup or cash on delivery to match your fulfillment selection.';
  end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then raise exception 'Your cart is empty.'; end if;

  v_is_davao := position(
    'davao city' in regexp_replace(lower(coalesce(p_address, '')), '[[:space:]]+', ' ', 'g')
  ) > 0;

  for v_item in select value from jsonb_array_elements(p_items) loop
    if coalesce(v_item ->> 'product_id', '') !~ '^[0-9]+$'
       or coalesce(v_item ->> 'quantity', '') !~ '^[0-9]+$' then
      raise exception 'Invalid product in cart.';
    end if;
    v_quantity := (v_item ->> 'quantity')::integer;
    if v_quantity < 1 then raise exception 'Invalid quantity in cart.'; end if;

    select * into v_product
    from public.products
    where id = (v_item ->> 'product_id')::integer
    for update;
    if not found then raise exception 'A product in your cart is no longer available.'; end if;
    if v_product.stock < v_quantity then raise exception 'Insufficient stock for %.', v_product.name; end if;
    if v_product.category in ('Drinks', 'Sweets') then v_has_fresh := true; end if;
    if v_product.category in ('Powder', 'Merchandise') then v_has_delayed := true; end if;
    v_subtotal := v_subtotal + (v_product.price * v_quantity);
  end loop;

  if v_has_fresh and not v_is_davao then
    raise exception 'Drinks and sweets are only available in Davao City.';
  end if;

  if p_fulfillment = 'Delivery' then
    v_shipping := case when v_is_davao and v_has_fresh then 99 else 49 end;
  end if;

  if coalesce(p_promo_mode, 'none') <> 'none' and nullif(trim(p_promo_code), '') is not null then
    if p_promo_mode = 'voucher' then
      case p_promo_code
        when 'LAVUR50' then if v_subtotal >= 300 then v_discount := 50; end if;
        when 'WELCOME100' then if v_subtotal >= 500 then v_discount := 100; end if;
        when 'FREESHIP' then if v_subtotal >= 200 then v_discount := v_shipping; end if;
        else raise exception 'Invalid voucher.';
      end case;
    elsif p_promo_mode = 'discount' then
      case p_promo_code
        when 'NEWOPEN10' then v_discount := v_subtotal * 0.10;
        when 'GRANDOPEN15' then if v_subtotal >= 600 then v_discount := v_subtotal * 0.15; end if;
        when 'MATCHA20' then if v_subtotal >= 1000 then v_discount := v_subtotal * 0.20; end if;
        else raise exception 'Invalid discount.';
      end case;
    else
      raise exception 'Invalid promo selection.';
    end if;
  end if;

  v_discount := least(v_discount, v_subtotal + v_shipping);
  v_total := greatest(0, v_subtotal + v_shipping - v_discount);
  v_estimate := case
    when p_fulfillment = 'Pick Up' then 'Pickup selected'
    when v_is_davao and v_has_fresh and v_has_delayed then 'Drinks and sweets: minutes; Powder and merchandise: 2-4 days'
    when v_is_davao and v_has_fresh then 'Drinks and sweets: minutes'
    else 'Powder and merchandise: 2-4 days'
  end;

  insert into public.orders (
    order_number, customer_id, customer_name, customer_email, phone, address,
    note, fulfillment, delivery_estimate, shipping_fee, subtotal, discount,
    promo_code, payment_method, total, status
  ) values (
    v_order_number, v_customer_id, trim(p_customer_name), v_email, trim(p_phone),
    trim(p_address), coalesce(p_note, ''), p_fulfillment, v_estimate, v_shipping,
    v_subtotal, v_discount, nullif(trim(p_promo_code), ''), v_payment, v_total,
    'To Ship'
  ) returning id into v_order_id;

  for v_item in select value from jsonb_array_elements(p_items) loop
    v_quantity := (v_item ->> 'quantity')::integer;
    select * into v_product
    from public.products
    where id = (v_item ->> 'product_id')::integer
    for update;
    if v_product.stock < v_quantity then raise exception 'Insufficient stock for %.', v_product.name; end if;
    update public.products set stock = stock - v_quantity where id = v_product.id;
    insert into public.order_items (order_id, product_id, product_name, unit_price, quantity)
    values (v_order_id, v_product.id, v_product.name, v_product.price, v_quantity);
  end loop;

  delete from public.cart_items where customer_id = v_customer_id;
  return v_order_id;
end;
$$;

revoke all on function public.place_matcha_order(text, text, text, text, text, text, text, text, jsonb) from public;
grant execute on function public.place_matcha_order(text, text, text, text, text, text, text, text, jsonb) to authenticated;

create or replace function public.customer_matcha_order_action(
  p_order_id uuid,
  p_action text,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_order public.orders%rowtype;
begin
  if auth.uid() is null then raise exception 'Sign in before updating an order.'; end if;
  select * into v_order from public.orders
  where id = p_order_id and customer_id = auth.uid()
  for update;
  if not found then raise exception 'Order not found.'; end if;

  if p_action = 'cancel' and v_order.status = 'To Ship' then
    update public.orders set status = 'Cancelled' where id = p_order_id;
  elsif p_action = 'received' and v_order.status = 'To Receive' then
    update public.orders set status = 'Completed' where id = p_order_id;
  elsif p_action = 'refund' and v_order.status = 'Completed' and length(trim(coalesce(p_reason, ''))) > 0 then
    update public.orders set status = 'Return/Refund', refund_reason = trim(p_reason) where id = p_order_id;
  else
    raise exception 'This order cannot be updated with that action.';
  end if;
end;
$$;

revoke all on function public.customer_matcha_order_action(uuid, text, text) from public;
grant execute on function public.customer_matcha_order_action(uuid, text, text) to authenticated;

create or replace function public.toggle_matcha_review_vote(p_review_id uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if auth.uid() is null then raise exception 'Sign in to mark a review helpful.'; end if;
  if exists (select 1 from public.review_votes where review_id = p_review_id and customer_id = auth.uid()) then
    delete from public.review_votes where review_id = p_review_id and customer_id = auth.uid();
  else
    insert into public.review_votes (review_id, customer_id) values (p_review_id, auth.uid());
  end if;
  select count(*) into v_count from public.review_votes where review_id = p_review_id;
  return v_count;
end;
$$;

revoke all on function public.toggle_matcha_review_vote(uuid) from public;
grant execute on function public.toggle_matcha_review_vote(uuid) to authenticated;

create or replace function public.submit_matcha_review(
  p_product_id integer,
  p_stars integer,
  p_review_text text,
  p_photo_url text default '',
  p_order_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_customer_id uuid := auth.uid();
  v_customer_name text;
  v_review_id uuid;
begin
  if v_customer_id is null then raise exception 'Sign in before submitting a review.'; end if;
  if p_stars < 1 or p_stars > 5 or length(trim(coalesce(p_review_text, ''))) = 0 then
    raise exception 'Choose a rating and enter a review.';
  end if;
  select full_name into v_customer_name from public.profiles where id = v_customer_id;

  if p_order_id is not null then
    if not exists (
      select 1 from public.orders o
      join public.order_items i on i.order_id = o.id
      where o.id = p_order_id and o.customer_id = v_customer_id
        and o.status = 'Completed' and i.product_id = p_product_id and not o.rated
    ) then
      raise exception 'A completed order containing this product is required to rate it.';
    end if;
    update public.orders set rated = true where id = p_order_id;
  end if;

  insert into public.reviews (customer_id, customer_name, product_id, stars, review_text, photo_url)
  values (v_customer_id, coalesce(v_customer_name, ''), p_product_id, p_stars, trim(p_review_text), coalesce(p_photo_url, ''))
  returning id into v_review_id;
  return v_review_id;
end;
$$;

revoke all on function public.submit_matcha_review(integer, integer, text, text, uuid) from public;
grant execute on function public.submit_matcha_review(integer, integer, text, text, uuid) to authenticated;

alter table public.orders add column if not exists stock_restored boolean not null default false;

create or replace function public.mark_matcha_order_stock_restored()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if not old.stock_restored and (
    (old.status is distinct from new.status and new.status = 'Cancelled')
    or (old.refund_decision is distinct from new.refund_decision and new.refund_decision = 'Approved')
  ) then
    new.stock_restored := true;
  end if;
  return new;
end;
$$;

drop trigger if exists mark_matcha_stock_restored_before_order_update on public.orders;
create trigger mark_matcha_stock_restored_before_order_update
before update of status, refund_decision on public.orders
for each row execute function public.mark_matcha_order_stock_restored();

create or replace function public.restore_matcha_order_stock()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not old.stock_restored and new.stock_restored then
    update public.products p
    set stock = p.stock + items.quantity
    from public.order_items items
    where items.order_id = new.id and p.id = items.product_id;
  end if;
  return new;
end;
$$;

drop trigger if exists restore_matcha_stock_after_order_update on public.orders;
create trigger restore_matcha_stock_after_order_update
after update on public.orders
for each row execute function public.restore_matcha_order_stock();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('matcha-review-photos', 'matcha-review-photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('matcha-profile-photos', 'matcha-profile-photos', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "Review photos are public" on storage.objects
  for select to anon, authenticated using (bucket_id = 'matcha-review-photos');
create policy "Customers upload their own review photos" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'matcha-review-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy "Photo owner or store owner deletes review photos" on storage.objects
  for delete to authenticated using (
    bucket_id = 'matcha-review-photos'
    and ((storage.foldername(name))[1] = (select auth.uid())::text or (select public.is_matcha_owner()))
  );
create policy "Profile photos are public" on storage.objects
  for select to anon, authenticated using (bucket_id = 'matcha-profile-photos');
create policy "Customers upload their own profile photos" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'matcha-profile-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy "Customers update or delete own profile photos" on storage.objects
  for all to authenticated using (
    bucket_id = 'matcha-profile-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  ) with check (
    bucket_id = 'matcha-profile-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

grant select on public.products to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.cart_items, public.wishlist_items to authenticated;
grant select, update on public.orders to authenticated;
grant select on public.order_items to authenticated;
grant select, delete on public.reviews to anon, authenticated;
grant select, insert, delete on public.review_votes to authenticated;
grant select, insert, delete on public.messages to authenticated;
grant usage, select on sequence public.order_items_id_seq to authenticated;

create or replace function public.matcha_review_vote_counts()
returns table (review_id uuid, vote_count bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select votes.review_id, count(*)
  from public.review_votes as votes
  group by votes.review_id;
$$;

revoke all on function public.matcha_review_vote_counts() from public;
grant execute on function public.matcha_review_vote_counts() to anon, authenticated;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['orders', 'order_items', 'products', 'profiles', 'reviews', 'messages'] loop
    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = table_name
    ) then
      execute format('alter publication supabase_realtime add table public.%I', table_name);
    end if;
  end loop;
end;
$$;
