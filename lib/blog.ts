/**
 * Single source of truth for blog post metadata.
 *
 * The index page, each article header, and the JSON-LD structured data all read
 * from here, so a date or title is defined exactly once. Dates are real ISO
 * dates (not future-dated) — Google and readers both distrust posts dated in the
 * future.
 */
import type { AppLocale } from "@/i18n/routing";

export const SITE_URL = "https://dulceglucosa.com";
export const BLOG_AUTHOR = "Giorgio";

export type BlogSlug =
  | "how-to-see-cgm-glucose-on-apple-watch"
  | "time-in-range-vs-a1c"
  | "sharing-cgm-glucose-with-family";

type Localized = { es: string; en: string };

export type BlogPost = {
  slug: BlogSlug;
  /** Internal routing key consumed by next-intl <Link> + sitemap. */
  href: `/blog/${BlogSlug}`;
  datePublished: string; // YYYY-MM-DD
  dateModified: string; // YYYY-MM-DD
  readingMinutes: number;
  /** Absolute path to a representative image, used for OG + BlogPosting schema. */
  image: string;
  tag: Localized;
  title: Localized;
  description: Localized;
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "how-to-see-cgm-glucose-on-apple-watch",
    href: "/blog/how-to-see-cgm-glucose-on-apple-watch",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    readingMinutes: 5,
    image: "/screenshots/watch-1.png",
    tag: { es: "Guías", en: "Guides" },
    title: {
      es: "Cómo ver tu glucosa en el Apple Watch (y por qué la mayoría de apps fallan)",
      en: "How to see your CGM glucose on your Apple Watch (and why most apps fail at it)",
    },
    description: {
      es: "Consigue lecturas de FreeStyle Libre o Dexcom nativamente en tu muñeca sin retrasos.",
      en: "Getting FreeStyle Libre or Dexcom readings natively on your wrist without delays.",
    },
  },
  {
    slug: "time-in-range-vs-a1c",
    href: "/blog/time-in-range-vs-a1c",
    datePublished: "2026-07-12",
    dateModified: "2026-07-12",
    readingMinutes: 4,
    image: "/screenshots/home.png",
    tag: { es: "Salud", en: "Health" },
    title: {
      es: "Tiempo en Rango vs. A1C: Por qué los endocrinólogos cambian su enfoque",
      en: "Time in Range vs. A1C: Why endocrinologists are changing their focus",
    },
    description: {
      es: "Por qué el objetivo del 70-180 mg/dL importa más para el manejo diario que tu A1C.",
      en: "Why the 70-180 mg/dL target matters more for daily diabetes management than your quarterly A1C.",
    },
  },
  {
    slug: "sharing-cgm-glucose-with-family",
    href: "/blog/sharing-cgm-glucose-with-family",
    datePublished: "2026-07-16",
    dateModified: "2026-07-16",
    readingMinutes: 6,
    image: "/screenshots/followers.png",
    tag: { es: "Familia", en: "Family" },
    title: {
      es: "Compartir tu glucosa CGM con la familia sin la 'fatiga de alarmas'",
      en: "Sharing your CGM with family without the 'alert fatigue'",
    },
    description: {
      es: "Cómo dar tranquilidad a tus seres queridos sin abrumarlos con alarmas a las 3 AM.",
      en: "How to give your loved ones peace of mind without overwhelming them with alarms at 3 AM.",
    },
  },
] as const;

export function getPost(slug: BlogSlug): BlogPost {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown blog slug: ${slug}`);
  return post;
}

const MONTHS: Record<AppLocale, string[]> = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/**
 * Formats YYYY-MM-DD for display without relying on the runtime's locale
 * (which differs between server and client and causes hydration mismatches).
 */
export function formatBlogDate(iso: string, locale: AppLocale): string {
  const [y, m, d] = iso.split("-").map(Number);
  const month = MONTHS[locale][m - 1];
  return locale === "es" ? `${d} ${month} ${y}` : `${month} ${d}, ${y}`;
}
