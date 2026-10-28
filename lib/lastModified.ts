import { execFileSync } from "node:child_process";

/**
 * When the source of a page last changed: the newest commit touching any of
 * `paths`. Runs at build time (sitemap). Undefined when git is unavailable, so
 * the sitemap leaves lastmod out rather than claiming "now" for every page.
 * On a shallow clone (Vercel) files older than the clone depth report the
 * oldest commit fetched, which is later than the truth but never in the future.
 */
export function lastModified(...paths: string[]): Date | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out ? new Date(out) : undefined;
  } catch {
    return undefined;
  }
}
