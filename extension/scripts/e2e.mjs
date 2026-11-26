// End-to-end check against a local relay. Not in CI.
//
//   1. In dulce-relay: a local relay on 127.0.0.1:8799 with a fake Pro phone
//      that claims every link code (like `npm run sim:garmin`) and an
//      `/__unlink` control that removes the links (= "Remove" on the phone).
//   2. Here: npm run build:local && node scripts/e2e.mjs [outDir]
//
// Starts Chrome with a throwaway profile and the extension loaded, opens the
// popup, waits for the code, the phone's claim and the value, checks the
// badge, removes the link "on the phone" and checks the badge clears within
// a minute, then that the popup shows a new code. Screenshots go to outDir.
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const out = process.argv[2] ?? join(root, 'e2e-out');
const RELAY = 'http://127.0.0.1:8799';
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const profile = mkdtempSync(join(tmpdir(), 'dulce-ext-e2e-'));
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);
const fail = (msg) => {
  throw new Error(msg);
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  pipe: true,
  enableExtensions: [dist],
  userDataDir: profile,
  args: [
    '--no-first-run',
    '--no-default-browser-check',
    // CHROME_LANG=de: Chrome's UI language, so the popup uses that locale.
    ...(process.env.CHROME_LANG ? [`--lang=${process.env.CHROME_LANG}`, '-AppleLanguages', `(${process.env.CHROME_LANG})`] : []),
  ],
});

try {
  const swTarget = await browser.waitForTarget((t) => t.type() === 'service_worker' && t.url().endsWith('/background.js'), { timeout: 15_000 });
  const extId = new URL(swTarget.url()).host;
  const sw = await swTarget.worker();
  const badge = () => sw.evaluate(() => chrome.action.getBadgeText({}));
  const title = () => sw.evaluate(() => chrome.action.getTitle({}));
  log('extension', extId);

  const openPopup = async () => {
    const p = await browser.newPage();
    await p.setViewport({ width: 320, height: 560, deviceScaleFactor: 2 });
    await p.goto(`chrome-extension://${extId}/popup.html`);
    return p;
  };

  // 1. Code + QR.
  let page = await openPopup();
  await page.waitForFunction(() => /^[A-Z0-9]{3} [A-Z0-9]{3}$/.test(document.getElementById('code')?.textContent ?? ''), { timeout: 15_000 });
  const code = await page.$eval('#code', (e) => e.textContent);
  log('code shown', code, '| badge', JSON.stringify(await badge()), '|', await title());
  await page.screenshot({ path: join(out, '1-link.png'), fullPage: true });

  // 2. The fake phone claims it; the value appears.
  await page.waitForFunction(() => (document.getElementById('value')?.textContent ?? '') !== '' && !document.getElementById('reading')?.hidden, { timeout: 60_000 });
  await page.waitForFunction(() => document.querySelector('#chart svg') != null, { timeout: 15_000 });
  const value = await page.$eval('#value', (e) => e.textContent);
  log('value shown', value, '| badge', JSON.stringify(await badge()), '|', await title());
  if ((await badge()) !== value) fail(`badge ${await badge()} != value ${value}`);
  await page.screenshot({ path: join(out, '2-reading.png'), fullPage: true });

  // Chart length switch.
  await page.click('#hours button[data-hours="12"]');
  await page.waitForFunction(() => document.querySelector('#hours button[data-hours="12"]')?.getAttribute('aria-pressed') === 'true');
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: join(out, '3-reading-12h.png'), fullPage: true });
  await page.close();

  // 3. "Remove" on the phone: the badge clears within a minute (popup closed,
  //    so only the background alarm notices).
  const t0 = Date.now();
  const r = await fetch(`${RELAY}/__unlink`, { method: 'POST' }).then((x) => x.json());
  log('removed on the phone', JSON.stringify(r));
  while ((await badge()) !== '') {
    if (Date.now() - t0 > 75_000) fail('badge still shows a value 75 s after removal');
    await new Promise((res) => setTimeout(res, 1000));
  }
  log(`badge cleared after ${Math.round((Date.now() - t0) / 1000)} s |`, await title());

  // 4. Opening the popup again shows a new code.
  page = await openPopup();
  await page.waitForFunction((old) => {
    const c = document.getElementById('code')?.textContent ?? '';
    return /^[A-Z0-9]{3} [A-Z0-9]{3}$/.test(c) && c !== old;
  }, { timeout: 15_000 }, code);
  log('new code', await page.$eval('#code', (e) => e.textContent));
  await page.screenshot({ path: join(out, '4-new-code.png'), fullPage: true });
  log('PASS');
} finally {
  await browser.close();
  rmSync(profile, { recursive: true, force: true });
}
