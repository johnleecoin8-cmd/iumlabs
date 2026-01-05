import { ArrowLeft, Play, ExternalLink } from "lucide-react";
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
    <section ref={containerRef} className="relative min-h-[60vh] overflow-hidden flex items-end">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-[-20%] bg-cover bg-center"
        style={{
          backgroundImage: `url(${project.bgImage})`,
          filter: 'brightness(0.25) saturate(1.3)',
          y: backgroundY,
          scale
        }}
      />
      
      {/* Cinematic Letterbox Effect */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
      
      {/* Project Color Gradient Wash */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(135deg, ${project.glowColor}30 0%, transparent 40%, transparent 60%, ${project.glowColor}20 100%)`
        }}
      />
      
      {/* Animated Gradient Orbs */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-[800px] h-[800px] rounded-full blur-[200px] opacity-30"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: project.glowColor }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: project.glowColor }}
      />
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Fine Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${project.glowColor}40 1px, transparent 1px),
            linear-gradient(90deg, ${project.glowColor}40 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Content */}
      <motion.div 
        className="relative z-20 container mx-auto max-w-7xl px-6 md:px-12 pb-10"
        style={{ opacity }}
      >
        {/* Back Button - Minimal */}
        <motion.button 
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 mb-10 text-white/50 hover:text-white transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -4 }}
        >
          <div 
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors"
            style={{ 
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm tracking-wider uppercase font-medium">All Projects</span>
        </motion.button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left - Title & Info */}
          <div className="lg:col-span-8">
            {/* Category & Services Tags */}
            <motion.div 
              className="flex flex-wrap items-center gap-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div 
                className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: project.glowColor,
                  color: '#000'
                }}
              >
                {project.category}
              </div>
              {project.shortServices?.slice(0, 3).map((service, i) => (
                <span 
                  key={i}
                  className="px-2.5 py-1 rounded-full text-[10px] tracking-wider border border-white/20 text-white/60"
                >
                  {service}
                </span>
              ))}
            </motion.div>
            
            {/* Logo & Project Name */}
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-sm border"
                  style={{ 
                    backgroundColor: `${project.glowColor}15`,
                    borderColor: `${project.glowColor}30`
                  }}
                >
                  <img 
                    src={project.logo} 
                    alt={project.name} 
                    className="w-8 h-8 object-contain"
                    style={{ filter: `drop-shadow(0 0 15px ${project.glowColor}80)` }}
                  />
                </div>
                {/* Glow Ring */}
                <div 
                  className="absolute -inset-1 rounded-xl blur-lg -z-10 opacity-40"
                  style={{ backgroundColor: project.glowColor }}
                />
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ textShadow: `0 0 80px ${project.glowColor}30` }}
              >
                {project.name}
              </motion.h1>
            </div>
            
            {/* Description */}
            <motion.p 
              className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {project.description}
            </motion.p>
          </div>
          
          {/* Right - Key Result Card */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div 
              className="relative p-5 rounded-xl border backdrop-blur-sm overflow-hidden"
              style={{ 
                backgroundColor: `${project.glowColor}08`,
                borderColor: `${project.glowColor}25`
              }}
            >
              {/* Top Accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(to right, ${project.glowColor}, transparent)` }}
              />
              
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Key Achievement</p>
              <p 
                className="text-xl md:text-2xl font-bold leading-tight"
                style={{ color: project.glowColor }}
              >
                {project.result}
              </p>
              
              {/* Animated pulse indicator */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: project.glowColor }}
                />
                <span className="text-xs text-white/30 uppercase tracking-wider">Live</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Bottom Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.div 
          className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5"
          animate={{ borderColor: [`${project.glowColor}30`, `${project.glowColor}60`, `${project.glowColor}30`] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-0.5 h-1.5 rounded-full"
            style={{ backgroundColor: project.glowColor }}
            animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectHero;
