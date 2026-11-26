/**
 * Dulce Pro public prices: the ONE place a price number lives in code.
 * United States prices in US dollars (Apple sets local equivalents per country),
 * so every use must say they are US prices and keep the local-currency note.
 * Hardcoded copies that cannot import this: the 9 comparison article cells
 * (content/articles/glucose-apps-compared/*.mdx). See PRODUCT.md "When the price changes".
 */
export const PRO_PRICES = { monthly: 3.99, yearly: 29.99, currency: "USD" } as const;

/** Yearly price spread over 12 months, rounded to cents. */
export const YEARLY_PER_MONTH = Math.round((PRO_PRICES.yearly / 12) * 100) / 100;

function fmt(locale: string, amount: number): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency: PRO_PRICES.currency }).format(amount);
}

/** The three formatted prices for a page locale. */
export function proPriceStrings(locale: string) {
  return {
    monthly: fmt(locale, PRO_PRICES.monthly),
    yearly: fmt(locale, PRO_PRICES.yearly),
    perMonth: fmt(locale, YEARLY_PER_MONTH),
  };
}

/** Fill {monthly} / {yearly} / {perMonth} in a plain string (for raw message arrays). */
export function fillPrices(text: string, locale: string): string {
  const p = proPriceStrings(locale);
  return text.replace(/\{(monthly|yearly|perMonth)\}/g, (_, k: keyof typeof p) => p[k]);
}
