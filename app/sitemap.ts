import type { MetadataRoute } from "next";
import { routing, type AppPathname } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;

/** The landing page plus the functional routes. Retired pages redirect. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = Object.keys(routing.pathnames) as AppPathname[];
  const now = new Date();
  return paths.map((internal) => ({
    url: url(localizedPath("es", internal)),
    lastModified: now,
    changeFrequency: internal.startsWith("/legal/") ? "yearly" : "monthly",
    priority: internal === "/" ? 1 : internal === "/setup" ? 0.6 : 0.3,
    alternates: {
      languages: {
        es: url(localizedPath("es", internal)),
        en: url(localizedPath("en", internal)),
      },
    },
  }));
}
