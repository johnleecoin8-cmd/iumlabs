import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, DollarSign, Zap } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import seoulNight from "@/assets/backgrounds/seoul-gangnam-night.jpg";

// Real market data based on Bank of Korea & Chainalysis 2024/2025 reports
const tradingVolumeData = [
  { month: "Jan", value: 4.2 },
  { month: "Feb", value: 4.8 },
  { month: "Mar", value: 5.3 },
  { month: "Apr", value: 5.1 },
  { month: "May", value: 6.2 },
  { month: "Jun", value: 7.1 },
  { month: "Jul", value: 7.8 },
  { month: "Aug", value: 8.5 },
  { month: "Sep", value: 9.2 },
  { month: "Oct", value: 9.8 },
  { month: "Nov", value: 10.2 },
  { month: "Dec", value: 10.7 },
];

const investorGrowthData = [
  { month: "Q1'23", value: 8.2 },
  { month: "Q2'23", value: 9.1 },
  { month: "Q3'23", value: 10.4 },
  { month: "Q4'23", value: 11.8 },
  { month: "Q1'24", value: 12.9 },
  { month: "Q2'24", value: 14.0 },
  { month: "Q3'24", value: 14.8 },
  { month: "Q4'24", value: 15.6 },
];

const marketCapData = [
  { month: "Jan", value: 45 },
  { month: "Mar", value: 52 },
  { month: "May", value: 58 },
  { month: "Jul", value: 65 },
  { month: "Sep", value: 72 },
  { month: "Nov", value: 74.8 },
];

// Real data: Korea vs other APAC markets (Daily Trading Volume in Billions USD)
const countryComparisonData = [
  { country: "Korea", volume: 10.7, flag: "🇰🇷" },
  { country: "Japan", volume: 3.8, flag: "🇯🇵" },
  { country: "Singapore", volume: 2.1, flag: "🇸🇬" },
  { country: "Hong Kong", volume: 1.6, flag: "🇭🇰" },
];

// Card color schemes for visual variety
const cardStyles = [
  { 
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    chartColor: "#3B82F6",
    accentGlow: "bg-blue-500/30"
  },
  { 
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    chartColor: "#10B981",
    accentGlow: "bg-emerald-500/30"
  },
  { 
    gradient: "from-purple-500/20 to-pink-500/10",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    chartColor: "#8B5CF6",
    accentGlow: "bg-purple-500/30"
  },
  { 
    gradient: "from-orange-500/20 to-amber-500/10",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    chartColor: "#F59E0B",
    accentGlow: "bg-orange-500/30"
  },
];

// Updated with real 2024/2025 data from Bank of Korea, Chainalysis, CoinGecko reports
const marketStats = [
  {
    value: 15.6,
    suffix: "M+",
    label: "Crypto Investors",
    subLabel: "30% of South Korea's population",
    growth: "Bank of Korea 2024",
    icon: Users,
    chartData: investorGrowthData,
  },
  {
    value: 10.7,
    prefix: "$",
    suffix: "B",
    label: "Daily Trading Volume",
    subLabel: "Surpassed Korea's stock exchanges",
    growth: "Dec 2024 Avg.",
    icon: DollarSign,
    chartData: tradingVolumeData,
  },
  {
    value: 74.8,
    prefix: "$",
    suffix: "B",
    label: "Total Market Cap",
    subLabel: "102 trillion KRW in assets",
    growth: "2024 Year-End",
    icon: TrendingUp,
    chartData: marketCapData,
  },
  {
    value: 4.8,
    prefix: "$",
    suffix: "K",
    label: "Avg. Holdings",
    subLabel: "6.54M KRW average position",
    growth: "High engagement",
    icon: Zap,
    chartData: marketCapData,
  },
];

const AnimatedNumber = ({ 
  value, 
  prefix = "", 
  suffix = "",
  duration = 2000 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(value * easeOutQuart);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);
  
  const displayValue = value >= 100 ? Math.round(count) : count.toFixed(1);
  
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const StatCard = ({ 
  stat, 
  index,
  isMobile = false
}: { 
  stat: typeof marketStats[0]; 
  index: number;
  isMobile?: boolean;
}) => {
  const Icon = stat.icon;
  const style = cardStyles[index];
  
  // Mobile compact version for secondary stats
  if (isMobile && index >= 2) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        className="relative"
      >
        <div className={`relative bg-gradient-to-br ${style.gradient} backdrop-blur-md border border-white/10 rounded-xl p-4 overflow-hidden`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${style.iconBg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${style.iconColor}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-white/60">{stat.label}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className={`relative bg-gradient-to-br ${style.gradient} backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-white/20 hover:scale-[1.02]`}>
        {/* Accent glow */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 ${style.accentGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Mini chart background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stat.chartData}>
              <defs>
                <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={style.chartColor} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={style.chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={style.chartColor}
                strokeWidth={2}
                fill={`url(#gradient-${index})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon & Growth badge */}
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center`}>
              <Icon className={`w-6 h-6 ${style.iconColor}`} />
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
              {stat.growth}
            </span>
          </div>
          
          {/* Big number */}
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
            <AnimatedNumber 
              value={stat.value} 
              prefix={stat.prefix} 
              suffix={stat.suffix} 
            />
          </div>
          
          {/* Labels */}
          <h3 className="text-base md:text-lg font-medium text-white/90 mb-1">
            {stat.label}
          </h3>
          <p className="text-sm text-white/50">
            {stat.subLabel}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const MarketOpportunitySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img 
          src={seoulNight} 
          alt="" 
          className="w-full h-[120%] object-cover object-center"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-background/70" />
      </motion.div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px]" 
        />
      </div>
      
      <div className="relative z-10 py-20 md:py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block text-xs tracking-[0.2em] uppercase text-primary/80 mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
            >
              Market Opportunity
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Unlock Korea's
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hidden Potential
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              The world's most active crypto market is waiting for you
            </p>
          </motion.div>
          
          {/* Mobile: Hero Stats Layout */}
          <div className="md:hidden space-y-4 mb-12">
            {/* Primary stats - large cards */}
            <div className="grid grid-cols-1 gap-4">
              {marketStats.slice(0, 2).map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
            {/* Secondary stats - compact row */}
            <div className="grid grid-cols-2 gap-3">
              {marketStats.slice(2).map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index + 2} isMobile />
              ))}
            </div>
          </div>
          
          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
            {marketStats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
          
          {/* Country Comparison Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 md:mb-24"
          >
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 overflow-hidden relative">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                      Daily Trading Volume by Country
                    </h3>
                    <p className="text-white/50 text-sm">
                      Korea leads Asia's crypto trading volume
                    </p>
                  </div>
                  <span className="text-xs text-white/40 mt-2 md:mt-0">
                    Source: Bank of Korea, Dec 2024
                  </span>
                </div>
                
                <div className="space-y-4">
                  {countryComparisonData.map((item, index) => (
                    <motion.div
                      key={item.country}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 md:gap-4"
                    >
                      <span className="text-xl md:text-2xl">{item.flag}</span>
                      <span className="text-sm text-white/70 w-20 md:w-24 shrink-0">
                        {item.country}
                      </span>
                      <div className="flex-1 h-10 md:h-12 bg-white/5 rounded-lg overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(item.volume / 10.7) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                          className="h-full rounded-lg flex items-center justify-end pr-3"
                          style={{ 
                            background: index === 0 
                              ? "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)" 
                              : "linear-gradient(90deg, #374151, #4B5563)"
                          }}
                        >
                          <span className="text-sm md:text-base font-semibold text-white drop-shadow-lg">
                            ${item.volume}B
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* CTA Section with Glow Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/10 border border-primary/20 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
              {/* Animated glow effects */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] pointer-events-none" 
              />
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-[80px] pointer-events-none" 
              />
              
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    Get Your Free Proposal
                  </h3>
                  <p className="text-xl md:text-2xl text-white/70 mb-8">
                    for Entering Korean Market
                  </p>
                </motion.div>
                <p className="text-white/50 mb-10 max-w-lg mx-auto">
                  Receive a customized market analysis and go-to-market strategy tailored to your project's needs. No commitment required.
                </p>
                
                <Link 
                  to="/contact"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  {/* Button glow pulse */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white/20 rounded-full"
                  />
                  <span className="relative z-10">Get Free Proposal</span>
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <p className="text-sm text-white/40 mt-6">
                  ✓ No commitment &nbsp; ✓ Personalized insights &nbsp; ✓ Response within 24h
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarketOpportunitySection;
