import type { AppLocale } from "@/i18n/routing";

const MONTHS: Record<AppLocale, string[]> = {
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
};

/**
 * Formats YYYY-MM-DD without the runtime's locale data (which differs between
 * server and client and causes hydration mismatches).
 */
export function formatDate(iso: string, locale: AppLocale): string {
  const [y, m, d] = iso.split("-").map(Number);
  const month = MONTHS[locale][m - 1];
  if (locale === "en") return `${month} ${d}, ${y}`;
  if (locale === "de") return `${d}. ${month} ${y}`;
  return `${d} de ${month} de ${y}`;
}
