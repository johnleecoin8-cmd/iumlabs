import { motion } from "framer-motion";
import { TrendingUp, Target, Users, Clock } from "lucide-react";
import { ProjectMetric } from "@/data/projectsData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

interface ProjectMetricsProps {
  metrics: ProjectMetric[];
  glowColor: string;
}

const metricIcons = [TrendingUp, Target, Users, Clock];

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
  const Icon = metricIcons[index % metricIcons.length];

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
      <div 
        className="relative p-5 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] overflow-hidden h-full transition-all duration-300 group-hover:border-white/10"
      >
        {/* Hover Glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
          style={{ background: `radial-gradient(ellipse at 50% 50%, ${glowColor}12 0%, transparent 70%)` }}
        />
        
        {/* Icon */}
        <div 
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${glowColor}12`, border: `1px solid ${glowColor}20` }}
        >
          <Icon className="w-4 h-4" style={{ color: glowColor }} />
        </div>
        
        {/* Value */}
        <p 
          className="text-2xl md:text-3xl font-bold mb-1 tracking-tight"
          style={{ color: glowColor, textShadow: `0 0 30px ${glowColor}25` }}
        >
          {displayValue}
        </p>
        
        {/* Label */}
        <p className="text-xs text-white/50 font-medium uppercase tracking-wider">
          {metric.label}
        </p>
      </div>
    </motion.div>
  );
};

const ProjectMetrics = ({ metrics, glowColor }: ProjectMetricsProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-12 md:py-16 overflow-hidden bg-[#0A0A0A]">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 50%)` }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-mono tracking-wider" style={{ color: glowColor }}>
              04
            </span>
            <div className="h-px w-10" style={{ background: `linear-gradient(to right, ${glowColor}, transparent)` }} />
            <span className="text-xs text-white/40 uppercase tracking-widest">Results</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Key <span style={{ color: glowColor }}>Metrics</span>
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
