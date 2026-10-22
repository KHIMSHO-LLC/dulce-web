/**
 * Article authors. Real people only: every article is signed by one of them
 * and links to their author page (E-E-A-T: health content needs a named,
 * experienced author).
 */
import type { AppLocale } from "@/i18n/routing";

export type AuthorId = "giorgi" | "levan";

export type Author = {
  id: AuthorId;
  /** URL slug of the author page (same in every language). */
  slug: string;
  name: string;
  initials: string;
  role: Record<AppLocale, string>;
  bio: Record<AppLocale, string>;
};

export const AUTHORS: Record<AuthorId, Author> = {
  giorgi: {
    id: "giorgi",
    slug: "giorgi-khimshiashvili",
    name: "Giorgi Khimshiashvili",
    initials: "GK",
    role: {
      es: "Fundador de Dulce, vive con diabetes tipo 1",
      en: "Founder of Dulce, lives with type 1 diabetes",
      de: "Gründer von Dulce, lebt mit Typ-1-Diabetes",
      fr: "Fondateur de Dulce, vit avec un diabète de type 1",
      it: "Fondatore di Dulce, vive con il diabete di tipo 1",
    },
    // Only facts the authors confirmed. Extend when they add more.
    bio: {
      es: "Giorgi vive con diabetes tipo 1 y es el fundador de Dulce. Creó la app porque estaba cansado de desbloquear el móvil, abrir una app y esperar solo para ver un número. Escribe sobre lo que usa cada día con su sensor, su iPhone y su Apple Watch.",
      en: "Giorgi lives with type 1 diabetes and founded Dulce. He built the app because he was tired of unlocking his phone, opening an app and waiting just to see one number. He writes about what he uses every day with his sensor, iPhone and Apple Watch.",
      de: "Giorgi lebt mit Typ-1-Diabetes und hat Dulce gegründet. Er hat die App gebaut, weil er es satt hatte, das Handy zu entsperren, eine App zu öffnen und zu warten, nur um eine Zahl zu sehen. Er schreibt über das, was er jeden Tag mit Sensor, iPhone und Apple Watch nutzt.",
      fr: "Giorgi vit avec un diabète de type 1 et a fondé Dulce. Il a créé l'app parce qu'il en avait assez de déverrouiller son téléphone, d'ouvrir une app et d'attendre juste pour voir un chiffre. Il écrit sur ce qu'il utilise chaque jour avec son capteur, son iPhone et son Apple Watch.",
      it: "Giorgi vive con il diabete di tipo 1 e ha fondato Dulce. Ha creato l'app perché era stanco di sbloccare il telefono, aprire un'app e aspettare solo per vedere un numero. Scrive di ciò che usa ogni giorno con il suo sensore, l'iPhone e l'Apple Watch.",
    },
  },
  levan: {
    id: "levan",
    slug: "levan-khimshiashvili",
    name: "Levan Khimshiashvili",
    initials: "LK",
    role: {
      es: "Vive con diabetes, autor de las guías de Dulce",
      en: "Lives with diabetes, writes the Dulce guides",
      de: "Lebt mit Diabetes, schreibt die Dulce-Ratgeber",
      fr: "Vit avec le diabète, écrit les guides de Dulce",
      it: "Vive con il diabete, scrive le guide di Dulce",
    },
    bio: {
      es: "Levan es el hermano de Giorgi y también vive con diabetes. Escribe las guías de Dulce desde el punto de vista de quien convive con la diabetes cada día.",
      en: "Levan is Giorgi's brother and also lives with diabetes. He writes the Dulce guides from the point of view of someone who manages diabetes every day.",
      de: "Levan ist Giorgis Bruder und lebt ebenfalls mit Diabetes. Er schreibt die Dulce-Ratgeber aus der Sicht von jemandem, der jeden Tag mit Diabetes lebt.",
      fr: "Levan est le frère de Giorgi et vit lui aussi avec le diabète. Il écrit les guides de Dulce du point de vue de quelqu'un qui gère le diabète au quotidien.",
      it: "Levan è il fratello di Giorgi e anche lui vive con il diabete. Scrive le guide di Dulce dal punto di vista di chi gestisce il diabete ogni giorno.",
    },
  },
};

export function authorBySlug(slug: string): Author | undefined {
  return Object.values(AUTHORS).find((a) => a.slug === slug);
}
