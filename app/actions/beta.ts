"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/utils/ratelimit";
import { hashIp } from "@/lib/utils/hash";
import { getRequestIp } from "@/lib/utils/getRequestIp";

const cgmDevices = ["libre2", "libre3", "dexcomG6", "dexcomG7", "nightscout", "none"] as const;
const regions = ["es", "mx", "other"] as const;

const schema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  locale: z.enum(["es", "en"]),
  cgm_device: z.enum(cgmDevices),
  region: z.enum(regions),
  notes: z.string().max(2000).optional(),
  consent: z.literal("on"),
});

export type BetaState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; code: "validation" | "rate-limit" | "generic" };

const ONE_DAY = 24 * 60 * 60 * 1000;

export async function applyForBeta(
  _prev: BetaState,
  formData: FormData,
): Promise<BetaState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    locale: formData.get("locale"),
    cgm_device: formData.get("cgm_device"),
    region: formData.get("region"),
    notes: formData.get("notes") || undefined,
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    return { status: "error", code: "validation" };
  }

  const ip = await getRequestIp();
  const ip_hash = hashIp(ip);

  const limit = checkRateLimit(`beta:${ip_hash}`, 5, ONE_DAY);
  if (!limit.ok) {
    return { status: "error", code: "rate-limit" };
  }

  try {
    const supabase = supabaseAdmin();
    const { error } = await supabase.from("beta_interest").insert({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      cgm_device: parsed.data.cgm_device,
      region: parsed.data.region,
      notes: parsed.data.notes ?? null,
      ip_hash,
    });

    if (error) {
      console.error("[beta] supabase insert failed:", error);
      return { status: "error", code: "generic" };
    }
  } catch (error) {
    console.error("[beta] unexpected:", error);
    return { status: "error", code: "generic" };
  }

  return { status: "success" };
}
