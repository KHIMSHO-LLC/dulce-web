// Tell IndexNow engines (Bing, which also feeds ChatGPT search and Copilot;
// Yandex; Seznam; Naver) about every URL in the live sitemap. Run after a
// deploy that adds or changes pages: npm run indexnow
// The key file public/8c04e76096dfe7e7443bbc08806e6e82.txt proves we own the host.
const KEY = "8c04e76096dfe7e7443bbc08806e6e82";
const HOST = "dulceglucosa.com";

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) throw new Error("sitemap has no URLs");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs → ${res.status} ${res.statusText}`);
if (res.status >= 400) process.exit(1);
