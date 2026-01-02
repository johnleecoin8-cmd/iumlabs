import { ArrowUpRight } from "lucide-react";
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
    <section className="py-24 bg-[#121212] relative overflow-hidden">
      {/* Section Header - Homepage Style */}
      <div className="border-t border-white/10">
        <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">04</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Next</h2>
          </div>
          <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Explore More</span>
        </div>
      </div>
      
      {/* Top Border with Current Project Color */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${currentGlowColor}50, transparent)` }}
      />
      
      {/* Next Project Color Ambient */}
      <div 
        className="absolute bottom-0 right-0 w-[60%] h-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 100% 100%, ${nextProject.glowColor} 0%, transparent 60%)` }}
      />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to={`/projects/${nextSlug}`}
            onClick={() => window.scrollTo(0, 0)}
            className="block group"
          >
            <p className="text-label uppercase tracking-widest mb-6 flex items-center gap-3" style={{ color: nextProject.glowColor }}>
              <span className="w-12 h-px" style={{ backgroundColor: nextProject.glowColor }} />
              Next Project
              <span className="w-8 h-px opacity-50" style={{ backgroundColor: nextProject.glowColor }} />
            </p>
            <div className="flex items-center justify-between">
              <div>
                <motion.h3 
                  className="text-display-xl md:text-display-hero font-bold text-white transition-colors duration-300 mb-3"
                  whileHover={{ x: 10 }}
                  style={{ textShadow: `0 0 60px ${nextProject.glowColor}20` }}
                  onMouseEnter={(e) => e.currentTarget.style.color = nextProject.glowColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  {nextProject.name}
                </motion.h3>
                <p className="text-white/50 text-body-lg flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: nextProject.glowColor }} />
                  {nextProject.result}
                </p>
              </div>
              <div className="relative">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    border: `2px solid ${nextProject.glowColor}40`,
                    backgroundColor: `${nextProject.glowColor}10`
                  }}
                >
                  <ArrowUpRight 
                    className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                    style={{ color: nextProject.glowColor }}
                  />
                </div>
                {/* Glow on hover */}
                <div 
                  className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 scale-150" 
                  style={{ backgroundColor: `${nextProject.glowColor}50` }}
                />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NextProject;
