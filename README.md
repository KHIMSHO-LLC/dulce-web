# dulce-web

Marketing website for [Dulce](https://dulceglucosa.com) — the Spanish-first CGM companion app.

Built with **Next.js 16** (App Router) + **next-intl** (es / en) + **Supabase** + **Tailwind 4**. Deployed to Vercel.

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in Supabase + (optional) Resend keys
npm run dev
```

Open <http://localhost:3000>. Spanish (default) at `/`, English at `/en`.

## Scripts

```bash
npm run dev       # next dev (Turbopack)
npm run build     # next build
npm run start     # production server
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

## Project layout

```
app/
├── [locale]/                 # all visitor-facing pages live here
│   ├── layout.tsx            # html/body, header, footer, providers
│   ├── page.tsx              # home
│   ├── features/page.tsx     # /caracteristicas (es) | /en/features
│   ├── beta/page.tsx
│   ├── about/page.tsx        # /sobre | /en/about
│   ├── contact/page.tsx      # /contacto | /en/contact
│   └── legal/{privacy,terms,cookies}/page.tsx
├── actions/                  # "use server" handlers for forms
│   ├── waitlist.ts
│   └── beta.ts
├── not-found.tsx             # root fallback
├── sitemap.ts
└── robots.ts
components/
├── sections/                 # Hero, FeatureGrid, IntegrationsRow, ...
├── forms/                    # WaitlistForm, BetaForm
├── legal/                    # bilingual legal content + LegalLayout
└── ui/                       # Button, Card
i18n/
├── routing.ts                # defineRouting (pathnames + localePrefix)
├── request.ts                # getRequestConfig (loads messages/*.json)
└── navigation.ts             # typed Link, useRouter, redirect
lib/
├── supabase/server.ts        # service-role admin client (server-only)
├── email/resend.ts           # transactional email
├── utils/{cn,hash,ratelimit,getRequestIp}.ts
└── env.ts
messages/
├── es.json
└── en.json
supabase/
├── migrations/0001_init_lists.sql
└── README.md                 # bootstrap & GDPR notes
proxy.ts                      # next-intl middleware (Next 16 file convention)
```

## Privacy & GDPR

- Forms hit Server Actions with the service-role Supabase client — the key is never bundled into the browser.
- IPs are SHA-256 hashed with a daily-rotating salt before storage (see `lib/utils/hash.ts`).
- Analytics: Vercel Analytics (anonymous, cookieless — no banner required).
- Right-to-erasure: delete rows by email in Supabase Studio.

> ⚠️ The bundled Privacy Policy and Terms of Use are drafted templates. **Have them reviewed by a Spanish data-protection lawyer before public launch.** Each legal file has a `TODO` comment marker at the top.

## Deploying

1. Push to a Git remote.
2. Import the project on Vercel.
3. Add env vars from `.env.example`.
4. Add the domain `dulceglucosa.com` and the WWW redirect.
5. Resend: verify the sending domain (`dulceglucosa.com`) with SPF / DKIM / DMARC records.

## Next.js 16 notes

- `proxy.ts` (formerly `middleware.ts`) is the file convention.
- Page/layout `params` and `searchParams` are Promises — always `await`.
- `next lint` is removed; use the ESLint CLI directly (`npm run lint`).
