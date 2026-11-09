// Renders help-page images: app screenshots inside Apple Watch Ultra / iPhone frames.
// Run from dulce-web: WEB=$PWD DULCE=.. node scripts/help-images.cjs (needs the dulce-marketing repo next to it).
const path = require('path');
const sharp = require(path.join(process.env.WEB, 'node_modules/sharp'));
const D = process.env.DULCE;
const OUT = path.join(process.env.WEB, 'public/help');
const WATCH = `${D}/dulce-marketing/social/facebook/cover-source/bz-watch2.png`; // orange band Ultra
const PHONE = `${D}/dulce-marketing/store/app-store-assets/_source/screens/bz-iphone.png`;

const mask = (w, h, rx, ry) =>
  Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${rx}" ry="${ry}" fill="#fff"/></svg>`);

async function framed({ frame, fw, fh, box, src, out, prep, outW }) {
  const [x, y, w, h, rx, ry] = box;
  let img = sharp(src);
  if (prep) img = await prep(img);
  const screen = await img
    .resize(w, h, { fit: 'cover', position: 'top' })
    .composite([{ input: mask(w, h, rx, ry), blend: 'dest-in' }])
    .png()
    .toBuffer();
  const base = sharp({ create: { width: fw, height: fh, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: screen, left: x, top: y }, { input: frame, left: 0, top: 0 }])
    .png();
  const buf = await base.toBuffer();
  await sharp(buf).resize({ width: outW }).webp({ quality: 88, alphaQuality: 90 }).toFile(`${OUT}/${out}`);
  const m = await sharp(`${OUT}/${out}`).metadata();
  console.log(out, m.width, m.height);
}

(async () => {
  require('fs').mkdirSync(OUT, { recursive: true });
  // Watch screen box: left 15.97%, top 22.66%, 68.06% x 54.68% of 620x940, radius 21%/17.5%.
  const wbox = [99, 213, 422, 514, 89, 90];
  const watch = (src, out) => framed({ frame: WATCH, fw: 620, fh: 940, box: wbox, src, out, outW: 620 });
  await watch(`${D}/dulce-marketing/brand/app-images/paywall/watch-stack.jpg`, 'watch-complication.webp');
  await watch(`${D}/dulce-marketing/screenshots/watch/03-smart-stack-113-green.png`, 'watch-smart-stack.webp');
  await watch(`${D}/dulce-marketing/brand/app-images/paywall/watch-app.jpg`, 'watch-app.webp');

  // iPhone screen box: left 5.333%, top 2.5%, 89.333% x 95% of 1350x2760, radius 13.5%/6.2%.
  const pbox = [72, 69, 1206, 2622, 163, 163];
  const phone = (src, out, prep) => framed({ frame: PHONE, fw: 1350, fh: 2760, box: pbox, src, out, prep, outW: 700 });
  // Lock screen: paint over the carrier name in the status bar.
  await phone(`${D}/dulce-marketing/screenshots/lock-screen/06-105-in-range-green.png`, 'iphone-lock-screen.webp', async (img) =>
    sharp(await img.composite([{ input: Buffer.from('<svg width="200" height="70"><rect width="200" height="70" fill="#000"/></svg>'), left: 90, top: 35 }]).png().toBuffer()));
  await phone(`${D}/dulce-marketing/screenshots/walkthrough/17-alerts.png`, 'iphone-alerts.webp');

  // Family: a cropped app screen, no frame.
  await sharp(`${D}/dulce-marketing/brand/app-images/paywall/family.jpg`).webp({ quality: 88 }).toFile(`${OUT}/family-followers.webp`);
  console.log('family-followers.webp');
})();
