import { Globe, TrendingUp, Zap } from "lucide-react";
import type { FooterProps } from "../interface/t";

const WhyChoose = ({ t }: FooterProps) => (
  <section className="py-16 px-4 bg-gradient-to-r from-red-50/20 to-background">
        <div className="container mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-red-600 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            {t('why.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div
              className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:shadow-red-100"
              data-aos="fade-up"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-600">
                {t('why.ecosystem.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('why.ecosystem.description')}
              </p>
            </div>

            <div
              className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:shadow-red-100"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-600">
                {t('why.industry.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('why.industry.description')}
              </p>
            </div>

            <div
              className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:shadow-red-100"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-600">
                {t('why.scalable.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('why.scalable.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
);

export default WhyChoose;
