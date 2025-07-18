import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, ExternalLink, Play, Pause, Volume2, VolumeX } from "lucide-react";

const SolutionsSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});
  const [isMuted, setIsMuted] = useState(true);

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

  const solutions = [
    {
      id: 'motion',
      category: 'AI Motion Analysis',
      title: 'Intelligent Motion Detection',
      description: 'Advanced computer vision system that analyzes movement patterns and behaviors in real-time with unprecedented accuracy.',
      features: ['Real-time behavior analysis', 'Motion pattern recognition', 'Automated alerts system', 'Historical data tracking'],
      videoSrc: '/behaviour.mp4',
      buttonText: 'Learn More',
      buttonLink: 'https://www.aimotion.go-ai.one/',
      gradientFrom: 'from-blue-500/10',
      gradientTo: 'to-purple-500/10',
      borderColor: 'border-blue-200/20',
      buttonGradient: 'from-blue-500 to-purple-600',
      buttonHover: 'hover:from-blue-600 hover:to-purple-700',
      categoryBg: 'bg-blue-100',
      categoryText: 'text-blue-600',
      categoryBorder: 'border-blue-200',
      accentColor: 'blue'
    },
    {
      id: 'rotation',
      category: 'Rotation Maintenance',
      title: 'Predictive Maintenance System',
      description: 'Revolutionary rotation analysis technology that predicts equipment failures before they occur, saving time and costs.',
      features: ['Predictive failure analysis', 'Automated maintenance scheduling', 'Real-time monitoring', 'Cost optimization'],
      videoSrc: '/rotation.mp4',
      secondaryVideoSrc: '/count.mp4',
      buttonText: 'Learn More',
      gradientFrom: 'from-orange-500/10',
      gradientTo: 'to-red-500/10',
      borderColor: 'border-orange-200/20',
      buttonGradient: 'from-orange-500 to-red-600',
      buttonHover: 'hover:from-orange-600 hover:to-red-700',
      categoryBg: 'bg-orange-100',
      categoryText: 'text-orange-600',
      categoryBorder: 'border-orange-200',
      accentColor: 'orange'
    },
    {
      id: 'video',
      category: 'Video Recognition',
      title: 'Advanced Object Detection',
      description: 'State-of-the-art video recognition system that identifies and tracks objects with machine learning precision.',
      features: ['Multi-object tracking', 'Real-time classification', 'Custom model training', 'Edge computing support'],
      videoSrc: '/detection.mp4',
      buttonText: 'Request Demo',
      gradientFrom: 'from-green-500/10',
      gradientTo: 'to-teal-500/10',
      borderColor: 'border-green-200/20',
      buttonGradient: 'from-green-500 to-teal-600',
      buttonHover: 'hover:from-green-600 hover:to-teal-700',
      categoryBg: 'bg-green-100',
      categoryText: 'text-green-600',
      categoryBorder: 'border-green-200',
      accentColor: 'green'
    },
    {
      id: 'gauge',
      category: 'Gauge Measurement',
      title: 'Precision Measurement System',
      description: 'Automated gauge reading system that eliminates human error and provides accurate measurements in industrial environments.',
      features: ['Automated readings', 'Error elimination', 'Data logging', 'Integration ready'],
      videoSrc: '/reading.mp4',
      buttonText: 'Learn More',
      gradientFrom: 'from-orange-500/10',
      gradientTo: 'to-red-500/10',
      borderColor: 'border-orange-200/20',
      buttonGradient: 'from-orange-500 to-red-600',
      buttonHover: 'hover:from-orange-600 hover:to-red-700',
      categoryBg: 'bg-orange-100',
      categoryText: 'text-orange-600',
      categoryBorder: 'border-orange-200',
      accentColor: 'orange',
      hasScrollingData: true
    },
    {
      id: 'custom',
      category: 'Custom AI Vision',
      title: 'Tailored Vision Solutions',
      description: 'Custom-built AI vision systems designed specifically for your unique business requirements and industry challenges.',
      features: ['Custom model development', 'Industry-specific solutions', 'Scalable architecture', 'Dedicated support'],
      videoSrc: '/street.mp4',
      buttonText: 'Learn More',
      gradientFrom: 'from-green-500/10',
      gradientTo: 'to-teal-500/10',
      borderColor: 'border-green-200/20',
      buttonGradient: 'from-green-500 to-teal-600',
      buttonHover: 'hover:from-green-600 hover:to-teal-700',
      categoryBg: 'bg-green-100',
      categoryText: 'text-green-600',
      categoryBorder: 'border-green-200',
      accentColor: 'green'
    }
  ];

  const handleVideoInteraction = (videoId, action) => {
    setIsPlaying(prev => ({
      ...prev,
      [videoId]: action === 'play'
    }));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full border border-blue-200/50 bg-blue-50/50 px-4 py-2 text-sm font-medium text-blue-600 mb-6 backdrop-blur-sm">
            ✨ AI-Powered Solutions
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Transform Your Vision
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Cutting-edge AI vision solutions that revolutionize how you monitor, analyze, and optimize your operations with unprecedented accuracy and intelligence.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="space-y-32">
          {solutions.map((solution, index) => (
            <div 
              key={solution.id} 
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
              }`}
            >
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
                
                <div className="flex items-center gap-4 pt-4">
                  {solution.buttonLink ? (
                    <a
                      href={solution.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <button className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold text-white shadow-lg h-12 px-6 py-3 bg-gradient-to-r ${solution.buttonGradient} ${solution.buttonHover} transition-all duration-300 hover:shadow-xl hover:scale-105 relative overflow-hidden`}>
                        <span className="relative z-10 flex items-center">
                          {solution.buttonText}
                          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </a>
                  ) : (
                    <button className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold text-white shadow-lg h-12 px-6 py-3 bg-gradient-to-r ${solution.buttonGradient} ${solution.buttonHover} transition-all duration-300 hover:shadow-xl hover:scale-105 group relative overflow-hidden`}>
                      <span className="relative z-10 flex items-center">
                        {solution.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  )}
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
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onPlay={() => handleVideoInteraction(solution.id, 'play')}
                        onPause={() => handleVideoInteraction(solution.id, 'pause')}
                      >
                        <source src={solution.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      
                      {/* Video Controls Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={toggleMute}
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                          >
                            {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                          </button>
                        </div>
                      </div>
                      
                      {/* Secondary video for rotation solution */}
                      {solution.secondaryVideoSrc && (
                        <div className="absolute bottom-4 left-4 w-1/3 rounded-xl overflow-hidden shadow-lg">
                          <video
                            autoPlay
                            loop
                            muted={isMuted}
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