// Weekly crawl (seo/PLAN.md "Next for Claude" 4): every sitemap URL must answer 200,
// be self-canonical, have exactly one <h1>, and every internal link and image on it
// must answer 200 without a redirect.
//   BASE=https://dulceglucosa.com npm run check:crawl     (live)
//   npm run build && npm start, then npm run check:crawl  (local, http://localhost:3000)
const BASE = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://dulceglucosa.com";
const local = (u: string) => u.replace(SITE, BASE);

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (pages.length === 0) throw new Error("sitemap has no URLs");

const problems: string[] = [];
const links = new Map<string, string>(); // target → first page linking to it

for (const page of pages) {
  const res = await fetch(local(page), { redirect: "manual" });
  if (res.status !== 200) {
    problems.push(`${page}: HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== page) problems.push(`${page}: canonical is ${canonical ?? "missing"}`);
  const main = html.split("<main")[1]?.split("</main>")[0] ?? "";
  const h1 = (main.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) problems.push(`${page}: ${h1} <h1>`);
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) problems.push(`${page}: noindex but in the sitemap`);

  const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  const refs = [
    ...[...html.matchAll(/<a[^>]+href="([^"#?]+)[^"]*"/g)].map((m) => m[1]),
    ...[...html.matchAll(/<img[^>]+src="(\/[^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&")),
    ...(og ? [og] : []),
  ];
  for (const ref of refs) {
    if (ref.startsWith("/_next/image")) continue; // optimizer URLs depend on the deployment
    const abs = ref.startsWith("/") ? `${SITE}${ref}` : ref;
    if (!abs.startsWith(SITE)) continue;
    if (!links.has(abs)) links.set(abs, page);
  }
}

for (const [target, from] of links) {
  const res = await fetch(local(target), { redirect: "manual" });
  if (res.status !== 200) {
    const to = res.headers.get("location");
    problems.push(`${target}: HTTP ${res.status}${to ? ` → ${to}` : ""} (linked from ${from})`);
  }
}

console.log(`${pages.length} pages, ${links.size} internal links and images checked`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n${problems.join("\n")}`);
  process.exit(1);
}
console.log("All pages 200, self-canonical, one <h1>; every internal link 200 without redirect.");
