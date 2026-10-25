/**
 * Analytics consent (EU ePrivacy / GDPR). Google Analytics sets cookies, so in
 * the EEA, the UK and Switzerland it only loads after the visitor accepts in the
 * banner. Elsewhere it loads without asking, and "Cookie settings" in the footer
 * still lets anyone turn it off. The choice is kept in localStorage on this
 * device. Without NEXT_PUBLIC_GA_ID nothing here is shown or loaded.
 */
export type Consent = "granted" | "denied";

const KEY = "dulce:analytics-consent";
export const CONSENT_CHANGE = "dulce:consent-change";
export const CONSENT_OPEN = "dulce:consent-open";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Session cookie with the visitor's country code, set by proxy.ts. */
export const REGION_COOKIE = "dulce-region";

/** EEA (EU + Iceland, Liechtenstein, Norway), UK and Switzerland. */
const OPT_IN_COUNTRIES = new Set(
  "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH".split(" "),
);

/** True when the country needs opt-in consent, or is unknown. */
export function consentRequired(): boolean {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${REGION_COOKIE}=([A-Z]{2})`));
    return !match || OPT_IN_COUNTRIES.has(match[1]);
  } catch {
    return true;
  }
}

/** The stored choice; with none, "granted" outside opt-in countries, else null (ask). */
export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "granted" || v === "denied") return v;
  } catch {
    /* fall through to the region default */
  }
  return consentRequired() ? null : "granted";
}

export function writeConsent(value: Consent): void {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* private mode: the choice lasts for this page view */
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_CHANGE, { detail: value }));
}

export function openConsentSettings(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN));
}

/** Subscribe helper for useSyncExternalStore (this tab's changes + other tabs). */
export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE, onChange);
    window.removeEventListener("storage", onChange);
  };
}
