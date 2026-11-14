# dulce-web docs

Every doc in this repo and what it's for. All three Dulce repositories at a glance: [PROJECT-MAP.md in dulce-app](https://github.com/KHIMSHO-LLC/dulce-app/blob/main/docs/PROJECT-MAP.md).

Many docs here sit outside `docs/` on purpose: scripts, agents and code comments read them at those paths. **Don't move them.** In particular, `scripts/seo/run-daily.sh` runs `seo/daily-article.md` as the prompt of the scheduled SEO writer, which reads and writes `seo/log.md`, `seo/queue.md` and `seo/covers-needed.md`.

## In this folder

| Doc | What it is |
| --- | --- |
| [partners-guide.md](partners-guide.md) | How to use the admin dashboard at `/partners`: partners, codes, payouts, devices. |
| [privacy-and-seo-followups.md](privacy-and-seo-followups.md) | Questions for privacy counsel, the retention cron's status, and the Search Console / GA4 exports needed for SEO analysis (2026-10-29). |

## Elsewhere in the repo

| Path | What it is | Read by |
| --- | --- | --- |
| [`../README.md`](../README.md) | Stack, running locally, scripts, layout. | People |
| [`../AGENTS.md`](../AGENTS.md) (and `CLAUDE.md`, which includes it) | Rules for coding agents: Next.js 16 differences; read the SEO plan and content rules first. | Agents |
| [`../PRODUCT.md`](../PRODUCT.md) | Who the site is for, positioning, what the released app does. | The Impeccable design skill; kept in sync with `app/llms.txt` and the landing page |
| [`../DESIGN.md`](../DESIGN.md) | The website's design system (colours, type, components, motion). | The Impeccable design skill |
| [`../content/README.md`](../content/README.md) | Rules for articles, help and tool texts: languages, MDX components, images and covers, the non-negotiable content rules. | Writers, the SEO writer |
| [`../seo/`](../seo/PLAN.md) | Giorgi's SEO workspace. Start with `PLAN.md`. | The SEO writer, Giorgi |
| [`../scripts/covers/README.md`](../scripts/covers/README.md) | How to render article covers. | People |
| [`../supabase/README.md`](../supabase/README.md) | Supabase setup, GDPR requests, the retention cleanup. | People |
| `../.impeccable/` | The Impeccable skill's notes for the landing page. | The Impeccable design skill |

### What's in `seo/`

| File | What it is |
| --- | --- |
| `PLAN.md` | The growth plan: ground truth about the app, what's done, what's next, and Giorgi's own to-do list. |
| `daily-article.md` | The SEO writer's prompt (run by `scripts/seo/run-daily.sh`). |
| `queue.md` | Owner-requested jobs the writer does before new articles. |
| `log.md` | One entry per writer run or SEO session. |
| `covers-needed.md` | Articles waiting for a cover image. |
| `segments.md` | Audience segments, and the current App Store listing text (1.0.7 draft). |
| `pets.md` | Pet mode (dogs and cats): demand, copy rules, App Store notes. |
| `keyword-volumes.md` | Measured search volumes. |
| `backlinks-2026-11-03.md` | The backlink plan. |
| `archive/` | Finished notes: older App Store drafts (`aso.md`, replaced by `segments.md`), the 2026-10-29 growth audit, the 2026-10-31 keyword review. |

## Docs in the other repos that matter here

- What Dulce may say (wording rules, both platforms and the website): [dulce-app `docs/product-and-wording-rules.md`](https://github.com/KHIMSHO-LLC/dulce-app/blob/main/docs/product-and-wording-rules.md).
- The app's labels to quote in articles: `dulce-app/src/locales/<locale>/common.json`.
- Relay routes the partners dashboard and status page use: `docs/README.md` in dulce-relay.
