import { motion } from "framer-motion";

interface ProjectChallengeProps {
  challenge: string;
  services: string[];
  strategy: string[];
  glowColor: string;
}

const ProjectChallenge = ({ challenge, services, strategy, glowColor }: ProjectChallengeProps) => {
  return (
    <section className="bg-[#121212] py-8 relative">
      {/* Section Header - Homepage Style */}
      <div className="border-t border-white/10">
        <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Challenge</h2>
          </div>
          <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Our Approach</span>
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 md:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left - THE CHALLENGE */}
          <motion.div 
            className="p-8 md:p-12 rounded-2xl bg-[#111] transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            style={{ border: `1px solid ${glowColor}30` }}
          >
            {/* Top & Left Accent Lines */}
            <div 
              className="absolute top-0 left-0 w-full h-1" 
              style={{ background: `linear-gradient(to right, ${glowColor}, ${glowColor}50, transparent)` }}
            />
            <div 
              className="absolute top-0 left-0 h-full w-1" 
              style={{ background: `linear-gradient(to bottom, ${glowColor}, transparent)` }}
            />
            
            {/* Corner Glow */}
            <div 
              className="absolute -top-20 -left-20 w-40 h-40 opacity-40"
              style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
            />
            
            {/* Hover Glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ boxShadow: `inset 0 0 80px ${glowColor}15` }}
            />
            
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] mb-6" style={{ color: glowColor }}>
              <span className="w-6 h-px" style={{ backgroundColor: glowColor }} />
              The Challenge
            </span>
            <p className="text-white text-xl md:text-2xl font-light leading-relaxed">
              {challenge}
            </p>
            
            {/* Decorative Number */}
            <span 
              className="absolute bottom-6 right-6 text-8xl font-bold opacity-[0.05]"
              style={{ color: glowColor }}
            >
              01
            </span>
          </motion.div>

          {/* Right - WHAT WE DID */}
          <motion.div 
            className="p-8 md:p-12 rounded-2xl bg-[#111] transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -4 }}
            style={{ border: `1px solid ${glowColor}20` }}
          >
            {/* Accent Line */}
            <div 
              className="absolute top-0 left-0 w-full h-1" 
              style={{ background: `linear-gradient(to right, ${glowColor}60, ${glowColor}20, transparent)` }}
            />
            
            {/* Hover Glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ backgroundColor: `${glowColor}08` }}
            />
            
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] mb-6" style={{ color: glowColor }}>
              <span className="w-6 h-px" style={{ backgroundColor: glowColor }} />
              What We Did
            </span>
            
            {/* Services List with Project Color Dots */}
            <div className="space-y-4 mb-8">
              {services.map((service, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-3 group/item"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div 
                    className="w-2 h-2 rounded-full transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-lg"
                    style={{ 
                      backgroundColor: glowColor,
                      boxShadow: `0 0 0 0 ${glowColor}40`
                    }} 
                  />
                  <span className="text-white text-lg group-hover/item:translate-x-1 transition-transform">{service}</span>
                </motion.div>
              ))}
            </div>

            {/* Divider with color */}
            <div 
              className="my-6 h-px"
              style={{ background: `linear-gradient(to right, ${glowColor}30, transparent)` }}
            />

            {/* Strategy Quote */}
            {strategy[0] && (
              <p className="text-white/60 text-sm italic leading-relaxed">
                "{strategy[0]}"
              </p>
            )}
            
            {/* Decorative Number */}
            <span 
              className="absolute bottom-6 right-6 text-8xl font-bold opacity-[0.05]"
              style={{ color: glowColor }}
            >
              02
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectChallenge;
