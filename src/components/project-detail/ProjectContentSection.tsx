import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import ProjectStrategy from "./ProjectStrategy";
import ProjectResults from "./ProjectResults";

interface ProjectContentSectionProps {
  project: ProjectData & { client_name?: string; duration?: string; featureImage?: string };
  metrics?: ProjectMetric[];
  gallery?: Array<{ src: string; title?: string; description?: string }>;
}

const ProjectContentSection = ({ project, metrics, gallery }: ProjectContentSectionProps) => {
  const displayMetrics = metrics || project.metrics;

  return (
    <div className="bg-[#0A0A0A]">
      {/* ===== SECTION 1: PROJECT INFO ===== */}
      <section className="py-12 md:py-20">
        <div className="px-4 md:px-8 lg:px-12">
          {/* Section Header */}
          <motion.div 
            className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-baseline gap-4 md:gap-6">
              <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Overview</h2>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block px-3 py-1 border border-white/10 rounded-full">
              Project Info
            </span>
          </motion.div>
          
          {/* Project Info - 2 Column Layout */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Left: Meta Info Panel */}
            <div className="bg-[#111111] rounded-xl border border-white/[0.06] overflow-hidden">
              <div className="p-4 md:p-5 border-b border-white/[0.06]">
                <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest block mb-1">Client</span>
                <span className="text-base md:text-lg font-semibold text-white block">{project.client_name || project.name}</span>
              </div>
              <div className="p-4 md:p-5 border-b border-white/[0.06]">
                <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest block mb-1">Category</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.glowColor || '#00CED1' }} />
                  <span className="text-base md:text-lg font-semibold text-white">{project.category}</span>
                </div>
              </div>
              <div className="p-4 md:p-5 border-b border-white/[0.06]">
                <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest block mb-1">Year</span>
                <span className="text-base md:text-lg font-semibold text-white block">2025</span>
              </div>
              {project.result && (
                <div className="p-4 md:p-5">
                  <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest block mb-1">Key Result</span>
                  <span className="text-base md:text-lg font-bold block" style={{ color: project.glowColor || '#00CED1' }}>
                    {project.result}
                  </span>
                </div>
              )}
            </div>
            
            {/* Right: About & Challenge */}
            <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
              <div className="bg-[#111111] rounded-xl p-5 md:p-6 border border-white/[0.06] flex-1">
                <h3 className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest mb-3 md:mb-4 font-medium">About the Project</h3>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">{project.description}</p>
              </div>
              {project.challenge && (
                <div className="bg-[#111111] rounded-xl p-5 md:p-6 border border-white/[0.06]">
                  <h3 className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest mb-3 md:mb-4 font-medium">The Challenge</h3>
                  <p className="text-base md:text-lg text-white/90 leading-relaxed">{project.challenge}</p>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Scope of Work & What We Did */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {project.services && project.services.length > 0 && (
              <div className="bg-[#111111] rounded-xl p-5 md:p-6 border border-white/[0.06]">
                <h3 className="text-xs md:text-sm text-white/40 uppercase tracking-wider mb-4 font-medium">Scope of Work</h3>
                <ul className="space-y-2">
                  {project.services.map((service, idx) => (
                    <li key={idx} className="text-sm md:text-base text-white font-medium">{service}</li>
                  ))}
                </ul>
              </div>
            )}
            {(project.whatWeDid || project.challenge) && (
              <div className="bg-[#111111] rounded-xl p-5 md:p-6 border border-white/[0.06]">
                <h3 className="text-xs md:text-sm text-white/40 uppercase tracking-wider mb-4 font-medium">What We Did</h3>
                <p className="text-sm md:text-base text-white leading-relaxed">{project.whatWeDid || project.challenge}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 2: RESULTS ===== */}
      {displayMetrics && displayMetrics.length > 0 && (
        <ProjectResults
          metrics={displayMetrics}
          glowColor={project.glowColor}
          timeline={project.duration}
        />
      )}

      {/* ===== SECTION 3: APPROACH ===== */}
      {project.strategy && project.strategy.length > 0 && (
        <ProjectStrategy strategy={project.strategy} glowColor={project.glowColor} />
      )}


      <div className="h-8 md:h-10" />
    </div>
  );
};

export default ProjectContentSection;