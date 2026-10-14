import { getTranslations } from "next-intl/server";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { RollingNumber } from "@/components/motion/RollingNumber";

/** One true number: readings arrive every minute, so up to 1,440 a day. */
export async function ReadingsCounter() {
  const t = await getTranslations("home.counter");
  return (
    <section aria-labelledby="counter-title" data-mood="range" className="relative z-10 py-20 md:py-28">
      <Reveal className="container-page text-center">
        <Parallax y={120} scale={[0.86, 1.06]}>
        <h2 id="counter-title" className="type-display text-[clamp(3.4rem,12vw,13rem)] text-ink">
          <span className="block" data-fade>
            {t("prefix")}{" "}
            <RollingNumber
              value={t("value")}
              label={t("value")}
              className="text-range-text"
            />
          </span>
          <span className="block text-[0.42em] tracking-[-0.03em] text-soft" data-fade>
            {t("unit")}
          </span>
        </h2>
        </Parallax>
        <p data-fade className="mx-auto mt-8 max-w-[42ch] text-[1.125rem] leading-relaxed text-soft md:text-[1.25rem]">
          {t("body")}
        </p>
        <p data-fade className="mt-5 text-label text-soft">
          {t("note")}
        </p>
      </Reveal>
    </section>
  );
}
