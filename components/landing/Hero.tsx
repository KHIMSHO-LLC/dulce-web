import { getLocale, getTranslations } from "next-intl/server";
import { ArrowDownRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { DeviceFrame } from "@/components/screens/DeviceFrame";
import { ScreenCanvas } from "@/components/screens/ScreenCanvas";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { DownloadButton } from "@/components/site/DownloadButton";
import { DropMark } from "@/components/site/DropMark";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { QrButton } from "@/components/site/QrButton";
import { SECTION } from "@/lib/site";
import type { ScreenLocale } from "@/components/screens/strings";

/**
 * First viewport. The 3D phone (components/three) floats centre-right over
 * this layout; the static frame below stands in for it without WebGL.
 */
export async function Hero() {
  const locale = (await getLocale()) as ScreenLocale;
  const t = await getTranslations("home.hero");
  const headline = `${t("line1")}\n${t("line2")}`;
  const glyphAfter = Number(t.raw("glyphAfter"));

  return (
    <section id={SECTION.top} className="relative z-10 h-[100vh] min-h-[640px]">
      <Reveal on="intro" className="container-page flex h-full flex-col justify-between pb-[104px] pt-5 md:pb-8 md:pt-7">
        <div className="flex items-start justify-between gap-6">
          <Split
            as="h1"
            text={headline}
            slotAfter={glyphAfter}
            slot={
              <span data-fade className="inline-block align-middle">
                <DropMark className="relative -top-[0.04em] mx-[0.04em] h-[0.78em]" priority />
              </span>
            }
            className="type-display max-w-[11ch] text-[clamp(2.6rem,6.1vw,6.6rem)] text-ink md:max-w-none"
          />
          <div className="hidden shrink-0 items-center gap-3 pt-2 md:flex" data-fade>
            <LanguageSwitcher />
            <span
              className="text-[1.6rem] font-normal tracking-[-0.03em] text-ink"
              style={{ fontVariationSettings: '"wdth" 108' }}
            >
              dulce
            </span>
          </div>
        </div>

        {/* Static stand-in for the 3D phone */}
        <div
          data-webgl-fallback
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[30%] w-[clamp(170px,40vw,230px)] -translate-x-1/2 rotate-[-5deg] md:left-[58%] md:top-[13%] md:w-[clamp(230px,21vw,320px)]"
        >
          <DeviceFrame name="home" locale={locale} label={t("phoneAlt")} />
        </div>

        <div className="grid items-end gap-6 md:grid-cols-[minmax(0,30rem)_1fr_auto]">
          <div className="space-y-6" data-fade>
            <p className="max-w-[36ch] text-[1.0625rem] leading-relaxed text-soft md:text-[1.125rem]">{t("sub")}</p>
            <div className="flex items-center gap-3">
              <DownloadButton label={t("cta")} campaign="web_hero" />
              <QrButton openLabel={t("qrOpen")} caption={t("qrCaption")} className="hidden md:block" />
            </div>
          </div>

          <div className="hidden md:block" />

          <div className="hidden items-end gap-3 md:flex" data-fade>
            <div className="glass w-[min(19rem,26vw)] rounded-[24px] p-5">
              <p className="text-label leading-relaxed text-soft">{t("made")}</p>
              <div className="mt-4">
                <AppStoreBadge campaign="web_hero" locale={locale} className="origin-left scale-[0.84]" />
              </div>
            </div>
            <a
              href={`#${SECTION.watch}`}
              aria-label={t("watchTile")}
              className="group relative block h-[8.6rem] w-[6.6rem] overflow-hidden rounded-[24px] border border-white/10 bg-black"
            >
              <div className="absolute inset-x-2.5 top-3 overflow-hidden rounded-[16px]">
                <ScreenCanvas name="watch" locale={locale} label="" live />
              </div>
              <span className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-ink text-ground transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:rotate-[-45deg]">
                <ArrowDownRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
