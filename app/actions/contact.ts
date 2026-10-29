"use server";

import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { checkRateLimit } from "@/lib/utils/ratelimit";
import { hashIp } from "@/lib/utils/hash";
import { getRequestIp } from "@/lib/utils/getRequestIp";

const schema = z.object({
  name: z.string().min(2).max(100),
  // Bots often submit our own addresses (sales@, hola@...), which only bounces the confirmation.
  email: z
    .string()
    .email()
    .refine((value) => !value.trim().toLowerCase().endsWith("@dulceglucosa.com")),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  locale: z.enum(["es", "en", "de", "fr", "it"]),
});

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; code: "validation" | "rate-limit" | "generic" };

const ONE_HOUR = 60 * 60 * 1000;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: the "website" field is hidden from people, so anything in it came from a bot.
  // Pretend it worked so the bot doesn't retry, and send nothing.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success" };
  }

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    locale: formData.get("locale"),
  });

  if (!parsed.success) {
    return { status: "error", code: "validation" };
  }

  const ip = await getRequestIp();
  const ip_hash = hashIp(ip);

  // 5 contact form submissions per IP per hour
  const limit = checkRateLimit(`contact:${ip_hash}`, 5, ONE_HOUR);
  if (!limit.ok) {
    return { status: "error", code: "rate-limit" };
  }

  const apiKey = env.resend.apiKey();
  if (!apiKey) {
    // Do not write contact form contents to logs, even in development.
    console.info("[contact] Resend is not configured; message was not sent.");
    return { status: "success" };
  }

  const client = new Resend(apiKey);
  const { name, email, subject, message } = parsed.data;

  try {
    // 1. Forward the message internally to hola@dulceglucosa.com
    await client.emails.send({
      from: env.resend.from(),
      to: "hola@dulceglucosa.com",
      replyTo: email,
      subject: `[Website Contact] ${subject}`,
      text: `New message from the Dulce website contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n---\n${message}\n---\n\nReply directly to this email to respond to ${name}.`,
    });

    // 2. Send a confirmation to the person who reached out
    const confirmation = {
      es: {
        subject: "Recibimos tu mensaje — Dulce",
        body: `Hola ${name},\n\nGracias por escribirnos. Hemos recibido tu mensaje y te responderemos en un plazo de 48 horas laborables.\n\nEl equipo de Dulce\nhola@dulceglucosa.com`,
      },
      en: {
        subject: "We got your message — Dulce",
        body: `Hi ${name},\n\nThanks for reaching out. We received your message and will get back to you within 48 working hours.\n\nThe Dulce team\nhola@dulceglucosa.com`,
      },
      de: {
        subject: "Wir haben deine Nachricht erhalten — Dulce",
        body: `Hallo ${name},\n\ndanke für deine Nachricht. Wir haben sie erhalten und melden uns innerhalb von 48 Arbeitsstunden.\n\nDein Dulce-Team\nhola@dulceglucosa.com`,
      },
      fr: {
        subject: "Nous avons bien reçu ton message — Dulce",
        body: `Bonjour ${name},\n\nmerci de nous avoir écrit. Nous avons bien reçu ton message et nous te répondrons sous 48 heures ouvrées.\n\nL'équipe Dulce\nhola@dulceglucosa.com`,
      },
      it: {
        subject: "Abbiamo ricevuto il tuo messaggio — Dulce",
        body: `Ciao ${name},\n\ngrazie per averci scritto. Abbiamo ricevuto il tuo messaggio e ti risponderemo entro 48 ore lavorative.\n\nIl team di Dulce\nhola@dulceglucosa.com`,
      },
    }[parsed.data.locale];
    const confirmationSubject = confirmation.subject;
    const confirmationBody = confirmation.body;

    await client.emails.send({
      from: env.resend.from(),
      to: email,
      subject: confirmationSubject,
      text: confirmationBody,
    });

    return { status: "success" };
  } catch (error) {
    console.error(
      "[contact] failed to send email:",
      error instanceof Error ? error.name : "unknown error",
    );
    return { status: "error", code: "generic" };
  }
}
