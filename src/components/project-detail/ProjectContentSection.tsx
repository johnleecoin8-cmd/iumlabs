import { motion } from "framer-motion";
import { Building2, Clock, Layers, LucideIcon } from "lucide-react";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";

// Meta info item component with icon and accent color
interface MetaInfoItemProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accentColor: string;
  delay?: number;
}

const MetaInfoItem = ({ label, value, icon: Icon, accentColor, delay = 0 }: MetaInfoItemProps) => (
  <motion.div
    className="flex items-center gap-2 md:gap-3"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
  >
    <div className={`p-1.5 md:p-2 rounded-lg bg-white/5 ${accentColor}`}>
      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
    </div>
    <div>
      <span className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-wider block">
        {label}
      </span>
      <span className={`text-sm md:text-base font-medium ${accentColor}`}>
        {value}
      </span>
    </div>
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
  gallery?: Array<{ src: string; title?: string; description?: string }>;
}

const ProjectContentSection = ({ project, metrics, gallery }: ProjectContentSectionProps) => {
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
        <section className="py-3 md:py-4">
          <div className="px-4 md:px-8 lg:px-12">
            <motion.div
              className="bg-[#1A1A1A] rounded-xl p-3 md:p-4 flex gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Project Logo */}
              {project.logo && (
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-xl border border-white/10 self-center">
                  <img 
                    src={project.logo} 
                    alt={`${project.name} logo`}
                    className="w-10 h-10 md:w-14 md:h-14 object-contain"
                  />
                </div>
              )}
              
              {/* Meta Info & Description */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  <MetaInfoItem label="Client" value={clientName} icon={Building2} accentColor="text-blue-400" delay={0} />
                  {duration && <MetaInfoItem label="Duration" value={duration} icon={Clock} accentColor="text-purple-400" delay={0.1} />}
                  {category && <MetaInfoItem label="Category" value={category} icon={Layers} accentColor="text-emerald-400" delay={0.2} />}
                </div>
                
                {/* Project Description */}
                {project.description && (
                  <motion.p
                    className="text-sm md:text-base text-white/70 mt-4 pt-4 border-t border-white/10 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* SECTION 1: METRICS */}
      {displayMetrics && displayMetrics.length > 0 && (
        <section className="py-3 md:py-4">
          <div className="px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {displayMetrics.map((metric, idx) => (
                <MetricCard key={idx} metric={metric} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: SCOPE OF WORK + STRATEGY (Combined) + Overview */}
      <section className="py-2 md:py-3">
        <div className="px-4 md:px-8 lg:px-12">
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
          
          {/* Featured Image from Gallery */}
          {gallery && gallery.length > 0 && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-xl overflow-hidden h-[200px] md:h-[300px]">
                <img 
                  src={gallery[0].src}
                  alt={gallery[0].title || `${project.name} featured image`}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>


      {/* Bottom padding */}
      <div className="h-8 md:h-10" />
    </div>
  );
};

export default ProjectContentSection;