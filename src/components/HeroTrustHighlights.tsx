"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Lightbulb,
  ShieldCheck,
  Trophy,
  X,
} from "lucide-react";
import type { FooterProps } from "../interface/t";

type CitfCategory = {
  label: string;
  color: string;
};

type CicOrgBlock = {
  lines: string[];
  logoSrc?: string;
  logoAlt?: string;
};

type CicAwardSectionKey =
  | "advisor"
  | "organiser"
  | "mainlandOrganiser"
  | "event"
  | "competition"
  | "award"
  | "collaborators";

type CicAwardDetails = {
  advisors: CicOrgBlock[];
  organiser: CicOrgBlock;
  /** Text-only (legacy) or logo + text block(s). */
  mainlandOrganiser: string[] | CicOrgBlock | CicOrgBlock[];
  event: string[];
  competition: string[];
  award: string[];
  collaborators: CicOrgBlock[];
  /** Use Hong Kong Organiser label instead of Organiser. */
  organiserLabelKey?: "organiser" | "hkOrganiser";
  /** Override default section order when awards differ. */
  sectionOrder?: CicAwardSectionKey[];
};

type HeroTrustHighlight = {
  label: string;
  description?: string;
  imageAlt?: string;
  href?: string;
  layout?: "citf" | "cicAward";
  details?: Record<string, string | string[] | CitfCategory[]> | CicAwardDetails;
};

const CITF_DETAIL_KEYS = [
  "paCode",
  "productName",
  "productType",
  "productDescription",
  "categories",
  "company",
  "priceList",
] as const;

function isCitfCategory(value: unknown): value is CitfCategory {
  return (
    typeof value === "object" &&
    value !== null &&
    "label" in value &&
    "color" in value
  );
}

function isCicOrgBlock(value: unknown): value is CicOrgBlock {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as CicOrgBlock).lines) &&
    (value as CicOrgBlock).lines.every((line) => typeof line === "string")
  );
}

function isCicAwardDetails(value: unknown): value is CicAwardDetails {
  if (typeof value !== "object" || value === null) return false;
  const details = value as Record<string, unknown>;
  const mainland = details.mainlandOrganiser;
  const mainlandOk =
    (Array.isArray(mainland) &&
      mainland.every(
        (item) => typeof item === "string" || isCicOrgBlock(item),
      )) ||
    isCicOrgBlock(mainland);

  return (
    Array.isArray(details.advisors) &&
    typeof details.organiser === "object" &&
    details.organiser !== null &&
    mainlandOk &&
    Array.isArray(details.event) &&
    Array.isArray(details.competition) &&
    Array.isArray(details.award) &&
    Array.isArray(details.collaborators)
  );
}

function normalizeMainlandOrganiser(
  value: CicAwardDetails["mainlandOrganiser"],
): CicOrgBlock[] {
  if (isCicOrgBlock(value)) return [value];
  if (Array.isArray(value) && value.every(isCicOrgBlock)) return value;
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return [{ lines: value }];
  }
  return [];
}

function renderCitfDetailValue(
  key: (typeof CITF_DETAIL_KEYS)[number],
  value: string | string[] | CitfCategory[],
) {
  if (key === "categories" && Array.isArray(value) && value.every(isCitfCategory)) {
    return (
      <div className="flex flex-col gap-2">
        {value.map((category) => (
          <span
            key={category.label}
            className="inline-flex w-fit rounded-md px-2.5 py-1 text-xs font-semibold leading-snug text-white"
            style={{ backgroundColor: category.color }}
          >
            {category.label}
          </span>
        ))}
      </div>
    );
  }

  if (key === "priceList" && typeof value === "string") {
    return (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 break-all text-sm font-medium text-primary underline-offset-2 hover:underline"
      >
        {value}
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
      </a>
    );
  }

  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return (
      <div className="flex flex-col gap-1">
        {value.map((line) => (
          <span key={line} className="text-sm leading-relaxed text-foreground">
            {line}
          </span>
        ))}
      </div>
    );
  }

  if (typeof value === "string") {
    return (
      <span className="text-sm leading-relaxed text-foreground">{value}</span>
    );
  }

  return null;
}

function CitfImageStamp({
  logoSrc,
  logoAlt,
}: {
  logoSrc: string;
  logoAlt: string;
}) {
  return (
    <div className="absolute left-10 top-6 z-[1] sm:left-10 sm:top-7">
      <img
        src={logoSrc}
        alt={logoAlt}
        className="h-12 w-auto max-w-[9.5rem] object-contain [filter:drop-shadow(1px_0_0_rgba(255,255,255,0.6))_drop-shadow(-1px_0_0_rgba(255,255,255,0.6))_drop-shadow(0_1px_0_rgba(255,255,255,0.6))_drop-shadow(0_-1px_0_rgba(255,255,255,0.6))_drop-shadow(1px_1px_0_rgba(255,255,255,0.35))_drop-shadow(-1px_-1px_0_rgba(255,255,255,0.35))] sm:h-14 sm:max-w-[11rem]"
      />
    </div>
  );
}

function TextLines({ lines }: { lines: string[] }) {
  return (
    <div className="flex flex-col gap-0.5">
      {lines.map((line) => (
        <span key={line} className="text-sm leading-relaxed text-foreground">
          {line}
        </span>
      ))}
    </div>
  );
}

function OrgBlockRow({
  block,
  reserveLogoSlot = false,
  logoOnLight = false,
}: {
  block: CicOrgBlock;
  reserveLogoSlot?: boolean;
  /** Light surface behind logos that need contrast (collaborators only). */
  logoOnLight?: boolean;
}) {
  const showLogoSlot = Boolean(block.logoSrc) || reserveLogoSlot;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {showLogoSlot ? (
        <div
          className={`shrink-0 items-center justify-center ${
            block.logoSrc ? "flex" : "hidden sm:flex"
          } ${
            logoOnLight
              ? "h-12 w-[6.75rem] overflow-hidden rounded-sm bg-white px-1.5 py-1 sm:h-14 sm:w-[7.5rem]"
              : "h-16 w-16 overflow-visible sm:h-[4.5rem] sm:w-[4.5rem]"
          }`}
          aria-hidden={!block.logoSrc}
        >
          {block.logoSrc ? (
            <img
              src={block.logoSrc}
              alt={block.logoAlt ?? ""}
              className={
                logoOnLight
                  ? "h-full w-full object-contain"
                  : "max-h-full max-w-full object-contain"
              }
            />
          ) : null}
        </div>
      ) : null}
      <TextLines lines={block.lines} />
    </div>
  );
}

function CicAwardDetailsPanel({
  details,
  labels,
}: {
  details: CicAwardDetails;
  labels: {
    advisor: string;
    organiser: string;
    hkOrganiser: string;
    mainlandOrganiser: string;
    event: string;
    competition: string;
    award: string;
    collaborators: string;
  };
}) {
  const mainlandBlocks = normalizeMainlandOrganiser(details.mainlandOrganiser);
  const organiserLabel =
    details.organiserLabelKey === "hkOrganiser"
      ? labels.hkOrganiser
      : labels.organiser;

  const sectionMap: Record<
    CicAwardSectionKey,
    { key: CicAwardSectionKey; label: string; content: ReactNode }
  > = {
    advisor: {
      key: "advisor",
      label: labels.advisor,
      content: (
        <div className="flex flex-col gap-4">
          {details.advisors.map((advisor, index) => (
            <OrgBlockRow
              key={`advisor-${index}`}
              block={advisor}
              reserveLogoSlot
            />
          ))}
        </div>
      ),
    },
    organiser: {
      key: "organiser",
      label: organiserLabel,
      content: <OrgBlockRow block={details.organiser} />,
    },
    mainlandOrganiser: {
      key: "mainlandOrganiser",
      label: labels.mainlandOrganiser,
      content: (
        <div className="flex flex-col gap-4">
          {mainlandBlocks.map((block, index) => (
            <OrgBlockRow
              key={`mainland-organiser-${index}`}
              block={block}
              reserveLogoSlot={Boolean(block.logoSrc) || mainlandBlocks.length > 1}
            />
          ))}
        </div>
      ),
    },
    event: {
      key: "event",
      label: labels.event,
      content: <TextLines lines={details.event} />,
    },
    competition: {
      key: "competition",
      label: labels.competition,
      content: <TextLines lines={details.competition} />,
    },
    award: {
      key: "award",
      label: labels.award,
      content: (
        <div className="flex flex-col gap-0.5">
          {details.award.map((line, index) => (
            <span
              key={line}
              className={
                index === 0
                  ? "text-base font-semibold leading-snug text-foreground sm:text-lg"
                  : "text-sm font-medium leading-relaxed text-foreground"
              }
            >
              {line}
            </span>
          ))}
        </div>
      ),
    },
    collaborators: {
      key: "collaborators",
      label: labels.collaborators,
      content: (
        <div className="flex flex-col gap-4">
          {details.collaborators.map((collaborator, index) => (
            <OrgBlockRow
              key={`collaborator-${index}`}
              block={collaborator}
              reserveLogoSlot
              logoOnLight
            />
          ))}
        </div>
      ),
    },
  };

  const defaultOrder: CicAwardSectionKey[] = [
    "advisor",
    "organiser",
    "mainlandOrganiser",
    "event",
    "competition",
    "award",
    "collaborators",
  ];
  const order = details.sectionOrder?.length ? details.sectionOrder : defaultOrder;
  const sections = order.map((key) => sectionMap[key]).filter(Boolean);

  return (
    <dl className="mt-5 divide-y divide-border rounded-xl border border-border bg-muted/30">
      {sections.map((section) => (
        <div
          key={section.key}
          className="grid gap-2 px-4 py-3.5 sm:grid-cols-[9.5rem_1fr] sm:gap-4 sm:px-5"
        >
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:pt-1">
            {section.label}
          </dt>
          <dd>{section.content}</dd>
        </div>
      ))}
    </dl>
  );
}

const TRUST_ITEMS = [
  {
    imageSrc: "/images/PA26-070.png",
    badgeSrc: "/images/citf.png",
    icon: ShieldCheck,
    layout: "citf" as const,
    imageWrapClass:
      "relative flex items-center justify-center bg-neutral-950 px-2 py-3 sm:px-4 sm:py-4",
    imageClass: "block h-auto w-full max-h-none object-contain",
    iconWrapClass:
      "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/15 transition-colors group-hover/chip:bg-emerald-200/90",
  },
  {
    imageSrc: "/images/award.png",
    icon: Award,
    layout: "simple" as const,
    imageWrapClass: "bg-[#0a1628]",
    imageClass: "block h-auto w-full object-contain",
    iconWrapClass:
      "bg-amber-100 text-amber-700 ring-1 ring-amber-600/15 transition-colors group-hover/chip:bg-amber-200/90",
  },
  {
    imageSrc: "/images/reward.png",
    icon: Trophy,
    layout: "cicAward" as const,
    imageWrapClass:
      "relative flex items-center justify-center bg-neutral-200 px-4 py-5 sm:px-8 sm:py-6",
    imageClass: "mx-auto block h-auto max-h-[min(56vh,480px)] w-auto object-contain",
    iconWrapClass:
      "bg-sky-100 text-sky-700 ring-1 ring-sky-600/15 transition-colors group-hover/chip:bg-sky-200/90",
  },
  {
    imageSrc: "/images/reward_2.png",
    icon: Lightbulb,
    layout: "cicAward" as const,
    imageWrapClass:
      "relative flex items-center justify-center bg-neutral-200 px-4 py-5 sm:px-8 sm:py-6",
    imageClass: "mx-auto block h-auto max-h-[min(56vh,480px)] w-auto object-contain",
    iconWrapClass:
      "bg-violet-100 text-violet-700 ring-1 ring-violet-600/15 transition-colors group-hover/chip:bg-violet-200/90",
  },
] as const;

export function HeroTrustHighlights({ t }: Pick<FooterProps, "t">) {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const trustHighlightsRaw = t("hero.trustHighlights", { returnObjects: true });
  const trustHighlights = Array.isArray(trustHighlightsRaw)
    ? (trustHighlightsRaw as unknown as HeroTrustHighlight[])
    : [];

  const open = openIndex !== null;
  const activeItem = openIndex !== null ? trustHighlights[openIndex] : null;
  const activeMeta = openIndex !== null ? TRUST_ITEMS[openIndex] : null;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (trustHighlights.length === 0) return null;

  const closeLabel = String(t("hero.trustCloseLabel"));
  const learnMoreLabel = String(t("hero.trustLearnMore"));

  const cicAwardLabels = {
    advisor: String(t("hero.trustCicAwardLabels.advisor")),
    organiser: String(t("hero.trustCicAwardLabels.organiser")),
    hkOrganiser: String(t("hero.trustCicAwardLabels.hkOrganiser")),
    mainlandOrganiser: String(t("hero.trustCicAwardLabels.mainlandOrganiser")),
    event: String(t("hero.trustCicAwardLabels.event")),
    competition: String(t("hero.trustCicAwardLabels.competition")),
    award: String(t("hero.trustCicAwardLabels.award")),
    collaborators: String(t("hero.trustCicAwardLabels.collaborators")),
  };

  const backdropMotion = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3, ease: "easeOut" as const },
      };

  const panelMotion = prefersReducedMotion
    ? {
        initial: { opacity: 1, y: 0, scale: 1 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 24, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };

  const isCicAward =
    activeMeta?.layout === "cicAward" ||
    activeItem?.layout === "cicAward" ||
    isCicAwardDetails(activeItem?.details);

  return (
    <>
      <motion.div
        className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center gap-2.5 px-0 sm:mt-7"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] sm:text-[11px]">
          {t("hero.trustLabel")}
        </span>

        <div
          className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          role="list"
          aria-label={String(t("hero.trustLabel"))}
        >
          {trustHighlights.map((item, index) => {
            const meta = TRUST_ITEMS[index];
            const Icon = meta?.icon ?? ShieldCheck;
            const ariaLabel = String(item.label);

            return (
              <button
                key={`hero-trust-chip-${index}`}
                type="button"
                role="listitem"
                onClick={() => setOpenIndex(index)}
                aria-label={ariaLabel}
                aria-haspopup="dialog"
                className="interactive-press group/chip inline-flex max-w-full cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white/95 px-3.5 py-2 text-left shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 sm:py-2.5"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${meta?.iconWrapClass ?? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/15"}`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                </span>
                <span className="text-left text-[11px] font-semibold leading-snug text-neutral-800 group-hover/chip:text-neutral-950 sm:text-xs">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {mounted && activeItem && activeMeta
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  key={`hero-trust-dialog-${openIndex}`}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="hero-trust-panel-title"
                  {...backdropMotion}
                >
                  <button
                    type="button"
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    aria-label={closeLabel}
                    onClick={() => setOpenIndex(null)}
                  />

                  <motion.div
                    className="relative z-[1] flex max-h-[min(92vh,880px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
                    onClick={(event) => event.stopPropagation()}
                    {...panelMotion}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(null)}
                      className="interactive-press absolute right-3 top-3 z-[2] rounded-full border border-border bg-background/90 p-2 text-foreground shadow-lg backdrop-blur-md transition hover:border-primary/40 hover:text-primary sm:right-4 sm:top-4"
                      aria-label={closeLabel}
                    >
                      <X className="h-4 w-4" aria-hidden />
                    </button>

                    <div className="min-h-0 overflow-y-auto">
                      <div className={activeMeta.imageWrapClass}>
                        <img
                          src={activeMeta.imageSrc}
                          alt={
                            typeof (activeItem.details as Record<string, unknown> | undefined)
                              ?.productName === "string"
                              ? String(
                                  (activeItem.details as Record<string, unknown>).productName,
                                )
                              : activeItem.imageAlt ?? activeItem.label
                          }
                          className={activeMeta.imageClass}
                        />
                        {"badgeSrc" in activeMeta && activeMeta.badgeSrc ? (
                          <CitfImageStamp
                            logoSrc={activeMeta.badgeSrc}
                            logoAlt={
                              activeItem.imageAlt ??
                              "CITF Construction Innovation and Technology Fund logo"
                            }
                          />
                        ) : null}
                      </div>

                      <div className="border-t border-border bg-card/95 px-5 py-5 backdrop-blur-md sm:px-6 sm:py-6">
                        <span className="section-eyebrow mb-0 text-primary">
                          {t("hero.trustLabel")}
                        </span>
                        <h2
                          id="hero-trust-panel-title"
                          className="mt-2 pr-8 text-balance text-lg font-semibold leading-snug text-foreground sm:text-xl"
                        >
                          {activeItem.label}
                        </h2>
                        {activeItem.description ? (
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                            {activeItem.description}
                          </p>
                        ) : null}

                        {isCicAward && isCicAwardDetails(activeItem.details) ? (
                          <CicAwardDetailsPanel
                            details={activeItem.details}
                            labels={cicAwardLabels}
                          />
                        ) : activeItem.details && !isCicAwardDetails(activeItem.details) ? (
                          <dl className="mt-5 divide-y divide-border rounded-xl border border-border bg-muted/30">
                            {CITF_DETAIL_KEYS.map((key) => {
                              const value = (
                                activeItem.details as Record<
                                  string,
                                  string | string[] | CitfCategory[]
                                >
                              )?.[key];
                              if (!value) return null;
                              const label = t(`hero.trustCitfDetailLabels.${key}`);
                              return (
                                <div
                                  key={key}
                                  className="grid gap-1 px-4 py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-4 sm:px-5"
                                >
                                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:pt-0.5">
                                    {label}
                                  </dt>
                                  <dd>{renderCitfDetailValue(key, value)}</dd>
                                </div>
                              );
                            })}
                          </dl>
                        ) : null}

                        {activeItem.href ? (
                          <a
                            href={activeItem.href}
                            className="btn-ghost-chip mt-5 inline-flex transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                            {...(/^https?:\/\//i.test(activeItem.href)
                              ? { target: "_blank", rel: "noreferrer" }
                              : {})}
                            onClick={() => setOpenIndex(null)}
                          >
                            {learnMoreLabel}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
