import { getTranslations } from "next-intl/server";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { DropMark } from "@/components/site/DropMark";
import { SECTION } from "@/lib/site";

/** The reason Dulce exists, in the founder's words, lit as you read. */
export async function Founder() {
  const t = await getTranslations("home.founder");
  return (
    <section id={SECTION.founder} aria-labelledby="founder-name" className="relative z-10 py-24 md:py-40">
      <div className="container-page">
        <figure className="max-w-[60rem]">
          <blockquote>
            <ScrubWords
              text={`“${t("quote")}”`}
              className="type-display text-[clamp(1.9rem,4vw,3.9rem)] leading-[1.08] text-ink"
            />
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-4">
            <DropMark className="h-11" />
            <span>
              <span id="founder-name" className="block text-body font-semibold text-ink">
                {t("name")}
              </span>
              <span className="block text-label text-mute">{t("role")}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
