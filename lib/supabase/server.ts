import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

let cached: SupabaseClient | null = null;

/**
 * Service-role Supabase client for Server Actions / Route Handlers.
 * Never import this from a Client Component — the service-role key would leak.
 */
export function supabaseAdmin(): SupabaseClient {
  if (cached) return cached;
  cached = createClient(env.supabase.url(), env.supabase.serviceRoleKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cached;
}

export type WaitlistRow = {
  id: string;
  email: string;
  locale: "es" | "en";
  source: string | null;
  ip_hash: string | null;
  created_at: string;
};

export type BetaInterestRow = {
  id: string;
  email: string;
  name: string;
  cgm_device: string | null;
  region: string | null;
  notes: string | null;
  ip_hash: string | null;
  created_at: string;
};
