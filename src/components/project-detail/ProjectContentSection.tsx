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
      {/* SECTION 1: KEY RESULTS */}
      {displayMetrics && displayMetrics.length > 0 && (
        <section className="py-16 md:py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.h3 
              className="text-xs text-white/40 uppercase tracking-[0.2em] mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Key Results
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {displayMetrics.map((metric, idx) => (
                <MetricCard key={idx} metric={metric} glowColor={glowColor} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* SECTION 2: CHALLENGE & SOLUTION */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left: Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs text-white/40 uppercase tracking-[0.2em]">
                Challenge
              </span>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mt-4">
                {project.challenge || "No challenge description available."}
              </p>
            </motion.div>
            
            {/* Right: Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-xs text-white/40 uppercase tracking-[0.2em]">
                Solution
              </span>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mt-4">
                {project.description || "No solution description available."}
              </p>
              
              {project.shortServices && project.shortServices.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.shortServices.map((service, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 text-xs rounded-full border border-white/20 text-white/70"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STRATEGY */}

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
