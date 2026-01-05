import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";

interface MetricCardProps {
  metric: ProjectMetric;
  glowColor: string;
}

const MetricCard = ({ metric, glowColor }: MetricCardProps) => {
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
    <div className="text-center py-8 px-4 border border-white/10 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
      <span 
        className="text-3xl md:text-4xl font-bold block"
        style={{ color: glowColor }}
      >
        {numericMatch ? displayValue : metric.value}
      </span>
      <span className="block text-sm text-white/50 mt-3 uppercase tracking-wider">
        {metric.label}
      </span>
    </div>
  );
};

interface ProjectContentSectionProps {
  project: ProjectData;
  metrics?: ProjectMetric[];
}

const ProjectContentSection = ({ project, metrics }: ProjectContentSectionProps) => {
  const displayMetrics = metrics || project.metrics;
  const glowColor = project.glowColor || '#ffffff';

  return (
    <div className="bg-black">
      {/* SECTION 1: OVERVIEW */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
            {/* Left: Meta Info */}
            <motion.div 
              className="md:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="text-xs text-white/40 uppercase tracking-[0.2em]">Client</span>
                <p className="text-white text-lg mt-2">{project.name}</p>
              </div>
              
              {project.category && (
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-[0.2em]">Category</span>
                  <p className="text-white text-lg mt-2">{project.category}</p>
                </div>
              )}
              
              {project.shortServices && project.shortServices.length > 0 && (
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-[0.2em]">Services</span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.shortServices.map((service, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 text-xs rounded-full border border-white/20 text-white/70"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Right: Challenge */}
            <motion.div 
              className="md:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xs text-white/40 uppercase tracking-[0.2em] mb-6">
                The Challenge
              </h3>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                {project.challenge || project.description || "No challenge description available."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STRATEGY */}
      {project.strategy && project.strategy.length > 0 && (
        <section className="py-16 md:py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.h3 
              className="text-xs text-white/40 uppercase tracking-[0.2em] mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Approach
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {project.strategy.slice(0, 4).map((step, idx) => (
                <motion.div 
                  key={idx}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <span 
                    className="text-5xl md:text-6xl font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                    style={{ color: glowColor }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-white/70 mt-4 leading-relaxed text-sm md:text-base">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: IMPACT */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h3 
            className="text-xs text-white/40 uppercase tracking-[0.2em] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Impact
          </motion.h3>
          
          {/* Key Result Headline */}
          {project.result && (
            <motion.h4 
              className="text-3xl md:text-5xl font-bold mb-12 md:mb-16"
              style={{ color: glowColor }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {project.result}
            </motion.h4>
          )}
          
          {/* Metrics Grid */}
          {displayMetrics && displayMetrics.length > 0 && (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {displayMetrics.map((metric, idx) => (
                <MetricCard key={idx} metric={metric} glowColor={glowColor} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 4: GALLERY (Optional) */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 md:py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.h3 
              className="text-xs text-white/40 uppercase tracking-[0.2em] mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Campaign Highlights
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="aspect-video rounded-lg overflow-hidden bg-white/5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <img 
                    src={item.src} 
                    alt={item.title || `Gallery image ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectContentSection;
