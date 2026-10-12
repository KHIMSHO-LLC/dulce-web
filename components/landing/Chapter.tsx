import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { DeviceFrame } from "@/components/screens/DeviceFrame";
import type { ScreenName } from "@/components/screens/draw";
import type { ScreenLocale } from "@/components/screens/strings";
import { cn } from "@/lib/utils/cn";

/**
 * One stop on the phone's journey. The section is tall (its height is scroll
 * time for the 3D choreography in components/three/Stage.tsx); its copy is
 * sticky while the phone turns beside it.
 */
export function Chapter({
  id,
  heightClass,
  title,
  body,
  extra,
  layout = "bottom",
  locale,
  screen,
  screenAlt,
  progress,
}: {
  id: string;
  heightClass: string;
  title: string;
  body: string;
  extra?: ReactNode;
  /** "bottom": copy sits low-left. "split": title top-left, body low-left. */
  layout?: "bottom" | "split";
  locale: ScreenLocale;
  screen: ScreenName;
  screenAlt: string;
  progress?: number;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("relative z-10", heightClass)}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Reveal
          start="top 70%"
          className={cn(
            "container-page flex h-full flex-col pb-[108px] md:pb-14",
            layout === "split" ? "justify-between pt-20 md:pt-16" : "justify-end",
          )}
        >
          <Split
            id={`${id}-title`}
            text={title}
            className="type-display text-[clamp(2.5rem,6.4vw,6.6rem)] text-ink"
          />
          <div className={cn("max-w-[34rem] space-y-5", layout === "bottom" && "mt-6 md:mt-8")}>
            <p data-fade className="max-w-[38ch] text-[1.0625rem] leading-relaxed text-soft md:text-[1.125rem]">
              {body}
            </p>
            {extra ? <div data-fade>{extra}</div> : null}
          </div>
        </Reveal>

        {/* Static stand-in for the 3D phone */}
        <div
          data-webgl-fallback
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 top-[10%] w-[clamp(150px,36vw,220px)] -translate-x-1/2 md:left-auto md:right-[14%] md:top-[12%] md:w-[clamp(220px,20vw,300px)] md:translate-x-0",
            screen === "standby" && "md:right-[22%] md:top-[30%] md:rotate-[-90deg]",
          )}
        >
          <DeviceFrame name={screen} locale={locale} label={screenAlt} progress={progress} />
        </div>
      </div>
    </section>
  );
}
