import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 renamed `middleware.ts` to `proxy.ts`.
 * next-intl's createMiddleware works unchanged — the file convention is what moved.
 */
export default createMiddleware(routing);

export const config = {
  // Match all routes except: static files, internal assets, API routes that
  // don't need locale rewriting (the legal forms are Server Actions, not API
  // routes), and /partners (non-localized internal dashboard with its own
  // root layout — must never get locale-prefix rewriting).
  matcher: [
    "/((?!api|_next|_vercel|partners|.*\\..*).*)",
  ],
};
