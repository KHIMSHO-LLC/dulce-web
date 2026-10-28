# Articles

Every article lives in two places:

- `content/articles.ts`: the registry entry (id, slugs, titles, descriptions, `summary`, dates, author, keywords, image,
  related). `summary` is the 2-3 sentence direct answer shown under the H1 (what AI answers quote): plain text, the
  title's question answered in the first sentence, facts from the article only. Also add the article id to at least
  one calculator's `guides` list in `lib/tools.ts`.
- `content/articles/<id>/{es,en,de,fr,it}.mdx`: the body in each language. The page renders the title (H1),
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
- `<Callout>` / `<Callout type="warning">`: notes; warnings for anything safety-related.
- `<Steps><Step title="...">...</Step></Steps>`: numbered how-to steps.
- Markdown tables work (remark-gfm).

## Rules (non-negotiable)

1. **Only what the released app does.** From 1.0.4 (live on the site since 2026-10-25) the released line is
   `dulce-app` `release/1.0.4`. Dexcom (G6/G7/ONE+ via Dexcom Share) is released; Nightscout and Android are NOT. Use the app's exact UI labels from
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
