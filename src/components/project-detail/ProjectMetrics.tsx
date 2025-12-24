import { motion } from "framer-motion";
import { ProjectMetric } from "@/data/projectsData";

interface ProjectMetricsProps {
  metrics: ProjectMetric[];
  glowColor: string;
}

const ProjectMetrics = ({ metrics, glowColor }: ProjectMetricsProps) => {
  return (
    <section className="bg-[#0F0F0F] py-16 relative overflow-hidden">
      {/* Section Header - Homepage Style */}
      <div className="border-t border-white/10">
        <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Overview</h2>
          </div>
          <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Project Details</span>
        </div>
      </div>
      
      {/* Subtle Background Gradient */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)` }}
      />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10 pt-12">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index} 
              className="group relative p-6 md:p-8 rounded-2xl bg-[#111] overflow-hidden transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{ 
                border: `1px solid ${glowColor}20`,
              }}
            >
              {/* Always-visible color accent */}
              <div 
                className="absolute top-0 left-0 w-full h-1"
                style={{ background: `linear-gradient(to right, ${glowColor}, ${glowColor}40, transparent)` }}
              />
              
              {/* Corner Accent */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ background: `radial-gradient(circle at top right, ${glowColor} 0%, transparent 70%)` }}
              />
              
              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                style={{ backgroundColor: `${glowColor}10` }}
              />
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ boxShadow: `inset 0 0 60px ${glowColor}20, 0 0 40px ${glowColor}15` }}
              />
              
              <div className="relative">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tight" style={{ color: glowColor }}>
                  {metric.value}
                </p>
                <p className="text-white/50 text-xs md:text-sm font-medium uppercase tracking-wider">
                  {metric.label}
                </p>
              </div>
              <span 
                className="absolute bottom-4 right-4 text-xs font-mono opacity-30"
                style={{ color: glowColor }}
              >
                0{index + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectMetrics;
