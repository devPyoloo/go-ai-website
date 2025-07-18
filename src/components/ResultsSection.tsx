import { Star, Users } from "lucide-react";
import type { FooterProps } from "../interface/t";

const ResultsSection = ({ t }: FooterProps) => (
  <section className="py-16 px-4 bg-gradient-to-r from-background to-red-50/10">
        <div className="container mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-red-600 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            {t('results.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="p-6 hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-red-500 mr-2" />
                <span className="font-semibold">{t('results.manufacturing.title')}</span>
              </div>
              <blockquote className="text-muted-foreground italic">
                {t('results.manufacturing.quote')}
              </blockquote>
              <div className="flex items-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>

            <div
              className="p-6 hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-red-500 mr-2" />
                <span className="font-semibold">{t('results.healthcare.title')}</span>
              </div>
              <blockquote className="text-muted-foreground italic">
                {t('results.healthcare.quote')}
              </blockquote>
              <div className="flex items-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>

            <div
              className="p-6 hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-red-500 mr-2" />
                <span className="font-semibold">{t('results.retail.title')}</span>
              </div>
              <blockquote className="text-muted-foreground italic">
                {t('results.retail.quote')}
              </blockquote>
              <div className="flex items-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
);

export default ResultsSection;
