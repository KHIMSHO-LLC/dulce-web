# Articles

Every article lives in two places:

- `content/articles.ts`: the registry entry (id, slugs, titles, descriptions, `summary`, dates, author, keywords, image,
  related). `summary` is the 2-3 sentence direct answer shown under the H1 (what AI answers quote): plain text, the
  title's question answered in the first sentence, facts from the article only. Also add the article id to at least
  one calculator's `guides` list in `lib/tools.ts`.
- `content/articles/<id>/{es,en,de,fr,it}.mdx`: the body in each language (required). Finnish and Dutch
  (`fi.mdx`, `nl.mdx`, added 2026-11-04) and Norwegian, Swedish and Russian (`nb.mdx`, `sv.mdx`, `ru.mdx`, site added
  2026-11-05, no guides translated yet) are optional: an article appears in that language only once its registry entry
  has values for slug, title, description, summary, keywords, imageAlt and faq and the MDX exists. In those
  bodies, links to guides not yet translated go to the English page (mark them "(englanniksi)" / "(in het Engels)" /
  "(på engelsk)" / "(på engelska)" / "(на английском)"). The app has all these languages from 1.0.6 on. The page renders the title (H1),
  byline, closing CTA and disclaimers, so the body starts with an intro paragraph and uses `##` sections.

Calculators: `app/[locale]/tools/*`, formulas in `lib/tools.ts`, explanations in `content/tools/<name>/<locale>.mdx`.

## Components available in MDX

- `<AppCta />` or `<AppCta title="..." />`: install button. Its App Store link carries `pt=127601978` and
  `ct=blog_<id>`, so App Store Connect → App Analytics → Campaigns shows installs per article. One mid-article.
- `<ArticleLink to="<article id>">text</ArticleLink>`: link to another article (slug resolved per language).
- `<PageLink to="/setup">text</PageLink>`: also `/tools/glucose-converter`, `/tools/a1c-calculator`, `/legal/disclaimer`,
  `/librelinkup-status`.
- `<Figure src="/guides/x.jpg" alt="..." caption="..." />`: images in `public/guides/` (phone screenshots
  are 1400×3034; pass `width`/`height` otherwise, `narrow={false}` for wide images).
## Images (from 2026-11-07)

Every new article gets its own cover (`image` in the registry) and at least one real in-app screenshot inline.

- **Cover:** `public/guides/covers/<article id>.webp`, 1600×1040. It also shows at the top of the article (only covers
  under `/guides/covers/` do). Two styles, both built from **real Dulce screens** (never AI-drawn UI):
  1. **Designed** (default): dark Dulce background, kicker, two-line headline with one orange word, subline, and real
     screens in Apple frames or a small card (checklist, ranges, chips). Template:
     `DULCE/marketing/output/blog-covers-test/src/cover.html` (+ `render.mjs`, one `T` entry per article).
  2. **Photo**: a free-license photo (Unsplash License) of a hand holding an iPhone or similar, with a real screenshot
     placed on the screen by `src/photo_screen.py`. Only when the screen faces the camera; record the photo in
     `final/CREDITS.txt`. Rejected by the owner (2026-11-07): watch on a wrist with a finger over it, and the
     over-the-shoulder cat photo. AI-generated scenes were rejected too.
  Text on covers states only what the article says; medical numbers need the article's source.
- **Inline**: at least one `<Figure>` with a real screenshot of the screen the article talks about.
- The headless writer cannot render covers: it uses the closest existing image and adds the article to
  `seo/covers-needed.md` (id, kicker, headline, subline, which screens). An interactive session renders them.

## More MDX components

- `<Callout>` / `<Callout type="warning">`: notes; warnings for anything safety-related.
- `<Steps><Step title="...">...</Step></Steps>`: numbered how-to steps.
- Markdown tables work (remark-gfm).

## Rules (non-negotiable)

1. **Only what the released app does.** The site describes 1.0.6 (owner's go-ahead 2026-11-05, ahead of the store
   release): Dexcom (G6/G7/ONE+ via Dexcom Share), Medtronic (CareLink), Nightscout, NFC smart insulin pens (NovoPen 6,
   NovoPen Echo Plus; free) and 12 app languages. Pet mode (1.0.7, "Who is Dulce for?" → "A pet") may be described too: owner's go-ahead 2026-11-06, while 1.0.7 was in review. Android is NOT released. Use the app's exact UI labels from
   `dulce-app/src/locales/{en,es-ES,de}/common.json` on `main` when naming buttons or settings.
2. **No invented facts.** Medical numbers need a source listed at the end (consensus papers, ADA, Abbott docs).
   No invented anecdotes, quotes, user counts or statistics. Authors are real people
   (`content/authors.ts`); don't put words or experiences in their mouth beyond their bios.
3. **Never copy competitors' text.** Use their topics, write everything from scratch.
4. **Native in each language**, not literal translation. Spanish is Spain Spanish. German uses "du", French "tu",
   Italian "tu". Use the app's exact labels from `dulce-app/src/locales/{fr,it}/common.json` (Réglages, Abonnés,
   Activité en direct / Impostazioni, Follower, Attività in tempo reale).
5. **Safety:** never give dosing advice. Anything about lows, highs or treatment ends with "confirm with your
   sensor / care team". Dulce is not a medical device and doesn't replace the sensor's alarms.
6. Real dates only (today or earlier). Bump `dateModified` when you change an article.
7. Every new article links to at least 2 others, and at least one older article links back to it.
8. Slugs: lowercase, hyphens, no accents, contain the main keyword of that language. Never change a published slug.

Run `npm run check:content` and `npm run build` before committing; both must pass.
