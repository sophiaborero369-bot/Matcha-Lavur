-- Run after payment-options.sql to allow the expanded e-wallet, bank, and demo card options.
-- Safe to run again if the provider list has already been updated.
do $$
declare
  v_source text;
  v_updated_source text;
  v_pattern text := $pattern$if v_payment not in \([^)]*\)[[:space:]]+then[[:space:]]+raise exception 'Choose a supported payment method\.';[[:space:]]+end if;$pattern$;
  v_replacement text := $replacement$if v_payment not in ('Cash on Pickup', 'Cash on Delivery', 'GCash', 'Maya', 'PayPal', 'Online Banking', 'BDO Online Banking', 'Other Online Banking', 'Credit/Debit Card (Demo)') then
    raise exception 'Choose a supported payment method.';
  end if;$replacement$;
begin
  select pg_get_functiondef(
    'public.place_matcha_order(text, text, text, text, text, text, text, text, jsonb)'::regprocedure
  ) into v_source;

  if position('Credit/Debit Card (Demo)' in v_source) > 0 then
    return;
  end if;

  v_updated_source := regexp_replace(v_source, v_pattern, v_replacement, 's');
  if v_updated_source = v_source then
    raise exception 'Could not update place_matcha_order. Run payment-options.sql first, then retry.';
  end if;

  execute v_updated_source;
end;
$$;
