import { motion } from "framer-motion";
import { ProjectMetric } from "@/data/projectsData";
import AnimatedSection from "@/components/AnimatedSection";

interface ProjectMetricsProps {
  metrics: ProjectMetric[];
  glowColor: string;
}

const ProjectMetrics = ({ metrics }: ProjectMetricsProps) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-muted-foreground">01</span>
              <div className="w-8 h-px bg-border" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Key Results</h2>
            </div>
            <span className="hidden md:inline-flex px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground border border-white/10 rounded-full">
              Performance
            </span>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ProjectMetrics;
