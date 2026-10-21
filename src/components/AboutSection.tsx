import type { FooterProps } from "../interface/t";
import { RevealItem, RevealStagger } from "./RevealStagger";

const AboutSection = ({ t }: FooterProps) => (
  <section
    id="about"
    className="section-shell relative overflow-hidden bg-background px-4"
  >
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/[0.04] blur-3xl" />
      <svg
        className="animate-network-float absolute inset-0 h-full w-full opacity-[0.26]"
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Root-like “neural tree” branching from bottom-left */}
        <g stroke="rgba(148,163,184,0.6)" strokeWidth="1">
          {/* trunk */}
          <line x1="48" y1="390" x2="170" y2="315" />
          <line x1="170" y1="315" x2="300" y2="250" />
          <line x1="300" y1="250" x2="440" y2="210" />
          <line x1="440" y1="210" x2="600" y2="160" />
          <line x1="600" y1="160" x2="760" y2="135" />
          <line x1="760" y1="135" x2="930" y2="120" />
          <line x1="930" y1="120" x2="1120" y2="150" />

          {/* root branches */}
          <line x1="48" y1="390" x2="110" y2="360" />
          <line x1="110" y1="360" x2="150" y2="390" />
          <line x1="110" y1="360" x2="190" y2="365" />
          <line x1="190" y1="365" x2="250" y2="335" />
          <line x1="250" y1="335" x2="300" y2="250" />

          {/* canopy branches */}
          <line x1="300" y1="250" x2="350" y2="170" />
          <line x1="350" y1="170" x2="470" y2="120" />
          <line x1="470" y1="120" x2="600" y2="160" />

          <line x1="440" y1="210" x2="520" y2="260" />
          <line x1="520" y1="260" x2="650" y2="250" />
          <line x1="650" y1="250" x2="760" y2="135" />

          <line x1="600" y1="160" x2="680" y2="95" />
          <line x1="680" y1="95" x2="820" y2="80" />
          <line x1="820" y1="80" x2="930" y2="120" />

          <line x1="760" y1="135" x2="840" y2="200" />
          <line x1="840" y1="200" x2="980" y2="210" />
          <line x1="980" y1="210" x2="1120" y2="150" />
        </g>
        <g fill="rgba(248,250,252,0.85)">
          {/* trunk nodes */}
          <circle cx="48" cy="390" r="3.5" />
          <circle cx="170" cy="315" r="3" />
          <circle cx="300" cy="250" r="3.5" />
          <circle cx="440" cy="210" r="3" />
          <circle cx="600" cy="160" r="3.5" />
          <circle cx="760" cy="135" r="3" />
          <circle cx="930" cy="120" r="3.5" />
          <circle cx="1120" cy="150" r="3" />

          {/* root nodes */}
          <circle cx="110" cy="360" r="2.5" />
          <circle cx="150" cy="390" r="2.25" />
          <circle cx="190" cy="365" r="2.25" />
          <circle cx="250" cy="335" r="2.5" />

          {/* canopy nodes */}
          <circle cx="350" cy="170" r="2.5" />
          <circle cx="470" cy="120" r="2.75" />
          <circle cx="520" cy="260" r="2.5" />
          <circle cx="650" cy="250" r="2.25" />
          <circle cx="680" cy="95" r="2.5" />
          <circle cx="820" cy="80" r="2.5" />
          <circle cx="840" cy="200" r="2.25" />
          <circle cx="980" cy="210" r="2.5" />
        </g>
      </svg>
    </div>

    <RevealStagger className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
      <RevealItem className="lg:col-span-4">
        <span className="section-eyebrow">{t("about.eyebrow")}</span>
        <h2 className="section-title mt-2">{t("about.title")}</h2>
      </RevealItem>
      <RevealItem className="lg:col-span-8">
        <div className="border-l-4 border-primary pl-6">
          <p className="text-lg font-medium leading-snug text-foreground md:text-xl">
            {t("about.tagline")}
          </p>
        </div>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("about.content")}
        </p>
      </RevealItem>
    </RevealStagger>
  </section>
);

export default AboutSection;
