import { Globe, TrendingUp, Zap } from "lucide-react";
import type { FooterProps } from "../interface/t";

const WhyChoose = ({ t }: FooterProps) => (
  <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-background via-red-50/5 to-background relative overflow-hidden">
    {/* Decorative background */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-400 rounded-full blur-3xl"></div>
    </div>
    
    <div className="container mx-auto max-w-7xl relative z-10">
      <div className="text-center mb-16">
        <span className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold mb-6 bg-red-50/80 backdrop-blur-sm text-red-600 border-red-200/50 shadow-sm" data-aos="fade-up">
          {t('why.title')}
        </span>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-red-600 to-foreground bg-clip-text text-transparent leading-tight"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t('why.title')}
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div
          className="group relative p-8 text-center rounded-2xl bg-white/50 backdrop-blur-sm border border-red-100/50 hover:shadow-2xl transition-all duration-500 hover:shadow-red-200/50 hover:border-red-200 hover:-translate-y-2"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
              {t('why.ecosystem.title')}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('why.ecosystem.description')}
            </p>
          </div>
        </div>

        <div
          className="group relative p-8 text-center rounded-2xl bg-white/50 backdrop-blur-sm border border-red-100/50 hover:shadow-2xl transition-all duration-500 hover:shadow-red-200/50 hover:border-red-200 hover:-translate-y-2"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
              {t('why.industry.title')}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('why.industry.description')}
            </p>
          </div>
        </div>

        <div
          className="group relative p-8 text-center rounded-2xl bg-white/50 backdrop-blur-sm border border-red-100/50 hover:shadow-2xl transition-all duration-500 hover:shadow-red-200/50 hover:border-red-200 hover:-translate-y-2"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
              {t('why.scalable.title')}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('why.scalable.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChoose;
