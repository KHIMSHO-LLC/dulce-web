import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * The marketing site collapsed into one landing page. Every retired route
 * redirects permanently to the landing-page section that now carries its
 * content, so old links, bookmarks and search results keep landing somewhere
 * useful. Section ids are language-neutral (see lib/site.ts SECTION).
 */
const retired: Array<{ es: string[]; en: string[]; section?: string }> = [
  { es: ["/caracteristicas", "/features"], en: ["/en/features"] },
  { es: ["/beta"], en: ["/en/beta"] },
  { es: ["/apple-watch"], en: ["/en/apple-watch"], section: "apple-watch" },
  { es: ["/pantalla-de-bloqueo", "/lock-screen"], en: ["/en/lock-screen"], section: "lock-screen" },
  { es: ["/compartir-en-familia", "/family-sharing"], en: ["/en/family-sharing"], section: "family" },
  { es: ["/sobre", "/about"], en: ["/en/about"], section: "founder" },
  { es: ["/contacto", "/contact"], en: ["/en/contact"], section: "contact" },
  { es: ["/android"], en: ["/en/android"], section: "download" },
  { es: ["/blog", "/blog/:slug*"], en: ["/en/blog", "/en/blog/:slug*"] },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The Apple App Site Association is served by the route handler at
  // app/.well-known/apple-app-site-association/route.ts (it sets its own
  // application/json content-type). A public/.well-known dot-folder was not
  // reliably served by Next/Vercel, so don't depend on it.
  async redirects() {
    return retired.flatMap(({ es, en, section }) => {
      const hash = section ? `#${section}` : "";
      return [
        ...es.map((source) => ({ source, destination: `/${hash}`, permanent: true })),
        ...en.map((source) => ({ source, destination: `/en${hash}`, permanent: true })),
      ];
    });
  },
};

export default withNextIntl(nextConfig);
