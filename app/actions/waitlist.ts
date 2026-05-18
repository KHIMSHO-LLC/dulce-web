"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendWaitlistConfirmation } from "@/lib/email/resend";
import { checkRateLimit } from "@/lib/utils/ratelimit";
import { hashIp } from "@/lib/utils/hash";
import { getRequestIp } from "@/lib/utils/getRequestIp";

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(["es", "en"]),
  source: z.string().max(40).optional(),
  consent: z.literal("on"),
});

export type WaitlistState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; code: "validation" | "rate-limit" | "already-joined" | "generic" };

const ONE_DAY = 24 * 60 * 60 * 1000;

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    locale: formData.get("locale"),
    source: formData.get("source") || undefined,
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    return { status: "error", code: "validation" };
  }

  const ip = await getRequestIp();
  const ip_hash = hashIp(ip);

  const limit = checkRateLimit(`waitlist:${ip_hash}`, 5, ONE_DAY);
  if (!limit.ok) {
    return { status: "error", code: "rate-limit" };
  }

  try {
    const supabase = supabaseAdmin();
    const { error } = await supabase.from("waitlist").insert({
      email: parsed.data.email.toLowerCase(),
      locale: parsed.data.locale,
      source: parsed.data.source ?? null,
      ip_hash,
    });

    if (error) {
      if (error.code === "23505") {
        return { status: "error", code: "already-joined" };
      }
      console.error("[waitlist] supabase insert failed:", error);
      return { status: "error", code: "generic" };
    }
  } catch (error) {
    console.error("[waitlist] unexpected:", error);
    return { status: "error", code: "generic" };
  }

  await sendWaitlistConfirmation(parsed.data.email, parsed.data.locale);

  return { status: "success" };
}
