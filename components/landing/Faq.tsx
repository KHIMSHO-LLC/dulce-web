import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { COMMUNITY_GROUP_URL, CONTACT_EMAIL, SECTION, SOCIAL } from "@/lib/site";
import { SocialIcon } from "@/components/site/SocialIcon";
import { ContactDisclosure } from "./ContactDisclosure";
import { Marquee } from "./Marquee";

export type FaqItem = { q: string; a: string; link?: string };

/** Questions, with the contact form folded in for anything left over. */
export async function Faq() {
  const t = await getTranslations("home.faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section id={SECTION.faq} data-mood="dusk" aria-labelledby="faq-title" className="relative z-10 py-12 md:py-20">
      <h2 id="faq-title" className="sr-only">
        {t("marquee")}
      </h2>
      <Marquee text={t("marquee")} />

      <Reveal className="container-page mt-10 grid gap-12 md:mt-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-20">
        <div id={SECTION.contact} className="scroll-mt-24 space-y-6">
          <p data-fade className="max-w-[34ch] text-[1.125rem] leading-relaxed text-soft">
            {t("intro")}
          </p>
          <div data-fade>
            <ContactDisclosure openLabel={t("contact")} closeLabel={t("contactClose")} />
          </div>
          <p data-fade className="text-label text-soft">
            {t("emailLabel")}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-soft underline decoration-white/25 transition-colors hover:text-ink">
              {CONTACT_EMAIL}
            </a>
          </p>

          <div data-fade className="glass mt-4 max-w-md rounded-[28px] p-6 md:p-7">
            <p className="text-[1.25rem] font-light tracking-[-0.01em] text-ink" style={{ fontVariationSettings: '"wdth" 102' }}>
              {t("community.title")}
            </p>
            <p className="mt-2 text-body leading-relaxed text-soft">{t("community.body")}</p>
            <a
              href={COMMUNITY_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-12 items-center gap-2.5 rounded-full bg-ember px-6 text-body font-semibold text-ember-ink transition-colors hover:bg-ember-hi"
            >
              <SocialIcon name="facebook" className="h-[18px] w-[18px]" />
              {t("community.cta")}
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/10 pt-5">
              <span className="text-label text-mute">{t("community.follow")}</span>
              <div className="flex gap-1">
                {SOCIAL.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="grid h-10 w-10 place-items-center rounded-full text-soft transition-colors hover:bg-white/8 hover:text-ink"
                  >
                    <SocialIcon name={s.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div data-fade>
          {items.map((item) => (
            <details key={item.q} data-faq className="group border-t border-white/12 last:border-b">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span
                  className="text-[clamp(1.2rem,1.7vw,1.5rem)] font-light tracking-[-0.015em] text-ink"
                  style={{ fontVariationSettings: '"wdth" 102' }}
                >
                  {item.q}
                </span>
                <Plus
                  className="mt-1 h-5 w-5 shrink-0 text-mute transition-transform duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:text-ember"
                  strokeWidth={1.6}
                  aria-hidden
                />
              </summary>
              <div className="pb-7 pr-10">
                <p className="max-w-[60ch] text-body leading-relaxed text-soft">{item.a}</p>
                {item.link ? (
                  <Link href="/setup" className="mt-3 inline-block text-label font-semibold text-ember hover:text-ember-hi">
                    {item.link}
                  </Link>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
