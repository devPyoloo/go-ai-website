import type { FooterProps } from "../interface/t";

const ClientsSection = ({ t }: FooterProps) => {
  const clientLogos = [
    {
      src: "/images/emsd.svg",
      alt: "EMSD",
      height: "16",
    },
    {
      src: "/images/hiphing.svg",
      alt: "HIPHING",
      height: "20",
    },
    {
      src: "/images/jockeyclubHK.svg",
      alt: "JOCKEYCLUBHK",
      height: "24",
    },
    {
      src: "/images/vibro.svg",
      alt: "VIBRO",
      height: "16",
    },
  ];

  const heightClass: Record<string, string> = {
    "16": "h-10 md:h-11",
    "20": "h-12 md:h-14",
    "24": "h-14 md:h-16",
  };

  return (
    <section className="section-shell relative overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-slate-400/[0.06] blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="section-eyebrow">{t("clients.eyebrow")}</span>
          <h2 className="section-title mt-3">{t("clients.title")}</h2>
        </div>

        <div className="mx-auto max-w-4xl py-2">
          <div className="relative overflow-hidden border border-black/10 bg-white/95 px-6 py-4 shadow-lg shadow-black/10 [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)] md:px-10 md:py-5">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/95 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/95 to-transparent"
              aria-hidden
            />
            <div className="client-marquee">
              {[0, 1].map((track) => (
                <div
                  key={`track-${track}`}
                  className="client-marquee-track"
                  aria-hidden={track === 1}
                >
                  {clientLogos.map((logo) => (
                    <div
                      key={`${track}-${logo.alt}`}
                      className="flex min-w-[100px] flex-shrink-0 justify-center md:min-w-[120px]"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className={`${
                          heightClass[String(logo.height)] ?? "h-10 md:h-11"
                        } w-auto object-contain opacity-90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-110 hover:opacity-100`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
