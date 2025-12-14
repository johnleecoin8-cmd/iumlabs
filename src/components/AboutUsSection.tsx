import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { TrendingUp, Users, Building2, Handshake } from "lucide-react";
import { motion } from "framer-motion";
const stats = [{
  value: 18,
  suffix: "+",
  prefix: "",
  label: "Projects Launched",
  icon: TrendingUp,
  description: "Successfully launched in Korea",
  glowColor: "from-emerald-500/20 to-cyan-500/10"
}, {
  value: 120,
  suffix: "+",
  prefix: "",
  label: "KOL Network",
  icon: Users,
  description: "Influencers & creators",
  glowColor: "from-primary/20 to-purple-500/10"
}, {
  value: 2.5,
  suffix: "M+",
  prefix: "$",
  label: "Token Sales",
  icon: Building2,
  description: "Total token sales supported",
  glowColor: "from-cyan-500/20 to-blue-500/10"
}, {
  value: 38,
  suffix: "+",
  prefix: "",
  label: "AMA Hosting",
  icon: Handshake,
  description: "AMAs hosted for projects",
  glowColor: "from-purple-500/20 to-pink-500/10"
}];

// Floating tags for light background
const floatingTags = [{
  label: "Korea Expert",
  top: "8%",
  left: "5%",
  delay: 0
}, {
  label: "24/7 Support",
  top: "15%",
  right: "8%",
  delay: 0.2
}, {
  label: "VASP Compliant",
  bottom: "20%",
  left: "3%",
  delay: 0.4
}, {
  label: "120+ KOLs",
  bottom: "12%",
  right: "5%",
  delay: 0.6
}];
const mobileFloatingTags = [{
  label: "Korea Expert",
  top: "3%",
  left: "5%",
  delay: 0
}, {
  label: "120+ KOLs",
  top: "3%",
  right: "5%",
  delay: 0.2
}];
const StatCard = ({
  stat,
  index,
  isVisible
}: {
  stat: typeof stats[0];
  index: number;
  isVisible: boolean;
}) => {
  const formattedCount = useCountUp({
    end: stat.value,
    duration: 2000,
    prefix: stat.prefix,
    suffix: stat.suffix,
    isVisible
  });
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} animate={isVisible ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 30
  }} transition={{
    duration: 0.6,
    delay: index * 0.1 + 0.3
  }} className="group relative p-6 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-500 overflow-hidden hover:-translate-y-1">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${stat.glowColor}`} />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      
      {/* Corner glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
        <stat.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      <div className="mt-8 relative z-10">
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 tabular-nums group-hover:text-primary transition-colors duration-300">
          {formattedCount}
        </div>
        <div className="text-gray-700 font-medium text-sm mb-1">
          {stat.label}
        </div>
        <div className="text-gray-500 text-xs group-hover:text-gray-700 transition-colors">
          {stat.description}
        </div>
      </div>
    </motion.div>;
};
const AboutUsSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  return <div ref={ref} className="relative px-4 bg-[#F8F8F8] overflow-hidden py-[40px]">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs - Subtle for light background */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-pulse" style={{
        animationDuration: '8s'
      }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" style={{
        animationDuration: '10s',
        animationDelay: '2s'
      }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />
      </div>
      
      {/* Floating Tags - Desktop */}
      {floatingTags.map((tag, index) => (
        <motion.div 
          key={`desktop-${index}`} 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: tag.delay }}
          className="hidden md:flex absolute items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm text-gray-600 text-xs font-medium z-20"
          style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
        >
          <span className="w-1 h-1 rounded-full bg-primary" />
          {tag.label}
        </motion.div>
      ))}

      {/* Floating Tags - Mobile */}
      {mobileFloatingTags.map((tag, index) => <motion.div key={`mobile-${index}`} initial={{
      opacity: 0,
      scale: 0.8
    }} animate={isVisible ? {
      opacity: 1,
      scale: 1
    } : {
      opacity: 0,
      scale: 0.8
    }} transition={{
      duration: 0.5,
      delay: tag.delay
    }} className="md:hidden flex absolute items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm text-gray-600 text-[10px] font-medium z-20" style={{
      top: tag.top,
      left: tag.left,
      right: tag.right
    }}>
          <span className="w-1 h-1 rounded-full bg-primary" />
          {tag.label}
        </motion.div>)}

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={isVisible ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: -30
        }} transition={{
          duration: 0.7
        }}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 tracking-widest uppercase">
              <span className="w-8 h-px bg-primary" />
              Why Choose Us
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              We Bridge Your
              <br />
              Project to{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-white px-3 py-1">Korea</span>
                {/* Gradient background highlight */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-cyan-400 rounded-lg -skew-x-3" />
              </span>
            </h2>
            
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={isVisible ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              Founded by veterans from <span className="text-gray-900 font-semibold bg-gray-100 px-2 py-0.5 rounded">Binance</span> and{" "}
              <span className="text-gray-900 font-semibold bg-gray-100 px-2 py-0.5 rounded">KuCoin</span>, we deliver unmatched expertise 
              in Korean Web3 market entry, community building, and exchange partnerships.
            </motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={isVisible ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="group flex items-center gap-6 p-4 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-500 w-fit">
              <div className="flex -space-x-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 border-2 border-primary/40 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/60 transition-all duration-500">
                  <span className="text-primary text-base font-bold">J</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-500/5 border-2 border-cyan-500/40 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/60 transition-all duration-500 -ml-3">
                  <span className="text-cyan-400 text-base font-bold">D</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-0.5">Founded by</p>
                <p className="text-gray-900 font-medium">Ex-Binance & Ex-KuCoin Leaders</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
          </div>
        </div>

      </div>
    </div>;
};
export default AboutUsSection;