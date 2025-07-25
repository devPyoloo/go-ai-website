import type { FooterProps } from "../interface/t";

const AboutSection = ({ t }: FooterProps) => (
  <section id="about" className="py-16 px-4 bg-gradient-to-r from-background to-red-50/10">
    
        <div className="container mx-auto max-w-4xl text-center">
          <h2
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-red-600 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            {t('about.title')}
          </h2>
          <p
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t('about.content')}
          </p>
          <p
            className="text-xl font-semibold text-red-600"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('about.tagline')}
          </p>
        </div>
      </section>

);

export default AboutSection;
