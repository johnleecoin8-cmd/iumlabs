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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Card Container */}
      <div 
        className="relative p-5 md:p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm border border-white/[0.06] overflow-hidden h-full transition-all duration-500 group-hover:border-white/10"
      >
        {/* Hover Glow Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ 
            background: `radial-gradient(ellipse at 50% 50%, ${glowColor}15 0%, transparent 70%)`,
          }}
        />
        
        {/* Top Line Accent */}
        <div 
          className="absolute top-0 left-6 right-6 h-px opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(to right, transparent, ${glowColor}80, transparent)` }}
        />
        
        {/* Icon */}
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ 
            backgroundColor: `${glowColor}15`,
            border: `1px solid ${glowColor}25`
          }}
        >
          <Icon className="w-4 h-4" style={{ color: glowColor }} />
        </div>
        
        {/* Value */}
        <p 
          className="text-3xl md:text-4xl font-bold mb-2 tracking-tight transition-all duration-300"
          style={{ 
            color: glowColor,
            textShadow: `0 0 40px ${glowColor}30`
          }}
        >
          {displayValue}
        </p>
        
        {/* Label */}
        <p className="text-xs text-white/50 font-medium uppercase tracking-widest">
          {metric.label}
        </p>
        
        {/* Index Number */}
        <span 
          className="absolute top-5 right-5 text-xs font-mono opacity-30 group-hover:opacity-60 transition-opacity"
          style={{ color: glowColor }}
        >
          0{index + 1}
        </span>
        
        {/* Corner Decoration */}
        <div 
          className="absolute bottom-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity"
          style={{
            background: `radial-gradient(circle at bottom right, ${glowColor} 0%, transparent 70%)`
          }}
        />
      </div>
    </motion.div>
  );
};

const ProjectMetrics = ({ metrics, glowColor }: ProjectMetricsProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden bg-[#0A0A0A]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle radial gradient */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 50%)`
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-3">
            <span 
              className="text-sm font-mono tracking-wider"
              style={{ color: glowColor }}
            >
              01
            </span>
            <div 
              className="h-px w-12"
              style={{ background: `linear-gradient(to right, ${glowColor}, transparent)` }}
            />
            <span className="text-xs text-white/40 uppercase tracking-widest">Project Overview</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Key <span style={{ color: glowColor }}>Results</span>
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
