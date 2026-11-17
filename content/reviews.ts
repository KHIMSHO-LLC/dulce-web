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
    id: "sebastian-fb",
    quote:
      "Jag har nu testat appen i några dagar (PRO versionen) och måste säga att jag är sjukt nöjd! Alla widgets ser bra ut och funkar toppen! Jag gillar översikten från att appen öppnas för att snabbt få den informationen jag vill ha och även möjligheten att dyka djupare i varje metric! Följarfunktionen funkar även den perfekt, min sambo har nu stenkoll … Snyggt jobbat!",
    lang: "sv",
    translations: {
      en: "I've been testing the app for a few days now (the PRO version) and I have to say I'm super happy! All the widgets look good and work great! I like the overview when the app opens, so I quickly get the information I want, and also being able to dig deeper into each metric! The follower feature works perfectly too, my partner now has full control … Nice work!",
      es: "Llevo unos días probando la app (la versión PRO) y tengo que decir que estoy contentísimo. Todos los widgets se ven bien y funcionan genial. Me gusta el resumen al abrir la app para tener rápido la información que quiero, y también poder profundizar en cada métrica. La función de seguidores también funciona perfecta, mi pareja ahora lo tiene todo controlado … ¡Buen trabajo!",
      de: "Ich teste die App jetzt seit ein paar Tagen (die PRO-Version) und muss sagen, ich bin mega zufrieden! Alle Widgets sehen gut aus und funktionieren super! Ich mag die Übersicht beim Öffnen der App, damit ich schnell die Infos bekomme, die ich will, und auch die Möglichkeit, bei jedem Wert tiefer einzutauchen! Die Follower-Funktion klappt auch perfekt, meine Partnerin hat jetzt alles im Blick … Super gemacht!",
      fr: "Ça fait quelques jours que je teste l'app (la version PRO) et je dois dire que je suis super content ! Tous les widgets sont beaux et marchent très bien ! J'aime l'aperçu à l'ouverture de l'app pour avoir vite l'info que je veux, et aussi pouvoir creuser chaque indicateur ! La fonction abonnés marche parfaitement aussi, ma compagne a maintenant tout sous contrôle … Beau travail !",
      it: "Sto provando l'app da qualche giorno (la versione PRO) e devo dire che sono contentissimo! Tutti i widget sono belli e funzionano benissimo! Mi piace la panoramica all'apertura dell'app per avere subito le informazioni che voglio, e anche poter approfondire ogni dato! Anche la funzione follower va alla perfezione, la mia compagna ora ha tutto sotto controllo … Bel lavoro!",
      fi: "Olen nyt testannut sovellusta muutaman päivän (PRO-versiota) ja pakko sanoa, että olen tosi tyytyväinen! Kaikki widgetit näyttävät hyviltä ja toimivat loistavasti! Tykkään yleisnäkymästä, kun sovellus aukeaa, niin saan nopeasti haluamani tiedon, ja myös siitä, että jokaiseen mittariin voi syventyä! Seuraajatoiminto toimii myös täydellisesti, puolisollani on nyt kaikki hallussa … Hienoa työtä!",
      nl: "Ik test de app nu een paar dagen (de PRO-versie) en ik moet zeggen dat ik super tevreden ben! Alle widgets zien er goed uit en werken top! Ik vind het overzicht bij het openen van de app fijn om snel de info te krijgen die ik wil, en ook dat je dieper in elke waarde kunt duiken! De volgfunctie werkt ook perfect, mijn partner heeft nu alles onder controle … Goed gedaan!",
      nb: "Jeg har testet appen i noen dager nå (PRO-versjonen) og må si at jeg er kjempefornøyd! Alle widgetene ser bra ut og fungerer topp! Jeg liker oversikten når appen åpnes, så jeg raskt får informasjonen jeg vil ha, og også muligheten til å gå dypere inn i hver måling! Følgerfunksjonen fungerer også perfekt, samboeren min har nå full kontroll … Bra jobba!",
      ru: "Я уже несколько дней тестирую приложение (версию PRO) и должен сказать, что очень доволен! Все виджеты выглядят хорошо и отлично работают! Нравится обзор при открытии приложения, чтобы быстро получить нужную информацию, и возможность подробнее разобраться в каждом показателе! Функция наблюдателей тоже работает идеально, теперь моя партнёрша всё держит под контролем … Отличная работа!",
    },
    name: "Sebastian",
    country: "SE",
    context: {
      en: "Type 1, Dulce Pro",
      es: "Tipo 1, Dulce Pro",
      de: "Typ 1, Dulce Pro",
      fr: "Type 1, Dulce Pro",
      it: "Tipo 1, Dulce Pro",
      fi: "Tyyppi 1, Dulce Pro",
      nl: "Type 1, Dulce Pro",
      nb: "Type 1, Dulce Pro",
      sv: "Typ 1, Dulce Pro",
      ru: "1 тип, Dulce Pro",
    },
    source: "facebook",
    date: "2026-11",
    consent: "2026-11-17",
  },
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
  {
    id: "appstore-momo",
    quote: "Its very useful app! Love it! So many good options, its makes life easier!",
    lang: "en",
    translations: {
      es: "¡Es una app muy útil! ¡Me encanta! Tiene muchísimas opciones y te hace la vida más fácil.",
      de: "Eine sehr nützliche App! Ich liebe sie! So viele gute Funktionen, sie macht das Leben leichter!",
      fr: "Une app très utile ! Je l'adore ! Plein de bonnes options, elle rend la vie plus facile !",
      it: "Un'app utilissima! La adoro! Tante buone opzioni, ti semplifica la vita!",
      fi: "Todella hyödyllinen sovellus! Rakastan sitä! Paljon hyviä vaihtoehtoja, se helpottaa elämää!",
      nl: "Heel handige app! Ik ben er dol op! Zoveel goede opties, het maakt het leven makkelijker!",
      nb: "Veldig nyttig app! Elsker den! Så mange gode valg, den gjør livet enklere!",
      sv: "En väldigt användbar app! Älskar den! Så många bra alternativ, den gör livet enklare!",
      ru: "Очень полезное приложение! Обожаю его! Столько хороших функций, с ним жить проще!",
    },
    name: "Momo Adeishvili",
    country: "ES",
    source: "appStore",
    stars: 5,
    date: "2026-07",
  },
];
