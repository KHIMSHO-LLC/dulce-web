import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

import shotWidgets from "@/public/screenshots/widgets.png";
import shotLiveActivity from "@/public/screenshots/live-activity.png";
import shotLockScreen from "@/public/screenshots/lock-screen.png";
import shotFollowers from "@/public/screenshots/followers.png";
import shotLogbook from "@/public/screenshots/logbook.png";
import watchFace from "@/public/screenshots/watch-1.png";
import watchApp from "@/public/screenshots/watch-2.png";
import watchChart from "@/public/screenshots/watch-3.png";

const PHONE_SHOTS = [
  { key: "lockScreen", image: shotLockScreen, offset: "md:translate-y-10" },
  { key: "widgets", image: shotWidgets, offset: "" },
  { key: "liveActivity", image: shotLiveActivity, offset: "md:translate-y-16" },
  { key: "followers", image: shotFollowers, offset: "md:translate-y-6" },
  { key: "logbook", image: shotLogbook, offset: "md:-translate-y-4" },
] as const;

const WATCH_SHOTS = [
  { key: "watchFace", image: watchFace, rotate: "-rotate-3" },
  { key: "watchApp", image: watchApp, rotate: "rotate-0 md:-translate-y-4" },
  { key: "watchChart", image: watchChart, rotate: "rotate-3" },
] as const;

export function AppShowcase() {
  const t = useTranslations("home.showcase");

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-24 -z-10 h-[520px] opacity-70"
        style={{
          background:
            "radial-gradient(50% 55% at 30% 40%, rgba(255, 190, 160, 0.35), transparent 70%), radial-gradient(45% 50% at 75% 55%, rgba(255, 210, 170, 0.30), transparent 70%)",
        }}
      />

      <div className="container-page">
        <Reveal className="max-w-2xl mb-12 md:mb-16">
          <p className="text-caption font-semibold uppercase tracking-wider text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
            {t("title")}
          </h2>
          <p className="mt-4 text-headline text-muted leading-snug">{t("subtitle")}</p>
        </Reveal>

        {/* Phone screenshots — staggered editorial grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:gap-10 pb-10 md:pb-24">
          {PHONE_SHOTS.map((shot, i) => (
            <Reveal
              key={shot.key}
              delay={(i % 3) * 120}
              className={`${shot.offset} ${i === 4 ? "col-span-2 max-w-sm mx-auto md:mx-0 md:col-span-1 md:max-w-none" : ""}`}
            >
              <div className="screenshot-card bg-[#0b0b0b]">
                <Image
                  src={shot.image}
                  alt={t(`shots.${shot.key}`)}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                  className="w-full h-auto"
                />
              </div>
            </Reveal>
          ))}

          {/* Watch trio fills the sixth grid cell */}
          <Reveal delay={240} className="col-span-2 md:col-span-1 md:translate-y-8">
            <div className="h-full rounded-[28px] bg-warm-gradient border border-accent/15 p-6 flex flex-col justify-center">
              <p className="text-headline font-bold tracking-tight text-foreground">
                {t("watchTitle")}
              </p>
              <p className="text-label text-muted mt-2 leading-relaxed">
                {t("watchBody")}
              </p>
              <div className="mt-6 flex items-end justify-center gap-3">
                {WATCH_SHOTS.map((w) => (
                  <div
                    key={w.key}
                    className={`screenshot-card !rounded-[22px] w-[30%] bg-black ${w.rotate}`}
                  >
                    <Image
                      src={w.image}
                      alt={t(`shots.${w.key}`)}
                      sizes="120px"
                      placeholder="blur"
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
