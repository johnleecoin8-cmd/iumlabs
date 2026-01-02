import { motion } from "framer-motion";
import { Lightbulb, CheckCircle2, Sparkles } from "lucide-react";

interface ProjectChallengeProps {
  challenge: string;
  services: string[];
  strategy: string[];
  glowColor: string;
}

const ProjectChallenge = ({
  challenge,
  services,
  strategy,
  glowColor
}: ProjectChallengeProps) => {
  return (
    <section className="relative py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute top-0 left-0 w-[50%] h-[50%] opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${glowColor} 0%, transparent 60%)` }}
      />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span 
              className="text-sm font-mono tracking-wider"
              style={{ color: glowColor }}
            >
              02
            </span>
            <div 
              className="h-px w-12"
              style={{ background: `linear-gradient(to right, ${glowColor}, transparent)` }}
            />
            <span className="text-xs text-white/40 uppercase tracking-widest">Our Approach</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Challenge & <span style={{ color: glowColor }}>Solution</span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Challenge Card */}
          <motion.div 
            className="group relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="relative p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border overflow-hidden h-full"
              style={{ borderColor: `${glowColor}20` }}
            >
              {/* Top Accent Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{ background: `linear-gradient(to right, ${glowColor}, ${glowColor}50, transparent)` }}
              />
              
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                style={{ 
                  backgroundColor: `${glowColor}15`,
                  border: `1px solid ${glowColor}30`
                }}
              >
                <Lightbulb className="w-6 h-6" style={{ color: glowColor }} />
              </div>
              
              {/* Label */}
              <p 
                className="text-xs uppercase tracking-[0.25em] font-semibold mb-4"
                style={{ color: glowColor }}
              >
                The Challenge
              </p>
              
              {/* Challenge Text */}
              <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                {challenge}
              </p>
              
              {/* Decorative Element */}
              <div 
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-10"
                style={{ backgroundColor: glowColor }}
              />
            </div>
          </motion.div>

          {/* Right - Solution Card */}
          <motion.div 
            className="group relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div 
              className="relative p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border overflow-hidden h-full"
              style={{ borderColor: `${glowColor}15` }}
            >
              {/* Top Accent Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{ background: `linear-gradient(to right, ${glowColor}60, ${glowColor}20, transparent)` }}
              />
              
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                style={{ 
                  backgroundColor: `${glowColor}10`,
                  border: `1px solid ${glowColor}20`
                }}
              >
                <Sparkles className="w-6 h-6" style={{ color: glowColor }} />
              </div>
              
              {/* Label */}
              <p 
                className="text-xs uppercase tracking-[0.25em] font-semibold mb-6"
                style={{ color: glowColor }}
              >
                What We Did
              </p>
              
              {/* Services List */}
              <div className="space-y-4 mb-8">
                {services.map((service, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-4 group/item"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-110"
                      style={{ 
                        backgroundColor: `${glowColor}20`,
                        border: `1px solid ${glowColor}30`
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: glowColor }} />
                    </div>
                    <span className="text-white/70 text-lg group-hover/item:text-white transition-colors">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div 
                className="h-px mb-6"
                style={{ background: `linear-gradient(to right, ${glowColor}30, transparent)` }}
              />

              {/* Strategy Quote */}
              {strategy[0] && (
                <blockquote className="relative pl-4 border-l-2" style={{ borderColor: `${glowColor}50` }}>
                  <p className="text-white/50 text-sm italic leading-relaxed">
                    "{strategy[0]}"
                  </p>
                </blockquote>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectChallenge;