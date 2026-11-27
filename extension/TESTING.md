# Test the extension with the app on the Android emulator

Everything runs on your computer: a local relay (dulce-relay `main`), a fake LibreLinkUp sensor, the Dulce development build on the emulator, and the extension in your own Chrome. Nothing touches the production relay or a real sensor account, and nothing is released. Checked end to end on 2026-11-27: link, value in Chrome, removed on the phone → badge cleared in 56 s.

You need checkouts of `dulce-app`, `dulce-relay` and `dulce-web` next to each other, all on an up-to-date `main`. You also need the Dulce development build on the emulator (`Dulce_Phone_17`).

## 1. One-time setup

```bash
cd dulce-relay && npm ci
cd ../dulce-web/extension && npm ci
```

## 2. Start the local relay and fake sensor (terminal 1)

```bash
cd dulce-web/extension
node --no-warnings scripts/sim-relay.mjs --app
```

Wait for `READY`. It prints the fake sensor login (`test@dulce.local` / `Dulce-test-1`) and the commands below. Keep it running.

## 3. Start the emulator and connect its ports (terminal 2)

Start `Dulce_Phone_17` from Android Studio, or run `emulator -avd Dulce_Phone_17`. Then:

```bash
adb reverse tcp:8081 tcp:8081 && adb reverse tcp:8799 tcp:8799 && adb reverse tcp:9101 tcp:9101
adb shell pm clear com.dulceglucosa.app
```

`pm clear` gives the app a fresh start on the emulator. It only wipes the emulator's Dulce data; sign in with your own account again later if you want.

## 4. Start the app in test mode (terminal 2, in `dulce-app`)

Set the two `.env` files aside first. A development bundle takes their production relay address over the settings below, and test mode then blocks it, so the app would talk to no relay at all.

```bash
cd dulce-app
mv .env.local .env.local.off && mv .env.development.local .env.development.local.off
EXPO_PUBLIC_E2E=1 EXPO_PUBLIC_E2E_TIER=paid EXPO_PUBLIC_E2E_SKIP_POPUPS=1 EXPO_PUBLIC_E2E_LIBRE_URL=http://127.0.0.1:9101 EXPO_PUBLIC_RELAY_BASE_URL=http://localhost:8799 EXPO_PUBLIC_RELAY_AUTH_SECRET=dulce-local-test-secret npx expo start --dev-client --clear
```

Open Dulce on the emulator (it connects to the dev server), or press `a` in this terminal.

These test settings only work in a development build, and they only accept addresses on this computer. `EXPO_PUBLIC_E2E_TIER=paid` makes the app count as Dulce Pro without paying.

## 5. Sign in to the fake sensor (emulator)

1. The app opens on "Connect your CGM account" with LibreLinkUp chosen.
2. **Clear both boxes first.** Android may auto-fill your real LibreLinkUp email and password. Only the fake sensor on this computer would receive them, but don't use them.
3. Type `test@dulce.local` and `Dulce-test-1`, then tap **Connect**. You should see "All set, Fake" and a reading.
4. Continue through the alerts step (you can tap "Don't allow" for notifications).

## 6. Add the extension to your Chrome

```bash
cd dulce-web/extension && npm run build:local
```

1. In Chrome, open `chrome://extensions` and turn on **Developer mode** (top right).
2. Click **Load unpacked** and pick `dulce-web/extension/dist`. The name ends with "(local)".
3. Pin it: click the puzzle icon in the toolbar, then the pin next to Dulce.
4. Click the Dulce icon. It shows a 6-letter code and a QR code.

## 7. Link (emulator)

1. In Dulce: **Settings › Chrome on a computer**.
2. Type the code, tap **Link computer**, then **Link computer** again in the confirmation.
3. You see "Computer linked". Within a minute, Chrome's toolbar shows the number, and the popup shows the arrow, the age and the chart.
4. The computer appears under "Linked computers" on the phone.

The fake sensor's values climb and drop as a saw-tooth; that's the fake, not a bug.

## 8. Try the rest

- **Remove on the phone:** tap the computer in the list, then **Remove**. The badge clears within a minute and the popup shows a new code.
- **Unlink in Chrome:** the popup's "Unlink this computer" (click twice).
- **Old reading:** stop the relay (Ctrl+C in terminal 1). The badge turns grey after about 6 minutes, and the popup says it can't reach Dulce.
- **mmol/L:** in Dulce, Settings › Targets & units. Chrome follows once the app next syncs with the relay (I didn't time this one).

## 9. Clean up

```bash
cd dulce-app && mv .env.local.off .env.local && mv .env.development.local.off .env.development.local
adb reverse --remove-all
```

- Stop terminals 1 and 2 (Ctrl+C).
- Remove "Dulce (local)" in `chrome://extensions`.
- On the emulator, sign out of the fake account (or run `pm clear` again) before using your real account.

**Don't skip putting the `.env` files back.** Without them, your normal development runs have no relay.
