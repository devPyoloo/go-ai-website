import type { FooterProps } from "../interface/t";

const AboutSection = ({ t }: FooterProps) => (
  <section id="about" className="py-20 md:py-28 px-4 bg-gradient-to-b from-background via-red-50/5 to-background relative overflow-hidden">
    {/* Decorative background elements */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-400 rounded-full blur-3xl"></div>
    </div>
    
    <div className="container mx-auto max-w-5xl text-center relative z-10">
      <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold mb-8 bg-red-50/80 backdrop-blur-sm text-red-600 border-red-200/50 shadow-sm" data-aos="fade-up">
        {t('about.title')}
      </div>
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground via-red-600 to-foreground bg-clip-text text-transparent leading-tight"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {t('about.title')}
      </h2>
      <p
        className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {t('about.content')}
      </p>
      <div 
        className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/10 backdrop-blur-sm border border-red-200/30 shadow-lg"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
          {t('about.tagline')}
        </p>
      </div>
    </div>
  </section>
);

export default AboutSection;
