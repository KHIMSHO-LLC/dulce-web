/**
 * Analytics consent (EU ePrivacy / GDPR). Google Analytics sets cookies, so it
 * only loads after the visitor accepts in the banner. The choice is kept in
 * localStorage on this device; "Cookie settings" in the footer reopens it.
 * Without NEXT_PUBLIC_GA_ID nothing here is shown or loaded.
 */
export type Consent = "granted" | "denied";

const KEY = "dulce:analytics-consent";
export const CONSENT_CHANGE = "dulce:consent-change";
export const CONSENT_OPEN = "dulce:consent-open";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
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
