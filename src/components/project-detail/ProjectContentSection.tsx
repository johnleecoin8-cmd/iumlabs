import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";

interface MetricCardProps {
  metric: ProjectMetric;
  index: number;
  glowColor: string;
  isVisible: boolean;
}

const MetricCard = ({ metric, index, glowColor, isVisible }: MetricCardProps) => {
  const numericMatch = metric.value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = numericMatch ? numericMatch[1] : '';
  const numericValue = numericMatch ? parseFloat(numericMatch[2].replace(/,/g, '')) : 0;
  const suffix = numericMatch ? numericMatch[3] : metric.value;
  
  const displayValue = useCountUp({
    end: numericValue,
    duration: 2000,
    prefix,
    suffix,
    isVisible,
  });

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <span 
        className="block text-2xl md:text-3xl font-bold mb-1"
        style={{ color: glowColor }}
      >
        {numericMatch ? displayValue : metric.value}
      </span>
      <span className="text-xs text-white/50 uppercase tracking-wider">
        {metric.label}
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
    <section className="bg-black py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Key Result Banner */}
        {project.result && (
          <motion.div 
            className="mb-10 pb-8 border-b border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-2">
              Key Result
            </span>
            <p 
              className="text-2xl md:text-3xl font-medium"
              style={{ color: project.glowColor }}
            >
              {project.result}
            </p>
          </motion.div>
        )}

        {/* Strategy + Category Row (인라인) */}
        <motion.div 
          className="flex flex-wrap items-center justify-between gap-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Strategy Tags (왼쪽) */}
          <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide">
            {project.shortServices?.map((service, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 text-sm border rounded-full whitespace-nowrap"
                style={{ 
                  borderColor: project.glowColor,
                  color: project.glowColor 
                }}
              >
                {service}
              </span>
            ))}
          </div>
          
          {/* Category (오른쪽) */}
          <div className="text-sm shrink-0">
            <span className="text-white/40">Category</span>
            <span className="ml-2 text-white">{project.category}</span>
          </div>
        </motion.div>

        {/* Description Row (아래 별도 행) */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-base md:text-lg text-white/70 leading-relaxed">
            {project.challenge || project.description}
          </p>
        </motion.div>

        {/* Approach Section */}
        {project.strategy && project.strategy.length > 0 && (
          <motion.div 
            className="mb-10 pb-10 border-b border-white/10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
              Approach
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {project.strategy.slice(0, 4).map((step, i) => (
                <div key={i} className="flex gap-3">
                  <span 
                    className="text-sm font-semibold shrink-0"
                    style={{ color: project.glowColor }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Key Results Metrics */}
        {displayMetrics && displayMetrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
              Key Results
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {displayMetrics.map((metric, i) => (
                <MetricCard
                  key={i}
                  metric={metric}
                  index={i}
                  glowColor={project.glowColor}
                  isVisible={true}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectContentSection;
