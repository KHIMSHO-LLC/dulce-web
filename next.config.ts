import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The Apple App Site Association is served by the route handler at
  // app/.well-known/apple-app-site-association/route.ts (it sets its own
  // application/json content-type). A public/.well-known dot-folder was not
  // reliably served by Next/Vercel, so don't depend on it.
};

export default withNextIntl(nextConfig);
