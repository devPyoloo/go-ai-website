"use client";

import { Radio } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { FooterProps } from "../interface/t";
import { SolutionsSectionIntro } from "./SolutionsSectionIntro";
import { RevealItem, RevealStagger } from "./RevealStagger";

type AccentKey = "blue" | "orange" | "green";

const ACCENT: Record<
  AccentKey,
  {
    pill: string;
    pulse: string;
    bullet: string;
    splitRing: string;
  }
> = {
  blue: {
    pill: "border-sky-400/40 bg-sky-500/10 text-sky-800 dark:bg-sky-500/[0.12] dark:text-sky-100",
    pulse: "from-sky-400 to-violet-500",
    bullet: "bg-sky-500/70 shadow-sm dark:bg-sky-300/65 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]",
    splitRing: "ring-sky-500/25 dark:ring-sky-500/20",
  },
  orange: {
    pill: "border-orange-400/40 bg-orange-500/10 text-orange-900 dark:bg-orange-500/[0.12] dark:text-orange-100",
    pulse: "from-orange-400 to-red-500",
    bullet: "bg-orange-500/70 shadow-sm dark:bg-orange-300/65 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]",
    splitRing: "ring-orange-500/25 dark:ring-orange-500/20",
  },
  green: {
    pill: "border-emerald-400/40 bg-emerald-500/10 text-emerald-900 dark:bg-emerald-500/[0.12] dark:text-emerald-100",
    pulse: "from-emerald-400 to-teal-500",
    bullet: "bg-emerald-500/70 shadow-sm dark:bg-emerald-300/65 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]",
    splitRing: "ring-emerald-500/25 dark:ring-emerald-500/20",
  },
};

function SolutionFeatureList({
  features,
  accentKey,
}: {
  features: string[];
  accentKey: AccentKey;
}) {
  const bullet = ACCENT[accentKey].bullet;
  return (
    <ul className="mt-2 divide-y divide-border border-t border-border">
      {features.map((feature, fi) => (
        <li key={fi} className="flex gap-3.5 py-3.5 first:pt-4">
          <span
            className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${bullet}`}
            aria-hidden
          />
          <span className="text-[0.9375rem] font-normal leading-relaxed text-foreground/90">
            {feature}
          </span>
        </li>
      ))}
    </ul>
  );
}

function readingTone(kind: string): { label: string; valueClass: string } {
  const k = kind.toLowerCase();
  if (k === "drill")
    return { label: "Drill", valueClass: "text-sky-700 tabular-nums dark:text-sky-200" };
  if (k === "torque")
    return { label: "Torque", valueClass: "text-amber-700 tabular-nums dark:text-amber-200" };
  if (k === "pression" || k === "pressure")
    return { label: "Pressure", valueClass: "text-emerald-700 tabular-nums dark:text-emerald-200" };
  return { label: kind, valueClass: "text-foreground tabular-nums" };
}

function LiveReadingsStrip({
  items,
  label,
  overlay,
}: {
  items: string[];
  label: string;
  overlay?: boolean;
}) {
  const duplicated = [...items, ...items];
  const shell = overlay
    ? "border-border/70 bg-background/75 py-3 shadow-md backdrop-blur-xl dark:border-border dark:bg-black/50 dark:shadow-lg dark:shadow-black/40"
    : "border-border bg-muted/50 py-3 shadow-sm dark:bg-card/90";

  return (
    <div className={`relative overflow-hidden rounded-2xl ${shell}`}>
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r ${overlay ? "from-background/95 dark:from-black/90" : "from-muted/50 dark:from-card"} to-transparent md:w-16`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l ${overlay ? "from-background/95 dark:from-black/90" : "from-muted/50 dark:from-card"} to-transparent md:w-16`}
        aria-hidden
      />
      <div className="mb-2 flex items-center justify-center gap-2 px-4">
        <Radio className="h-3.5 w-3.5 text-primary" aria-hidden />
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${overlay ? "text-muted-foreground dark:text-white/55" : "text-muted-foreground"}`}
        >
          {label}
        </span>
      </div>
      <div className="flex animate-scroll gap-3 px-4">
        {duplicated.map((text, i) => {
          const [kindRaw, val] = text.split(/\s+/);
          const { label: metric, valueClass } = readingTone(kindRaw || "");
          return (
            <div
              key={`${text}-${i}`}
              className={`flex min-w-[9.5rem] flex-shrink-0 flex-col gap-0.5 rounded-xl border border-border/80 px-3 py-2 font-mono shadow-sm backdrop-blur-sm ${overlay ? "bg-muted/70 dark:bg-black/45" : "bg-background/80 dark:bg-muted/60"}`}
            >
              <span
                className={`text-[10px] font-medium uppercase tracking-wider ${overlay ? "text-muted-foreground dark:text-white/45" : "text-muted-foreground"}`}
              >
                {metric}
              </span>
              <span className={`text-sm font-semibold ${valueClass}`}>
                {val}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type SolutionConfig = {
  id: string;
  accent: AccentKey;
  category: string;
  title: string;
  description: string;
  features: string[];
  videoSrc: string;
  secondaryVideoSrc?: string;
  hasScrollingData?: boolean;
};

const SolutionsSection = ({ t }: FooterProps) => {
  const reduceMotion = useReducedMotion();

  const textData = [
    "drill 96.1",
    "torque 75.7",
    "pression 11.3",
    "drill 103.6",
    "torque 65.9",
    "pression 12.1",
    "drill 102.5",
    "torque 64.3",
    "pression 10.4",
    "drill 97.7",
    "torque 64.2",
    "pression 9.0",
    "drill 99.1",
    "torque 62.9",
    "pression 18.0",
  ];

  const solutions: SolutionConfig[] = [
    {
      id: "motion",
      accent: "blue",
      category: t("solutions.motion.category") as string,
      title: t("solutions.motion.title") as string,
      description: t("solutions.motion.description") as string,
      features: t("solutions.motion.features", { returnObjects: true }) as string[],
      videoSrc: "/behaviour.mp4",
    },
    {
      id: "rotation",
      accent: "orange",
      category: t("solutions.rotation.category") as string,
      title: t("solutions.rotation.title") as string,
      description: t("solutions.rotation.description") as string,
      features: t("solutions.rotation.features", { returnObjects: true }) as string[],
      videoSrc: "/rotation.mp4",
    },
    {
      id: "video",
      accent: "green",
      category: t("solutions.video.category") as string,
      title: t("solutions.video.title") as string,
      description: t("solutions.video.description") as string,
      features: t("solutions.video.features", { returnObjects: true }) as string[],
      videoSrc: "/detection.mp4",
    },
    {
      id: "gauge",
      accent: "orange",
      category: t("solutions.gauge.category") as string,
      title: t("solutions.gauge.title") as string,
      description: t("solutions.gauge.description") as string,
      features: t("solutions.gauge.features", { returnObjects: true }) as string[],
      videoSrc: "/reading.mp4",
      hasScrollingData: true,
    },
  ];

  const blockMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0.88, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section id="solutions" className="section-shell relative overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-48 w-48 rounded-full bg-primary/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SolutionsSectionIntro t={t} />

        <div className="space-y-24 md:space-y-32">
          {solutions.map((solution, index) => {
            const a = ACCENT[solution.accent];
            const hasTicker = Boolean(solution.hasScrollingData);
            const hasPip = Boolean(solution.secondaryVideoSrc);

            return (
              <motion.article
                key={solution.id}
                className="relative"
                {...blockMotion}
              >
                <div
                  className={`group relative min-h-[520px] overflow-hidden rounded-[28px] border border-border/50 shadow-sm md:min-h-[580px] dark:border-transparent dark:shadow-none dark:ring-1 dark:ring-white/[0.08] ${hasTicker ? "min-h-[560px] md:min-h-[600px]" : ""} ${a.splitRing}`}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-700 ease-out motion-safe:group-hover:scale-[1.04] motion-safe:group-hover:brightness-105 dark:motion-safe:group-hover:brightness-105"
                  >
                    <source src={solution.videoSrc} type="video/mp4" />
                  </video>

                  {/* Light: light neutral dim (video stays visible) — Dark: cinematic black */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 via-transparent to-transparent dark:from-black dark:via-black/25 dark:to-black/50"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-l from-neutral-950/45 via-neutral-950/12 to-transparent md:via-neutral-950/6 dark:from-black/95 dark:via-black/55 dark:md:via-black/35"
                    aria-hidden
                  />

                  <div
                    className="pointer-events-none absolute inset-4 hidden rounded-2xl border border-white/[0.08] md:inset-6 dark:block"
                    aria-hidden
                  />

                  <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 md:left-8 md:top-8">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground backdrop-blur-md dark:border-border dark:bg-black/50 dark:text-white/90">
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${a.pulse} motion-safe:animate-pulse`}
                        aria-hidden
                      />
                      {t("solutions.previewBadge") as string}
                    </span>
                  </div>

                  {hasPip && solution.secondaryVideoSrc && (
                    <div className="absolute left-5 top-[4.5rem] z-[15] w-[min(46vw,240px)] overflow-hidden rounded-xl border border-border/70 bg-background/90 shadow-lg backdrop-blur-md sm:w-[min(40vw,260px)] md:top-auto md:bottom-10 md:left-8 md:w-[min(34vw,280px)] dark:border-border dark:bg-black/80 dark:shadow-2xl">
                      <div className="flex items-center justify-between border-b border-border/70 px-2.5 py-1.5 dark:border-border">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground dark:text-white/70">
                          {t("solutions.pipLabel") as string}
                        </span>
                        <span
                          className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${a.pulse}`}
                          aria-hidden
                        />
                      </div>
                      <div className="aspect-video w-full">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover"
                        >
                          <source
                            src={solution.secondaryVideoSrc}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </div>
                  )}

                  {hasTicker && (
                    <div className="absolute inset-x-0 bottom-0 z-[12] hidden bg-gradient-to-t from-background/92 via-background/50 to-transparent pt-20 pb-0 md:block md:pt-24 dark:from-black/85 dark:via-black/50">
                      <div className="pointer-events-auto px-5 pb-6 md:px-8 md:pb-8 lg:pr-[min(36rem,44vw)]">
                        <LiveReadingsStrip
                          items={textData}
                          label={t("solutions.liveReadingsLabel") as string}
                          overlay
                        />
                      </div>
                    </div>
                  )}

                  <div className="relative z-20 flex min-h-[520px] items-end md:min-h-[580px] md:items-center md:justify-end">
                    <div className="w-full p-5 md:flex md:max-w-xl md:justify-end md:p-10 lg:p-12">
                      <RevealStagger className="w-full md:max-w-lg">
                        <div className="rounded-2xl border border-border/50 bg-background/70 p-6 shadow-md backdrop-blur-md dark:border-border dark:bg-black/55 dark:shadow-2xl dark:shadow-black/60 dark:backdrop-blur-2xl md:p-8">
                          <RevealItem className="mb-5 flex flex-wrap items-center gap-3">
                            <span
                              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${a.pill}`}
                            >
                              {solution.category}
                            </span>
                            <span className="hidden text-xs text-muted-foreground sm:inline dark:text-white/40">
                              {String(index + 1).padStart(2, "0")} /{" "}
                              {String(solutions.length).padStart(2, "0")}
                            </span>
                          </RevealItem>
                          <RevealItem>
                            <h3 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl dark:text-white">
                              {solution.title}
                            </h3>
                          </RevealItem>
                          <RevealItem>
                            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg dark:text-white/75">
                              {solution.description}
                            </p>
                          </RevealItem>
                          <RevealItem className="mt-7">
                            <SolutionFeatureList
                              features={solution.features}
                              accentKey={solution.accent}
                            />
                          </RevealItem>
                        </div>
                      </RevealStagger>
                    </div>
                  </div>

                  {hasTicker && (
                    <div className="relative z-20 px-5 pb-6 md:hidden">
                      <LiveReadingsStrip
                        items={textData}
                        label={t("solutions.liveReadingsLabel") as string}
                        overlay
                      />
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
