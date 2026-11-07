// Blog cover renderer. See scripts/covers/README.md.
//   node scripts/covers/render.mjs <variant...> [--out <dir>]
// Writes <out>/<variant>.jpg (1600x1040, default out: scripts/covers/out/). Variants are the keys of `T` in cover.html.
import puppeteer from "puppeteer-core";
import { fileURLToPath } from "node:url";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const out = outIdx >= 0 ? path.resolve(args[outIdx + 1]) : path.join(dir, "out");
const variants = args.filter((a, i) => i !== outIdx && i !== outIdx + 1);
if (!variants.length) {
  console.error("usage: node scripts/covers/render.mjs <variant...> [--out <dir>]");
  process.exit(1);
}

// Apple device frames (Apple Design Resources) may not be redistributed, so they are not in this public repo.
// They live in the private app-store-assets folder next to this repo.
const FRAME_SRC = path.resolve(dir, "../../../app-store-assets/_source/screens");
mkdirSync(path.join(dir, "frames"), { recursive: true });
for (const f of ["bz-iphone.png", "bz-watch.png"]) {
  const dest = path.join(dir, "frames", f);
  if (existsSync(dest)) continue;
  if (!existsSync(path.join(FRAME_SRC, f))) {
    console.error(`missing frames/${f}: copy it from DULCE/app-store-assets/_source/screens/`);
    process.exit(1);
  }
  copyFileSync(path.join(FRAME_SRC, f), dest);
}

mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--allow-file-access-from-files"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1040, deviceScaleFactor: 1 });
for (const v of variants) {
  await page.goto(`file://${dir}/cover.html?v=${v}`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  const file = path.join(out, `${v}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 92 });
  console.log(file);
}
await browser.close();
