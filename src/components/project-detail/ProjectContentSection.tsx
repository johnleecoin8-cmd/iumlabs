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
      {/* SECTION 1: PROJECT OVERVIEW */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left: Meta Info */}
            <motion.div 
              className="md:col-span-4 space-y-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="text-xs text-white/40 uppercase tracking-[0.2em] block mb-2">
                  Client
                </span>
                <span className="text-lg text-white">{project.name}</span>
              </div>
              
              {project.category && (
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-[0.2em] block mb-2">
                    Category
                  </span>
                  <span className="text-lg text-white">{project.category}</span>
                </div>
              )}
              
              {project.shortServices && project.shortServices.length > 0 && (
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-[0.2em] block mb-3">
                    Services
                  </span>
                  <div className="flex flex-wrap gap-2">
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
            
            {/* Right: Description */}
            <motion.div 
              className="md:col-span-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                {project.description || "No project description available."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE CHALLENGE */}
      {project.challenge && (
        <section className="py-16 md:py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs text-white/40 uppercase tracking-[0.2em] block mb-6">
                Challenge
              </span>
              <p className="text-2xl md:text-3xl text-white/90 leading-relaxed max-w-4xl">
                {project.challenge}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* SECTION 3: OUR STRATEGY */}
      {project.strategy && project.strategy.length > 0 && (
        <section className="py-16 md:py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.h3 
              className="text-xs text-white/40 uppercase tracking-[0.2em] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Approach
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {project.strategy.slice(0, 4).map((step, idx) => (
                <motion.div
                  key={idx}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span 
                    className="text-sm font-semibold mb-3 block transition-opacity group-hover:opacity-100"
                    style={{ color: glowColor, opacity: 0.7 }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: RESULTS */}
      {(project.result || (displayMetrics && displayMetrics.length > 0)) && (
        <section className="py-16 md:py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.h3 
              className="text-xs text-white/40 uppercase tracking-[0.2em] mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Results
            </motion.h3>
            
            {project.result && (
              <motion.p 
                className="text-2xl md:text-4xl font-light text-white mb-12 max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                "{project.result}"
              </motion.p>
            )}
            
            {displayMetrics && displayMetrics.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {displayMetrics.map((metric, idx) => (
                  <MetricCard key={idx} metric={metric} glowColor={glowColor} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 5: CAMPAIGN GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.h3 
              className="text-xs text-white/40 uppercase tracking-[0.2em] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Campaign Highlights
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="group relative overflow-hidden rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <img 
                    src={item.src} 
                    alt={item.title || `Campaign image ${idx + 1}`}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-sm text-white/90">{item.title}</span>
                    </div>
                  )}
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
