# Privacy and SEO follow-ups

Prepared 2026-10-29 after the localized legal-page review.

## Privacy counsel review

Please confirm these facts and decisions before treating the legal pages as final:

1. **Controller identity and address.** Since 2026-10-30 the legal pages name the controller
   (Giorgio Khimshiashvili, sole trader) without a country, and the terms use the law of the
   operator's place of establishment. Confirm this satisfies GDPR Art. 13 (identity and contact
   details) and whether an EU representative under Art. 27 is needed for a controller
   established outside the EU. [Public App Store listing](https://apps.apple.com/us/app/dulce-glucose-at-a-glance/id6770694596)
2. **Health-data consent.** The app links to the Privacy Policy during onboarding, but the
   current flow has no separate health-data consent checkbox. Confirm the applicable legal basis
   for each health-data operation and whether the interface needs a distinct, explicit,
   withdrawable opt-in and consent record.
3. **Provider roles and transfers.** Confirm the roles, DPAs, subprocessors, transfer terms,
   and retention settings for Abbott/LibreLinkUp, Dexcom, Cloudflare, Supabase, Vercel, Resend,
   Google Analytics, Apple, and Google.
4. **Retention periods and wording.** Confirm the six-month post-Android-launch waitlist window,
   beta-plus-twelve-month window, email-system retention, relay event windows, and Cloudflare log
   retention. Review all five language versions (Spanish, English, German, French, Italian).
5. **Medical and consumer wording.** Confirm the updated CGM safety, subscription, withdrawal,
   and warranty wording for the jurisdictions where Dulce is offered.

This is a fact and question brief for counsel, not a legal opinion or sign-off.

## Retention automation status

The web repo now has a daily Vercel Cron handler at `/api/cron/retention`. It remains inactive
unless `ENABLE_RETENTION_CLEANUP=true`; when enabled it is authenticated with `CRON_SECRET`. It
does not delete anything until the corresponding event date is configured:

- `ANDROID_LAUNCH_DATE=YYYY-MM-DD`: waitlist rows become eligible six calendar months later.
- `BETA_END_DATE=YYYY-MM-DD`: beta-interest rows become eligible twelve calendar months later.

Before enabling it, set and verify those dates in Vercel and set a strong `CRON_SECRET`; set
`ENABLE_RETENTION_CLEANUP=true` last. A missing date is a no-op for that table. After the cleanup
is active, update the five Privacy pages so the published wording reflects automatic deletion.
Contact messages are email-only; configure and verify mailbox and Resend retention separately.

The relay no longer emits raw installation IDs, glucose values, alert kinds, sensor-request text,
or app lifecycle debug lines in the reviewed log paths. New worker deployments are needed for
this to affect production logs. Existing Cloudflare log records should expire under the current
retention setting; the code change cannot erase already stored provider logs.

## SEO data needed for the next analysis

Export aggregate, non-user-level data and attach the files to this task:

1. **Search Console performance:** Search type `Web`, date range `Last 16 months`; export the
   `Queries` and `Pages` tables. Also export `Countries` and `Devices` for the same range.
2. **Search Console indexing:** export the affected URL list from `Page indexing` (including the
   reason/status) and the current sitemap report. The export lets us inspect exact URLs instead
   of inferring them from totals.
3. **GA4 acquisition and landing pages:** aggregate sessions, engaged sessions, conversions, and
   revenue if configured, grouped by landing page, session source/medium, campaign, country, and
   device for the same period. Include `sign_up` and App Store link-click events where available.

Do not include email addresses, installation IDs, raw health data, or user-level exports. The
current task has no connected Search Console or Analytics data source, so those account exports
must be supplied before I can rank opportunities against actual impressions, clicks, and signups.
