import { ChevronDown, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { brand } from "@/config/content";
import { useBrandStatsByIds } from "@/hooks/useBrandStats";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin-mono.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.png";
// Story Protocol removed per client visibility restrictions
import spacecoinLogo from "@/assets/logos/spacecoin.png";
import triaLogo from "@/assets/logos/tria-mono.png";
import mantraLogo from "@/assets/logos/mantra-mono.png";
import saharaAiLogo from "@/assets/logos/sahara-ai-mono.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import aptosLogo from "@/assets/logos/aptos.png";
import kiteLogo from "@/assets/logos/kite.png";

const clientLogos = [{
  name: "BNB",
  logo: bnbLogo,
  noInvert: false
}, {
  name: "KuCoin",
  logo: kucoinLogo,
  noInvert: true
}, {
  name: "Polygon",
  logo: polygonLogo,
  noInvert: false
}, {
  name: "Ondo Finance",
  logo: ondoLogo,
  noInvert: false
}, {
  name: "Bybit",
  logo: bybitLogo,
  noInvert: false
}, {
  name: "Peaq",
  logo: peaqLogo,
  noInvert: true
}, {
  name: "Spacecoin",
  logo: spacecoinLogo,
  noInvert: true
}, {
  name: "Tria",
  logo: triaLogo,
  noInvert: true
}, {
  name: "Mantra",
  logo: mantraLogo,
  noInvert: true
}, {
  name: "Sahara AI",
  logo: saharaAiLogo,
  noInvert: true
}, {
  name: "FOGO",
  logo: fogoLogo,
  noInvert: true
}, {
  name: "SynFutures",
  logo: synfuturesLogo,
  noInvert: true
}, {
  name: "Aptos",
  logo: aptosLogo,
  noInvert: false
}, {
  name: "Kite",
  logo: kiteLogo,
  noInvert: true
}];
// Default stats as fallback
const defaultStats = [{
  id: "client_valuation",
  value: 7,
  label: "Client Valuation",
  prefix: "$",
  suffix: "B+"
}, {
  id: "kol_network",
  value: 230,
  label: "KOL Network",
  prefix: "",
  suffix: "+"
}, {
  id: "projects_launched",
  value: 19,
  label: "Projects Launched",
  prefix: "",
  suffix: "+"
}, {
  id: "events_hosted",
  value: 70,
  label: "Events Hosted",
  prefix: "",
  suffix: "+"
}];
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Use unified video player hook
  const {
    videoRef,
    isVideoReady,
    hasVideoError,
    shouldDisableVideo,
    videoProps,
    posterProps,
    quality,
    networkInfo,
    ShimmerOverlay
  } = useVideoPlayer({
    src: '/videos/hero-background.mp4',
    poster: '/images/hero-poster.jpg',
    autoPlay: true,
    preload: 'auto'
  });

  // Fetch dynamic brand stats
  const { statsMap, isLoading: isLoadingStats } = useBrandStatsByIds([
  "client_valuation", "kol_network", "projects_launched", "events_hosted"]
  );

  // Merge dynamic stats with fallback defaults
  const stats = useMemo(() => {
    return defaultStats.map((defaultStat) => {
      const dynamicStat = statsMap[defaultStat.id];
      if (dynamicStat) {
        return {
          ...defaultStat,
          value: dynamicStat.value,
          prefix: dynamicStat.prefix || defaultStat.prefix,
          suffix: dynamicStat.suffix || defaultStat.suffix
        };
      }
      return defaultStat;
    });
  }, [statsMap]);

  useEffect(() => {
    // Trigger count-up animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return <div className="relative h-full min-h-[100vh] sm:min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Layer - Video with mobile optimizations */}
      <div className="absolute inset-0">
        {/* Always render poster as a safe fallback */}
        <img {...posterProps} fetchPriority="high" decoding="async" />

        {/* Shimmer loading overlay */}
        <ShimmerOverlay />

        {!shouldDisableVideo && !hasVideoError &&
      <video
        ref={videoRef}
        {...videoProps}
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{
          ...videoProps.style,
          WebkitAppearance: 'none'
        }}>

            <source src="/videos/hero-background.mp4#t=0.001" type="video/mp4" />
          </video>
      }
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Bottom gradient for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(0,0%,4%,0.95)]" />

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline — all white, massive */}
          <h1 className="font-sans text-[1.75rem] sm:text-[3.5rem] md:text-[clamp(4.5rem,8vw,7.5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-4 sm:mb-6 md:mb-8 mt-16 sm:mt-28 md:mt-36 text-white">
            Your Web3 Ecosystem
            <br />
            Partner for Korea
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-6 sm:mb-10 font-light tracking-wide leading-relaxed px-4 sm:px-2">
            Since 2025, we've worked with 19+ ecosystems and projects in the Korean crypto space.
          </p>

          {/* CTA — centered */}
          <div className="flex flex-col items-center gap-3 mt-6 sm:mt-10">
            <a
              href="/contact#contact-form"
              className="group inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-black font-semibold text-xs sm:text-sm rounded-full hover:bg-white/90 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.97]"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Get Your Free Proposal</span>
            </a>
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-sm text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Free 30-min call • Reply within 24h
            </span>
          </div>
        </div>
      </div>


      {/* Client Logo Marquee - Full Width */}
      <div className="relative z-10 py-4 sm:py-6 overflow-hidden">
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos].map((client, index) => <div key={index} className="flex items-center gap-2 sm:gap-3 mx-1 sm:mx-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 transition-all duration-300 flex-shrink-0">
              <img
            src={client.logo}
            alt={client.name}
            loading="lazy"
            decoding="async"
            className={`h-5 sm:h-7 w-auto max-w-[100px] sm:max-w-[140px] object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`} />

              <span className="text-white/75 text-[11px] sm:text-sm font-medium whitespace-nowrap">
                {client.name}
              </span>
            </div>)}
        </div>
      </div>

      {/* Enhanced Scroll Indicator - Bottom Right */}
      <div className="absolute bottom-16 sm:bottom-24 right-3 sm:right-8 z-10 flex items-center gap-2 group cursor-pointer hover:scale-105 transition-transform" onClick={() => window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    })}>
        <span className="text-white/40 text-[10px] sm:text-sm font-medium group-hover:text-white/70 transition-colors duration-300">scroll</span>
        <div className="relative flex flex-col items-center">
          <div className="w-4 h-6 sm:w-6 sm:h-9 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300 flex justify-center pt-1">
            <div className="w-1 h-1 sm:w-1.5 sm:h-2 rounded-full bg-white/60 group-hover:bg-primary transition-colors duration-300 animate-bounce" />
          </div>
        </div>
      </div>
    </div>;
};

// Stat Item Component with Count-Up Animation
const StatItem = ({
  value,
  label,
  prefix = "",
  suffix = "",
  isVisible,
  delay







}: {value: number;label: string;prefix?: string;suffix?: string;isVisible: boolean;delay: number;}) => {
  const count = useCountUp({
    end: Math.round(value),
    isVisible,
    delay,
    duration: 2000,
    decimals: 0
  });
  return <div className="text-center cursor-default select-none">
      <div className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-1 sm:mb-2 tracking-tighter leading-none">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[11px] sm:text-base md:text-lg text-white/50 font-medium">
        {label}
      </div>
    </div>;
};
export default HeroSection;