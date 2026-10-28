// Tell IndexNow engines (Bing, which also feeds ChatGPT search and Copilot;
// Yandex; Seznam; Naver) about every URL in the live sitemap.
//   npm run indexnow                  (after a deploy that adds or changes pages)
// Runs automatically after each production deploy (.github/workflows/indexnow.yml)
// and in the daily article workflow (seo/daily-article.md).
//
// The key is public by design: IndexNow verifies it by fetching
// https://<host>/<key>.txt, served from public/. INDEXNOW_KEY overrides the
// default; a new key needs a matching public/<key>.txt.
const KEY = process.env.INDEXNOW_KEY || "8c04e76096dfe7e7443bbc08806e6e82";
const HOST = process.env.INDEXNOW_HOST || "dulceglucosa.com";
const keyLocation = `https://${HOST}/${KEY}.txt`;

const served = await (await fetch(keyLocation)).text();
if (served.trim() !== KEY) throw new Error(`${keyLocation} does not serve the key; add public/${KEY}.txt and deploy first`);

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) throw new Error("sitemap has no URLs");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs → ${res.status} ${res.statusText}`);
if (res.status >= 400) process.exit(1);
