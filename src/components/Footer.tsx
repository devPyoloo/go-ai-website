"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FooterProps } from "../interface/t";
import { ArrowUpRight, ChevronRight, Mail, MapPin, Phone } from "lucide-react";

const Footer = ({ t }: FooterProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  const quickLinks = [
    { href: sectionHref("#solutions"), label: t("footer.links.solutions") },
    { href: sectionHref("#about"), label: t("footer.links.industries") },
    { href: sectionHref("#technology"), label: t("footer.links.technologies") },
    { href: sectionHref("#contact"), label: t("footer.links.contact") },
  ];

  const pageLinks = [
    { href: "/about/", label: t("footer.resources.about") },
    { href: "/solutions/", label: t("footer.resources.solutions") },
    { href: "/news/", label: t("footer.resources.news") },
    { href: "/case-studies/", label: t("footer.resources.caseStudies") },
    { href: "/contact/", label: t("footer.resources.contact") },
    { href: "/store/", label: t("footer.resources.store") },
  ];

  return (
    <footer className="relative z-10 overflow-hidden bg-background px-4 pb-10 pt-16 text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-sky-500/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="px-1 md:px-2">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <img className="mb-6 w-32" src="/goai.png" alt="GO-AI logo" />
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                {t("footer.description")}
              </p>

              <div className="mt-7 space-y-2.5 text-sm text-muted-foreground">
                <p className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary/90" />
                  info@go-ai.one
                </p>
                <p className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary/90" />
                  (852) 9731-3100
                </p>
                <p className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/90" />
                  <span>{t("contact.address")}</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:border-l lg:border-border lg:pl-10">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="mb-4 text-lg font-semibold">{t("footer.links.title")}</h4>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {quickLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="group inline-flex items-center gap-2 transition-colors hover:text-primary"
                        >
                          <ChevronRight className="h-3.5 w-3.5 opacity-70 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-lg font-semibold">{t("footer.resources.title")}</h4>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {pageLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-2 transition-colors hover:text-primary"
                        >
                          <ChevronRight className="h-3.5 w-3.5 opacity-70 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col items-start justify-between gap-2 text-sm text-muted-foreground md:flex-row md:items-center">
            <p>&copy; {new Date().getFullYear()} GO-AI. All rights reserved.</p>
            <a
              href={isHome ? "#top" : "/#top"}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition hover:text-primary"
            >
              Back to top
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
