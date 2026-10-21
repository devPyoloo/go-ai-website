"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone } from "lucide-react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { SiteAtmosphere } from "./SiteAtmosphere";
import { ContactForm } from "./ContactForm";
import {
  ROBOT_DOG_PRODUCT_ID,
  formatRobotDogInquiryMessage,
  isRobotDogControlId,
  isRobotDogModelId,
  parseRobotDogFeaturesParam,
} from "../config/robotDog";

function ContactPageContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageToggle = () => {
    i18n.changeLanguage(i18n.language === "en" ? "zh" : "en");
  };

  const initialMessage = useMemo(() => {
    const product = searchParams.get("product");
    if (product !== ROBOT_DOG_PRODUCT_ID) return "";

    const modelRaw = searchParams.get("model");
    if (!modelRaw || !isRobotDogModelId(modelRaw)) return "";

    const features = parseRobotDogFeaturesParam(searchParams.get("features"));
    const controlRaw = searchParams.get("control");
    if (!controlRaw || !isRobotDogControlId(controlRaw)) return "";

    return formatRobotDogInquiryMessage(t, modelRaw, features, controlRaw);
  }, [searchParams, t, i18n.language]);

  return (
    <div className="relative min-h-screen bg-background">
      <SiteAtmosphere />
      <Navigation
        t={t}
        isScrolled={isScrolled}
        handleLanguageToggle={handleLanguageToggle}
      />
      <main className="relative z-10 px-4 pb-24 pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10 text-center md:mb-14">
            <p className="section-eyebrow mb-0">{t("contact.eyebrow")}</p>
            <h1 className="section-title mt-3">{t("contact.title")}</h1>
            <p className="section-desc mx-auto mt-4 max-w-2xl text-center">
              {t("contact.subtitle")}
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="interactive-card relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card/95 to-muted/60 p-7 shadow-md backdrop-blur-md dark:from-card/70 dark:via-card/45 dark:to-black/40 md:p-8 lg:col-span-4">
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {t("contact.companyInfo")}
                </div>
                <div className="space-y-3.5">
                  <div className="rounded-2xl border border-border bg-background/80 p-4 dark:bg-muted/50">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {t("contact.labelEmail")}
                        </p>
                        <p className="mt-1 text-foreground">{t("contact.email")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/80 p-4 dark:bg-muted/50">
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {t("contact.labelPhone")}
                        </p>
                        <p className="mt-1 text-foreground">{t("contact.phone")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/80 p-4 dark:bg-muted/50">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {t("contact.labelOffice")}
                        </p>
                        <p className="mt-1 text-foreground">
                          {t("contact.address")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ContactForm t={t} initialMessage={initialMessage} />
            </div>
          </div>
        </div>
      </main>
      <Footer t={t} />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
          Loading…
        </div>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
