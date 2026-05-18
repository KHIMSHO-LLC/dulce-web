import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";

export const alt = "Dulce — Your glucose, your family, your endo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy: Record<AppLocale, { eyebrow: string; headline: string; subline: string }> = {
  es: {
    eyebrow: "DULCE · DULCEGLUCOSA.COM",
    headline: "Hecho por un T1D,\npara T1Ds que hablan español.",
    subline: "Tu glucosa, tu familia, tu endocrino. Todo en un solo lugar.",
  },
  en: {
    eyebrow: "DULCE · DULCEGLUCOSA.COM",
    headline: "Made by a T1D,\nfor T1Ds who speak Spanish.",
    subline: "Your glucose, your family, your endo. All in one place.",
  },
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safe = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const c = copy[safe];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #FBF7F2 0%, #FFF1E5 60%, #FFE2CC 100%)",
          fontFamily: "system-ui, sans-serif",
          color: "#1A1A1A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "#C2410C",
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 36,
              fontWeight: 800,
              boxShadow: "0 12px 32px rgba(194,65,12,0.32)",
            }}
          >
            D
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.14em",
              color: "#7A6B5E",
              fontWeight: 600,
            }}
          >
            {c.eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
            }}
          >
            {c.headline}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.3,
              color: "#595959",
              maxWidth: 920,
            }}
          >
            {c.subline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              padding: "14px 24px",
              background: "#C2410C",
              color: "white",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              boxShadow: "0 10px 24px rgba(194,65,12,0.30)",
            }}
          >
            {safe === "es" ? "Únete a la lista de espera" : "Join the waitlist"}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  background:
                    i === 1 ? "#C2410C" : i === 2 ? "#C77700" : "#2E7D32",
                  opacity: i === 4 ? 0.3 : 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
