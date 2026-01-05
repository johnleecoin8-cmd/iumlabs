import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProjectData } from "@/data/projectsData";

interface NextProjectProps {
  nextSlug: string;
  nextProject: ProjectData;
  currentGlowColor: string;
}

const NextProject = ({ nextSlug, nextProject, currentGlowColor }: NextProjectProps) => {
  return (
    <section className="relative py-12 md:py-16 bg-[#0A0A0A] overflow-hidden">
      {/* Transition Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${currentGlowColor}20, ${nextProject.glowColor}20, transparent)` }}
      />
      
      {/* Background Glow */}
      <div 
        className="absolute bottom-0 right-0 w-[50%] h-[60%] opacity-8 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 100% 100%, ${nextProject.glowColor} 0%, transparent 60%)` }}
      />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <Link 
          to={`/projects/${nextSlug}`}
          onClick={() => window.scrollTo(0, 0)}
          className="block group"
        >
          <motion.div
            className="relative p-5 md:p-8 rounded-xl border overflow-hidden transition-all duration-300 group-hover:border-opacity-100"
            style={{ 
              backgroundColor: `${nextProject.glowColor}05`,
              borderColor: `${nextProject.glowColor}15`
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
          >
            {/* Background Image Hint */}
            <div 
              className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
              style={{ 
                backgroundImage: `url(${nextProject.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(15px)'
              }}
            />
            
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <p 
                  className="text-xs uppercase tracking-[0.2em] font-semibold mb-2 flex items-center gap-2"
                  style={{ color: nextProject.glowColor }}
                >
                  <ArrowRight className="w-3 h-3" />
                  Next Project
                </p>
                
                <h3 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2"
                  style={{ textShadow: `0 0 30px ${nextProject.glowColor}15` }}
                >
                  {nextProject.name}
                </h3>
                
                <p className="text-sm text-white/50 flex items-center gap-2">
                  <span 
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: nextProject.glowColor }}
                  />
                  {nextProject.result}
                </p>
              </div>
              
              {/* Arrow */}
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{ 
                    border: `2px solid ${nextProject.glowColor}40`,
                    backgroundColor: `${nextProject.glowColor}10`
                  }}
                >
                  <ArrowUpRight className="w-5 h-5" style={{ color: nextProject.glowColor }} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default NextProject;
