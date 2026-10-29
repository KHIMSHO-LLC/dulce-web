# Supabase setup

Marketing site uses Supabase for two tables: `waitlist` and `beta_interest`.

## Bootstrap

1. Create a new Supabase project in the **EU (eu-west-3)** region.
2. Apply the schema:
   - Open Supabase Studio → SQL Editor
   - Paste the contents of `migrations/0001_init_lists.sql`
   - Run
3. Copy the **Project URL** and the **service-role key** from Project Settings → API.
4. Add them to Vercel env (Project Settings → Environment Variables):
   - `SUPABASE_URL` = the project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = the service-role key (never expose to the client)
   - `RATELIMIT_SALT` = any random ≥ 32-char string

## Why service-role only

Inserts happen exclusively from Server Actions, never from the browser. RLS is enabled on both tables with **no policies**, which means anon/auth clients are blocked by default. The service-role key bypasses RLS — keep it on the server.

## GDPR notes

- `ip_hash` is a SHA-256 of the IP plus a daily-rotating salt. Raw IPs are never stored.
- Right-to-erasure requests: delete rows by email from Studio (Table editor → filter `email = …` → delete).
- Data export: Studio → Table editor → Export CSV.

## Scheduled retention cleanup

Vercel runs `/api/cron/retention` daily at 03:30 UTC. Cleanup remains disabled unless
`ENABLE_RETENTION_CLEANUP=true`. Once enabled, the handler requires `CRON_SECRET` and refuses
requests unless it matches the `Authorization: Bearer …` header that Vercel sends.

The cleanup is deliberately inactive until the relevant event date is configured:

- `ANDROID_LAUNCH_DATE=YYYY-MM-DD` enables deletion of waitlist rows older than six calendar
  months after the Android launch date.
- `BETA_END_DATE=YYYY-MM-DD` enables deletion of beta-interest rows older than twelve calendar
  months after the beta ends.

Set each date only after the event has occurred and its date is confirmed. Keep
`ENABLE_RETENTION_CLEANUP` unset until the dates and `CRON_SECRET` have been verified. The route
deletes only rows older than the published retention cutoff; missing dates mean no deletion for
that table. It logs deletion counts, never emails or row contents. Contact-form messages are
delivered by email and are not stored in these tables; mailbox and Resend retention still need to
be set and reviewed in those services.
