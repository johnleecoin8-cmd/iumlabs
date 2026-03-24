import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import KeyResultMarquee from "./KeyResultMarquee";

interface ProjectHeroProps {
  project: {
    name: string;
    description: string;
    category: string;
    glowColor: string;
    bgImage?: string;
    bgVideo?: string;
    services?: string[];
  };
  websiteUrl?: string;
}

const ProjectHero = ({ project, websiteUrl }: ProjectHeroProps) => {
  const posterImage = project.bgImage || "/images/hero-poster.jpg";

  const {
    videoRef,
    isVideoReady,
    hasVideoError,
    shouldDisableVideo,
    videoProps,
    posterProps,
    ShimmerOverlay,
  } = useVideoPlayer({
    src: project.bgVideo || "",
    poster: posterImage,
  });

  return (
    <div className="relative h-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background */}
      <img
        {...posterProps}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <ShimmerOverlay />
      {project.bgVideo && !shouldDisableVideo && !hasVideoError && (
        <video
          ref={videoRef}
          {...videoProps}
          className="absolute inset-0 w-full h-full object-cover z-10"
        >
          <source src={`${project.bgVideo}#t=0.001`} type="video/mp4" />
        </video>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/65 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-[1]" />

      {/* Top Navigation */}
      <div className="relative z-10 flex justify-between items-start px-6 lg:px-10 pt-24 sm:pt-28">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <span className="text-xs text-white/25 font-mono tracking-widest uppercase">
          {project.category}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="font-display text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.02] tracking-[-0.03em]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          >
            {project.name}
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/40 mt-5 sm:mt-6 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
          >
            {project.description}
          </motion.p>

          {websiteUrl && (
            <motion.a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-7 sm:mt-8 px-6 py-3 text-sm font-medium text-white/70 border border-white/15 rounded-full hover:border-white/30 hover:text-white transition-all duration-200"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
              Visit Project
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Bottom — Key Result Marquee */}
      <div className="relative z-10">
        <KeyResultMarquee />
      </div>
    </div>
  );
};

export default ProjectHero;
