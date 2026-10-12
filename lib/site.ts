import type { AppLocale } from "@/i18n/routing";

export const SITE_URL = "https://dulceglucosa.com";
export const CONTACT_EMAIL = "hola@dulceglucosa.com";

/**
 * Section anchors on the landing page. Language-neutral on purpose: the
 * redirects from the retired marketing routes (next.config.ts) point at these,
 * and the same id has to work under `/` and `/en`.
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
  founder: "founder",
  faq: "faq",
  contact: "contact",
  download: "download",
} as const;

/** Public URL of a localized internal path, honouring the es-at-root convention. */
export function localeUrl(locale: AppLocale, path: string = "/"): string {
  const clean = path === "/" ? "" : path;
  return locale === "es" ? `${SITE_URL}${clean}` || SITE_URL : `${SITE_URL}/en${clean}`;
}
