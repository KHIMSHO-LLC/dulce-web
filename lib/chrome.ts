/**
 * Dulce for Chrome (the extension in `extension/`): the Chrome Web Store
 * listing and the popup screenshots in `public/guides/chrome/` (the real
 * popup with sample data). Copy lives in messages `chrome`.
 */

/** Chrome Web Store listing. Fill in the listing URL when it is published. */
export const CHROME_STORE_URL = "";
/** Set to true when the listing is live; until then the page shows "coming soon" and no link. */
export const CHROME_STORE_LIVE = false;

export type ChromeShot = { src: string; width: number; height: number };

export const CHROME_SHOTS = {
  reading: { src: "/guides/chrome/popup-reading.webp", width: 960, height: 1029 },
  link: { src: "/guides/chrome/popup-link.webp", width: 960, height: 1296 },
} satisfies Record<string, ChromeShot>;
