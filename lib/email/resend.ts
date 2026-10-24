import "server-only";
import { Resend } from "resend";
import { env } from "@/lib/env";

let cached: Resend | null = null;

function resendClient(): Resend | null {
  const apiKey = env.resend.apiKey();
  if (!apiKey) return null;
  if (cached) return cached;
  cached = new Resend(apiKey);
  return cached;
}

export type WaitlistLocale = "es" | "en" | "de" | "fr" | "it";

const subjects: Record<WaitlistLocale, string> = {
  es: "Te avisaremos cuando Dulce llegue a Android",
  en: "We'll tell you when Dulce reaches Android",
  de: "Wir melden uns, sobald Dulce für Android da ist",
  fr: "On te prévient dès que Dulce arrive sur Android",
  it: "Ti avvisiamo appena Dulce arriva su Android",
};

const bodies = {
  es: (email: string) => `¡Hola!

Hemos apuntado ${email} a la lista de Dulce para Android.

Te escribiremos en cuanto la versión para Android esté lista. Si tienes un iPhone, Dulce ya está disponible gratis en el App Store: https://apps.apple.com/app/id6770694596

Gracias por tu interés.
El equipo de Dulce
hola@dulceglucosa.com`,
  en: (email: string) => `Hi!

We've added ${email} to the Dulce for Android list.

We'll email you as soon as the Android version is ready. If you have an iPhone, Dulce is already free on the App Store: https://apps.apple.com/app/id6770694596

Thanks for your interest.
The Dulce team
hola@dulceglucosa.com`,
  de: (email: string) => `Hallo!

Wir haben ${email} auf die Liste für Dulce auf Android gesetzt.

Wir schreiben dir, sobald die Android-Version fertig ist. Wenn du ein iPhone hast: Dulce gibt es schon kostenlos im App Store: https://apps.apple.com/app/id6770694596

Danke für dein Interesse.
Das Dulce-Team
hola@dulceglucosa.com`,
  fr: (email: string) => `Bonjour !

Nous avons ajouté ${email} à la liste de Dulce pour Android.

Nous t'écrirons dès que la version Android sera prête. Si tu as un iPhone, Dulce est déjà gratuit sur l'App Store : https://apps.apple.com/app/id6770694596

Merci de ton intérêt.
L'équipe Dulce
hola@dulceglucosa.com`,
  it: (email: string) => `Ciao!

Abbiamo aggiunto ${email} alla lista di Dulce per Android.

Ti scriveremo appena la versione Android sarà pronta. Se hai un iPhone, Dulce è già gratis sull'App Store: https://apps.apple.com/app/id6770694596

Grazie per l'interesse.
Il team di Dulce
hola@dulceglucosa.com`,
};

export async function sendWaitlistConfirmation(
  email: string,
  locale: WaitlistLocale,
): Promise<{ sent: boolean; reason?: string }> {
  const client = resendClient();
  if (!client) {
    return { sent: false, reason: "resend-not-configured" };
  }

  try {
    await client.emails.send({
      from: env.resend.from(),
      to: email,
      subject: subjects[locale],
      text: bodies[locale](email),
    });
    return { sent: true };
  } catch (error) {
    console.error("[resend] failed to send waitlist confirmation:", error);
    return { sent: false, reason: "send-failed" };
  }
}
