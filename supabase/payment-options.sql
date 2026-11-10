-- Updates the installed order RPC to accept supported manual payment methods.
-- Safe to run again after the payment validation has already been updated.
do $$
declare
  v_source text;
  v_updated_source text;
  v_pattern text := $pattern$if \(p_fulfillment = 'Pick Up' and v_payment <> 'Cash on Pickup'\)[[:space:]]+or \(p_fulfillment = 'Delivery' and v_payment <> 'Cash on Delivery'\) then[[:space:]]+raise exception 'Choose cash on pickup or cash on delivery to match your fulfillment selection\.';[[:space:]]+end if;$pattern$;
  v_replacement text := $replacement$if v_payment not in ('Cash on Pickup', 'Cash on Delivery', 'GCash', 'Maya', 'Online Banking') then
    raise exception 'Choose a supported payment method.';
  end if;
  if (p_fulfillment = 'Pick Up' and v_payment = 'Cash on Delivery')
     or (p_fulfillment = 'Delivery' and v_payment = 'Cash on Pickup') then
    raise exception 'Choose a cash payment method that matches your pickup or delivery selection.';
  end if;$replacement$;
begin
  select pg_get_functiondef(
    'public.place_matcha_order(text, text, text, text, text, text, text, text, jsonb)'::regprocedure
  ) into v_source;

  if position('v_payment not in (' in v_source) > 0 then
    return;
  end if;

  v_updated_source := regexp_replace(v_source, v_pattern, v_replacement, 's');
  if v_updated_source = v_source then
    raise exception 'Could not update place_matcha_order. Apply the updated supabase/schema.sql or inspect the installed function.';
  end if;

  execute v_updated_source;
end;
$$;
