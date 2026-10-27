/** Formatting helpers shared by the admin dashboard pages. */

import type { PartnerProfile, Payout } from "./api";

export function eur(amount: number, digits = 2): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

export function pct(part: number, whole: number): string {
  if (whole <= 0) return "—";
  return `${Math.round((part / whole) * 100)}%`;
}

export function shortDay(ms: number | null): string {
  if (ms === null) return "—";
  return new Date(ms).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
}

export function dateTime(ms: number): string {
  return new Date(ms).toLocaleString("en-GB", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "2026-10" → "Oct 2026" */
export function monthLabel(month: string): string {
  const [y, m] = month.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1] ?? m} ${y}`;
}

/** 🇪🇸 from "ES"; empty for anything that isn't two letters. */
export function flag(country?: string | null): string {
  if (!country || !/^[A-Za-z]{2}$/.test(country)) return "";
  return String.fromCodePoint(...[...country.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

export function payoutLabel(payout: Payout): string {
  switch (payout.type) {
    case "revshare":
      return `${payout.amount}% of net · ${payout.monthlyPayments ?? 6} monthly / ${payout.yearlyPayments ?? 1} yearly payment${(payout.yearlyPayments ?? 1) === 1 ? "" : "s"}`;
    case "per_paying":
      return `${eur(payout.amount)} per paying person`;
    case "per_retained":
      return `${eur(payout.amount)} per person who pays a 2nd time`;
    default:
      return `${payout.amount}% (note only)`;
  }
}

export type SocialKey = "tiktok" | "instagram" | "youtube" | "facebook";

export const SOCIALS: { key: SocialKey; label: string; base: string }[] = [
  { key: "tiktok", label: "TikTok", base: "https://www.tiktok.com/@" },
  { key: "instagram", label: "Instagram", base: "https://www.instagram.com/" },
  { key: "youtube", label: "YouTube", base: "https://www.youtube.com/@" },
  { key: "facebook", label: "Facebook", base: "https://www.facebook.com/" },
];

/** A profile URL from what was typed: a full URL is kept, a handle gets the site's base. */
export function socialUrl(key: SocialKey, value?: string): string | null {
  const v = value?.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  const base = SOCIALS.find((s) => s.key === key)!.base;
  return base + v.replace(/^@/, "");
}

export function partnerName(code: string, partner?: PartnerProfile): string {
  return partner?.name?.trim() || code;
}
