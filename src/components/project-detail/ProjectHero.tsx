import { ArrowLeft, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import KeyResultMarquee from "./KeyResultMarquee";

interface ProjectHeroProps {
  project: {
    name: string;
    description: string;
    category: string;
    glowColor: string;
    bgImage?: string;
    services?: string[];
  };
}

const ProjectHero = ({ project }: ProjectHeroProps) => {
  return (
    <>
      <section className="relative min-h-screen mx-4 mt-4 rounded-3xl bg-black overflow-hidden flex flex-col">
        {/* 배경 이미지 */}
        {project.bgImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.bgImage})` }}
          />
        )}
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/60" />
        {/* 상단 네비게이션 - z-index로 오버레이 위에 */}
        <div className="relative z-10 flex justify-between items-start p-8 md:p-12">
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          
          <div className="text-right">
            <span className="text-xs text-white/40 uppercase tracking-wider block">year</span>
            <span className="text-lg text-white">2025</span>
          </div>
        </div>
        
        {/* 메인 콘텐츠 - flex-grow로 중앙 배치 */}
        <div className="relative z-10 flex-grow flex flex-col justify-center max-w-6xl px-8 md:px-12 pb-12">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {project.name}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/70 mt-6 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {project.description}
          </motion.p>
          
          <motion.a 
            href="https://calendly.com/iumlabs/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 px-6 py-4 border-2 border-dashed border-white/30 rounded-2xl text-white hover:border-white/60 hover:bg-white/5 transition-all w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Calendar className="w-5 h-5" />
            <span>Book a Meeting</span>
          </motion.a>
        </div>
      </section>
      
      {/* Key Result Marquee */}
      <KeyResultMarquee />
    </>
  );
};

export default ProjectHero;
