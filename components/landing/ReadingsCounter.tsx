import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { RollingNumber } from "@/components/motion/RollingNumber";

/** One true number: readings arrive every minute, so up to 1,440 a day. */
export async function ReadingsCounter() {
  const t = await getTranslations("home.counter");
  return (
    <section aria-labelledby="counter-title" className="relative z-10 py-28 md:py-44">
      <Reveal className="container-page text-center">
        <h2 id="counter-title" className="type-display text-[clamp(3.4rem,11vw,11rem)] text-ink">
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
