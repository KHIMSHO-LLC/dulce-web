import { CONTACT_EMAIL } from "@/lib/site";

/** The strings of the `supportMail` messages namespace. */
export type SupportMailStrings = {
  subject: string;
  supportId: string;
  device: string;
  what: string;
};

/** Anything that looks up a `supportMail` key: `useTranslations("supportMail")` or `await getTranslations("supportMail")`. */
export type SupportMailT = (key: keyof SupportMailStrings) => string;

/**
 * The "contact us" mailto. The website can't know the visitor's Support ID, so the
 * body asks for it (and where to find it in the app). Works in server and client
 * components: pass in the translator for the `supportMail` namespace.
 */
export function supportMailto(t: SupportMailT): string {
  const body = `${t("supportId")}\n\n${t("device")}\n\n${t("what")}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t("subject"))}&body=${encodeURIComponent(body)}`;
}
