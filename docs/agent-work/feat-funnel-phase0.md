# feat/funnel-phase0 (web)
`/partners/usage` (app/partners/(admin)/usage/page.tsx) and `app/partners/api.ts` `FunnelStep` show the new events: onboarding bars gain success CTA, email done/skip, permissions, trial, paid, widget, LA (bars scale to `ob_welcome`); paywall block gains `pw_view_onboarding` / `pw_view_other`. Data only appears once the relay branch is deployed and app sends events.
NOT merged: web `main` deploys live on Vercel; owner decides. `tsc` shows only the pre-existing PageProps/RouteContext errors (none under partners).
