# SEO / ASO / GEO plan (started 2026-10-22)

Read this before any SEO, App Store metadata or content work. It records what was checked, what was done,
what is left for Claude, and what only the owner (Giorgi) can do. Update the status boxes when something ships.

Daily article runs follow `seo/daily-article.md`; content rules are in `content/README.md`; the log is `seo/log.md`.

## Where this came from

On 2026-10-22 Giorgi pasted an external "master brief" (written by a generic AI, not from this repo). Each claim
was checked against the code. Keep these conclusions; don't re-adopt the rejected parts.

| Brief says | Reality (checked 2026-10-22) | Decision |
| --- | --- | --- |
| Add hreflang | Every page already has canonical + hreflang (es/en/de + x-default) via `lib/seo.ts`; the sitemap lists alternates | Nothing to do |
| Site is "mostly legal pages" | 10 guides × 3 languages, 2 calculators, author pages, setup page | Wrong |
| Add JSON-LD | MobileApplication, Organization, FAQPage (home), BlogPosting, BreadcrumbList, Person already exist | Enrich, don't replace (done, see below) |
| "Dexcom & Libre on Apple Watch" | Dexcom/Nightscout are commented out in `dulce-app` onboarding; not released | Never claim Dexcom until it ships |
| "In-app chat to coordinate insulin boluses" | Followers send short notification messages ("Are you OK?", custom text); the wearer replies "I'm OK" with one tap. No chat thread | Describe as family messages; never tie to insulin dosing (YMYL + `content/README.md` rule 5) |
| "Real-time CGM via Apple HealthKit" | Glucose comes from LibreLinkUp; Apple Health is read-only | Wrong mechanism |
| `MedicalWebPage` schema on the home page | The home page is a product page, not medical content | Not used |
| `downloadUrl: https://apple.com`, price in USD | Real App Store id is in `lib/site.ts`; offers in EUR | Use real values |
| German copy with "Sie" | Site style is "du" (`content/README.md` rule 4) | Use "du" |
| Medical reviewer (CDE / endocrinologist) for YMYL | Authors are Giorgi and Levan, both live with diabetes; no clinician | **Owner task** (below) |
| Localized App Store subtitle/keywords | Can't be done from code | Corrected version in `seo/aso.md`; **owner pastes it** |

## Done

- [x] 2026-10-22: Spanish in-article links pointed at `/es/...` and 307-redirected ("Page with redirect" in
      Search Console). Fixed in `components/article/MdxParts.tsx`.
- [x] 2026-10-22: Answer-first "Quick answers" block per article (`faq` field in `content/articles.ts`), rendered
      at the end of the article and emitted as FAQPage JSON-LD. Written for the top articles.
- [x] 2026-10-22: New article `child-glucose` (parents/caregivers following a child or an older parent).
- [x] 2026-10-22: Home JSON-LD enriched (featureList, audience, stable @ids, WebSite) and `/llms.txt` added for
      AI crawlers (facts only, links to the guides).
- [x] 2026-10-22: Corrected App Store metadata drafted in `seo/aso.md`.

## Next for Claude (in order)

1. Every new article gets a `faq` block (all 11 have one as of 2026-10-22): 2-4 questions each, phrased the way
   people search, the first sentence of each answer answers it outright, facts from the article only, plain text.
2. When a medical reviewer exists: add a `reviewer` to `content/authors.ts`, show "Medically reviewed by" in the
   byline, and emit `reviewedBy` in the article JSON-LD. Do not invent credentials.
3. Article ideas with demand (seo/gaps.json + brief): "hipoglucemia nocturna" (night lows, with alarms),
   "libre 3 signal loss", "librelinkup must accept terms of use", "blutzuckerwerte tabelle" (needs sources).
   One per day max, per `seo/daily-article.md`.
4. Each week: Search Console → Pages → "Why pages aren't indexed". Crawl locally (build, `next start`, follow
   every sitemap URL and internal link) and fix any internal link that redirects or 404s.
5. Keep `/llms.txt` (`app/llms.txt/route.ts`) in sync when features ship (Dexcom, Android, etc.).

## For Giorgi (only you can do these)

1. **Merge the PR** for branch `seo/geo-pass` so Vercel deploys it. Then in Search Console → Pages → "Page with
   redirect" → **Validate fix**.
2. **App Store Connect** → each localization (Spanish (Spain), Spanish (Mexico), English (US/UK), German):
   paste subtitle, keywords and promotional text from `seo/aso.md`. Ship with the next app version
   (subtitle/keywords only change with a new version; promotional text changes any time).
3. **Medical reviewer (biggest E-E-A-T win).** Find one diabetes educator, nurse or endocrinologist willing to
   review the guides and be named (name, credential, a profile link such as a clinic or LinkedIn page). Send
   Claude their details; Claude adds the reviewer box and schema. Never list someone who hasn't agreed.
4. **Search Console**: submit `https://dulceglucosa.com/sitemap.xml` again after the deploy, and request indexing
   for the new article URLs (listed in the PR).
5. **Off-site mentions** (AI engines cite what others say about you): answer questions on r/diabetes_t1,
   r/Type1Diabetes, Spanish/German T1D forums and Facebook groups where Dulce genuinely helps, linking the
   relevant guide; ask diabetes associations or bloggers for a listing. One real mention beats any schema.
6. **App Store reviews**: ask happy users (in the app or in person) for a rating; ratings feed both ASO and AI
   answers.
