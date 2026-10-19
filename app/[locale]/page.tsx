import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import { Preloader } from "@/components/site/Preloader";
import { Stage } from "@/components/three/Stage";
import { Hero } from "@/components/landing/Hero";
import { Chapter } from "@/components/landing/Chapter";
import { WristChip } from "@/components/landing/WristChip";
import { ReadingsCounter } from "@/components/landing/ReadingsCounter";
import { Family } from "@/components/landing/Family";
import { DayAccordion } from "@/components/landing/DayAccordion";
import { MoreBento } from "@/components/landing/MoreBento";
import { Founder } from "@/components/landing/Founder";
import { Faq, type FaqItem } from "@/components/landing/Faq";
import { DownloadCta } from "@/components/landing/DownloadCta";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import type { ScreenName } from "@/components/screens/draw";
import { faqSchema } from "@/lib/schema";
import { alternatesFor } from "@/lib/seo";
import { SECTION, SITE_URL, localeUrl } from "@/lib/site";
import { APP_STORE_ID } from "@/lib/appStore";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "home" });
  return {
    title: { absolute: `Dulce: ${t("title")}` },
    description: t("description"),
    alternates: alternatesFor(safeLocale, "/"),
  };
}

function appSchema(locale: AppLocale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        name: "Dulce",
        operatingSystem: "iOS",
        applicationCategory: "HealthApplication",
        description,
        inLanguage: ["es", "en", "de"],
        url: localeUrl(locale),
        installUrl: `https://apps.apple.com/app/id${APP_STORE_ID}`,
        screenshot: [
          `${SITE_URL}/screenshots/home.png`,
          `${SITE_URL}/screenshots/lock-screen.png`,
          `${SITE_URL}/screenshots/widgets.png`,
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      },
      {
        "@type": "Organization",
        name: "Dulce",
        url: SITE_URL,
        email: "hola@dulceglucosa.com",
        logo: `${SITE_URL}/dulce-logo.png`,
      },
    ],
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;

  const t = await getTranslations({ locale: loc, namespace: "home" });
  const faqItems = t.raw("faq.items") as FaqItem[];
  const dayItems = t.raw("day.items") as Array<{ key: ScreenName; title: string; body: string }>;
  const lockTags = t.raw("lock.tags") as string[];

  return (
    <>
      <JsonLd data={appSchema(loc, t("description"))} />
      <JsonLd data={faqSchema(faqItems.map((i) => ({ question: i.q, answer: i.a })))} />
      <Preloader />
      <Stage locale={loc} />

      {/* The phone's journey: hero 100vh + chapters 180/190/190vh (JOURNEY_VH in Stage.tsx). */}
      <div id="journey" className="relative">
        <Hero />
        <Chapter
          id={SECTION.lockScreen}
          heightClass="h-[180vh]"
          mood="dusk"
          title={t("lock.title")}
          body={t("lock.body")}
          locale={loc}
          screen="lock"
          screenAlt={t("lock.alt")}
          extra={
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-label text-soft">
              {lockTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          }
        />
        <Chapter
          id={SECTION.alerts}
          heightClass="h-[190vh]"
          mood="night"
          title={t("alerts.title")}
          body={t("alerts.body")}
          locale={loc}
          screen="alerts"
          screenAlt={t("alerts.alt")}
          progress={1}
          extra={<p className="text-label text-soft">{t("alerts.note")}</p>}
        />
        <Chapter
          id={SECTION.standby}
          heightClass="h-[190vh]"
          layout="split"
          mood="deep"
          title={t("standby.title")}
          body={t("standby.body")}
          locale={loc}
          screen="standby"
          screenAlt={t("standby.alt")}
        />
      </div>

      <WristChip
        locale={loc}
        before={t("watch.before")}
        after={t("watch.after")}
        title={t("watch.title")}
        body={t("watch.body")}
        pro={t("watch.pro")}
        alt={t("watch.alt")}
      />

      <ReadingsCounter />
      <Family />

      <section id={SECTION.day} data-mood="amber" aria-labelledby="day-title" className="relative z-10 py-16 md:py-24">
        <Reveal className="container-page">
          <Split id="day-title" text={t("day.title")} className="type-display text-[clamp(2.5rem,6vw,6rem)] text-ink" />
          <div data-fade className="mt-12 md:mt-16">
            <DayAccordion locale={loc} items={dayItems} altTemplate={t.raw("day.alt") as string} />
          </div>
        </Reveal>
      </section>

      <MoreBento />
      <Founder />
      <Faq />
      <DownloadCta />
    </>
  );
}
