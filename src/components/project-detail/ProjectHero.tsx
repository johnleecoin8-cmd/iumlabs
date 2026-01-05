import { ArrowLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ProjectData } from "@/data/projectsData";

interface ProjectHeroProps {
  project: ProjectData;
}

const ProjectHero = ({ project }: ProjectHeroProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-[50vh] overflow-hidden flex items-end">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-[-20%] bg-cover bg-center"
        style={{
          backgroundImage: `url(${project.bgImage})`,
          filter: 'brightness(0.2) saturate(1.2)',
          y: backgroundY,
          scale
        }}
      />
      
      {/* Gradients */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
      
      {/* Project Color Gradient Wash */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${project.glowColor}25 0%, transparent 50%)`
        }}
      />
      
      {/* Animated Orb */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-25"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: project.glowColor }}
      />
      
      {/* Content */}
      <motion.div 
        className="relative z-20 container mx-auto max-w-7xl px-6 md:px-12 pb-8"
        style={{ opacity }}
      >
        {/* Back Button */}
        <motion.button 
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 mb-6 text-white/50 hover:text-white transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ x: -4 }}
        >
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors bg-white/5">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs tracking-wider uppercase font-medium">All Projects</span>
        </motion.button>

        {/* Title Area */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm border"
              style={{ 
                backgroundColor: `${project.glowColor}12`,
                borderColor: `${project.glowColor}25`
              }}
            >
              <img 
                src={project.logo} 
                alt={project.name} 
                className="w-9 h-9 object-contain"
                style={{ filter: `drop-shadow(0 0 12px ${project.glowColor}60)` }}
              />
            </div>
          </motion.div>
          
          {/* Title & Category */}
          <div>
            <motion.div 
              className="flex items-center gap-2 mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <span 
                className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
                style={{ backgroundColor: project.glowColor, color: '#000' }}
              >
                {project.category}
              </span>
              <span className="text-white/30 text-xs">•</span>
              <span className="text-white/50 text-xs">{project.result}</span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.name}
            </motion.h1>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectHero;
