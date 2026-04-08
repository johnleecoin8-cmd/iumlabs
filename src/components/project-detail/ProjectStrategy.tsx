import { motion } from "framer-motion";
import { Target, Users, Megaphone, BarChart3, Lightbulb, Globe, Zap, TrendingUp } from "lucide-react";

interface ProjectStrategyProps {
  strategy: string[];
  glowColor: string;
}

const stepIcons = [Target, Users, Megaphone, BarChart3, Lightbulb, Globe, Zap, TrendingUp];

const ProjectStrategy = ({ strategy, glowColor }: ProjectStrategyProps) => {
  if (!strategy || strategy.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Subtle background accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />
      
      <div className="px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div 
          className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-baseline gap-4 md:gap-6">
            <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest">02</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Approach</h2>
          </div>
          <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block px-3 py-1 border border-white/10 rounded-full">
            Strategy
          </span>
        </motion.div>
        
        {/* Strategy Cards - Staggered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {strategy.slice(0, 4).map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
              <motion.div
                key={i}
                className="group relative bg-[#111111] rounded-2xl p-6 md:p-8 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {/* Top row: number + icon */}
                <div className="flex items-center justify-between mb-5">
                  <span 
                    className="text-3xl md:text-4xl font-bold opacity-20 font-mono"
                    style={{ color: glowColor }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div 
                    className="p-2.5 rounded-xl transition-all duration-300"
                    style={{ 
                      backgroundColor: `${glowColor}10`,
                    }}
                  >
                    <Icon 
                      className="w-5 h-5 transition-colors duration-300" 
                      style={{ color: glowColor }}
                    />
                  </div>
                </div>
                
                {/* Strategy text */}
                <p className="text-sm md:text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {step}
                </p>

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-6 right-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: glowColor }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectStrategy;