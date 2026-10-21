import { Globe, Layers3, TrendingUp } from "lucide-react";
import type { FooterProps } from "../interface/t";
import { RevealItem, RevealStagger } from "./RevealStagger";

const WhyChoose = ({ t }: FooterProps) => {
  const stackPills = t("why.stack.pills", { returnObjects: true }) as string[];

  const highlights = [
    {
      key: "ecosystem",
      icon: Layers3,
      title: t("why.ecosystem.title"),
      description: t("why.ecosystem.description"),
      pillar: t("why.pillars.unified"),
      glow: "from-primary/30 to-transparent",
      iconBg: "from-red-500 to-red-600",
    },
    {
      key: "industry",
      icon: Globe,
      title: t("why.industry.title"),
      description: t("why.industry.description"),
      pillar: t("why.pillars.flexible"),
      glow: "from-sky-500/25 to-transparent",
      iconBg: "from-sky-500 to-blue-600",
    },
    {
      key: "scalable",
      icon: TrendingUp,
      title: t("why.scalable.title"),
      description: t("why.scalable.description"),
      pillar: t("why.pillars.scalable"),
      glow: "from-emerald-500/25 to-transparent",
      iconBg: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <section className="section-shell relative overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-3xl" />
        <div className="absolute -right-20 top-16 h-64 w-64 rounded-full bg-violet-500/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <RevealStagger className="mb-12 lg:mb-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <RevealItem className="lg:col-span-10">
              <div className="flex gap-5 md:gap-6">
                <div
                  className="mt-1 hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-primary via-primary/45 to-transparent md:block md:min-h-[8rem]"
                  aria-hidden
                />
                <div className="min-w-0">
                  <span className="section-eyebrow mb-0">{t("why.eyebrow")}</span>
                  <h2 className="section-title mt-3 max-w-2xl">{t("why.title")}</h2>
                </div>
              </div>
            </RevealItem>
          </div>
        </RevealStagger>

        <RevealStagger>
          <RevealItem>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card/90 to-muted/80 shadow-lg backdrop-blur-xl dark:from-card/75 dark:via-card/55 dark:to-black/50 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_70px_rgba(0,0,0,0.45)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(239,68,68,0.16),transparent_45%)]" />
              <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary/[0.08] blur-3xl" />

              <div className="relative z-10 grid gap-8 px-6 py-7 md:px-8 md:py-9 lg:grid-cols-[1.2fr_1fr] lg:items-end">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                    {t("why.stack.eyebrow")}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    {t("why.stack.title")}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                    {t("why.stack.description")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {stackPills.map((pill) => (
                    <div
                      key={pill}
                      className="rounded-lg border border-border bg-muted/70 px-3 py-2 text-xs font-medium text-foreground dark:bg-black/30"
                    >
                      {pill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

              <div className="relative z-10 grid gap-4 p-4 md:gap-5 md:p-6 lg:grid-cols-3">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.key}
                      className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-muted/80 md:p-6 dark:bg-card/50 dark:shadow-none"
                    >
                      <div
                        className={`pointer-events-none absolute -right-8 -top-6 h-28 w-28 bg-gradient-to-br ${item.glow} blur-2xl`}
                        aria-hidden
                      />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${item.iconBg} text-white shadow-lg ring-1 ring-white/10`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/85">
                            {item.pillar}
                          </span>
                        </div>
                        <h4 className="mt-4 text-lg font-semibold leading-snug text-foreground md:text-xl">
                          {item.title}
                        </h4>
                        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
};

export default WhyChoose;
