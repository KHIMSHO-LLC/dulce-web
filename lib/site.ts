import { defaultLocale, type AppLocale } from "@/i18n/routing";

export const SITE_URL = "https://dulceglucosa.com";
export const CONTACT_EMAIL = "hola@dulceglucosa.com";

/** The brand's own social profiles (footer, Organization sameAs). */
export const SOCIAL = [
  { name: "Instagram", url: "https://www.instagram.com/dulce_glucosa" },
  { name: "TikTok", url: "https://www.tiktok.com/@dulce.glucose.tra" },
  { name: "YouTube", url: "https://www.youtube.com/@DULCEGLUCOSE" },
] as const;

/** Homepage walkthrough video on our YouTube channel ("Dulce: Your Glucose, at a Glance"). */
export const YOUTUBE_DEMO_ID = "yFOrkOwrFXE";

/**
 * Section anchors on the landing page. Language-neutral on purpose: the
 * redirects from the retired marketing routes (next.config.ts) point at these,
 * and the same id has to work under `/`, `/es` and `/de`.
 */
export const SECTION = {
  top: "top",
  lockScreen: "lock-screen",
  alerts: "alerts",
  standby: "standby",
  watch: "apple-watch",
  family: "family",
  day: "your-day",
  more: "more",
  video: "video",
  founder: "founder",
  plans: "free-vs-pro",
  faq: "faq",
  contact: "contact",
  download: "download",
} as const;

/** Public URL of a localized internal path, honouring the default-locale-at-root convention. */
export function localeUrl(locale: AppLocale, path: string = "/"): string {
  const clean = path === "/" ? "" : path;
  return locale === defaultLocale ? `${SITE_URL}${clean}` || SITE_URL : `${SITE_URL}/${locale}${clean}`;
}

/** Landing-page section link for a locale (`/#id`, `/es#id`, `/de#id`). */
export function homeSection(locale: AppLocale, id: string): string {
  return locale === defaultLocale ? `/#${id}` : `/${locale}#${id}`;
}
