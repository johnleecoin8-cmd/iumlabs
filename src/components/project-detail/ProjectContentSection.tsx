import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";
import { AnimatedSection } from "@/components/AnimatedSection";
import { 
  Newspaper, Building2, Search, Users, Mic2, Target, Lightbulb, Rocket,
  TrendingUp, Eye, UserPlus, BarChart3, Globe, Zap, Award, Calendar,
  MessageSquare, Radio, Megaphone, PenTool, Shield
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Process images for Approach cards
import discoveryImg from "@/assets/process/discovery-research.jpg";
import strategyImg from "@/assets/process/strategy-planning.jpg";
import executionImg from "@/assets/process/execution-growth.jpg";
import scaleImg from "@/assets/process/scale-success.jpg";

// Service to icon mapping
const serviceIcons: Record<string, React.ElementType> = {
  "PR": Newspaper,
  "PR & Media": Newspaper,
  "Media": Newspaper,
  "Institutional Sales": Building2,
  "Institutional": Building2,
  "Research": Search,
  "Deep Research": Search,
  "Community": Users,
  "Community Management": Users,
  "Community Growth": Users,
  "KOL": Mic2,
  "KOL Marketing": Mic2,
  "Influencer": Mic2,
  "Influencer Marketing": Mic2,
  "Events": Calendar,
  "Offline Events": Calendar,
  "GTM": Target,
  "GTM Strategy": Target,
  "Go-To-Market": Target,
  "Branding": PenTool,
  "Website": Globe,
  "SEO": BarChart3,
  "Ads": Megaphone,
  "VASP": Shield,
  "Compliance": Shield,
  "Yap": Radio,
  "Yap Network": Radio,
};

// Metric label to icon mapping
const metricIcons: Record<string, React.ElementType> = {
  "Korean Signups": UserPlus,
  "Signups": UserPlus,
  "Social Reach": Eye,
  "Reach": Eye,
  "Impressions": Eye,
  "AMA Sessions": Mic2,
  "AMA": Mic2,
  "Trading Volume": TrendingUp,
  "Volume": TrendingUp,
  "Community": Users,
  "Community Growth": Users,
  "Followers": Users,
  "Engagement": MessageSquare,
  "Events": Calendar,
  "Articles": Newspaper,
  "Press": Newspaper,
};

// Approach step icons and images
const approachIcons = [Target, Lightbulb, Users, Rocket];
const approachImages = [discoveryImg, strategyImg, executionImg, scaleImg];

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

// Service Icon Card Component
const ServiceIconCard = ({ 
  service, 
  glowColor 
}: { 
  service: string; 
  glowColor: string;
}) => {
  const Icon = serviceIcons[service] || Zap;
  
  return (
    <div 
      className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1"
      style={{ 
        boxShadow: `0 0 0 1px ${glowColor}10`,
      }}
    >
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{ 
          background: `linear-gradient(135deg, ${glowColor}20, ${glowColor}05)`,
          border: `1px solid ${glowColor}30`
        }}
      >
        <Icon className="w-5 h-5" style={{ color: glowColor }} />
      </div>
      <span className="text-xs text-white/70 text-center font-medium">{service}</span>
    </div>
  );
};

// Project Info Card Component
const ProjectInfoCard = ({ 
  project, 
  glowColor 
}: { 
  project: ProjectData; 
  glowColor: string;
}) => (
  <div 
    className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
    style={{ boxShadow: `0 0 40px ${glowColor}08` }}
  >
    <div className="p-6 space-y-4">
      <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">Project Details</h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-white/40 text-sm">Client</span>
          <span className="text-white font-medium">{project.name}</span>
        </div>
        {project.category && (
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-white/40 text-sm">Category</span>
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ 
                background: `${glowColor}20`,
                color: glowColor 
              }}
            >
              {project.category}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-white/40 text-sm">Year</span>
          <span className="text-white font-medium">2024</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-white/40 text-sm">Services</span>
          <span className="text-white/70 text-sm">{project.services?.length || 0} Services</span>
        </div>
      </div>
    </div>
  </div>
);

// Approach Card Component (ServicesSection style)
const ApproachCard = ({ 
  step, 
  index, 
  glowColor 
}: { 
  step: string; 
  index: number; 
  glowColor: string;
}) => {
  const Icon = approachIcons[index] || Target;
  const image = approachImages[index] || approachImages[0];
  
  // Parse step: "Research: Korean RWA market analysis..." or just text
  const colonIndex = step.indexOf(':');
  const title = colonIndex > 0 ? step.substring(0, colonIndex).trim() : `Step ${index + 1}`;
  const description = colonIndex > 0 ? step.substring(colonIndex + 1).trim() : step;
  
  return (
    <motion.div 
      className="group relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
      
      {/* Glow Effect on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle at center, ${glowColor}40, transparent 70%)` 
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
        {/* Step Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm transition-all duration-300 group-hover:scale-110"
          style={{ 
            background: `linear-gradient(135deg, ${glowColor}30, ${glowColor}10)`,
            border: `1px solid ${glowColor}40`
          }}
        >
          <Icon className="w-6 h-6" style={{ color: glowColor }} />
        </div>
        
        {/* Number Badge */}
        <span 
          className="text-xs font-mono tracking-widest mb-2"
          style={{ color: glowColor }}
        >
          0{index + 1}
        </span>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed line-clamp-3 group-hover:text-white/80 transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Metric Item Component (vertical stack style)
const MetricItem = ({ 
  metric, 
  glowColor,
  isLast,
  index
}: { 
  metric: ProjectMetric; 
  glowColor: string;
  isLast: boolean;
  index: number;
}) => {
  const Icon = metricIcons[metric.label] || Award;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Parse numeric value for animation
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
      ref={ref}
      className={`group flex items-center gap-4 p-4 md:p-5 hover:bg-white/[0.03] transition-all duration-300 cursor-default ${!isLast ? 'border-b border-white/5' : ''}`}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Icon */}
      <div 
        className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{ 
          background: `linear-gradient(135deg, ${glowColor}15, transparent)`,
          border: `1px solid ${glowColor}20`
        }}
      >
        <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: glowColor }} />
      </div>
      
      {/* Value & Label */}
      <div className="flex-1 min-w-0">
        <div 
          className="text-2xl md:text-3xl font-bold transition-all duration-300 truncate"
          style={{ 
            color: glowColor,
            textShadow: isVisible ? `0 0 30px ${glowColor}40` : 'none'
          }}
        >
          {numericMatch ? displayValue : metric.value}
        </div>
        <div className="text-white/50 text-sm truncate">{metric.label}</div>
      </div>
    </motion.div>
  );
};

interface ProjectContentSectionProps {
  project: ProjectData;
  metrics?: ProjectMetric[];
}

const ProjectContentSection = ({ project, metrics }: ProjectContentSectionProps) => {
  const displayMetrics = metrics || project.metrics;
  const glowColor = project.glowColor || "#8B5CF6";
  const services = project.shortServices || project.services || [];
  
  return (
    <>
      {/* Section 01: Overview */}
      <section className="bg-surface-odd border-t border-white/10">
        <SectionHeader number="01" title="Overview" tag="Strategy" />
        
        <div className="relative px-4 md:px-10 py-12 md:py-20">
          {/* Watermark Number */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] md:text-[280px] font-bold pointer-events-none select-none"
            style={{ color: `${glowColor}03` }}
          >
            01
          </div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-8">
              <AnimatedSection delay={100}>
                <span className="text-xs text-white/40 uppercase tracking-widest">About the Project</span>
                <h3 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 leading-tight"
                  style={{ 
                    background: `linear-gradient(135deg, ${glowColor}, ${glowColor}80, white)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {project.challenge || `Korean Market Entry for ${project.name}`}
                </h3>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <p className="text-white/60 text-lg leading-relaxed">
                  {project.description}
                </p>
              </AnimatedSection>
              
              {/* Services Grid */}
              {services.length > 0 && (
                <AnimatedSection delay={300}>
                  <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Services Provided</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {services.map((service, index) => (
                      <ServiceIconCard 
                        key={index} 
                        service={service} 
                        glowColor={glowColor} 
                      />
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>
            
            {/* Right Column */}
            <div className="lg:col-span-5">
              <AnimatedSection delay={400}>
                <ProjectInfoCard project={project} glowColor={glowColor} />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Approach */}
      {project.strategy && project.strategy.length > 0 && (
        <section className="bg-surface-even border-t border-white/10">
          <SectionHeader number="02" title="Approach" tag="How We Did It" />
          
          <div className="px-4 md:px-10 py-12 md:py-20">
            <AnimatedSection delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {project.strategy.slice(0, 4).map((step, index) => (
                  <ApproachCard 
                    key={index} 
                    step={step} 
                    index={index} 
                    glowColor={glowColor}
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Section 03: Results */}
      {(project.result || (displayMetrics && displayMetrics.length > 0)) && (
        <section className="bg-surface-odd border-t border-white/10">
          <SectionHeader number="03" title="Results" tag="Impact" />
          
          <div className="relative px-4 md:px-10 py-12 md:py-20">
            {/* Watermark Number */}
            <div 
              className="absolute top-1/2 right-10 -translate-y-1/2 text-[150px] md:text-[220px] font-bold pointer-events-none select-none hidden lg:block"
              style={{ color: `${glowColor}03` }}
            >
              03
            </div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column: Key Result Highlight */}
              <div className="lg:col-span-7 space-y-8">
                <AnimatedSection delay={100}>
                  <span className="text-xs text-white/40 uppercase tracking-widest">Impact</span>
                  <h3 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 leading-tight"
                    style={{ 
                      background: `linear-gradient(135deg, white, ${glowColor}80, ${glowColor})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {project.result || "Successful Korean Market Expansion"}
                  </h3>
                </AnimatedSection>
                
                <AnimatedSection delay={200}>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: TrendingUp, label: 'Growth' },
                      { icon: Users, label: 'Community' },
                      { icon: Globe, label: 'Reach' }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                      >
                        <item.icon className="w-4 h-4" style={{ color: glowColor }} />
                        <span className="text-white/60 text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
              
              {/* Right Column: Metrics Stack */}
              {displayMetrics && displayMetrics.length > 0 && (
                <div className="lg:col-span-5">
                  <AnimatedSection delay={300}>
                    <div 
                      className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
                      style={{ boxShadow: `0 0 60px ${glowColor}08` }}
                    >
                      {displayMetrics.map((metric, index) => (
                        <MetricItem 
                          key={index}
                          metric={metric}
                          glowColor={glowColor}
                          isLast={index === displayMetrics.length - 1}
                          index={index}
                        />
                      ))}
                    </div>
                  </AnimatedSection>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProjectContentSection;
