import type { ComponentType, SVGProps } from "react";
import { BellRing, Camera, Car, FileText, HeartPulse, History, Smartphone, Users, Watch } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Item = { id: string; title: string; body: string };
type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const ICONS: Record<string, Icon> = {
  lockScreen: Smartphone,
  watch: Watch,
  garmin: Watch,
  carPlay: Car,
  family: Users,
  scan: Camera,
  history: History,
  health: HeartPulse,
  report: FileText,
  alerts: BellRing,
};

/**
 * The Dulce Pro feature rows (messages `pro.proItems`), shared by the home page plan card and the /pro page
 * so the two never disagree. `wide` lays the rows out in two columns from md up (the full-width /pro card).
 */
export async function ProFeatureList({ wide = false }: { wide?: boolean }) {
  const t = await getTranslations("pro");
  const items = t.raw("proItems") as Item[];

  return (
    <ul className={`mt-7 grid gap-x-10 gap-y-6 ${wide ? "md:grid-cols-2" : ""}`}>
      {items.map((item) => {
        const Icon = ICONS[item.id] ?? Smartphone;
        return (
          <li key={item.id} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ember/25 bg-ember/10">
              <Icon aria-hidden className="h-5 w-5 text-ember-hi" />
            </span>
            <span className="min-w-0">
              <span className="block text-[1.05rem] font-medium leading-snug text-ink">{item.title}</span>
              <span className="mt-1 block text-label leading-relaxed text-soft">{item.body}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
