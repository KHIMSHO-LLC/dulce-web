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
  | "ob_purchase"
  | "ob_login_submit"
  | "ob_err_credentials"
  | "ob_err_no_data"
  | "ob_err_network"
  | "ob_err_other"
  // Behaviour (app, once per device per day) and uninstall context (relay).
  | "act_free"
  | "act_trial"
  | "act_paid"
  | "use_la"
  | "use_widget"
  | "use_watch"
  | "use_family"
  | "use_follower"
  | "use_alerts"
  | "use_logbook"
  | "use_trends"
  | "use_pens"
  | "pw_view"
  | "pw_close"
  | "pw_plan_monthly"
  | "pw_plan_yearly"
  | "pw_buy_tap"
  | "pw_buy_cancel"
  | "pw_buy_fail"
  | "pw_buy_ok"
  | "why_price"
  | "why_looking"
  | "why_not_working"
  | "why_later"
  | "why_other"
  | "rv_asked"
  | "fb_shown"
  | "fb_connection"
  | "fb_late"
  | "fb_alerts"
  | "fb_hard"
  | "fb_other"
  | "un_day0"
  | "un_week1"
  | "un_month1"
  | "un_later"
  | "un_free"
  | "un_trial"
  | "un_paid"
  | "un_never_connected";

/** Sign-in steps are newer than the rest; older relays omit them. */
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
  /** Live view only: Pro by TestFlight / sandbox / promo (not in paid or trialing). */
  test?: number;
}

/** RevenueCat check behind the live paid / trial / test counts. */
export interface ProCheck {
  /** Pro devices' RevenueCat customers checked. */
  checked: number;
  /** Pro devices on builds that don't send their RevenueCat id (counted as reported). */
  unknown: number;
  errors: number;
  error: string | null;
  at: number;
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
/** Devices on one CGM source, by plan. */
export interface SensorLevels {
  total: number;
  free: number;
  trialing: number;
  paid: number;
  /** Got a new sensor reading in the last 1 / 3 / 7 days (all plans / Pro = trial + paid).
   *  1d/3d are optional: relays before 2026-11-09 evening don't send them. */
  readingLast1d?: number;
  readingLast1dPro?: number;
  readingLast3d?: number;
  readingLast3dPro?: number;
  readingLast7d: number;
  readingLast7dPro: number;
  /** 3+ failed polls in a row right now (expired session, no data, …). */
  failing: number;
  /** TestFlight / sandbox / promo Pro. */
  test?: number;
}

export interface UsageResponse {
  current: FleetLevels;
  /** Per CGM source (libre, dexcom, carelink, nightscout). Older relays omit it. */
  bySensor?: Record<string, SensorLevels> | null;
  proCheck?: ProCheck | null;
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

/** One "why did you cancel?" answer (relay routes/cancelFeedback.ts), one per device. */
export interface CancelAnswer {
  /** App reason id, or a RevenueCat Customer Center survey option id. */
  reason: string;
  /** 'app' = Dulce's own sheet; 'customer_center' = RevenueCat's cancel survey. */
  source: "app" | "customer_center";
  note: string | null;
  /** TRIAL / NORMAL / INTRO / PREPAID */
  period: string | null;
  product: string | null;
  store: string | null;
  locale: string | null;
  at: number;
  /** CGM source (libre, dexcom, carelink, nightscout); null when the device is gone. */
  sensor?: string | null;
  /** When the device first reached the relay (ms); null when unknown. */
  installedAt?: number | null;
  /** First 8 chars of the device id. */
  device: string;
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

export async function fetchCancelFeedback(adminKey: string): Promise<CancelAnswer[]> {
  const data = await request<{ answers: CancelAnswer[] }>(adminKey, "/ref/admin/cancel-feedback");
  return data.answers;
}

/** Banner (service notice) admin: relay routes /ref/admin/notice[/auto]. */
export type BannerLevel = "notice" | "maintenance";

export interface ManualBanner {
  id: string;
  level: BannerLevel;
  messages: Record<string, string>;
  titles?: Record<string, string>;
  providers?: string[];
  roles?: string[];
  startsAt?: number | null;
  endsAt?: number | null;
  regions?: string[];
  updatedAt: number;
}

/** Editable text of the automatic Abbott banner (per language). */
export interface AbbottText {
  title?: string;
  body?: string;
  bodyNow?: string;
}
export type AbbottTexts = Record<string, AbbottText>;

export interface AbbottWindow {
  id: string;
  name: string;
  startsAt: number;
  endsAt: number;
  regions: string[];
  hidden: boolean;
}

export interface NoticeState {
  manual: ManualBanner | null;
  auto: boolean;
  texts?: AbbottTexts | null;
  maintenances: AbbottWindow[];
}

export interface NoticeInput {
  level: BannerLevel;
  messages: Record<string, string>;
  titles?: Record<string, string>;
  providers?: string[];
  roles?: string[];
  startsAt?: number | null;
  endsAt?: number | null;
  regions?: string[];
}

/** Relay may answer `{ok:false, error}` with a 4xx; surface that text. */
async function noticeCall<T extends { ok: boolean; error?: string }>(
  adminKey: string,
  path: string,
  init?: RequestInit,
): Promise<T> {
  let data: T;
  try {
    data = await request<T>(adminKey, path, init);
  } catch (err) {
    if (err instanceof ApiError) {
      try {
        const j = JSON.parse(err.message) as { error?: string };
        if (j.error) throw new ApiError(err.status, j.error);
      } catch (inner) {
        if (inner instanceof ApiError) throw inner;
      }
    }
    throw err;
  }
  if (data && data.ok === false) throw new ApiError(400, data.error ?? "The relay refused the request.");
  return data;
}

export async function fetchNotice(adminKey: string): Promise<NoticeState> {
  return noticeCall<NoticeState & { ok: boolean }>(adminKey, "/ref/admin/notice");
}

export async function putNotice(adminKey: string, body: NoticeInput): Promise<void> {
  await noticeCall(adminKey, "/ref/admin/notice", { method: "PUT", body: JSON.stringify(body) });
}

export async function deleteNotice(adminKey: string): Promise<void> {
  await noticeCall(adminKey, "/ref/admin/notice", { method: "DELETE" });
}

export async function setNoticeAuto(
  adminKey: string,
  body: { auto?: boolean; hide?: string; unhide?: string; texts?: AbbottTexts | null },
): Promise<void> {
  await noticeCall(adminKey, "/ref/admin/notice/auto", { method: "POST", body: JSON.stringify(body) });
}

/** One device found by contact email or Support ID (relay routes/contact lookup). */
export interface ContactLookupRow {
  supportId: string;
  logTag: string;
  email: string | null;
  emailSource: string | null;
  emailUpdatedAt: number | null;
  registered: boolean;
  platform: string | null;
  appVersion: string | null;
  appBuild: string | null;
  tier: string | null;
  cgmProvider: string | null;
  firstSeenAt: number | null;
  lastPolledAt: number | null;
  lastReadingAt: number | null;
  consecutiveFailures: number | null;
  lastError: string | null;
  followers: number;
  rcAppUserId: string | null;
  refundedAt: number | null;
  lapsedAt: number | null;
  referralCode: string | null;
  cancelReason: string | null;
  /** End of a support grant (promotional Pro) still on the device. Optional: older relays omit it. */
  promoUntil?: number | null;
  /** Latest support grant the relay gave this device. */
  lastGrant?: { at: number; months: number; expiresAt: number; note: string | null } | null;
  /** Where Pro comes from. Optional: relays older than the store-plan check omit it. */
  proSource?: "store" | "gift" | "trial" | "free" | "unknown";
  /** The RevenueCat read behind proSource (state "unknown" = RevenueCat could not be read). */
  storePlan?: {
    state: "paid" | "none" | "unknown";
    productId?: string | null;
    store?: string | null;
    period?: "monthly" | "yearly" | null;
    status?: string | null;
    endsAt?: number | null;
    willRenew?: boolean | null;
    trialing?: boolean;
  };
}

export const GRANT_MONTHS = [1, 3, 6, 12] as const;
export type GrantMonths = (typeof GRANT_MONTHS)[number];

/**
 * POST /ref/admin/grant: N free months of Pro (RevenueCat promotional
 * entitlement) for the customer behind this Support ID. Returns the new end
 * (epoch ms). Throws ApiError with the relay's message on failure.
 */
export async function grantFreeMonths(
  adminKey: string,
  supportId: string,
  months: GrantMonths,
  note: string,
): Promise<number> {
  try {
    const data = await request<{ ok: boolean; expiresAt: number }>(adminKey, "/ref/admin/grant", {
      method: "POST",
      body: JSON.stringify({ supportId, months, ...(note.trim() ? { note: note.trim() } : {}) }),
    });
    return data.expiresAt;
  } catch (err) {
    if (err instanceof ApiError && err.status !== 0) {
      let parsed: { error?: string; message?: string } = {};
      try {
        parsed = JSON.parse(err.message) as typeof parsed;
      } catch {
        // not JSON: keep the raw text
      }
      if (err.status === 404 && !parsed.error) {
        throw new ApiError(404, "This relay has no /ref/admin/grant yet (not deployed).");
      }
      throw new ApiError(err.status, parsed.message ?? parsed.error ?? err.message);
    }
    throw err;
  }
}

/** An "@" means email, anything else is a Support ID. Throws ApiError(400) on a bad value. */
export async function fetchContact(adminKey: string, query: string): Promise<ContactLookupRow[]> {
  const q = query.trim();
  const param = q.includes("@") ? "email" : "supportId";
  try {
    const data = await request<{ devices: ContactLookupRow[] }>(
      adminKey,
      `/ref/admin/contact?${param}=${encodeURIComponent(q)}`,
    );
    return data.devices;
  } catch (err) {
    if (err instanceof ApiError && err.status === 400) {
      let code = "";
      try {
        code = (JSON.parse(err.message) as { error?: string }).error ?? "";
      } catch {
        // not JSON: show the raw text
      }
      const text: Record<string, string> = {
        bad_email: "That does not look like an email address.",
        bad_support_id: "That does not look like a Support ID.",
        missing_query: "Type an email or a Support ID.",
      };
      throw new ApiError(400, text[code] ?? (code || err.message));
    }
    throw err;
  }
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
