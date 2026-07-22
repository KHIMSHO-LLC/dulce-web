"use server";

import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { checkRateLimit } from "@/lib/utils/ratelimit";
import { hashIp } from "@/lib/utils/hash";
import { getRequestIp } from "@/lib/utils/getRequestIp";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  locale: z.enum(["es", "en"]),
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
    // In dev without Resend configured, just log and succeed
    console.log("[contact] Resend not configured. Message would have been sent:", parsed.data);
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
    const confirmationSubject =
      parsed.data.locale === "es"
        ? "Recibimos tu mensaje — Dulce"
        : "We got your message — Dulce";

    const confirmationBody =
      parsed.data.locale === "es"
        ? `Hola ${name},\n\nGracias por escribirnos. Hemos recibido tu mensaje y te responderemos en un plazo de 48 horas laborables.\n\nEl equipo de Dulce\nhola@dulceglucosa.com`
        : `Hi ${name},\n\nThanks for reaching out. We received your message and will get back to you within 48 working hours.\n\nThe Dulce team\nhola@dulceglucosa.com`;

    await client.emails.send({
      from: env.resend.from(),
      to: email,
      subject: confirmationSubject,
      text: confirmationBody,
    });

    return { status: "success" };
  } catch (error) {
    console.error("[contact] failed to send email:", error);
    return { status: "error", code: "generic" };
  }
}
