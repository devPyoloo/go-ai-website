"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import type { FooterProps } from "../interface/t";
import { ContactForm } from "./ContactForm";

const ContactSection = ({ t }: FooterProps) => {
  return (
    <section id="contact" className="section-shell relative overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-violet-500/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-14" data-aos="fade-up">
          <span className="section-eyebrow mb-0">{t("contact.eyebrow")}</span>
          <h2 className="section-title mt-3">{t("contact.title")}</h2>
          <p className="section-desc mx-auto mt-4 max-w-2xl text-center">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div
            className="interactive-card relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card/95 to-muted/60 p-7 shadow-md backdrop-blur-md dark:from-card/70 dark:via-card/45 dark:to-black/40 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] md:p-8 lg:col-span-4"
            data-aos="fade-right"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/[0.16] blur-3xl"
              aria-hidden
            />
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t("contact.companyInfo")}
              </div>
              <p className="mb-7 text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("contact.subtitle")}
              </p>
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
                      <p className="mt-1 text-foreground">{t("contact.address")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="lg:col-span-8">
            <ContactForm t={t} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
