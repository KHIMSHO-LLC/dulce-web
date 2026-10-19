// Finds real search queries no article covers yet. Free sources only:
// Google autocomplete and App Store search suggestions (every result is a
// query real people type). Run: npm run seo:gaps   (writes seo/gaps.json)
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ARTICLES } from "../../content/articles.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const UA = { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 Safari/605.1.15" };

const MARKETS = {
  es: { hl: "es", gl: "es", front: "143454-8,29", seeds: ["libre", "librelinkup", "freestyle libre", "libre 3", "libre 2", "glucosa", "sensor glucosa", "diabetes tipo 1", "hipoglucemia"] },
  en: { hl: "en", gl: "us", front: "143441-1,29", seeds: ["libre", "librelinkup", "freestyle libre", "libre 3", "libre 2", "cgm", "glucose", "type 1 diabetes", "low blood sugar"] },
  de: { hl: "de", gl: "de", front: "143443-4,29", seeds: ["libre", "librelinkup", "freestyle libre", "libre 3", "libre 2", "blutzucker", "glukose", "typ 1 diabetes", "unterzuckerung"] },
} as const;

const RELEVANT = /libre ?link|libre ?view|freestyle|libre [23]|libre (widget|app|alarm|apple|watch|lock|pantalla|sperr|iphone|sensor|plus|teilen|famil|compart|alarma)|gluc|glukos|blutzucker|zucker|cgm|diabet|hba1c|a1c|hipogluc|hypogly|unterzucker|tiempo en rango|time in range|zielbereich|mg\/dl|mmol|insulin/i;
const NOISE = /glucosamin|glucosan|glucozen|sirup|edeka|pferd|chemische|ariana|ottai|office|hardware monitor|calibre|cuba libre|mercado libre|lyrics|precio|price|preis|comprar|buy|kaufen|amazon|costco|farmacia|apotheke|rezept|receta|seguro|insurance|krankenkasse|perro|gato|dog|cat|hund|katze/i;

async function get(url: string, headers: Record<string, string> = {}): Promise<string> {
  try {
    const r = await fetch(url, { headers: { ...UA, ...headers }, signal: AbortSignal.timeout(15000) });
    return r.ok ? await r.text() : "";
  } catch {
    return "";
  }
}

async function google(q: string, m: (typeof MARKETS)[keyof typeof MARKETS]): Promise<string[]> {
  const body = await get(`https://suggestqueries.google.com/complete/search?client=firefox&hl=${m.hl}&gl=${m.gl}&q=${encodeURIComponent(q)}`);
  try {
    return JSON.parse(body)[1] as string[];
  } catch {
    return [];
  }
}

async function appStore(q: string, m: (typeof MARKETS)[keyof typeof MARKETS]): Promise<string[]> {
  const body = await get(
    `https://search.itunes.apple.com/WebObjects/MZSearchHints.woa/wa/hints?clientApplication=Software&term=${encodeURIComponent(q)}`,
    { "X-Apple-Store-Front": m.front },
  );
  return [...body.matchAll(/<key>term<\/key>\s*<string>(.*?)<\/string>/g)].map((x) => x[1]);
}

const tokens = (s: string) => new Set(s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter((t) => t.length > 2));

const out: Record<string, Array<{ query: string; sources: string[]; closestArticle: string | null; overlap: number }>> = {};
for (const [locale, m] of Object.entries(MARKETS)) {
  const found = new Map<string, Set<string>>();
  const add = (q: string, src: string) => {
    const k = q.toLowerCase().trim();
    if (!RELEVANT.test(k) || NOISE.test(k)) return;
    if (!found.has(k)) found.set(k, new Set());
    found.get(k)!.add(src);
  };
  const queries = m.seeds.flatMap((s) => [s, ..."abcdefghijklmnopqrstuvwxyz".split("").map((c) => `${s} ${c}`)]);
  for (let i = 0; i < queries.length; i += 8) {
    const batch = queries.slice(i, i + 8);
    const res = await Promise.all(batch.map((q) => google(q, m)));
    res.flat().forEach((q) => add(q, "google"));
  }
  for (const s of m.seeds) (await appStore(s, m)).forEach((q) => add(q, "appstore"));

  // Coverage: best token overlap between the query and any article's keywords/title.
  const docs = ARTICLES.map((a) => ({
    id: a.id,
    t: tokens([a.title[locale as "es"], ...a.keywords[locale as "es"]].join(" ")),
  }));
  out[locale] = [...found.entries()]
    .map(([query, src]) => {
      const qt = tokens(query);
      let best: string | null = null;
      let overlap = 0;
      for (const d of docs) {
        const n = [...qt].filter((t) => d.t.has(t)).length / Math.max(1, qt.size);
        if (n > overlap) [overlap, best] = [n, d.id];
      }
      return { query, sources: [...src], closestArticle: best, overlap: Math.round(overlap * 100) / 100 };
    })
    .filter((x) => x.overlap < 0.75)
    .sort((a, b) => b.sources.length - a.sources.length || a.overlap - b.overlap);
}

writeFileSync(join(root, "seo/gaps.json"), JSON.stringify(out, null, 1));
for (const [l, list] of Object.entries(out)) console.log(`${l}: ${list.length} uncovered queries`);
