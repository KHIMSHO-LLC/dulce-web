/**
 * Retired marketing pages whose topic now has its own article. Each one had
 * search impressions, so it redirects permanently to the matching article
 * instead of the landing page. Kept free of app imports: next.config.ts loads it.
 */
export const ARTICLE_REDIRECTS: Array<{ source: string; destination: string }> = [
  { source: "/apple-watch", destination: "/blog/como-ver-glucosa-cgm-en-apple-watch" },
  { source: "/en/apple-watch", destination: "/en/blog/how-to-see-cgm-glucose-on-apple-watch" },
  { source: "/pantalla-de-bloqueo", destination: "/blog/glucosa-libre-en-pantalla-de-bloqueo-iphone" },
  { source: "/lock-screen", destination: "/blog/glucosa-libre-en-pantalla-de-bloqueo-iphone" },
  { source: "/en/lock-screen", destination: "/en/blog/libre-glucose-on-iphone-lock-screen" },
  { source: "/compartir-en-familia", destination: "/blog/compartir-glucosa-cgm-con-familia" },
  { source: "/family-sharing", destination: "/blog/compartir-glucosa-cgm-con-familia" },
  { source: "/en/family-sharing", destination: "/en/blog/sharing-cgm-glucose-with-family" },
];
