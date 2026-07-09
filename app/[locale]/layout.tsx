import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { routing, type AppLocale } from "@/i18n/routing";
import "../globals.css";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#FBF7F2",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://dulceglucosa.com"),
    title: {
      default: t("defaultTitle"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    keywords: t("keywords").split(", "),
    applicationName: t("siteName"),
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    // App Store ID — enables the iOS Smart App Banner once the app is live.
    itunes: {
      appId: "6770694596",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      locale: safeLocale === "es" ? "es_ES" : "en_US",
      alternateLocale: safeLocale === "es" ? ["en_US"] : ["es_ES"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
    alternates: {
      canonical: "/",
      languages: {
        es: "/",
        en: "/en",
        "x-default": "/",
      },
    },
  };
}

/** JSON-LD structured data for the Dulce iOS app + organization. */
function structuredData(locale: string) {
  const description =
    locale === "es"
      ? "Dulce muestra tu glucosa de CGM en la pantalla de bloqueo del iPhone, en el Apple Watch y en widgets — con alertas y seguimiento familiar."
      : "Dulce shows your CGM glucose on your iPhone Lock Screen, Apple Watch and widgets — with alerts and family sharing.";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        name: "Dulce",
        operatingSystem: "iOS",
        applicationCategory: "HealthApplication",
        description,
        inLanguage: ["es", "en"],
        url: "https://dulceglucosa.com",
        installUrl: "https://apps.apple.com/app/id6770694596",
        screenshot: [
          "https://dulceglucosa.com/screenshots/home.png",
          "https://dulceglucosa.com/screenshots/lock-screen.png",
          "https://dulceglucosa.com/screenshots/widgets.png",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "Organization",
        name: "Dulce",
        url: "https://dulceglucosa.com",
        email: "hola@dulceglucosa.com",
        logo: "https://dulceglucosa.com/favicon.ico",
      },
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)) }}
        />
        <NextIntlClientProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
