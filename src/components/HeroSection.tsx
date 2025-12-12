import { ChevronDown, ArrowRight, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CalendlyButton from "./CalendlyButton";
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

const serviceTags = [
  { label: "PR", position: "top-[20%] left-[6%]" },
  { label: "Social Media Marketing", position: "top-[15%] right-[10%]" },
  { label: "KOL Marketing", position: "top-[45%] left-[4%]" },
  { label: "Go-To-Market-Strategy", position: "bottom-[25%] right-[5%]" },
  { label: "Influencer Strategy", position: "bottom-[12%] left-[10%]" },
  { label: "Community", position: "top-[60%] right-[8%]" },
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
  { value: 200, label: "Projects Launched", suffix: "+" },
  { value: 500, label: "Funds Raised", prefix: "$", suffix: "M+" },
  { value: 50, label: "Exchange Partners", suffix: "+" },
  { value: 5, label: "Community Reach", suffix: "M+" },
];

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Trigger count-up animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 800);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative h-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background - Light warm gradient with Seoul Bridge */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1321] via-[#1B2838] to-[#0D1321]" />
        
        {/* Seoul Bridge with higher brightness */}
        <div 
          className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
          style={{ 
            backgroundImage: `url(${seoulBridgeNight})`,
            filter: "brightness(0.5) saturate(1.2)",
          }}
        />
        
        {/* Warm aurora overlay */}
        <div className="absolute inset-0 animate-aurora">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-transparent to-cyan-400/20" />
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/15 via-transparent to-blue-400/15" />
        </div>
        
        {/* Ambient glow spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        {/* Light sweep effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-light-sweep" />
        </div>
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D1321]/80" />
      </div>

      {/* Floating Service Tags - Desktop only */}
      {serviceTags.map((tag, index) => (
        <div
          key={index}
          className={`absolute ${tag.position} hidden xl:block animate-float z-10`}
          style={{ 
            animationDelay: `${index * 0.5}s`,
            transform: `translateY(${scrollY * 0.08}px)`
          }}
        >
          <span className="font-sans lunar-tag-dark text-xs whitespace-nowrap">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline - Gradient text with warm tones */}
          <h1 className="font-sans text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] font-bold leading-[0.9] tracking-[-0.02em] mb-8 sm:mb-10 opacity-0 animate-fade-up">
            <span className="text-white">Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">Web 3.0</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300">Marketing </span>
            <span className="text-white">Agency</span>
          </h1>

          {/* Subtext - Warmer tone */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up stagger-2 font-light tracking-wide">
            We build the bridge for your project to enter the Korean market with <span className="text-amber-300 font-medium">Multi-channel marketing</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-3">
            <CalendlyButton className="group relative overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-[#1a1a1a] text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold shadow-[0_15px_40px_rgba(245,158,11,0.35)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.5)] transition-all duration-500 hover:scale-[1.02] border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-3">
                Book a Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </CalendlyButton>
            
            <Link 
              to="/contact"
              className="group flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              <Send className="w-5 h-5" />
              Send Message
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
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
      <div className="relative z-10 border-t border-white/10 py-4 sm:py-6 overflow-hidden">
        {/* Section indicator */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/40 text-xs sm:text-sm z-20">
          <span className="number-badge">01</span>
        </div>

        <div className="flex items-center logo-marquee-slow ml-16 sm:ml-20">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 sm:gap-3 mx-2 sm:mx-3 px-5 sm:px-7 py-3 sm:py-3.5 bg-zinc-800/90 rounded-full border border-white/15 hover:border-white/30 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain brightness-0 invert flex-shrink-0"
              />
              <span className="text-white/90 text-sm sm:text-base font-medium whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator - Bottom Right */}
      <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-10 flex items-center gap-2 sm:gap-3 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <span className="text-white/40 text-xs sm:text-sm font-medium">scroll</span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 animate-bounce" />
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
    end: value,
    isVisible,
    delay,
    duration: 2000,
    prefix,
    suffix,
  });
  
  return (
    <div 
      className="text-center opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay + 600}ms`, animationFillMode: 'forwards' }}
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
        {count}
      </div>
      <div className="text-sm sm:text-base text-white/50 font-light">
        {label}
      </div>
    </div>
  );
};

export default HeroSection;
