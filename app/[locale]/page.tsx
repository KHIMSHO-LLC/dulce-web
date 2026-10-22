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

/** What the released app does, for AI and search engines. Keep in sync with PRODUCT.md and app/llms.txt. */
const FEATURES: Record<AppLocale, string[]> = {
  es: [
    "Glucosa en tiempo real del FreeStyle Libre 2 y Libre 3 a través de LibreLinkUp",
    "Live Activity en la pantalla de bloqueo y la Dynamic Island, actualizada cada minuto",
    "Widgets para la pantalla de inicio, la pantalla de bloqueo y StandBy",
    "App para Apple Watch con complicaciones",
    "Avisos de glucosa baja y alta, aviso crítico de hipo grave y horas tranquilas",
    "Seguidores familiares por enlace de invitación, con sus propios avisos y mensajes de un toque",
    "Diario de hidratos, insulina y glucosa",
    "Tendencias: tiempo en rango, glucosa media y GMI de 7 a 90 días",
  ],
  en: [
    "Real-time FreeStyle Libre 2 and Libre 3 glucose through LibreLinkUp",
    "Lock Screen Live Activity and Dynamic Island, updated every minute",
    "Home Screen, Lock Screen and StandBy widgets",
    "Apple Watch app with complications",
    "Low and high alerts, a critical alert for severe lows, and quiet hours",
    "Family followers by invite link, with their own alerts and one-tap check-in messages",
    "Logbook for carbs, insulin and glucose",
    "Trends: time in range, average glucose and GMI over 7 to 90 days",
  ],
  de: [
    "Echtzeit-Glukose vom FreeStyle Libre 2 und Libre 3 über LibreLinkUp",
    "Live-Aktivität auf dem Sperrbildschirm und in der Dynamic Island, jede Minute aktualisiert",
    "Widgets für Home-Bildschirm, Sperrbildschirm und StandBy",
    "Apple Watch App mit Komplikationen",
    "Warnungen bei niedrigen und hohen Werten, kritische Warnung bei schwerem Unterzucker und Ruhezeiten",
    "Familien-Follower per Einladungslink, mit eigenen Warnungen und Nachrichten per Tipp",
    "Logbuch für Kohlenhydrate, Insulin und Glukose",
    "Trends: Zeit im Zielbereich, Durchschnittsglukose und GMI über 7 bis 90 Tage",
  ],
  fr: [
    "Glycémie en temps réel du FreeStyle Libre 2 et Libre 3 via LibreLinkUp",
    "Activité en direct sur l'écran verrouillé et la Dynamic Island, mise à jour chaque minute",
    "Widgets pour l'écran d'accueil, l'écran verrouillé et StandBy",
    "App Apple Watch avec complications",
    "Alertes de glycémie basse et haute, alerte critique d'hypoglycémie sévère et heures calmes",
    "Abonnés de la famille par lien d'invitation, avec leurs propres alertes et des messages en un geste",
    "Journal des glucides, de l'insuline et de la glycémie",
    "Tendances : temps dans la cible, glycémie moyenne et GMI sur 7 à 90 jours",
  ],
  it: [
    "Glicemia in tempo reale da FreeStyle Libre 2 e Libre 3 tramite LibreLinkUp",
    "Attività in tempo reale sulla schermata di blocco e nella Dynamic Island, aggiornata ogni minuto",
    "Widget per la schermata Home, la schermata di blocco e StandBy",
    "App per Apple Watch con complicazioni",
    "Avvisi di glicemia bassa e alta, avviso critico per ipoglicemia grave e ore di silenzio",
    "Follower di famiglia tramite link di invito, con i propri avvisi e messaggi con un tocco",
    "Diario di carboidrati, insulina e glicemia",
    "Andamento: tempo nel range, glicemia media e GMI da 7 a 90 giorni",
  ],
};

const AUDIENCE: Record<AppLocale, string> = {
  es: "Personas con diabetes que llevan un FreeStyle Libre y sus familias: padres de niños con diabetes tipo 1, parejas y cuidadores",
  en: "People with diabetes who wear a FreeStyle Libre, and their families: parents of children with type 1 diabetes, partners and caregivers",
  de: "Menschen mit Diabetes, die einen FreeStyle Libre tragen, und ihre Familien: Eltern von Kindern mit Typ-1-Diabetes, Partner und Angehörige",
  fr: "Personnes diabétiques qui portent un FreeStyle Libre, et leurs familles : parents d'enfants atteints de diabète de type 1, conjoints et aidants",
  it: "Persone con diabete che usano un FreeStyle Libre e le loro famiglie: genitori di bambini con diabete di tipo 1, partner e caregiver",
};

function appSchema(locale: AppLocale, description: string) {
  const org = `${SITE_URL}/#organization`;
  const appStoreUrl = `https://apps.apple.com/app/id${APP_STORE_ID}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#app`,
        name: "Dulce",
        operatingSystem: "iOS, watchOS",
        applicationCategory: "HealthApplication",
        description,
        inLanguage: [...routing.locales],
        url: localeUrl(locale),
        installUrl: appStoreUrl,
        sameAs: [appStoreUrl],
        screenshot: [
          `${SITE_URL}/screenshots/home.png`,
          `${SITE_URL}/screenshots/lock-screen.png`,
          `${SITE_URL}/screenshots/widgets.png`,
        ],
        featureList: FEATURES[locale],
        audience: { "@type": "PeopleAudience", audienceType: AUDIENCE[locale] },
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        publisher: { "@id": org },
      },
      {
        "@type": "Organization",
        "@id": org,
        name: "Dulce",
        url: SITE_URL,
        email: "hola@dulceglucosa.com",
        logo: `${SITE_URL}/dulce-logo.png`,
        sameAs: [appStoreUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Dulce",
        inLanguage: [...routing.locales],
        publisher: { "@id": org },
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
