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

const subjects = {
  es: "Te avisaremos cuando Dulce llegue a Android",
  en: "We'll tell you when Dulce reaches Android",
} as const;

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
} as const;

export async function sendWaitlistConfirmation(
  email: string,
  locale: "es" | "en",
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
