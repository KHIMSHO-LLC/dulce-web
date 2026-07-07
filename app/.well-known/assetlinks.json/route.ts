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
 *   - PLACEHOLDER_PLAY_APP_SIGNING: replace with the "App signing key
 *     certificate — SHA-256" from Play Console → Setup → App signing after the
 *     first upload (Play re-signs release builds with its own key). Until then
 *     App Links won't verify for store builds — the dulce:// scheme fallback
 *     still works.
 *   - If EAS preview APKs (EAS-managed keystore) need to verify too, add the
 *     SHA-256 from `eas credentials -p android`.
 */
const FINGERPRINTS = [
  // Local debug keystore (dev machine)
  "05:58:10:E1:DF:A3:D4:E7:23:51:41:F9:46:F9:CF:7F:6D:40:E3:BB:6B:F2:89:CD:33:96:F3:55:BE:42:FE:23",
  // TODO(B0): Play App Signing key — replace after first Play Console upload.
  "PLACEHOLDER_PLAY_APP_SIGNING_SHA256",
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
