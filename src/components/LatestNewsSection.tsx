"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Newspaper,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { FooterProps } from "../interface/t";
import { useHighlights } from "../hooks/useHighlights";
import { RevealItem, RevealStagger } from "./RevealStagger";

/** Autoplay interval; restarting the effect on manual nav resets the timer. */
const AUTOPLAY_MS = 8000;
/** Keep slide autoplay paused after gallery interaction (touch / keyboard). */
const GALLERY_PAUSE_MS = 20000;

const LatestNewsSection = ({ t }: FooterProps) => {
  const { i18n } = useTranslation();
  const { slides, section, loading } = useHighlights(i18n.language);

  const [active, setActive] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  /** Bump to restart autoplay interval after manual control. */
  const [autoplayKey, setAutoplayKey] = useState(0);
  /** Pause slide autoplay while user is viewing gallery photos. */
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const galleryPauseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setActive(0);
    setGalleryIndex(0);
  }, [slides.length, i18n.language]);

  useEffect(() => {
    setGalleryIndex(0);
  }, [active]);

  useEffect(() => {
    if (slides.length < 2 || autoplayPaused) return;

    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [slides.length, autoplayKey, autoplayPaused]);

  useEffect(() => {
    return () => {
      if (galleryPauseTimerRef.current !== null) {
        window.clearTimeout(galleryPauseTimerRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <section
        id="latest-news"
        className="section-shell relative overflow-hidden bg-background px-4"
        aria-busy="true"
        aria-label={t("latestNews.eyebrow") as string}
      >
        <div className="relative z-10 mx-auto max-w-7xl animate-pulse">
          <div className="mb-12 h-8 w-48 rounded-lg bg-muted/40 lg:mb-16" />
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="aspect-[3/2] rounded-2xl bg-muted/30 lg:col-span-8" />
            <div className="h-80 rounded-2xl bg-muted/30 lg:col-span-4" />
          </div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  const safeActive = Math.min(active, slides.length - 1);
  const current = slides[safeActive];
  const galleryImages = current.imageSrcs;
  const galleryImage = galleryImages[galleryIndex] ?? galleryImages[0];
  const hasGallery = galleryImages.length > 1;
  const bumpAutoplay = () => setAutoplayKey((k) => k + 1);

  const pauseSlideAutoplay = () => {
    setAutoplayPaused(true);
    bumpAutoplay();
  };

  const resumeSlideAutoplay = () => {
    setAutoplayPaused(false);
    bumpAutoplay();
  };

  const pauseSlideAutoplayTemporarily = () => {
    pauseSlideAutoplay();
    if (galleryPauseTimerRef.current !== null) {
      window.clearTimeout(galleryPauseTimerRef.current);
    }
    galleryPauseTimerRef.current = window.setTimeout(() => {
      setAutoplayPaused(false);
      bumpAutoplay();
      galleryPauseTimerRef.current = null;
    }, GALLERY_PAUSE_MS);
  };

  const prevGallery = () => {
    setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
    pauseSlideAutoplayTemporarily();
  };
  const nextGallery = () => {
    setGalleryIndex((i) => (i + 1) % galleryImages.length);
    pauseSlideAutoplayTemporarily();
  };
  const goToGallery = (i: number) => {
    setGalleryIndex(i);
    pauseSlideAutoplayTemporarily();
  };
  const prev = () => {
    setActive((p) => (p - 1 + slides.length) % slides.length);
    bumpAutoplay();
  };
  const next = () => {
    setActive((p) => (p + 1) % slides.length);
    bumpAutoplay();
  };
  const goTo = (i: number) => {
    setActive(i);
    bumpAutoplay();
  };

  return (
    <section
      id="latest-news"
      className="section-shell relative overflow-hidden bg-background px-4"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-sky-500/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <RevealStagger className="mb-12 lg:mb-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <RevealItem className="lg:col-span-8">
              <div className="flex gap-5 md:gap-6">
                <div
                  className="mt-1 hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-primary via-primary/45 to-transparent md:block md:min-h-[8rem]"
                  aria-hidden
                />
                <div className="min-w-0">
                  <span className="section-eyebrow mb-0">{t("latestNews.eyebrow")}</span>
                  <h2 className="section-title mt-3 max-w-3xl">
                    {section?.title ?? t("latestNews.eyebrow")}
                  </h2>
                  {section?.subtitle ? (
                    <p className="section-desc mt-5 max-w-2xl text-left">{section.subtitle}</p>
                  ) : null}
                </div>
              </div>
            </RevealItem>

            <RevealItem className="lg:col-span-4">
              <div className="rounded-2xl border border-border bg-card/40 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-md md:p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Newspaper className="h-3.5 w-3.5 text-primary" />
                  {current.featuredLabel}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {current.summary}
                </p>
                <a
                  href={current.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost-chip mt-4"
                >
                  {t("latestNews.readSource")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </RevealItem>
          </div>
        </RevealStagger>

        <RevealStagger className="grid gap-6 lg:grid-cols-12">
          <RevealItem className="lg:col-span-8">
            <article
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm"
              onMouseEnter={pauseSlideAutoplay}
              onMouseLeave={resumeSlideAutoplay}
              onFocusCapture={pauseSlideAutoplay}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  resumeSlideAutoplay();
                }
              }}
            >
              <div className="relative aspect-[3/2] bg-black">
                <img
                  src={galleryImage}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover opacity-25 blur-lg"
                />
                <img
                  src={galleryImage}
                  alt={current.imageAlt}
                  className="relative z-[1] h-full w-full object-contain"
                />
                {hasGallery ? (
                  <>
                    <button
                      type="button"
                      onClick={prevGallery}
                      className="interactive-press absolute left-2 top-1/2 z-[4] -translate-y-1/2 rounded-full border border-border bg-black/55 p-2 text-white shadow-lg backdrop-blur-md transition hover:border-primary/50 hover:bg-black/70 md:left-3 md:p-2.5"
                      aria-label={t("latestNews.controls.galleryPrev") as string}
                    >
                      <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={nextGallery}
                      className="interactive-press absolute right-2 top-1/2 z-[4] -translate-y-1/2 rounded-full border border-border bg-black/55 p-2 text-white shadow-lg backdrop-blur-md transition hover:border-primary/50 hover:bg-black/70 md:right-3 md:p-2.5"
                      aria-label={t("latestNews.controls.galleryNext") as string}
                    >
                      <ChevronRight className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
                    </button>
                    <div
                      className="absolute bottom-[5.25rem] left-1/2 z-[4] flex -translate-x-1/2 gap-1.5 md:bottom-28"
                      role="group"
                      aria-label={t("latestNews.controls.galleryPhotoNav") as string}
                    >
                      {galleryImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-current={i === galleryIndex ? "true" : undefined}
                          aria-label={`${i + 1} / ${galleryImages.length}`}
                          onClick={() => goToGallery(i)}
                          className={`h-1.5 w-1.5 rounded-full transition md:h-2 md:w-2 ${
                            i === galleryIndex
                              ? "bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.4)]"
                              : "bg-white/35 hover:bg-white/55"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20"
                  aria-hidden
                />
                <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-border bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                  {current.sourceName}
                </div>
                <div className="absolute inset-x-0 bottom-0 z-[3] border-t border-border bg-black/75 backdrop-blur-md">
                  <p className="px-4 py-2.5 text-xs leading-relaxed text-white/95 md:px-5 md:py-3 md:text-sm">
                    {current.caption}
                  </p>
                </div>
              </div>
            </article>
          </RevealItem>

          <RevealItem className="lg:col-span-4">
            <article className="flex h-full flex-col rounded-2xl border border-border bg-card/45 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md md:p-7">
              <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {current.articleTag}
              </span>
              <h3 className="text-balance text-xl font-semibold leading-snug text-foreground md:text-2xl">
                {current.articleTitle}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                {current.articleBody}
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {t("latestNews.sourceLabel")}
                </p>
                <a
                  href={current.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary transition hover:text-primary/80"
                >
                  {current.sourceName}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              {slides.length > 1 ? (
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={prev}
                    className="btn-ghost-chip"
                    aria-label={t("latestNews.controls.prev") as string}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {t("latestNews.controls.prev")}
                  </button>
                  <div className="flex items-center gap-2">
                    {slides.map((slide, i) => (
                      <button
                        key={slide.key}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          i === safeActive ? "bg-primary" : "bg-white/25 hover:bg-white/45"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={next}
                    className="btn-ghost-chip"
                    aria-label={t("latestNews.controls.next") as string}
                  >
                    {t("latestNews.controls.next")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}
            </article>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
};

export default LatestNewsSection;
