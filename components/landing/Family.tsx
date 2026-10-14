import { getLocale, getTranslations } from "next-intl/server";
import { TiltCard } from "@/components/fx/TiltCard";
import { Parallax } from "@/components/motion/Parallax";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { DeviceFrame } from "@/components/screens/DeviceFrame";
import type { ScreenName } from "@/components/screens/draw";
import type { ScreenLocale } from "@/components/screens/strings";
import { SECTION } from "@/lib/site";
import { DragCarousel } from "./DragCarousel";

type Card = { title: string; body: string; screen: ScreenName; alt: string };

/** Each card's field: ember, night, dusk, deep rose. */
const FIELDS = [
  "radial-gradient(90% 70% at 30% 100%, rgba(243,102,56,0.75), rgba(243,102,56,0) 70%), #1a1310",
  "radial-gradient(90% 70% at 70% 100%, rgba(92,72,150,0.6), rgba(92,72,150,0) 70%), #100f15",
  "radial-gradient(90% 70% at 50% 100%, rgba(255,138,92,0.55), rgba(120,40,30,0) 70%), #160f0d",
  "radial-gradient(90% 70% at 40% 100%, rgba(170,45,70,0.6), rgba(170,45,70,0) 70%), #140c10",
];

/** Who Dulce is for, read as one sentence, then thrown sideways as cards. */
export async function Family() {
  const locale = (await getLocale()) as ScreenLocale;
  const t = await getTranslations("home.family");
  const cards = t.raw("cards") as Card[];

  return (
    <section id={SECTION.family} data-mood="rose" className="relative z-10 overflow-x-clip py-16 md:py-24">
      <div className="container-page">
        <ScrubWords
          as="h2"
          text={t("lead")}
          className="type-display max-w-[24ch] text-[clamp(2rem,4.6vw,4.5rem)] leading-[1.04] text-ink"
        />
      </div>
      <div className="mt-12 pl-5 md:mt-16 md:pl-8 xl:pl-[3vw]">
        <Parallax y={0} x={-220}>
        <DragCarousel dragLabel={t("drag")} prevLabel={t("prev")} nextLabel={t("next")}>
          {cards.map((card, i) => (
            <article key={card.title} className="w-[min(78vw,22rem)] shrink-0 select-none">
              <TiltCard
                className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/8"
                max={6}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-data-[hover]/tilt:scale-[1.06]" style={{ background: FIELDS[i % FIELDS.length] }} />
                <div className="absolute left-1/2 top-[12%] w-[64%] -translate-x-1/2" data-depth="1.2">
                  <DeviceFrame name={card.screen} locale={locale} label={card.alt} />
                </div>
              </TiltCard>
              <h3 className="mt-5 text-[1.5rem] font-light tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"wdth" 104' }}>
                {card.title}
              </h3>
              <p className="mt-2 max-w-[32ch] text-body text-soft">{card.body}</p>
            </article>
          ))}
        </DragCarousel>
        </Parallax>
        <p className="mt-6 max-w-[60ch] pr-5 text-label text-soft">{t("pro")}</p>
      </div>
    </section>
  );
}
