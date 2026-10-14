import { getLocale, getTranslations } from "next-intl/server";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { SECTION } from "@/lib/site";

/** The real close: install on iPhone, or leave an email for Android. */
export async function DownloadCta() {
  const locale = (await getLocale()) as "es" | "en";
  const t = await getTranslations("home.download");

  return (
    <section id={SECTION.download} data-mood="ember" aria-labelledby="download-title" className="relative z-10 py-16 md:py-28">
      <Reveal className="container-page text-center">
        <Parallax y={90} scale={[0.92, 1.04]}>
          <Split
            id="download-title"
            text={t("title")}
            className="type-display mx-auto text-[clamp(3rem,9.4vw,10rem)] text-ink"
          />
        </Parallax>
        <p data-fade className="mx-auto mt-8 max-w-[40ch] text-[1.125rem] leading-relaxed text-soft">
          {t("sub")}
        </p>
        <div data-fade className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <AppStoreBadge campaign="web_final" locale={locale} />
          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-[14px] bg-[#f6f0ea] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/appstore-qr.svg" alt="" width={76} height={76} className="h-[76px] w-[76px]" />
            </div>
            <span className="max-w-[12ch] text-left text-label text-mute">{t("qr")}</span>
          </div>
        </div>

        <div data-fade className="mx-auto mt-16 max-w-md text-left">
          <p className="mb-3 text-label font-semibold text-soft">{t("android")}</p>
          <WaitlistForm source="android" variant="inline" />
        </div>
      </Reveal>
    </section>
  );
}
