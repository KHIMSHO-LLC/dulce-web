/**
 * The fixed field every section sits on: warm-black ground crossed by one
 * diagonal ember beam, a low wine counter-light, grain and a vignette. All layers
 * are fixed and pointer-transparent so scrolling never repaints them.
 */
// Warm-tinted noise (R > G > B) so grain never cools the blacks.
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 0.86 0 0 0 0 0.72 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Ember beam: one committed diagonal, the page's light source */}
      <div
        className="beam-drift absolute left-[34%] top-[-45%] h-[190%] w-[20%] origin-center blur-[56px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(243,102,56,0) 0%, rgba(243,102,56,0.26) 30%, rgba(255,140,90,0.46) 50%, rgba(194,65,12,0.3) 68%, rgba(243,102,56,0) 100%)",
          transform: "rotate(-32deg)",
        }}
      />
      {/* A low wine counter-light, kept warm */}
      <div
        className="absolute bottom-[-30%] right-[-15%] h-[70%] w-[55%] opacity-70 blur-[90px]"
        style={{ background: "radial-gradient(closest-side, rgba(122,30,48,0.3), rgba(122,30,48,0))" }}
      />
      {/* Vignette, warm black */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, rgba(13,12,11,0) 55%, rgba(7,5,4,0.8) 100%)" }}
      />
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-soft-light" style={{ backgroundImage: GRAIN }} />
    </div>
  );
}
