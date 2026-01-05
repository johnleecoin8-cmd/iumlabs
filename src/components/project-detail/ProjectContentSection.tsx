import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";

interface MetricCardProps {
  metric: ProjectMetric;
  index: number;
}

const MetricCard = ({ metric, index }: MetricCardProps) => {
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
      className="bg-[#1A1A1A] rounded-2xl p-6 md:p-8 relative min-h-[140px] flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div>
        {/* Large Number */}
        <span className="text-3xl md:text-4xl lg:text-5xl font-normal text-white block">
          {numericMatch ? displayValue : metric.value}
        </span>
        
        {/* Label in Blue */}
        <span className="text-sm text-blue-400 block mt-2">
          {metric.label}
        </span>
      </div>
      
      {/* Index Number - Bottom Left */}
      <span className="text-xs text-white/30 mt-4">
        {String(index + 1).padStart(2, '0')}.
      </span>
    </motion.div>
  );
};

interface ProjectContentSectionProps {
  project: ProjectData;
  metrics?: ProjectMetric[];
}

const ProjectContentSection = ({ project, metrics }: ProjectContentSectionProps) => {
  const displayMetrics = metrics || project.metrics;

  return (
    <div className="bg-[#0A0A0A]">
      {/* SECTION 1: METRICS */}
      {displayMetrics && displayMetrics.length > 0 && (
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {displayMetrics.map((metric, idx) => (
                <MetricCard key={idx} metric={metric} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: SCOPE OF WORK (Services + Overview) */}
      <section className="py-3 md:py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Left: Scope of Work (Services) */}
            <motion.div 
              className="bg-[#1A1A1A] rounded-2xl p-8 md:p-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-sm text-white/40 uppercase tracking-wider mb-6">
                Scope of Work
              </h3>
              <ul className="space-y-3">
                {project.services.map((service, idx) => (
                  <li key={idx} className="text-xl md:text-2xl font-normal text-white">
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Right: Overview */}
            <motion.div 
              className="bg-[#1A1A1A] rounded-2xl p-8 md:p-10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-sm text-white/40 uppercase tracking-wider mb-6">
                Overview
              </h3>
              <p className="text-xl md:text-2xl font-normal text-white/80 leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE DID (Challenge) */}
      {project.challenge && (
        <section className="py-3 md:py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Left: Empty or Strategy heading */}
              <motion.div 
                className="bg-[#1A1A1A] rounded-2xl p-8 md:p-10 flex items-end"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl md:text-4xl font-light text-white/20">
                  Strategy
                </h3>
              </motion.div>
              
              {/* Right: What We Did */}
              <motion.div 
                className="bg-[#1A1A1A] rounded-2xl p-8 md:p-10"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-sm text-white/40 uppercase tracking-wider mb-6">
                  What We Did
                </h3>
                <p className="text-xl md:text-2xl font-normal text-white/80 leading-relaxed">
                  {project.challenge}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: CAMPAIGN GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h3 
              className="text-sm text-white/40 uppercase tracking-wider mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Campaign Highlights
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {project.gallery.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl bg-[#1A1A1A]"
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-sm text-white">{item.title}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom padding */}
      <div className="h-12 md:h-16" />
    </div>
  );
};

export default ProjectContentSection;