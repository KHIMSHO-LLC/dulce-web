import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { AdminGate } from "./AdminGate";

/**
 * Standalone root layout for /partners. This route lives OUTSIDE
 * app/[locale] on purpose (internal tool, not part of the localized
 * marketing site — see app/partners/page.tsx header comment), so it does
 * not share app/[locale]/layout.tsx and must provide its own <html>/<body>
 * (mirrors the pattern already used by app/not-found.tsx).
 */

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dulce admin",
  // Internal-only page — never indexed, never followed. app/robots.ts also
  // disallows /partners explicitly as a second line of defense.
  robots: { index: false, follow: false, nocache: true },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${nunito.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground" suppressHydrationWarning>
        {/* One login + one nav shared by every tab in this route group. */}
        <AdminGate>{children}</AdminGate>
      </body>
    </html>
  );
}
