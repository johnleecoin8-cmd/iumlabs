import { motion } from "framer-motion";
import { ProjectMetric } from "@/data/projectsData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

interface ProjectMetricsProps {
  metrics: ProjectMetric[];
  glowColor: string;
}

const MetricCard = ({ 
  metric, 
  index, 
  glowColor, 
  isVisible 
}: { 
  metric: ProjectMetric; 
  index: number; 
  glowColor: string;
  isVisible: boolean;
}) => {
  const numericMatch = metric.value.match(/[\d.]+/);
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const prefix = metric.value.match(/^[^\d]*/)?.[0] || '';
  const suffix = metric.value.match(/[^\d]*$/)?.[0] || '';

  const displayValue = useCountUp({
    end: numericValue,
    duration: 2000,
    delay: index * 150,
    prefix,
    suffix,
    isVisible,
  });

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="relative bg-[#EDEDED] rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[200px] transition-all duration-300 hover:bg-[#E5E5E5]">
        {/* Value */}
        <div>
          <p className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight mb-3">
            {displayValue}
          </p>
          <p 
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: glowColor }}
          >
            {metric.label}
          </p>
        </div>
        
        {/* Number Index */}
        <p className="text-xs text-gray-400 mt-6">
          {String(index + 1).padStart(2, '0')}.
        </p>
      </div>
    </motion.div>
  );
};

const ProjectMetrics = ({ metrics, glowColor }: ProjectMetricsProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  if (!metrics || metrics.length === 0) return null;

  return (
    <section ref={ref} className="relative py-12 md:py-16 bg-[#F5F5F5] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Section Header */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            Key Results
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              metric={metric} 
              index={index} 
              glowColor={glowColor}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectMetrics;
