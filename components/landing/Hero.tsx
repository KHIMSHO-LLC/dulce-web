import { getLocale, getTranslations } from "next-intl/server";
import { ArrowDownRight } from "lucide-react";
import { FluidLayer } from "@/components/fx/FluidLayer";
import { TiltCard } from "@/components/fx/TiltCard";
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
 * First viewport, composed like the reference: headline top-left, wordmark
 * top-right, copy and action bottom-left, the founder card and Watch tile
 * bottom-right, all anchored to the viewport edges. The 3D phone (components/
 * three) stands in the centre column, leaning, running off the bottom edge.
 */
export async function Hero() {
  const locale = (await getLocale()) as ScreenLocale;
  const t = await getTranslations("home.hero");
  const headline = `${t("line1")}\n${t("line2")}`;
  const glyphAfter = Number(t.raw("glyphAfter"));

  return (
    <section id={SECTION.top} data-mood="ember" className="relative z-10 h-[100vh] min-h-[640px]">
      <Reveal on="intro" className="flex h-full flex-col justify-between px-5 pb-[104px] pt-5 md:px-[3vw] md:pb-8 md:pt-6">
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
            className="type-display max-w-[11ch] text-[clamp(2.6rem,7.2vw,8.6rem)] text-ink md:max-w-none"
          />
          <div className="hidden shrink-0 items-center gap-3 pt-2 md:flex" data-fade>
            <LanguageSwitcher />
            <span
              translate="no"
              className="text-[1.75rem] font-normal tracking-[-0.03em] text-ink"
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
          className="pointer-events-none absolute left-1/2 top-[30%] w-[clamp(170px,40vw,230px)] -translate-x-1/2 rotate-[-5deg] md:top-[26%] md:w-[clamp(240px,22vw,340px)] md:rotate-[8deg]"
        >
          <DeviceFrame name="home" locale={locale} label={t("phoneAlt")} />
        </div>

        <div className="grid items-end gap-6 md:grid-cols-[minmax(0,26rem)_1fr_auto]">
          <div className="space-y-6" data-fade>
            <p className="max-w-[34ch] text-[1.0625rem] leading-relaxed text-soft md:text-[1.125rem]">{t("sub")}</p>
            <div className="flex items-center gap-3">
              <DownloadButton label={t("cta")} campaign="web_hero" />
              <QrButton openLabel={t("qrOpen")} caption={t("qrCaption")} className="hidden md:block" />
            </div>
          </div>

          <div className="hidden md:block" />

          <div className="hidden items-end gap-3 md:flex" data-fade>
            <TiltCard className="glass w-[min(19rem,22vw)] rounded-[28px] p-5">
              <p className="text-label leading-relaxed text-soft" data-depth="0.5">
                {t("made")}
              </p>
              <div className="mt-4" data-depth="1">
                <AppStoreBadge campaign="web_hero" locale={locale} className="origin-left scale-[0.84]" />
              </div>
            </TiltCard>

            {/* The Watch tile: a live 3D watch that turns to the pointer, in smoke. */}
            <TiltCard max={5} glare={false} className="h-[9.5rem] w-[7.4rem] rounded-[28px]">
              <a
                href={`#${SECTION.watch}`}
                aria-label={t("watchTile")}
                className="group relative block h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#120d0b]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(80% 70% at 50% 60%, rgba(243,102,56,0.35), rgba(243,102,56,0) 70%)" }}
                />
                <FluidLayer intensity={0.9} />
                <span data-anchor="tile" aria-hidden className="absolute inset-0" />
                <span data-webgl-fallback aria-hidden className="absolute inset-x-3 top-3 overflow-hidden rounded-[16px]">
                  <ScreenCanvas name="watch" locale={locale} label="" live />
                </span>
                <span className="absolute bottom-2 right-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-ink text-ground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-45deg] group-hover:scale-110">
                  <ArrowDownRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </span>
              </a>
            </TiltCard>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
