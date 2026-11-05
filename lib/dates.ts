import type { AppLocale } from "@/i18n/routing";

const MONTHS: Record<AppLocale, string[]> = {
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  it: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
  fi: ["tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta"],
  nl: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
  nb: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
  sv: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
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
  if (locale === "fr" || locale === "it" || locale === "nl") return `${d} ${month} ${y}`;
  if (locale === "fi" || locale === "nb") return `${d}. ${month} ${y}`;
  if (locale === "sv") return `${d} ${month} ${y}`;
  if (locale === "ru") return `${d} ${month} ${y} г.`;
  return `${d} de ${month} de ${y}`;
}
