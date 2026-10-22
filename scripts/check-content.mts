// Content checks for articles. Run: npm run check:content
// Fails (exit 1) on anything that would publish a broken or misleading page.
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ARTICLES } from "../content/articles.ts";
import { AUTHORS } from "../content/authors.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["es", "en", "de", "fr", "it"] as const;
const today = new Date().toISOString().slice(0, 10);
const errors: string[] = [];
const warnings: string[] = [];
const err = (id: string, msg: string) => errors.push(`${id}: ${msg}`);
const warn = (id: string, msg: string) => warnings.push(`${id}: ${msg}`);

const ids = new Set(ARTICLES.map((a) => a.id));
if (ids.size !== ARTICLES.length) errors.push("duplicate article ids");

const inbound = new Map<string, number>([...ids].map((id) => [id, 0]));

// Phrases that would describe features the released app doesn't have.
const UNRELEASED = [/dexcom[^.\n]*(funciona|compatible|works|support|unterstützt|connect)/i, /nightscout[^.\n]*(funciona|works|support|unterstützt)/i, /android app/i];

for (const locale of LOCALES) {
  const slugs = new Set<string>();
  for (const a of ARTICLES) {
    const slug = a.slug[locale];
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) err(a.id, `${locale} slug "${slug}" must be lowercase a-z, 0-9 and hyphens`);
    if (slugs.has(slug)) err(a.id, `${locale} slug "${slug}" is used twice`);
    slugs.add(slug);
  }
}

for (const a of ARTICLES) {
  if (!AUTHORS[a.author]) err(a.id, `unknown author ${a.author}`);
  if (a.datePublished > today) err(a.id, `datePublished ${a.datePublished} is in the future`);
  if (a.dateModified > today) err(a.id, `dateModified ${a.dateModified} is in the future`);
  if (a.dateModified < a.datePublished) err(a.id, "dateModified is before datePublished");
  if (!existsSync(join(root, "public", a.image))) err(a.id, `image ${a.image} not found in public/`);
  for (const r of a.related) if (!ids.has(r)) err(a.id, `related "${r}" is not an article`);
  if (a.related.includes(a.id)) err(a.id, "relates to itself");

  if (a.faq) {
    const n = a.faq.en.length;
    if (n < 2) err(a.id, "faq needs at least 2 questions");
    for (const locale of LOCALES) {
      const items = a.faq[locale];
      if (items.length !== n) err(a.id, `${locale} faq has ${items.length} questions, en has ${n}`);
      items.forEach((f, i) => {
        if (f.link !== a.faq!.en[i]?.link) err(a.id, `${locale} faq ${i + 1} links differently from en`);
        if (f.link && (!ids.has(f.link) || f.link === a.id)) err(a.id, `${locale} faq ${i + 1} links to bad article "${f.link}"`);
        if (/[*_`<>\[\]]/.test(f.q + f.a)) err(a.id, `${locale} faq ${i + 1} must be plain text (no Markdown or tags)`);
        for (const re of UNRELEASED) if (re.test(f.q + " " + f.a)) err(a.id, `${locale} faq mentions an unreleased integration (${re})`);
        if (f.link && locale === "en") inbound.set(f.link, (inbound.get(f.link) ?? 0) + 1);
      });
    }
  }

  for (const locale of LOCALES) {
    const t = a.title[locale];
    const d = a.description[locale];
    if (t.length > 75) warn(a.id, `${locale} title is ${t.length} chars (aim for under 70)`);
    if (d.length < 100 || d.length > 170) warn(a.id, `${locale} description is ${d.length} chars (aim for 120-160)`);
    if (a.keywords[locale].length < 2) err(a.id, `${locale} needs at least 2 target keywords`);

    const file = join(root, "content/articles", a.id, `${locale}.mdx`);
    if (!existsSync(file)) {
      err(a.id, `missing content/articles/${a.id}/${locale}.mdx`);
      continue;
    }
    const body = readFileSync(file, "utf8");
    // The quick questions render on the page too, so they count.
    const faqText = (a.faq?.[locale] ?? []).map((f) => `${f.q} ${f.a}`).join(" ");
    const words = `${body.replace(/<[^>]+>/g, " ")} ${faqText}`.split(/\s+/).filter(Boolean).length;
    if (words < 400) err(a.id, `${locale} body is only ${words} words (min 400)`);
    if (!/<AppCta\b/.test(body)) err(a.id, `${locale} has no <AppCta /> in the body`);
    if (/^# /m.test(body)) err(a.id, `${locale} has an H1 (#); the page renders the title as H1, start sections at ##`);
    if (/—/.test(body)) warn(a.id, `${locale} uses an em dash`);
    for (const re of UNRELEASED) if (re.test(body)) err(a.id, `${locale} mentions an unreleased integration (${re})`);
    for (const m of body.matchAll(/<ArticleLink to="([^"]+)"/g)) {
      if (!ids.has(m[1])) err(a.id, `${locale} links to unknown article "${m[1]}"`);
      else if (m[1] === a.id) err(a.id, `${locale} links to itself`);
      else if (locale === "en") inbound.set(m[1], (inbound.get(m[1]) ?? 0) + 1);
    }
    const linkCount = [...body.matchAll(/<(ArticleLink|PageLink)\b/g)].length;
    if (linkCount < 2) err(a.id, `${locale} has ${linkCount} internal links (min 2)`);
    for (const m of body.matchAll(/<Figure[^>]*src="([^"]+)"/g)) {
      if (!existsSync(join(root, "public", m[1]))) err(a.id, `${locale} figure ${m[1]} not found in public/`);
    }
    for (const m of body.matchAll(/<PageLink to="([^"]+)"/g)) {
      if (!["/setup", "/tools/glucose-converter", "/tools/a1c-calculator", "/legal/disclaimer"].includes(m[1])) {
        err(a.id, `${locale} PageLink to unknown page "${m[1]}"`);
      }
    }
  }
}

for (const [id, n] of inbound) if (n === 0) err(id, "no other article links to it (add an <ArticleLink> from a related article)");

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(`${ARTICLES.length} articles, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
