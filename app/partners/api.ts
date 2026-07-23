/**
 * Client for the relay's /ref/admin/* endpoints. See the shared contract
 * (ref-contract.md) — this dashboard is one of three consumers (relay + iOS
 * app being built in parallel against the same shape).
 *
 * Auth: the admin key the user types into the login form on this page IS the
 * bearer token (`REF_ADMIN_KEY` on the relay). It's kept in sessionStorage
 * only (cleared on tab close, never persisted), and re-sent on every call.
 */

// Same worker that serves /register etc. for the app (see
// dulce-app/.env.local EXPO_PUBLIC_RELAY_BASE_URL). Override per-environment
// with NEXT_PUBLIC_RELAY_URL (e.g. http://localhost:8787 for local relay dev).
const DEFAULT_RELAY_URL = "https://dulce-relay.giorgikhimshiashvili.workers.dev";

export const RELAY_URL = (process.env.NEXT_PUBLIC_RELAY_URL ?? DEFAULT_RELAY_URL).replace(/\/$/, "");

export type PayoutType = "per_paying" | "per_retained" | "percent";

export interface Payout {
  type: PayoutType;
  amount: number;
}

export interface CodeStats {
  claims: number;
  trials: number;
  paying: number;
  retained: number;
  cancelled: number;
}

export interface Owed {
  count: number;
  amount: number | null;
}

export interface RefCode {
  code: string;
  offeringId: string;
  status: "active" | "paused";
  payout: Payout;
  note: string;
  createdAt: number;
  stats: CodeStats;
  paidThrough: number | null;
  owed: Owed;
}

export type LifecycleEvent = "signup" | "logout" | "uninstall" | "upgrade" | "downgrade";

export const LIFECYCLE_EVENTS: readonly LifecycleEvent[] = [
  "signup",
  "logout",
  "uninstall",
  "upgrade",
  "downgrade",
];

export type EventCounts = Record<LifecycleEvent, number>;

/** A point-in-time count of what exists. */
export interface FleetLevels {
  total: number;
  free: number;
  /** Actually paying — excludes trialists. */
  paid: number;
  /** Inside a free trial: full Pro service, no revenue yet. */
  trialing: number;
  ios: number;
  android: number;
  activeLast24h: number;
  activeLast7d: number;
  failing: number;
  paused: number;
  neverPolled: number;
}

/** One completed day from the relay's permanent history row. */
export interface DailyRollup {
  date: string;
  levels: FleetLevels;
  events: EventCounts;
  takenAt: number;
}

export interface FirstSeenBucket {
  date: string;
  count: number;
  cumulative: number;
}

/** Everything the Usage tab renders — see relay/src/routes/analytics.ts for
 *  how each number is derived and what it does NOT mean (device ≠ person). */
export interface UsageResponse {
  current: FleetLevels;
  today: { date: string; events: EventCounts };
  history: DailyRollup[];
  firstSeen: FirstSeenBucket[];
  totals: {
    last7d: EventCounts;
    last30d: EventCounts;
    allTime: EventCounts;
  };
  generatedAt: number;
}

export interface Offering {
  id: string;
  displayName: string;
}

export interface NewCodeInput {
  code: string;
  offeringId: string;
  payout: Payout;
  note: string;
}

export type CodePatch = Partial<{
  status: RefCode["status"];
  offeringId: string;
  payout: Payout;
  note: string;
}>;

/** Thrown for a 401 specifically, so the caller can bounce back to login. */
export class UnauthorizedError extends Error {
  constructor() {
    super("Invalid or expired admin key.");
    this.name = "UnauthorizedError";
  }
}

/** Thrown for any other non-2xx response. */
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(adminKey: string, path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${RELAY_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${adminKey}`,
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiError(0, "Could not reach the relay. Check your connection.");
  }

  if (res.status === 401) {
    throw new UnauthorizedError();
  }

  if (!res.ok) {
    let detail = "";
    try {
      detail = await res.text();
    } catch {
      // ignore — body may be empty
    }
    throw new ApiError(res.status, detail || `Relay error ${res.status}.`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export async function fetchCodes(adminKey: string): Promise<RefCode[]> {
  const data = await request<{ codes: RefCode[] }>(adminKey, "/ref/admin/codes");
  return data.codes;
}

export async function fetchOfferings(adminKey: string): Promise<Offering[] | null> {
  const data = await request<{ offerings: Offering[] | null }>(adminKey, "/ref/admin/offerings");
  return data.offerings;
}

export async function fetchUsage(adminKey: string): Promise<UsageResponse> {
  return request<UsageResponse>(adminKey, "/ref/admin/usage");
}

export async function createCode(adminKey: string, input: NewCodeInput): Promise<RefCode> {
  return request<RefCode>(adminKey, "/ref/admin/codes", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function patchCode(adminKey: string, code: string, patch: CodePatch): Promise<RefCode> {
  return request<RefCode>(adminKey, `/ref/admin/codes/${encodeURIComponent(code)}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteCode(adminKey: string, code: string): Promise<void> {
  await request<void>(adminKey, `/ref/admin/codes/${encodeURIComponent(code)}`, {
    method: "DELETE",
  });
}

export async function markPaid(adminKey: string, code: string): Promise<RefCode> {
  return request<RefCode>(adminKey, `/ref/admin/codes/${encodeURIComponent(code)}/mark-paid`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}
