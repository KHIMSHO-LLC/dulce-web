import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/partners"],
      },
    ],
    sitemap: "https://dulceglucosa.com/sitemap.xml",
    host: "https://dulceglucosa.com",
  };
}
