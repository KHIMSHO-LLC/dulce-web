import type { ReactNode } from "react";
import { Bell, Check, Lock, Minus, Plug, RefreshCw, Sparkles, Users, Watch } from "lucide-react";
import type { CoreLocale } from "@/i18n/routing";
import type { HelpIcon } from "@/content/help";
import { cn } from "@/lib/utils/cn";

const LABELS: Record<CoreLocale, { option: string; pick: string; pros: string; cons: string }> = {
  en: { option: "Option", pick: "Our pick", pros: "Good", cons: "Keep in mind" },
  es: { option: "Opción", pick: "Nuestra elección", pros: "A favor", cons: "Ten en cuenta" },
  de: { option: "Option", pick: "Unsere Wahl", pros: "Gut", cons: "Beachte" },
  fr: { option: "Option", pick: "Notre choix", pros: "Points forts", cons: "À savoir" },
  it: { option: "Opzione", pick: "La nostra scelta", pros: "Pro", cons: "Da sapere" },
};

export const HELP_ICONS: Record<HelpIcon, typeof Watch> = {
  watch: Watch,
  lock: Lock,
  bell: Bell,
  users: Users,
  plug: Plug,
  refresh: RefreshCw,
};

/**
 * One of several ways to do something. `n` numbers it ("Option 1"), `pick` marks the
 * one we recommend. Children: a short description, then <Pros> and <Cons> lists.
 */
export function Option({
  locale,
  n,
  title,
  pick = false,
  children,
}: {
  locale: CoreLocale;
  n?: number;
  title: string;
  pick?: boolean;
  children: ReactNode;
}) {
  const l = LABELS[locale];
  return (
    <section
      className={cn(
        "my-8 rounded-[24px] border p-6 md:p-7 [&>p:first-of-type]:!mt-3",
        pick ? "border-ember/40 bg-ember/[0.06]" : "border-white/10 bg-glass",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {n ? <span className="text-label font-medium uppercase tracking-[0.08em] text-mute">{`${l.option} ${n}`}</span> : null}
        {pick ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ember/15 px-2.5 py-0.5 text-caption font-semibold text-ember">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {l.pick}
          </span>
        ) : null}
      </div>
      {/* h2 so options show in the page outline; PROSE gives h2 a big top margin, undone here. */}
      <h2 className="!mb-0 !mt-2 !text-[1.45rem]">{title}</h2>
      {children}
    </section>
  );
}

function ProsCons({ kind, locale, children }: { kind: "pros" | "cons"; locale: CoreLocale; children: ReactNode }) {
  const Icon = kind === "pros" ? Check : Minus;
  return (
    <div
      className={cn(
        "mt-5",
        "[&_ul]:!mt-2 [&_ul]:!list-none [&_ul]:!space-y-1.5 [&_ul]:!pl-0",
        "[&_li]:relative [&_li]:pl-7",
      )}
    >
      <p className="!mt-0 flex items-center gap-2 !text-label font-semibold !text-ink">
        <Icon className={cn("h-4 w-4", kind === "pros" ? "text-ember" : "text-mute")} aria-hidden />
        {LABELS[locale][kind]}
      </p>
      <div className={cn("[&_li]:before:absolute [&_li]:before:left-2 [&_li]:before:top-0", kind === "pros" ? "[&_li]:before:content-['+']" : "[&_li]:before:content-['–']", "[&_li]:before:text-mute")}>
        {children}
      </div>
    </div>
  );
}

export function Pros({ locale, children }: { locale: CoreLocale; children: ReactNode }) {
  return <ProsCons kind="pros" locale={locale}>{children}</ProsCons>;
}

export function Cons({ locale, children }: { locale: CoreLocale; children: ReactNode }) {
  return <ProsCons kind="cons" locale={locale}>{children}</ProsCons>;
}

/** Where to find something in the app, e.g. <Path>Settings › Alerts</Path>. */
export function Path({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-normal rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-medium text-ink">
      {children}
    </span>
  );
}
