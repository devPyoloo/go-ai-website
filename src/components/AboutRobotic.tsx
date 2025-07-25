import { Eye, Play } from "lucide-react";
import type { FooterProps } from "../interface/t";

const AboutRobotic = ({ t }: FooterProps) => (
  <section id="robotic-vision" className="relative py-20 px-4 bg-gradient-to-br from-background to-red-50/20 overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-400/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
    
    {/* Interactive robot images - kept absolute positioned */}
    <div className="hidden md:block">
      <img 
        src="/images/robotdog.png" 
        className="absolute w-[30vw] max-w-[400px] right-[5%] top-1/2 -translate-y-1/2 hover:scale-105 transition-transform duration-300 cursor-pointer" 
        alt="AI-powered robotic dog" 
      />
      <img 
        src="/images/drone.png" 
        className="absolute w-[25vw] max-w-[300px] left-[5%] top-1/2 -translate-y-1/2 hover:scale-105 transition-transform duration-300 cursor-pointer" 
        alt="Autonomous drone with computer vision" 
      />
    </div>

    {/* Centered content container */}
    <div className="container mx-auto max-w-4xl relative z-10">
      <div className="text-center">
        {/* AI Robotics badge - centered */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-red-50 rounded-full mx-auto">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-red-600">AI ROBOTICS</span>
        </div>
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-red-600 bg-clip-text text-transparent">
          {t('robot.title')}
        </h2>
        
        {/* Content */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed mx-auto max-w-2xl">
          {t('robot.content')}
        </p>
        
        
        {/* Tagline - centered */}
        <p className="mt-8 text-xl font-semibold text-red-600">
          <span className="animate-pulse">✨</span> {t('robot.tagline')}
        </p>
      </div>
    </div>
  </section>
);

export default AboutRobotic;