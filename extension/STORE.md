# Chrome Web Store listing

Everything to paste into the Chrome Web Store developer dashboard. Wording follows the Dulce product rules: say plainly what it does, no treatment advice, no sensor brand names in the name, never "replaces your CGM's alarms".

## Package

```bash
cd extension && npm ci && npm run zip
```

This makes `dulce-chrome-<version>.zip` (production relay, minified). Raise `version` in `package.json` before each upload.

## Store listing tab

- **Name** (from the manifest, translated): Dulce: glucose on your toolbar
- **Summary** (from the manifest, 132 characters max): See the glucose reading from your Dulce app on the Chrome toolbar. Link it with a code from your phone. Needs Dulce Pro.
- **Category:** the closest health or lifestyle category the dashboard offers.
- **Language:** English (the extension also includes the other app languages).
- **Icon:** `icons/icon-128.png`
- **Screenshots (1280×800):** `store/screenshot-1-reading.png`, `store/screenshot-2-link.png`
- **Small promo tile (440×280):** `store/promo-small-440x280.png`
- **Homepage:** https://dulceglucosa.com/chrome
- **Support:** https://dulceglucosa.com/help

**Description:**

> Dulce for Chrome shows the glucose reading from the Dulce app on your Chrome toolbar. It is for people with diabetes who already use Dulce with a CGM (through LibreLinkUp, Dexcom, CareLink or Nightscout).
>
> • The current value on the toolbar icon, coloured by range (below 70, 70–180, above 180 mg/dL), grey when the reading is old.
> • Click for the trend arrow, the change, how old the reading is and a chart of the last 3, 6 or 12 hours.
> • mg/dL or mmol/L, as set in the app. If you follow family members in Dulce, pick who to show.
> • Updated every minute. Works in Chrome, Edge and Brave.
>
> How to link: click the extension. It shows a 6-character code and a QR code. In Dulce on your phone, go to Settings › Chrome on a computer and scan or type the code. No account and no sensor password in the browser. Remove the computer from the phone at any time.
>
> Needs Dulce Pro on the phone (or following someone who has it).
>
> The extension only displays readings. Alerts stay in the Dulce app on your phone. Dulce is not a medical device and does not replace your sensor's alarms.

## Privacy practices tab

- **Single purpose:** Show the glucose reading from the user's Dulce app on the browser toolbar.
- **Permission justifications:**
  - `alarms`: check for a new reading once a minute.
  - `storage`: keep this computer's link token and the last reading (shown while offline), in local extension storage only.
  - Host permission (`https://dulce-relay.giorgikhimshiashvili.workers.dev/*`): the Dulce server that hands out the link code and the latest reading. The only server the extension talks to.
- **Remote code:** No. All code is in the package.
- **Data usage. Collected:** Health information (glucose readings, shown to the user only). Nothing else: no personal identifiers, no location, no browsing activity, no authentication information (the link token is random and is not a user credential).
- **Certifications (all yes):** not sold to third parties; not used or transferred for purposes unrelated to the single purpose; not used to determine creditworthiness or for lending.
- **Privacy policy URL:** https://dulceglucosa.com/legal/privacy (section 2.10).

## Test instructions tab

Leave username and password empty (the extension has no login). Paste this in **Additional instructions**:

> Dulce for Chrome is a companion to the Dulce phone app ("Dulce" on the App Store and Google Play). It shows the glucose reading from the user's own Dulce app. It has no account or login of its own.
>
> 1. Click the Dulce icon on the toolbar. The popup shows a 6-character code and a QR code. This first screen works without a phone.
> 2. On a phone with Dulce Pro connected to a glucose sensor: Settings › Chrome on a computer → scan the QR code or type the code → Link computer.
> 3. Within a minute the toolbar icon shows the current reading (coloured by range, grey when old). Click it for the trend arrow, how old the reading is and a chart of the last 3, 6 or 12 hours.
> 4. To unlink: "Unlink this computer" in the popup, or Remove on the phone. The popup then shows a new code.
>
> Linking needs a phone with Dulce Pro and a real glucose sensor, so we can't give test credentials. The extension only talks to the Dulce server (dulce-relay.giorgikhimshiashvili.workers.dev) and only displays readings; alerts stay in the phone app. Questions: hola@dulceglucosa.com

## Submit for review

1. Check that every tab has no red warnings (Package, Store listing, Privacy, Distribution, Test instructions).
2. Click **Submit for review** (top right).
3. In the dialog, untick **Publish automatically after review** so we choose the launch day, then confirm. The status becomes "Pending review".
4. When it is approved, click **Publish**. Then set `CHROME_STORE_URL` and `CHROME_STORE_LIVE` in `lib/chrome.ts` so the `/chrome` page shows the store button.

The phone app with Settings › Chrome on a computer must be out (store build or OTA) before review, or a reviewer who installs Dulce can't find the screen.

## Distribution

- Visibility: Public. Regions: all.
- Brave uses the Chrome Web Store directly. For Edge, optionally upload the same zip to Microsoft Edge Add-ons (free).
