import { Heart, Activity, Apple, ChevronRight } from "lucide-react";

/**
 * Decorative phone mockup. Brand-only — no glucose values, no charts.
 * Used to evoke the app's warmth without rendering any health data.
 */
export function PhoneMockup({
  greeting,
  subline,
  pillLabel,
  cards,
}: {
  greeting: string;
  subline: string;
  pillLabel: string;
  cards: Array<{ icon: "heart" | "activity" | "apple"; label: string; value: string }>;
}) {
  const Icons = { heart: Heart, activity: Activity, apple: Apple };

  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-[280px] md:max-w-[320px]"
    >
      <div
        className="absolute -inset-6 -z-10 rounded-[60px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255, 200, 180, 0.55), rgba(255, 200, 180, 0) 70%)",
        }}
      />
      <div className="rounded-[44px] bg-[#1a1a1a] p-[6px] shadow-[0_30px_80px_-20px_rgba(60,40,30,0.35)] rotate-[-2deg]">
        <div className="rounded-[38px] bg-background overflow-hidden">
          <div className="h-6 bg-background relative flex items-center justify-center">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 h-4 w-20 bg-[#1a1a1a] rounded-full" />
          </div>

          <div className="px-5 pt-6 pb-7 space-y-5">
            <div>
              <p className="text-caption text-muted font-semibold uppercase tracking-wider">
                {pillLabel}
              </p>
              <h3 className="text-display tracking-tight font-bold mt-1 text-foreground leading-tight">
                {greeting}
              </h3>
              <p className="text-label text-muted mt-1">{subline}</p>
            </div>

            <div className="rounded-[var(--radius-card)] bg-accent-soft border border-accent/15 p-4 flex items-center justify-between">
              <div>
                <p className="text-caption font-semibold uppercase tracking-wider text-accent">
                  Beta
                </p>
                <p className="text-label font-semibold text-foreground mt-0.5">
                  Pronto · Verano 2026
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-accent" />
            </div>

            <div className="space-y-2.5">
              {cards.map((card, i) => {
                const Icon = Icons[card.icon];
                return (
                  <div
                    key={i}
                    className="rounded-[var(--radius-card)] bg-card border border-border-subtle p-3.5 flex items-center gap-3"
                  >
                    <span className="inline-flex items-center justify-center h-9 w-9 rounded-[12px] bg-accent-soft text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-caption text-muted">{card.label}</p>
                      <p className="text-label font-semibold text-foreground truncate">
                        {card.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border-subtle px-6 py-3 flex items-center justify-between bg-card/60">
            <div className="h-1.5 w-1.5 rounded-full bg-state-in-range" />
            <div className="h-1 w-24 rounded-full bg-border-subtle" />
            <div className="h-1.5 w-1.5 rounded-full bg-border-subtle" />
          </div>
        </div>
      </div>
    </div>
  );
}
