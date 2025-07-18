import { Calendar, CheckCircle } from "lucide-react";
import type { FooterProps } from "../interface/t";


const CTASection = ({ t }: FooterProps) => (
<section className="py-16 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6" data-aos="fade-up">
            {t('cta.title')}
          </h2>
          <p
            className="text-xl mb-8 opacity-90"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
            <button className="inline-flex items-center justify-center rounded-md bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <CheckCircle className="w-5 h-5 mr-2" />
              {t('cta.consultation')}
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-white text-white hover:bg-white/10 text-lg px-8 py-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white bg-transparent">
              <Calendar className="w-5 h-5 mr-2" />
              {t('cta.demo')}
            </button>
          </div>
        </div>
      </section>
);

export default CTASection;
