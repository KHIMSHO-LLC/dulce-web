/**
 * Server-side environment access. Throws early if a required var is missing
 * at runtime — never bundled into client output.
 */
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

export const env = {
  supabase: {
    url: () => required("SUPABASE_URL"),
    serviceRoleKey: () => required("SUPABASE_SERVICE_ROLE_KEY"),
  },
  resend: {
    apiKey: () => optional("RESEND_API_KEY"),
    from: () => process.env.RESEND_FROM || "Dulce <hola@dulceglucosa.com>",
  },
  ratelimit: {
    salt: () => process.env.RATELIMIT_SALT || "dulce-default-salt-change-me",
  },
};
