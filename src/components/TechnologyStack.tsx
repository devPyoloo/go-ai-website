"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Brain, Eye, MessageSquare, type LucideIcon } from "lucide-react";
import type { FooterProps } from "../interface/t";
import { RevealItem, RevealStagger } from "./RevealStagger";

type StackKey = "vision" | "nlp" | "ml";

const ORBIT_PRECISION = 2;

function roundOrbit(value: number, precision = ORBIT_PRECISION): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

function orbitAxisOffset(value: number): string {
  const rounded = roundOrbit(value);
  if (rounded === 0) return "50%";
  if (rounded > 0) return `calc(50% + ${rounded}px)`;
  return `calc(50% - ${Math.abs(rounded)}px)`;
}

interface StackItem {
  id: number;
  key: StackKey;
  icon: LucideIcon;
  title: string;
  features: string[];
  badge: string;
  iconTone: string;
  bulletTone: string;
  glowTone: string;
  relatedIds: number[];
}

function StackCard({
  stack,
  features,
  t,
  compact = false,
  isActive = false,
  isRelated = false,
}: {
  stack: StackItem;
  features: string[];
  t: FooterProps["t"];
  compact?: boolean;
  isActive?: boolean;
  isRelated?: boolean;
}) {
  const Icon = stack.icon;

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
        compact
          ? "w-full bg-card shadow-[0_20px_48px_-10px_hsl(var(--primary)/0.25),0_12px_28px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_48px_-10px_hsl(var(--primary)/0.35),0_12px_28px_-8px_rgba(0,0,0,0.9)]"
          : "bg-muted/50 interactive-card"
      } ${
        isActive
          ? "border-primary/40"
          : isRelated
            ? "border-border"
            : "border-border"
      } ${isActive && !compact ? "shadow-lg shadow-primary/10" : ""}`}
    >
      <motion.div
        className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${stack.glowTone} to-transparent blur-2xl`}
        aria-hidden
        animate={isActive ? { opacity: 1, scale: 1.1 } : { opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.35 }}
      />
      <motion.div
        className={`relative z-10 ${compact ? "" : "flex items-center gap-3"}`}
        animate={isActive && !compact ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {!compact ? (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${stack.iconTone} text-white shadow-lg ring-1 ring-white/10`}
          >
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/85">
            {t("technology.moduleLabel", { badge: stack.badge })}
          </div>
          <h3 className="text-base font-semibold text-foreground">{stack.title}</h3>
        </div>
      </motion.div>
      <ul
        className={`relative z-10 space-y-2 border-t border-border pt-3 ${compact ? "mt-3" : "mt-4"}`}
      >
        {features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex gap-2.5">
            <span
              className={`mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full ${stack.bulletTone}`}
            />
            <span className="text-sm leading-relaxed text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function TechnologyOrbit({
  stacks,
  activeId,
  onSelect,
  onClear,
  t,
}: {
  stacks: StackItem[];
  activeId: number | null;
  onSelect: (id: number) => void;
  onClear: () => void;
  t: FooterProps["t"];
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const radius = 200;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduce || !autoRotate) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.25) % 360);
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate, reduce]);

  const centerOnNode = useCallback(
    (nodeId: number) => {
      const nodeIndex = stacks.findIndex((s) => s.id === nodeId);
      if (nodeIndex < 0) return;
      const targetAngle = (nodeIndex / stacks.length) * 360;
      setRotationAngle(270 - targetAngle);
    },
    [stacks]
  );

  const handleSelect = (id: number) => {
    if (activeId === id) {
      onClear();
      setAutoRotate(true);
      return;
    }
    onSelect(id);
    setAutoRotate(false);
    centerOnNode(id);
  };

  const getRelatedIds = (itemId: number) =>
    stacks.find((s) => s.id === itemId)?.relatedIds ?? [];

  const isRelatedToActive = (itemId: number) => {
    if (activeId === null) return false;
    return getRelatedIds(activeId).includes(itemId);
  };

  const nodePosition = (index: number) => {
    const total = stacks.length;
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = roundOrbit(radius * Math.cos(radian));
    const y = roundOrbit(radius * Math.sin(radian));
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = roundOrbit(
      Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2))),
      3,
    );
    return { x, y, zIndex, opacity };
  };

  const activeStack = activeId !== null ? stacks.find((s) => s.id === activeId) : null;
  const orbitSize = 600;
  const orbitCenter = orbitSize / 2;

  if (!mounted) {
    return (
      <div
        className="relative mx-auto hidden min-h-[36rem] w-full max-w-3xl lg:block"
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      className="relative mx-auto hidden w-full max-w-3xl lg:block"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative mx-auto flex min-h-[36rem] w-full items-center justify-center overflow-visible"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClear();
            setAutoRotate(true);
          }
        }}
        role="presentation"
      >
        {/* Circular orbit ring */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 shadow-[0_0_48px_hsl(var(--primary)/0.12)]"
          style={{ width: radius * 2 + 24, height: radius * 2 + 24 }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-border"
          style={{ width: radius * 2, height: radius * 2 }}
          animate={reduce ? undefined : { opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Connector lines to nodes */}
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          viewBox={`0 0 ${orbitSize} ${orbitSize}`}
          aria-hidden
        >
          {stacks.map((stack, index) => {
            const { x, y } = nodePosition(index);
            const isActive = activeId === stack.id;
            const isRelated = isRelatedToActive(stack.id);
            return (
              <line
                key={stack.key}
                x1={orbitCenter}
                y1={orbitCenter}
                x2={roundOrbit(orbitCenter + x)}
                y2={roundOrbit(orbitCenter + y)}
                stroke={
                  isActive
                    ? "hsl(var(--primary) / 0.45)"
                    : isRelated
                      ? "hsl(var(--primary) / 0.2)"
                      : "hsl(var(--muted-foreground) / 0.22)"
                }
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray={isActive || isRelated ? undefined : "4 6"}
              />
            );
          })}
        </svg>

        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div
            className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary via-red-600 to-primary/70 shadow-lg shadow-primary/30 ${
              reduce ? "" : "animate-pulse-orbit"
            }`}
          >
            {!reduce ? (
              <>
                <span className="pointer-events-none absolute h-20 w-20 rounded-full border border-primary/30 animate-ping-orbit opacity-70" />
                <span
                  className="pointer-events-none absolute h-24 w-24 rounded-full border border-border animate-ping-orbit opacity-50"
                  style={{ animationDelay: "0.5s" }}
                />
                <span
                  className="pointer-events-none absolute h-[7.5rem] w-[7.5rem] rounded-full border border-primary/15 animate-ping-orbit opacity-30"
                  style={{ animationDelay: "1s" }}
                />
              </>
            ) : null}
            <span className="relative z-10 text-[11px] font-bold tracking-[0.12em] text-foreground">
              GO-AI
            </span>
          </div>
          <p className="mt-3 max-w-[8rem] text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {t("technology.integratedStack")}
          </p>
        </div>
        {/* Orbital nodes */}
        {stacks.map((stack, index) => {
          const { x, y, zIndex, opacity } = nodePosition(index);
          const Icon = stack.icon;
          const isExpanded = activeId === stack.id;
          const isRelated = isRelatedToActive(stack.id);
          const features = Array.isArray(stack.features) ? stack.features : [];
          return (
            <motion.div
              key={stack.key}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              aria-label={stack.title}
              className={`absolute cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                autoRotate && !reduce
                  ? ""
                  : "transition-[left,top,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              }`}
              style={{
                left: orbitAxisOffset(x),
                top: orbitAxisOffset(y),
                transform: "translate(-50%, -50%)",
                zIndex: isExpanded ? 200 : zIndex,
                opacity: isExpanded ? 1 : opacity,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(stack.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(stack.id);
                }
              }}
            >
              <div className="relative h-10 w-64">
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 70%)",
                  }}
                  animate={
                    isExpanded || isRelated
                      ? { opacity: 1, scale: 1.15 }
                      : { opacity: 0.4, scale: 1 }
                  }
                  transition={{ duration: 0.35 }}
                />

                <motion.div
                  className={`relative z-10 mx-auto flex h-10 w-10 origin-center items-center justify-center rounded-full border-2 transition-colors ${
                    isExpanded
                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : isRelated
                        ? "border-primary/50 bg-primary/20 text-foreground"
                        : "border-border bg-card text-foreground"
                  }`}
                  animate={isExpanded ? { scale: 1.5 } : { scale: 1 }}
                  whileHover={reduce ? undefined : { scale: isExpanded ? 1.5 : 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>

                <p
                  className={`absolute inset-x-0 top-12 whitespace-nowrap text-center text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isExpanded ? "scale-125 text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {stack.title}
                </p>

                <AnimatePresence>
                  {isExpanded ? (
                    <motion.div
                      key={`${stack.key}-card`}
                      className="absolute inset-x-0 top-20 z-10 w-full rounded-2xl bg-card shadow-[0_24px_56px_-12px_hsl(var(--primary)/0.35),0_16px_32px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_24px_56px_-12px_hsl(var(--primary)/0.45),0_16px_32px_-16px_rgba(0,0,0,0.95)]"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-primary/40"
                        aria-hidden
                      />
                      <StackCard stack={stack} features={features} t={t} compact isActive />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detail panel below orbit when a node is selected (keeps layout stable on smaller lg) */}
      <AnimatePresence mode="wait">
        {activeStack && activeId !== null ? (
          <motion.div
            key={activeStack.key}
            className="mx-auto mt-2 max-w-md lg:hidden xl:block xl:max-w-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35 }}
          >
            <p className="mb-3 text-center text-xs text-muted-foreground">
              {t("technology.connected")}:{" "}
              {getRelatedIds(activeId)
                .map((id) => stacks.find((s) => s.id === id)?.title)
                .filter(Boolean)
                .join(" · ")}
            </p>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            className="mt-2 text-center text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {t("technology.selectModuleHint")}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Always-visible detail strip on xl when card might clip */}
      <div className="sr-only" aria-live="polite">
        {activeStack
          ? t("technology.moduleSelected", { title: activeStack.title })
          : t("technology.noModuleSelected")}
      </div>
    </motion.div>
  );
}

const TechnologyStack = ({ t }: FooterProps) => {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<number | null>(null);

  const stacks = useMemo<StackItem[]>(
    () => [
      {
        id: 0,
        key: "vision",
        icon: Eye,
        title: t("technology.vision.title") as string,
        features: t("technology.vision.features", { returnObjects: true }) as string[],
        badge: "01",
        iconTone: "from-sky-500 to-blue-600",
        bulletTone: "bg-sky-300/65",
        glowTone: "from-sky-500/25",
        relatedIds: [1],
      },
      {
        id: 1,
        key: "nlp",
        icon: MessageSquare,
        title: t("technology.nlp.title") as string,
        features: t("technology.nlp.features", { returnObjects: true }) as string[],
        badge: "02",
        iconTone: "from-violet-500 to-fuchsia-600",
        bulletTone: "bg-violet-300/65",
        glowTone: "from-violet-500/25",
        relatedIds: [0, 2],
      },
      {
        id: 2,
        key: "ml",
        icon: Brain,
        title: t("technology.ml.title") as string,
        features: t("technology.ml.features", { returnObjects: true }) as string[],
        badge: "03",
        iconTone: "from-emerald-500 to-teal-600",
        bulletTone: "bg-emerald-300/65",
        glowTone: "from-emerald-500/25",
        relatedIds: [1],
      },
    ],
    [t]
  );

  return (
    <section
      id="technology"
      className="section-shell relative overflow-hidden bg-background px-4 text-foreground"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        initial={false}
      >
        <div className="absolute left-1/4 top-0 h-48 w-48 rounded-full bg-primary/[0.04] blur-3xl" />
        <motion.div
          className="absolute right-1/4 bottom-0 h-56 w-56 rounded-full bg-primary/[0.03] blur-3xl"
          animate={reduce ? undefined : { opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div className="relative z-10 mx-auto max-w-7xl">
        <RevealStagger className="mb-10">
          <RevealItem>
            <div className="flex gap-5 md:gap-6">
              <div
                className="mt-1 hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-primary via-primary/45 to-transparent md:block md:min-h-[7rem]"
                aria-hidden
              />
              <div className="min-w-0">
                <span className="section-eyebrow mb-0">{t("technology.eyebrow")}</span>
                <h2 className="section-title mt-3 max-w-2xl">{t("technology.title")}</h2>
                <p className="section-desc mt-4 max-w-3xl text-left">{t("suite.bridge") as string}</p>
              </div>
            </div>
          </RevealItem>
        </RevealStagger>

        {/* Desktop orbital */}
        <motion.div className="relative overflow-visible rounded-3xl">
          <TechnologyOrbit
            stacks={stacks}
            activeId={activeId}
            onSelect={setActiveId}
            onClear={() => setActiveId(null)}
            t={t}
          />

          {/* Mobile / tablet grid */}
          <RevealStagger className="lg:hidden">
            <RevealItem>
              <motion.div className="grid gap-3 md:grid-cols-3">
                {stacks.map((stack, index) => {
                  const features = Array.isArray(stack.features)
                    ? stack.features.slice(0, 2)
                    : [];
                  return (
                    <div key={stack.key} className="relative">
                      <StackCard stack={stack} features={features} t={t} />
                      {index < stacks.length - 1 ? (
                        <motion.div
                          className="pointer-events-none absolute -right-1 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-primary/35 to-transparent md:block"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                  );
                })}
              </motion.div>
            </RevealItem>
          </RevealStagger>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TechnologyStack;
