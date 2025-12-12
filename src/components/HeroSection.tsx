import { ChevronDown, ArrowRight, Send } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
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
  // Left side - x, y as percentages from top-left
  { label: "PR", x: 5, y: 10, color: "#60A5FA" },
  { label: "KOL Marketing", x: 3, y: 25, color: "#34D399" },
  { label: "Influencer Strategy", x: 6, y: 40, color: "#F472B6" },
  { label: "DeFi Marketing", x: 4, y: 55, color: "#FBBF24" },
  { label: "Exchange Listing", x: 7, y: 70, color: "#A78BFA" },
  // Right side - symmetric with left (100 - left_x - offset for text width)
  { label: "Social Media Marketing", x: 88, y: 10, color: "#22D3EE" },
  { label: "Community Building", x: 90, y: 25, color: "#F87171" },
  { label: "Go-To-Market Strategy", x: 86, y: 40, color: "#4ADE80" },
  { label: "NFT Marketing", x: 89, y: 55, color: "#FB923C" },
  { label: "GameFi", x: 87, y: 70, color: "#818CF8" },
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

// Connection Line Component with enhanced animations
const ConnectionLines = ({ tags }: { tags: typeof serviceTags }) => {
  const centerX = 50;
  const centerY = 45;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none hidden xl:block z-[5]">
      <defs>
        {/* Gradient for each line based on tag color */}
        {tags.map((tag, index) => (
          <linearGradient
            key={`gradient-${index}`}
            id={`line-gradient-${index}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={`${tag.color}00`} />
            <stop offset="30%" stopColor={`${tag.color}40`} />
            <stop offset="50%" stopColor={`${tag.color}80`} />
            <stop offset="70%" stopColor={`${tag.color}40`} />
            <stop offset="100%" stopColor={`${tag.color}00`} />
          </linearGradient>
        ))}
        
        {/* Radial gradient for center glow */}
        <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(96, 165, 250, 0.8)" />
          <stop offset="50%" stopColor="rgba(96, 165, 250, 0.3)" />
          <stop offset="100%" stopColor="rgba(96, 165, 250, 0)" />
        </radialGradient>
        
        {/* Enhanced glow filter */}
        <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur1" />
          <feGaussianBlur stdDeviation="6" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Pulse animation filter */}
        <filter id="pulse-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="white" floodOpacity="0.8" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Center glow effect */}
      <circle 
        cx={`${centerX}%`} 
        cy={`${centerY}%`} 
        r="80" 
        fill="url(#center-glow)"
        className="animate-pulse"
        style={{ animationDuration: '3s' }}
      />
      
      {tags.map((tag, index) => (
        <g key={index}>
          {/* Main connection line with gradient */}
          <line
            x1={`${tag.x}%`}
            y1={`${tag.y}%`}
            x2={`${centerX}%`}
            y2={`${centerY}%`}
            stroke={`url(#line-gradient-${index})`}
            strokeWidth="1.5"
            filter="url(#line-glow)"
            className="animate-pulse"
            style={{ 
              animationDuration: `${3 + index * 0.2}s`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
          
          {/* Secondary glow line */}
          <line
            x1={`${tag.x}%`}
            y1={`${tag.y}%`}
            x2={`${centerX}%`}
            y2={`${centerY}%`}
            stroke={tag.color}
            strokeWidth="4"
            opacity="0.15"
            filter="url(#line-glow)"
          />
          
          {/* Animated path for traveling pulses */}
          <path
            id={`motion-path-${index}`}
            d={`M ${tag.x} ${tag.y} L ${centerX} ${centerY}`}
            fill="none"
            stroke="none"
          />
          
          {/* Multiple traveling energy pulses */}
          {[0, 1, 2, 3].map((pulseIdx) => (
            <g key={pulseIdx}>
              {/* Main pulse orb */}
              <circle r="3" fill={tag.color} filter="url(#pulse-glow)">
                <animateMotion
                  dur={`${4 + pulseIdx * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${index * 0.3 + pulseIdx * 1}s`}
                  path={`M ${tag.x * 10} ${tag.y * 6} L ${centerX * 10} ${centerY * 6}`}
                />
                <animate 
                  attributeName="opacity" 
                  values="0;1;1;0" 
                  dur={`${4 + pulseIdx * 0.5}s`} 
                  repeatCount="indefinite"
                  begin={`${index * 0.3 + pulseIdx * 1}s`}
                />
                <animate 
                  attributeName="r" 
                  values="1;3;2;1" 
                  dur={`${4 + pulseIdx * 0.5}s`} 
                  repeatCount="indefinite"
                  begin={`${index * 0.3 + pulseIdx * 1}s`}
                />
              </circle>
              
              {/* Trailing spark */}
              <circle r="1.5" fill="white" opacity="0.9" filter="url(#pulse-glow)">
                <animateMotion
                  dur={`${4 + pulseIdx * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${index * 0.3 + pulseIdx * 1 + 0.15}s`}
                  path={`M ${tag.x * 10} ${tag.y * 6} L ${centerX * 10} ${centerY * 6}`}
                />
                <animate 
                  attributeName="opacity" 
                  values="0;0.8;0.4;0" 
                  dur={`${4 + pulseIdx * 0.5}s`} 
                  repeatCount="indefinite"
                  begin={`${index * 0.3 + pulseIdx * 1 + 0.15}s`}
                />
              </circle>
            </g>
          ))}
          
          {/* Small node at tag position */}
          <circle
            cx={`${tag.x}%`}
            cy={`${tag.y}%`}
            r="4"
            fill={tag.color}
            opacity="0.6"
            filter="url(#line-glow)"
          >
            <animate 
              attributeName="r" 
              values="3;5;3" 
              dur="2s" 
              repeatCount="indefinite"
              begin={`${index * 0.2}s`}
            />
            <animate 
              attributeName="opacity" 
              values="0.4;0.8;0.4" 
              dur="2s" 
              repeatCount="indefinite"
              begin={`${index * 0.2}s`}
            />
          </circle>
        </g>
      ))}
      
      {/* Center node with pulsing effect */}
      <circle
        cx={`${centerX}%`}
        cy={`${centerY}%`}
        r="8"
        fill="rgba(96, 165, 250, 0.8)"
        filter="url(#line-glow)"
      >
        <animate 
          attributeName="r" 
          values="6;10;6" 
          dur="2.5s" 
          repeatCount="indefinite"
        />
        <animate 
          attributeName="opacity" 
          values="0.6;1;0.6" 
          dur="2.5s" 
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Outer ring pulse */}
      <circle
        cx={`${centerX}%`}
        cy={`${centerY}%`}
        r="20"
        fill="none"
        stroke="rgba(96, 165, 250, 0.4)"
        strokeWidth="1"
      >
        <animate 
          attributeName="r" 
          values="15;40;15" 
          dur="3s" 
          repeatCount="indefinite"
        />
        <animate 
          attributeName="opacity" 
          values="0.5;0;0.5" 
          dur="3s" 
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

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
      {/* Background - Seoul Bridge Night with Ken Burns Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
          style={{ 
            backgroundImage: `url(${seoulBridgeNight})`,
            filter: "brightness(0.35)",
          }}
        />
        
        {/* Aurora light overlay */}
        <div className="absolute inset-0 animate-aurora">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-cyan-500/15" />
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/10 via-transparent to-blue-500/10" />
        </div>
        
        {/* Light sweep effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-light-sweep" />
        </div>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
      </div>

      {/* Enhanced Connection Lines */}
      <ConnectionLines tags={serviceTags} />

      {/* Floating Service Tags - Desktop only */}
      {serviceTags.map((tag, index) => (
        <div
          key={index}
          className="absolute hidden xl:block animate-float z-10"
          style={{ 
            left: `${tag.x}%`,
            top: `${tag.y}%`,
            animationDelay: `${index * 0.5}s`,
            transform: `translateY(${scrollY * 0.08}px)`
          }}
        >
          <span 
            className="font-sans lunar-tag-dark text-xs whitespace-nowrap glow-border"
            style={{ 
              borderColor: `${tag.color}40`,
              boxShadow: `0 0 20px ${tag.color}20`,
            }}
          >
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline - Unified Inter font with color contrast */}
          <h1 className="font-sans text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] font-bold leading-[0.9] tracking-[-0.02em] mb-8 sm:mb-10 opacity-0 animate-fade-up">
            <span className="text-white">Your </span>
            <span className="text-white/60">Web 3.0</span>
            <br />
            <span className="text-white/60">Marketing </span>
            <span className="text-white">Agency</span>
          </h1>

          {/* Subtext - Larger and more prominent */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up stagger-2 font-light tracking-wide">
            We build the bridge for your project to enter the Korean market with <span className="text-white font-medium">Multi-channel marketing</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-3">
            <CalendlyButton className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold shadow-[0_15px_40px_rgba(59,130,246,0.35)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.5)] transition-all duration-500 hover:scale-[1.02] border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
  });
  
  return (
    <div 
      className="text-center opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay + 600}ms`, animationFillMode: 'forwards' }}
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/50 font-light">
        {label}
      </div>
    </div>
  );
};

export default HeroSection;
