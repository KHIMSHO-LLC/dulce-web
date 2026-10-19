// One-off asset generator: writes public/appstore-qr.svg pointing at the live
// App Store listing (provider token + the web_qr attribution campaign). Re-run with:
//   node scripts/gen-qr.mjs
// Requires the `qrcode` dev dependency. The output SVG is committed, so the site
// ships zero runtime QR dependency.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import QRCode from "qrcode";

const APP_STORE_ID = "6770694596";
const target = `https://apps.apple.com/app/apple-store/id${APP_STORE_ID}?pt=127601978&ct=web_qr&mt=8`;

const svg = await QRCode.toString(target, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 0,
  color: { dark: "#1c1917", light: "#00000000" },
});

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "appstore-qr.svg");
writeFileSync(out, svg);
console.log("Wrote", out, "→", target);
