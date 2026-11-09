# Matcha Lavur

A browser-based storefront for Matcha Lavur drinks, sweets, powders, and merchandise. Supabase provides customer authentication, shared product stock, carts, orders, reviews, photos, and customer-owner messages.

## Supabase setup

1. In the Supabase project SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql) once. It creates the tables, row-level security policies, storage buckets, order/review functions, and realtime configuration.
2. In **Authentication → URL Configuration**, set the deployed Vercel site URL and add each allowed site URL as a redirect URL. For local testing, use `http://localhost:8000`.
3. Keep email confirmation enabled for customer accounts. Configure Google/Facebook providers in Supabase only if those sign-in buttons are needed.
4. Create the owner account from the website using `matchalavur@gmail.com`, then confirm the email. The owner dashboard and database-level owner permissions are based on that authenticated email; the password is managed in Supabase Auth and is not stored in this repository.
5. Deploy the site on Vercel. When the connected GitHub branch is updated, Vercel can deploy the new version.

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
