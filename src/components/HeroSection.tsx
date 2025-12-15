import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

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
import zkpassLogo from "@/assets/logos/zkpass.png";

// Desktop tags
const serviceTags = [
  { label: "KOL Marketing", position: "top-[15%] left-[5%]" },
  { label: "Community Operation", position: "top-[35%] left-[4%]" },
  { label: "GTM Strategy", position: "top-[55%] left-[6%]" },
  { label: "Exchange Support", position: "top-[75%] left-[5%]" },
  { label: "Media & PR", position: "top-[18%] right-[6%]" },
  { label: "AMA Hosting", position: "top-[42%] right-[5%]" },
  { label: "Offline Events", position: "top-[66%] right-[7%]" },
];

// Mobile tags (fewer, repositioned for small screens)
const mobileServiceTags = [
  { label: "KOL", position: "top-[8%] left-[3%]" },
  { label: "Community", position: "top-[12%] right-[3%]" },
  { label: "Media", position: "bottom-[38%] left-[2%]" },
  { label: "Events", position: "bottom-[42%] right-[2%]" },
];

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
  { value: 17, label: "Projects Launched", suffix: "+" },
  { value: 115, label: "KOL Network", suffix: "+" },
  { value: 6, label: "Token Sales", prefix: "$", suffix: "M+" },
  { value: 48, label: "AMA Hosting", suffix: "+" },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger count-up animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full min-h-[calc(100vh-2rem)] flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl">
      {/* Background Layer - Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.35)" }}
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = 0;
          }}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
      </div>

      {/* Floating Service Tags - Desktop - Glass Card Style */}
      {serviceTags.map((tag, index) => (
        <motion.div
          key={index}
          className={`absolute ${tag.position} hidden lg:block z-10`}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-sans px-5 py-2.5 text-xs whitespace-nowrap rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.1] text-white/80 hover:bg-white/[0.08] hover:border-white/[0.25] hover:text-white hover:shadow-lg hover:shadow-white/[0.05] transition-all duration-300 cursor-default">
            {tag.label}
          </span>
        </motion.div>
      ))}

      {/* Floating Service Tags - Mobile - Glass Card Style */}
      {mobileServiceTags.map((tag, index) => (
        <motion.div
          key={`mobile-${index}`}
          className={`absolute ${tag.position} lg:hidden z-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
        >
          <span className="font-sans px-3 py-1.5 text-[10px] rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.1] text-white/70 whitespace-nowrap">
            {tag.label}
          </span>
        </motion.div>
      ))}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline - Unified Inter font with color contrast */}
          <motion.h1 
            className="font-sans text-[9vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] font-bold leading-[0.9] tracking-[-0.02em] mb-8 sm:mb-10 mt-8 sm:mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Your </span>
            <span className="text-white/90">Web 3.0 Ecosystem</span>
            <br />
            <span className="text-white/90">Marketing </span>
            <span className="text-white">Agency</span>
          </motion.h1>

          {/* Subtext - Larger and more prominent */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We build the bridge for your project to enter the Korean market with <span className="text-white font-medium">Multi-channel marketing</span>.
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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
          </div>
        </div>
      </div>

      {/* Client Logo Marquee - Glass Pill Cards Style */}
      <div className="relative z-10 border-t border-white/[0.08] py-4 sm:py-5 overflow-hidden bg-gradient-to-t from-black/20 to-transparent">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(0,0%,4%)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(0,0%,4%)] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center logo-marquee-slow hover:[animation-play-state:paused]">
          {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 sm:gap-2.5 mx-2 sm:mx-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 cursor-default"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-5 w-5 sm:h-6 sm:w-6 object-contain opacity-90 flex-shrink-0"
              />
              <span className="text-white/80 text-[11px] sm:text-xs font-medium whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator - Bottom Right */}
      <motion.div 
        className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-10 flex items-center gap-2 sm:gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-white/40 text-xs sm:text-sm font-medium">scroll</span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 animate-bounce" />
      </motion.div>
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
    end: value,
    isVisible,
    delay,
    duration: 2000,
  });
  
  return (
    <motion.div 
      className="text-center px-4 py-3 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (delay + 600) / 1000, duration: 0.5 }}
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/50 font-light">
        {label}
      </div>
    </motion.div>
  );
};

export default HeroSection;
