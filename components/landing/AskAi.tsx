import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "Ask an AI about Dulce": opens the visitor's assistant with a prompt that
 * points it at our site and llms.txt, so the answer comes from what we publish.
 */
export async function AskAi() {
  const t = await getTranslations("home.ai");
  const q = encodeURIComponent(t("prompt"));
  const assistants = [
    { name: "ChatGPT", url: `https://chatgpt.com/?q=${q}` },
    { name: "Claude", url: `https://claude.ai/new?q=${q}` },
    { name: "Perplexity", url: `https://www.perplexity.ai/search?q=${q}` },
  ];

  return (
    <section aria-labelledby="ai-title" className="relative z-10 pb-6 pt-2 md:pb-10">
      <Reveal className="container-page">
        <div data-fade className="rounded-[28px] border border-white/8 bg-glass p-7 md:flex md:items-center md:justify-between md:gap-10 md:p-10">
          <div>
            <h2 id="ai-title" className="text-[1.6rem] font-light tracking-[-0.02em] text-ink">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-[48ch] text-label leading-relaxed text-soft">{t("body")}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
            {assistants.map((a) => (
              <a
                key={a.name}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-5 py-2.5 text-label font-medium text-ink transition-colors hover:border-white/30 hover:bg-white/5"
              >
                {a.name}
                <ArrowUpRight aria-hidden className="h-4 w-4 text-mute" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
