import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProjectData } from "@/data/projectsData";

interface ProjectHeroProps {
  project: ProjectData;
}

const ProjectHero = ({ project }: ProjectHeroProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[50vh] overflow-hidden">
      {/* Background Image with Ken Burns + Color Tint */}
      <div 
        className="absolute inset-[-10%] bg-cover bg-center animate-kenburns"
        style={{ 
          backgroundImage: `url(${project.bgImage})`,
          filter: 'brightness(0.35) saturate(1.4)',
        }}
      />
      
      {/* Project Color Tint Overlay */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-30"
        style={{ backgroundColor: project.glowColor }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />
      <div 
        className="absolute inset-0"
        style={{ background: `linear-gradient(to right, ${project.glowColor}20 0%, transparent 50%, transparent 100%)` }}
      />
      
      {/* Project Color Glow Blobs */}
      <div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-40 animate-pulse"
        style={{ background: `radial-gradient(circle, ${project.glowColor} 0%, transparent 60%)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30"
        style={{ background: `radial-gradient(circle, ${project.glowColor} 0%, transparent 60%)` }}
      />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${project.glowColor} 1px, transparent 1px),
            linear-gradient(90deg, ${project.glowColor} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Corner Accent Lines */}
      <div 
        className="absolute top-0 left-0 w-40 h-px"
        style={{ background: `linear-gradient(to right, ${project.glowColor}, transparent)` }}
      />
      <div 
        className="absolute top-0 left-0 h-40 w-px"
        style={{ background: `linear-gradient(to bottom, ${project.glowColor}, transparent)` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-8 pt-20 pb-12">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 text-white/60 mb-12 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -4 }}
          onMouseEnter={(e) => e.currentTarget.style.color = project.glowColor}
          onMouseLeave={(e) => e.currentTarget.style.color = ''}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-wider">Back to Projects</span>
        </motion.button>

        {/* Category Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ 
            backgroundColor: `${project.glowColor}20`, 
            border: `1px solid ${project.glowColor}40` 
          }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.glowColor }} />
          <span className="text-xs uppercase tracking-widest font-medium" style={{ color: project.glowColor }}>
            {project.category}
          </span>
        </motion.div>

        {/* Logo & Name */}
        <div className="flex flex-col items-start gap-6">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={project.logo}
              alt={project.name}
              className="w-16 h-16 object-contain filter brightness-0 invert"
              style={{ filter: `brightness(0) invert(1) drop-shadow(0 0 20px ${project.glowColor}80)` }}
            />
            <div 
              className="absolute inset-0 rounded-full blur-xl -z-10 scale-150" 
              style={{ backgroundColor: `${project.glowColor}20` }}
            />
          </motion.div>
          
          <div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.name}
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {project.description}
            </motion.p>
          </div>
        </div>

        {/* Key Result Badge */}
        <motion.div 
          className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          style={{ border: `1px solid ${project.glowColor}30` }}
        >
          <span className="text-white/50 text-xs uppercase tracking-wider">Key Result</span>
          <span className="text-xl md:text-2xl font-bold" style={{ color: project.glowColor }}>{project.result}</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 animate-pulse" style={{ background: `linear-gradient(to bottom, ${project.glowColor}, transparent)` }} />
        <span className="text-xs uppercase tracking-widest" style={{ color: `${project.glowColor}60` }}>Scroll</span>
      </div>
    </section>
  );
};

export default ProjectHero;
