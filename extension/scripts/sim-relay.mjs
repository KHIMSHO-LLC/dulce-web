// A local relay for trying the extension, like `npm run sim:garmin` in
// dulce-relay. Nothing here touches a real relay or a real sensor account.
// Run `npm ci` in dulce-relay first.
//
//   DULCE_RELAY=../../dulce-relay node scripts/sim-relay.mjs [--mmol]
//     The relay of a dulce-relay checkout on 127.0.0.1:8799 with one fake Pro
//     phone on a fake Libre sensor. The fake phone claims every link code
//     (after CLAIM_DELAY_MS, default 8 s, so the code screen can be seen).
//     POST /__unlink removes every link (= "Remove" on the phone).
//     Used by scripts/e2e.mjs.
//
//   DULCE_RELAY=../../dulce-relay node scripts/sim-relay.mjs --app
//     For the real Dulce app (a development build on the Android emulator or
//     iOS simulator): the relay on 127.0.0.1:8799 with a fixed local secret, a
//     fake LibreLinkUp on 127.0.0.1:9101 with one test login, and the relay's
//     minute cron. No fake phone: the app signs in to the fake sensor and links
//     the extension itself. Prints the Metro command to start the app with.
import http from 'node:http';
import { resolve } from 'node:path';
const F = resolve(process.env.DULCE_RELAY ?? '../../dulce-relay', 'scripts/fakes');
const { register, sensor, world } = await import(`file://${F}/world.mjs`);
const { makeClient } = await import(`file://${F}/client.mjs`);
const PORT = 8799, LIBRE_PORT = 9101, MIN = 60_000;
const mmol = process.argv.includes('--mmol');
const appMode = process.argv.includes('--app');
// Local-only test values (this relay runs on this computer and nowhere else).
const APP_SECRET = 'dulce-local-test-secret';
const LOGIN = { email: 'test@dulce.local', password: 'Dulce-test-1' };

const W = await world({ flags: {}, name: appMode ? 'sim-app' : 'sim-ext', t0: Date.now(), ...(appMode ? { vars: { RELAY_AUTH_SECRET: APP_SECRET } } : {}) });
await W.relay.setClock({ offsetMs: 0 });

/** Forward every request on a fixed local port to `target()` (a random port). */
function forward(port, target, tag) {
  const server = http.createServer(async (req, res) => {
    if (!appMode && req.url === '/__unlink') {
      const r = await W.client.post('/garmin/unlink', { all: true }, { deviceId: 'ext-sim-phone' });
      console.log(`[phone] unlink all → ${JSON.stringify(r.json)}`);
      res.end(JSON.stringify(r.json));
      return;
    }
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = Buffer.concat(chunks);
    const headers = { ...req.headers, 'cf-connecting-ip': '127.0.0.1' };
    delete headers.host;
    delete headers['content-length'];
    try {
      const r = await fetch(`${target()}${req.url}`, { method: req.method, headers, body: req.method === 'GET' || req.method === 'HEAD' ? undefined : body });
      const text = await r.text();
      const shown = body.length ? body.toString().replace(/"(token|signature|password)":"[^"]+"/g, '"$1":"…"').slice(0, 120) : '';
      console.log(`[${tag}] ${req.method} ${req.url} ${shown} → ${r.status} ${text.slice(0, 120)}`);
      res.writeHead(r.status, { 'content-type': r.headers.get('content-type') ?? 'application/json' });
      res.end(text);
    } catch (e) {
      res.writeHead(502);
      res.end(String(e));
    }
  });
  server.listen(port, '127.0.0.1');
}

forward(PORT, () => W.relay.url, appMode ? 'relay' : 'ext');
setInterval(() => W.relay.tick().catch((e) => console.log('[tick]', e.message)), MIN);

if (appMode) {
  forward(LIBRE_PORT, () => W.fakes.libre.url, 'libre');
  await W.ctl('libre', 'account', { ...LOGIN, timeZone: 'Europe/Madrid' });
  console.log(`
READY: local relay http://127.0.0.1:${PORT}, fake LibreLinkUp http://127.0.0.1:${LIBRE_PORT}

Fake sensor login (LibreLinkUp in the app):  ${LOGIN.email}  /  ${LOGIN.password}

Android emulator, so it reaches these ports on this computer:
  adb reverse tcp:8081 tcp:8081 && adb reverse tcp:${PORT} tcp:${PORT} && adb reverse tcp:${LIBRE_PORT} tcp:${LIBRE_PORT}

In dulce-app, first set the two .env files aside (a development bundle takes
their production relay address over the settings below; test mode then blocks it):
  mv .env.local .env.local.off && mv .env.development.local .env.development.local.off
and put them back after the test:
  mv .env.local.off .env.local && mv .env.development.local.off .env.development.local

Start the app (in dulce-app) with:
  EXPO_PUBLIC_E2E=1 EXPO_PUBLIC_E2E_TIER=paid EXPO_PUBLIC_E2E_SKIP_POPUPS=1 EXPO_PUBLIC_E2E_LIBRE_URL=http://127.0.0.1:${LIBRE_PORT} EXPO_PUBLIC_RELAY_BASE_URL=http://localhost:${PORT} EXPO_PUBLIC_RELAY_AUTH_SECRET=${APP_SECRET} npx expo start --dev-client --clear

Build the extension for this relay (in dulce-web/extension):  npm run build:local
`);
} else {
  const client = makeClient({ get url() { return W.relay.url; } }, W.secrets.RELAY_AUTH_SECRET);
  W.client = client;
  const libre = await sensor(W, 'libre');
  const prefs = { notificationsEnabled: true, hypoThreshold: 70, hyperThreshold: 180, criticalLowEnabled: true, quietHoursStart: 0, quietHoursEnd: 0, timeZone: 'Europe/Madrid', unit: mmol ? 'mmoll' : 'mgdl', language: 'en' };
  const reg = await register(W, 'ext-sim-phone', libre, { tier: 'paid', extra: { alertPrefs: prefs } });
  if (!reg.json?.ok) throw new Error(`register failed ${JSON.stringify(reg.json)}`);
  await W.relay.tick();
  const claimed = new Set();
  const seen = new Map();
  const DELAY = Number(process.env.CLAIM_DELAY_MS ?? 8000);
  setInterval(async () => {
    const kv = await W.relay.kvDump();
    for (const k of Object.keys(kv)) {
      if (!k.startsWith('garmin-code:') || claimed.has(k)) continue;
      if (!seen.has(k)) seen.set(k, Date.now());
      if (Date.now() - seen.get(k) < DELAY) continue;
      claimed.add(k);
      const code = k.slice('garmin-code:'.length);
      const r = await client.post('/garmin/pair/claim', { code }, { deviceId: 'ext-sim-phone' });
      console.log(`[phone] claim ${code} → ${r.status} ${JSON.stringify(r.json)}`);
    }
  }, 2000);
  console.log(`READY on ${PORT}`);
}
