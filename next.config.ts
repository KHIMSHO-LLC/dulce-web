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
 * Spanish words go to the Spanish home (/es), the rest to the English one (/).
 * Retired routes whose topic now has its own article redirect to that article
 * instead (content/redirects.ts).
 */
const retired: Array<{ source: string; destination: string }> = [
  { source: "/caracteristicas", destination: "/es" },
  { source: "/sobre", destination: "/es#founder" },
  { source: "/contacto", destination: "/es#contact" },
  { source: "/features", destination: "/" },
  { source: "/en/features", destination: "/" },
  { source: "/beta", destination: "/" },
  { source: "/en/beta", destination: "/" },
  { source: "/about", destination: "/#founder" },
  { source: "/en/about", destination: "/#founder" },
  { source: "/contact", destination: "/#contact" },
  { source: "/en/contact", destination: "/#contact" },
  { source: "/android", destination: "/#download" },
  { source: "/en/android", destination: "/#download" },
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
    const sections = retired.map((r) => ({ ...r, permanent: true }));
    const articles = ARTICLE_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
    // The share image moved from the opengraph-image file convention to /og/<locale>.png;
    // link previews scraped before 2026-10-28 still hold the old URLs. The root one was Spanish.
    const ogImages = [
      { source: "/opengraph-image", destination: "/og/es.png", permanent: true },
      { source: "/:locale(es|en|de|fr|it)/opengraph-image", destination: "/og/:locale.png", permanent: true },
    ];
    // English moved from /en to the root on 2026-11-03. The app (<= 1.0.6) links /en/legal/*.
    // Old Spanish root URLs are sent to /es by proxy.ts, which knows the per-language slugs.
    const englishRoot = [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
    return [...sections, ...articles, ...ogImages, ...englishRoot];
  },
};

export default withNextIntl(withMDX(nextConfig));
