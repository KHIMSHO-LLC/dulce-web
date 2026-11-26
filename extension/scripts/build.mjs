// Builds the extension into dist/ (load it in chrome://extensions with
// "Load unpacked").
//   node scripts/build.mjs [--relay production|staging|local] [--zip]
// production (default) = the live relay; staging = the staging relay;
// local = `npm run sim:garmin` in dulce-relay (http://127.0.0.1:8799).
// --zip also writes dulce-chrome-<version>.zip for the Chrome Web Store
// (production only).
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const relayArg = args.includes('--relay') ? args[args.indexOf('--relay') + 1] : 'production';
const RELAYS = {
  production: 'https://dulce-relay.giorgikhimshiashvili.workers.dev',
  staging: 'https://dulce-relay-staging.giorgikhimshiashvili.workers.dev',
  local: 'http://127.0.0.1:8799',
};
const relay = RELAYS[relayArg];
if (!relay) throw new Error(`--relay must be one of ${Object.keys(RELAYS).join(', ')}`);
const zip = args.includes('--zip');
if (zip && relayArg !== 'production') throw new Error('--zip is for the production build only');

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

await build({
  entryPoints: { background: join(root, 'src/background.ts'), popup: join(root, 'src/popup/popup.ts') },
  outdir: dist,
  bundle: true,
  format: 'esm',
  target: 'chrome116',
  minify: zip,
  define: { __RELAY_URL__: JSON.stringify(relay) },
  logLevel: 'warning',
});

cpSync(join(root, 'src/popup/popup.html'), join(dist, 'popup.html'));
cpSync(join(root, 'src/popup/popup.css'), join(dist, 'popup.css'));
cpSync(join(root, 'icons'), join(dist, 'icons'), { recursive: true });

// Locales: locales/<chrome-locale>.json is a flat { key: text } map; Chrome
// wants _locales/<locale>/messages.json with { key: { message } }.
for (const file of readdirSync(join(root, 'locales')).filter((f) => f.endsWith('.json'))) {
  const flat = JSON.parse(readFileSync(join(root, 'locales', file), 'utf8'));
  const messages = Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, { message: v }]));
  const dir = join(dist, '_locales', file.replace(/\.json$/, ''));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'messages.json'), JSON.stringify(messages, null, 2));
}

const manifest = {
  manifest_version: 3,
  name: relayArg === 'production' ? '__MSG_extName__' : `__MSG_extName__ (${relayArg})`,
  short_name: 'Dulce',
  description: '__MSG_extDescription__',
  version: pkg.version,
  default_locale: 'en',
  minimum_chrome_version: '116',
  icons: { 16: 'icons/icon-16.png', 32: 'icons/icon-32.png', 48: 'icons/icon-48.png', 128: 'icons/icon-128.png' },
  action: {
    default_popup: 'popup.html',
    default_title: 'Dulce',
    default_icon: { 16: 'icons/icon-16.png', 32: 'icons/icon-32.png' },
  },
  background: { service_worker: 'background.js', type: 'module' },
  // Only these two: a timer and local storage. No tabs, no page access.
  permissions: ['alarms', 'storage'],
  host_permissions: [`${relay}/*`],
};
writeFileSync(join(dist, 'manifest.json'), JSON.stringify(manifest, null, 2));

if (zip) {
  const out = join(root, `dulce-chrome-${pkg.version}.zip`);
  rmSync(out, { force: true });
  execFileSync('zip', ['-r', '-q', '-X', out, '.'], { cwd: dist });
  console.log(`wrote ${out}`);
}
console.log(`built dist/ for ${relayArg} (${relay})`);
