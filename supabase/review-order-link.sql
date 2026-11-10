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

  if p_order_id is null or not exists (
    select 1 from public.orders o
    join public.order_items i on i.order_id = o.id
    where o.id = p_order_id and o.customer_id = v_customer_id
      and o.status = 'Completed' and i.product_id = p_product_id and not o.rated
  ) then
    raise exception 'A completed order containing this product is required to rate it.';
  end if;
  update public.orders set rated = true where id = p_order_id;

  insert into public.reviews (customer_id, customer_name, product_id, stars, review_text, photo_url)
  values (v_customer_id, coalesce(v_customer_name, ''), p_product_id, p_stars, trim(p_review_text), coalesce(p_photo_url, ''))
  returning id into v_review_id;
  return v_review_id;
end;
$$;

revoke all on function public.submit_matcha_review(integer, integer, text, text, uuid) from public;
grant execute on function public.submit_matcha_review(integer, integer, text, text, uuid) to authenticated;
