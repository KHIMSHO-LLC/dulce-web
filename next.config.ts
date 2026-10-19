import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import { ARTICLE_REDIRECTS } from "./content/redirects";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Articles are MDX files in content/articles, loaded by app/[locale]/blog/[slug].
// Plugins are passed by name so they work under Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

/**
 * The marketing story collapsed into one landing page. Every retired route
 * redirects permanently to the landing-page section that now carries its
 * content, so old links, bookmarks and search results keep landing somewhere
 * useful. Section ids are language-neutral (see lib/site.ts SECTION).
 * Retired routes whose topic now has its own article redirect to that article
 * instead (content/redirects.ts).
 */
const retired: Array<{ es: string[]; en: string[]; section?: string }> = [
  { es: ["/caracteristicas", "/features"], en: ["/en/features"] },
  { es: ["/beta"], en: ["/en/beta"] },
  { es: ["/sobre", "/about"], en: ["/en/about"], section: "founder" },
  { es: ["/contacto", "/contact"], en: ["/en/contact"], section: "contact" },
  { es: ["/android"], en: ["/en/android"], section: "download" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The Apple App Site Association is served by the route handler at
  // app/.well-known/apple-app-site-association/route.ts (it sets its own
  // application/json content-type). A public/.well-known dot-folder was not
  // reliably served by Next/Vercel, so don't depend on it.
  async redirects() {
    const sections = retired.flatMap(({ es, en, section }) => {
      const hash = section ? `#${section}` : "";
      return [
        ...es.map((source) => ({ source, destination: `/${hash}`, permanent: true })),
        ...en.map((source) => ({ source, destination: `/en${hash}`, permanent: true })),
      ];
    });
    const articles = ARTICLE_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
    return [...sections, ...articles];
  },
};

export default withNextIntl(withMDX(nextConfig));
