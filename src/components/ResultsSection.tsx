import { Factory, HardHat, Sparkles, Store } from "lucide-react";
import type { FooterProps } from "../interface/t";
import { RevealItem, RevealStagger } from "./RevealStagger";

const ResultsSection = ({ t }: FooterProps) => {
  const stories = [
    {
      key: "manufacturing",
      icon: Factory,
      title: t("results.manufacturing.title") as string,
      quote: t("results.manufacturing.quote") as string,
      badge: t("results.case01") as string,
      tone: "from-orange-500/25",
    },
    {
      key: "building",
      icon: HardHat,
      title: t("results.building.title") as string,
      quote: t("results.building.quote") as string,
      badge: t("results.case02") as string,
      tone: "from-sky-500/25",
    },
    {
      key: "retail",
      icon: Store,
      title: t("results.retail.title") as string,
      quote: t("results.retail.quote") as string,
      badge: t("results.case03") as string,
      tone: "from-emerald-500/25",
    },
  ];

  return (
    <section className="section-shell relative overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <RevealStagger className="mb-14 lg:mb-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <RevealItem className="lg:col-span-8">
              <div className="flex gap-5 md:gap-6">
                <div
                  className="mt-1 hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-primary via-primary/45 to-transparent md:block md:min-h-[8rem]"
                  aria-hidden
                />
                <div className="min-w-0">
                  <span className="section-eyebrow mb-0">{t("results.eyebrow")}</span>
                  <h2 className="section-title mt-3 max-w-2xl">{t("results.title")}</h2>
                </div>
              </div>
            </RevealItem>
            <RevealItem className="lg:col-span-4">
              <div className="rounded-2xl border border-border bg-card/40 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-md md:p-6">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {t("results.provenLabel")}
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {t("results.provenSummary")}
                  </span>
                </div>
              </div>
            </RevealItem>
          </div>
        </RevealStagger>

        <RevealStagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => {
            const Icon = story.icon;
            return (
              <RevealItem key={story.key}>
                <article className="interactive-card group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl border border-border bg-card/50 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md md:p-8">
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gradient-to-br ${story.tone} to-transparent blur-2xl`}
                    aria-hidden
                  />
                  <div className="relative z-10 mb-4 flex items-center justify-between">
                    <span className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {story.badge}
                    </span>
                    <div className="rounded-lg border border-border bg-muted/60 p-2 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="relative z-10 mb-4 text-lg font-semibold text-foreground">
                    {story.title}
                  </h3>
                  <blockquote className="relative z-10 flex-1 border-l border-primary/30 pl-4 text-[0.98rem] italic leading-relaxed text-muted-foreground">
                    {story.quote}
                  </blockquote>
                </article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
};

export default ResultsSection;
