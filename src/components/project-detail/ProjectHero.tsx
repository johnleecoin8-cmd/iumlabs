import { ArrowLeft, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProjectData } from "@/data/projectsData";
import KeyResultMarquee from "./KeyResultMarquee";

interface ProjectHeroProps {
  project: ProjectData;
}
const ProjectHero = ({
  project
}: ProjectHeroProps) => {
  const navigate = useNavigate();
  return <section className="relative min-h-[50vh] overflow-hidden mx-4 mt-4 rounded-3xl">
      {/* Background Image from Gallery */}
      {project.gallery && project.gallery.length > 0 ? <>
          <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${project.gallery[0].src})`
      }} />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/70" />
        </> : <div className="absolute inset-0 bg-black" />}
      
      {/* Multi-color gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{
      background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, ${project.glowColor}40 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 30% 70%, #FF6B6B25 0%, transparent 45%),
            radial-gradient(ellipse 50% 40% at 80% 80%, #4ECDC420 0%, transparent 40%),
            radial-gradient(ellipse 40% 30% at 20% 30%, #FFE66D20 0%, transparent 35%)
          `,
      filter: 'blur(80px)'
    }} />
      
      {/* Content Container */}
      <div className="relative z-10 h-full min-h-[50vh] flex flex-col justify-between p-8 md:p-12 lg:p-16">
        {/* Back Button - Top */}
        <motion.button onClick={() => navigate("/projects")} className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors self-start" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.4
      }}>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors bg-white/5 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        {/* Main Content - Center/Bottom */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl">
          {/* Project Logo */}
          {project.logo && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.05
        }} className="mb-8">
              
            </motion.div>}

          {/* Category Tag */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium" style={{
            backgroundColor: `${project.glowColor}20`,
            color: project.glowColor
          }}>
              {project.category}
            </span>
            {project.result && <>
                <span className="text-white/30">•</span>
                <span className="text-white/60 text-sm">{project.result}</span>
              </>}
          </motion.div>
          
          {/* Project Name - Large */}
          <motion.h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white tracking-tight mb-8" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            {project.name}
          </motion.h1>
          
          {/* Description */}
          <motion.p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }}>
            {project.description}
          </motion.p>
          
          {/* CTA Button */}
          <motion.a href="https://calendly.com/iumlabs/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-4 border-2 border-dashed border-white/30 rounded-2xl text-white hover:bg-white/10 hover:border-white/50 transition-all self-start group" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }}>
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Book a Meeting</span>
          </motion.a>
        </div>

      </div>
      
      {/* Key Result Marquee Bar */}
      <KeyResultMarquee result={project.result || ""} glowColor={project.glowColor || "#00FF88"} />
    </section>;
};
export default ProjectHero;