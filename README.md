# Matcha Lavur

A browser-based storefront for Matcha Lavur drinks, sweets, powders, and merchandise. Supabase provides customer authentication, shared product stock, carts, orders, reviews, photos, and customer-owner messages.

## Supabase setup

1. In the Supabase project SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql) once. It creates the tables, row-level security policies, storage buckets, order/review functions, and core realtime configuration.
2. Run [`supabase/realtime.sql`](./supabase/realtime.sql) after the schema. This safely adds cart, wishlist, and review-vote changes to Supabase Realtime.
3. If using Supabase's built-in email sender, run [`supabase/auth-without-email-confirmation.sql`](./supabase/auth-without-email-confirmation.sql), then turn off **Authentication → Sign In / Providers → Confirm email**. This avoids confirmation emails, which are limited on Supabase's built-in sender. Unverified email addresses are less secure; configure custom SMTP and re-enable confirmation for production.
4. In **Authentication → URL Configuration**, set the deployed Vercel site URL and add each allowed site URL as a redirect URL. For local testing, use `http://localhost:8000`.
5. The owner dashboard is tied to the existing owner Auth user ID in the SQL migration, not merely an email address. Do not delete and recreate that Auth user without updating the owner ID in the migration and frontend. The password is managed in Supabase Auth and is not stored in this repository.
6. Configure custom SMTP under **Authentication → Emails → SMTP Settings** for reliable verified customer signups, password resets, and email delivery. Keep confirmation enabled when custom SMTP is configured.
7. Deploy the site on Vercel. When the connected GitHub branch is updated, Vercel can deploy the new version.

`supabase-config.js` contains the Supabase project URL and browser-safe publishable key. These are intended for the frontend; never put a Supabase service-role key in the site.

## Run locally

Serve the project directory over HTTP (rather than opening `index.html` directly), for example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`. The local origin must be allowed in Supabase Authentication URL Configuration.

## Ordering and payments

Customers can browse without an account; sign-in is required to add to cart, place orders, submit reviews, or message the owner. Drinks and sweets are restricted to Davao City. Powder and merchandise can be delivered outside Davao City (2–4 days). Pickup is available.

Checkout currently supports cash on delivery or cash on pickup only. No online payment provider is connected, and the website does not collect card, wallet, PIN, or OTP details.
