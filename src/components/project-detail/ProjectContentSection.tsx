import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";
interface MetricCardProps {
  metric: ProjectMetric;
  index: number;
  glowColor: string;
  isVisible: boolean;
}
const MetricCard = ({
  metric,
  index,
  glowColor,
  isVisible
}: MetricCardProps) => {
  const numericMatch = metric.value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = numericMatch ? numericMatch[1] : '';
  const numericValue = numericMatch ? parseFloat(numericMatch[2].replace(/,/g, '')) : 0;
  const suffix = numericMatch ? numericMatch[3] : metric.value;
  const displayValue = useCountUp({
    end: numericValue,
    duration: 2000,
    prefix,
    suffix,
    isVisible
  });
  return <motion.div className="text-center" initial={{
    opacity: 0,
    y: 10
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    delay: index * 0.05
  }}>
      <span className="block text-2xl md:text-3xl font-bold mb-1" style={{
      color: glowColor
    }}>
        {numericMatch ? displayValue : metric.value}
      </span>
      <span className="text-xs text-white/50 uppercase tracking-wider">
        {metric.label}
      </span>
    </motion.div>;
};
interface ProjectContentSectionProps {
  project: ProjectData;
  metrics?: ProjectMetric[];
}
const ProjectContentSection = ({
  project,
  metrics
}: ProjectContentSectionProps) => {
  const displayMetrics = metrics || project.metrics;
  return <section className="bg-black py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* 1. THE CHALLENGE */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
            The Challenge
          </h3>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mb-4">
            {project.challenge || project.description}
          </p>
          <div className="text-sm">
            <span className="text-white/40">Category</span>
            <span className="ml-2 text-white">{project.category}</span>
          </div>
        </motion.div>

        {/* 2. OUR APPROACH */}
        {project.strategy && project.strategy.length > 0 && (
          <motion.div 
            className="mb-16 pb-10 border-b border-white/10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
              Our Approach
            </h3>
            {/* 서비스 태그 */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.shortServices?.map((service, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 text-sm border rounded-full" 
                  style={{
                    borderColor: project.glowColor,
                    color: project.glowColor
                  }}
                >
                  {service}
                </span>
              ))}
            </div>
            {/* 전략 단계 */}
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

        {/* 3. THE RESULTS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
            The Results
          </h3>
          {/* Key Result 헤드라인 */}
          {project.result && (
            <h4 
              className="text-2xl md:text-3xl font-bold mb-8" 
              style={{ color: project.glowColor }}
            >
              {project.result}
            </h4>
          )}
          {/* Metrics 카드 */}
          {displayMetrics && displayMetrics.length > 0 && (
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
          )}
        </motion.div>
      </div>
    </section>;
};
export default ProjectContentSection;