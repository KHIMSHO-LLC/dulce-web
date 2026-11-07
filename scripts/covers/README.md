# Blog covers

Rules (what a cover may show, the two styles, what the owner rejected): `content/README.md` → "Images".

## Designed cover (default)

1. Add an entry to `T` in `cover.html`: `k` kicker, `h` headline (one `<span>` word turns orange), `s` subline,
   `dev` the visual: `ph(img,x,y,width,rotate)` iPhone frame, `wt(...)` Apple Watch frame,
   `crop(src,srcWidth,[x,y,w,h,radius],x,y,scale,rotate)` a piece of a screenshot, or a `.card` with `.row`s/`.chip`s.
   Screens come from `assets/` (real Dulce screenshots, 923 px wide; Watch 410 px).
2. `node scripts/covers/render.mjs <variant> --out /tmp/covers` and look at the result.
3. Convert to webp into `public/guides/covers/<article id>.webp` (quality ~84), then set `image` and `imageAlt`
   (every language the article has) in `content/articles.ts`.

Variants so far: watch, lock, widgets, llu, libreview, bsl, health, night, pet.

## Photo cover

`python3 scripts/covers/photo_screen.py photo.jpg assets/<screen>.png out.jpg TL TR BR BL [--white] [--skin]`
puts a real screenshot on a phone/watch screen in a photo (corners `x,y` of the visible glass, clockwise).
Needs `opencv-python-headless` and `numpy` (use a venv). Photos must be free-license (Unsplash License);
note the photo id in the commit message. Example: family-sharing = photo-1677161842229-0b8324c1e461 with `5.png`.

## Setup

- `npm install` gives `puppeteer-core`; it drives the local Google Chrome (`CHROME_PATH` to override).
- `frames/` (Apple device frames) is gitignored: Apple Design Resources can't be redistributed and this repo is
  public. `render.mjs` copies them from `DULCE/app-store-assets/_source/screens/` on the owner's Mac.
