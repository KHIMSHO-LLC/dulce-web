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

- Released: FreeStyle Libre 2/3 via LibreLinkUp only. Dulce shows one person per LibreLinkUp account (the first
  connection). **Dexcom and Nightscout are not released** (commented out in onboarding); Android not released.
- Family: up to 3 followers by link/code (Pro for the wearer, free for followers); followers get their own alerts,
  quiet hours and Live Activity; "messages" are short notifications ("Are you OK?", custom text) answered with a
  one-tap "I'm OK". **Not a chat**, never tied to insulin dosing.
- Apple Health is read-only (glucose, insulin, carbs; Pro). Logbook and Trends are free. Pro = monthly/yearly
  subscription with a 14-day trial.
- App languages: es-ES, es-MX, en, de, ka; fr and it from the release carrying dulce-app branch `i18n/fr-it`.
  Device languages the app doesn't support fall back to **English** from 1.0.4 (Spanish-speaking regions get es-MX).
- App Store name: **Dulce: Glucose at a Glance**, id 6770694596.

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
- [x] 2026-10-24: Removed the false "rings on silent" claim (no critical-alerts entitlement): `alerts` (title,
      description, body, FAQ, new "Hearing alerts at night" section), `child-glucose`, `librelinkup-not-working`,
      `/llms.txt`, 5 languages. The app's own copy was fixed in 1.0.4 the same way.
- [x] 2026-10-24: Official French and Italian App Store badges (`public/badges/app-store-badge-{fr,it}.svg`).
- [x] 2026-10-24: Relay deployed (LibreLinkUp status live, fr/it alerts, DST-safe quiet hours, Dexcom support
      for 1.0.4). App PR #4 merged into `release/1.0.4` together with the redesign + Dexcom work.
- [ ] Performance: the home page ships ~430 KB of compressed JS (three.js phone). Measure on PageSpeed Insights
      (mobile) and lazy-load or trim the 3D scene if LCP/INP are poor.

## Next for Claude (in order)

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
     (blutzuckerwerte tabelle) with consensus sources.
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

## For Giorgi (only you can do these)

Open:

1. **Merge the two `i18n/fr-it` PRs** (website and app). Ship an app release with the app one, then add the
   French and Italian localizations in App Store Connect using `seo/aso.md` (also paste the new es/de/en
   subtitles and keywords there). Decide the localized names (table in `seo/aso.md`).
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
9. ~~Merge dulce-app PR #4~~ (done 2026-10-24, with the Dexcom/new-design work). **Build and submit 1.0.4.**

10. ~~Fix the "rings on silent" claim~~ Done 2026-10-24: pages rewritten to the real behaviour. If Apple ever
    grants the critical-alerts entitlement, the claim can come back. Was: **Fix the "rings on silent" claim (found 2026-10-23).** The released app can't ring through silent mode:
    `CRITICAL_ALERTS_ENTITLEMENT_APPROVED = false` in dulce-app `src/hooks/usePermissions.ts` (main and
    release/1.0.4), no critical-alert or time-sensitive entitlement in app.json, critical-low sent as `timeSensitive`.
    Still claimed in: `alerts` (title, description, body, FAQ, keyword "glucose alarm silent mode iphone"),
    `child-glucose` "At night", `librelinkup-not-working`, `app/llms.txt/route.ts`. Either get the entitlement from
    Apple and ship it, or let Claude rewrite those pages. `night-lows` already describes the real behaviour.

Done:

- [x] Merge PR #3 (redirect fix, quick answers, caregiver guide): merged 2026-10-22.
