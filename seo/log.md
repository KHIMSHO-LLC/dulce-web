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
- Updated `libreview` (es/en/de/fr/it, dateModified 2026-10-30, slugs unchanged). Titles and descriptions now lead
  with the login answer ("LibreView accedi: come fare il login…", "LibreView login: how to sign in…", etc.); a short
  login answer opens each body; new sections "Can't log in to LibreView?" (LibreLinkUp details, no account /
  reader only, password reset, inactive-account deletion, contact Abbott; warning not to sign out of the sensor
  app) and "Is there a LibreView app?"; Abbott's newer **Libre** app added next to LibreLink / Libre 3; 2 new FAQs
  per language; summary rewritten; keywords add "libreview accedi / se connecter / mon compte / forgot password / app".
  Target queries: "libreview", "libre view", "libreview accedi", "libreview login", "libreview se connecter",
  "libreview connexion", "libreview mon compte", "libreview app".
- Facts checked: Abbott FAQs (LibreLink requires a LibreView login at setup; same credentials on libreview.com;
  reader users set up at libreview.com; LibreLink Forgot Password → emailed reset link; inactive accounts: no login
  or upload in 6 months → notice at least 28 days before deletion, Gulf-region Abbott pages; US "Libre app" uses the
  same credentials). App Store search API for "libreview" in es/it/de on 2026-10-30: no app named LibreView (only
  Abbott's Libre apps, incl. "Libre von Abbott - DE", and LibreLinkUp). Dulce's sign-in hint re-checked on dulce-app
  main (e53186d, en common.json: "these are your LibreLink details…"). Left out: exact libreview.com button labels
  and localized Abbott labels (couldn't read the JS sign-in page), whether a clinic can reset the account.
- `npm run check:content` (17 articles, 0 errors, 0 warnings) and `npm run build` passed. Deployed (522f65a, it page
  verified live), `npm run indexnow`: 155 URLs → 200. Next run: compare libreview CTR from ~2026-11-10.

## 2026-10-30 (owner-requested SEO/AEO hour, Mac)

- Search Console (gum, 2026-10-01 to 10-28, page level): 124 pages, 55 clicks, 4,214 impressions. LibreView pages
  1,760 impr / 0 clicks (reworked earlier today, compare from ~11-10). Converter en 191 impr pos 33.8, es 174 pos 30.4;
  A1C calculator en 78 impr pos 45.7 ("a1c calculator" 55, "gmi calculator" 57). /en/setup: "librelinkup login" pos 9.2,
  "librelink vs librelinkup" 8.3. Brand: "dulci app" home pos 11; "dulce app" lands on /android and /legal/terminos.
- Keyword discovery (Google autocomplete, en/es/de/fr/it): chart intent is big ("a1c chart", "a1c to average glucose
  chart", "mg/dl to mmol/l chart", "tabla hemoglobina glicosilada", "hba1c-wert tabelle", "emoglobina glicata
  conversione"); product-fit questions: "is there a libre 3 apple watch app", "libre 3 plus apple watch", "librelinkup
  apple watch / smartwatch / auf apple watch", "librelinkup alternative", "librelinkup no recent data / keine aktuellen
  daten", Dexcom Apple Watch complication/widget family. Not product fit (skipped): librelinkup pc/web, sensor prices,
  "alarms unavailable".
- Shipped: see PLAN.md 2026-10-30 calculators entry. Queue: converter job done; two new jobs (Dexcom watch/widget guide,
  Libre 3 Plus) added with evidence.
- Baseline to compare ~2026-11-20: converter head terms pos 30-75, A1C calculator pos 45-57, /en/setup "librelinkup
  login" 9.2, apple-watch en 34 impr pos 8.0.
- Checks: check:content (17 articles, 0/0), tsc, build (webpack), check:jsonld and check:crawl (155 pages) on a local
  production server, 390 px screenshots of the converter and the German HbA1c page.

## 2026-10-31 (owner-requested, interactive session)

- Keyword-list review (PR #10, merged): see `seo/keyword-research-2026-10-31.md`. Dexcom widget/watch sections,
  Libre 3 Plus / Dexcom widget FAQ, Canada vs US units, brand alternateName schema.
- New article `apple-watch-glucose` ("Can Apple Watch measure blood sugar?"), 5 languages, author Giorgi (his request).
  Evidence: autocomplete in every market ("blood sugar apple watch 11 / ultra 3", "blutzucker messen apple watch",
  "glicemia apple watch", "glycémie apple watch", "bloedsuiker meten apple watch", "medir glicemia apple watch").
  Facts: FDA safety communication 2024-02-21 (page still current), Gurman/Bloomberg via MacRumors (May 2026 leadership
  change, still years away), MacRumors Series 12 roundup (Sept 2026, no glucose sensor). Linked from `apple-watch`
  (intro, 5 languages) and the sensor end date calculator.
- Checks: check:content (18 articles, 0/0), tsc, lint, build, check:jsonld (160 pages); the 5 new URLs return 200.

## 2026-10-31: critical alerts

Apple granted the critical-alert entitlement. Site copy now says the critical low alert (55 mg/dL or less) rings on silent and in Do Not Disturb once the user allows critical alerts; other alerts still follow the silent switch. Updated: alerts, night-lows, child-glucose, librelinkup-not-working, dexcom-follow-alternative, glucose-apps-compared (5 languages), homepage alerts copy. The app build with the entitlement ships after this.

## 2026-11-01 (daily run, queue item: Libre 3 Plus)

- Queue top item done: "Libre 3 Plus app for iPhone" (targets "libre 3 plus app for iphone", "libre 3 plus compatible
  phones", "libre 3 plus apple watch"; keyword-volumes lists "freestyle libre 3 plus" as uncovered).
- Search Console (gum OK, 2026-10-02 to 10-30, query×page, 436 rows): zero impressions for any "3 plus" query, so per
  the queue no new article. Widget cluster for comparison: /en widgets "libre widget iphone" 13 impr pos 6.5,
  "freestyle libre widget iphone" 10 impr pos 6.0, "librelink widget iphone" 8 impr pos 5.0.
- Shipped (42f7a75): `lock-screen` new section "Does it work with the FreeStyle Libre 3 Plus?" (which Abbott app reads
  it, compatible phones = Abbott's list for the sensor phone, Dulce iOS 17+, same or other iPhone, 15 days / every
  minute) + Sources + FAQ + 3 Plus keywords; `widgets` new section "A widget for the FreeStyle Libre 3 Plus" (refresh
  cadence vs every-minute sensor, compatibility) + Sources. 5 languages, dateModified 2026-11-01 on both.
- Checked: dulce-app main (63c3eea) app.json deploymentTarget 17.0; src/lib/sensor.ts knows Libre 3 Plus (15 days),
  not claimed on the site because model detection is still partly unconfirmed (comment in code). Abbott pro IE page
  (15-day wear, readings every minute); Libre by Abbott App Store listing ("one app, any Libre sensor", shares via
  LibreView/LibreLinkUp; no widget/Live Activity mentioned, so no claim about it). Abbott compatibility pages vary per
  country (IE URL 404s), so the site points to "your country's FreeStyle Libre website" without a link or model list.
- check:content (18 articles, 0/0) and build passed. Deployed (en lock-screen verified live, dated 1 Nov),
  `npm run indexnow`: 160 URLs → 200. Compare: "3 plus" impressions on lock-screen/widgets ~2026-11-20.

## 2026-11-03 (daily run, Mac)

- Queue: every item ticked, so topic picked from data.
- Search Console (gum OK, 2026-10-04 to 11-01, query×page, 500 rows): 4,338 impressions, 16 clicks. LibreView is
  still ~80% of impressions ("libreview login" en 810 impr pos 8.9, it "libreview" 785 pos 7.7, es 748 pos 9.2,
  "libreview se connecter" 133, Dutch "libreview inloggen" 122 on /en) with ~0 clicks, but the login-first rework
  only shipped 2026-10-30, so it's too early to judge or rework again (compare from ~11-10). A1C calculator still
  pos 55-57 ("a1c calculator", "gmi calculator"); "hba1c rechner" pos 67.
- `npm run seo:gaps`: an uncovered HbA1c/GMI cluster in every language: "libre gmi vs a1c", "libre 3 gmi vs a1c",
  "librelink hba1c", "libre 2 estimated a1c", "glucose high but a1c normal", "low blood sugar but high a1c",
  "glycémie hba1c c est quoi", "glycémie glyquée normal", "glucosa glicosilada alta", "typ 1 diabetes hba1c
  zielwert", "glicemia hba1c". keyword-volumes: "hba1c" DE 10K-100K and "hemoglobina glicosilada" ES 10K-100K,
  both "no dedicated article yet".
- Decision: new health article `hba1c`: what HbA1c is, normal/diagnostic values and the usual target, how often
  and no fasting, what skews it, and why the sensor's GMI (Dulce's "Est. A1C") differs from the lab. The calculator
  page keeps the formulas and chart; this article links to it instead of repeating them.
- Published `hba1c` (acbbea9; category health, author giorgi). Slugs: es `hemoglobina-glicosilada-hba1c`, en
  `hba1c-a1c-test-vs-gmi`, de `hba1c-wert-normalwerte-gmi`, fr `hemoglobine-glyquee-hba1c`, it
  `emoglobina-glicata-hba1c`. Target queries: the cluster above plus "hba1c", "hemoglobina glicosilada (valores
  normales)", "hba1c wert / normalwerte", "hémoglobine glyquée", "emoglobina glicata", "a1c test", "do I need to
  fast for a1c". Backlink: `trends` Est. A1C callout (5 languages, dateModified 2026-11-03, `related`); added to
  the A1C calculator's `guides`.
- App facts checked on dulce-app main (3a97f04): `gmiFromMean` = 3.31 + 0.02392 × mean mg/dL (glucose-stats.ts);
  Trends cards "Est. A1C" / "from GMI" (es "HbA1c est." / "según GMI", de "Geschätzter HbA1c" / "aus GMI", fr
  "HbA1c est." / "d'après le GMI", it "HbA1c stimata" / "dal GMI"); deltas vs previous period only when it holds
  ≥50% of expected readings (trends-stats.ts); Trends reads readings cached in SQLite since connection
  (trends.tsx `getReadingsSince`), hence "a 90-day view needs 90 days of use". The PDF report export was left out
  (not described in any article yet).
- External facts: Bergenstal 2018 (PMC6196826: n=528; GMI-lab gap <0.1 in 19%, ≥0.3 in 51%, ≥0.5 in 28%, ≥1.0 in
  3%; ≥10 days, ideally 14+; renamed at FDA/CDRH's request). NIDDK "The A1C Test & Diabetes" (≈3 months; at least
  twice a year; no fasting; interferences: blood loss, transfusion, iron-deficiency anemia (falsely high), sickle
  cell/variants and ancestries, kidney failure, dialysis, EPO, liver disease; early pregnancy; goal <7%, 7-8%+ for
  some). ADA 2026 sections 2 and 6 (cut-offs, <7%; S132-S149 confirmed via Europe PMC), ADAG (7% ≈ 154 mg/dL),
  Battelino 2019, Shah 2019 (~30 min/day >140 mg/dL), all already cited elsewhere on the site. Left out: the
  "50% of HbA1c from the last 30 days" weighting (couldn't open Tahara & Shima 1995) and country claims about
  which unit labs print.
- check:content (19 articles, 0/0) and build passed. Deployed (en and de pages verified live, dated 3 Nov),
  `npm run indexnow`: 165 URLs → 200. Compare from ~2026-11-24: impressions for "hba1c"/"hemoglobina glicosilada"/
  "gmi vs a1c" on the new pages, and whether the A1C calculator (pos 55-57) moves.

## 2026-11-06 (daily run, Mac, queue item: segment guides in nl/fi/sv/nb/ru, `lada-diabetes`)

- Queue: top item, 1 of 6 guides, so step 1 topic picking was skipped. The queue item stays unticked (with a progress
  note) until all 6 are done. Next: `newly-diagnosed`.
- Search Console (gum OK, 2026-10-07 to 11-04, queries containing "lada"): no LADA query rows at all. The 5 rows
  returned were Spanish "calculadora de hemoglobina glicosilada" variants on the calculator (the substring is in
  "calculadora"), 1-2 impressions, pos 60-91. The guide is only a day old, so there's no baseline; the case for this
  work is the autocomplete demand in `seo/segments.md`. That demand was measured in the 5 core markets only, so the
  nl/fi/sv/nb/ru keywords in the registry are natural-language equivalents, NOT measured queries. Same-day `seo:gaps`
  not run (not needed for a queue item).
- Published: `content/articles/lada-diabetes/{nl,fi,sv,nb,ru}.mdx` and registry slug, title, description, summary,
  keywords, imageAlt, faq (dateModified 2026-11-06). Slugs: `lada-diabetes` (nl, fi, sv, nb), `lada-diabet` (ru). Links
  to `time-in-range` and `blood-sugar-levels` go to English, marked as such. FAQ 4's "read more" (`type-2-cgm`) is also
  English until that guide is translated, and it is not marked.
- Outside content/ and seo/ (the queue item names the hub): `messages/{nl,fi,sv,nb,ru}.json`, dropped the "(in
  English)" note from the 2 hub labels pointing at this guide (LADA and MODY rows). Hub verified live on nl only.
- App facts on dulce-app main (edff9e9, 1.0.7): no "type of diabetes" question in src (grep), so "Dulce doesn't ask"
  holds. Time-in-range labels from each locale's common.json: nl "Tijd binnen bereik", fi "Aika tavoitealueella",
  sv "Tid inom målområdet", nb "Tid i målområdet", ru "Время в диапазоне". Lock Screen terms from the site's messages
  (nl is "toegangsscherm").
- External facts, read in full via Europe PMC XML (PMC7809717, Buzzetti 2020): 2-12% of adult-onset diabetes; >30
  years, autoantibodies, no insulin for at least 6 months; C-peptide drives treatment; potentially progressive. The
  paper calls GADA the "most sensitive marker"; "most common" in our text rests on search snippets, not that page.
  ADA and WHO could NOT be opened (ADA 2026 403/500 on every route, WHO PDF 403). ADA "autoimmune = type 1" confirmed
  only from the 2023 edition's wording plus secondary reviews, not the 2026 text we cite. WHO "hybrid forms" confirmed
  only from secondary sources (Diabetes on the Net and others). Both are worth a human check, as is the source list on
  all 10 language versions. The two 2023-2024 meta-analyses found pooled figures of about 7-9%, within the 2-12% range.
- Translations are mine and not reviewed by a native speaker or a clinician (no medical reviewer yet, see PLAN).
- check:content (28 articles, 0/0), build (495 pages) passed. `check:jsonld` NOT completed (no local server on :3000,
  and `BASE=https://dulceglucosa.com` needed an approval this run couldn't get), so the weekly workflow is the first
  JSON-LD check of these pages. Pushed f42f1a0; all 5 pages verified live (200, H1 correct, updated 6 Nov). `npm run
  indexnow`: 290 URLs → 200. Compare from ~2026-11-27: impressions for LADA queries on these 5 pages.

## 2026-11-10 (daily run, Mac, queue item: `carplay` guide, web plan W4)

- Queue: top item, so step 1 topic picking was skipped (no `seo:gaps` run). Target queries (registry keywords, not
  measured): "glucose carplay", "libre carplay", "dexcom carplay", "freestyle libre carplay", "blutzucker carplay",
  "glicemia/glycémie carplay". Search Console (gum OK, 2026-10-11 to 11-08, queries containing "carplay"): 0 rows,
  so no baseline; the case is the owner's (CarPlay is in the closest competitor's headline).
- Published: `content/articles/carplay/{es,en,de,fr,it}.mdx` + registry entry (author giorgi, guide). Slugs:
  glucosa-en-carplay-iphone / glucose-on-carplay-iphone / glukose-in-carplay-iphone / glycemie-sur-carplay-iphone /
  glicemia-su-carplay-iphone. Back-link from `lock-screen` (all 5, dateModified 2026-11-10); added to the
  sensor-end-date `guides`. Links: lock-screen, apple-watch, widgets, dexcom (FAQ), /setup, /sensors, /pro.
- Outside content/ and seo/ (the queue item asks for a `/pro` link): `PageLink` type in `components/article/MdxParts.tsx`
  and the allowed list in `scripts/check-content.mts` now accept `/pro` (an existing route).
- App facts on dulce-app main (969b53e), each dated against releases: CarPlay picker 56c3bf0 (2026-11-03, 1.0.6); chart
  window and follower name on the card 41731e5 (11-04, before the 1.0.7 bump on 11-06, so live). Labels from each
  locale's common.json (`settings.liveActivityStyle.small.*`, `tabs.small` = "CarPlay", `chart.window`). Gating
  (`live-activity-style.tsx`, `liveActivityWire.ts`): turning the Live Activity on asks for Pro; picking a non-default
  card or window asks for Pro; followers run on the patient's Pro. "Match my Lock Screen design" is listed only with
  the 4 premium designs (`PREMIUM_LA_VARIANTS`); with others "Number and chart" is the default. Stale card: grey,
  struck through, ⚠︎ + self-updating age (`GlucoseLiveActivity.swift`, `LiveActivitySmallViews.swift`). Card works
  for every source (relay registration sends any `cgm.provider`).
- External facts: WWDC25 session 216 (iOS 26, Dashboard, notification at the bottom when the Dashboard isn't shown,
  non-interactive, small family shared with the Smart Stack); WWDC24 10068 + Apple newsroom (watchOS 11 Smart Stack).
  The Apple Support page "View Live Activities in CarPlay" didn't render for the fetcher, so no Settings path for
  turning CarPlay Live Activities off is given. Deleted before publishing: a claim that Dulce's widgets don't show
  on CarPlay (couldn't verify). No driving numbers (e.g. "5 to drive") given; safety callout only.
- Images: no CarPlay screenshot exists. Card image and inline figure are `live-activity-styles.jpg` (older version
  of the style screen, said so in the caption). Cover + a current CarPlay-tab screenshot queued in `seo/covers-needed.md`.
- Noticed, not fixed (outside today's item): the `lock-screen` guide's "Pick a style" table still lists the old
  style names (Ultra, Dynamic Axis...), while the app now calls them Horizon, Tide, Meridian, Beacon, Summit, Pebble,
  Ribbon, Pop, Blossom, Frost, Pumpkin + Espresso, Porcelain, Aurora, Monolith. Worth a queue item.
- check:content (30 articles, 0/0) and build passed. Pushed 53d2d65. The first `npm run indexnow` ran before Vercel
  had deployed (pages still 404), so it was re-run after: 370 then 375 URLs → 200. Verified live through the web
  fetcher (curl needed an approval this run couldn't get): en and de pages 200 with the right H1 and the 10 Nov date;
  `lock-screen` en shows 10 Nov and the CarPlay link. es/fr/it not opened individually. Compare from ~2026-12-01:
  impressions for "carplay" queries on the 5 pages.

## 2026-11-13 (daily run, Mac, queue item: feature guides in fi/nl/nb/sv/ru, `dexcom`)

- Queue: top unchecked item, guide 1 of 6, so step 1 topic picking was skipped (no `seo:gaps`). The item stays
  unticked with a progress note (Done: `dexcom`; Next: `lock-screen`).
- Search Console (gum OK, 2026-10-14 to 11-11, queries containing "dexcom"): 3 rows, 1 impression each ("dexcom widget
  apple watch" de pos 7, "dexcom and apple watch" es pos 38, "alternatives à dexcom" fr pos 10). No baseline in the new
  languages. Registry keywords for fi/nl/nb/sv/ru are natural equivalents of the core ones, NOT measured queries.
- Published: `content/articles/dexcom/{fi,nl,nb,sv,ru}.mdx` + registry slug, title, description, summary, keywords,
  imageAlt, faq (dateModified 2026-11-13). Slugs: fi `dexcom-apple-watch-lukitusnaytto`, nl
  `dexcom-op-apple-watch-en-toegangsscherm`, nb `dexcom-pa-apple-watch-og-laseskjermen`, sv
  `dexcom-pa-apple-watch-och-lasskarmen`, ru `dexcom-na-apple-watch-i-ekrane-blokirovki`. Links to lock-screen,
  apple-watch, widgets, alerts, family-sharing, carplay, dexcom-follow-alternative, glucose-apps-compared all go to
  English, marked. FAQ 5's "read more" (`apple-watch`) is English and unmarked, as in `lada-diabetes`.
  `apple-watch-glucose` fi/nl/nb/sv/ru dropped the English marker on its Dexcom link (dateModified 2026-11-13). No
  glossary or messages/ link to `dexcom` needed changing.
- App facts (dulce-app main 0826a88; working tree = main for src/, checked with `git diff main`): labels from each
  locale's common.json (`dexcom.*` sign-in, region and error titles, `dexcom.help.step2` for the Dexcom app's
  Connections/Share path, onboarding "Which sensor do you use?", Settings › Sensor › "Connect a different sensor",
  Live Activity name: fi/nl/ru "Live Activity", nb/sv "Live-aktivitet"; alerts section nl "Alarmen", nb "Alarmer",
  sv "Larm", ru "Оповещения"). Two deliberate differences from the core-language text: family sharing marked (Pro)
  (`followers.proRequired`), and the CarPlay bullet says the Live Activity card shows on the CarPlay Dashboard while
  it runs (`liveActivityStyle.small` footer) instead of "a large number".
- NOT described: Dexcom "keep me signed in" (3daf2e9, 2026-11-10, first in 1.0.10). PLAN says 1.0.7 is live. The new
  pages say only "your password is stored encrypted on your iPhone" (true before and after). **When 1.0.10 ships, the
  es/en/de/fr/it bodies' "only goes to Dexcom" sentence becomes wrong**: the app then keeps an encrypted copy on
  Dulce's server (`dexcom.reassurance`). Worth a queue item.
- Translations are mine, not reviewed by native speakers. check:content (30 articles, 0/0) and build passed (the 5
  pages generated). Pushed df57b6b. First live check was before Vercel finished (404). Re-checked through the web fetcher:
  all 5 pages 200, right H1, "updated 13 Nov". `npm run indexnow`: 380 URLs → 200. Compare from ~2026-12-04:
  impressions for dexcom queries on the 5 new pages.
