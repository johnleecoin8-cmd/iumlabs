import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";

// Meta info item component
interface MetaInfoItemProps {
  label: string;
  value: string;
  delay?: number;
}

const MetaInfoItem = ({ label, value, delay = 0 }: MetaInfoItemProps) => (
  <motion.div
    className="text-center md:text-left"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
  >
    <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider block mb-1">
      {label}
    </span>
    <span className="text-sm md:text-base text-white font-normal">
      {value}
    </span>
  </motion.div>
);

interface MetricCardProps {
  metric: ProjectMetric;
  index: number;
}

const MetricCard = ({ metric, index }: MetricCardProps) => {
  const numericMatch = metric.value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = numericMatch ? numericMatch[1] : '';
  const numericValue = numericMatch ? parseFloat(numericMatch[2].replace(/,/g, '')) : 0;
  const suffix = numericMatch ? numericMatch[3] : metric.value;
  
  const displayValue = useCountUp({
    end: numericValue,
    duration: 2000,
    prefix,
    suffix,
    isVisible: true
  });

  return (
    <motion.div 
      className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 relative min-h-[100px] flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div>
        {/* Large Number */}
        <span className="text-2xl md:text-3xl font-normal text-white block">
          {numericMatch ? displayValue : metric.value}
        </span>
        
        {/* Label in Blue */}
        <span className="text-xs text-blue-400 block mt-1.5">
          {metric.label}
        </span>
      </div>
      
      {/* Index Number - Bottom Left */}
      <span className="text-[10px] text-white/30 mt-2">
        {String(index + 1).padStart(2, '0')}.
      </span>
    </motion.div>
  );
};

interface ProjectContentSectionProps {
  project: ProjectData & { client_name?: string; duration?: string };
  metrics?: ProjectMetric[];
}

const ProjectContentSection = ({ project, metrics }: ProjectContentSectionProps) => {
  const displayMetrics = metrics || project.metrics;
  
  // Check if any meta info is available
  const clientName = project.client_name || project.name;
  const duration = project.duration;
  const category = project.category;
  const hasMetaInfo = clientName || duration || category;

  return (
    <div className="bg-[#0A0A0A]">
      {/* SECTION 0: PROJECT META INFO */}
      {hasMetaInfo && (
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="bg-[#1A1A1A] rounded-xl p-4 md:p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <MetaInfoItem label="Client" value={clientName} delay={0} />
                {duration && <MetaInfoItem label="Duration" value={duration} delay={0.1} />}
                {!duration && <div />}
                {category && <MetaInfoItem label="Category" value={category} delay={0.2} />}
                {!category && <div />}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* SECTION 1: METRICS */}
      {displayMetrics && displayMetrics.length > 0 && (
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {displayMetrics.map((metric, idx) => (
                <MetricCard key={idx} metric={metric} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: SCOPE OF WORK + STRATEGY (Combined) + Overview */}
      <section className="py-3 md:py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Left: Scope of Work + Strategy Combined */}
            <motion.div 
              className="bg-[#1A1A1A] rounded-xl p-5 md:p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xs text-white/40 uppercase tracking-wider mb-4">
                Scope of Work
              </h3>
              <ul className="space-y-2">
                {project.services.map((service, idx) => (
                  <li key={idx} className="text-base md:text-lg font-normal text-white">
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Right: Overview + What We Did */}
            <motion.div 
              className="bg-[#1A1A1A] rounded-xl p-5 md:p-6 flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-5">
                <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">
                  Overview
                </h3>
                <p className="text-base md:text-lg font-normal text-white/80 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              {project.challenge && (
                <div className="pt-5 border-t border-white/10">
                  <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">
                    What We Did
                  </h3>
                  <p className="text-base md:text-lg font-normal text-white/80 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>


      {/* Bottom padding */}
      <div className="h-12 md:h-16" />
    </div>
  );
};

export default ProjectContentSection;