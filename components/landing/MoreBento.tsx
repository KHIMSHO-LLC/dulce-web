import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FluidLayer } from "@/components/fx/FluidLayer";
import { TiltCard } from "@/components/fx/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { DeviceFrame } from "@/components/screens/DeviceFrame";
import type { ScreenLocale } from "@/components/screens/strings";
import { SECTION } from "@/lib/site";
import { NudgeDemo } from "./NudgeDemo";

/**
 * Five things that did not get a chapter, each in its own tile and material:
 * family (interactive), widgets (device), time in range (data), sensors
 * (setup path), privacy (a promise).
 */
export async function MoreBento() {
  const locale = (await getLocale()) as ScreenLocale;
  const t = await getTranslations("home.more");

  const tir = [
    { key: "low", pct: 4, color: "bg-low", text: "text-low-text" },
    { key: "range", pct: 86, color: "bg-range", text: "text-range-text" },
    { key: "high", pct: 10, color: "bg-high", text: "text-high-text" },
  ] as const;

  return (
    <section id={SECTION.more} data-mood="plum" aria-labelledby="more-title" className="relative z-10 py-16 md:py-24">
      <Reveal className="container-page">
        <Split id="more-title" text={t("title")} className="type-display text-[clamp(2.5rem,6vw,6rem)] text-ink" />

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-6 md:grid-rows-[auto_auto_auto]">
          {/* Family: the interactive tile, with the followers screen rising from the bottom edge */}
          <div data-fade className="md:col-span-4 md:row-span-2">
          <TiltCard as="article" max={4} className="h-full overflow-hidden rounded-[28px] border border-white/8">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 90% at 85% 100%, rgba(243,102,56,0.5), rgba(243,102,56,0) 65%), linear-gradient(160deg, #201713, #120e0c)",
              }}
            />
            <FluidLayer intensity={0.7} />
            <div className="relative grid h-full md:min-h-[30rem] md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
              <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
                <div>
                  <h3 className="type-display text-[clamp(1.9rem,3.4vw,3.2rem)] text-ink">{t("family.title")}</h3>
                  <p className="mt-4 max-w-[36ch] text-body leading-relaxed text-soft">{t("family.body")}</p>
                  <p className="mt-3 text-label font-semibold text-ember-hi">{t("family.pro")}</p>
                </div>
                <NudgeDemo
                  from={t("family.from")}
                  incoming={t("family.incoming")}
                  question={t("family.question")}
                  reply={t("family.reply")}
                  sent={t("family.sent")}
                  again={t("family.again")}
                />
              </div>
              <div className="relative hidden md:block">
                <div className="absolute left-[8%] top-[14%] w-[78%] rotate-[3deg]" data-depth="1.4">
                  <DeviceFrame name="followers" locale={locale} label={t("family.title")} />
                </div>
              </div>
            </div>
          </TiltCard>
          </div>

          {/* Widgets: the device, cropped */}
          <div data-fade className="md:col-span-2">
          <TiltCard
            as="article"
            className="h-full min-h-[20rem] overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,#1b1512,#0f0c0b)]"
          >
            <div className="relative z-10 p-7">
              <h3 className="text-[1.5rem] font-light tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"wdth" 104' }}>
                {t("widgets.title")}
              </h3>
              <p className="mt-2 max-w-[24ch] text-label leading-relaxed text-soft">{t("widgets.body")}</p>
            </div>
            <div className="absolute left-[15%] top-[44%] w-[70%] rotate-[-4deg] transition-transform duration-700 ease-[var(--ease-out-expo)] group-data-[hover]/tilt:-translate-y-6 group-data-[hover]/tilt:rotate-[-1deg]">
              <DeviceFrame name="widgets" locale={locale} label={t("widgets.title")} />
            </div>
          </TiltCard>
          </div>

          {/* Time in range: the data tile */}
          <div data-fade className="md:col-span-2">
          <TiltCard as="article" className="h-full rounded-[28px] border border-white/8 bg-[#0f1410] p-7">
            <h3 className="text-[1.5rem] font-light tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"wdth" 104' }}>
              {t("tir.title")}
            </h3>
            <p className="mt-2 text-label text-soft">{t("tir.body")}</p>
            <p className="type-numeral mt-6 text-[4.2rem] leading-none text-range-text">86%</p>
            <div className="mt-5 flex h-3 gap-[3px]" role="img" aria-label={`${t("tir.low")} 4%, ${t("tir.range")} 86%, ${t("tir.high")} 10%`}>
              {tir.map((s) => (
                <span
                  key={s.key}
                  className={`${s.color} h-full origin-left rounded-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-data-[hover]/tilt:scale-y-150`}
                  style={{ width: `${s.pct}%` }}
                />
              ))}
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-caption">
              {tir.map((s) => (
                <li key={s.key} className={s.text}>
                  {t(`tir.${s.key}`)} {s.pct}%
                </li>
              ))}
            </ul>
            <p className="mt-4 text-caption text-mute">{t("tir.sample")}</p>
          </TiltCard>
          </div>

          {/* Sensors: the setup path */}
          <div data-fade className="md:col-span-3">
          <TiltCard as="article" max={4} className="h-full rounded-[28px] border border-white/8 bg-glass p-7">
            <h3 className="text-[1.5rem] font-light tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"wdth" 104' }}>
              {t("sensors.title")}
            </h3>
            <p className="mt-2 max-w-[40ch] text-body leading-relaxed text-soft">{t("sensors.body")}</p>
            <Link
              href="/setup"
              className="mt-6 inline-flex items-center gap-2 text-label font-semibold text-ember transition-colors hover:text-ember-hi"
            >
              {t("sensors.link")}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </TiltCard>
          </div>

          {/* Privacy: the promise, the one light tile */}
          <div data-fade className="md:col-span-3">
          <TiltCard as="article" max={4} className="h-full overflow-hidden rounded-[28px] bg-[#f3ece4] p-7 text-[#1b1714]">
            <ShieldCheck className="h-7 w-7 text-ember-deep" strokeWidth={1.5} aria-hidden />
            <h3 className="mt-5 text-[1.5rem] font-light tracking-[-0.02em]" style={{ fontVariationSettings: '"wdth" 104' }}>
              {t("privacy.title")}
            </h3>
            <p className="mt-2 max-w-[40ch] text-body leading-relaxed text-[#4a413a]">{t("privacy.body")}</p>
          </TiltCard>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
