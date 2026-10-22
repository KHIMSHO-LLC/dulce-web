/**
 * Single source of truth for the App Store listing + attribution.
 *
 * Dulce is live and free on the App Store, so every "get the app" surface links
 * here. `pt` is the provider token and the `campaign` value is written to the `ct` (campaign token) parameter,
 * which shows up in App Store Connect → App Analytics → Campaigns, letting us
 * see which web placement actually drives installs. `mt=8` marks the target as
 * an iOS app (Apple's convention on App Store links).
 */
export const APP_STORE_ID = "6770694596";
/** App Store Connect provider token. Campaigns only show in App Analytics when `pt` is set. */
export const APP_STORE_PROVIDER_TOKEN = "127601978";

const APP_STORE_BASE = `https://apps.apple.com/app/apple-store/id${APP_STORE_ID}`;

/** Known web placements — keep these stable so App Analytics campaigns stay comparable. */
export type StoreCampaign =
  | "web_header"
  | "web_hero"
  | "web_final"
  | "web_sticky"
  | "web_qr"
  | "web_page"
  | "web_tool"
  | "web_status"
  /** One campaign per article (`blog_<article id>`), so installs can be traced to the page. */
  | `blog_${string}`;

export function appStoreUrl(campaign?: StoreCampaign): string {
  const url = new URL(APP_STORE_BASE);
  url.searchParams.set("pt", APP_STORE_PROVIDER_TOKEN);
  // Apple caps campaign tokens at 40 characters.
  if (campaign) url.searchParams.set("ct", campaign.slice(0, 40));
  url.searchParams.set("mt", "8");
  return url.toString();
}
