import { ArrowLeft, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProjectData } from "@/data/projectsData";
import KeyResultMarquee from "./KeyResultMarquee";

interface ProjectHeroProps {
  project: ProjectData;
}

const ProjectHero = ({ project }: ProjectHeroProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <section className="relative min-h-[50vh] overflow-hidden mx-4 mt-4 rounded-3xl bg-white">
        {/* Content Container */}
        <div className="relative z-10 h-full min-h-[50vh] flex flex-col p-8 md:p-12 lg:p-16">
          {/* Top Row: Back Button & Year */}
          <div className="flex justify-between items-start">
            {/* Back Button */}
            <motion.button 
              onClick={() => navigate("/projects")} 
              className="group flex items-center gap-2 text-black/60 hover:text-black transition-colors" 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4 }}
            >
              <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:border-black/40 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Back</span>
            </motion.button>
            
            {/* Year Display */}
            <motion.div 
              className="text-right"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4 }}
            >
              <span className="text-xs text-black/40 uppercase tracking-wider block">year:</span>
              <span className="text-lg text-black font-medium">2025</span>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center max-w-5xl mt-8">
            {/* Project Name */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-light text-black tracking-tight mb-8" 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {project.name}
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-black/70 max-w-2xl leading-relaxed mb-10" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.description}
            </motion.p>
            
            {/* CTA Button */}
            <motion.a 
              href="https://calendly.com/iumlabs/30min" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 px-6 py-4 border-2 border-dashed border-black/30 rounded-2xl text-black hover:bg-black/5 hover:border-black/50 transition-all self-start group" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Book a Meeting</span>
            </motion.a>
          </div>
        </div>
      </section>
      
      {/* Key Result Marquee */}
      <KeyResultMarquee />
    </>
  );
};

export default ProjectHero;
