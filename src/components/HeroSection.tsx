import { Eye, Play } from "lucide-react";
import type { FooterProps } from "../interface/t";

const HeroSection = ({ t }: FooterProps) => (
  <section className="relative pt-24 pb-16 px-4 min-h-[80vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
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
        
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 mb-6 bg-red-500/20 text-red-100 border-red-400/30 backdrop-blur-sm" data-aos="fade-up">
            {t('hero.tagline')}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent leading-tight drop-shadow-lg" data-aos="fade-up" data-aos-delay="100">
            {t('hero.title')}{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
              {t('hero.aiTitle')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed drop-shadow-md" data-aos="fade-up" data-aos-delay="200">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
            <a 
              href="#solutions">
<button className="inline-flex items-center justify-center rounded-md font-medium ring-offset-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white shadow-xl h-11 px-8 text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 backdrop-blur-sm transform hover:scale-105 transition-all duration-200">
              <Eye className="w-5 h-5 mr-2" />
              {t('hero.exploreBtn')}
            </button>
              </a>
            
            <button className="inline-flex items-center justify-center rounded-md font-medium ring-offset-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-red-300/50 bg-white/10 backdrop-blur-sm shadow-xl hover:bg-white/20 hover:text-white h-11 px-8 text-lg text-red-100 transform hover:scale-105 transition-all duration-200">
              <Play className="w-5 h-5 mr-2" />
              {t('hero.demoBtn')}
            </button>
          </div>
        </div>
      </section>
);

export default HeroSection;