import type { AppLocale } from "@/i18n/routing";

/**
 * Words from real Dulce users, shown on the homepage.
 *
 * Rules (DULCE/plans/2026-11-07-website-gaps.md, Phase 1):
 * - Exact words, trimmed but never reworded. `quote` is the original; `translations` are ours, marked as translated.
 * - Off-store quotes (email, social posts) only with the person's permission: `consent` is the date they agreed.
 *   Public App Store reviews need no consent. Never a review from the team's family or friends.
 * - First name (or store nickname) and country only. No photos without permission.
 * - Nothing about health outcomes ("fewer lows" etc.) next to a quote.
 */
export type Review = {
  id: string;
  quote: string;
  lang: AppLocale;
  translations: Partial<Record<AppLocale, string>>;
  name: string;
  /** ISO 3166 country code, shown as the country's name in the visitor's language. */
  country: string;
  /** Short context next to the name, per language (falls back to English). */
  context?: Partial<Record<AppLocale, string>>;
  source: "email" | "appStore" | "facebook";
  /** Store rating, only for store reviews (emails and posts have no stars). */
  stars?: number;
  /** Month the words were written, YYYY-MM. */
  date: string;
  consent?: string;
};

export const REVIEWS: readonly Review[] = [
  {
    id: "aaron-cat",
    quote: "This is helping me track my cat's glucose tremendously. I grabbed the Pro plan and love it!",
    lang: "en",
    translations: {
      es: "Me está ayudando muchísimo a controlar la glucosa de mi gato. Me cogí el plan Pro y me encanta.",
      de: "Das hilft mir enorm, den Zucker meiner Katze im Blick zu behalten. Ich habe mir den Pro-Plan geholt und liebe ihn!",
      fr: "Ça m'aide énormément à suivre la glycémie de mon chat. J'ai pris l'offre Pro et je l'adore !",
      it: "Mi sta aiutando tantissimo a seguire la glicemia del mio gatto. Ho preso il piano Pro e lo adoro!",
      fi: "Tämä auttaa valtavasti seuraamaan kissani glukoosia. Otin Pro-tilauksen ja rakastan sitä!",
      nl: "Dit helpt me enorm om de glucose van mijn kat bij te houden. Ik heb het Pro-abonnement genomen en vind het geweldig!",
      nb: "Dette hjelper meg enormt med å følge med på glukosen til katten min. Jeg tok Pro-planen og elsker den!",
      sv: "Det här hjälper mig enormt att hålla koll på min katts glukos. Jag skaffade Pro-planen och älskar den!",
      ru: "Это невероятно помогает мне следить за глюкозой моего кота. Я оформил Pro и в восторге!",
    },
    name: "Aaron",
    country: "US",
    context: {
      en: "Cat owner, Dulce Pro",
      es: "Dueño de un gato, Dulce Pro",
      de: "Katzenhalter, Dulce Pro",
      fr: "Propriétaire d'un chat, Dulce Pro",
      it: "Proprietario di un gatto, Dulce Pro",
      fi: "Kissanomistaja, Dulce Pro",
      nl: "Katteneigenaar, Dulce Pro",
      nb: "Katteeier, Dulce Pro",
      sv: "Kattägare, Dulce Pro",
      ru: "Хозяин кота, Dulce Pro",
    },
    source: "email",
    date: "2026-11",
    consent: "2026-11-07",
  },
  {
    id: "katrin-health",
    quote: "Vielen Dank für die prompte Umsetzung – es funktioniert :-)",
    lang: "de",
    translations: {
      en: "Thank you for the quick fix – it works :-)",
      es: "Muchas gracias por arreglarlo tan rápido: ¡funciona! :-)",
      fr: "Merci beaucoup pour la correction rapide, ça marche :-)",
      it: "Grazie mille per la correzione rapida: funziona :-)",
      fi: "Kiitos nopeasta korjauksesta – se toimii :-)",
      nl: "Heel erg bedankt voor de snelle oplossing – het werkt :-)",
      nb: "Tusen takk for den raske løsningen – det fungerer :-)",
      sv: "Tack så mycket för den snabba lösningen – det fungerar :-)",
      ru: "Большое спасибо, что так быстро исправили — всё работает :-)",
    },
    name: "Katrin",
    country: "DE",
    context: {
      en: "Dulce Pro, after an Apple Health fix",
      es: "Dulce Pro, tras un arreglo de Apple Salud",
      de: "Dulce Pro, nach einem Apple-Health-Fix",
      fr: "Dulce Pro, après une correction pour Apple Santé",
      it: "Dulce Pro, dopo una correzione per Apple Salute",
      fi: "Dulce Pro, Applen Terveys -korjauksen jälkeen",
      nl: "Dulce Pro, na een oplossing voor Apple Gezondheid",
      nb: "Dulce Pro, etter en fiks for Apple Helse",
      sv: "Dulce Pro, efter en åtgärd för Apple Hälsa",
      ru: "Dulce Pro, после исправления для Apple Здоровье",
    },
    source: "email",
    date: "2026-11",
    consent: "2026-11-07",
  },
  {
    id: "appstore-akey",
    quote: "¡Muy útil y fácil de usar! El proceso de incorporación fue muy sencillo.",
    lang: "es",
    translations: {
      en: "Very useful and easy to use! Getting set up was very simple.",
      de: "Sehr nützlich und einfach zu bedienen! Die Einrichtung war ganz leicht.",
      fr: "Très utile et facile à utiliser ! La prise en main a été très simple.",
      it: "Utilissima e facile da usare! La configurazione è stata semplicissima.",
      fi: "Todella hyödyllinen ja helppokäyttöinen! Käyttöönotto oli tosi helppoa.",
      nl: "Heel handig en makkelijk te gebruiken! Het instellen was heel eenvoudig.",
      nb: "Veldig nyttig og lett å bruke! Oppsettet var veldig enkelt.",
      sv: "Väldigt användbar och lätt att använda! Det var väldigt enkelt att komma igång.",
      ru: "Очень полезное и простое приложение! Настроить было совсем несложно.",
    },
    name: "Akey.today",
    country: "US",
    source: "appStore",
    stars: 5,
    date: "2026-11",
  },
];
