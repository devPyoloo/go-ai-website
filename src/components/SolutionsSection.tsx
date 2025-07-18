import { CheckCircle } from "lucide-react";
import type { FooterProps } from "../interface/t";

const SolutionsSection = ({ t }: FooterProps) => {

  const textData = [
    "drill 96.1",
    "torque 75.7",
    "pression 11.3",
    "drill 103.6",
    "torque 65.9",
    "pression 12.1",
    "drill 102.5",
    "torque 64.3",
    "pression 10.4",
    "drill 97.7",
    "torque 64.2",
    "pression 9.0",
    "drill 99.1",
    "torque 62.9",
    "pression 18.0",
  ];

  const duplicatedText = [...textData, ...textData];

  // Define solutions with translation keys
  const solutions = [
    {
      id: 'motion',
      category: t("solutions.motion.category"),
      title: t("solutions.motion.title"),
      description: t("solutions.motion.description"),
      features: t("solutions.motion.features", { returnObjects: true }),
      videoSrc: '/behaviour.mp4',
      gradientFrom: 'from-blue-500/10',
      gradientTo: 'to-purple-500/10',
      borderColor: 'border-blue-200/20',
      buttonGradient: 'from-blue-500 to-purple-600',
      buttonHover: 'hover:from-blue-600 hover:to-purple-700',
      categoryBg: 'bg-blue-100',
      categoryText: 'text-blue-600',
      categoryBorder: 'border-blue-200',
      accentColor: 'blue',
      fullWidthVideo: true
    },
    {
      id: 'rotation',
      category: t("solutions.rotation.category"),
      title: t("solutions.rotation.title"),
      description: t("solutions.rotation.description"),
      features: t("solutions.rotation.features", { returnObjects: true }),
      videoSrc: '/rotation.mp4',
      secondaryVideoSrc: '/count.mp4',
      gradientFrom: 'from-orange-500/10',
      gradientTo: 'to-red-500/10',
      borderColor: 'border-orange-200/20',
      buttonGradient: 'from-orange-500 to-red-600',
      buttonHover: 'hover:from-orange-600 hover:to-red-700',
      categoryBg: 'bg-orange-100',
      categoryText: 'text-orange-600',
      categoryBorder: 'border-orange-200',
      accentColor: 'orange',
      fullWidthVideo: false
    },
    {
      id: 'video',
      category: t("solutions.video.category"),
      title: t("solutions.video.title"),
      description: t("solutions.video.description"),
      features: t("solutions.video.features", { returnObjects: true }),
      videoSrc: '/detection.mp4',
      gradientFrom: 'from-green-500/10',
      gradientTo: 'to-teal-500/10',
      borderColor: 'border-green-200/20',
      buttonGradient: 'from-green-500 to-teal-600',
      buttonHover: 'hover:from-green-600 hover:to-teal-700',
      categoryBg: 'bg-green-100',
      categoryText: 'text-green-600',
      categoryBorder: 'border-green-200',
      accentColor: 'green',
      fullWidthVideo: true
    },
    {
      id: 'gauge',
      category: t("solutions.gauge.category"),
      title: t("solutions.gauge.title"),
      description: t("solutions.gauge.description"),
      features: t("solutions.gauge.features", { returnObjects: true }),
      videoSrc: '/reading.mp4',
      gradientFrom: 'from-orange-500/10',
      gradientTo: 'to-red-500/10',
      borderColor: 'border-orange-200/20',
      buttonGradient: 'from-orange-500 to-red-600',
      buttonHover: 'hover:from-orange-600 hover:to-red-700',
      categoryBg: 'bg-orange-100',
      categoryText: 'text-orange-600',
      categoryBorder: 'border-orange-200',
      accentColor: 'orange',
      hasScrollingData: true,
      fullWidthVideo: false
    },
    {
      id: 'custom',
      category: t("solutions.custom.category"),
      title: t("solutions.custom.title"),
      description: t("solutions.custom.description"),
      features: t("solutions.custom.features", { returnObjects: true }),
      videoSrc: '/street.mp4',
      gradientFrom: 'from-green-500/10',
      gradientTo: 'to-teal-500/10',
      borderColor: 'border-green-200/20',
      buttonGradient: 'from-green-500 to-teal-600',
      buttonHover: 'hover:from-green-600 hover:to-teal-700',
      categoryBg: 'bg-green-100',
      categoryText: 'text-green-600',
      categoryBorder: 'border-green-200',
      accentColor: 'green',
      fullWidthVideo: true
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full border border-blue-200/50 bg-blue-50/50 px-4 py-2 text-sm font-medium text-red-600 mb-6 backdrop-blur-sm">
            {t("solutions.title")}
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-red-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Transform Your Vision
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("solutions.subtitle")}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="space-y-48">
          {solutions.map((solution, index) => (
            <div 
              key={solution.id} 
              className={`relative ${solution.fullWidthVideo ? 'min-h-[600px]' : ''}`}
            >
              {/* Full width video layout */}
              {solution.fullWidthVideo ? (
                <div className="relative h-full rounded-3xl overflow-hidden">
                  {/* Video background */}
                  <div className="absolute inset-0 w-full h-full">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={solution.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* Overlay with gradient - now on the left side */}
                    <div className={`absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent`}></div>
                  </div>
                  
                  {/* Content - positioned on the right */}
                  <div className="container mx-auto relative z-10 h-full flex items-center justify-end">
                    <div className="max-w-xl p-8 round-r-2xl backdrop-blur-sm bg-white/10 border border-white/20">
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-all duration-300 ${solution.categoryBg} ${solution.categoryText} ${solution.categoryBorder} hover:shadow-lg hover:scale-105 backdrop-blur-sm`}>
                          {solution.category}
                        </span>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${solution.buttonGradient} animate-pulse`}></div>
                      </div>
                      
                      <h3 className="text-4xl font-bold text-white leading-tight mb-4">
                        {solution.title}
                      </h3>
                      
                      <p className="text-lg text-white/80 leading-relaxed mb-6">
                        {solution.description}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {solution.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex} 
                            className="group flex items-center p-3 rounded-xl bg-white/20 border border-white/30 hover:bg-white/30 hover:border-white/40 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          >
                            <CheckCircle className="w-5 h-5 text-green-300 mr-3 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm font-medium text-white">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Original layout for non-full-width sections */
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}>
                  {/* Content */}
                  <div className={`${index % 2 === 0 ? 'order-2 lg:order-1' : 'order-1 lg:order-2'} space-y-6`}>
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-all duration-300 ${solution.categoryBg} ${solution.categoryText} ${solution.categoryBorder} hover:shadow-lg hover:scale-105 backdrop-blur-sm`}>
                        {solution.category}
                      </span>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${solution.buttonGradient} animate-pulse`}></div>
                    </div>
                    
                    <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                      {solution.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {solution.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {solution.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex} 
                          className="group flex items-center p-3 rounded-xl bg-white/60 border border-gray-200/50 hover:bg-white/80 hover:border-gray-300/50 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-sm font-medium text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Container */}
                  <div className={`${index % 2 === 0 ? 'order-1 lg:order-2' : 'order-2 lg:order-1'} relative group`}>
                    <div className={`bg-gradient-to-br ${solution.gradientFrom} ${solution.gradientTo} rounded-3xl p-8 border ${solution.borderColor} hover:shadow-2xl transition-all duration-500 backdrop-blur-sm relative overflow-hidden`}>
                      {/* Animated border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      
                      <div className="relative z-10">
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          >
                            <source src={solution.videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          
                          {/* Secondary video for rotation solution */}
                          {solution.secondaryVideoSrc && (
                            <div className="absolute bottom-4 left-4 w-1/3 rounded-xl overflow-hidden shadow-lg">
                              <video
                                autoPlay
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                              >
                                <source src={solution.secondaryVideoSrc} type="video/mp4" />
                              </video>
                            </div>
                          )}
                          
                          {/* Scrolling data for gauge solution */}
                          {solution.hasScrollingData && (
                            <div className="absolute -bottom-6 left-4 right-4 overflow-hidden py-4">
                              <div className="flex animate-scroll gap-4">
                                {duplicatedText.map((text, textIndex) => (
                                  <div
                                    key={`${text}-${textIndex}`}
                                    className="flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-mono font-semibold text-gray-800 shadow-md border border-gray-200/50 hover:bg-white hover:shadow-lg transition-all duration-300"
                                  >
                                    {text}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
};

export default SolutionsSection;