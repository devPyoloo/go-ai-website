import { useState, useRef } from "react";
import { Play } from "lucide-react";
import type { FooterProps } from "../interface/t";

const RoboticSection = ({ t }: FooterProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false; // Enable sound
        videoRef.current.play();
      }
    }, 200);
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-48 h-48 bg-red-400/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Robot images for large screens */}
<div className="hidden md:block">
  <img
    src="/images/robotdog.png"
    loading="lazy"
    className="absolute z-30 w-[28vw] max-w-[380px] right-[8%] top-[10%] hover:scale-110 hover:rotate-2 transition-transform duration-500 animate-float"
    alt="AI-powered robotic dog"
  />

  <img
    src="/images/drone.png"
    loading="lazy"
    className="absolute z-30 w-[22vw] max-w-[280px] left-[8%] top-[10%] hover:scale-110 hover:-rotate-3 transition-transform duration-500 animate-float-delayed"
    alt="Autonomous drone with computer vision"
  />
</div>


      {/* Text section */}
      <div className="container mx-auto max-w-4xl relative z-10 text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-red-50 rounded-full mx-auto">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-red-600">AI ROBOTICS</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-red-600 bg-clip-text text-transparent">
          {t("robot.title")}
        </h2>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed mx-auto max-w-2xl">
          {t("robot.content")}
        </p>

        <p className="mt-8 text-xl font-semibold text-red-600">
          <span className="animate-pulse">✨</span> {t("robot.tagline")}
        </p>
      </div>

      {/* Video Section */}
      <div className="container mx-auto">
        <div className="relative min-h-[400px] md:min-h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
          {/* Video or Thumbnail */}
          {isPlaying ? (
            <video
              ref={videoRef}
              loop
              playsInline
              controls
              className="w-full h-full object-cover"
            >
              <source src="/safedog.mp4" type="video/mp4" />
            </video>
          ) : (
            <div className="w-full h-full overflow-hidden">
              <img
                src="/images/thumbnail.png"
                alt="Video Thumbnail"
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}

          {/* Overlay + Play Button */}
          {!isPlaying && (
            <div
              onClick={handlePlay}
              className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-black/30 cursor-pointer"
            >
              {/* Play Button */}
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                <Play className="w-10 h-10 md:w-12 md:h-12 text-red-600 ml-0.5 fill-red-600" />
              </div>

              {/* Title Overlay Below Button */}
              <div className="mt-6 text-center">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                  Robotic Vision Demo
                </h3>
                <p className="text-white/80 text-sm md:text-base">
                  Click to watch our platform in action
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoboticSection;
