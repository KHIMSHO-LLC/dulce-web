/**
 * The visitor's explicit language choice (set by the language switcher, read by
 * proxy.ts before the browser's languages). Listed in the cookie policy.
 */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function rememberLocale(locale: string): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
