import type { AppLocale } from "@/i18n/routing";
import type { LegalDoc } from "@/lib/legalVersions";
import { PrivacyDe20261116 } from "./PrivacyDe20261116";
import { PrivacyEn20261116 } from "./PrivacyEn20261116";
import { PrivacyEs20261116 } from "./PrivacyEs20261116";
import { PrivacyFr20261116 } from "./PrivacyFr20261116";
import { PrivacyIt20261116 } from "./PrivacyIt20261116";
import { TermsDe20261116 } from "./TermsDe20261116";
import { TermsEn20261116 } from "./TermsEn20261116";
import { TermsEs20261116 } from "./TermsEs20261116";
import { TermsFr20261116 } from "./TermsFr20261116";
import { TermsIt20261116 } from "./TermsIt20261116";
import { PrivacyDe20261110 } from "./PrivacyDe20261110";
import { PrivacyEn20261110 } from "./PrivacyEn20261110";
import { PrivacyEs20261110 } from "./PrivacyEs20261110";
import { PrivacyFr20261110 } from "./PrivacyFr20261110";
import { PrivacyIt20261110 } from "./PrivacyIt20261110";
import { TermsDe20261105 } from "./TermsDe20261105";
import { TermsEn20261105 } from "./TermsEn20261105";
import { TermsEs20261105 } from "./TermsEs20261105";
import { TermsFr20261105 } from "./TermsFr20261105";
import { TermsIt20261105 } from "./TermsIt20261105";

/**
 * Earlier versions of the legal texts, copied unchanged from what was live (git `main`), so the
 * "Previous version" link in the change box works. Add a folder entry here and in
 * lib/legalVersions.ts each time a new version is published.
 */
type Doc = () => React.JSX.Element;
type ByLocale = Partial<Record<AppLocale, Doc>> & { en: Doc };

export const ARCHIVED: Record<LegalDoc, Record<string, ByLocale>> = {
  privacy: {
    "2026-11-16": {
      es: PrivacyEs20261116,
      en: PrivacyEn20261116,
      de: PrivacyDe20261116,
      fr: PrivacyFr20261116,
      it: PrivacyIt20261116,
    },
    "2026-11-10": {
      es: PrivacyEs20261110,
      en: PrivacyEn20261110,
      de: PrivacyDe20261110,
      fr: PrivacyFr20261110,
      it: PrivacyIt20261110,
    },
  },
  terms: {
    "2026-11-16": {
      es: TermsEs20261116,
      en: TermsEn20261116,
      de: TermsDe20261116,
      fr: TermsFr20261116,
      it: TermsIt20261116,
    },
    "2026-11-05": {
      es: TermsEs20261105,
      en: TermsEn20261105,
      de: TermsDe20261105,
      fr: TermsFr20261105,
      it: TermsIt20261105,
    },
  },
};
