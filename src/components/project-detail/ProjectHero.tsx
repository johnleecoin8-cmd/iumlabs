import { ArrowLeft, ExternalLink, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import KeyResultMarquee from "./KeyResultMarquee";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";

interface ProjectHeroProps {
  project: {
    name: string;
    description: string;
    category: string;
    glowColor: string;
    bgImage?: string;
    bgVideo?: string;
    services?: string[];
  };
  websiteUrl?: string;
}

// 플로팅 태그 위치 (데스크톱)
const tagPositions = [
  "top-[18%] left-[8%]",
  "top-[35%] left-[5%]",
  "top-[55%] left-[7%]",
  "top-[72%] left-[4%]",
  "top-[20%] right-[6%]",
  "top-[38%] right-[8%]",
  "top-[58%] right-[5%]",
  "top-[75%] right-[7%]",
];

// 플로팅 태그 위치 (모바일)
const mobileTagPositions = [
  "top-[22%] left-[3%]",
  "top-[32%] right-[3%]",
  "top-[42%] left-[5%]",
  "top-[52%] right-[4%]",
];

const ProjectHero = ({ project, websiteUrl }: ProjectHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const services = project.services || [];

  // Use bgImage as fallback poster
  const posterImage = project.bgImage || "/images/hero-poster.jpg";

  const {
    videoRef,
    isVideoReady,
    hasVideoError,
    shouldDisableVideo,
    videoProps,
    posterProps,
    ShimmerOverlay,
  } = useVideoPlayer({
    src: project.bgVideo || '',
    poster: posterImage,
  });

  return (
    <div className="relative h-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Fallback poster - always visible as base layer */}
      <img
        {...posterProps}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Shimmer loading overlay */}
      <ShimmerOverlay />
      
      {/* Background Layer - Video */}
      {project.bgVideo && !shouldDisableVideo && !hasVideoError && (
        <video
          ref={videoRef}
          {...videoProps}
          className="absolute inset-0 w-full h-full object-cover z-10"
        >
          <source src={`${project.bgVideo}#t=0.001`} type="video/mp4" />
        </video>
      )}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Bottom gradient for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(0,0%,4%,0.95)]" />

      {/* Floating Service Tags - Desktop */}
      {services.slice(0, 8).map((service, index) => (
        <div 
          key={index} 
          className={`absolute ${tagPositions[index] || tagPositions[0]} hidden lg:block z-10`}
          style={{
            animation: `float-gentle ${3 + (index % 3) * 0.5}s ease-in-out infinite`,
            animationDelay: `${index * 0.15}s`
          }}
        >
          <span 
            className={`
              px-4 py-2 text-xs rounded-lg 
              bg-white/[0.04] backdrop-blur-md border border-white/[0.12]
              text-white/65 tracking-wide
              transition-all duration-500 ease-out cursor-default
              hover:bg-white/[0.08] hover:border-white/[0.22] hover:text-white/90
              hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:scale-105
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ 
              transitionDelay: `${0.3 + index * 0.1}s`,
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            {service}
          </span>
        </div>
      ))}

      {/* Floating Service Tags - Mobile */}
      {services.slice(0, 4).map((service, index) => (
        <div 
          key={`mobile-${index}`} 
          className={`absolute ${mobileTagPositions[index] || mobileTagPositions[0]} block lg:hidden z-10`}
          style={{
            animation: `float-gentle ${3 + (index % 2) * 0.5}s ease-in-out infinite`,
            animationDelay: `${index * 0.2}s`
          }}
        >
          <span 
            className={`
              px-3 py-1.5 text-[10px] rounded-md 
              bg-white/[0.04] backdrop-blur-md border border-white/[0.12]
              text-white/65 tracking-wide
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ 
              transitionDelay: `${0.3 + index * 0.1}s`,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
            }}
          >
            {service}
          </span>
        </div>
      ))}

      {/* Top Navigation */}
      <div className="relative z-10 flex justify-between items-start p-6 sm:p-8 md:p-12 pt-20 sm:pt-24">
        <Link 
          to="/projects"
          className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">Back</span>
        </Link>
        
        <div className="text-right">
          <span className="text-xs text-white/40 uppercase tracking-wider block">year</span>
          <span className="text-lg text-white">2025</span>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Project Name */}
          <motion.h1 
            className="font-display text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {project.name}
          </motion.h1>
          
          {/* Project Description */}
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {project.description}
          </motion.p>
          
          {/* CTA Button */}
          {websiteUrl && (
            <motion.a 
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 sm:mt-8 relative inline-flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-[15px] font-medium transition-all duration-500
                bg-transparent text-white border border-white/30 rounded-none
                hover:border-white hover:bg-white/5 hover:pl-8 hover:pr-6
                active:scale-[0.98]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <span className="relative z-10 tracking-wide uppercase text-xs sm:text-sm">Explore Project</span>
              <ExternalLink className="w-3.5 h-3.5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute left-0 top-0 h-full w-0.5 bg-white/50 group-hover:bg-white group-hover:h-full transition-all duration-300" />
            </motion.a>
          )}
          
        </div>
      </div>

      {/* Bottom Section with KeyResult Marquee */}
      <div className="relative z-10">
        {/* Scroll Indicator */}
        <div className="absolute bottom-20 right-6 sm:right-8 z-10 flex items-center gap-2 group cursor-pointer hover:gap-3 transition-all duration-300">
          <span className="text-white/40 text-xs sm:text-sm tracking-wide group-hover:text-white/60 transition-colors">scroll</span>
          <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-white/40 transition-colors">
            <div className="w-1 h-1.5 sm:w-1.5 sm:h-2 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>

        {/* Key Result Marquee */}
        <KeyResultMarquee />
      </div>
    </div>
  );
};

export default ProjectHero;
