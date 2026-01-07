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
      {/* SECTION 0: FEATURE IMAGE WITH OVERLAY CONTENT */}
      {project.featureImage && (
        <section className="relative min-h-screen">
          {/* 배경 이미지 */}
          <div className="absolute inset-0">
            <img 
              src={project.featureImage} 
              alt={`${project.name} featured`}
              className="w-full h-full object-cover"
            />
            {/* 더 강한 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          </div>
          
          {/* 오버레이 콘텐츠 */}
          <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-24">
            
            {/* 프로젝트 로고 & 타이틀 */}
            <motion.div 
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {project.logo && (
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
                  <img 
                    src={project.logo} 
                    alt={`${project.name} logo`}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                  />
                </div>
              )}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                  {project.name}
                </h2>
                <p className="text-white/60 text-sm md:text-base mt-1">{project.category}</p>
              </div>
            </motion.div>
            
            {/* Client & Category 카드 */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-black/50 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/20 shadow-xl">
                <span className="text-[11px] md:text-xs text-cyan-400 uppercase tracking-wider font-medium block mb-2">Client</span>
                <span className="text-lg md:text-xl font-semibold text-white block">{project.client_name || project.name}</span>
              </div>
              <div className="bg-black/50 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/20 shadow-xl">
                <span className="text-[11px] md:text-xs text-purple-400 uppercase tracking-wider font-medium block mb-2">Category</span>
                <span className="text-lg md:text-xl font-semibold text-white block">{project.category}</span>
              </div>
              {project.duration && (
                <div className="bg-black/50 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/20 shadow-xl">
                  <span className="text-[11px] md:text-xs text-emerald-400 uppercase tracking-wider font-medium block mb-2">Duration</span>
                  <span className="text-lg md:text-xl font-semibold text-white block">{project.duration}</span>
                </div>
              )}
              {project.result && (
                <div className="bg-black/50 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/20 shadow-xl">
                  <span className="text-[11px] md:text-xs text-orange-400 uppercase tracking-wider font-medium block mb-2">Result</span>
                  <span className="text-lg md:text-xl font-semibold text-white block">{project.result}</span>
                </div>
              )}
            </motion.div>
            
            {/* Description */}
            <motion.div
              className="bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/15 shadow-2xl mb-8 md:mb-12 max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3 className="text-xs md:text-sm text-blue-400 uppercase tracking-wider font-medium mb-3">Overview</h3>
              <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                {project.description}
              </p>
            </motion.div>
            
            {/* Metrics Grid */}
            {metrics && metrics.length > 0 && (
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {metrics.map((metric, idx) => (
                  <div 
                    key={idx}
                    className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/20 shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-[10px] md:text-xs text-white/40 block mb-2 relative z-10">0{idx + 1}.</span>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white block mb-2 relative z-10">{metric.value}</span>
                    <span className="text-sm md:text-base text-cyan-300/80 block relative z-10">{metric.label}</span>
                  </div>
                ))}
              </motion.div>
            )}
            
            {/* Scope of Work & What We Did */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Scope of Work */}
              {project.services && project.services.length > 0 && (
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-cyan-500/30 shadow-xl">
                  <h3 className="text-xs md:text-sm text-cyan-400 uppercase tracking-wider font-medium mb-5">Scope of Work</h3>
                  <ul className="space-y-3">
                    {project.services.map((service, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span className="text-base md:text-lg text-white/90">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* What We Did */}
              {project.challenge && (
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-purple-500/30 shadow-xl">
                  <h3 className="text-xs md:text-sm text-purple-400 uppercase tracking-wider font-medium mb-5">What We Did</h3>
                  <p className="text-base md:text-lg text-white/90 leading-relaxed">{project.challenge}</p>
                </div>
              )}
            </motion.div>
            
          </div>
        </section>
      )}

      {/* SECTION 1: PROJECT META INFO - Only show if no featureImage */}
      {hasMetaInfo && !project.featureImage && (
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

      {/* SECTION 1: METRICS - Only show if no featureImage */}
      {displayMetrics && displayMetrics.length > 0 && !project.featureImage && (
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

      {/* SECTION 2: SCOPE OF WORK + Overview - Only show if no featureImage */}
      {!project.featureImage && (
      <section className="py-2 md:py-3">
        <div className="px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Top Left: Scope of Work */}
            <motion.div 
              className="bg-[#1A1A1A] rounded-xl p-5 md:p-6 h-full"
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

            {/* Bottom Left: What We Did */}
            {project.challenge && (
              <motion.div 
                className="bg-[#1A1A1A] rounded-xl p-5 md:p-6 h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">
                  What We Did
                </h3>
                <p className="text-base md:text-lg font-normal text-white/80 leading-relaxed">
                  {project.challenge}
                </p>
              </motion.div>
            )}

          </div>
          
          {/* CTA Section */}
          <motion.div 
            className="mt-3 md:mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div 
              className="rounded-xl overflow-hidden h-[360px] md:h-[500px] relative"
              style={{
                backgroundImage: gallery && gallery.length > 0 ? `url(${gallery[0].src})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 whitespace-nowrap">
                  Ready to achieve similar results in Korea?
                </h3>
                <a 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
                >
                  Start Your Project
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      )}


      {/* Bottom padding */}
      <div className="h-8 md:h-10" />
    </div>
  );
};

export default ProjectContentSection;