# Growth plan: SEO, App Store, AI answers (started 2026-10-22)

Read this before any SEO, App Store metadata, content or localization work. It records what was checked, what was
done, what is left for Claude, and what only the owner (Giorgi) can do. Update the boxes when something ships.

Daily article runs follow `seo/daily-article.md`; content rules are in `content/README.md`; the log is `seo/log.md`;
App Store copy is in `seo/aso.md`.

**If Giorgi asks "what do I have to do?", answer from the "For Giorgi" list at the bottom, open items first.**

## Goal

Paying Dulce Pro subscribers, internationally. The funnel: search / AI answer → dulceglucosa.com → App Store →
install → successful LibreLinkUp connection → Pro trial → paid → retained. Dulce should be the answer, in every
language the site and app speak (es, en, de, fr, it), to "how do I see my Libre glucose on my Apple Watch / Lock
Screen / widget", "how do I follow my child's glucose", "LibreLinkUp not working" and the everyday diabetes
questions around them. Being the best answer means the product actually does it and the page says so accurately.

## Ground truth (checked in code 2026-10-22; re-check before claiming anything)

- Released (treated as live from 2026-10-25 by owner decision, 1.0.4): FreeStyle Libre 2/3 via LibreLinkUp, and
  Dexcom G6/G7/ONE+ via Dexcom Share (the wearer's own Dexcom account, Share on, at least one follower; region
  US / Japan / outside the US; a reading every 5 minutes; sensor expiry reminders stay in the Dexcom app).
  Dulce shows one person per LibreLinkUp account (the first connection). **Nightscout is not released**; Android
  not released. If 1.0.4 is rejected or slips, revert the Dexcom and fr/it claims.
- Family: up to 3 followers by link/code (Pro for the wearer, free for followers); followers get their own alerts,
  quiet hours and Live Activity; "messages" are short notifications ("Are you OK?", custom text) answered with a
  one-tap "I'm OK". **Not a chat**, never tied to insulin dosing.
- Apple Health is read-only (glucose, insulin, carbs; Pro). Logbook and Trends are free. Pro = monthly/yearly
  subscription with a 14-day trial.
- App languages: es-ES, es-MX, en, de, ka; fr and it from the release carrying dulce-app branch `i18n/fr-it`.
  Device languages the app doesn't support fall back to **English** from 1.0.4 (Spanish-speaking regions get es-MX).
- App Store name: **Dulce: Glucose at a Glance**, id 6770694596. From 1.0.4 the de/fr/it listings have localized
  names (Dulce: Blutzucker im Blick / Dulce : Glycémie en direct / Dulce: Glicemia sott'occhio).
- CarPlay: there is no CarPlay app, but on iOS 26 the Live Activity (Pro) shows on the CarPlay dashboard. True
  since 1.0.3; 1.0.4 has a bigger, glanceable layout there.
- 1.0.4 (submitted 2026-10-25, build 69): Dexcom, the app in French and Italian, mmol/L everywhere, the new
  design. The owner decided on 2026-10-25 to present it as live on the website ahead of approval.

## Rejected ideas from external briefs (don't re-adopt)

| Brief said | Reality | Decision |
| --- | --- | --- |
| Add hreflang | Every page has canonical + hreflang for all 5 languages + x-default (`lib/seo.ts`), sitemap lists alternates | Done already |
| Site is "mostly legal pages" | 11 guides × 5 languages, 2 calculators, author pages, setup page | Wrong |
| "Dexcom & Libre on Apple Watch" | Dexcom not released | Never claim before it ships; prepare drafts unpublished |
| "In-app chat to coordinate insulin" | Short check-in messages only | Describe accurately, never link to dosing |
| "CGM data via HealthKit" | Data comes from LibreLinkUp | Wrong mechanism |
| `MedicalWebPage` on the home page, fake downloadUrl, USD | Product page; real ids in code; EUR | Not used |
| German with "Sie" | Site uses du (fr/it use tu) | Keep informal |
| Thin pages per country/keyword | Google suppresses them, AI engines ignore them | One strong page per topic per language |
| Pages or keyword lists per generated phrase (typos, "no ads", "battery", "lock screen follower") | No autocomplete demand (checked 2026-10-31) | Cover the feature in plain words on the existing page |
| Invent search volumes, conversion rates, market sizes | Unknown until measured | Only use measured data (Search Console, App Store Connect, RevenueCat) |

## Search Console notes

- "Page with redirect" lists http://, www. and retired routes (/features, /about, /contact, /family-sharing,
  /legal/terms on the Spanish site). **These redirects are correct and permanent**; Google will always report them
  and a validation of that row will always "fail". It is informational, not an error: don't re-validate it.
  What mattered was internal links pointing at redirects (fixed 2026-10-22, PR #3) and the app linking a retired
  page (fixed in dulce-app `i18n/fr-it`).
- Watch instead: "Crawled - currently not indexed", "Discovered - currently not indexed", 404s, and Performance
  (queries, CTR, position) per language.
- Cloud sessions can't reach Search Console; on the Mac, `gum` is authorized (see `seo/daily-article.md`). For cloud
  access the owner would add a read-only service account key as env var `GSC_SA_KEY_B64`.

## Done

- [x] 2026-10-22: Internal links on Spanish pages pointed at `/es/...` (307). Fixed (`components/article/MdxParts.tsx`).
- [x] 2026-10-22: "Quick questions" + FAQPage JSON-LD on every article (`faq` in `content/articles.ts`).
- [x] 2026-10-22: Article `child-glucose` (parents/caregivers).
- [x] 2026-10-22: Home JSON-LD (featureList, audience, @ids, WebSite) and `/llms.txt` for AI assistants.
- [x] 2026-10-22: App Store metadata for en, es-ES, es-MX, de, fr, it in `seo/aso.md` (measured, no trademarks).
- [x] 2026-10-22: Website in French and Italian (`/fr`, `/it`): all pages, 11 guides, calculators, FAQ, schema,
      sitemap, hreflang. Legal pages show English, noindexed, like German. Branch `i18n/fr-it` (dulce-web).
- [x] 2026-10-22: App in French and Italian (UI, widget/Live Activity, watch, complications) and Settings →
      Contact opens the right page. Branch `i18n/fr-it` (dulce-app). Needs a release.

- [x] 2026-10-22: Live "Is LibreLinkUp down?" page (`/librelinkup-status`, es `/estado-librelinkup`, fr
      `/statut-librelinkup`, it `/stato-librelinkup`), fed by the relay's GET /llu-status (dulce-relay
      `src/lib/lluStatus.ts`). Re-renders every 60 s. Shows "unknown" until the relay change is deployed.
- [x] 2026-10-22: Fixed hero text never appearing on direct visits to /setup (intro animation only fired from the
      home page preloader).

- [x] 2026-10-22: Free vs Pro page (`/pro`, 5 languages, no prices: they differ by country) and FreeStyle Libre
      sensor end date calculator (`/tools/sensor-end-date`). No separate About page: `/about` intentionally
      redirects to the founder section of the home page.
- [x] 2026-10-22: Lint fully clean (legal pages used raw `<a>` links that jumped to English; now locale-aware).
- [x] 2026-10-22: Relay alerts in French/Italian, decimal comma for mmol/L, quiet hours follow the phone's time
      zone across DST (dulce-relay PR #2; the app sends `timeZone` from 1.0.4).
- [x] 2026-10-22: App 1.0.4 (dulce-app PR #4 into `release/1.0.4`): mmol/L in widgets, Live Activity, Dynamic
      Island and onboarding; French/Italian; unsupported languages fall back to English.
- [x] 2026-10-23: Article `night-lows` (hipoglucemia nocturna / nächtliche Unterzuckerung), 5 languages, sources.
- [x] 2026-10-24: Article `libreview` (what LibreView is, login, practice ID, vs LibreLinkUp), 5 languages, sources.
- [x] 2026-10-30: `libreview` reworked for login intent (609 impressions, 0 clicks in GSC): login-first titles,
  descriptions and intro, "can't log in" and "is there an app" sections, 2 more FAQs.
- [x] 2026-10-28: Article `blood-sugar-levels` (blutzuckerwerte tabelle / valores normales de glucosa), 5 languages,
      ADA 2026 + WHO sources.
- [x] 2026-10-24: Removed the false "rings on silent" claim (no critical-alerts entitlement): `alerts` (title,
      description, body, FAQ, new "Hearing alerts at night" section), `child-glucose`, `librelinkup-not-working`,
      `/llms.txt`, 5 languages. The app's own copy was fixed in 1.0.4 the same way.
- [x] 2026-10-24: AI search / answer engines: `/llms-full.txt` (every guide, 5 languages, Markdown), a Markdown
      copy of each guide at `/md/<locale>/<slug>.md` (linked from the page as `rel="alternate"
      type="text/markdown"` and from /llms.txt), HowTo JSON-LD on the 50 guide pages with numbered steps, and
      IndexNow (`npm run indexnow`, key file in public/) so Bing, which feeds ChatGPT search and Copilot, hears
      about new and changed URLs the same day.
- [x] 2026-10-24: Snippet hygiene (crawl of all 123 sitemap URLs): every meta description ≤160 characters (home,
      Pro, status, setup, 5 guides), shorter home titles in es/de/fr/it, guide titles over 52 characters drop the
      " · Dulce" suffix (Google shows the site name anyway), author pages get distinct titles (name + role) and a
      one-sentence description. No duplicate titles left.
- [x] 2026-10-24: Article `glucose-apps-compared` ("Sweet Dreams alternative", 5 languages): honest comparison
      of Dulce, Sweet Dreams, Gluroo and LibreLinkUp from their App Store listings (checked 2026-10-24, sources
      listed) and a "switch in a minute" how-to (same LibreLinkUp account). Linked from `lock-screen`. Re-check
      competitor facts every few months; never claim Dexcom for Dulce until it ships.
- [x] 2026-10-25: App Store Connect 1.0.4 filled for de/fr/it (fr and it added): localized names from `aso.md`
      (Blutzucker im Blick, Glycémie en direct, Glicemia sott'occhio), subtitles, keywords, promotional text,
      What's New, fr/it descriptions translated from the English one, localized privacy URLs. No CGM brand names
      in any listing text (owner rule), so the `aso.md` promo/description lines were made generic ("CGM"). en and
      es got What's New + promo too. Screenshots for fr/it still English (owner).
- [x] 2026-10-24: Google Analytics 4 behind a consent banner (5 languages). Live since 2026-10-25
      (`G-5XLM2DQ2XQ`, set in Vercel Production + Preview). The banner shows only in the EEA, UK and Switzerland
      (or an unknown country): `proxy.ts` puts Vercel's `x-vercel-ip-country` in the `dulce-region` session cookie.
      Elsewhere GA loads by default and "Cookie settings" still turns it off. Ads storage, Google signals and ad
      personalization are off everywhere. In opt-in countries GA loads only after "Accept"; App Store taps are sent as `app_store_click` with the link's
      `ct` campaign. Cookie Policy (es/en) shows the GA section only when GA is on. "Cookie settings" in the footer
      reopens the banner.
- [x] 2026-10-24: Official French and Italian App Store badges (`public/badges/app-store-badge-{fr,it}.svg`).
- [x] 2026-10-24: Relay deployed (LibreLinkUp status live, fr/it alerts, DST-safe quiet hours, Dexcom support
      for 1.0.4). App PR #4 merged into `release/1.0.4` together with the redesign + Dexcom work.
- [x] 2026-10-28: SEO/AEO pass. Page text has no odometer digit soup or marquee repeats (CSS-generated
      `data-glyph`); full per-locale OpenGraph (og:locale + alternates + og:url) on every page (blog posts had
      none); sitemap lastmod from git + x-default; robots names the AI crawlers; linked JSON-LD graph
      (Organization/WebSite in the layout, MobileApplication "iOS 17 or later", HowTo on /setup, WebApplication on
      calculators, BlogPosting, CollectionPage) checked by `npm run check:jsonld`; llms.txt in llmstxt.org shape and
      llms-full.txt with setup/FAQ/Pro/calculators, both text/plain and generated; IndexNow after every production
      deploy (`.github/workflows/indexnow.yml`); bylines + dates on calculators and /setup; guide <-> calculator
      links from `TOOLS.guides`; drop logo served at 128/256w. Lighthouse mobile (local build): SEO 92 and
      Accessibility 96-100 on home, a calculator, a guide and /setup.
- [x] 2026-10-28 (later): answer-first `summary` on all 17 guides in 5 languages (from each guide's own text);
      Instagram/TikTok in the footer and Organization sameAs, "Made in Spain"; weekly live crawl + JSON-LD check
      (`.github/workflows/weekly-seo-check.yml`); legal pages in de/fr/it (Spanish prevails, now indexed); disclaimer
      and privacy corrected to the released app (no Nightscout, predictive low exists, GA behind consent); cn() bug
      that dropped text colours (hero button contrast) fixed.
- [x] Performance: 2026-10-28 the preloader is skipped on phones and shorter on desktop. Live home, Lighthouse
      mobile: 89, LCP 1.1 s (was 77-79, LCP 3.6 s). Earlier notes: (measured 2026-10-24 with Lighthouse 12, mobile, live site; the PSI API was over its daily
      quota). Home `/en`: score 77-79, FCP 1.3 s, LCP 3.6 s, TBT 260-350 ms, CLS 0. The LCP element is the hero
      paragraph and its delay is the first-visit **preloader** (counter + curtain, ~2.6 s): Chrome counts the hero
      only once it is uncovered. three.js is not the bottleneck (JS boot ~2.5 s at 4x CPU, TBT fine). Guide
      `/en/blog/how-to-see-cgm-glucose-on-apple-watch`: score 81-92, LCP 3.3-4.3 s (text paragraph, render
      delay in Lighthouse's simulated throttling), TBT 0, CLS 0. Options for Giorgi: shorten the preloader
      (minTime 900 ms, lift 1.05 s) or skip it on mobile; check real-user field data in PSI / Search Console Core
      Web Vitals before changing the guides.

- [x] 2026-10-30: Calculators: full mg/dL <-> mmol/L charts (40-400 / 2-25) and an A1C chart (4-14 %, IFCC + eAG)
      generated from `lib/tools.ts` (`GlucoseTable`, `A1cTable`; also rendered as Markdown tables in llms-full.txt and
      /md), cholesterol/triglyceride factor warning on the converter, "chart / tabla / Tabelle" titles. `fmt` now
      rounds half up (A1C 6 % = 126 mg/dL, as in ADAG). Titles: apple-watch leads with Libre 3 / 3 Plus,
      librelinkup-not-working with "no recent data", comparison with "LibreLinkUp alternative", /setup with
      "LibreLinkUp login", home with "Libre and Dexcom". New FAQs (5 languages): Libre 3/3 Plus to Apple Watch, LibreLinkUp
      alternative, Dexcom widget/complication.

- [x] 2026-10-31: Reviewed Giorgi's ~1,000-keyword list against autocomplete in each market (US/CA included); kept
      only measured clusters. Dexcom widget/watch sections, Libre 3 Plus/Dexcom widget FAQ, Canada vs US units, brand
      alternateName schema. Findings, rejected phrases and the open new-language decision: `seo/keyword-research-2026-10-31.md`.
- [x] 2026-10-31: Article `apple-watch-glucose` (can Apple Watch measure blood sugar; Apple's reported plans, FDA warning on
      "glucose" watches/rings, how to see a CGM on the watch today), 5 languages, author Giorgi.

## Next for Claude (in order)

0. **1.0.4 on the website** (done 2026-10-25, owner decision to publish before approval; app live 2026-10-27):
   - [x] "Ground truth" updated; `scripts/check-content.mts` no longer blocks Dexcom (Nightscout/Android still do).
   - [x] Comparison guide (5 languages): Dulce reads Dexcom, Sweet Dreams no longer "the choice for Dexcom".
   - [x] New guide `dexcom` in 5 languages (Dexcom Share, setup, Lock Screen / Watch / CarPlay, troubleshooting).
   - [x] Home sensors card + FAQ + featureList + audience, `/llms.txt`. IndexNow pinged (133 URLs).
   - [x] Search Console 2026-10-25: sitemap resubmitted, indexing requested for the English Dexcom guide. Request the
         other languages over the next days (Google limits requests per day).
   - [x] 2026-10-26: `dexcom-follow-alternative` (Dexcom Follow / Sugarmate alternative) in 5 languages; Dexcom
         added to the alerts and family-sharing guides; the Dexcom guide links to the new article.
   - [ ] Search Console: request indexing for the es/de/fr/it Dexcom guides and the 5 `dexcom-follow-alternative`
         URLs, a few per day. Done: en `dexcom-follow-alternative` (2026-10-26).

1. Done 2026-10-22 (ahead of the app release, at Giorgi's request): the home FAQ and `/llms.txt` say the app is
   in French and Italian. If the fr/it app release slips by more than a few days, revert that wording.
2. Content roadmap, one article per day max (`seo/daily-article.md`), always in all 5 languages, facts from the
   released app or primary sources, sources section for any medical number, no dosing advice:
   - **Our moat (product-led):** Apple Watch complication not updating; Libre 3 on Apple Watch without iPhone
     nearby (what works, what doesn't); StandBy at night; Dynamic Island; "best way to see Libre on iPhone"
     (honest comparison of approaches: LibreLink, LibreLinkUp, widgets apps; no competitor text copied).
   - **LibreLinkUp help:** "must accept terms of use", signal loss, "libre 3 plus", regions/countries, two
     followers / two patients on one account.
   - **Caregivers:** nights with a child with T1D, school, grandparents, older parents.
   - **Everyday T1D (YMYL, needs sources; ideally the medical reviewer first):** night lows (hipoglucemia
     nocturna), ketones (what they are, when to check, sources: ADA/ISPAD; no treatment instructions beyond
     "follow your care team's sick-day plan"), sport, travel and time zones, sick days, blood sugar tables
     (blutzuckerwerte tabelle) with consensus sources (done 2026-10-28: `blood-sugar-levels`).
   - **Dexcom (prepare, don't publish):** drafts for "Dexcom on Apple Watch / Lock Screen with Dulce" kept out of
     the registry until the integration is released and verified.
3. When a medical reviewer exists: add a `reviewer` to `content/authors.ts`, show "Medically reviewed by" in the
   byline, emit `reviewedBy` in the article JSON-LD. Never invent credentials.
4. Weekly: crawl the built site (every sitemap URL + internal link must be 200, self-canonical); check Search
   Console indexing and queries (on the Mac); improve titles/descriptions where CTR is low.
5. Keep `/llms.txt`, the home `featureList` and `seo/aso.md` in sync with what ships.
6. Funnel: every App Store link already carries a campaign token per placement (`ct=blog_<id>`, `web_hero`, ...).
   Read App Store Connect → Analytics → Campaigns with Giorgi monthly; never send glucose or health data to
   marketing analytics.

## Winning users from other apps (2026-10-24)

People who already use Sweet Dreams, Gluroo or any LibreLinkUp-based app can switch in a minute: Dulce uses the
same LibreLinkUp login, nothing changes on the sensor phone. Where Dulce is genuinely different today: the whole
app in Spanish, German, French and Italian (Sweet Dreams and Gluroo list English only), a free carbs/insulin
logbook, free followers. Where they are ahead: Sweet Dreams supports many more sensors and alarms that ring on
silent (critical-alerts entitlement). CarPlay is even: Dulce's Live Activity shows there on iOS 26 (guide updated
2026-10-25).

- [x] Comparison + switching guide `glucose-apps-compared` in 5 languages (Sweet Dreams alternative).
- [ ] Re-check competitor App Store listings every 3 months; update the table and dateModified.
- [x] Dexcom added to the comparison guide (2026-10-25). "Dexcom Follow / Sugarmate alternative" published 2026-10-26.
- [ ] Giorgi: **Apple Search Ads** campaign on competitor and category keywords ("sweet dreams diabetes",
      "librelinkup", "libre apple watch") in Spain, Germany, France, Italy, Mexico; bidding on competitor names
      is allowed in Search Ads, but App Store **metadata must never name competitors** (guideline 2.3.7).
- [ ] Giorgi: answer "which app for Libre on Apple Watch / Lock Screen" threads honestly (Reddit, Facebook groups,
      forums), disclosing you make Dulce, linking the comparison guide in the reader's language.
- [ ] Close the gaps that cost switchers: apply for Apple's critical-alerts entitlement (ring on silent).
- [x] CarPlay: the Live Activity already shows there (iOS 26); 1.0.4 makes that layout glanceable.

## For Giorgi (only you can do these)

Open:

0. **Google Analytics:** property, ID and Search Console link (Domain property) done 2026-10-25. Still to do in GA:
   Reports → Library → publish the Search Console collection; register `page_language`, `cta_location` and
   `source_campaign` as event-scoped dimensions; decide whether `app_store_click` and the Android waitlist
   `sign_up` event should be key events; verify them in DebugView with consent enabled. They are web actions, not
   install or subscription counts. Have the revised five-language Cookie Policy and other legal pages checked by
   Spanish privacy counsel.

1. **App Store listing follow-up:** the de/fr/it localization work was completed for 1.0.4 (2026-10-25), but
   verify the public storefront still exposes the expected language metadata and localized screenshots. The
   indexed Apple listing inspected 2026-10-29 showed English under Languages; it may be stale. Check App Store
   Connect's listing and privacy label against the current app and site data flows before changing either.
2. ~~**App Store badges for fr/it:**~~ Done 2026-10-24. Was: download Apple's official French and Italian "Download on the App Store"
   badges (black, SVG) from tools.applemediaservices.com, save them as `public/badges/app-store-badge-fr.svg`
   and `-it.svg`, and set `fr: "fr", it: "it"` in `components/ui/AppStoreBadge.tsx`. Until then they show the
   English badge.
3. **Medical reviewer (biggest trust win for Google and AI answers).** Find one diabetes educator, nurse or
   endocrinologist willing to review the guides and be named (name, credential, profile link). Send Claude the
   details. Never list someone who hasn't agreed. (Status 2026-10-22: Giorgi is looking.)
4. **Search Console:** don't re-validate "Page with redirect" (see notes above). After deploys, resubmit
   `sitemap.xml` and request indexing for new URLs (French and Italian home pages and guides first).
5. **Share numbers so plans use real data:** App Store Connect (impressions, product page views, downloads by
   territory, last 90 days), RevenueCat (trials, paid, monthly vs yearly, churn), Search Console exports.
6. **Off-site mentions** (AI engines cite what others say): helpful answers on r/diabetes_t1, r/Type1Diabetes and
   Spanish/German/French/Italian T1D forums and Facebook groups, following each community's rules; listings with
   diabetes associations and bloggers; short demo videos (YouTube Shorts / Reels / TikTok) showing the Lock
   Screen, the watch and family alerts. One real mention beats any schema.
7. **Ratings:** ask happy users for App Store ratings.
8. ~~**Deploy the relay**~~ Done 2026-10-24 (`cd dulce-relay && npm run deploy`). Until then the status page shows "unknown" and
   French/Italian alerts are not live.
9. ~~Merge dulce-app PR #4~~ (done 2026-10-24). ~~Build and submit 1.0.4~~ (submitted 2026-10-25, build 69, Expo
   SDK 58). **1.0.4 is live on the App Store (2026-10-27).** The website already says so (item 0). Add French and
   Italian screenshots in App Store Connect when you can (they show English now).
10a. **App Store creative assets (iOS 27 product page header + search results), made 2026-10-27.** Files and upload
   steps in `DULCE/app-store-assets/README.md` (outside the repos). Themes: default (Lock Screen + Watch), family
   (custom product page for parent/caregiver keywords), World Diabetes Day (14 Nov, switch off after). Review the
   search-results tap-through rate in App Analytics after 2 weeks and test header variants with product page
   optimization.

10. ~~Fix the "rings on silent" claim~~ Done 2026-10-24: pages rewritten to the real behaviour. If Apple ever
    grants the critical-alerts entitlement, the claim can come back. Was: **Fix the "rings on silent" claim (found 2026-10-23).** The released app can't ring through silent mode:
    `CRITICAL_ALERTS_ENTITLEMENT_APPROVED = false` in dulce-app `src/hooks/usePermissions.ts` (main and
    release/1.0.4), no critical-alert or time-sensitive entitlement in app.json, critical-low sent as `timeSensitive`.
    Still claimed in: `alerts` (title, description, body, FAQ, keyword "glucose alarm silent mode iphone"),
    `child-glucose` "At night", `librelinkup-not-working`, `app/llms.txt/route.ts`. Either get the entitlement from
    Apple and ship it, or let Claude rewrite those pages. `night-lows` already describes the real behaviour.

Done:

- [x] Merge PR #3 (redirect fix, quick answers, caregiver guide): merged 2026-10-22.
- [x] 2026-10-29: completed a code/content audit against the supplied 28-day GSC and October GA4 snapshots. Kept
      the strongest widget guide URL and body; shortened its English/German titles, refreshed `dateModified`, and
      documented the five-language query map and 30-day acquisition plan in `seo/growth-audit-2026-10-29.md`.
- [x] 2026-10-29: App Store campaign tokens now enforce Apple's 30-character limit without silent truncation;
      `app_store_click` includes campaign, CTA placement, page path and language, and a successful Android
      waitlist submission sends a PII-free GA4 `sign_up` event.
- [x] 2026-10-29: factual/legal accuracy pass across Privacy, Terms, Cookies and Medical Disclaimer in es/en/de/fr/it;
      detailed fixes and unresolved product, retention and counsel follow-ups are in the growth audit. This is not
      a legal compliance sign-off.
