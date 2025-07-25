import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ResultsSection from "../components/ResultsSection";
import TechnologyStack from "../components/TechnologyStack";
import ClientsSection from "../components/ClientsSection";
import WhyChoose from "../components/WhyChoose";
import CoreSolutions from "../components/CoreSolutions";
import SolutionsSection from "../components/SolutionsSection";
import AboutSection from "../components/AboutSection";
import HeroSection from "../components/HeroSection";
import Navigation from "../components/Navigation";
import CompanyMap from "../components/CompanyMap";
import RoboticSection from "../components/RoboticSection";


const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

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
      el.classList.add(
        "opacity-0",
        "translate-y-8",
        "transition-all",
        "duration-700"
      );
      observer.observe(el);
    });

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
    <div className="min-h-screen bg-background">
      <Navigation
        t={t}
        isScrolled={isScrolled}
        handleLanguageToggle={handleLanguageToggle}
      />
      <HeroSection t={t} />
      <AboutSection t={t} />
      {/* <AboutRobotic t={t} /> */}
      <RoboticSection t={t} />
      <SolutionsSection t={t} />
      <CoreSolutions t={t} />
      <WhyChoose t={t} />
      <ClientsSection t={t} />
      <TechnologyStack t={t} />
      <ResultsSection t={t} />
      <ContactSection t={t} />
      <CompanyMap />
      <Footer t={t} />
    </div>
  );
};

export default Index;
