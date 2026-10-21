"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { FooterProps } from "../interface/t";

export function SolutionsSectionIntro({ t }: Pick<FooterProps, "t">) {
  const reduce = useReducedMotion();
  const pills = Array.isArray(t("solutions.introPills", { returnObjects: true }))
    ? (t("solutions.introPills", { returnObjects: true }) as string[]).filter(
        (label) => !label.toLowerCase().includes("ocr")
      )
    : [];

  return (
    <div className="relative mb-20 lg:mb-28">
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-primary/[0.04] blur-3xl" />

      <div className="relative grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        {/* Editorial column */}
        <div className="lg:col-span-7">
          <motion.div
            className="flex gap-5 md:gap-6"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="mt-2 hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-primary via-primary/50 to-transparent md:block md:h-[min(100%,14rem)]"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="section-eyebrow mb-0">{t("solutions.title")}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t("solutions.introIndex")}
                </span>
              </div>

              <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.05]">
                <span className="bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent">
                  {t("solutions.mainTitle")}
                </span>
              </h2>

              <p className="section-desc mt-6 max-w-xl text-left">
                {t("solutions.subtitle")}
              </p>

              {pills.length > 0 && (
                <motion.ul
                  className="mt-8 flex flex-wrap gap-2"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={reduce ? undefined : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.45 }}
                >
                  {pills.map((label, i) => (
                    <li key={label}>
                      <span className="inline-flex items-center rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/35 hover:text-foreground">
                        {label}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </motion.div>
        </div>

        {/* Visual accent panel — “alive” mesh + live indicator */}
        <motion.div
          className="relative lg:col-span-5"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md md:p-10">
            <div
              className="animate-gradient pointer-events-none absolute inset-0 opacity-[0.85]"
              style={{
                background:
                  "linear-gradient(125deg, hsl(var(--primary) / 0.16) 0%, transparent 40%, hsl(var(--primary) / 0.1) 70%, transparent 100%)",
              }}
            />
            <div className="pointer-events-none absolute -right-12 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {t("solutions.introPanelKicker")}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {t("solutions.introPanelTitle")}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("solutions.introPanelBody")}
              </p>

              <div className="flex items-center gap-2 border-t border-border pt-5">
                <span className="relative flex h-2.5 w-2.5">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
                  )}
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-medium text-primary">
                  {t("solutions.introLiveLabel")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
