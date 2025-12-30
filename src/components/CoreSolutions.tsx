import {
  CheckCircle,
  Video,
  Image as ImageIcon,
} from "lucide-react";
import type { FooterProps } from "../interface/t";

const CoreSolutions = ({ t }: FooterProps) => (
  <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-background via-white to-background relative">
    <div className="container mx-auto max-w-7xl">
      <div className="text-center mb-16">
        <span className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold mb-6 bg-red-50/80 backdrop-blur-sm text-red-600 border-red-200/50 shadow-sm" data-aos="fade-up">
          {t("suite.title")}
        </span>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-red-600 to-foreground bg-clip-text text-transparent leading-tight"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t("suite.title")}
        </h2>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Intelligence */}
        <div
          className="group relative border rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:shadow-red-200/50 border-red-100/50 bg-white/50 backdrop-blur-sm hover:border-red-200 hover:-translate-y-2"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
              {t("suite.video.title")}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("suite.video.description")}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {Array.isArray(t("suite.video.features", { returnObjects: true }))
                ? (
                    t("suite.video.features", { returnObjects: true }) as string[]
                  ).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                      {feature}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        {/* Image AI */}
        <div
          className="group relative border rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:shadow-red-200/50 border-red-100/50 bg-white/50 backdrop-blur-sm hover:border-red-200 hover:-translate-y-2"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
              {t("suite.image.title")}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("suite.image.description")}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {Array.isArray(t("suite.image.features", { returnObjects: true }))
                ? (
                    t("suite.image.features", { returnObjects: true }) as string[]
                  ).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                      {feature}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CoreSolutions;
