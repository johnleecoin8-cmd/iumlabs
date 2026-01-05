import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProjectStrategyProps {
  strategy: string[];
  glowColor: string;
}

const ProjectStrategy = ({ strategy, glowColor }: ProjectStrategyProps) => {
  if (!strategy || strategy.length === 0) return null;

  return (
    <section className="relative py-12 md:py-16 bg-[#0A0A0A] overflow-hidden">
      {/* Background */}
      <div 
        className="absolute bottom-0 right-0 w-[40%] h-[60%] opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 100% 100%, ${glowColor} 0%, transparent 60%)` }}
      />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span 
              className="text-sm font-mono tracking-wider"
              style={{ color: glowColor }}
            >
              03
            </span>
            <div 
              className="h-px w-10"
              style={{ background: `linear-gradient(to right, ${glowColor}, transparent)` }}
            />
            <span className="text-xs text-white/40 uppercase tracking-widest">Strategy</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Our <span style={{ color: glowColor }}>Approach</span>
          </h2>
        </motion.div>
        
        {/* Strategy Steps - Horizontal Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div 
            className="hidden md:block absolute top-6 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, ${glowColor}40, ${glowColor}20, transparent)` }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategy.slice(0, 4).map((step, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Step Number */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10 transition-transform group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${glowColor}15`,
                    border: `1px solid ${glowColor}30`
                  }}
                >
                  <span 
                    className="text-lg font-bold"
                    style={{ color: glowColor }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Content */}
                <div 
                  className="p-4 rounded-xl border bg-gradient-to-br from-white/[0.02] to-transparent transition-all duration-300 group-hover:from-white/[0.04]"
                  style={{ borderColor: `${glowColor}10` }}
                >
                  <p className="text-sm text-white/70 leading-relaxed">
                    {step}
                  </p>
                  
                  {/* Arrow indicator */}
                  {i < strategy.slice(0, 4).length - 1 && (
                    <div className="hidden lg:flex absolute top-6 -right-2 z-20">
                      <ArrowRight className="w-4 h-4 text-white/20" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectStrategy;
