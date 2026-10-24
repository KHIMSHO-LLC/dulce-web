import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Atmosphere } from "@/components/site/Atmosphere";
import { PillNav } from "@/components/site/PillNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { routing, type AppLocale } from "@/i18n/routing";
import { APP_STORE_ID } from "@/lib/appStore";
import { SITE_URL } from "@/lib/site";
import { OG_LOCALE } from "@/lib/seo";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0d0c0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "metadata" });

  // No `alternates` here on purpose: each page sets its own canonical
  // (lib/seo.ts), otherwise every route inherits the home page's.
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("defaultTitle"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    applicationName: t("siteName"),
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    // App Store ID: enables the iOS Smart App Banner.
    itunes: { appId: APP_STORE_ID },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      locale: OG_LOCALE[safeLocale],
      alternateLocale: routing.locales.filter((l) => l !== safeLocale).map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
  };
}

/** Marks a returning visitor before first paint so the preloader stays hidden. */
const SEEN_SCRIPT = `try{if(sessionStorage.getItem("dulce:seen"))document.documentElement.setAttribute("data-seen","")}catch(e){}`;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    // suppressHydrationWarning: the inline script and browser extensions set
    // attributes on <html> before React hydrates.
    <html lang={locale} className={`${archivo.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-ground text-ink" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: SEEN_SCRIPT }} />
        <a
          href="#main"
          className="sr-only z-[80] rounded-full bg-ink px-4 py-2 text-ground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <Atmosphere />
          <SmoothScroll />
          <main id="main" className="relative">
            {children}
          </main>
          <SiteFooter />
          <PillNav />
          <ConsentBanner />
        </NextIntlClientProvider>
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
