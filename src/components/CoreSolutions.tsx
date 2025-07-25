import {
  CheckCircle,
  Video,
  Image as ImageIcon,
} from "lucide-react";
import type { FooterProps } from "../interface/t";

const CoreSolutions = ({ t }: FooterProps) => (
  <section className="py-16 px-4 bg-gradient-to-r from-red-50/20 to-background">
    <div className="container mx-auto">
      <h2
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-red-600 bg-clip-text text-transparent"
        data-aos="fade-up"
      >
        {t("suite.title")}
      </h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Intelligence */}
        <div
          className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:shadow-red-100 border-red-100"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
            <Video className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-red-600">
            {t("suite.video.title")}
          </h3>
          <p className="text-muted-foreground mb-4">
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

        {/* Image AI */}
        <div
          className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:shadow-red-100 border-red-100"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-red-600">
            {t("suite.image.title")}
          </h3>
          <p className="text-muted-foreground mb-4">
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
  </section>
);

export default CoreSolutions;
