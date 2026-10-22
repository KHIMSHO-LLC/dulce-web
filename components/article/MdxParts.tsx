import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight, Info, TriangleAlert } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { ARTICLES } from "@/content/articles";
import { appStoreUrl, type StoreCampaign } from "@/lib/appStore";
import { cn } from "@/lib/utils/cn";

/** A screenshot or picture with a caption. Images live in /public/guides. */
export function Figure({
  src,
  alt,
  caption,
  width = 1400,
  height = 3034,
  narrow = true,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  /** Phone screenshots read best narrow; set false for wide images. */
  narrow?: boolean;
}) {
  return (
    <figure className={cn("my-10", narrow && "max-w-[320px]")}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={narrow ? "320px" : "(min-width: 768px) 680px, 100vw"}
        className="h-auto w-full rounded-[22px] border border-white/8"
      />
      {caption ? <figcaption className="mt-3 text-caption leading-relaxed text-mute">{caption}</figcaption> : null}
    </figure>
  );
}

/** A highlighted note. `warning` is for safety-relevant information. */
export function Callout({ type = "note", children }: { type?: "note" | "warning"; children: ReactNode }) {
  const Icon = type === "warning" ? TriangleAlert : Info;
  return (
    <aside
      className={cn(
        "my-8 flex gap-3 rounded-[18px] border px-5 py-4 [&_p]:mt-0 [&_p+p]:mt-2",
        type === "warning" ? "border-ember/35 bg-ember/10" : "border-white/10 bg-glass",
      )}
    >
      <Icon className={cn("mt-1 h-4 w-4 shrink-0", type === "warning" ? "text-ember" : "text-mute")} aria-hidden />
      <div>{children}</div>
    </aside>
  );
}

const CTA_COPY: Record<AppLocale, { title: string; body: string; button: string }> = {
  es: {
    title: "Pruébalo en tu iPhone",
    body: "Dulce es gratis en la App Store. Las funciones Pro tienen 14 días de prueba gratis.",
    button: "Descargar Dulce gratis",
  },
  en: {
    title: "Try it on your iPhone",
    body: "Dulce is free on the App Store. Pro features come with a 14-day free trial.",
    button: "Download Dulce free",
  },
  de: {
    title: "Probier es auf deinem iPhone",
    body: "Dulce ist kostenlos im App Store. Pro-Funktionen kannst du 14 Tage kostenlos testen.",
    button: "Dulce kostenlos laden",
  },
};

/** The install call to action. Placed mid-article and at the end. */
export function AppCta({ locale, campaign, title }: { locale: AppLocale; campaign: StoreCampaign; title?: string }) {
  const copy = CTA_COPY[locale];
  return (
    <aside className="my-10 rounded-[24px] border border-ember/25 bg-ember/[0.07] p-6 md:p-7">
      <p className="text-[1.15rem] font-medium text-ink">{title ?? copy.title}</p>
      <p className="mt-1 text-label leading-relaxed text-soft">{copy.body}</p>
      <a
        href={appStoreUrl(campaign)}
        className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-ember pl-5 pr-4 text-label font-semibold text-ember-ink no-underline transition-colors hover:bg-ember-hi"
      >
        {copy.button}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    </aside>
  );
}

/** Link to another article by id; resolves the slug for the current language. */
export function ArticleLink({ locale, to, children }: { locale: AppLocale; to: string; children: ReactNode }) {
  const target = ARTICLES.find((a) => a.id === to);
  if (!target) throw new Error(`ArticleLink: unknown article "${to}"`);
  return (
    <Link href={{ pathname: "/blog/[slug]", params: { slug: target.slug[locale] } }}>
      {children}
    </Link>
  );
}

/** Link to a non-article page of the site. */
export function PageLink({
  to,
  children,
}: {
  locale: AppLocale;
  to: "/setup" | "/tools/glucose-converter" | "/tools/a1c-calculator" | "/legal/disclaimer";
  children: ReactNode;
}) {
  return (
    <Link href={to}>
      {children}
    </Link>
  );
}

/** Numbered how-to steps. Each child <Step> is one step. */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="!list-none !pl-0 [counter-reset:step]">{children}</ol>;
}

export function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="relative mt-6 pl-12 [counter-increment:step] before:absolute before:left-0 before:top-0 before:flex before:h-8 before:w-8 before:items-center before:justify-center before:rounded-full before:bg-ember/15 before:text-label before:font-semibold before:text-ember before:content-[counter(step)]">
      <p className="!mt-0 font-medium text-ink">{title}</p>
      <div className="[&>p:first-child]:!mt-1">{children}</div>
    </li>
  );
}
