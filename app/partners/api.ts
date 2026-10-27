/**
 * Client for the relay's /ref/admin/* endpoints. See the shared contract
 * (ref-contract.md) — this dashboard is one of three consumers (relay + iOS
 * app being built in parallel against the same shape).
 *
 * Auth: the admin key the user types into the login form on this page IS the
 * bearer token (`REF_ADMIN_KEY` on the relay). It's kept in sessionStorage
 * only (cleared on tab close, never persisted), and re-sent on every call.
 */

import { RELAY_URL } from "@/lib/relay";

export { RELAY_URL };

export type PayoutType = "revshare" | "per_paying" | "per_retained" | "percent";

/** `amount` is € per person, or % for revshare / percent. revshare pays that % of
 *  Dulce's net on each person's first `monthlyPayments` monthly and first
 *  `yearlyPayments` yearly payments. */
export interface Payout {
  type: PayoutType;
  amount: number;
  monthlyPayments?: number;
  yearlyPayments?: number;
}

export interface PartnerProfile {
  name?: string;
  email?: string;
  tiktok?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  country?: string;
  payoutMethod?: string;
}

export interface RefMonth {
  month: string;
  payments: number;
  netEur?: number;
  share: number;
}

export interface RefRevenue {
  grossEur: number;
  netEur: number;
  payments: number;
  refunds: number;
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
  /** Token behind the partner's read-only stats link; absent until created. */
  viewToken?: string;
  partner?: PartnerProfile;
  appleOfferCodes?: string[];
  earned?: Owed;
  revenue?: RefRevenue;
  months?: RefMonth[];
}

/** What /ref/partner returns: one code's numbers, as its partner sees them. */
export interface PartnerStats {
  code: string;
  name?: string | null;
  months?: RefMonth[];
  status: RefCode["status"];
  payout: Payout;
  createdAt: number;
  stats: CodeStats;
  owed: Owed;
  earned: Owed;
  paidThrough: number | null;
}

/** The partner's stats page; the code and token ride in the URL fragment so
 *  they never reach a server log. */
export function partnerStatsUrl(origin: string, code: string, viewToken: string): string {
  return `${origin}/partners/stats#${code}.${viewToken}`;
}

export type LifecycleEvent = "signup" | "logout" | "uninstall" | "upgrade" | "convert" | "downgrade";

export const LIFECYCLE_EVENTS: readonly LifecycleEvent[] = [
  "signup",
  "upgrade",
  "convert",
  "downgrade",
  "logout",
  "uninstall",
];

/** Days rolled up before 2026-10-26 have no `convert` (it was counted as an
 *  upgrade), so a kind can be missing. */
export type EventCounts = Partial<Record<LifecycleEvent, number>>;

export type FunnelStep =
  | "ob_welcome"
  | "ob_goals"
  | "ob_login"
  | "ob_connected"
  | "ob_offer"
  | "ob_offer_declined"
  | "ob_purchase";

export type FunnelCounts = Record<FunnelStep, number>;

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
  /** Relay polled the session (with or without new data). */
  activeLast24h: number;
  activeLast7d: number;
  /** Got a new sensor reading. Missing in rollups before 2026-10-26. */
  readingLast24h?: number;
  readingLast7d?: number;
  unknownPlatform?: number;
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
  /** Distinct devices that reached each onboarding step. */
  funnel?: { last7d: FunnelCounts; last30d: FunnelCounts };
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
  partner?: PartnerProfile;
  appleOfferCodes?: string[];
}

export type CodePatch = Partial<{
  status: RefCode["status"];
  offeringId: string;
  payout: Payout;
  note: string;
  partner: PartnerProfile;
  appleOfferCodes: string[];
}>;

/** A RevenueCat event as the relay's ledger keeps it (from 27 Oct 2026). */
export interface LedgerRow {
  id: string;
  /** event time, ms */
  t: number;
  /** INITIAL_PURCHASE, RENEWAL, CANCELLATION, EXPIRATION, BILLING_ISSUE, … */
  ty: string;
  p?: string;
  /** TRIAL / INTRO / NORMAL / PROMOTIONAL */
  pt?: string;
  per?: "monthly" | "yearly" | "other";
  c?: string;
  st?: string;
  sb?: 1;
  u?: string;
  /** customer price, EUR */
  g?: number;
  /** Dulce's net, EUR */
  n?: number;
  r?: string;
  why?: string;
  oc?: string;
  tc?: 1;
  rn?: number;
}

/** A relay-proxied RevenueCat answer: the RC body as-is, or why it failed. */
export type RcResult<T = unknown> =
  | { ok: true; data: T; fetchedAt: number }
  | { ok: false; status: number; error: unknown };

export interface RcOverviewMetric {
  id: string;
  name: string;
  description?: string;
  unit?: string;
  period?: string;
  value: number;
}

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

export async function fetchLedger(adminKey: string, days: number): Promise<LedgerRow[]> {
  const data = await request<{ rows: LedgerRow[] }>(adminKey, `/ref/admin/ledger?days=${days}`);
  return data.rows;
}

export async function fetchRcOverview(
  adminKey: string,
): Promise<RcResult<{ metrics: RcOverviewMetric[]; currency: string }>> {
  return request(adminKey, "/ref/admin/rc/overview");
}

export async function fetchRcChart(
  adminKey: string,
  name: string,
  params: Record<string, string>,
): Promise<RcResult> {
  const q = new URLSearchParams({ name, ...params });
  return request(adminKey, `/ref/admin/rc/chart?${q.toString()}`);
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

/** Creates the code's partner link, or replaces it (the old link stops working). */
export async function createPartnerLink(adminKey: string, code: string): Promise<string> {
  const data = await request<{ viewToken: string }>(
    adminKey,
    `/ref/admin/codes/${encodeURIComponent(code)}/partner-link`,
    { method: "POST", body: JSON.stringify({}) },
  );
  return data.viewToken;
}

/** Read-only stats for one code, authorised by its view token (not the admin key). */
export async function fetchPartnerStats(code: string, viewToken: string): Promise<PartnerStats> {
  return request<PartnerStats>(viewToken, `/ref/partner?code=${encodeURIComponent(code)}`);
}

export async function markPaid(adminKey: string, code: string): Promise<RefCode> {
  return request<RefCode>(adminKey, `/ref/admin/codes/${encodeURIComponent(code)}/mark-paid`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}
