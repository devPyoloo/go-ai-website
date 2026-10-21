"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ResultsSection from "../components/ResultsSection";
import TechnologyStack from "../components/TechnologyStack";
import ClientsSection from "../components/ClientsSection";
import WhyChoose from "../components/WhyChoose";
import SolutionsSection from "../components/SolutionsSection";
import AboutSection from "../components/AboutSection";
import HeroSection from "../components/HeroSection";
import Navigation from "../components/Navigation";
import CompanyMap from "../components/CompanyMap";
import RoboticSection from "../components/RoboticSection";
import { SiteAtmosphere } from "../components/SiteAtmosphere";
import LatestNewsSection from "../components/LatestNewsSection";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-aos]");
    elements.forEach((el) => {
      if (prefersReducedMotion) {
        el.classList.remove("opacity-0", "translate-y-8");
      } else {
        el.classList.add(
          "opacity-0",
          "translate-y-8",
          "transition-all",
          "duration-700",
          "ease-out"
        );
        observer.observe(el);
      }
    });

    if (prefersReducedMotion) {
      setIsPageReady(true);
    } else {
      const raf = window.requestAnimationFrame(() => setIsPageReady(true));
      return () => {
        window.removeEventListener("scroll", handleScroll);
        observer.disconnect();
        window.cancelAnimationFrame(raf);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const { i18n } = useTranslation();

  const handleLanguageToggle = () => {
    i18n.changeLanguage(i18n.language === "en" ? "zh" : "en");
  };

  const { t } = useTranslation();

  return (
    <div id="top" className="relative min-h-screen bg-background">
      <SiteAtmosphere />
      <Navigation
        t={t}
        isScrolled={isScrolled}
        overHero
        handleLanguageToggle={handleLanguageToggle}
      />
      <main
        className={`relative z-10 transition-opacity duration-700 ease-out ${
          isPageReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div data-aos>
          <HeroSection t={t} />
        </div>
        <div data-aos>
          <AboutSection t={t} />
        </div>
        <div data-aos>
          <LatestNewsSection t={t} />
        </div>
        <div data-aos>
          <RoboticSection t={t} />
        </div>
        <div data-aos>
          <SolutionsSection t={t} />
        </div>
        <div data-aos>
          <TechnologyStack t={t} />
        </div>
        <div data-aos>
          <WhyChoose t={t} />
        </div>
        <div data-aos>
          <ClientsSection t={t} />
        </div>
        <div data-aos>
          <ResultsSection t={t} />
        </div>
        <div data-aos>
          <ContactSection t={t} />
        </div>
        <div data-aos>
          <CompanyMap t={t} />
        </div>
      </main>
      <Footer t={t} />
    </div>
  );
}

