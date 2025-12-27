import { ChevronDown, Database, BarChart3, FileText, Users, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Research metrics for the horizontal bar
const researchMetrics = [
  { icon: FileText, value: "50+", label: "Reports Published" },
  { icon: Database, value: "8", label: "Market Sectors" },
  { icon: TrendingUp, value: "Weekly", label: "Updates" },
  { icon: Users, value: "34+", label: "Expert Contributors" },
];

// Latest research preview data
const latestReports = [
  {
    slug: "ecosystem-growth-2025",
    title: "The State of Ecosystem Growth in 2025",
    category: "Market Research",
    date: "Dec 11, 2024",
  },
  {
    slug: "ai-agents-defi",
    title: "AI Agents & DeFi: The DeFAI Revolution",
    category: "DeFi",
    date: "Dec 10, 2024",
  },
  {
    slug: "avoid-flopped-tge",
    title: "Why Most Token Launches Fail in Korea",
    category: "Strategy",
    date: "Dec 8, 2024",
  },
];

const ResearchHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-2rem)] flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0A0A0A] via-[#0A0F1A] to-[#0A0A0A]">
      {/* Abstract Grid Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Horizontal grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_transparent_70%)]" />
        
        {/* Data flow lines - animated */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating data points */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-500/30"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">
              Ium Labs Intelligence
            </span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            className="font-sans text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] font-bold leading-[1.1] tracking-[-0.02em] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-white">Web3 Research &</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
              Market Analysis
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 font-light tracking-wide leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Data-driven insights for{" "}
            <span className="text-blue-400 font-medium">informed decision making</span>.
            <br className="hidden sm:block" />
            Comprehensive reports on Korean Web3 market dynamics.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-500 text-white font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Explore Research</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Latest Reports Preview */}
        <motion.div 
          className="w-full max-w-4xl mx-auto mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs text-blue-400/70 font-mono tracking-wider uppercase">Latest Reports</span>
            <span className="text-xs text-white/30 font-mono">[ 01 ]</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {latestReports.map((report, index) => (
              <Link
                key={index}
                to={`/research/${report.slug}`}
                className="group relative p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Category badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {report.category}
                  </span>
                  <span className="text-[10px] text-white/30">{report.date}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-sm font-medium text-white/80 group-hover:text-white leading-snug transition-colors line-clamp-2">
                  {report.title}
                </h3>
                
                {/* Hover arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Research Metrics Bar */}
      <motion.div 
        className="relative z-10 border-t border-white/[0.06] bg-white/[0.01] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {researchMetrics.map((metric, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-3 group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/15 transition-colors">
                  <metric.icon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-white">{metric.value}</div>
                  <div className="text-[10px] sm:text-xs text-white/40 font-light">{metric.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-32 sm:bottom-28 right-4 sm:right-8 z-10 flex items-center gap-2 group cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      >
        <span className="text-white/30 text-xs font-mono group-hover:text-blue-400/70 transition-colors duration-300">scroll</span>
        <div className="relative flex flex-col items-center">
          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-blue-400/40 transition-colors duration-300 flex justify-center pt-1.5">
            <motion.div 
              className="w-1 h-1.5 rounded-full bg-blue-400/60"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResearchHeroSection;