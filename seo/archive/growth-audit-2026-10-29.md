# DulceGlucosa.com growth audit — 29 October 2026

## Scope and evidence

This is a code and content audit using the repository, the Search Console and GA4 snapshot supplied for this task, and current primary documentation from Apple, EU law, AEPD, Cloudflare, Vercel and the U.S. Data Privacy Framework registry. Search metrics below are the user's snapshot, not a fresh query from Google. Search Console, GA4 property access, App Store Connect, and RevenueCat exports were not available here. The site currently has five locales (`es`, `en`, `de`, `fr`, `it`), although the brief's core-market list names four.

The 28-day Search Console sample (45 clicks, 2,660 impressions, 1.7% CTR, average position 12.5) and 70 GA sessions are directional only. At this scale, do not infer stable conversion rates or promise ranking gains. The strongest reported page is the English iPhone widget guide (14 clicks / 355 impressions), with related localized widget pages already present.

## 1. Initial technical and content audit

### Already implemented

- Each public locale route generates canonical URLs and language alternates through `lib/seo.ts`; the sitemap emits locale alternates and git-derived `lastModified` values. `app/robots.ts` points to the sitemap and allows the intended crawlers.
- Public marketing pages have localized metadata. The home page emits a `MobileApplication`/`FAQPage` graph; articles emit `BlogPosting`, breadcrumb, FAQ and, where content has steps, `HowTo` data. Calculators have web-app schema. `scripts/check-jsonld.mts` checks JSON-LD and internal `@id` references.
- Published guides are translated across all five site locales, have answer-first summaries, localized slugs, author/byline data, FAQ content and related-article links. Content validation requires cross-linking and guide association with calculators.
- App Store links use one helper, provider token `pt`, campaign token `ct`, and `mt=8`. Website CTAs have placement-level tokens; article CTAs use `blog_<article-id>`. Apple says campaign results include downloads, usage, sales and subscriptions, subject to reporting thresholds; at least five first-time downloads are required for campaign visibility. See [Apple campaign links](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links/).
- GA4 is loaded once the saved consent choice permits it. The existing `app_store_click` event records campaign and path. Cookie-banner accept and decline controls have equal prominence; the footer can reopen settings.
- The widget and Apple Watch guides already include practical setup steps, product screenshots, contextual internal links, safety caveats and a mid-article campaign-tracked CTA. The home page explains features and routes iPhone visitors to the App Store; `/pro` describes the trial without quoting variable country prices.
- The main app listing is `6770694596`, and campaign links resolve to the App Store's local storefront. No additional localized URL is needed for country routing.

### Issues found and addressed in this change

- Legal Terms and Privacy copy described LibreLinkUp as the only CGM provider even though the released product supports Dexcom Share. The Terms and Privacy now identify LibreLinkUp and Dexcom Share, distinguish device-held passwords from the session ID/token sent to the relay, and name both providers in the relay flow.
- The Terms said an EU subscriber forfeits withdrawal rights simply by starting a trial/subscription. This was an overbroad legal assertion. It is replaced in the five translations with a neutral statement preserving mandatory consumer rights and directing users to the purchase screen and Apple's current account controls. EU consumer rights depend on the contract and consent/acknowledgement flow; see [Directive 2011/83/EU](https://eur-lex.europa.eu/eli/dir/2011/83/oj/eng). Counsel should confirm the exact subscription wording.
- Apple documents a 30-character maximum for `ct`; the app-store helper previously allowed 40. The helper now rejects overlong campaign IDs rather than silently truncating and possibly merging attribution. Existing article token IDs were checked and fit the limit.
- GA4 now receives `page_language`, `cta_location` and `source_campaign` with outbound store clicks. A successful Android waitlist submission sends GA4's recommended `sign_up` event, with method/source/locale only (no email or health data).
- The highest-impression page already answers the widget query and has a relevant CTA. Its English and German titles were shortened to keep the core product/query terms visible; no URL or article body was changed. The modification date was updated because the title itself changed.
- Legal pages were reviewed against the web forms, analytics code, product behaviour, and the current relay implementation in all five site languages: Privacy, Terms, Cookies and Medical Disclaimer. Corrections cover Dexcom Share, the provider session ID/token sent to the relay, relay settings/push tokens/recent readings, custom family check-in text, diagnostic logs that can contain glucose values and installation IDs, actual retention/deletion behaviour, waitlist and contact form data, analytics events, cookie/localStorage behaviour, unknown-location consent, EU consumer withdrawal wording, and meter-check guidance based on manufacturer instructions. All four legal route dates now show 29 October 2026.
- The Privacy pages now disclose that app onboarding links to the policy but does not show a separate health-data consent checkbox. They identify this as an unresolved consent-flow question rather than certifying the current flow. The Cookies pages no longer claim Vercel Analytics is anonymous or legally exempt solely because it does not set cookies; they describe Vercel's request-derived daily hash and aggregated reporting.
- The Privacy pages now describe the GDPR rights-response period as one month, with a possible two-month extension in complex/numerous cases. International transfer wording distinguishes provider-specific safeguards and limits the DPF statement to Google LLC's listed certification.

### Still needs evidence or owner action

- The 16 “crawled, currently not indexed” URLs must be assessed individually. The brief gives counts but not the URL list. Do not request indexing for every URL or undo intentional redirects/noindex directives. The known redirect group (http/www and retired routes) is expected; the plan says not to revalidate it.
- The reported 49 excluded URLs and five noindex URLs need the Search Console URL list and intended-indexing policy before any change. Validate any 404 that has internal links; preserve legitimate retired-route redirects.
- Current live GA behavior and live site performance were not independently measured in this code pass. App Store campaign and subscription attribution should be reconciled in App Store Connect, not inferred from GA clicks.
- The exact Search Console URL exports were not supplied, so the 16 crawled-not-indexed URLs, 14 redirects, nine 404s, five noindex URLs and remaining exclusions were not individually triaged. No bulk index requests or directive changes should be made without that URL-level evidence.
- The app's health-data basis still requires a qualified review: the public policy cannot establish that the current onboarding action satisfies explicit-consent requirements. The app onboarding flow may need a distinct, affirmative health-data consent control.
- The waitlist and beta tables have no automatic expiry. The published target periods (Android launch + six months; beta + twelve months) are not enforced by a TTL or cleanup job. Add automated deletion and a deletion confirmation process, or revise the intended periods.
- Relay diagnostic logs currently include an installation identifier, provider and latest glucose value/time. The Privacy pages now disclose this and Cloudflare's plan-dependent maximum retention, but the stronger engineering fix is to redact health values and identifiers from logs. The relay is a separate repository and was not changed in this web-only release.
- Contact email copies can remain in the support mailbox and Resend under their respective settings; the owner should set and enforce a retention period. Confirm the controller's full legal identity and postal address, each provider's DPA/transfer mechanism and subprocessor locations, the legally correct cookie-consent regions outside EEA/UK/Switzerland, and the health-data basis with Spanish privacy counsel. Have translations checked by qualified reviewers before treating them as final legal advice.

## 2. Search intent and keyword map

No keyword volumes, difficulty, or traffic projections are invented here. The existing Search Console query/page rows in the brief are the opportunity evidence. “Download relevance” is a qualitative assessment of the product match.

| Locale / market | Topic and target query family | Intent | Best existing page | New page? | Priority | App download relevance |
|---|---|---|---|---|---|---|
| English / US, UK, international | FreeStyle Libre widget iPhone; glucose widget iPhone; Libre 3 widget; CGM widget | Find/set up an iPhone glucose widget | `/en/blog/libre-widget-for-iphone` (`widgets`) | No; optimize this proven landing page | P0 | Very high: Dulce has free Home/Lock Screen/StandBy widgets |
| Spanish / Spain and Spanish-speaking markets | widget Libre iPhone; widget glucosa iPhone; Libre 3 widget iPhone | Find/set up an iPhone glucose widget | `/blog/widget-libre-para-iphone` | No | P1 | Very high |
| German / DACH | FreeStyle Libre Widget iPhone; Blutzucker Widget iPhone; Libre 3 Widget | Find/set up a glucose widget | `/de/blog/libre-widget-fuer-das-iphone` | No | P1 | Very high |
| Italian / Italy | widget FreeStyle Libre iPhone; widget glicemia iPhone; Libre 3 widget | Find/set up a glucose widget | `/it/blog/widget-freestyle-libre-iphone` | No | P1 | Very high |
| English / US, UK, international | FreeStyle Libre Apple Watch; glucose monitor Apple Watch; CGM complication | Get glucose on a watch / compare capability | `/en/blog/how-to-see-cgm-glucose-on-apple-watch` (`apple-watch`) | No | P1 | High; Pro trial applies to Watch |
| Spanish / Spain and Spanish-speaking markets | glucosa Libre Apple Watch; ver glucosa en Apple Watch | Set up glucose on a watch | `/blog/como-ver-glucosa-cgm-en-apple-watch` | No | P1 | High |
| German / DACH | FreeStyle Libre Apple Watch; Blutzucker Apple Watch | Set up glucose on a watch | `/de/blog/libre-blutzucker-auf-der-apple-watch` | No | P2 | High |
| Italian / Italy | FreeStyle Libre Apple Watch; glicemia Apple Watch | Set up glucose on a watch | `/it/blog/freestyle-libre-apple-watch-glicemia` | No | P2 | High |
| English / Spanish / German / Italian | FreeStyle Libre Apple Health; Apple Health glucose; diabetes app Apple Health | Understand data flow and compatibility | `apple-health` guide and `/pro` | No; existing guide covers read-only behavior | P2 | Medium; Pro feature, but avoid implying Libre writes directly to Health |
| All four priority markets | LibreLinkUp not working; no readings; login/account confusion | Troubleshoot an existing setup | `librelinkup-not-working` guide plus live status page | No | P1 | High after the problem is resolved; never suggest Dulce fixes an Abbott outage |
| English / Spanish / German / Italian | LibreView login; LibreView vs LibreLinkUp | Identify the right Abbott service/account | `libreview` guide | No | P2 | Medium, indirect setup relevance |
| All priority markets | diabetes tracking app; glucose logbook app; insulin/carbohydrate tracking app | Compare/choose a diabetes record-keeping app | `glucose-apps-compared`, `logbook`, `/pro` | Defer a broad “best app” page until query evidence supports it | P3 | Medium; avoid unsupported “best” claims |

The separate locale mappings above are localized from existing authored query strings and topic language, not direct one-to-one keyword translation. Spanish/German/Italian volumes are not available in the supplied export. French content remains supported; it is retained and maintained, but the brief's primary growth focus was four markets.

## 3. Page optimization and conversion

- **Widget guide:** retain its URL and body structure. It already answers the problem, explains free widget availability and iOS refresh limits, shows actual UI, and includes a CTA after widget setup. Preserve the CTA's `blog_widgets` token. Avoid adding another page for “glucose widget iPhone.”
- **Apple Watch guide:** existing setup instructions and trial mention match product capabilities. Keep Watch positioned as a Pro feature; do not imply constant refresh independent of Apple's and provider's data cadence.
- **Troubleshooting guide:** keep status page, account distinction, and troubleshooting sequence prominent; preserve calm medical wording. Make sure any alert statement remains consistent with app entitlements and does not imply silent-mode delivery.
- **Home and `/pro`:** retain App Store CTA and real screenshots. Explain free features versus Pro trial; don't publish a universal price because storefront pricing varies.
- **Internal linking:** existing `related` and contextual links connect widget, Lock Screen, Watch, setup, troubleshooting, comparison and tools. The current `check:content` enforces that articles are associated with a tool and links are resolvable.
- **Tracking:** keep one `app_store_click` event rather than adding redundant “from blog/from homepage” events; use its campaign/location/language parameters. Treat `sign_up` as an Android waitlist conversion only. `feature_page_view` and `pricing_view` are redundant with GA page views unless a specific interaction beyond viewing is measured.

## 4. Attribution and measurement

1. In GA4, register `page_language`, `cta_location` and `source_campaign` as event-scoped custom dimensions. Mark `app_store_click` and `sign_up` as key events if the business wants those web actions counted as conversions. Do not label them installs or subscriptions.
2. In App Store Connect → Analytics → Acquisition → Campaigns, compare each `web_*` and `blog_*` token. Apple's campaign dashboard has privacy thresholds; some values can be absent below those thresholds. Campaign links can attribute first-time downloads and downstream usage/sales/subscription metrics in Apple Analytics, while click/session events stay in GA4.
3. Use App Store Connect's Subscriptions reports/cohorts for trial starts, trial-to-paid conversion, renewal, churn and proceeds; use RevenueCat only for app-side subscription analysis where it has the needed identifiers. Join at campaign/cohort level where available. Do not attempt person-level identity stitching or pass health data to marketing analytics.
4. App Store campaign links are the current available bridge from website placement to downloads. GA4 cannot directly observe the completed App Store install or in-app purchase. Apple attribution is aggregated and thresholded.

## 5. Prioritized 30-day plan

| Days | Work | Output / decision |
|---|---|---|
| 1–3 | Export Search Console pages/queries by locale; inspect each of the 16 crawled-not-indexed URLs and the 49 exclusions; export GA4 landing-page and outbound-click rows | URL-level technical triage; no bulk indexing requests |
| 4–7 | Compare high-impression pages' query intent to titles/descriptions; verify canonical/hreflang and internal links for widget, Watch, troubleshooting, Apple Health and LibreView pages | Make only page-specific title/snippet/link edits supported by query evidence |
| 8–12 | Record baseline App Store campaign metrics and configure GA custom dimensions/key events | Baseline clicks vs first-time downloads, with threshold caveats |
| 13–17 | Run one localized CTA experiment at a time on the top widget guide, preserving a control and stable page campaign token | Compare store-click rate by locale and placement; do not claim install lift from GA alone |
| 18–22 | Improve the most visible non-English widget page based on its GSC queries; check search snippets and page experience | One high-intent localized optimization, not new thin pages |
| 23–26 | Decide whether “diabetes tracking app” merits a page using actual impression/query evidence; if yes, write one candid comparison/feature guide grounded in live features and sources | Go/no-go on one new article; no mass publication |
| 27–30 | Review GSC index/crawl state, organic engaged sessions, App Store campaign installs, trial starts and paid conversion; update the plan | Keep, revise or roll back changes based on evidence; document data thresholds |

## 6. Manual actions and limitations

- Giorgi: provide Search Console URL exports for the 16 crawled-not-indexed pages and 49 excluded URLs, plus query/page exports segmented by locale.
- Giorgi: in GA4 register the three custom dimensions and mark the desired web events as key events; verify `app_store_click` and `sign_up` with GA DebugView under an allowed consent state.
- Giorgi: review App Store Connect Campaigns and Subscriptions at monthly cadence; compare only aggregate data and account for Apple's minimum reporting thresholds.
- Giorgi: verify the live App Store Connect locales, language list, localized metadata/screenshots and privacy label. The indexed Apple listing inspected on 29 October displayed English under Languages and a Georgia trader address, while the site Privacy page describes the controller as based in Spain; the index may be stale, so reconcile against the current listing and legal records before changing either statement. Compare Apple's privacy label (health, purchase history, contact info and identifiers) with the actual app/site data flows.
- Giorgi: supply the Search Console URL/query/page exports and GA4 landing-page/outbound-click reports noted above; triage only URLs meant to rank.
- Giorgi: in GA4 register `page_language`, `cta_location` and `source_campaign` as event-scoped dimensions, decide whether web clicks/sign-ups are key events, and verify consent-gated events in DebugView. Do not label them installs or subscriptions.
- Giorgi: set and enforce database/mailbox retention for waitlist, beta and contact records; decide whether `seen:<deviceId>` should persist after account deletion or receive an expiry period.
- Legal counsel / Spanish privacy professional: review controller identity/address, Article 9 basis and app consent flow, website consent jurisdictions, waitlist/contact/relay retention, processor contracts and transfer safeguards, consumer subscription terms and the five localized pages. This engineering update improves factual accuracy; it is not legal advice or a compliance certification.

## Sources

- [Apple App Store Connect campaign links](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links/)
- [Apple App Analytics overview](https://developer.apple.com/help/app-store-connect-analytics/)
- [EU Consumer Rights Directive 2011/83/EU](https://eur-lex.europa.eu/eli/dir/2011/83/oj/eng)
- [GDPR (Regulation (EU) 2016/679)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679)
- [AEPD cookies guide](https://www.aepd.es/recurso-multimedia/guia-sobre-el-uso-de-las-cookies)
- [Dulce App Store listing (US storefront)](https://apps.apple.com/us/app/dulce-glucose-at-a-glance/id6770694596)
- [Vercel Analytics privacy policy](https://vercel.com/docs/analytics/privacy-policy)
- [Cloudflare Workers Logs retention and plan limits](https://developers.cloudflare.com/workers/observability/logs/workers-logs/)
- [Google LLC Data Privacy Framework certification](https://www.dataprivacyframework.gov/participant/5780%20)
- [Abbott guidance on when fingerstick testing is needed](https://www.freestyle.abbott/en-us/support/faq/apps/when-fingerstick-testing-is-needed-with-freestyle-librelink.html)
- [Dexcom G7 system information](https://www.dexcom.com/en-us/m/faqs/what-is-the-dexcom-g7-cgm-system)
