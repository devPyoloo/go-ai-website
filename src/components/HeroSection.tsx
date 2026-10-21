"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Eye, Mail } from "lucide-react";
import type { FooterProps } from "../interface/t";
import { HeroTrustHighlights } from "./HeroTrustHighlights";

const HeroSection = ({ t }: FooterProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scrollReady, setScrollReady] = useState(false);

  useEffect(() => {
    setScrollReady(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.1]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.42],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.42],
    prefersReducedMotion ? [0, 0] : [0, 56]
  );

  const logosOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  const clientLogos = [
    {
      src: "/images/emsd.svg",
      alt: "EMSD",
      heightClass: "h-10 md:h-12",
    },
    {
      src: "/images/hiphing.svg",
      alt: "HIPHING",
      heightClass: "h-12 md:h-14",
    },
    {
      src: "/images/jockeyclubHK.svg",
      alt: "JOCKEYCLUBHK",
      heightClass: "h-14 md:h-16",
    },
    {
      src: "/images/vibro.svg",
      alt: "VIBRO",
      heightClass: "h-10 md:h-12",
    },
  ];

  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] items-center overflow-hidden px-4 pb-28 pt-28 md:min-h-[95vh] md:pb-36 md:pt-32"
      style={{ position: "relative" }}
    >
      <motion.div
        className="absolute inset-0 origin-center will-change-transform"
        style={{ scale: videoScale }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-110"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          aria-label="Background video showcasing AI technology"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/40 to-black/50" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-1/4 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-1/3 right-10 h-56 w-56 rounded-full bg-white/[0.04] blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-8 text-center md:pb-12"
        style={{
          opacity: scrollReady ? contentOpacity : 1,
          y: scrollReady ? contentY : 0,
        }}
      >
        <motion.h1
          className="mb-6 text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-[4.25rem] lg:leading-[1.06]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-white">{t("hero.title")}</span>
          <span className="mt-1 block bg-gradient-to-r from-red-300 via-primary to-red-500 bg-clip-text text-transparent md:mt-2">
            {t("hero.aiTitle")}
          </span>
        </motion.h1>
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-base font-normal leading-relaxed text-white/85 md:text-lg md:leading-relaxed"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#solutions"
            className="group inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-red-600 px-8 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#solutions")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            aria-label={String(t("hero.exploreBtn"))}
          >
            <Eye className="relative z-10 mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            {t("hero.exploreBtn")}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-white/[0.08] px-8 text-base font-semibold text-white backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:bg-white/15 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            aria-label={String(t("hero.contactBtn"))}
          >
            <Mail className="mr-2 h-5 w-5 opacity-90" />
            {t("hero.contactBtn")}
          </a>
        </motion.div>

        <HeroTrustHighlights t={t} />
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-0 right-0 z-10 flex w-full justify-center md:bottom-8"
        style={{ opacity: scrollReady ? logosOpacity : 1 }}
      >
        <div className="mx-4 w-full max-w-4xl">
          <div className="relative overflow-hidden border border-black/10 bg-white/95 px-5 py-2.5 shadow-lg shadow-black/10 backdrop-blur-md [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)] md:px-8 md:py-3">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white/95 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white/95 to-transparent"
              aria-hidden
            />
            <div className="relative z-0 animate-infinite-scroll inline-flex w-max items-center gap-8 whitespace-nowrap md:gap-12">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`hero-logo-${index}`}
                  className="flex min-w-[100px] flex-shrink-0 justify-center md:min-w-[120px]"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.heightClass} w-auto object-contain opacity-80 transition-all duration-300 hover:scale-105 hover:opacity-100`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
