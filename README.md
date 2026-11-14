# dulce-web

The website for [Dulce](https://dulceglucosa.com), the CGM companion app: the landing page, guides (`/blog`), help, calculators, legal pages, the `/partners` dashboard, invite links (`/f/<code>`) and the app-link files in `.well-known`.

Next.js 16 (App Router), next-intl, Tailwind 4, Supabase, Resend. Deployed on Vercel from `main`.

**Docs:** [docs/README.md](docs/README.md) lists every doc in this repo and what it's for. Before content or SEO work, read `seo/PLAN.md` and `content/README.md` (as `AGENTS.md` says). All three Dulce repositories at a glance: [PROJECT-MAP.md in dulce-app](https://github.com/KHIMSHO-LLC/dulce-app/blob/main/docs/PROJECT-MAP.md).

## Languages

10 site languages (`i18n/routing.ts`): English at `/` (default), and `/es`, `/de`, `/fr`, `/it`, `/fi`, `/nl`, `/nb`, `/sv`, `/ru`. Every article and calculator is written in the five core languages (en, es, de, fr, it); the other five get articles as they are translated. Site text is in `messages/<locale>.json`.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Create `.env.local` for what you need (there is no `.env.example`):

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`: waitlist forms (server only)
- `RESEND_API_KEY` (optional), `RESEND_FROM` (optional): email
- `RATELIMIT_SALT`: IP hashing salt
- `NEXT_PUBLIC_GA_ID` (optional): Google Analytics
- `NEXT_PUBLIC_RELAY_URL` (optional): another relay, for example `http://localhost:8787`
- The retention cron's variables are in `supabase/README.md`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint`, `npm run typecheck` | ESLint, TypeScript |
| `npm run check:content` | Checks the articles and their registry. Run before committing content. |
| `npm run check:jsonld`, `npm run check:crawl` | Structured data and a crawl of the site (also run weekly by GitHub Actions) |
| `npm run indexnow` | Tells search engines about changed URLs (also run after each production deploy) |
| `npm run seo:gaps` | Keyword gap report |

## Layout

```
app/
├── [locale]/          visitor pages: landing page, blog, help, tools, legal, setup, pro, sensors,
│                      who-is-dulce-for, authors, librelinkup-status, f/<code>
├── partners/          admin dashboard and partner stats (talks to the relay)
├── api/cron/          retention cleanup (Vercel cron, vercel.json)
├── actions/           server actions for the forms
├── .well-known/       apple-app-site-association, assetlinks.json
└── llms.txt, llms-full.txt, md/, og/
components/            UI by area (landing, article, legal, tools, ...)
content/               articles, help and tool texts (MDX) and their registry; rules in content/README.md
messages/              site text per language
lib/                   SEO, schema, tools, relay client, Supabase, email
seo/                   SEO plan, log, queue and the daily-article prompt
scripts/               content and SEO checks, cover rendering, the daily SEO job
supabase/              database migrations and setup
proxy.ts               language detection and old-URL redirects (Next 16's middleware file)
```

## Privacy

- Forms go through server actions with the service-role Supabase key, which is never sent to the browser.
- IPs are stored only as a salted SHA-256 hash (`lib/utils/hash.ts`).
- Analytics: Vercel Analytics, and Google Analytics when `NEXT_PUBLIC_GA_ID` is set.
- Data deletion and retention: `supabase/README.md`.
- The legal pages still wait for a lawyer's review (`TODO` markers at the top of the files in `components/legal/`). Open questions for counsel: `docs/privacy-and-seo-followups.md`.

## Next.js 16 notes

- `proxy.ts` replaces `middleware.ts`.
- Page and layout `params` and `searchParams` are Promises: always `await` them.
- `next lint` is gone; `npm run lint` runs ESLint directly.
- APIs differ from older Next.js: read `node_modules/next/dist/docs/` before changing framework code (`AGENTS.md`).
