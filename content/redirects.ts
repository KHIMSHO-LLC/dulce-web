/**
 * Retired marketing pages whose topic now has its own article. Each one had
 * search impressions, so it redirects permanently to the matching article
 * instead of the landing page. Kept free of app imports: next.config.ts loads it.
 */
export const ARTICLE_REDIRECTS: Array<{ source: string; destination: string }> = [
  // English is at the root since 2026-11-03 (Spanish moved to /es): English words go to the
  // English article, Spanish words to the Spanish one.
  { source: "/apple-watch", destination: "/blog/how-to-see-cgm-glucose-on-apple-watch" },
  { source: "/en/apple-watch", destination: "/blog/how-to-see-cgm-glucose-on-apple-watch" },
  { source: "/pantalla-de-bloqueo", destination: "/es/blog/glucosa-libre-en-pantalla-de-bloqueo-iphone" },
  { source: "/lock-screen", destination: "/blog/libre-glucose-on-iphone-lock-screen" },
  { source: "/en/lock-screen", destination: "/blog/libre-glucose-on-iphone-lock-screen" },
  { source: "/compartir-en-familia", destination: "/es/blog/compartir-glucosa-cgm-con-familia" },
  { source: "/family-sharing", destination: "/blog/sharing-cgm-glucose-with-family" },
  { source: "/en/family-sharing", destination: "/blog/sharing-cgm-glucose-with-family" },
];
