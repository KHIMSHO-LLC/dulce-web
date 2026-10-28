import type { MetadataRoute } from "next";

/**
 * Answer engines and AI search crawlers, named so their access is explicit
 * (and survives anyone tightening the `*` rule later). Search engines read
 * the same rule set.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

/**
 * Not for the index: server endpoints and the partners admin. Invite links (/f/) stay
 * crawlable on purpose: they are noindex, and link-preview bots need to fetch them.
 */
const DISALLOW = ["/api/", "/partners"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: "https://dulceglucosa.com/sitemap.xml",
    host: "https://dulceglucosa.com",
  };
}
