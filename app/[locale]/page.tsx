import { screenLocale } from "@/components/screens/strings";
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
import { Audience } from "@/components/landing/Audience";
import { Founder } from "@/components/landing/Founder";
import { Faq, type FaqItem } from "@/components/landing/Faq";
import { DownloadCta } from "@/components/landing/DownloadCta";
import { VideoDemo } from "@/components/landing/VideoDemo";
import { PlanCompare } from "@/components/landing/PlanCompare";
import { AskAi } from "@/components/landing/AskAi";
import { Reviews } from "@/components/landing/Reviews";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import type { ScreenName } from "@/components/screens/draw";
import { APP_ID, APP_STORE_URL, ORG_ID, faqSchema } from "@/lib/schema";
import { seoFor } from "@/lib/seo";
import { SECTION, SITE_URL, localeUrl } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "home" });
  return {
    title: { absolute: `Dulce: ${t("title")}` },
    description: t("description"),
    ...seoFor(safeLocale, "/", { title: `Dulce: ${t("title")}`, description: t("description") }),
  };
}

/** What the released app does, for AI and search engines. Keep in sync with PRODUCT.md and app/llms.txt. */
const FEATURES: Record<AppLocale, string[]> = {
  es: [
    "Glucosa en tiempo real del FreeStyle Libre 2 y Libre 3 (LibreLinkUp) y del Dexcom G6, G7 y ONE+ (Dexcom Share), de Medtronic Simplera, Guardian, Instinct y MiniMed 780G (CareLink) y de tu propio sitio de Nightscout",
    "Live Activity en la pantalla de bloqueo y la Dynamic Island, actualizada cada minuto",
    "Widgets para la pantalla de inicio, la pantalla de bloqueo y StandBy",
    "App para Apple Watch con complicaciones",
    "Avisos de glucosa baja y alta, aviso crítico de hipo grave y horas tranquilas",
    "Seguidores familiares por enlace de invitación, con sus propios avisos y mensajes de un toque",
    "Diario de hidratos, insulina y glucosa",
    "Dosis importadas de plumas de insulina inteligentes NFC (NovoPen 6 y NovoPen Echo Plus)",
    "Tendencias: tiempo en rango, glucosa media y GMI de 7 a 90 días",
  ],
  en: [
    "Real-time glucose from FreeStyle Libre 2 and Libre 3 (LibreLinkUp) and Dexcom G6, G7 and ONE+ (Dexcom Share), Medtronic Simplera, Guardian, Instinct and MiniMed 780G (CareLink) and your own Nightscout site",
    "Lock Screen Live Activity and Dynamic Island, updated every minute",
    "Home Screen, Lock Screen and StandBy widgets",
    "Apple Watch app with complications",
    "Low and high alerts, a critical alert for severe lows, and quiet hours",
    "Family followers by invite link, with their own alerts and one-tap check-in messages",
    "Logbook for carbs, insulin and glucose",
    "Doses imported from NFC smart insulin pens (NovoPen 6 and NovoPen Echo Plus)",
    "Trends: time in range, average glucose and GMI over 7 to 90 days",
  ],
  de: [
    "Echtzeit-Glukose vom FreeStyle Libre 2 und Libre 3 (LibreLinkUp) und vom Dexcom G6, G7 und ONE+ (Dexcom Share), von Medtronic Simplera, Guardian, Instinct und MiniMed 780G (CareLink) und von deiner eigenen Nightscout-Seite",
    "Live-Aktivität auf dem Sperrbildschirm und in der Dynamic Island, jede Minute aktualisiert",
    "Widgets für Home-Bildschirm, Sperrbildschirm und StandBy",
    "Apple Watch App mit Komplikationen",
    "Warnungen bei niedrigen und hohen Werten, kritische Warnung bei schwerem Unterzucker und Ruhezeiten",
    "Familien-Follower per Einladungslink, mit eigenen Warnungen und Nachrichten per Tipp",
    "Logbuch für Kohlenhydrate, Insulin und Glukose",
    "Dosen aus NFC-Smart-Insulinpens (NovoPen 6 und NovoPen Echo Plus)",
    "Trends: Zeit im Zielbereich, Durchschnittsglukose und GMI über 7 bis 90 Tage",
  ],
  fr: [
    "Glycémie en temps réel des FreeStyle Libre 2 et Libre 3 (LibreLinkUp) et des Dexcom G6, G7 et ONE+ (Dexcom Share), des Medtronic Simplera, Guardian, Instinct et MiniMed 780G (CareLink) et de ton propre site Nightscout",
    "Activité en direct sur l'écran verrouillé et la Dynamic Island, mise à jour chaque minute",
    "Widgets pour l'écran d'accueil, l'écran verrouillé et StandBy",
    "App Apple Watch avec complications",
    "Alertes de glycémie basse et haute, alerte critique d'hypoglycémie sévère et heures calmes",
    "Abonnés de la famille par lien d'invitation, avec leurs propres alertes et des messages en un geste",
    "Journal des glucides, de l'insuline et de la glycémie",
    "Doses importées des stylos à insuline connectés NFC (NovoPen 6 et NovoPen Echo Plus)",
    "Tendances : temps dans la cible, glycémie moyenne et GMI sur 7 à 90 jours",
  ],
  it: [
    "Glicemia in tempo reale da FreeStyle Libre 2 e Libre 3 (LibreLinkUp) e da Dexcom G6, G7 e ONE+ (Dexcom Share), da Medtronic Simplera, Guardian, Instinct e MiniMed 780G (CareLink) e dal tuo sito Nightscout",
    "Attività in tempo reale sulla schermata di blocco e nella Dynamic Island, aggiornata ogni minuto",
    "Widget per la schermata Home, la schermata di blocco e StandBy",
    "App per Apple Watch con complicazioni",
    "Avvisi di glicemia bassa e alta, avviso critico per ipoglicemia grave e ore di silenzio",
    "Follower di famiglia tramite link di invito, con i propri avvisi e messaggi con un tocco",
    "Diario di carboidrati, insulina e glicemia",
    "Dosi importate dalle penne per insulina smart NFC (NovoPen 6 e NovoPen Echo Plus)",
    "Andamento: tempo nel range, glicemia media e GMI da 7 a 90 giorni",
  ],
  fi: [
    "Reaaliaikainen glukoosi FreeStyle Libre 2- ja Libre 3 -sensoreista (LibreLinkUp) sekä Dexcom G6-, G7- ja ONE+ -sensoreista (Dexcom Share), Medtronic Simplera-, Guardian-, Instinct- ja MiniMed 780G -järjestelmistä (CareLink) sekä omalta Nightscout-sivustoltasi",
    "Live Activity lukitusnäytöllä ja Dynamic Islandissa, päivittyy minuutin välein",
    "Widgetit koti- ja lukitusnäytölle sekä StandByhin",
    "Apple Watch -sovellus komplikaatioineen",
    "Hälytykset matalista ja korkeista arvoista, kriittinen hälytys vakavasta hypoglykemiasta ja hiljaiset tunnit",
    "Perheenjäsenet seuraajiksi kutsulinkillä, omine hälytyksineen ja yhden napautuksen viesteineen",
    "Päiväkirja hiilihydraateille, insuliinille ja glukoosille",
    "Annokset älykkäistä NFC-insuliinikynistä (NovoPen 6 ja NovoPen Echo Plus)",
    "Trendit: aika tavoitealueella, keskiglukoosi ja GMI 7–90 päivän ajalta",
  ],
  nl: [
    "Realtime glucose van de FreeStyle Libre 2 en Libre 3 (LibreLinkUp) en de Dexcom G6, G7 en ONE+ (Dexcom Share), de Medtronic Simplera, Guardian, Instinct en MiniMed 780G (CareLink) en je eigen Nightscout-site",
    "Live Activity op het toegangsscherm en in het Dynamic Island, elke minuut bijgewerkt",
    "Widgets voor het beginscherm, het toegangsscherm en StandBy",
    "Apple Watch-app met complicaties",
    "Meldingen bij lage en hoge waarden, een kritieke melding bij een ernstige hypo en stille uren",
    "Familieleden als volgers via een uitnodigingslink, met eigen meldingen en berichten met één tik",
    "Logboek voor koolhydraten, insuline en glucose",
    "Doses uit slimme NFC-insulinepennen (NovoPen 6 en NovoPen Echo Plus)",
    "Trends: tijd binnen bereik, gemiddelde glucose en GMI over 7 tot 90 dagen",
  ],
  nb: [
    "Glukose i sanntid fra FreeStyle Libre 2 og Libre 3 (LibreLinkUp) og Dexcom G6, G7 og ONE+ (Dexcom Share), Medtronic Simplera, Guardian, Instinct og MiniMed 780G (CareLink) og din egen Nightscout-side",
    "Live-aktivitet på låseskjermen og i Dynamic Island, oppdatert hvert minutt",
    "Widgeter for Hjem-skjermen, låseskjermen og StandBy",
    "Apple Watch-app med komplikasjoner",
    "Alarmer for lave og høye verdier, kritisk alarm ved alvorlig hypoglykemi og stilletimer",
    "Familiemedlemmer som følgere via invitasjonslenke, med egne alarmer og meldinger med ett trykk",
    "Loggbok for karbohydrater, insulin og glukose",
    "Doser fra smarte NFC-insulinpenner (NovoPen 6 og NovoPen Echo Plus)",
    "Trender: tid i målområdet, gjennomsnittlig glukose og GMI over 7 til 90 dager",
  ],
  sv: [
    "Glukos i realtid från FreeStyle Libre 2 och Libre 3 (LibreLinkUp) och Dexcom G6, G7 och ONE+ (Dexcom Share), Medtronic Simplera, Guardian, Instinct och MiniMed 780G (CareLink) och din egen Nightscout-webbplats",
    "Live-aktivitet på låsskärmen och i Dynamic Island, uppdaterad varje minut",
    "Widgetar för hemskärmen, låsskärmen och Vänteläge",
    "Apple Watch-app med komplikationer",
    "Larm vid låga och höga värden, kritiskt larm vid allvarlig hypoglykemi och tysta timmar",
    "Familjemedlemmar som följare via inbjudningslänk, med egna larm och meddelanden med ett tryck",
    "Loggbok för kolhydrater, insulin och glukos",
    "Doser från smarta NFC-insulinpennor (NovoPen 6 och NovoPen Echo Plus)",
    "Trender: tid inom målområdet, genomsnittlig glukos och GMI över 7 till 90 dagar",
  ],
  ru: [
    "Глюкоза в реальном времени с FreeStyle Libre 2 и Libre 3 (LibreLinkUp) и Dexcom G6, G7 и ONE+ (Dexcom Share), Medtronic Simplera, Guardian, Instinct и MiniMed 780G (CareLink) и с вашего сайта Nightscout",
    "Live Activity на экране блокировки и в Dynamic Island с обновлением каждую минуту",
    "Виджеты для экрана «Домой», экрана блокировки и режима ожидания",
    "Приложение для Apple Watch с расширениями",
    "Оповещения о низком и высоком уровне, критическое оповещение при тяжёлой гипогликемии и тихие часы",
    "Члены семьи как наблюдатели по ссылке-приглашению, со своими оповещениями и сообщениями в одно касание",
    "Дневник углеводов, инсулина и глюкозы",
    "Дозы из умных шприц-ручек с NFC (NovoPen 6 и NovoPen Echo Plus)",
    "Тренды: время в диапазоне, средняя глюкоза и GMI за 7–90 дней",
  ],
};

const AUDIENCE: Record<AppLocale, string> = {
  es: "Personas con diabetes que llevan un sensor de glucosa (tipo 1, LADA, tipo 2 y otros tipos) y quienes las cuidan: padres de niños con diabetes tipo 1, personas mayores y sus familias, recién diagnosticados, parejas y cuidadores, y quienes trabajan y no pueden abrir una app a cada rato",
  en: "People with diabetes who wear a glucose sensor (type 1, LADA, type 2 and other types) and the people who care for them: parents of children with type 1 diabetes, older adults and their families, the newly diagnosed, partners and caregivers, and people at work who can't keep opening an app",
  de: "Menschen mit Diabetes, die einen Glukosesensor tragen (Typ 1, LADA, Typ 2 und andere Formen), und alle, die sich um sie kümmern: Eltern von Kindern mit Typ-1-Diabetes, Senioren und ihre Familien, frisch Diagnostizierte, Partner und Angehörige sowie Berufstätige, die nicht ständig eine App öffnen können",
  fr: "Personnes diabétiques qui portent un capteur de glucose (type 1, LADA, type 2 et autres types) et leurs proches : parents d'enfants atteints de diabète de type 1, personnes âgées et leurs familles, personnes nouvellement diagnostiquées, conjoints et aidants, et actifs qui ne peuvent pas ouvrir une app sans arrêt",
  it: "Persone con diabete che usano un sensore del glucosio (tipo 1, LADA, tipo 2 e altri tipi) e chi se ne prende cura: genitori di bambini con diabete di tipo 1, anziani e le loro famiglie, chi ha appena ricevuto la diagnosi, partner e caregiver, e chi lavora e non può aprire un'app di continuo",
  fi: "Diabeetikot, joilla on glukoosisensori (tyyppi 1, LADA, tyyppi 2 ja muut tyypit), ja heistä huolehtivat: tyypin 1 diabetesta sairastavien lasten vanhemmat, ikääntyneet ja heidän perheensä, vastadiagnosoidut, kumppanit ja omaishoitajat sekä työssäkäyvät, jotka eivät voi avata sovellusta jatkuvasti",
  nl: "Mensen met diabetes die een glucosesensor dragen (type 1, LADA, type 2 en andere vormen) en wie voor hen zorgt: ouders van kinderen met diabetes type 1, ouderen en hun familie, pas gediagnosticeerden, partners en mantelzorgers, en werkenden die niet steeds een app kunnen openen",
  nb: "Personer med diabetes som bruker glukosesensor (type 1, LADA, type 2 og andre typer) og de som tar vare på dem: foreldre til barn med diabetes type 1, eldre og familiene deres, nydiagnostiserte, partnere og pårørende, og folk på jobb som ikke kan åpne en app hele tiden",
  sv: "Personer med diabetes som använder glukossensor (typ 1, LADA, typ 2 och andra typer) och de som bryr sig om dem: föräldrar till barn med typ 1-diabetes, äldre och deras familjer, nydiagnostiserade, partner och anhöriga, och de som arbetar och inte kan öppna en app hela tiden",
  ru: "Люди с диабетом, которые носят сенсор глюкозы (1 тип, LADA, 2 тип и другие типы), и те, кто о них заботится: родители детей с диабетом 1 типа, пожилые люди и их семьи, те, кому только что поставили диагноз, партнёры и ухаживающие, а также работающие люди, которым неудобно всё время открывать приложение",
};

function appSchema(locale: AppLocale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": APP_ID,
    name: "Dulce",
    // App Store names (seo/aso.md): en/es, then the de/fr/it localized ones.
    alternateName: ["Dulce: Glucose at a Glance", "Dulce: Blutzucker im Blick", "Dulce : Glycémie en direct", "Dulce: Glicemia sott'occhio"],
    // dulce-app app.json: ios.deploymentTarget 17.0. The watch app ships inside it.
    operatingSystem: "iOS 17 or later",
    applicationCategory: "HealthApplication",
    description,
    inLanguage: [...routing.locales],
    url: localeUrl(locale),
    downloadUrl: APP_STORE_URL,
    installUrl: APP_STORE_URL,
    sameAs: [APP_STORE_URL],
    screenshot: [
      `${SITE_URL}/screenshots/home.png`,
      `${SITE_URL}/screenshots/lock-screen.png`,
      `${SITE_URL}/screenshots/widgets.png`,
    ],
    featureList: FEATURES[locale],
    audience: { "@type": "PeopleAudience", audienceType: AUDIENCE[locale] },
    // Free download. Dulce Pro is not listed as an Offer: its price differs by App Store country and
    // the site has no price to quote. TODO(Giorgi): add a second Offer if a single public price is decided.
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    // TODO(Giorgi): no aggregateRating until there is a real rating source (App Store rating + count) to read.
    publisher: { "@id": ORG_ID },
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
      {/* Same items the FAQ section renders (home.faq.items), so markup and visible text match. */}
      <JsonLd data={faqSchema(faqItems.map((i) => ({ question: i.q, answer: i.a })), loc)} />
      <Preloader />
      <Stage locale={screenLocale(loc)} />

      {/* The phone's journey: hero 100vh + chapters 180/190/190vh (JOURNEY_VH in Stage.tsx). */}
      <div id="journey" className="relative">
        <Hero />
        <Chapter
          id={SECTION.lockScreen}
          heightClass="h-[180vh]"
          mood="dusk"
          title={t("lock.title")}
          body={t("lock.body")}
          locale={screenLocale(loc)}
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
          locale={screenLocale(loc)}
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
          locale={screenLocale(loc)}
          screen="standby"
          screenAlt={t("standby.alt")}
        />
      </div>

      <WristChip
        locale={screenLocale(loc)}
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
            <DayAccordion locale={screenLocale(loc)} items={dayItems} altTemplate={t.raw("day.alt") as string} />
          </div>
        </Reveal>
      </section>

      <MoreBento />
      <VideoDemo />
      <Audience />
      <Reviews />
      <Founder />
      <PlanCompare />
      <Faq />
      <AskAi />
      <DownloadCta />
    </>
  );
}
