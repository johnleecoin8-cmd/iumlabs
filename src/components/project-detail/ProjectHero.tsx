import { ArrowLeft, ArrowDownRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProjectData } from "@/data/projectsData";

interface ProjectHeroProps {
  project: ProjectData;
}

const ProjectHero = ({ project }: ProjectHeroProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] overflow-hidden mx-4 mt-4 rounded-3xl">
      {/* Colorful Gradient Background */}
      <div className="absolute inset-0 bg-[#F0F0F0]" />
      
      {/* Multi-color gradient blobs */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, ${project.glowColor}50 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 30% 70%, #FF6B6B35 0%, transparent 45%),
            radial-gradient(ellipse 50% 40% at 80% 80%, #4ECDC430 0%, transparent 40%),
            radial-gradient(ellipse 40% 30% at 20% 30%, #FFE66D25 0%, transparent 35%)
          `,
          filter: 'blur(60px)'
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 h-full min-h-[85vh] flex flex-col justify-between p-8 md:p-12 lg:p-16">
        {/* Back Button - Top */}
        <motion.button 
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors self-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gray-500 transition-colors bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        {/* Main Content - Center/Bottom */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl">
          {/* Category Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span 
              className="px-4 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${project.glowColor}25`, color: project.glowColor }}
            >
              {project.category}
            </span>
            {project.result && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 text-sm">{project.result}</span>
              </>
            )}
          </motion.div>
          
          {/* Project Name - Large */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-gray-800 tracking-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {project.name}
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-10"
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
            className="inline-flex items-center gap-3 px-6 py-4 border-2 border-dashed border-gray-400 rounded-2xl text-gray-700 hover:bg-white/60 hover:border-gray-600 transition-all self-start group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Book a Meeting</span>
          </motion.a>
        </div>

        {/* Bottom Meta - Year + Arrow */}
        <motion.div 
          className="flex justify-between items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">year:</span>
            <p className="text-4xl md:text-5xl font-light text-gray-300">2025</p>
          </div>
          <ArrowDownRight className="w-8 h-8 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectHero;
