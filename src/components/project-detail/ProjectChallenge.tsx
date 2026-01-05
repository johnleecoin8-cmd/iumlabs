import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface ProjectChallengeProps {
  challenge: string;
  glowColor: string;
}

const ProjectChallenge = ({ challenge, glowColor }: ProjectChallengeProps) => {
  if (!challenge) return null;

  return (
    <section className="relative py-8 md:py-10 bg-[#0A0A0A] overflow-hidden">
      {/* Background */}
      <div 
        className="absolute top-0 left-0 w-[50%] h-[50%] opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${glowColor} 0%, transparent 60%)` }}
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
              02
            </span>
            <div 
              className="h-px w-10"
              style={{ background: `linear-gradient(to right, ${glowColor}, transparent)` }}
            />
            <span className="text-xs text-white/40 uppercase tracking-widest">Background</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            The <span style={{ color: glowColor }}>Challenge</span>
          </h2>
        </motion.div>
        
        {/* Challenge Quote */}
        <motion.div 
          className="relative max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {/* Quote Icon */}
          <div 
            className="absolute -top-2 -left-2 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${glowColor}15` }}
          >
            <Quote className="w-5 h-5" style={{ color: glowColor }} />
          </div>
          
          {/* Quote Text */}
          <div 
            className="pl-12 border-l-2"
            style={{ borderColor: `${glowColor}40` }}
          >
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed font-light italic">
              "{challenge}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectChallenge;
