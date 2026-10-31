# Queued SEO work (done before new articles, see seo/daily-article.md step 0)

Owner-requested jobs. The daily run does the top unchecked item, one per run, then ticks it here.

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

- [ ] **"Can Apple Watch measure blood sugar?" article** (requested by Giorgi 2026-10-31, from the keyword review in
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
- [ ] **"Libre 3 Plus app for iPhone" section or article** (autocomplete es/de/fr/it/en): "libre 3 plus app for iphone",
  "libre 3 plus apple watch", "libre 3 plus compatible phones". Start by adding a 3 Plus section to `lock-screen` and
  `widgets`; only a new article if Search Console shows impressions for these queries.
