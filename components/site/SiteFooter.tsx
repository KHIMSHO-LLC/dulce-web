import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL, SECTION } from "@/lib/site";
import { DropMark } from "./DropMark";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * The close: QR hand-off, every section, help and legal, the honest small
 * print, and the wordmark set huge and cropped by the bottom of the page.
 */
export async function SiteFooter() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();
  const home = (id: string) => (locale === "es" ? `/#${id}` : `/en#${id}`);

  const onPage = [
    { id: SECTION.lockScreen, label: nav("sections.lockScreen") },
    { id: SECTION.alerts, label: nav("sections.alerts") },
    { id: SECTION.watch, label: nav("sections.watch") },
    { id: SECTION.family, label: nav("sections.family") },
    { id: SECTION.faq, label: nav("sections.faq") },
  ];

  const linkClass = "text-soft transition-colors duration-200 hover:text-ink";

  return (
    <footer className="relative z-10 overflow-hidden pt-24 md:pt-32">
      <div className="container-page">
        <div className="grid gap-12 border-t border-white/10 pt-10 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-[14px] bg-[#f6f0ea] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/appstore-qr.svg" alt="" width={84} height={84} className="h-[84px] w-[84px]" />
            </div>
            <p className="max-w-[22ch] pt-1 text-label text-soft">{t("scan")}</p>
          </div>

          <nav aria-label={t("onPage")} className="grid content-start gap-2 text-label">
            <p className="mb-1 text-mute">{t("onPage")}</p>
            {onPage.map((s) => (
              <a key={s.id} href={home(s.id)} className={linkClass}>
                {s.label}
              </a>
            ))}
          </nav>

          <div className="grid content-start gap-2 text-label">
            <p className="mb-1 text-mute">{t("help")}</p>
            <Link href="/setup" className={linkClass}>
              {nav("setup")}
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
            <div className="-ml-2.5 mt-2">
              <LanguageSwitcher />
            </div>
          </div>

          <div className="grid content-start gap-2 text-label">
            <p className="mb-1 text-mute">{t("legal")}</p>
            <Link href="/legal/privacy" className={linkClass}>
              {nav("privacy")}
            </Link>
            <Link href="/legal/terms" className={linkClass}>
              {nav("terms")}
            </Link>
            <Link href="/legal/disclaimer" className={linkClass}>
              {nav("disclaimer")}
            </Link>
            <Link href="/legal/cookies" className={linkClass}>
              {nav("cookies")}
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-3 text-caption text-mute md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl space-y-2">
            <p>{t("disclaimer")}</p>
            <p>{t("trademarks")}</p>
          </div>
          <p className="md:text-right">{t("copyright", { year })}</p>
        </div>
      </div>

      {/* Wordmark, cropped by the page edge. Decorative: the brand is named above. */}
      <div aria-hidden data-wordmark className="relative mt-10 flex select-none items-end gap-[3vw] px-[2vw] md:mt-16">
        <DropMark className="mb-[3.2vw] h-[17vw] shrink-0" />
        <span
          className="block translate-y-[18%] text-[27vw] font-light leading-[0.78] tracking-[-0.06em] text-ink/90"
          style={{ fontVariationSettings: '"wdth" 108' }}
        >
          {t("wordmark")}
        </span>
      </div>
    </footer>
  );
}
