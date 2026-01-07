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
  project: ProjectData & { client_name?: string; duration?: string; featureImage?: string };
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
      {/* SECTION 0: PROJECT INFO - No background image */}
      <section className="py-12 md:py-16">
        <div className="px-4 md:px-8 lg:px-12">
          
          {/* Project Info Section - 2 Column Layout */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Left: Meta Info Panel */}
            <div className="bg-[#1A1A1A] rounded-xl border border-white/10 overflow-hidden">
              {/* Client */}
              <div className="p-4 md:p-5 border-b border-white/10">
                <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest block mb-1">Client</span>
                <span className="text-base md:text-lg font-semibold text-white block">{project.client_name || project.name}</span>
              </div>
              
              {/* Category */}
              <div className="p-4 md:p-5 border-b border-white/10">
                <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest block mb-1">Category</span>
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.glowColor || '#00CED1' }}
                  />
                  <span className="text-base md:text-lg font-semibold text-white">{project.category}</span>
                </div>
              </div>
              
              {/* Year */}
              <div className="p-4 md:p-5 border-b border-white/10">
                <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest block mb-1">Year</span>
                <span className="text-base md:text-lg font-semibold text-white block">2025</span>
              </div>
              
              {/* Result Highlight */}
              {project.result && (
                <div className="p-4 md:p-5">
                  <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest block mb-1">Key Result</span>
                  <span 
                    className="text-base md:text-lg font-bold block"
                    style={{ color: project.glowColor || '#00CED1' }}
                  >
                    {project.result}
                  </span>
                </div>
              )}
            </div>
            
            {/* Right: About & Challenge Panel */}
            <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
              {/* About the Project */}
              <div className="bg-[#1A1A1A] rounded-xl p-5 md:p-6 border border-white/10 flex-1">
                <h3 className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest mb-3 md:mb-4 font-medium">About the Project</h3>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              {/* The Challenge */}
              {project.challenge && (
                <div className="bg-[#1A1A1A] rounded-xl p-5 md:p-6 border border-white/10">
                  <h3 className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest mb-3 md:mb-4 font-medium">The Challenge</h3>
                  <p className="text-base md:text-lg text-white/90 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Metrics Grid */}
          {displayMetrics && displayMetrics.length > 0 && (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {displayMetrics.map((metric, idx) => (
                <MetricCard key={idx} metric={metric} index={idx} />
              ))}
            </motion.div>
          )}
          
          {/* Scope of Work & What We Did */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Scope of Work */}
            {project.services && project.services.length > 0 && (
              <div className="bg-[#1A1A1A] rounded-xl p-5 md:p-6 border border-white/10">
                <h3 className="text-xs md:text-sm text-white/50 uppercase tracking-wider mb-4 font-medium">Scope of Work</h3>
                <ul className="space-y-2">
                  {project.services.map((service, idx) => (
                    <li key={idx} className="text-sm md:text-base text-white font-medium">{service}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* What We Did */}
            {project.challenge && (
              <div className="bg-[#1A1A1A] rounded-xl p-5 md:p-6 border border-white/10">
                <h3 className="text-xs md:text-sm text-white/50 uppercase tracking-wider mb-4 font-medium">What We Did</h3>
                <p className="text-sm md:text-base text-white leading-relaxed">{project.challenge}</p>
              </div>
            )}
          </motion.div>
          
        </div>
      </section>

      {/* NEW CTA SECTION: "You want to be a next project?" */}
      <section className="py-8 md:py-12">
        <div className="px-4 md:px-8 lg:px-12">
          <motion.div 
            className="rounded-2xl overflow-hidden h-[400px] md:h-[500px] relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Image with Hover Zoom */}
            <div 
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${gallery?.[0]?.src || project.bgImage || project.featureImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-black/60" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
              <motion.h3 
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                You want to be a next project?
              </motion.h3>
              <motion.a 
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom padding */}
      <div className="h-8 md:h-10" />
    </div>
  );
};

export default ProjectContentSection;