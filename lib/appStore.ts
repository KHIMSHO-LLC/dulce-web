/**
 * Single source of truth for the App Store listing + attribution.
 *
 * Dulce is live and free on the App Store, so every "get the app" surface links
 * here. The `campaign` value is written to the `ct` (campaign token) parameter,
 * which shows up in App Store Connect → App Analytics → Campaigns, letting us
 * see which web placement actually drives installs. `mt=8` marks the target as
 * an iOS app (Apple's convention on App Store links).
 */
export const APP_STORE_ID = "6770694596";

const APP_STORE_BASE = `https://apps.apple.com/app/id${APP_STORE_ID}`;

/** Known web placements — keep these stable so App Analytics campaigns stay comparable. */
export type StoreCampaign =
  | "web_header"
  | "web_hero"
  | "web_final"
  | "web_sticky"
  | "web_qr"
  | "web_page";

export function appStoreUrl(campaign?: StoreCampaign): string {
  const url = new URL(APP_STORE_BASE);
  url.searchParams.set("mt", "8");
  if (campaign) url.searchParams.set("ct", campaign);
  return url.toString();
}
