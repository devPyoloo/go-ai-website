"use client";

import type React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Video, Image as ImageIcon, type LucideIcon } from "lucide-react";
import type { FooterProps } from "../interface/t";

type Accent = "violet" | "emerald";

const ACCENT: Record<
  Accent,
  {
    blob: string;
    iconBg: string;
    iconRing: string;
    bullet: string;
    hoverRing: string;
  }
> = {
  violet: {
    blob: "from-violet-500/[0.18] via-fuchsia-500/[0.06] to-transparent",
    iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
    iconRing: "ring-violet-400/25",
    bullet: "bg-violet-300/55 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
    hoverRing: "group-hover:ring-violet-500/15",
  },
  emerald: {
    blob: "from-emerald-500/[0.18] via-teal-500/[0.06] to-transparent",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    iconRing: "ring-emerald-400/25",
    bullet: "bg-emerald-300/55 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
    hoverRing: "group-hover:ring-emerald-500/15",
  },
};

function SuiteFeatureRow({ text, accent }: { text: string; accent: Accent }) {
  const { bullet } = ACCENT[accent];
  return (
    <li className="flex gap-3 rounded-lg border border-border bg-muted/50 px-3 py-2.5">
      <span
        className={`mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full ${bullet}`}
        aria-hidden
      />
      <span className="text-[0.9375rem] font-normal leading-relaxed text-muted-foreground">
        {text}
      </span>
    </li>
  );
}

function SuitePillar({
  colClass,
  accent,
  icon: Icon,
  title,
  description,
  features,
  motionProps,
}: {
  colClass: string;
  accent: Accent;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  motionProps: React.ComponentProps<typeof motion.div>;
}) {
  const a = ACCENT[accent];
  return (
    <motion.div className={colClass} {...motionProps}>
      <div
        className={`interactive-card group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[22px] border border-border bg-muted/60 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md ring-1 ring-transparent transition-[box-shadow,transform] duration-300 md:p-8 ${a.hoverRing}`}
      >
        <div
          className={`pointer-events-none absolute -right-8 -top-8 h-56 w-56 rounded-full bg-gradient-to-br ${a.blob} blur-2xl`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_52px] opacity-[0.3]"
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col">
          <div
            className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ${a.iconBg} text-white shadow-lg ${a.iconRing} ring-2`}
          >
            <Icon className="h-7 w-7" aria-hidden />
          </div>

          <h3 className="text-balance text-[1.65rem] font-semibold tracking-tight text-foreground md:text-[1.8rem] md:leading-snug">
            {title}
          </h3>

          <p className="mt-3.5 flex-1 text-[0.98rem] leading-relaxed text-muted-foreground md:text-[1.02rem]">
            {description}
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {features.map((feature) => (
              <SuiteFeatureRow key={feature} text={feature} accent={accent} />
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

const CoreSolutions = ({ t }: FooterProps) => {
  const reduce = useReducedMotion();

  const videoFeatures = Array.isArray(
    t("suite.video.features", { returnObjects: true })
  )
    ? (t("suite.video.features", { returnObjects: true }) as string[])
    : [];

  const imageFeatures = Array.isArray(
    t("suite.image.features", { returnObjects: true })
  )
    ? (t("suite.image.features", { returnObjects: true }) as string[])
    : [];

  const pills = Array.isArray(t("suite.pills", { returnObjects: true }))
    ? (t("suite.pills", { returnObjects: true }) as string[])
    : [];

  const ease = [0.22, 1, 0.36, 1] as const;

  const introMotion = {
    initial: reduce ? false : ({ opacity: 0, y: 22 } as const),
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.28 },
    transition: { duration: 0.52, ease },
  };

  const cardMotion = (delay: number): React.ComponentProps<typeof motion.div> => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: 0.5, delay, ease },
  });

  return (
    <section
      id="suite"
      className="section-shell relative overflow-hidden bg-background px-4"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-violet-500/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div className="mb-12 lg:mb-14" {...introMotion}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex gap-5 md:gap-6 lg:max-w-[62%]">
              <div
                className="mt-1 hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-primary via-primary/45 to-transparent md:block md:min-h-[7rem]"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="section-eyebrow mb-0">
                    {t("suite.eyebrow") as string}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t("suite.introIndex") as string}
                  </span>
                </div>
                <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-[3.1rem] lg:leading-[1.08]">
                  <span className="bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent">
                    {t("suite.title") as string}
                  </span>
                </h2>
                <p className="section-desc mt-6 max-w-2xl text-left">
                  {t("suite.lead") as string}
                </p>
                {pills.length > 0 && (
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {pills.map((label) => (
                      <li key={label}>
                        <span className="inline-flex items-center rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/35 hover:text-foreground">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="relative flex-1 lg:mt-4">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card/80 via-card/45 to-black/40 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md md:p-7">
                <div
                  className="pointer-events-none absolute -right-12 top-0 h-32 w-32 rounded-full bg-primary/15 blur-2xl"
                  aria-hidden
                />
                <div className="relative flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/80 ring-1 ring-white/10">
                      <Video className="h-5 w-5 text-violet-300" aria-hidden />
                    </div>
                    <span className="text-lg font-light text-muted-foreground/40" aria-hidden>+</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/80 ring-1 ring-white/10">
                      <ImageIcon className="h-5 w-5 text-emerald-300" aria-hidden />
                    </div>
                  </div>
                  <p className="min-w-[12rem] flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t("suite.bridge") as string}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-card/70 via-card/45 to-black/45 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-5">
          <div
            className="pointer-events-none absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent lg:block"
            aria-hidden
          />
          <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-5">
            <SuitePillar
              colClass="lg:col-span-7"
              accent="violet"
              icon={Video}
              title={t("suite.video.title") as string}
              description={t("suite.video.description") as string}
              features={videoFeatures}
              motionProps={cardMotion(0.04)}
            />
            <SuitePillar
              colClass="lg:col-span-5"
              accent="emerald"
              icon={ImageIcon}
              title={t("suite.image.title") as string}
              description={t("suite.image.description") as string}
              features={imageFeatures}
              motionProps={cardMotion(0.1)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreSolutions;
