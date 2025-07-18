import type { FooterProps } from "../interface/t";

const Footer = ({ t }: FooterProps) => (
  <footer className="py-12 px-4 bg-foreground text-background">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-4 gap-8">
        <div data-aos="fade-up" data-aos-delay="100">
          <div className="flex items-center space-x-2 mb-4">
            <img className="w-28" src="/goai.png" alt="Go AI Logo" />
          </div>
          <p className="text-sm opacity-70">{t("footer.description")}</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <h4 className="font-bold mb-3">{t("footer.links.title")}</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <a
                href="#solutions"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.links.solutions")}
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.links.industries")}
              </a>
            </li>
            <li>
              <a
                href="#technology"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.links.technologies")}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.links.contact")}
              </a>
            </li>
          </ul>
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <h4 className="font-bold mb-3">{t("footer.resources.title")}</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <a
                href="#"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.resources.calculator")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.resources.whitepapers")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.resources.webinars")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.resources.blog")}
              </a>
            </li>
          </ul>
        </div>
        <div data-aos="fade-up" data-aos-delay="400">
          <h4 className="font-bold mb-3">{t("footer.legal.title")}</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <a
                href="#"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.legal.privacy")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.legal.terms")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.legal.protection")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-red-400 transition-colors"
              >
                {t("footer.legal.compliance")}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="border-t border-border/20 mt-8 pt-8 text-center text-sm opacity-70"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <p>&copy; {new Date().getFullYear()} GO AI. All rights reserved.</p>

      </div>
    </div>
  </footer>
);

export default Footer;
