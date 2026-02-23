import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";
import ProjectStrategy from "./ProjectStrategy";
import ProjectGalleryGrid from "./ProjectGalleryGrid";

interface MetricCardProps {
  metric: ProjectMetric;
  index: number;
  glowColor: string;
}

const MetricCard = ({ metric, index, glowColor }: MetricCardProps) => {
  const numericMatch = metric.value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = numericMatch ? numericMatch[1] : '';
  const numericValue = numericMatch ? parseFloat(numericMatch[2].replace(/,/g, '')) : 0;
  const suffix = numericMatch ? numericMatch[3] : metric.value;
  
  const displayValue = useCountUp({
    end: numericValue,
    duration: 2000,
    prefix,
    suffix,
    isVisible: true
  });

  return (
    <motion.div 
      className="bg-[#111111] rounded-xl p-4 md:p-5 relative min-h-[100px] flex flex-col justify-between border border-white/[0.06]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div>
        <span className="text-2xl md:text-3xl font-normal text-white block">
          {numericMatch ? displayValue : metric.value}
        </span>
        <span 
          className="text-xs block mt-1.5"
          style={{ color: glowColor }}
        >
          {metric.label}
        </span>
      </div>
      <span className="text-[10px] text-white/20 mt-2 font-mono">
        {String(index + 1).padStart(2, '0')}.
      </span>
    </motion.div>
  );
};

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
          
          {/* Metrics Grid */}
          {displayMetrics && displayMetrics.length > 0 && (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {displayMetrics.map((metric, idx) => (
                <MetricCard key={idx} metric={metric} index={idx} glowColor={project.glowColor} />
              ))}
            </motion.div>
          )}
          
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

      {/* ===== SECTION 2: APPROACH ===== */}
      {project.strategy && project.strategy.length > 0 && (
        <ProjectStrategy strategy={project.strategy} glowColor={project.glowColor} />
      )}

      {/* ===== SECTION 3: GALLERY ===== */}
      {gallery && gallery.length > 0 && (
        <section className="py-16 md:py-24 bg-[#0A0A0A]">
          <div className="px-4 md:px-8 lg:px-12">
            {/* Section Header */}
            <motion.div 
              className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-10 md:mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-baseline gap-4 md:gap-6">
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest">03</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Gallery</h2>
              </div>
              <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block px-3 py-1 border border-white/10 rounded-full">
                {gallery.length} Images
              </span>
            </motion.div>

            <ProjectGalleryGrid gallery={gallery.map(g => ({ src: g.src, title: g.title || '', description: g.description || '' }))} glowColor={project.glowColor} />
          </div>
        </section>
      )}

      {/* ===== CTA SECTION ===== */}
      <section className="py-8 md:py-12">
        <div className="px-4 md:px-8 lg:px-12">
          <motion.div 
            className="rounded-2xl overflow-hidden h-[400px] md:h-[500px] relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${gallery?.[0]?.src || project.bgImage || project.featureImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-black/60" />
            
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
              <motion.p
                className="text-sm md:text-base text-white/60 uppercase tracking-widest mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Connect with Korea
              </motion.p>
              <motion.h3 
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to Bridge Your Project?
              </motion.h3>
              <motion.p
                className="text-base md:text-lg text-white/70 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Let Ium Labs be your gateway to the Korean Web3 ecosystem.
              </motion.p>
              <motion.a 
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Start Your Journey
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-8 md:h-10" />
    </div>
  );
};

export default ProjectContentSection;