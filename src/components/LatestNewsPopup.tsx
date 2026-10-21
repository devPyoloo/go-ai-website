"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dismissLatestPopup, useLatestPopup } from "../hooks/useLatestPopup";

const SHOW_DELAY_MS = 600;

export function LatestNewsPopup() {
  const { i18n } = useTranslation();
  const { popup, loading } = useLatestPopup(i18n.language);
  const prefersReducedMotion = useReducedMotion();

  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (loading || !popup) {
      setVisible(false);
      return;
    }

    const delay = prefersReducedMotion ? 0 : SHOW_DELAY_MS;
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [loading, popup, prefersReducedMotion]);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  const handleClose = () => {
    if (popup) {
      dismissLatestPopup(popup.id);
    }
    setVisible(false);
  };

  if (!mounted || !popup) {
    return null;
  }

  const backdropMotion = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.35, ease: "easeOut" as const },
      };

  const panelMotion = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0, scale: 1 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 24, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="latest-news-popup-title"
          {...backdropMotion}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden
          />

          <motion.div
            className="relative z-[1] w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            {...panelMotion}
          >
            <button
              type="button"
              onClick={handleClose}
              className="interactive-press absolute right-3 top-3 z-[2] rounded-full border border-border bg-background/90 p-2 text-foreground shadow-lg backdrop-blur-md transition hover:border-primary/40 hover:text-primary sm:right-4 sm:top-4"
              aria-label={popup.closeLabel}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <div className="relative bg-[#0a1628]">
              <img
                src={popup.imageSrc}
                alt={popup.imageAlt}
                className="block h-auto w-full object-contain"
              />
            </div>

            <div className="border-t border-border bg-card/95 px-5 py-5 backdrop-blur-md sm:px-6 sm:py-6">
              <span className="section-eyebrow mb-0">{popup.badge}</span>
              <h2
                id="latest-news-popup-title"
                className="mt-2 text-balance text-lg font-semibold leading-snug text-foreground sm:text-xl"
              >
                {popup.title}
              </h2>
              {popup.subtitle ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                  {popup.subtitle}
                </p>
              ) : null}
              {popup.body ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
                  {popup.body}
                </p>
              ) : null}

              {popup.ctaHref && popup.ctaLabel ? (
                <a
                  href={popup.ctaHref}
                  onClick={handleClose}
                  className="btn-ghost-chip mt-5 inline-flex"
                >
                  {popup.ctaLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
