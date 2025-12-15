import { ChevronDown } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import Bridge3D from "./Bridge3D";
import LatestProjectsStrip from "./LatestProjectsStrip";

// Import client logos (matching Projects page)
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";

const clientLogos = [
  { name: "BNB", logo: bnbLogo },
  { name: "KuCoin", logo: kucoinLogo },
  { name: "Polygon", logo: polygonLogo },
  { name: "Ondo Finance", logo: ondoLogo },
  { name: "Bybit", logo: bybitLogo },
  { name: "Peaq", logo: peaqLogo },
  { name: "Story Protocol", logo: storyProtocolLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Tria", logo: triaLogo },
  { name: "Mantra", logo: mantraLogo },
  { name: "Sahara AI", logo: saharaAiLogo },
  { name: "FOGO", logo: fogoLogo },
  { name: "SynFutures", logo: synfuturesLogo },
];

const stats = [
  { value: 17, label: "Projects", suffix: "+" },
  { value: 115, label: "KOL Network", suffix: "+" },
  { value: 6, label: "Token Sales", prefix: "$", suffix: "M+" },
  { value: 48, label: "AMA", suffix: "+" },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-2rem)] flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-[#030510]">
      {/* Background Layer - Video (kept but dimmed more) */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          style={{ filter: "brightness(0.3) saturate(0.5)" }}
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = 0;
          }}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030510] via-transparent to-[#030510]" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col">
        {/* Top Section - 3D Bridge + Typography */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 lg:pt-16">
          
          {/* Left Side - a41 Style Typography */}
          <div className="flex-1 max-w-2xl text-center lg:text-left order-2 lg:order-1">
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 sm:mb-6"
            >
              <span className="text-white/40 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase">
                Web3 Marketing Agency
              </span>
            </motion.div>

            {/* Main Headline - a41 Giant Typography */}
            <motion.h1 
              className="font-sans text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[5.5vw] font-bold leading-[0.85] tracking-[-0.03em] mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-white block">We Build</span>
              <span className="text-white block">The <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Bridge</span></span>
              <span className="text-white/60 block text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[3.5vw] mt-2">to Korea</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/40 max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Your project's gateway to the Korean Web3 ecosystem with{" "}
              <span className="text-white/70 font-medium">multi-channel marketing</span>.
            </motion.p>

            {/* Stats Row - Compact inline */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <StatItem 
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                  delay={index * 100}
                />
              ))}
            </motion.div>
          </div>

          {/* Right Side - 3D Bridge */}
          <div className="flex-1 w-full max-w-xl lg:max-w-2xl h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] order-1 lg:order-2">
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                </div>
              }>
                <Bridge3D className="w-full h-full" />
              </Suspense>
            </motion.div>
          </div>
        </div>

        {/* Latest Projects Strip - 4pillars Style */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
          <LatestProjectsStrip />
        </div>
      </div>

      {/* Client Logo Marquee - Bottom */}
      <div className="relative z-10 border-t border-white/[0.06] py-3 sm:py-4 overflow-hidden bg-gradient-to-t from-[#030510]/80 to-transparent">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#030510] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#030510] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center logo-marquee-slow hover:[animation-play-state:paused]">
          {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 mx-2 sm:mx-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-default"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-4 w-4 sm:h-5 sm:w-5 object-contain opacity-80 flex-shrink-0"
              />
              <span className="text-white/60 text-[10px] sm:text-xs font-medium whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 z-10 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-white/30 text-xs font-medium tracking-wide">scroll</span>
        <ChevronDown className="w-3 h-3 text-white/30 animate-bounce" />
      </motion.div>
    </div>
  );
};

// Stat Item Component - Compact inline style
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
    end: value,
    isVisible,
    delay,
    duration: 2000,
  });
  
  return (
    <div className="text-center lg:text-left">
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs text-white/40 font-light">
        {label}
      </div>
    </div>
  );
};

export default HeroSection;
