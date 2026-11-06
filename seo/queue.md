# Queued SEO work (done before new articles, see seo/daily-article.md step 0)

Owner-requested jobs. The daily run does the top unchecked item, one per run, then ticks it here.

- [ ] **Translate the 6 segment guides into nl, fi, sv, nb, ru** (owner request 2026-11-05, `seo/segments.md`): `lada-diabetes`, `newly-diagnosed`, `older-adults-cgm`, `diabetes-at-work`, `diabetes-at-school`, `type-2-cgm`. One guide into all 5 languages per run, LADA first (demand in every market). The hub links to the English page until each is translated. Done: `lada-diabetes` (2026-11-06). Next: `newly-diagnosed`.
- [ ] **Gestational diabetes and CGM** (autocomplete 2026-11-05: "gestational diabetes cgm targets", "schwangerschaftsdiabetes sensor", "diabete gestationnel capteur", "diabetes gestacional sensor"). Pregnancy targets need a primary source. 5 languages. Link from the hub's `types` row in `messages/*.json`.
- [ ] **Partner of someone with type 1** (autocomplete 2026-11-05: "partner with type 1 diabetes", "spouse type 1 diabetes"). Practical, not medical; link `family-sharing`, `night-lows`.
- [ ] **T1D parent burnout** (autocomplete 2026-11-05: "t1d parent burnout"). Needs a real source; link `diabetes-at-school`, `child-glucose`.

- [x] **"Libre 3 signal loss / alarms unavailable on iPhone" article** (done 2026-11-04, `libre-signal-loss`) (found 2026-11-04, Google autocomplete: "libre 3 signal
  loss iphone", "libre 3 signal loss fix", "libre 3 alarms unavailable iphone", "libre 3 not connecting to iphone",
  "librelinkup not sending notifications"). The sensor-phone side; `librelinkup-not-working` covers the follower side.
  Facts already checked on Abbott's US FAQ (cite them): Signal Loss alarm = no sensor-app communication for 20 minutes;
  range Libre 3 / 3 Plus 10 m (33 ft) unobstructed, Libre 2 6 m (20 ft); causes: too far, Bluetooth off, sensor problem;
  fixes in order: back in range and wait 2-4 minutes, don't force-close the Libre app, Bluetooth off/on, restart the
  phone, then Abbott Customer Care; Libre 3 / 3 Plus backfill automatically when back in range (no scan), Libre 2 uses
  scan-to-backfill; alarms only fire when enabled and in range. Pages: freestyle.abbott/en-us/support/faq/alarms/
  causes-of-signal-loss-alerts-in-the-libre-app.html, .../system/reconnecting-freestyle-libre-3-sensor-after-signal-loss.html,
  .../sensor/freestyle-libre-3-plus-signal-loss-quick-fix-steps.html, .../apps/scan-to-backfill-with-freestyle-libre-3-in-the-libre-app.html.
  Dulce angle (released app): it shows "Last reading N min ago" / stale state instead of an old number; it doesn't fix
  the sensor connection. Link `librelinkup-not-working`, `alerts`, `/librelinkup-status`. 5 core languages (fi/nl optional).

- [x] **Glucose converter: full conversion table + cholesterol note** (requested by Giorgi 2026-10-30; done 2026-10-30, see log)
  - Why (Search Console, Oct 2026): the converter ranks top 10 for exact-value queries ("160 mg/dl to mmol/l" 5,
    "192 mg dl to mmol l" 2, "245 mg/dl to mmol/l" 2, "6 mmol/l to mg/dl" 4.7, "13 mmol/l to mg/dl" 4) but 50-75 for
    the head terms ("mg/dl to mmol/l"). A complete table lets one page answer every value. People also land on it
    for cholesterol ("ldl 126 mg dl to mmol l", "ldl 175 mg dl to mmol l") and would get a wrong number.
  - Files: `content/tools/glucose-converter/{es,en,de,fr,it}.mdx`; component only if MDX can't render the table
    readably (`app/[locale]/tools/glucose-converter/`, `components/`). Keep the URL, title and calculator widget.
  - Table: two tables (or two columns of one compact section), both directions, in all 5 languages:
    mg/dL -> mmol/L from 40 to 400 (every 5 mg/dL; plus 54, 63, 126, 144, 162, 198 which people search), and
    mmol/L -> mg/dL from 2.0 to 25.0 (every 0.5; plus 3.9, 5.6, 7.8, 13.9). Generate the numbers with the SAME
    factor and rounding as the converter widget (read its code: /18, 1 decimal for mmol/L, whole numbers for
    mg/dL), never by hand, and check 5 random rows against the widget. Must stay readable on a phone (no
    horizontal page scroll; use several narrow columns or a details/summary per range). Keep the existing
    "Common values" table with meanings above it.
  - Cholesterol note (short callout near the top and an FAQ entry, all 5 languages): this converter is for
    glucose only; cholesterol (total, LDL, HDL) uses a different factor (mg/dL / 38.67 = mmol/L) and
    triglycerides another (/ 88.57), so glucose numbers are wrong for them. Verify both factors against a
    primary/clinical source and cite it in the page's sources. Do NOT build a cholesterol converter or give
    cholesterol targets.
  - Update the page's `dateModified`/updated date and FAQ JSON-LD if the FAQ lives in lib/tools.ts.
  - Checks: `npm run check:content`, `npm run build`, `npm run check:jsonld`; view the en page at phone width.
  - After deploy: `npm run indexnow`; log in seo/log.md with the GSC numbers above as the baseline
    (compare head-term position and exact-value clicks ~3 weeks later).

- [x] **"Can Apple Watch measure blood sugar?" article** (done 2026-10-31, `apple-watch-glucose`, author Giorgi) (requested by Giorgi 2026-10-31, from the keyword review in
  `seo/keyword-research-2026-10-31.md`). Highest-demand gap in every market: "blood sugar apple watch 11 / ultra 3",
  "blutzucker messen apple watch", "glicemia apple watch", "glycémie apple watch", "bloedsuiker meten apple watch".
  Answer first: no Apple Watch measures glucose (check Apple's own pages for the current models before writing; cite
  them), what a CGM is, and how a CGM reading gets onto the watch (link `apple-watch`, `dexcom`). Warn about watches
  and bands sold as "non-invasive glucose" (cite the FDA safety communication, check it is still current). 5 languages.
- [x] ~~Dexcom on Apple Watch / Dexcom widget article~~ (done 2026-10-31 as new sections + FAQs in the existing `dexcom` guide, to avoid two pages competing for the same query; found 2026-10-30, Google autocomplete): "dexcom apple watch
  complication / widget / without phone", "dexcom follow apple watch complication", "is there a dexcom widget", "how to
  add dexcom widget", "dexcom g7 apple watch app not working". The `dexcom` guide covers it in one FAQ only. A focused
  guide (5 languages) on Dexcom complications + iPhone widgets with Dulce, honest about what needs Pro and the 5-minute
  cadence. Check what Dexcom's own apps offer on the watch from Dexcom's docs before comparing.
- [x] **"Libre 3 Plus app for iPhone" section or article** (done 2026-11-01, 42f7a75: sections in `lock-screen` and `widgets`, no new article) (autocomplete es/de/fr/it/en): "libre 3 plus app for iphone",
  "libre 3 plus apple watch", "libre 3 plus compatible phones". Start by adding a 3 Plus section to `lock-screen` and
  `widgets`; only a new article if Search Console shows impressions for these queries.
