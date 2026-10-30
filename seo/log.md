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

## 2026-10-25 (1.0.4 on the site, by hand)

- Owner decision: present 1.0.4 as live before App Review finishes. New guide `dexcom` in es/en/de/fr/it (Dexcom on
  Apple Watch, Lock Screen and CarPlay; target queries "dexcom apple watch", "dexcom lock screen", "dexcom carplay",
  "dexcom follow alternative"). Home sensors card, FAQ, featureList and `/llms.txt` now list Dexcom G6/G7/ONE+;
  "Nightscout on the way" removed. Comparison guide updated in 5 languages. IndexNow: 133 URLs.
- App Store Connect 1.0.4: de/fr/it localized (names, subtitles, keywords, promo, What's New; fr/it new).

## 2026-10-26 (by hand)

- Published `dexcom-follow-alternative` in es/en/de/fr/it: Dexcom Follow, Sugarmate and Dulce compared from their
  App Store listings and Dexcom's Sugarmate page (checked 2026-10-26), with where the others are the better pick
  (25 sharers, alerts on silent, statistics). Target queries: "dexcom follow alternative", "sugarmate alternative",
  "dexcom follow widget", "alternativa dexcom follow".
- Alerts and family-sharing guides now cover Dexcom (alarms, 5-minute rhythm, Share troubleshooting).

## 2026-10-28 (daily run, Mac)

- Search Console (gum, 2026-09-28 to 2026-10-26): 225 query/page rows, 385 impressions. Most impressions go to the
  tools (glucose converter 81 en + 36 es, A1C calculator 57); top article queries ("libre widget iphone",
  "librelinkup no funciona", "librelinkup keine aktuellen daten") already rank 5-8 on their own guides. No single
  query has enough impressions to justify a rewrite.
- `npm run seo:gaps`: ~1,500-1,750 uncovered queries per language. Recurring health cluster with no article:
  "blutzuckerwerte tabelle", "blutzucker tabelle nach alter", "diabetes typ 1 werte tabelle", "glucosa valores
  normales (en sangre / en mujeres / en hombres)", "glucosa glicosilada valores normales", "valori glicemia".
- Topic: **blood sugar levels table** (keyword-volumes: "blutzuckerwerte tabelle" DE 1K-10K, marked strong
  candidate; "hba1c"/"hemoglobina glicosilada" 10K-100K with no dedicated article; listed in PLAN.md roadmap
  "blood sugar tables with consensus sources"). One page with normal / prediabetes / diabetes thresholds,
  treatment targets and HbA1c, in mg/dL and mmol/L, linked to the converter, A1C calculator and time in range.
- Published `blood-sugar-levels` (es/en/de/fr/it, category health, author giorgi). Slugs: es
  `valores-normales-glucosa-tabla`, en `blood-sugar-levels-chart`, de `blutzuckerwerte-tabelle`, fr
  `glycemie-normale-tableau`, it `valori-glicemia-tabella`. Target queries: "blutzuckerwerte tabelle", "normale
  blutzuckerwerte", "glucosa valores normales", "hemoglobina glicosilada valores normales", "blood sugar levels
  chart", "glycémie normale", "valori glicemia". Linked from `time-in-range` (A1C paragraph, 5 languages,
  dateModified bumped, `related`) and from both calculators' `guides` in lib/tools.ts (required by check:content).
- Checked against dulce-app main (693a2f8): Settings rows Target range / Units open settings/glucose.tsx; target low
  50-150, high 120-300, step 5, default 70-180; TIR goal 50-95, step 5, default 70; unit note (app, Lock Screen,
  widgets); Trends ranges 7/14/30/90 d; "Est. A1C from GMI" labels in all 5 locales.
- Sources: ADA Standards 2026 sections 2 (DOI and pages confirmed via Europe PMC; cut-offs via guideline summaries,
  unchanged for years) and 6; WHO/IDF 2006 (IFG from 110 mg/dL); Shah 2019 JCEM (healthy CGM: mean 98-99, median
  96% in 70-140, ~30 min >140, ~15 min <70); Battelino 2019; Hoelzel 2004 (IFCC/NGSP, conversions computed with the
  lib/tools.ts equation). Left out unverified 2026 numbers for older adults and children (only "individualized").
  Removed a claim about which countries' labs use the WHO line (couldn't back it).
- `npm run check:content` (17 articles, 0 errors; 17 warnings = missing summaries, left for Giorgi) and
  `npm run build` passed. Deployed (d5304d5, page live), `npm run indexnow`: 143 URLs → 200.

## 2026-10-29 (SEO, conversion and legal accuracy pass)

- Used the supplied early GSC/GA4 snapshot as directional evidence: the English widget guide remains the strongest
  organic landing page (14 clicks / 355 impressions in the 28-day sample). Preserved its URL/body and refined the
  English/German titles to bring the iPhone widget intent forward; no extra near-duplicate page was created.
- Tightened App Store campaign attribution to Apple's 30-character `ct` limit; outbound store clicks include
  campaign, CTA placement and locale, and successful Android waitlist submissions now send a PII-free `sign_up`
  event. GA4 remains a web-click/signup measure; App Store Connect is still required for download/subscription
  attribution.
- Audited Privacy, Terms, Cookies and Medical Disclaimer against actual site/app/relay data flows in all five
  locales. Improved provider, form, analytics, consent, deletion/retention, consumer-rights and medical-safety
  wording; documented unresolved counsel and engineering follow-ups in `seo/growth-audit-2026-10-29.md`.
- No Search Console URL list or live GA4/App Store Connect export was available, so no indexing actions, traffic
  claims or conversion lift are reported.
- Verification: `npm run check:content` (17 articles, 0 errors/warnings), `npm run lint`, `npm run typecheck`,
  `npm run build -- --webpack`, `check:jsonld` (155 sitemap pages, 575 JSON-LD blocks, all references resolve), and
  `check:crawl` (155 pages, 172 internal links/images; all 200, self-canonical, one H1, no linked redirects) passed.
  The default Turbopack build stalled in this environment; webpack completed successfully. The localhost preview
  required binding to `localhost` for default-locale rewrites.

## 2026-10-30 (daily run, Mac)

- Search Console (gum, 2026-09-30 to 2026-10-28): 1,054 impressions over 500 query/page rows. The `libreview`
  article takes 609 of them (58%) with **0 clicks**: it 372 impr at avg position 7.2 ("libreview", "libre view",
  "libreview accedi", misspellings), es 105 (pos 8.9), fr 64 (pos 12.4, "libreview se connecter / connexion / mon
  compte"), en 50 (pos 9, "libreview login"), de 18. Searchers want to log in; the snippet answers "what it is".
- `npm run seo:gaps`: ~1,500-1,750 uncovered queries per language; LibreView leftovers are "libreview app",
  "libreview download". No new topic beats a page that already ranks top-10 for a 10K-100K keyword with 0% CTR.
- Decision: **improve `libreview`** instead of a new article: login-first titles/descriptions, a "can't log in"
  section and a short "is there a LibreView app / how to download reports" answer, only with facts I can source.
