import { BookOpen, Send } from "lucide-react";
import { useEffect, useState, MouseEvent } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useRipple } from "@/hooks/useRipple";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

// Import client logos (same as HeroSection)
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin-mono.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import spacecoinLogo from "@/assets/logos/spacecoin.png";
import triaLogo from "@/assets/logos/tria-mono.png";
import mantraLogo from "@/assets/logos/mantra-mono.png";
import saharaAiLogo from "@/assets/logos/sahara-ai-mono.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";

// Desktop tags
const serviceTags = [
  { label: "Market Insights", position: "top-[6%] left-[3%]" },
  { label: "Industry Analysis", position: "top-[24%] left-[2%]" },
  { label: "Trend Reports", position: "top-[44%] left-[3%]" },
  { label: "Deep Dives", position: "top-[8%] right-[3%]" },
  { label: "Data Insights", position: "top-[26%] right-[2%]" },
  { label: "Expert Commentary", position: "top-[46%] right-[3%]" },
];

// Mobile tags
const mobileServiceTags = [
  { label: "Research", position: "top-[12%] left-[5%]" },
  { label: "Analysis", position: "top-[18%] right-[6%]" },
  { label: "Trends", position: "top-[32%] left-[4%]" },
  { label: "Insights", position: "top-[38%] right-[5%]" },
];

const clientLogos = [
  { name: "BNB", logo: bnbLogo, noInvert: false },
  { name: "KuCoin", logo: kucoinLogo, noInvert: true },
  { name: "Polygon", logo: polygonLogo, noInvert: false },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false },
  { name: "Bybit", logo: bybitLogo, noInvert: false },
  { name: "Peaq", logo: peaqLogo, noInvert: false },
  { name: "Story Protocol", logo: storyProtocolLogo, noInvert: true },
  { name: "Spacecoin", logo: spacecoinLogo, noInvert: true },
  { name: "Tria", logo: triaLogo, noInvert: true },
  { name: "Mantra", logo: mantraLogo, noInvert: true },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true },
  { name: "FOGO", logo: fogoLogo, noInvert: true },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true },
];

const stats = [
  { value: 50, label: "Blog Posts", suffix: "+" },
  { value: 127, label: "Projects Analyzed", suffix: "+" },
  { value: 8, label: "Market Sectors", suffix: "" },
  { value: 34, label: "Expert Contributors", suffix: "+" },
];

const ResearchHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { createRipple } = useRipple();
  const { isMobile, shouldDisableHeavyAnimations } = useMobileOptimization();

  // Use unified video player hook
  const {
    videoRef,
    isVideoReady,
    hasVideoError,
    shouldDisableVideo,
    videoProps,
    posterProps,
    ShimmerOverlay,
  } = useVideoPlayer({
    src: '/videos/research-background.mp4',
    poster: '/images/posters/research-hero.jpg',
    autoPlay: true,
    preload: 'auto',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full min-h-[80vh] flex flex-col justify-between overflow-hidden">
      {/* Background Layer - Video */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Fallback poster - always visible until video is ready */}
        <img {...posterProps} fetchPriority="high" decoding="async" />

        {/* Shimmer loading overlay */}
        <ShimmerOverlay />

        {!shouldDisableVideo && !hasVideoError && (
          <video
            ref={videoRef}
            {...videoProps}
            className="absolute inset-0 w-full h-full object-cover z-10"
            style={{
              ...videoProps.style,
              WebkitAppearance: 'none',
            }}
          >
            <source src="/videos/research-background.mp4#t=0.001" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Bottom gradient for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(0,0%,4%,0.95)] pointer-events-none" />

      {/* Floating Service Tags - Desktop only */}
      {!shouldDisableHeavyAnimations && serviceTags.map((tag, index) => (
        <div
          key={index}
          className={`absolute ${tag.position} hidden lg:block z-10`}
          style={{
            animation: `float-gentle ${3 + (index % 3) * 0.5}s ease-in-out infinite`,
            animationDelay: `${index * 0.3}s`
          }}
        >
          <span className="font-sans px-4 py-2 text-xs whitespace-nowrap rounded-lg bg-white/[0.04] border border-white/[0.12] text-white/65 hover:bg-white/[0.12] hover:border-primary/60 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-default backdrop-blur-md">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Mobile tags - static (no animation) for performance */}
      {isMobile && mobileServiceTags.map((tag, index) => (
        <div
          key={`mobile-${index}`}
          className={`absolute ${tag.position} lg:hidden z-10`}
        >
          <span className="font-sans px-3 py-1.5 text-[11px] rounded-md bg-black/60 border border-white/25 text-white/90 whitespace-nowrap backdrop-blur-md shadow-lg">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="font-sans text-[1.4rem] sm:text-[2.5rem] md:text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-3 sm:mb-5 md:mb-6 mt-2 sm:mt-6 md:mt-8">
            <span className="text-white font-sans leading-tight">Web3 Market Insights &<br />Data-Driven Blog</span>
          </h1>

          {/* Subtext */}
          <p className="text-xs sm:text-body-base md:text-body-lg text-white/70 max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8 font-normal tracking-wide leading-relaxed px-4 sm:px-2">
            Explore our comprehensive <span className="text-white font-medium">market analysis</span> and <span className="text-white font-medium">data-driven insights</span> to stay ahead in the rapidly evolving Web3 landscape.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
            className="group primary-cta-dark inline-flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-6 sm:py-3 font-medium text-xs sm:text-sm rounded-full active:scale-[0.98] min-h-[44px] sm:min-h-[48px] border border-white/30"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Explore Blog</span>
          </button>

          {/* Micro-copy for trust */}
          <p className="mt-3 text-[10px] sm:text-xs text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Weekly updates • Expert insights • Free access
            </span>
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-3 sm:py-6 md:py-8">
        <div className="container mx-auto px-3 sm:px-8 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 md:gap-8">
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

      {/* Client Logo Marquee - Full Width */}
      <div className="relative z-10 py-3 sm:py-4 overflow-hidden">
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-1 sm:gap-2.5 mx-1 sm:mx-2.5 px-2.5 sm:px-5 py-1 sm:py-2.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 transition-all duration-300 flex-shrink-0"
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className={`h-3.5 sm:h-5 w-auto max-w-[92px] sm:max-w-[120px] object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`}
              />
              <span className="text-white/75 text-[9px] sm:text-caption font-medium whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Scroll Indicator - Bottom Right */}
      <div
        className="absolute bottom-16 sm:bottom-24 right-3 sm:right-8 z-10 flex items-center gap-2 group cursor-pointer hover:scale-105 transition-transform"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      >
        <span className="text-white/40 text-[10px] sm:text-sm font-medium group-hover:text-white/70 transition-colors duration-300">scroll</span>
        <div className="relative flex flex-col items-center">
          <div className="w-4 h-6 sm:w-6 sm:h-9 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300 flex justify-center pt-1">
            <div className="w-1 h-1 sm:w-1.5 sm:h-2 rounded-full bg-white/60 group-hover:bg-primary transition-colors duration-300 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Item Component with Count-Up Animation
const StatItem = ({
  value,
  label,
  prefix = "",
  suffix = "",
  isVisible,
  delay
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  isVisible: boolean;
  delay: number;
}) => {
  const count = useCountUp({
    end: Math.round(value),
    isVisible,
    delay,
    duration: 2000,
    decimals: 0
  });

  return (
    <div className="text-center group cursor-default hover:scale-105 transition-transform">
      <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1 stat-glow transition-all duration-300 group-hover:text-primary tracking-tight">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[10px] sm:text-sm text-white/60 font-medium group-hover:text-white/75 transition-colors duration-300">
        {label}
      </div>
    </div>
  );
};

export default ResearchHeroSection;
