import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";
import { AnimatedSection } from "@/components/AnimatedSection";

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
      className="text-center p-6 md:p-8 bg-white/5 border border-white/10 rounded-lg"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <span 
        className="block text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
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

interface SectionHeaderProps {
  number: string;
  title: string;
  tag: string;
}

const SectionHeader = ({ number, title, tag }: SectionHeaderProps) => (
  <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
    <div className="flex items-baseline gap-6 md:gap-10">
      <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">{number}</span>
      <h2 className="text-lg md:text-xl font-medium text-white">{title}</h2>
    </div>
    <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">{tag}</span>
  </div>
);

interface ProjectContentSectionProps {
  project: ProjectData;
  metrics?: ProjectMetric[];
}

const ProjectContentSection = ({ project, metrics }: ProjectContentSectionProps) => {
  const displayMetrics = metrics || project.metrics;
  
  return (
    <>
      {/* Section 01: Overview */}
      <section className="bg-surface-odd border-t border-white/10">
        <SectionHeader number="01" title="Overview" tag="Strategy" />
        <AnimatedSection delay={100}>
          <div className="px-4 md:px-10 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left: Strategy Tags */}
              <div className="lg:col-span-4">
                <h3 className="text-xs text-white/40 uppercase tracking-[0.2em] mb-6">Services Provided</h3>
                {project.shortServices && project.shortServices.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.shortServices.map((service, i) => (
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
                ) : project.services && project.services.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, i) => (
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
                ) : null}
              </div>

              {/* Right: Description */}
              <div className="lg:col-span-8">
                <h3 className="text-xs text-white/40 uppercase tracking-[0.2em] mb-6">About the Project</h3>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  {project.challenge || project.description}
                </p>
                <div className="flex gap-6 text-sm mt-6">
                  <div>
                    <span className="text-white/40">Category</span>
                    <span className="ml-2 text-white">{project.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Section 02: Approach */}
      {project.strategy && project.strategy.length > 0 && (
        <section className="bg-surface-even border-t border-white/10">
          <SectionHeader number="02" title="Approach" tag="How We Did It" />
          <AnimatedSection delay={200}>
            <div className="px-4 md:px-10 py-12 md:py-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {project.strategy.slice(0, 4).map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                  >
                    <span 
                      className="text-[10px] font-mono tracking-widest block mb-4"
                      style={{ color: project.glowColor }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>
      )}

      {/* Section 03: Results */}
      {(project.result || (displayMetrics && displayMetrics.length > 0)) && (
        <section className="bg-surface-odd border-t border-white/10">
          <SectionHeader number="03" title="Results" tag="Impact" />
          <AnimatedSection delay={300}>
            <div className="px-4 md:px-10 py-12 md:py-16">
              {/* Key Result Banner */}
              {project.result && (
                <div className="mb-12">
                  <h3 className="text-xs text-white/40 uppercase tracking-[0.2em] mb-6">Key Result</h3>
                  <p 
                    className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight"
                    style={{ color: project.glowColor }}
                  >
                    {project.result}
                  </p>
                </div>
              )}

              {/* Metrics Grid */}
              {displayMetrics && displayMetrics.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
            </div>
          </AnimatedSection>
        </section>
      )}
    </>
  );
};

export default ProjectContentSection;
