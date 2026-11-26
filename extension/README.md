# Dulce for Chrome

A Chrome extension (Manifest V3) that shows the glucose reading from the Dulce app on the browser toolbar. It works in Chrome, Edge and Brave. Issue: KHIMSHO-LLC/dulce-web#18.

It only shows readings. Alerts stay in the phone app.

## How it works

1. The popup asks the relay for a link code (`POST /garmin/pair/start`, `kind: "browser"`). It gets back a 6-letter code, a QR and a secret token. The token is kept in `chrome.storage.local` on this computer only.
2. The user claims the code in the Dulce app (Settings › Linked screens), by scanning the QR (`dulce://g/<code>`) or typing it. This is Pro only, and the relay checks it.
3. Once a minute, the background worker calls `POST /garmin/latest` with the token and sets the badge: the value, coloured by zone. The badge turns grey when the reading is old: after 2 × the sensor interval + 4 min, the same rule as the app.
4. "Remove" on the phone makes the relay answer 401, and the extension forgets the token within a minute.

These are the same link routes as the Garmin watch (dulce-relay `src/routes/garmin.ts`).

- **No accounts:** there is no sensor login and no account in the extension.
- **Permissions:** only `alarms` and `storage`, plus host access to the relay. It has no content scripts and no tab access.
- **Secrets:** this repo is public. The extension holds no secret, because each computer gets its own token when it links. Never add one.

## Files

| File | What |
|---|---|
| `src/background.ts` | Service worker: minute alarm, fetch, badge, tooltip. The only writer of link state. |
| `src/popup/` | Popup: code + QR, value, arrow, age, chart, person picker, unlink. |
| `src/lib/relay.ts` | The two relay calls. |
| `src/lib/display.ts` | What to show: units, zones, old-reading rule, badge (pure). |
| `src/lib/sync.ts` | What a relay answer changes in storage (pure). |
| `src/lib/chart.ts`, `chartGaps.ts` | Chart SVG; the app's one gap rule (copied with its tests). |
| `locales/<locale>.json` | Texts, flat `{ key: text }`. The build turns them into `_locales/`. Same languages as the app. |
| `scripts/build.mjs` | Builds `dist/` (and the store zip). |
| `scripts/sim-relay.mjs`, `scripts/e2e.mjs` | Local relay with a fake Pro phone, and the end-to-end check. |

## Build and try it

```bash
cd extension
npm ci
npm test            # unit tests
npm run typecheck
npm run build       # production relay → dist/
```

To try it, open `chrome://extensions`, turn on Developer mode, click **Load unpacked** and pick `extension/dist`.

Other builds:
- `npm run build:staging` builds against the staging relay. Its name says "(staging)".
- `npm run build:local` builds against `scripts/sim-relay.mjs`.

### End-to-end check (local, nothing real touched)

```bash
# terminal 1: needs a dulce-relay checkout next to dulce-web, with `npm ci` done there
node --no-warnings scripts/sim-relay.mjs        # add --mmol for a phone in mmol/L
# terminal 2
npm run build:local && node scripts/e2e.mjs
```

This starts Chrome with a throwaway profile and the extension loaded. It checks that:
- the popup shows a code;
- after the fake phone claims it, the value is on the badge;
- after "Remove" on the phone, the badge clears within a minute;
- the popup then shows a new code.

Screenshots go to `e2e-out/`. Set `CHROME_LANG=de` to run it in another language.

## Publishing

`npm run zip` writes `dulce-chrome-<version>.zip` (production relay, minified) for the Chrome Web Store. Raise `version` in `package.json` for each upload. Store text and the privacy form follow dulce-app `docs/product-and-wording-rules.md`. The plan is in dulce-app `docs/chrome-extension-plan.md`.
