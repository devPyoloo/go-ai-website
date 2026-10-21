"use client";

import { useState, useRef } from "react";
import { Play, Eye, FileText, ShieldCheck } from "lucide-react";
import type { FooterProps } from "../interface/t";
import { RobotDogConfigurator } from "./RobotDogConfigurator";

const featureIcons = [
  <Eye key="eye" className="h-8 w-8" />,
  <FileText key="file" className="h-8 w-8" />,
  <ShieldCheck key="shield" className="h-8 w-8" />,
];

const featureKeys = ["realtime", "reporting", "safety"] as const;

const glassesImage = "/images/ai_glass.png";

function HardwareProductHeader({
  title,
  kicker,
  description,
}: {
  title: string;
  kicker?: string;
  description?: string;
}) {
  return (
    <header className="mx-auto mb-8 max-w-2xl text-center md:mb-10 lg:mb-12">
      {kicker ? (
        <p className="hardware-product-kicker">{kicker}</p>
      ) : null}
      <h3 className="hardware-product-title">{title}</h3>
      <div className="hardware-product-divider" aria-hidden />
      {description ? (
        <p className="hardware-product-desc mx-auto mt-5 max-w-xl">
          {description}
        </p>
      ) : null}
    </header>
  );
}

const RoboticSection = ({ t }: FooterProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play();
      }
    }, 200);
  };

  return (
    <section
      id="robot"
      className="section-shell relative overflow-hidden bg-background px-4"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/[0.04] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Editorial header — asymmetric */}
        <div className="mb-14 flex flex-col gap-8 text-center lg:mb-20 lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
              <span className="section-eyebrow mb-0">{t("robot.eyebrow")}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                — {t("robot.lineupLabel")}
              </span>
            </div>
            <h2 className="section-title mx-auto">{t("robot.title")}</h2>
            <p className="section-desc mx-auto mt-4 max-w-2xl text-center">
              {t("robot.content")}
            </p>
          </div>
          <div className="hidden max-w-md border-t border-border pt-6 lg:block">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("robot.sidebarKicker")}
            </p>
            <p className="mt-2 text-sm text-foreground">{t("robot.sidebarTitle")}</p>
          </div>
        </div>

        {/* Showcase: AI Smart Glasses */}
        <div className="mb-24 md:mb-28 lg:mb-32">
          <HardwareProductHeader title={String(t("robot.glasses.title"))} />

          <div className="relative mx-auto max-w-6xl lg:mt-2">
            <div className="grid items-center gap-6 lg:min-h-[520px] lg:grid-cols-[minmax(0,1fr)_minmax(280px,500px)_minmax(0,1fr)] lg:gap-5 xl:min-h-[560px] xl:gap-8">
              {/* Left rail: two feature cards */}
              <div className="hidden lg:flex lg:flex-col lg:items-end lg:justify-center lg:gap-4 lg:pr-1 xl:pr-2">
                {featureKeys.slice(0, 2).map((key, i) => (
                  <div
                    key={key}
                    className="w-full max-w-[17.5rem] rounded-lg border border-border bg-card/95 px-3 py-2.5 shadow-lg backdrop-blur-md dark:bg-black/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)] xl:max-w-[18.5rem] xl:px-3.5 xl:py-3"
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/18 text-primary [&_svg]:h-4 [&_svg]:w-4">
                        {featureIcons[i]}
                      </div>
                      <span className="font-mono text-[10px] font-bold tabular-nums text-primary/90">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold leading-snug text-foreground md:text-[13px]">
                      {t(`robot.glasses.features.${key}.title`)}
                    </h4>
                    <p className="mt-1 line-clamp-4 text-[11px] leading-relaxed text-muted-foreground md:text-xs">
                      {t(`robot.glasses.features.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Center: product hero */}
              <div className="relative mx-auto w-full min-h-[360px] md:min-h-[440px] lg:min-h-[500px] xl:min-h-[540px]">
                <div
                  className="pointer-events-none absolute inset-0 rounded-[1.5rem] md:rounded-[2rem]"
                  style={{
                    background:
                      "radial-gradient(ellipse 85% 75% at 50% 42%, transparent 0%, rgba(0,0,0,0.55) 100%)",
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-0 h-[78%] w-[min(115%,36rem)] -translate-x-1/2"
                  style={{
                    background:
                      "radial-gradient(ellipse 72% 58% at 50% 28%, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.03) 35%, transparent 68%)",
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-[8%] h-[55%] w-[min(85%,28rem)] -translate-x-1/2"
                  style={{
                    background:
                      "radial-gradient(ellipse 55% 48% at 50% 45%, hsl(var(--primary) / 0.28) 0%, hsl(var(--primary) / 0.06) 42%, transparent 72%)",
                  }}
                  aria-hidden
                />
                <div className="relative z-10 flex h-full min-h-[inherit] flex-col items-center justify-center px-4 pb-4 pt-10 md:px-6 md:pb-6 md:pt-14">
                  <img
                    src={glassesImage}
                    alt={String(t("robot.glasses.title"))}
                    loading="lazy"
                    className="relative z-10 max-h-[340px] w-auto max-w-[min(96%,32rem)] scale-100 object-contain opacity-100 drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)] [filter:drop-shadow(0_0_28px_hsl(var(--primary)/0.22))] transition-all duration-500 md:max-h-[420px] lg:max-h-[460px] xl:max-h-[500px]"
                  />
                </div>
              </div>

              {/* Right rail: third feature */}
              <div className="hidden lg:flex lg:flex-col lg:items-start lg:justify-center lg:gap-4 lg:pl-1 xl:pl-2">
                {featureKeys.slice(2, 3).map((key, i) => {
                  const idx = i + 2;
                  return (
                    <div
                      key={key}
                      className="w-full max-w-[17.5rem] rounded-lg border border-border bg-card/95 px-3 py-2.5 shadow-lg backdrop-blur-md dark:bg-black/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)] xl:max-w-[18.5rem] xl:px-3.5 xl:py-3"
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/18 text-primary [&_svg]:h-4 [&_svg]:w-4">
                          {featureIcons[idx]}
                        </div>
                        <span className="font-mono text-[10px] font-bold tabular-nums text-primary/90">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold leading-snug text-foreground md:text-[13px]">
                        {t(`robot.glasses.features.${key}.title`)}
                      </h4>
                      <p className="mt-1 line-clamp-4 text-[11px] leading-relaxed text-muted-foreground md:text-xs">
                        {t(`robot.glasses.features.${key}.description`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile / tablet: stacked feature list */}
            <div className="mx-auto mt-6 max-w-lg space-y-2 px-1 lg:hidden">
              {featureKeys.map((key, i) => (
                <div
                  key={key}
                  className="rounded-lg border border-border bg-card/90 px-3 py-2.5 backdrop-blur-md dark:bg-black/50"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/18 text-primary [&_svg]:h-3.5 [&_svg]:w-3.5">
                      {featureIcons[i]}
                    </div>
                    <span className="font-mono text-[10px] font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-xs font-semibold text-foreground">
                      {t(`robot.glasses.features.${key}.title`)}
                    </h4>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                    {t(`robot.glasses.features.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-2xl border-t border-border pt-8 text-center text-sm leading-relaxed text-muted-foreground">
              {t("robot.glasses.description")}
            </p>
          </div>
        </div>

        {/* Showcase: AI Robot Dog — configurator */}
        <div id="robot-dog" className="mb-16 scroll-mt-28 border-t border-border/60 pt-20 md:pt-24 lg:pt-28">
          <HardwareProductHeader
            kicker={String(t("robot.robotDog.configureLabel"))}
            title={String(t("robot.robotDog.title"))}
            description={String(t("robot.robotDog.description"))}
          />
          <div className="mx-auto max-w-6xl">
            <RobotDogConfigurator t={t} idPrefix="home-robot-dog" />
          </div>
        </div>

        {/* Tagline band */}
        <div className="mb-14 border-y border-border bg-card/30 py-8 md:py-10">
          <p className="text-center text-lg font-semibold text-primary md:text-xl">
            {t("robot.tagline")}
          </p>
        </div>

        {/* Demo video — tech frame */}
        <div className="relative mx-auto max-w-5xl">
          <div className="pointer-events-none absolute -inset-3 rounded-[1.25rem] border border-dashed border-border md:-inset-4" />
          <div className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-border bg-black shadow-2xl md:min-h-[520px]">
            {isPlaying ? (
              <video
                ref={videoRef}
                loop
                playsInline
                controls
                className="h-full w-full object-cover"
              >
                <source src="/safedog.mp4" type="video/mp4" />
              </video>
            ) : (
              <div className="h-full w-full overflow-hidden">
                <img
                  src="/images/thumbnail.png"
                  alt="Video Thumbnail"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}

            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlay}
                className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-neutral-950/25 transition-colors hover:bg-black/40 dark:bg-black/35 dark:hover:bg-black/50"
                aria-label={String(t("robot.demoPlayAria"))}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background/90 shadow-2xl backdrop-blur-sm transition-transform group-hover:scale-110 dark:bg-card/95 md:h-24 md:w-24">
                  <Play className="ml-1 h-10 w-10 fill-primary text-primary md:h-12 md:w-12" />
                </div>
                <div className="mt-6 px-4 text-center">
                  <h3 className="text-xl font-bold text-white md:text-2xl">
                    {t("robot.demoTitle")}
                  </h3>
                  <p className="mt-2 text-sm text-white/75 md:text-base">
                    {t("robot.demoSubtitle")}
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoboticSection;
