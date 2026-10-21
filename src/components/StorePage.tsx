"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Mail, ShoppingBag } from "lucide-react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { SiteAtmosphere } from "./SiteAtmosphere";

export default function StorePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageToggle = () => {
    i18n.changeLanguage(i18n.language === "en" ? "zh" : "en");
  };

  return (
    <div className="relative min-h-screen bg-background">
      <SiteAtmosphere />
      <Navigation
        t={t}
        isScrolled={isScrolled}
        handleLanguageToggle={handleLanguageToggle}
      />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-24 pt-32">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card/50 shadow-lg shadow-primary/10">
            <ShoppingBag className="h-8 w-8 text-primary" aria-hidden />
          </div>
          <p className="section-eyebrow">{t("store.eyebrow")}</p>
          <h1 className="section-title mt-3">{t("store.title")}</h1>
          <p className="section-desc mx-auto mt-6 max-w-lg text-center">
            {t("store.description")}
          </p>
          <p className="mt-8 text-sm text-muted-foreground">{t("store.notify")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="interactive-press inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-transform hover:-translate-y-px hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {t("store.contactBtn")}
            </Link>
            <Link
              href="/"
              className="interactive-press inline-flex h-11 items-center justify-center rounded-xl border border-border bg-muted/60 px-6 text-sm font-semibold text-foreground transition-transform hover:-translate-y-px hover:bg-muted"
            >
              {t("store.homeBtn")}
            </Link>
          </div>
        </div>
      </main>
      <Footer t={t} />
    </div>
  );
}
