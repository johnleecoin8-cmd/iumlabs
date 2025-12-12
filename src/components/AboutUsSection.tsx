import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useState } from "react";
import seoulSkyline from "@/assets/seoul-skyline.jpg";

const stats = [
  { value: 200, label: "Projects Launched", suffix: "+" },
  { value: 500, label: "Funds Raised", prefix: "$", suffix: "M+" },
  { value: 50, label: "Exchange Partners", suffix: "+" },
  { value: 1000, label: "KOL Network", suffix: "+" },
];

const StatCard = ({ 
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
      className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl 
                 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500
                 opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay + 600}ms`, animationFillMode: 'forwards' }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
          {prefix}{count}{suffix}
        </div>
        <div className="text-sm text-white/50 font-light tracking-wide">
          {label}
        </div>
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
      {/* Background - Seoul Skyline with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat transition-transform duration-100"
          style={{ 
            backgroundImage: `url(${seoulSkyline})`,
            filter: "brightness(0.25) grayscale(0.4)",
            transform: `translateY(${scrollY * 0.05}px) scale(1.1)`,
          }}
        />
        
        {/* Aurora gradient overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-cyan-500/5" />
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/5 via-transparent to-primary/10" />
        </div>
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/90" />
      </div>

      {/* Section indicator */}
      <div className="absolute left-4 sm:left-6 top-8 flex items-center gap-2 text-white/40 text-xs z-20">
        <span className="number-badge">02</span>
      </div>

      {/* Main Content - Asymmetric Overlap Layout */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
          
          {/* Left Column - Text Content */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-[-0.02em] mb-6">
              <span className="text-white">We Bridge </span>
              <span className="text-white/60">Your Project</span>
              <br />
              <span className="text-white/60">to the </span>
              <span className="text-primary">Korean Market</span>
            </h2>

            <p className="text-base sm:text-lg text-white/50 max-w-lg mb-8 font-light leading-relaxed">
              Founded by veterans from <span className="text-white font-medium">Binance</span> and{" "}
              <span className="text-white font-medium">KuCoin</span>, we deliver unmatched expertise 
              in Korean Web3 market entry and growth strategies.
            </p>
          </div>

          {/* Right Column - Founders Card with Overlap Effect */}
          <div 
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Background decorative card */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-gradient-to-br from-primary/20 to-cyan-500/20 blur-sm" />
            
            {/* Main founders card */}
            <div className="relative p-8 rounded-3xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-2xl">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex -space-x-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border-2 border-primary/50 flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="text-primary text-xl font-bold">J</span>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/40 to-cyan-500/10 border-2 border-cyan-500/50 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <span className="text-cyan-400 text-xl font-bold">D</span>
                  </div>
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-1">Founded by</p>
                  <p className="text-white text-lg font-semibold">James & David</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Ex-Lead of Korea at KuCoin</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-sm">Ex-Head of BD at Binance</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-sm">VC Experience at Outlier Ventures</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Glassmorphism Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard 
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
  );
};

export default AboutUsSection;
