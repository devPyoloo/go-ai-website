"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguagesIcon, Menu, ShoppingBag, X } from "lucide-react";
import { GO_AI_STORE_URL, isExternalStoreLink } from "../config/site";
import type { FooterProps } from "../interface/t";
import { ThemeToggle } from "./ThemeToggle";

type NavigationProps = FooterProps & {
  /** Home hero uses light nav text over the video scrim */
  overHero?: boolean;
};

const Navigation = ({
  isScrolled,
  handleLanguageToggle,
  t,
  overHero = false,
}: NavigationProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const storeExternal = isExternalStoreLink(GO_AI_STORE_URL);
  const heroNav = overHero && !isScrolled;

  const navLinkClass = heroNav
    ? "text-white/75 hover:text-white"
    : "text-muted-foreground hover:text-primary";

  // Trailing-slash static export may report "/" or "" for home
  const isHome = pathname === "/" || pathname === "";

  // Keep in-page anchors on home; from other routes jump to home sections
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  const navLinks = [
    { href: sectionHref("#solutions"), label: t("nav.solutions") },
    { href: sectionHref("#about"), label: t("nav.about") },
    { href: sectionHref("#technology"), label: t("nav.technology") },
    { href: sectionHref("#contact"), label: t("nav.contact") },
  ];

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'border-b border-border bg-background/90 shadow-sm backdrop-blur-md' 
          : 'border-b border-transparent bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container gap-x-10 mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            onClick={handleLogoClick}
            aria-label={String(t("nav.homeAria"))}
          >
            <img
              className="w-24 transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              src="/goai.png"
              alt="Go AI Logo"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-200 hover:-translate-y-px ${navLinkClass}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={GO_AI_STORE_URL}
            {...(storeExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={String(t("nav.storeAria"))}
            className={`interactive-press inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-px ${
              heroNav
                ? "border border-white/35 bg-white/10 text-white hover:bg-white/20"
                : "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
            }`}
          >
            <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden />
            {t("nav.cta")}
          </a>
          <ThemeToggle
            onHero={overHero}
            isScrolled={isScrolled}
            lightLabel={String(t("nav.themeLight"))}
            darkLabel={String(t("nav.themeDark"))}
          />
          <button
            type="button"
            onClick={() => handleLanguageToggle?.()}
            aria-label={String(t("nav.languageToggle"))}
            className={`transition-colors ${navLinkClass}`}
          >
            <LanguagesIcon className="h-5 w-5 cursor-pointer" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg transition-colors"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${heroNav ? "text-white" : "text-foreground"}`} />
          ) : (
            <Menu className={`h-6 w-6 ${heroNav ? "text-white" : "text-foreground"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 top-full w-full border-b border-border bg-card/95 shadow-lg backdrop-blur-md transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="block py-2 font-medium text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href={GO_AI_STORE_URL}
            {...(storeExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={String(t("nav.storeAria"))}
            onClick={closeMobileMenu}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden />
            {t("nav.cta")}
          </a>
          <div className="flex items-center gap-3 py-2">
            <ThemeToggle
              isScrolled
              lightLabel={String(t("nav.themeLight"))}
              darkLabel={String(t("nav.themeDark"))}
            />
            <span className="text-sm text-muted-foreground">{t("nav.theme")}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              handleLanguageToggle?.();
              closeMobileMenu();
            }}
            className="flex w-full items-center gap-2 py-2 font-medium text-foreground transition-colors hover:text-primary"
            aria-label={String(t("nav.languageToggle"))}
          >
            <LanguagesIcon className="h-5 w-5" />
            <span>{t("nav.language")}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
