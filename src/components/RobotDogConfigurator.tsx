"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Gamepad2, MessageCircle } from "lucide-react";
import type { FooterProps } from "../interface/t";
import {
  ROBOT_DOG_CONTROLS,
  ROBOT_DOG_FEATURES,
  ROBOT_DOG_MODELS,
  buildRobotDogContactHref,
  type RobotDogControlId,
  type RobotDogFeatureId,
  type RobotDogModelId,
} from "../config/robotDog";

type RobotDogConfiguratorProps = {
  t: FooterProps["t"];
  /** Show secondary “back home” link — useful on /store, hide on homepage */
  showHomeLink?: boolean;
  idPrefix?: string;
};

export function RobotDogConfigurator({
  t,
  showHomeLink = false,
  idPrefix = "robot-dog",
}: RobotDogConfiguratorProps) {
  const [modelIndex, setModelIndex] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState<
    RobotDogFeatureId[]
  >([]);
  const [control, setControl] = useState<RobotDogControlId | null>(null);
  const [controlError, setControlError] = useState(false);

  const model = ROBOT_DOG_MODELS[modelIndex];
  const modelId = model.id as RobotDogModelId;

  const goPrev = () => {
    setModelIndex((i) => (i === 0 ? ROBOT_DOG_MODELS.length - 1 : i - 1));
  };

  const goNext = () => {
    setModelIndex((i) => (i === ROBOT_DOG_MODELS.length - 1 ? 0 : i + 1));
  };

  const toggleFeature = (id: RobotDogFeatureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const contactHref = useMemo(() => {
    if (!control) return "/contact";
    return buildRobotDogContactHref(modelId, selectedFeatures, control);
  }, [modelId, selectedFeatures, control]);

  const handleRequestBuild = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!control) {
      e.preventDefault();
      setControlError(true);
    }
  };

  const featuresId = `${idPrefix}-features`;
  const controlsId = `${idPrefix}-controls`;
  const modelLabelId = `${idPrefix}-model-label`;

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card/40 shadow-lg shadow-black/5 dark:shadow-black/30">
      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        {/* Product stage */}
        <div className="relative min-h-[280px] overflow-hidden bg-neutral-950 sm:min-h-[340px] lg:min-h-full">
          <img
            key={model.id}
            src={model.image}
            alt={String(t(`store.robotDog.models.${modelId}.name`))}
            className="absolute inset-0 h-full w-full object-contain object-center p-6 md:p-8 lg:p-10"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 50% 42%, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          {/* Model switcher — side chevrons */}
          <button
            type="button"
            onClick={goPrev}
            aria-label={String(t("store.robotDog.prevModel"))}
            className="interactive-press absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-black/65 md:left-3 md:h-11 md:w-11"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={String(t("store.robotDog.nextModel"))}
            className="interactive-press absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-black/65 md:right-3 md:h-11 md:w-11"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>

          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-neutral-950/95 via-neutral-950/50 to-transparent p-5 pt-16 md:p-7 md:pt-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">
              {t("store.robotDog.subtitle")}
            </p>
            <p
              id={modelLabelId}
              className="mt-1.5 text-xl font-semibold tracking-tight text-white md:text-2xl"
            >
              {t(`store.robotDog.models.${modelId}.name`)}
            </p>
            <p className="mt-1 max-w-sm text-xs text-white/60 md:text-sm">
              {t(`store.robotDog.models.${modelId}.tagline`)}
            </p>

            {/* Dot indicators */}
            <div
              className="mt-4 flex items-center gap-2"
              role="tablist"
              aria-label={String(t("store.robotDog.modelSwitcher"))}
            >
              {ROBOT_DOG_MODELS.map((m, i) => {
                const active = i === modelIndex;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={String(
                      t(`store.robotDog.models.${m.id}.name`)
                    )}
                    onClick={() => setModelIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      active
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-white/35 hover:bg-white/55"
                    }`}
                  />
                );
              })}
              <span className="ml-1 font-mono text-[10px] uppercase tracking-wider text-white/45">
                {modelIndex + 1} / {ROBOT_DOG_MODELS.length}
              </span>
            </div>
          </div>

          {/* Decorative frame corners */}
          <div
            className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l border-t border-white/25 md:left-5 md:top-5"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r border-t border-white/25 md:right-5 md:top-5"
            aria-hidden
          />
        </div>

        {/* Build controls */}
        <div className="flex flex-col border-t border-border lg:border-l lg:border-t-0">
          <div className="flex flex-1 flex-col gap-7 p-5 md:p-7">
            <section aria-labelledby={featuresId}>
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <h3
                    id={featuresId}
                    className="text-base font-semibold tracking-tight text-foreground"
                  >
                    {t("store.robotDog.featuresHeading")}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
                    {t("store.robotDog.featuresHint")}
                  </p>
                </div>
                <p className="shrink-0 rounded-md bg-muted/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t("store.robotDog.selectedCount", {
                    count: selectedFeatures.length,
                  })}
                </p>
              </div>

              <ul className="grid gap-2 sm:grid-cols-2">
                {ROBOT_DOG_FEATURES.map((id) => {
                  const selected = selectedFeatures.includes(id);
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => toggleFeature(id)}
                        aria-pressed={selected}
                        className={`interactive-press group flex w-full items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left transition ${
                          selected
                            ? "border-primary/45 bg-primary/10"
                            : "border-border/80 bg-background/60 hover:border-primary/25 hover:bg-muted/40"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-transparent group-hover:border-primary/40"
                          }`}
                          aria-hidden
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13px] font-semibold leading-snug text-foreground">
                            {t(`store.robotDog.features.${id}.title`)}
                          </span>
                          <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                            {t(`store.robotDog.features.${id}.description`)}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section aria-labelledby={controlsId}>
              <h3
                id={controlsId}
                className="text-base font-semibold tracking-tight text-foreground"
              >
                {t("store.robotDog.controlsHeading")}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
                {t("store.robotDog.controlsHint")}
              </p>

              <div
                className="mt-3 grid gap-2 sm:grid-cols-2"
                role="radiogroup"
                aria-labelledby={controlsId}
                aria-required="true"
              >
                {ROBOT_DOG_CONTROLS.map((id) => {
                  const selected = control === id;
                  const Icon = id === "whatsapp" ? MessageCircle : Gamepad2;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        setControl(id);
                        setControlError(false);
                      }}
                      className={`interactive-press flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition ${
                        selected
                          ? "border-primary/45 bg-primary/10"
                          : "border-border/80 bg-background/60 hover:border-primary/25 hover:bg-muted/40"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                          selected
                            ? "border-primary/35 bg-primary/15 text-primary"
                            : "border-border bg-background text-muted-foreground"
                        }`}
                        aria-hidden
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold text-foreground">
                          {t(`store.robotDog.controls.${id}.title`)}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                          {t(`store.robotDog.controls.${id}.description`)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {controlError && (
                <p className="mt-2 text-xs text-red-500" role="alert">
                  {t("store.robotDog.controlRequired")}
                </p>
              )}
            </section>
          </div>

          <div className="mt-auto flex flex-col gap-2.5 border-t border-border bg-muted/25 px-5 py-4 sm:flex-row sm:items-center md:px-7">
            <Link
              href={contactHref}
              onClick={handleRequestBuild}
              className="interactive-press inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-transform hover:-translate-y-px hover:bg-primary/90 sm:flex-none"
            >
              {t("store.robotDog.cta")}
            </Link>
            {showHomeLink && (
              <Link
                href="/"
                className="interactive-press inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background/80 px-5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-px hover:bg-muted"
              >
                {t("store.homeBtn")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
