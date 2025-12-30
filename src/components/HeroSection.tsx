import { Eye } from "lucide-react";
import type { FooterProps } from "../interface/t";

const HeroSection = ({ t }: FooterProps) => {
  const clientLogos = [
    {
      src: "/images/emsd.svg",
      alt: "EMSD",
      heightClass: "h-10 md:h-12",
      useFilter: true,
    },
    {
      src: "/images/hiphing.svg",
      alt: "HIPHING",
      heightClass: "h-12 md:h-14",
      useFilter: true,
    },
    {
      src: "/images/jockeyclubHK.svg",
      alt: "JOCKEYCLUBHK",
      heightClass: "h-14 md:h-16",
      useFilter: false, // This logo has blue background and yellow engraving, preserve colors
    },
    {
      src: "/images/vibro.svg",
      alt: "VIBRO",
      heightClass: "h-10 md:h-12",
      useFilter: true,
    },
  ];

  // Duplicate logos multiple times for smooth infinite scroll
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
  <section className="relative pt-24 pb-20 md:pb-28 px-4 min-h-[85vh] md:min-h-[95vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          aria-label="Background video showcasing AI technology"
        >
          <source src="/herosection.mp4" type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')"
            }}
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-red-900/30" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-red-400/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-red-600/10 rounded-full blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto text-center max-w-4xl relative z-10 px-4">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 mb-6 bg-white/10 backdrop-blur-md text-white border-white/20 shadow-lg hover:bg-white/20 hover:scale-105" data-aos="fade-up">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
            {t('hero.tagline')}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent leading-tight drop-shadow-2xl tracking-tight" data-aos="fade-up" data-aos-delay="100">
            {t('hero.title')}{" "}
            <span className="block md:inline bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              {t('hero.aiTitle')}
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg max-w-2xl mx-auto font-light" data-aos="fade-up" data-aos-delay="200">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="300">
            <a 
              href="#solutions"
              className="group inline-block"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#solutions');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <button 
                className="relative inline-flex items-center justify-center rounded-xl font-semibold text-white shadow-2xl h-12 px-8 text-base bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 backdrop-blur-sm transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group"
                aria-label="Explore our solutions"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <Eye className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">{t('hero.exploreBtn')}</span>
              </button>
            </a>
          </div>
        </div>

        {/* Client Logos at bottom of hero */}
        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 w-full z-10 flex justify-center">
          {/* Backdrop for better visibility - matches scroll section width */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full py-3 md:py-4 px-8 md:px-12 shadow-2xl max-w-5xl mx-4">
            {/* Auto-scrolling logos with side fades using mask-image */}
            <div className="relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
                {/* Scrolling logos */}
                <div className="animate-infinite-scroll inline-flex items-center gap-8 md:gap-12 w-max whitespace-nowrap">
                  {duplicatedLogos.map((logo, index) => (
                    <div
                      key={`hero-logo-${index}`}
                      className="flex-shrink-0 min-w-[100px] md:min-w-[120px] flex justify-center"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className={`${logo.heightClass} ${
                          logo.useFilter 
                          ? 'brightness-0 invert opacity-80' 
                          : 'grayscale contrast-125 brightness-110 invert opacity-80'
                      } hover:opacity-100 hover:scale-110 transition-all duration-300`}
                      />
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;