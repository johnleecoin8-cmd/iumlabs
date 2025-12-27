import { ChevronDown, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { useTypewriter } from "@/hooks/useTypewriter";
import { brand } from "@/config/content";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
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
  { name: "BNB", logo: bnbLogo, noInvert: false },
  { name: "KuCoin", logo: kucoinLogo, noInvert: false },
  { name: "Polygon", logo: polygonLogo, noInvert: false },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false },
  { name: "Bybit", logo: bybitLogo, noInvert: false },
  { name: "Peaq", logo: peaqLogo, noInvert: false },
  { name: "Story Protocol", logo: storyProtocolLogo, noInvert: false },
  { name: "MegaETH", logo: megaethLogo, noInvert: false },
  { name: "Tria", logo: triaLogo, noInvert: true },
  { name: "Mantra", logo: mantraLogo, noInvert: true },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true },
  { name: "FOGO", logo: fogoLogo, noInvert: true },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true },
];

const stats = [
  { value: 17, label: "Projects Launched", suffix: "+" },
  { value: 115, label: "KOL Network", suffix: "+" },
  { value: 6, label: "Token Sales", prefix: "$", suffix: "M+" },
  { value: 48, label: "AMA Hosting", suffix: "+" },
];

// Typewriter Headline Component
const TypewriterHeadline = () => {
  const line1 = "Bridge Your Web3 Project";
  const line2 = "to Korea's Crypto Ecosystem";
  
  const { displayText: text1, isTyping: isTyping1 } = useTypewriter(line1, { 
    speed: 40, 
    delay: 300,
    cursor: false 
  });
  
  const { displayText: text2, cursorVisible } = useTypewriter(line2, { 
    speed: 40, 
    delay: 300 + line1.length * 40 + 200,
    cursor: true 
  });

  return (
    <motion.h1 
      className="font-sans text-[8vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] font-bold leading-[1.1] tracking-[-0.02em] mb-6 sm:mb-8 mt-8 sm:mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <span className="text-white">{text1}</span>
      {!isTyping1 && text1.length === line1.length && <br />}
      <span className="text-white">{text2}</span>
      {cursorVisible && (
        <span className="text-primary animate-pulse">|</span>
      )}
    </motion.h1>
  );
};

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

      {/* Floating Service Tags - Desktop - Unified Card Style */}
      {serviceTags.map((tag, index) => (
        <motion.div
          key={index}
          className={`absolute ${tag.position} hidden lg:block z-10`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
        >
          <span className="font-sans px-4 py-2 text-xs whitespace-nowrap rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:border-primary/40 hover:text-white transition-all duration-300">
            {tag.label}
          </span>
        </motion.div>
      ))}

      {/* Floating Service Tags - Mobile - Unified Card Style */}
      {mobileServiceTags.map((tag, index) => (
        <div
          key={`mobile-${index}`}
          className={`absolute ${tag.position} lg:hidden z-10`}
        >
          <span className="font-sans px-2 py-1 text-[10px] rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/60 whitespace-nowrap">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline - Typewriter animation */}
          <TypewriterHeadline />

          {/* Subtext - Larger and more prominent */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 font-light tracking-wide leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We combine <span className="text-white font-medium">deep-dive research labs</span> with <span className="text-white font-medium">high-impact marketing execution</span> to ensure your project thrives in the Korean market.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href={brand.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shine sweep effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            <Calendar className="w-4 h-4" />
            <span>Book a Meeting</span>
          </motion.a>
        </div>
      </div>

      {/* Stats Section */}
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
              className="flex items-center gap-1.5 sm:gap-2 mx-1.5 sm:mx-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900/80 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className={`h-4 w-4 sm:h-5 sm:w-5 object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-80'}`}
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
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (delay + 600) / 1000, duration: 0.5 }}
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/50 font-light">
        {label}
      </div>
    </motion.div>
  );
};

export default HeroSection;
