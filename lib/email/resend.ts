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
  es: "Bienvenido a la lista de Dulce",
  en: "Welcome to the Dulce waitlist",
} as const;

const bodies = {
  es: (email: string) => `¡Hola!

Te hemos añadido a la lista de espera de Dulce (${email}).

Te avisaremos en cuanto la app esté lista para que la pruebes. Mientras tanto, si quieres ser de los primeros en probarla, échale un vistazo a la beta privada en https://dulceglucosa.com/beta.

Gracias por confiar en nosotros.
— El equipo de Dulce
hola@dulceglucosa.com`,
  en: (email: string) => `Hi!

You're on the Dulce waitlist (${email}).

We'll let you know as soon as the app is ready for you to try. If you want to be one of the first, check out the private beta at https://dulceglucosa.com/en/beta.

Thanks for trusting us.
— The Dulce team
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
