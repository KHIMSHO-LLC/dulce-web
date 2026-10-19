import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";

export const alt = "Dulce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy: Record<AppLocale, { line1: string; line2: string; sub: string }> = {
  es: {
    line1: "Tu glucosa,",
    line2: "siempre a la vista.",
    sub: "Pantalla de bloqueo, Apple Watch y el móvil de tu familia.",
  },
  en: {
    line1: "Your glucose,",
    line2: "always in sight.",
    sub: "Lock Screen, Apple Watch and your family's phone.",
  },
  de: {
    line1: "Dein Zucker,",
    line2: "immer im Blick.",
    sub: "Sperrbildschirm, Apple Watch und das Handy deiner Familie.",
  },
};

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safe = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const c = copy[safe];
  const drop = await readFile(join(process.cwd(), "public/brand/dulce-drop.png"));
  const dropSrc = `data:image/png;base64,${drop.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(115deg, #0d0c0b 0%, #0d0c0b 38%, #4a1d10 52%, #f36638 60%, #4a1d10 68%, #0d0c0b 82%)",
          color: "#f6f0ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={dropSrc} width={42} height={56} alt="" />
          <div style={{ fontSize: 40, letterSpacing: -1 }}>dulce</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 300, letterSpacing: -4, lineHeight: 1 }}>{c.line1}</div>
          <div style={{ fontSize: 96, fontWeight: 300, letterSpacing: -4, lineHeight: 1 }}>{c.line2}</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#cfc6bd" }}>{c.sub}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
