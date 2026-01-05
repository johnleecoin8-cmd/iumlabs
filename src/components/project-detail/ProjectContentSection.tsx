import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";
import { 
  Megaphone, 
  Users, 
  Code, 
  Lightbulb, 
  Handshake, 
  BookOpen, 
  Target, 
  Rocket,
  type LucideIcon
} from "lucide-react";

// Map keywords to icons for intelligent icon selection
const getStepIcon = (step: string, index: number): LucideIcon => {
  const lowerStep = step.toLowerCase();
  
  if (lowerStep.includes('education') || lowerStep.includes('content') || lowerStep.includes('tutorial')) {
    return BookOpen;
  }
  if (lowerStep.includes('partner') || lowerStep.includes('collaboration')) {
    return Handshake;
  }
  if (lowerStep.includes('developer') || lowerStep.includes('community') || lowerStep.includes('devrel')) {
    return Code;
  }
  if (lowerStep.includes('event') || lowerStep.includes('meetup') || lowerStep.includes('conference')) {
    return Users;
  }
  if (lowerStep.includes('campaign') || lowerStep.includes('marketing') || lowerStep.includes('pr')) {
    return Megaphone;
  }
  if (lowerStep.includes('use case') || lowerStep.includes('demonstration') || lowerStep.includes('showcase')) {
    return Lightbulb;
  }
  if (lowerStep.includes('launch') || lowerStep.includes('deploy') || lowerStep.includes('release')) {
    return Rocket;
  }
  
  // Default icons based on position
  const defaultIcons = [Rocket, Handshake, Code, Target];
  return defaultIcons[index % defaultIcons.length];
};

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

        {/* Strategy + Description Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Strategy Column */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
              Strategy
            </h3>
            <div className="flex flex-wrap gap-2">
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
          </motion.div>

          {/* Description Column */}
          <motion.div 
            className="md:col-span-9"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6">
              {project.challenge || project.description}
            </p>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-white/40">Category</span>
                <span className="ml-2 text-white">{project.category}</span>
              </div>
            </div>
          </motion.div>
        </div>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {project.strategy.slice(0, 4).map((step, i) => {
                const IconComponent = getStepIcon(step, i);
                return (
                  <motion.div 
                    key={i} 
                    className="group relative p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {/* Icon with glow */}
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                      style={{ 
                        backgroundColor: `${project.glowColor}15`,
                      }}
                    >
                      <IconComponent 
                        size={20} 
                        style={{ color: project.glowColor }}
                      />
                    </div>
                    
                    {/* Step number */}
                    <span 
                      className="text-xs font-semibold mb-2 block"
                      style={{ color: project.glowColor }}
                    >
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    
                    {/* Text */}
                    <p className="text-sm text-white/60 leading-relaxed">
                      {step}
                    </p>
                  </motion.div>
                );
              })}
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
