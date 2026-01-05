import { ArrowLeft, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProjectData } from "@/data/projectsData";

interface ProjectHeroProps {
  project: ProjectData;
}

const ProjectHero = ({ project }: ProjectHeroProps) => {
  const navigate = useNavigate();
  
  // Get the first gallery image as background
  const backgroundImage = project.gallery?.[0]?.src || project.bgImage;

  return (
    <section className="relative min-h-[85vh] overflow-hidden mx-4 mt-4 rounded-3xl">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img 
            src={backgroundImage} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}
      
      {/* Fallback Black Background */}
      {!backgroundImage && <div className="absolute inset-0 bg-black" />}
      
      {/* Gradient overlay for readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.7) 100%),
            radial-gradient(ellipse 80% 60% at 70% 40%, ${project.glowColor}20 0%, transparent 50%)
          `
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 h-full min-h-[85vh] flex flex-col justify-between p-8 md:p-12 lg:p-16">
        {/* Top Row - Back Button + Logo */}
        <div className="flex items-start justify-between">
          {/* Back Button */}
          <motion.button 
            onClick={() => navigate("/projects")}
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors bg-white/5 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Back</span>
          </motion.button>

          {/* Project Logo - Top Right */}
          {project.logo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-4 md:p-6"
            >
              <img 
                src={project.logo} 
                alt={`${project.name} logo`}
                className="h-10 md:h-14 w-auto object-contain"
              />
            </motion.div>
          )}
        </div>

        {/* Main Content - Center/Bottom */}
        <div className="flex-1 flex flex-col justify-end max-w-4xl">
          {/* Category Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span 
              className="px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm"
              style={{ backgroundColor: `${project.glowColor}30`, color: 'white' }}
            >
              {project.category}
            </span>
            {project.result && (
              <>
                <span className="text-white/30">•</span>
                <span className="text-white/80 text-sm font-medium">{project.result}</span>
              </>
            )}
          </motion.div>
          
          {/* Project Name - Large */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white tracking-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {project.name}
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {project.description}
          </motion.p>
          
          {/* CTA Button */}
          <motion.a
            href="https://calendly.com/iumlabs/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white hover:bg-white/20 hover:border-white/40 transition-all self-start group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Book a Meeting</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
