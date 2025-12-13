import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";
import { useCountUp } from "@/hooks/useCountUp";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";

// Desktop tags with neon colors
const serviceTags = [
  { label: "KOL Marketing", position: "top-[15%] left-[5%]", color: "#1DB954", hoverGlow: "0 0 30px #1DB95480" },
  { label: "Community Operation", position: "top-[35%] left-[4%]", color: "#00D4FF", hoverGlow: "0 0 30px #00D4FF80" },
  { label: "GTM Strategy", position: "top-[55%] left-[6%]", color: "#E040FB", hoverGlow: "0 0 30px #E040FB80" },
  { label: "Exchange Support", position: "top-[75%] left-[5%]", color: "#F3BA2F", hoverGlow: "0 0 30px #F3BA2F80" },
  { label: "Media & PR", position: "top-[18%] right-[6%]", color: "#FF6B9D", hoverGlow: "0 0 30px #FF6B9D80" },
  { label: "AMA Hosting", position: "top-[42%] right-[5%]", color: "#00CED1", hoverGlow: "0 0 30px #00CED180" },
  { label: "Offline Events", position: "top-[66%] right-[7%]", color: "#FF6347", hoverGlow: "0 0 30px #FF634780" },
];

// Mobile tags (fewer, repositioned for small screens)
const mobileServiceTags = [
  { label: "KOL", position: "top-[8%] left-[3%]", color: "#1DB954" },
  { label: "Community", position: "top-[12%] right-[3%]", color: "#00D4FF" },
  { label: "Media", position: "bottom-[38%] left-[2%]", color: "#FF6B9D" },
  { label: "Events", position: "bottom-[42%] right-[2%]", color: "#FF6347" },
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
];

const stats = [
  { value: 18, label: "Projects Launched", suffix: "+", color: "#1DB954" },
  { value: 120, label: "KOL Network", suffix: "+", color: "#00D4FF" },
  { value: 2.5, label: "Token Sales", prefix: "$", suffix: "M+", color: "#F3BA2F" },
  { value: 38, label: "AMA Hosting", suffix: "+", color: "#E040FB" },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger count-up animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Layer - Static */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${seoulBridgeNight})`,
            filter: "brightness(0.3)",
          }}
        />
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        
        {/* Colorful ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#1DB954]/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E040FB]/10 blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-[#00D4FF]/10 blur-[120px] pointer-events-none" />
      </div>

      {/* Floating Service Tags - Desktop - Neon Colors */}
      {serviceTags.map((tag, index) => (
        <motion.div
          key={index}
          className={`absolute ${tag.position} hidden lg:block z-10`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
        >
          <span 
            className="font-sans px-4 py-2 text-xs whitespace-nowrap rounded-xl bg-black/40 backdrop-blur-sm border transition-all duration-300 cursor-default hover:scale-105"
            style={{ 
              borderColor: `${tag.color}40`,
              color: tag.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = tag.hoverGlow;
              e.currentTarget.style.borderColor = tag.color;
              e.currentTarget.style.backgroundColor = `${tag.color}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = `${tag.color}40`;
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)';
            }}
          >
            {tag.label}
          </span>
        </motion.div>
      ))}

      {/* Floating Service Tags - Mobile - Neon Colors */}
      {mobileServiceTags.map((tag, index) => (
        <div
          key={`mobile-${index}`}
          className={`absolute ${tag.position} lg:hidden z-10`}
        >
          <span 
            className="font-sans px-2 py-1 text-[10px] rounded-lg bg-black/40 backdrop-blur-sm border whitespace-nowrap"
            style={{ 
              borderColor: `${tag.color}40`,
              color: `${tag.color}90`,
            }}
          >
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline - Gradient Text */}
          <motion.h1 
            className="font-sans text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] font-bold leading-[0.9] tracking-[-0.02em] mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Your </span>
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#E040FB] to-[#FF6B9D] bg-clip-text text-transparent">Web 3.0</span>
            <br />
            <span className="bg-gradient-to-r from-[#1DB954] via-[#00D4FF] to-[#E040FB] bg-clip-text text-transparent">Marketing </span>
            <span className="text-white">Agency</span>
          </motion.h1>

          {/* Subtext - Larger and more prominent */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We build the bridge for your project to enter the Korean market with <span className="text-[#1DB954] font-medium">Multi-channel marketing</span>.
          </motion.p>
        </div>
      </div>

      {/* Stats Section - Colorful */}
      <div className="relative z-10 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, index) => (
              <StatItem 
                key={index}
                value={stat.value}
                label={stat.label}
                prefix={stat.prefix}
                suffix={stat.suffix}
                color={stat.color}
                isVisible={isVisible}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Client Logo Marquee - Dark Pill Cards Style */}
      <div className="relative z-10 border-t border-white/10 py-3 sm:py-4 overflow-hidden">
        {/* Section indicator */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/40 text-[10px] sm:text-xs z-20">
          <span className="number-badge">01</span>
        </div>

        <div className="flex items-center logo-marquee-slow ml-14 sm:ml-16">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center gap-1.5 sm:gap-2 mx-1.5 sm:mx-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900/80 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-4 w-4 sm:h-5 sm:w-5 object-contain brightness-0 invert opacity-80 flex-shrink-0"
              />
              <span className="text-white/70 text-[10px] sm:text-xs font-medium whitespace-nowrap">
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

// Stat Item Component with Count-Up Animation and Color
const StatItem = ({ 
  value, 
  label, 
  prefix = "", 
  suffix = "",
  color,
  isVisible,
  delay 
}: { 
  value: number; 
  label: string; 
  prefix?: string; 
  suffix?: string;
  color: string;
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
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (delay + 600) / 1000, duration: 0.5 }}
    >
      <div 
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1"
        style={{ color }}
      >
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/50 font-light">
        {label}
      </div>
    </motion.div>
  );
};

export default HeroSection;
