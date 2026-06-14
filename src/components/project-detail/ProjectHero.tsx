import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";

interface ProjectHeroProps {
  project: {
    name: string;
    description: string;
    category: string;
    glowColor: string;
    bgImage?: string;
    bgVideo?: string;
    services?: string[];
    result?: string;
    duration?: string;
  };
  websiteUrl?: string;
}

const ProjectHero = ({ project, websiteUrl }: ProjectHeroProps) => {
  const services = project.services || [];
  const hasVideo = !!project.bgVideo;

  const videoPoster = hasVideo
    ? `/images/posters/${project.bgVideo!.split('/').pop()?.replace(/\.(mp4|mov|webm)$/, '-poster.jpg')}`
    : null;
  const posterImage = videoPoster || project.bgImage || "/images/hero-poster.jpg";

  const {
    videoRef,
    shouldDisableVideo,
    hasVideoError,
    videoProps,
    posterProps,
    ShimmerOverlay,
  } = useVideoPlayer({
    src: project.bgVideo || '',
    poster: posterImage,
    autoPlay: hasVideo,
  });

  return (
    <header className="relative bg-[#0A0A0A] pt-28 sm:pt-32 md:pt-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Top row: back + year */}
        <div className="flex items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Work</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.25em] text-white/35">
            {project.duration || "2025"}
          </span>
        </div>

        {/* Eyebrow */}
        <motion.span
          className="mt-16 sm:mt-20 md:mt-24 block text-xs uppercase tracking-[0.3em] text-white/40"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {project.category} · Case Study
        </motion.span>

        {/* Title */}
        <motion.h1
          className="font-display mt-5 max-w-5xl text-[2.75rem] leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.25rem] font-light"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {project.name}
        </motion.h1>

        {/* Tags + description */}
        <motion.div
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <div className="flex flex-wrap gap-2.5">
            {services.slice(0, 4).map((service, i) => (
              <span
                key={i}
                className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/70"
              >
                {service}
              </span>
            ))}
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-white/55 md:text-right">
            {project.description}
          </p>
        </motion.div>

        {/* CTA */}
        {websiteUrl && (
          <motion.a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="uppercase tracking-wide">Explore Project</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        )}

        {/* Divider */}
        <div className="mt-12 border-t border-white/10" />

        {/* Contained media */}
        <motion.div
          className="relative mt-12 overflow-hidden rounded-2xl bg-[#111]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          <div className="aspect-[16/10] md:aspect-[16/9]">
            {hasVideo ? (
              <>
                <img
                  {...posterProps}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <ShimmerOverlay />
                {!shouldDisableVideo && !hasVideoError && (
                  <video
                    ref={videoRef}
                    {...videoProps}
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src={`${project.bgVideo}#t=0.001`} type="video/mp4" />
                  </video>
                )}
              </>
            ) : (
              <img
                src={project.bgImage || "/images/hero-poster.jpg"}
                alt={project.name}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                width={1920}
                height={1080}
              />
            )}
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default ProjectHero;
