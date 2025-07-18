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

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-red-600 bg-clip-text text-transparent"
          data-aos="fade-up"
        >
          {t("clients.title")}
        </h2>

        <div
          className="relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] py-8 max-w-screen-md mx-auto"
          data-aos="fade-up"
        >
          <div className="animate-infinite-scroll inline-flex items-center gap-12 w-max whitespace-nowrap">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="flex-shrink-0 min-w-[120px] flex justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`h-${logo.height} grayscale-0 hover:grayscale opacity-100 transition-all duration-300`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
