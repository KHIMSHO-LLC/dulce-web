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
        "Chrome extension (optional): if you link the Dulce extension for Chrome, Edge or Brave, it shows your glucose in that browser; anyone using that browser profile can see it, and you can remove the computer at any time (section 2.10).",
      ],
      terms: [
        "Saved chart history now includes your logbook, and sharing shows followers only the shared entries (sections 2 and 8.1).",
      ],
    },
  },
  es: {
    heading: (date) => `Qué cambia en esta versión (${date})`,
    previous: (until) => `Versión anterior (vigente hasta el ${until})`,
    items: {
      privacy: [
        "Extensión para Chrome (opcional): si vinculas la extensión de Dulce para Chrome, Edge o Brave, muestra tu glucosa en ese navegador; cualquiera que use ese perfil del navegador puede verla, y puedes quitar el ordenador cuando quieras (apartado 2.10).",
      ],
      terms: [
        "El historial guardado incluye ahora tu diario, y al compartir los seguidores solo ven las entradas compartidas (apartados 2 y 8.1).",
      ],
    },
  },
  de: {
    heading: (date) => `Was sich in dieser Fassung ändert (${date})`,
    previous: (until) => `Vorherige Fassung (gültig bis ${until})`,
    items: {
      privacy: [
        "Chrome-Erweiterung (optional): Wenn du die Dulce-Erweiterung für Chrome, Edge oder Brave verbindest, zeigt sie deinen Glukosewert in diesem Browser; jeder, der dieses Browserprofil nutzt, kann ihn sehen, und du kannst den Computer jederzeit entfernen (Abschnitt 2.10).",
      ],
      terms: [
        "Der gespeicherte Kurvenverlauf umfasst jetzt dein Logbuch; beim Teilen sehen Follower nur die geteilten Einträge (Abschnitte 2 und 8.1).",
      ],
    },
  },
  fr: {
    heading: (date) => `Ce qui change dans cette version (${date})`,
    previous: (until) => `Version précédente (en vigueur jusqu'au ${until})`,
    items: {
      privacy: [
        "Extension pour Chrome (facultatif) : si tu associes l’extension Dulce pour Chrome, Edge ou Brave, elle affiche ta glycémie dans ce navigateur ; toute personne qui utilise ce profil de navigateur peut la voir, et tu peux retirer l’ordinateur à tout moment (section 2.10).",
      ],
      terms: [
        "L’historique enregistré inclut maintenant ton journal ; en partageant, tes abonnés ne voient que les entrées partagées (sections 2 et 8.1).",
      ],
    },
  },
  it: {
    heading: (date) => `Cosa cambia in questa versione (${date})`,
    previous: (until) => `Versione precedente (valida fino al ${until})`,
    items: {
      privacy: [
        "Estensione per Chrome (facoltativa): se colleghi l’estensione Dulce per Chrome, Edge o Brave, mostra la tua glicemia in quel browser; chiunque usi quel profilo del browser può vederla, e puoi rimuovere il computer in qualsiasi momento (sezione 2.10).",
      ],
      terms: [
        "La cronologia salvata include ora il tuo diario; condividendo, i follower vedono solo le voci condivise (sezioni 2 e 8.1).",
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
