// The Dulce relay worker (serves /register etc. for the app, see
// dulce-app/.env.local EXPO_PUBLIC_RELAY_BASE_URL). Override per-environment
// with NEXT_PUBLIC_RELAY_URL (e.g. http://localhost:8787 for local relay dev).
const DEFAULT_RELAY_URL = "https://dulce-relay.giorgikhimshiashvili.workers.dev";

export const RELAY_URL = (process.env.NEXT_PUBLIC_RELAY_URL ?? DEFAULT_RELAY_URL).replace(/\/$/, "");
