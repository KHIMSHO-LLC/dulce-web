import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { SECTION, YOUTUBE_DEMO_ID } from "@/lib/site";
import { VideoPlayer } from "./VideoPlayer";

/** The app in motion: our YouTube walkthrough, loaded only when played. */
export async function VideoDemo() {
  const t = await getTranslations("home.video");
  return (
    <section id={SECTION.video} data-mood="dusk" aria-labelledby="video-title" className="relative z-10 py-16 md:py-24">
      <Reveal className="container-page">
        <Split id="video-title" text={t("title")} className="type-display text-[clamp(2.5rem,6vw,6rem)] text-ink" />
        <p data-fade className="mt-5 max-w-[46ch] text-body leading-relaxed text-soft">
          {t("sub")}
        </p>
        <div data-fade className="mt-10 md:mt-14">
          <VideoPlayer id={YOUTUBE_DEMO_ID} poster="/video/demo-poster.webp" title={t("title")} playLabel={t("play")} />
        </div>
        <p data-fade className="mt-3 text-caption text-mute">
          {t("note")}
        </p>
      </Reveal>
    </section>
  );
}
