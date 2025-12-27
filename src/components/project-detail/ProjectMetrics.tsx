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
  // Extract numeric value for count up animation
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
      className="group relative p-6 md:p-8 rounded-3xl bg-card/30 backdrop-blur-sm border border-border/30 overflow-hidden transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      style={{
        ['--glow-color' as string]: glowColor,
      }}
    >
      {/* Hover border effect */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ 
          boxShadow: `inset 0 0 0 1px ${glowColor}50`,
        }}
      />
      
      {/* Top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-50 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(to right, transparent, ${glowColor}, transparent)`
        }}
      />
      
      {/* Corner glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-30 transition-opacity"
        style={{
          background: `radial-gradient(circle at top right, ${glowColor} 0%, transparent 70%)`
        }}
      />
      
      {/* Hover background glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor}10 0%, transparent 70%)`
        }}
      />

      <div className="relative">
        <p 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tight transition-colors"
          style={{ color: glowColor }}
        >
          {displayValue}
        </p>
        <p className="text-muted-foreground text-xs md:text-sm font-medium uppercase tracking-wider">
          {metric.label}
        </p>
      </div>
      
      {/* Index number */}
      <span 
        className="absolute bottom-4 right-4 text-xs font-mono opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ color: glowColor }}
      >
        0{index + 1}
      </span>
    </motion.div>
  );
};

const ProjectMetrics = ({ metrics, glowColor }: ProjectMetricsProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
        {/* Dot pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        {/* Subtle color glow */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 60%)`
          }}
        />
      </div>

      {/* Top border gradient */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${glowColor}40, transparent)`
        }}
      />
      
      {/* Bottom border gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${glowColor}40, transparent)`
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className={`mb-12 scroll-animate ${isVisible ? 'is-visible' : ''}`}>
          <div className="flex items-center gap-4 mb-6">
            <span 
              className="font-mono text-sm tracking-wider"
              style={{ color: glowColor }}
            >
              01.
            </span>
            <div 
              className="h-px flex-1 max-w-[100px]"
              style={{ background: `linear-gradient(to right, ${glowColor}60, transparent)` }}
            />
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl md:text-4xl tracking-tight">
              <span className="font-serif italic text-muted-foreground">Project</span>{" "}
              <span className="font-sans font-bold text-foreground">Overview</span>
            </h2>
            <span 
              className="text-xs tracking-wider hidden sm:block px-3 py-1 rounded-full border"
              style={{ 
                borderColor: `${glowColor}30`,
                color: `${glowColor}90`
              }}
            >
              Key Metrics
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
