import { Brain, Eye, MessageSquare } from "lucide-react";
import type { FooterProps } from "../interface/t";

const TechnologyStack = ({ t }: FooterProps) => (
 <section id="technology" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-red-600 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            {t('technology.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <Eye className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">{t('technology.vision.title')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {Array.isArray(t('technology.vision.features', { returnObjects: true }))
                  ? (t('technology.vision.features', { returnObjects: true }) as string[]).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))
                  : null}
              </ul>
            </div>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <MessageSquare className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">
                {t('technology.nlp.title')}
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {Array.isArray(t('technology.nlp.features', { returnObjects: true }))
                  ? (t('technology.nlp.features', { returnObjects: true }) as string[]).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))
                  : null}
              </ul>
            </div>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Brain className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">{t('technology.ml.title')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {Array.isArray(t('technology.ml.features', { returnObjects: true }))
                  ? (t('technology.ml.features', { returnObjects: true }) as string[]).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </section>
);

export default TechnologyStack;
