import { Link } from "@/i18n/navigation";
import type { AppLocale, CoreLocale } from "@/i18n/routing";
import { CORE_LOCALES } from "@/i18n/routing";
import { CURRENT_UPDATED, LEGAL_ARCHIVE, dayBefore, type LegalDoc } from "@/lib/legalVersions";

/**
 * "What changed in this update" box at the top of the privacy policy and the terms, with a link to
 * the previous version (archived at /legal/<doc>/<version>). Update the bullets with every new
 * version of the text. Languages without their own legal text show the English box.
 */
type Copy = {
  heading: (date: string) => string;
  previous: (until: string) => string;
  items: Record<LegalDoc, string[]>;
};

const COPY: Record<CoreLocale, Copy> = {
  en: {
    heading: (date) => `What changed in this update (${date})`,
    previous: (until) => `Previous version (valid until ${until})`,
    items: {
      privacy: [
        "Saved chart history (Dulce Pro, only if you accept it in the app): our relay keeps up to about 1 year of your glucose history, so you and your followers see the same chart, also after you sign out or change phone (section 2.6).",
        "If you accept it, Dulce keeps collecting your history while you are signed out or the app is removed, and keeps the sensor sign-in needed for that until collecting ends (sections 2.3 and 2.6).",
        "Family: your followers can see your saved history and, while you share it, your logbook, including notes (sections 2.4 and 2.6).",
        "Optional contact email: you can save an email in the app so we can answer you and write to you about your subscription (section 2.7).",
        "Clearer rules on how long we keep data, backups, how to get a copy or delete it, and how we tell you about changes (sections 6, 9 and 12).",
      ],
      terms: [
        "New section 8.1: saved chart history (Dulce Pro), what we promise and what we don't.",
        "Section 10: Dulce depends on the sensor makers' services, some through unofficial connections, and what happens if one stops working.",
        "Section 3: alerts, including repeat alerts and the alert when no readings arrive, can be late or missing.",
        "Sections 12 and 13: clearer limits on warranties and liability. Your rights as a consumer are not affected.",
        "Section 15: how we tell you about changes, with 30 days' notice before a change that takes something away from Dulce Pro.",
      ],
    },
  },
  es: {
    heading: (date) => `Qué cambia en esta versión (${date})`,
    previous: (until) => `Versión anterior (vigente hasta el ${until})`,
    items: {
      privacy: [
        "Historial guardado de la gráfica (Dulce Pro, solo si lo aceptas en la app): nuestro relay guarda hasta 1 año aproximadamente de tu historial de glucosa, para que tú y tus seguidores veáis la misma gráfica, también después de cerrar sesión o cambiar de móvil (apartado 2.6).",
        "Si lo aceptas, Dulce sigue recogiendo tu historial mientras tienes la sesión cerrada o la app desinstalada, y guarda el acceso al sensor necesario para ello hasta que deja de recogerlo (apartados 2.3 y 2.6).",
        "Familia: tus seguidores pueden ver tu historial guardado y, mientras lo compartas, tu registro, incluidas las notas (apartados 2.4 y 2.6).",
        "Email de contacto opcional: puedes guardar un email en la app para que podamos responderte y escribirte sobre tu suscripción (apartado 2.7).",
        "Reglas más claras sobre cuánto tiempo guardamos los datos, las copias de seguridad, cómo pedir una copia o borrarlos y cómo te avisamos de los cambios (apartados 6, 9 y 12).",
      ],
      terms: [
        "Nuevo apartado 8.1: el historial guardado de la gráfica (Dulce Pro), qué prometemos y qué no.",
        "Apartado 10: Dulce depende de los servicios de los fabricantes de sensores, algunos mediante conexiones no oficiales, y qué pasa si uno deja de funcionar.",
        "Apartado 3: las alertas, también las que se repiten y el aviso de que no llegan lecturas, pueden llegar tarde o no llegar.",
        "Apartados 12 y 13: límites más claros de garantías y responsabilidad. Tus derechos como consumidor no cambian.",
        "Apartado 15: cómo te avisamos de los cambios, con 30 días de antelación antes de un cambio que quite algo a Dulce Pro.",
      ],
    },
  },
  de: {
    heading: (date) => `Was sich in dieser Fassung ändert (${date})`,
    previous: (until) => `Vorherige Fassung (gültig bis ${until})`,
    items: {
      privacy: [
        "Gespeicherter Kurvenverlauf (Dulce Pro, nur wenn du in der App zustimmst): Unser Relay speichert bis zu etwa 1 Jahr deines Glukoseverlaufs, damit du und deine Follower dieselbe Kurve seht, auch nach dem Abmelden oder einem neuen Handy (Abschnitt 2.6).",
        "Wenn du zustimmst, sammelt Dulce deinen Verlauf weiter, während du abgemeldet bist oder die App gelöscht ist, und behält dafür den nötigen Sensor-Zugang, bis das Sammeln endet (Abschnitte 2.3 und 2.6).",
        "Familie: Deine Follower sehen deinen gespeicherten Kurvenverlauf und, solange du es teilst, dein Logbuch samt Notizen (Abschnitte 2.4 und 2.6).",
        "Optionale Kontakt-E-Mail: Du kannst in der App eine E-Mail-Adresse speichern, damit wir dir antworten und dir zu deinem Abo schreiben können (Abschnitt 2.7).",
        "Klarere Regeln dazu, wie lange wir Daten speichern, zu Backups, wie du eine Kopie bekommst oder Daten löschst und wie wir dich über Änderungen informieren (Abschnitte 6, 9 und 12).",
      ],
      terms: [
        "Neuer Abschnitt 8.1: gespeicherter Kurvenverlauf (Dulce Pro), was wir versprechen und was nicht.",
        "Abschnitt 10: Dulce hängt von den Diensten der Sensorhersteller ab, teils über inoffizielle Verbindungen, und was passiert, wenn einer nicht mehr funktioniert.",
        "Abschnitt 3: Warnungen, auch wiederholte Warnungen und die Warnung, wenn keine Werte ankommen, können verspätet sein oder ausbleiben.",
        "Abschnitte 12 und 13: klarere Grenzen bei Gewährleistung und Haftung. Deine Rechte als Verbraucher bleiben unberührt.",
        "Abschnitt 15: wie wir dich über Änderungen informieren, mit 30 Tagen Vorlauf vor einer Änderung, die Dulce Pro etwas wegnimmt.",
      ],
    },
  },
  fr: {
    heading: (date) => `Ce qui change dans cette version (${date})`,
    previous: (until) => `Version précédente (en vigueur jusqu'au ${until})`,
    items: {
      privacy: [
        "Historique de courbe enregistré (Dulce Pro, seulement si tu l'acceptes dans l'app) : notre relais garde jusqu'à environ 1 an de ton historique de glycémie, pour que toi et tes abonnés voyiez le même courbe, même après une déconnexion ou un changement de téléphone (section 2.6).",
        "Si tu l'acceptes, Dulce continue de collecter ton historique quand tu es déconnecté ou que l'app est supprimée, et garde l'accès au capteur nécessaire jusqu'à la fin de cette collecte (sections 2.3 et 2.6).",
        "Famille : tes abonnés peuvent voir ton historique enregistré et, tant que tu le partages, ton journal, notes comprises (sections 2.4 et 2.6).",
        "E-mail de contact facultatif : tu peux enregistrer un e-mail dans l'app pour que nous puissions te répondre et t'écrire au sujet de ton abonnement (section 2.7).",
        "Des règles plus claires sur la durée de conservation, les sauvegardes, comment obtenir une copie ou supprimer tes données et comment nous t'informons des changements (sections 6, 9 et 12).",
      ],
      terms: [
        "Nouvelle section 8.1 : l'historique de courbe enregistré (Dulce Pro), ce que nous promettons et ce que nous ne promettons pas.",
        "Section 10 : Dulce dépend des services des fabricants de capteurs, certains via des connexions non officielles, et ce qui se passe si l'un d'eux cesse de fonctionner.",
        "Section 3 : les alertes, y compris les alertes répétées et l'alerte quand aucune mesure n'arrive, peuvent être en retard ou ne pas arriver.",
        "Sections 12 et 13 : des limites plus claires de garantie et de responsabilité. Tes droits de consommateur ne changent pas.",
        "Section 15 : comment nous t'informons des changements, avec 30 jours de préavis avant un changement qui retire quelque chose à Dulce Pro.",
      ],
    },
  },
  it: {
    heading: (date) => `Cosa cambia in questa versione (${date})`,
    previous: (until) => `Versione precedente (valida fino al ${until})`,
    items: {
      privacy: [
        "Cronologia del grafico salvata (Dulce Pro, solo se la accetti nell'app): il nostro relay conserva fino a circa 1 anno della tua cronologia glicemica, così tu e i tuoi follower vedete lo stesso grafico, anche dopo l'uscita dall'account o un cambio di telefono (sezione 2.6).",
        "Se la accetti, Dulce continua a raccogliere la tua cronologia mentre sei disconnesso o l'app è disinstallata, e conserva l'accesso al sensore necessario finché la raccolta non termina (sezioni 2.3 e 2.6).",
        "Famiglia: i tuoi follower possono vedere la tua cronologia salvata e, finché lo condividi, il tuo diario, note comprese (sezioni 2.4 e 2.6).",
        "Email di contatto facoltativa: puoi salvare un'email nell'app per permetterci di risponderti e scriverti riguardo al tuo abbonamento (sezione 2.7).",
        "Regole più chiare su quanto conserviamo i dati, i backup, come ottenere una copia o cancellarli e come ti avvisiamo delle modifiche (sezioni 6, 9 e 12).",
      ],
      terms: [
        "Nuova sezione 8.1: la cronologia del grafico salvata (Dulce Pro), cosa promettiamo e cosa no.",
        "Sezione 10: Dulce dipende dai servizi dei produttori dei sensori, alcuni tramite connessioni non ufficiali, e cosa succede se uno smette di funzionare.",
        "Sezione 3: gli avvisi, compresi quelli ripetuti e l'avviso quando non arrivano letture, possono arrivare in ritardo o non arrivare.",
        "Sezioni 12 e 13: limiti più chiari di garanzia e responsabilità. I tuoi diritti di consumatore non cambiano.",
        "Sezione 15: come ti avvisiamo delle modifiche, con 30 giorni di preavviso prima di una modifica che toglie qualcosa a Dulce Pro.",
      ],
    },
  },
};

export function legalCopyLocale(locale: AppLocale): CoreLocale {
  return (CORE_LOCALES as readonly string[]).includes(locale) ? (locale as CoreLocale) : "en";
}

export function LegalChanges({ doc, locale }: { doc: LegalDoc; locale: AppLocale }) {
  const copy = COPY[legalCopyLocale(locale)];
  const previous = LEGAL_ARCHIVE[doc][0];
  const href =
    doc === "privacy"
      ? ({ pathname: "/legal/privacy/[version]", params: { version: previous.version } } as const)
      : ({ pathname: "/legal/terms/[version]", params: { version: previous.version } } as const);
  return (
    <aside className="my-8 rounded-[18px] border border-white/10 bg-glass px-5 py-4 [&_p]:mt-0">
      <p>
        <strong>{copy.heading(CURRENT_UPDATED[doc])}</strong>
      </p>
      <ul>
        {copy.items[doc].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {previous ? (
        <p>
          <Link href={href}>{copy.previous(dayBefore(CURRENT_UPDATED[doc]))}</Link>
        </p>
      ) : null}
    </aside>
  );
}

const ARCHIVE_NOTICE: Record<CoreLocale, (from: string, until: string) => string> = {
  en: (from, until) => `This is an earlier version, valid from ${from} until ${until}. It no longer applies.`,
  es: (from, until) => `Esta es una versión anterior, vigente del ${from} al ${until}. Ya no se aplica.`,
  de: (from, until) => `Dies ist eine frühere Fassung, gültig vom ${from} bis ${until}. Sie gilt nicht mehr.`,
  fr: (from, until) => `Ceci est une version précédente, en vigueur du ${from} au ${until}. Elle ne s'applique plus.`,
  it: (from, until) => `Questa è una versione precedente, valida dal ${from} al ${until}. Non si applica più.`,
};

const CURRENT_LINK: Record<CoreLocale, string> = {
  en: "Read the current version",
  es: "Lee la versión actual",
  de: "Zur aktuellen Fassung",
  fr: "Lire la version actuelle",
  it: "Leggi la versione attuale",
};

export function ArchivedNotice({ doc, locale, version }: { doc: LegalDoc; locale: AppLocale; version: string }) {
  const l = legalCopyLocale(locale);
  const list = LEGAL_ARCHIVE[doc];
  const i = list.findIndex((v) => v.version === version);
  const nextStart = i > 0 ? list[i - 1].validFrom : CURRENT_UPDATED[doc];
  return (
    <aside className="my-8 rounded-[18px] border border-ember/35 bg-ember/10 px-5 py-4 [&_p]:mt-0">
      <p>
        <strong>{ARCHIVE_NOTICE[l](list[i]?.validFrom ?? version, dayBefore(nextStart))}</strong>{" "}
        <Link href={doc === "privacy" ? "/legal/privacy" : "/legal/terms"}>{CURRENT_LINK[l]}</Link>
      </p>
    </aside>
  );
}
