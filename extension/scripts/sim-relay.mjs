// A local relay for trying the extension, like `npm run sim:garmin` in
// dulce-relay: the relay of a dulce-relay checkout on 127.0.0.1:8799, one fake
// Pro phone on a fake Libre sensor, and the phone claims every link code
// (after CLAIM_DELAY_MS, default 8 s, so the code screen can be seen).
// POST /__unlink removes every link (= "Remove" on the phone).
//
//   DULCE_RELAY=../../dulce-relay node scripts/sim-relay.mjs [--mmol]
// (run `npm ci` in dulce-relay first; nothing here touches a real relay).
import http from 'node:http';
import { resolve } from 'node:path';
const F = resolve(process.env.DULCE_RELAY ?? '../../dulce-relay', 'scripts/fakes');
const { register, sensor, world } = await import(`file://${F}/world.mjs`);
const { makeClient } = await import(`file://${F}/client.mjs`);
const PORT = 8799, MIN = 60_000;
const mmol = process.argv.includes('--mmol');
const W = await world({ flags: {}, name: 'sim-ext', t0: Date.now() });
await W.relay.setClock({ offsetMs: 0 });
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
const server = http.createServer(async (req, res) => {
  if (req.url === '/__unlink') {
    const r = await client.post('/garmin/unlink', { all: true }, { deviceId: 'ext-sim-phone' });
    console.log(`[phone] unlink all → ${JSON.stringify(r.json)}`);
    res.end(JSON.stringify(r.json)); return;
  }
  const chunks = []; for await (const c of req) chunks.push(c);
  try {
    const r = await fetch(`${W.relay.url}${req.url}`, { method: req.method, headers: { 'content-type': 'application/json', 'cf-connecting-ip': '127.0.0.1' }, body: req.method === 'GET' ? undefined : Buffer.concat(chunks) });
    const text = await r.text();
    console.log(`[ext] ${req.method} ${req.url} ${chunks.length ? Buffer.concat(chunks).toString().replace(/"token":"[0-9a-f]+"/, '"token":"…"') : ''} → ${r.status} ${text.slice(0, 140)}`);
    res.writeHead(r.status, { 'content-type': 'application/json' }); res.end(text);
  } catch (e) { res.writeHead(502); res.end(String(e)); }
});
server.listen(PORT, '127.0.0.1', () => console.log(`READY on ${PORT}`));
setInterval(async () => {
  const kv = await W.relay.kvDump();
  for (const k of Object.keys(kv)) if (k.startsWith('garmin-code:') && !claimed.has(k)) {
    if (!seen.has(k)) seen.set(k, Date.now());
    if (Date.now() - seen.get(k) < DELAY) continue;
    claimed.add(k);
    const code = k.slice('garmin-code:'.length);
    const r = await client.post('/garmin/pair/claim', { code }, { deviceId: 'ext-sim-phone' });
    console.log(`[phone] claim ${code} → ${r.status} ${JSON.stringify(r.json)}`);
  }
}, 2000);
setInterval(() => W.relay.tick().catch((e) => console.log('[tick]', e.message)), MIN);
