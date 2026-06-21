import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useVideoPlayer, useHdVideoSrc } from "@/hooks/useVideoPlayer";

const stats = [
  { value: 6, label: "Blog Posts", suffix: "" },
  { value: 350, label: "Social Impressions", suffix: "K" },
  { value: 11, label: "Quoted", suffix: "" },
  { value: 4, label: "Researcher", suffix: "+" },
];

const ResearchHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroVideoSrc = useHdVideoSrc('/videos/research-background.mp4');

  const {
    videoRef,
    hasVideoError,
    shouldDisableVideo,
    videoProps,
    posterProps,
    ShimmerOverlay,
  } = useVideoPlayer({
    src: '/videos/research-background.mp4',
    poster: '/images/posters/research-background-poster.jpg',
    autoPlay: true,
    preload: 'auto',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img {...posterProps} fetchPriority="high" decoding="async" />
        <ShimmerOverlay />
        {!shouldDisableVideo && !hasVideoError && (
          <video
            ref={videoRef}
            {...videoProps}
            className="absolute inset-0 w-full h-full object-cover z-10"
            style={{ ...videoProps.style, WebkitAppearance: 'none' }}
          >
            <source src={`${heroVideoSrc}#t=0.001`} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/45 z-[11]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0A0A0A] z-[12]" />

      {/* Content */}
      <div className="flex-1 flex items-center justify-center relative z-[14] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-sans text-[clamp(2.2rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em] mb-4 sm:mb-6 mt-8 sm:mt-20 text-white">
            <span className="block">Web3 Market Insights</span>
            <span className="block bg-gradient-to-r from-primary via-emerald-300 to-emerald-400 bg-clip-text text-transparent">& Data-Driven Blog</span>
          </h1>

          <p className="text-[14px] sm:text-lg md:text-[22px] text-white/75 max-w-5xl mx-auto mb-5 sm:mb-10 font-light tracking-wide leading-[1.6] px-1 sm:px-0">
            Comprehensive market analysis and data-driven insights<br className="hidden sm:block" /><span className="sm:hidden"> </span>to stay ahead in Web3.
          </p>

          <button
            onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-black font-semibold text-[13px] sm:text-sm rounded-full hover:bg-white/90 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.97]"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Explore Blog</span>
          </button>

          <p className="mt-3 text-[11px] sm:text-sm text-white/40">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Weekly updates • Free access
            </span>
          </p>
        </div>
      </div>

      {/* Stats Bar - transparent, bottom */}
      <div className="relative z-[14] py-4 sm:py-8">
        <div className="container mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                isVisible={isVisible}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({
  value, label, prefix = "", suffix = "", isVisible, delay
}: {
  value: number; label: string; prefix?: string; suffix?: string; isVisible: boolean; delay: number;
}) => {
  const count = useCountUp({ end: Math.round(value), isVisible, delay, duration: 2000, decimals: 0 });

  return (
    <div className="text-center">
      <div className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 tracking-tighter leading-none">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[10px] sm:text-sm md:text-base text-white/45 font-medium">
        {label}
      </div>
    </div>
  );
};

export default ResearchHeroSection;
