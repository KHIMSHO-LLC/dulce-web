// Parses every JSON-LD block on every sitemap URL of a running site and checks
// that entity references (`{"@id": ...}`) resolve to an entity on the same page.
//   npm run build && npm start   (another terminal)
//   npm run check:jsonld                       # http://localhost:3000
//   BASE=https://dulceglucosa.com npm run check:jsonld
const BASE = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://dulceglucosa.com";

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, BASE));
if (urls.length === 0) throw new Error("sitemap has no URLs");

type Node = Record<string, unknown>;
const problems: string[] = [];
const typesSeen = new Map<string, number>();
let blocks = 0;

function walk(value: unknown, visit: (n: Node) => void) {
  if (Array.isArray(value)) value.forEach((v) => walk(v, visit));
  else if (value && typeof value === "object") {
    visit(value as Node);
    Object.values(value).forEach((v) => walk(v, visit));
  }
}

for (const url of urls) {
  const res = await fetch(url);
  if (res.status !== 200) {
    problems.push(`${url}: HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (scripts.length === 0) problems.push(`${url}: no JSON-LD`);
  const defined = new Set<string>();
  const referenced = new Set<string>();
  for (const raw of scripts) {
    blocks++;
    let data: Node;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      problems.push(`${url}: invalid JSON (${(e as Error).message})`);
      continue;
    }
    if (data["@context"] !== "https://schema.org") problems.push(`${url}: block without schema.org @context`);
    walk(data, (n) => {
      const keys = Object.keys(n);
      if (typeof n["@id"] === "string") {
        if (keys.length === 1) referenced.add(n["@id"]);
        else defined.add(n["@id"]);
      }
      if (typeof n["@type"] === "string") typesSeen.set(n["@type"], (typesSeen.get(n["@type"]) ?? 0) + 1);
      if ("aggregateRating" in n) problems.push(`${url}: aggregateRating without a real source`);
    });
    if (!data["@type"] && !data["@graph"]) problems.push(`${url}: block without @type or @graph`);
  }
  for (const id of referenced) if (!defined.has(id)) problems.push(`${url}: @id ${id} referenced but not defined`);
}

console.log(`${urls.length} pages, ${blocks} JSON-LD blocks`);
console.log([...typesSeen].sort().map(([t, n]) => `  ${t}: ${n}`).join("\n"));
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n${problems.join("\n")}`);
  process.exit(1);
}
console.log("All JSON-LD parses and every @id reference resolves.");
