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
    <section className="relative py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Transition Gradient from current to next project color */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${currentGlowColor}30, ${nextProject.glowColor}30, transparent)` }}
      />
      
      {/* Next Project Color Ambient */}
      <div 
        className="absolute bottom-0 right-0 w-[70%] h-[70%] opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 100% 100%, ${nextProject.glowColor} 0%, transparent 60%)` }}
      />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Section Label */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            <span 
              className="text-sm font-mono tracking-wider"
              style={{ color: nextProject.glowColor }}
            >
              03
            </span>
            <div 
              className="h-px w-12"
              style={{ background: `linear-gradient(to right, ${nextProject.glowColor}, transparent)` }}
            />
            <span className="text-xs text-white/40 uppercase tracking-widest">Continue Exploring</span>
          </div>
        </motion.div>
        
        <Link 
          to={`/projects/${nextSlug}`}
          onClick={() => window.scrollTo(0, 0)}
          className="block group"
        >
          <motion.div
            className="relative p-10 md:p-16 rounded-3xl border overflow-hidden transition-all duration-500 group-hover:border-opacity-100"
            style={{ 
              backgroundColor: `${nextProject.glowColor}05`,
              borderColor: `${nextProject.glowColor}20`
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            {/* Background Image Hint */}
            <div 
              className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
              style={{ 
                backgroundImage: `url(${nextProject.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px)'
              }}
            />
            
            {/* Hover Glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ 
                background: `radial-gradient(ellipse at center, ${nextProject.glowColor}10 0%, transparent 60%)`
              }}
            />
            
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex-1">
                {/* Next Project Label */}
                <p 
                  className="text-sm uppercase tracking-[0.25em] font-semibold mb-4 flex items-center gap-3"
                  style={{ color: nextProject.glowColor }}
                >
                  <ArrowRight className="w-4 h-4" />
                  Next Project
                </p>
                
                {/* Project Name */}
                <h3 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-opacity-100"
                  style={{ textShadow: `0 0 60px ${nextProject.glowColor}20` }}
                >
                  {nextProject.name}
                </h3>
                
                {/* Result */}
                <p className="text-lg text-white/50 flex items-center gap-3">
                  <span 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: nextProject.glowColor }}
                  />
                  {nextProject.result}
                </p>
              </div>
              
              {/* Arrow Button */}
              <motion.div 
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ 
                    border: `2px solid ${nextProject.glowColor}50`,
                    backgroundColor: `${nextProject.glowColor}10`
                  }}
                >
                  <ArrowUpRight 
                    className="w-8 h-8 md:w-10 md:h-10" 
                    style={{ color: nextProject.glowColor }}
                  />
                </div>
                {/* Glow Ring */}
                <div 
                  className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity -z-10 scale-150"
                  style={{ backgroundColor: nextProject.glowColor }}
                />
              </motion.div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default NextProject;
