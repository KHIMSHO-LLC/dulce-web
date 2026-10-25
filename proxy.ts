import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { REGION_COOKIE } from "./lib/consent";

/**
 * Next.js 16 renamed `middleware.ts` to `proxy.ts`.
 * next-intl's createMiddleware works unchanged — the file convention is what moved.
 */
const intl = createMiddleware(routing);

/**
 * Also hands the visitor's country (Vercel's geo header) to the client in a
 * session cookie, so the analytics banner is only shown where the law asks for
 * consent (see `consentRequired` in lib/consent.ts).
 */
export default function proxy(request: NextRequest) {
  const response = intl(request);
  const country = request.headers.get("x-vercel-ip-country") ?? "";
  if (request.cookies.get(REGION_COOKIE)?.value !== country) {
    response.cookies.set(REGION_COOKIE, country, { path: "/", sameSite: "lax" });
  }
  return response;
}

export const config = {
  // Match all routes except: static files, internal assets, API routes that
  // don't need locale rewriting (the legal forms are Server Actions, not API
  // routes), and /partners (non-localized internal dashboard with its own
  // root layout — must never get locale-prefix rewriting).
  matcher: [
    "/((?!api|_next|_vercel|partners|.*\\..*).*)",
  ],
};
