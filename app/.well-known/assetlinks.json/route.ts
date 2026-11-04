/**
 * Android App Links digital asset links for Dulce (follower invites, /f/<code>)
 * — the Android counterpart of the AASA route next to this one. Served by a
 * Route Handler for the same reason (public/.well-known dot-folders are not
 * served; the dotted path also dodges the next-intl locale proxy).
 *
 * Android verifies the app's SIGNING certificate against these fingerprints at
 * install time (`android:autoVerify` intent filter in dulce-app app.json). Any
 * build signed by a listed cert may handle https://dulceglucosa.com/f/* links.
 *
 * Fingerprints:
 *   - debug: the local ~/.android/debug.keystore on the dev machine, so
 *     emulator debug builds verify during development.
 *   - Play App Signing key: Play Console → App integrity → App signing →
 *     "App signing key certificate". Play re-signs every store build with it.
 *     If the key is ever rotated, add the new one and keep the old one while
 *     installs signed with it remain.
 *   - EAS upload key: signs builds installed straight from EAS (preview APKs,
 *     local release builds), which Play doesn't re-sign.
 */
const FINGERPRINTS = [
  // Local debug keystore (dev machine)
  "05:58:10:E1:DF:A3:D4:E7:23:51:41:F9:46:F9:CF:7F:6D:40:E3:BB:6B:F2:89:CD:33:96:F3:55:BE:42:FE:23",
  // Play App Signing key (store builds)
  "BC:DA:F0:9A:82:79:8C:9B:57:B1:ED:F9:BE:8E:63:23:E6:66:F9:5A:AB:D9:94:D0:13:2B:45:FA:72:5E:72:69",
  // EAS upload key (builds installed from EAS)
  "21:63:FF:C6:04:20:5C:CF:7D:EB:4D:3C:1E:06:2E:42:C3:9F:5D:79:77:F2:D6:C4:30:0D:8C:A1:39:3B:54:1D",
];

const ASSET_LINKS = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "com.dulceglucosa.app",
      sha256_cert_fingerprints: FINGERPRINTS,
    },
  },
];

export function GET() {
  return new Response(JSON.stringify(ASSET_LINKS), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}
