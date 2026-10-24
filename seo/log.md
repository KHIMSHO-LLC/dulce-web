# SEO log

Each daily run appends one entry: date, what was published or improved, target queries and why.

## 2026-10-19 (setup, by hand)

- Restored articles under /blog (the 2026-10-14 redesign had redirected them to the home page) and added German.
- Published 10 guides in es/en/de: apple-watch, time-in-range, family-sharing (old slugs kept), lock-screen,
  widgets, alerts, librelinkup-not-working, trends, logbook, apple-health. Plus 2 calculators.
- Search Console (3 months to 2026-10-17): 1.15K impressions, 10 clicks. Top queries: "librelinkup login" (18
  impr, pos 12), "librelinkup" (14, pos 35), "librelink vs librelinkup" (8, pos 9.5), Apple Watch + CGM queries.
  Top page: the Apple Watch article (399 impr, pos 8.2).
- Ideas from seo/gaps.json for next runs: "librelinkup must accept terms of use", "libre 3 signal loss",
  "libre 2 plus app", "libre 3 plus vs libre 3", "blutzuckerwerte tabelle", "hipoglucemia nocturna".

## 2026-10-22 (by hand, cloud session)

- Fixed "Page with redirect" in Search Console: Spanish in-article links pointed at /es/... URLs that redirect.
- Published `child-glucose` (es/en/de): parents and caregivers following a child or an older parent. Target queries:
  "ver glucosa de mi hijo", "monitor child glucose remotely", "blutzucker kind überwachen" (moved off family-sharing,
  which now targets the wearer's side only).
- Added "Quick questions" with FAQPage JSON-LD to all 11 articles, home JSON-LD featureList/audience, /llms.txt.
- Reviewed an external SEO/ASO brief: kept what's true, rejected Dexcom/chat claims. Plan in seo/PLAN.md,
  App Store metadata draft in seo/aso.md.
- Later the same day: French and Italian site (/fr, /it) with all 11 guides, calculators and FAQ; App Store copy for
  fr/it in seo/aso.md; app translated to fr/it (dulce-app branch i18n/fr-it). Search Console "Page with redirect"
  validation failed on 2026-10-17 because those URLs (http, www, retired routes) are correct permanent redirects;
  documented in seo/PLAN.md, nothing to fix there.

## 2026-10-23 (daily run, cloud)

- Search Console (step 1a) skipped: not reachable from the cloud environment. `npm run seo:gaps` returned 0 queries
  because the cloud network policy blocks Google/App Store suggest endpoints (403), so gaps.json is empty today.
- `npm ci` fails with npm 10 (lock file missing `@swc/helpers@0.5.23`); `npx npm@11 ci` installs cleanly.
  Worth regenerating package-lock.json on the Mac.
- Topic from seo/keyword-volumes.md: night lows. "hipoglucemia nocturna" (ES 100-1K), "unterzuckerung nachts" and
  "nächtliche unterzuckerung" (DE 100-1K each), no article covers them, listed as a strong candidate in PLAN.md and
  the 2026-10-19 entry. Dulce genuinely helps here (critical low through silent/quiet hours, followers' alerts,
  Lock Screen at a glance).
- Published `night-lows` (es/en/de/fr/it, category health, author giorgi). Slugs: hipoglucemia-nocturna,
  nocturnal-hypoglycemia, naechtliche-unterzuckerung, hypoglycemie-nocturne, ipoglicemia-notturna. Target queries:
  "hipoglucemia nocturna", "unterzuckerung nachts", "nächtliche unterzuckerung", "nocturnal hypoglycemia",
  "hypoglycémie nocturne", "ipoglicemia notturna", plus "compression low libre". Linked from `trends` (Time of day
  bullet, 5 languages, dateModified bumped).
- Checked against dulce-app main: alertRules.ts (critical low <=55 ignores quiet hours, quiet hours mute the low
  alert and predictive low, predictive = 3 consecutive drops + >=2 mg/dL/min + 15 min horizon), alertEngine.ts
  (global snooze never blocks critical low, critical repeats every 5 min), locales for labels.
- **Found a wrong claim on the site:** the released app can't ring through silent mode
  (`CRITICAL_ALERTS_ENTITLEMENT_APPROVED = false`, no critical/time-sensitive entitlement in app.json; same on
  release/1.0.4). `alerts`, `child-glucose`, `librelinkup-not-working` and /llms.txt still say it does. Not changed
  today (title/keyword decision for Giorgi, added to PLAN.md "For Giorgi" #10); the new article states the real
  behaviour (keep silent mode off at night, allow Dulce in the Sleep Focus). Owner notified.
- Sources (via web search; primary sites like doi.org/pubmed/nhs.uk are blocked by the cloud network, so citations
  were verified from search snippets of the publisher/PubMed records): ADA Standards of Care 2026 section 6
  (dc26-S006), Battelino 2019 TIR consensus, Banarer & Cryer 2003 (Diabetes), Schultes 2007 (PLoS Med),
  Mensh 2013 (JDST, sleeping position), Riddell 2017 (exercise consensus).
- `npm run check:content` (12 articles, 0 errors, 0 warnings) and `npm run build` passed.

## 2026-10-24 (daily run, cloud)

- Search Console (step 1a) skipped: not available in the cloud environment. `npm run seo:gaps` returned 0 queries
  again (suggest endpoints blocked by the cloud network). `npm ci` still fails with npm 10; `npx npm@11 ci` works.
- Topic from seo/keyword-volumes.md: **"libreview"** (ES 10K-100K, DE 1K-10K, the highest-volume keyword no article
  covers). People who search it are confused about which Abbott account is which; Dulce's own sign-in rejects
  LibreLink/LibreView credentials, so explaining the three accounts helps both readers and Dulce setup.
- Published `libreview` (es/en/de/fr/it, category help, author levan). Slug `libreview` in every language. Target
  queries: "libreview", "libreview login", "what is libreview / qué es libreview", "libreview practice id / Praxis-ID",
  "libreview vs librelinkup". Linked from `librelinkup-not-working` ("right account" paragraph, 5 languages,
  dateModified bumped).
- Checked against dulce-app main: onboarding locales (sign-in failure says the most common reason is LibreLink
  details; Dulce needs the LibreLinkUp follower account), libre/client.ts (only login/terms POSTs and reads; nothing
  sent to LibreView), Trends labels (Time in range, Est. A1C from GMI). fr/it tab labels follow the existing `trends`
  article (fr/it locales are not on dulce-app main yet).
- Sources (abbott/libreview sites are not reachable from the cloud, verified via search snippets): Abbott LibreView
  provider page (AGP, Daily Patterns, Glucose Pattern Insights, not for treatment decisions), Abbott FAQ on uploading
  Libre 3 reader data (manual USB upload, drivers), West Herts NHS "Libre apps" leaflet (same login as LibreLink,
  practice ID via Connected Apps → LibreView), LibreLinkUp FAQs, Battelino 2019. Left out claims I couldn't confirm
  (exact Abbott menu labels per language, whether LibreView is free, removing a practice from the app).
- `npm run check:content` (13 articles, 0 errors, 0 warnings) and `npm run build` passed.
