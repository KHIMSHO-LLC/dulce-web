/**
 * Apple App Site Association for Dulce universal links (follower invites,
 * /f/<code>). Served by a Route Handler — the Next 16 documented way to expose
 * `.well-known` files (see node_modules/next/dist/docs .../backend-for-frontend.md)
 * — rather than a public/.well-known dot-folder, which Next/Vercel did NOT serve
 * (the live file 404'd). The path contains a dot, so the next-intl proxy
 * (matcher excludes `.*\..*`) never locale-prefixes it.
 *
 * CRITICAL: Apple fetches this over HTTPS and does NOT follow redirects. It must
 * return 200 at the exact host in the app's `associatedDomains`. If that host
 * 308-redirects (e.g. apex dulceglucosa.com → www), universal links silently
 * fall back to opening Safari. Keep the associated domain and this 200 in sync.
 */
const AASA = {
  applinks: {
    details: [
      {
        appIDs: ["8Q48PVVWSP.com.dulceglucosa.app"],
        components: [
          {
            "/": "/f/*",
            comment: "Dulce follower invite links — open the app on /f/<code>",
          },
        ],
      },
    ],
  },
};

export function GET() {
  return new Response(JSON.stringify(AASA), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}
