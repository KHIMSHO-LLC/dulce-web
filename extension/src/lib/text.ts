/** Short texts built from chrome.i18n messages (_locales/<lang>/messages.json). */

import { TREND_ARROWS, ageMinutes, formatValue, unitLabel } from './display';
import type { View } from './display';

export const t = (key: string, subs?: string | string[]): string => chrome.i18n.getMessage(key, subs) || key;

export const uiLocale = (): string => chrome.i18n.getUILanguage();

/** "Now" / "3 min ago" / "2 h ago". */
export function ageText(ageMs: number): string {
  const m = ageMinutes(ageMs);
  if (m < 1) return t('ageNow');
  if (m < 60) return t('ageMinutes', String(m));
  return t('ageHours', String(Math.floor(m / 60)));
}

/** Toolbar tooltip. */
export function titleOf(v: View, name: string | null | undefined): string {
  switch (v.kind) {
    case 'reading': {
      const who = name ? `${name} · ` : '';
      const value = `${formatValue(v.valueMgdl, v.unit, uiLocale())} ${unitLabel(v.unit)} ${TREND_ARROWS[v.trend]}`;
      return `Dulce · ${who}${value} · ${ageText(v.ageMs)}${v.old ? ` · ${t('oldReading')}` : ''}`;
    }
    case 'unlinked':
    case 'pending':
      return `Dulce · ${t('linkTitle')}`;
    case 'pro_required':
      return `Dulce · ${t('proRequiredTitle')}`;
    case 'signed_out':
      return `Dulce · ${t('signedOutTitle')}`;
    case 'waiting':
      return `Dulce · ${t('waitingTitle')}`;
  }
}
