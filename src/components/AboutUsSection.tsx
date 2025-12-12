import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useState } from "react";
import seoulSkyline from "@/assets/seoul-skyline.jpg";

// Floating tags for About section
const floatingTags = [
  { label: "Binance Veterans", position: "top-[15%] left-[4%]" },
  { label: "Korea Market Expert", position: "top-[35%] left-[5%]" },
  { label: "Since 2023", position: "top-[58%] left-[3%]" },
  { label: "KuCoin Experience", position: "top-[18%] right-[5%]" },
  { label: "50+ Partners", position: "top-[40%] right-[4%]" },
  { label: "1000+ KOLs", position: "top-[62%] right-[6%]" },
];

const mobileFloatingTags = [
  { label: "Binance", position: "top-[8%] left-[3%]" },
  { label: "KuCoin", position: "top-[10%] right-[3%]" },
  { label: "Korea", position: "bottom-[35%] left-[2%]" },
];

const stats = [
  { value: 200, label: "Projects Launched", suffix: "+" },
  { value: 500, label: "Funds Raised", prefix: "$", suffix: "M+" },
  { value: 50, label: "Exchange Partners", suffix: "+" },
  { value: 1000, label: "KOL Network", suffix: "+" },
];

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
      style={{ animationDelay: `${delay + 400}ms`, animationFillMode: 'forwards' }}
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

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20">
      {/* Background - Seoul Skyline with Ken Burns Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
          style={{ 
            backgroundImage: `url(${seoulSkyline})`,
            filter: "brightness(0.3) grayscale(0.3)",
          }}
        />
        
        {/* Aurora light overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-cyan-500/10" />
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/10 via-transparent to-primary/10" />
        </div>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.5)] via-transparent to-[hsl(0,0%,4%,0.9)]" />
      </div>

      {/* Section indicator */}
      <div className="absolute left-4 sm:left-6 top-8 flex items-center gap-2 text-white/40 text-xs z-20">
        <span className="number-badge">02</span>
      </div>

      {/* Floating Tags - Desktop */}
      {floatingTags.map((tag, index) => (
        <div
          key={index}
          className={`absolute ${tag.position} hidden lg:block animate-float z-10`}
          style={{ 
            animationDelay: `${index * 0.4}s`,
            transform: `translateY(${(scrollY - 500) * 0.06}px)`
          }}
        >
          <span className="font-sans lunar-tag-dark text-xs whitespace-nowrap">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Floating Tags - Mobile */}
      {mobileFloatingTags.map((tag, index) => (
        <div
          key={`mobile-${index}`}
          className={`absolute ${tag.position} lg:hidden animate-float z-10`}
          style={{ animationDelay: `${index * 0.3}s` }}
        >
          <span className="font-sans px-2 py-1 text-[10px] rounded-sm border border-white/20 bg-black/50 backdrop-blur-sm text-white/80 whitespace-nowrap">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <h2 
            className={`font-sans text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4.5vw] font-bold leading-[0.95] tracking-[-0.02em] mb-6 sm:mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white">We Bridge </span>
            <span className="text-white/60">Your Project</span>
            <br />
            <span className="text-white/60">to the </span>
            <span className="text-primary">Korean Market</span>
          </h2>

          {/* Subtext */}
          <p 
            className={`text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 font-light tracking-wide transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Founded by veterans from <span className="text-white font-medium">Binance</span> and{" "}
            <span className="text-white font-medium">KuCoin</span>, we deliver unmatched expertise 
            in Korean Web3 market entry.
          </p>

          {/* Founders Badge */}
          <div 
            className={`inline-flex items-center gap-4 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm mb-12 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 border-2 border-primary/40 flex items-center justify-center">
                <span className="text-primary text-sm font-bold">J</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-500/5 border-2 border-cyan-500/40 flex items-center justify-center -ml-2">
                <span className="text-cyan-400 text-sm font-bold">D</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-white/40 text-xs">Founded by</p>
              <p className="text-white text-sm font-medium">Ex-Binance & Ex-KuCoin Leaders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Horizontal like Hero */}
      <div className="relative z-10 py-6 border-t border-white/10">
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
    </div>
  );
};

export default AboutUsSection;