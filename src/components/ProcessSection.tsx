import { motion } from "framer-motion";
import { Search, Target, Rocket, TrendingUp } from "lucide-react";

const phases = [
  {
    title: "Discovery",
    icon: Search,
    description: "Deep-dive into your project, market positioning, and Korean audience fit.",
    color: "#3B82F6", // Blue
    glowColor: "rgba(59, 130, 246, 0.4)",
    week: "Week 1"
  },
  {
    title: "Strategy",
    icon: Target,
    description: "Build GTM roadmap, channel mix, and localized messaging framework.",
    color: "#06B6D4", // Cyan
    glowColor: "rgba(6, 182, 212, 0.4)",
    week: "Week 2"
  },
  {
    title: "Launch",
    icon: Rocket,
    description: "Execute campaigns across KOLs, community, PR, and social channels.",
    color: "#10B981", // Emerald
    glowColor: "rgba(16, 185, 129, 0.4)",
    week: "Week 3"
  },
  {
    title: "Scale",
    icon: TrendingUp,
    description: "Optimize, iterate, and expand based on performance data.",
    color: "#22C55E", // Green
    glowColor: "rgba(34, 197, 94, 0.4)",
    week: "Week 4+"
  }
];

const ProcessSection = () => {
  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-emerald-500/5 pointer-events-none" />
      
      <div className="relative">
        {/* Connecting line SVG */}
        <svg 
          className="absolute top-1/2 left-0 w-full h-2 hidden lg:block pointer-events-none" 
          style={{ transform: 'translateY(-50%)' }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="33%" stopColor="#06B6D4" />
              <stop offset="66%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
          <line 
            x1="12.5%" y1="50%" x2="87.5%" y2="50%" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            strokeDasharray="8 4"
            opacity="0.4"
          />
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isLast = index === phases.length - 1;
            const isOdd = index % 2 === 1;
            
            return (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className={`group p-8 md:p-10 transition-all duration-300 relative ${
                  !isLast ? "lg:border-r border-white/10" : ""
                } ${isOdd ? "md:border-l lg:border-l-0 border-white/10" : ""} ${
                  index < 2 ? "border-b lg:border-b-0 border-white/10" : ""
                }`}
                style={{
                  background: `linear-gradient(180deg, transparent 0%, ${phase.color}05 100%)`
                }}
              >
                {/* Phase indicator */}
                <motion.div 
                  className="absolute top-4 right-4 text-xs font-mono tracking-wider"
                  style={{ color: phase.color }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  {phase.week}
                </motion.div>

                {/* Step number with glow */}
                <motion.div
                  className="absolute -top-3 left-8 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-[#0A0A0A]"
                  style={{ 
                    borderColor: phase.color,
                    color: phase.color,
                    boxShadow: `0 0 20px ${phase.glowColor}`
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>

                <Icon 
                  className="w-8 h-8 mb-4 transition-all duration-300 group-hover:scale-110" 
                  strokeWidth={1.5}
                  style={{ 
                    color: 'rgba(255,255,255,0.4)',
                  }}
                />
                
                {/* Icon with color on hover */}
                <motion.div
                  className="-mt-12 mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon 
                    className="w-8 h-8 transition-all duration-300" 
                    strokeWidth={1.5}
                    style={{ 
                      color: phase.color,
                      filter: `drop-shadow(0 0 12px ${phase.glowColor})`,
                      opacity: 0
                    }}
                  />
                </motion.div>
                
                <h3 
                  className="text-lg font-semibold text-white mb-3 group-hover:text-white/90 transition-colors"
                >
                  {phase.title}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed">
                  {phase.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: phase.color }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
