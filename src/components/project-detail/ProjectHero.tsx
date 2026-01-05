import { motion } from "framer-motion";
import { ProjectData } from "@/data/projectsData";
import { Trophy } from "lucide-react";

interface ProjectHeroProps {
  project: ProjectData;
}

const ProjectHero = ({ project }: ProjectHeroProps) => {
  return (
    <div className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          {/* Logo & Title */}
          <div className="flex items-start gap-6 mb-6">
            {project.logo && (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-3 flex-shrink-0">
                <img
                  src={project.logo}
                  alt={`${project.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3">
                {project.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">{project.category}</span>
                {project.shortServices?.slice(0, 3).map((service, index) => (
                  <span key={index} className="text-muted-foreground/50">
                    •
                    <span className="ml-2 text-sm text-muted-foreground">{service}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Background Image Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]"
        >
          {/* Background Image */}
          <img
            src={project.bgImage}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Key Achievement */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase tracking-widest text-primary font-medium">
                Key Achievement
              </span>
            </div>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white max-w-2xl">
              {project.result}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectHero;
