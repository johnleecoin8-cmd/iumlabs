import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, DollarSign, Zap } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

// Mock data for charts
const tradingVolumeData = [
  { month: "Jan", value: 5.2 },
  { month: "Feb", value: 5.8 },
  { month: "Mar", value: 6.1 },
  { month: "Apr", value: 5.9 },
  { month: "May", value: 6.8 },
  { month: "Jun", value: 7.2 },
  { month: "Jul", value: 7.5 },
  { month: "Aug", value: 7.8 },
  { month: "Sep", value: 8.0 },
  { month: "Oct", value: 8.2 },
];

const communityGrowthData = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 120 },
  { month: "Mar", value: 150 },
  { month: "Apr", value: 180 },
  { month: "May", value: 220 },
  { month: "Jun", value: 260 },
  { month: "Jul", value: 290 },
  { month: "Aug", value: 320 },
  { month: "Sep", value: 340 },
];

const countryComparisonData = [
  { country: "Korea", volume: 8.2, color: "#3B82F6" },
  { country: "Japan", volume: 4.1, color: "#6B7280" },
  { country: "Singapore", volume: 2.3, color: "#6B7280" },
  { country: "Hong Kong", volume: 1.8, color: "#6B7280" },
];

const marketStats = [
  {
    value: 15.6,
    suffix: "M+",
    label: "Active Crypto Holders",
    subLabel: "30% of total population",
    growth: "+12% YoY",
    icon: Users,
    chartData: tradingVolumeData,
  },
  {
    value: 8.2,
    prefix: "$",
    suffix: "B",
    label: "Daily Trading Volume",
    subLabel: "Global Top 3",
    growth: "+45% YoY",
    icon: DollarSign,
    chartData: tradingVolumeData,
  },
  {
    value: 340,
    suffix: "%",
    label: "Web3 Community Growth",
    subLabel: "Year over Year",
    growth: "2024 Data",
    icon: TrendingUp,
    chartData: communityGrowthData,
  },
  {
    value: 5.2,
    prefix: "$",
    suffix: "K",
    label: "Avg. Investment per Holder",
    subLabel: "High engagement market",
    growth: "+28% YoY",
    icon: Zap,
    chartData: communityGrowthData,
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
      
      // Easing function for smooth animation
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
  index 
}: { 
  stat: typeof marketStats[0]; 
  index: number;
}) => {
  const Icon = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20">
        {/* Background glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        </div>
        
        {/* Mini chart background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stat.chartData}>
              <defs>
                <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={1.5}
                fill={`url(#gradient-${index})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon & Growth badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
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
  return (
    <div className="py-20 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
        {/* Secondary orb */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
            Market Opportunity
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Unlock Korea's
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
              Hidden Potential
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            The world's most active crypto market is waiting for you
          </p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
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
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10">
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
                Data: Q4 2024 (in Billions USD)
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
                  className="flex items-center gap-4"
                >
                  <span className="text-sm text-white/70 w-24 shrink-0">
                    {item.country}
                  </span>
                  <div className="flex-1 h-10 bg-white/5 rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.volume / 8.2) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-lg flex items-center justify-end pr-3"
                      style={{ 
                        background: index === 0 
                          ? "linear-gradient(90deg, #3B82F6, #60A5FA)" 
                          : "linear-gradient(90deg, #374151, #4B5563)"
                      }}
                    >
                      <span className="text-sm font-semibold text-white">
                        ${item.volume}B
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Get Your Free Proposal
              </h3>
              <p className="text-xl md:text-2xl text-white/70 mb-8">
                for Entering Korean Market
              </p>
              <p className="text-white/50 mb-10 max-w-lg mx-auto">
                Receive a customized market analysis and go-to-market strategy tailored to your project's needs. No commitment required.
              </p>
              
              <Link 
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
              >
                <span>Get Free Proposal</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <p className="text-sm text-white/40 mt-6">
                ✓ No commitment &nbsp; ✓ Personalized insights &nbsp; ✓ Response within 24h
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketOpportunitySection;
