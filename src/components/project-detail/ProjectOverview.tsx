import { motion } from "framer-motion";
import { Calendar, Layers, Users } from "lucide-react";
import { ProjectData } from "@/data/projectsData";

interface ProjectOverviewProps {
  project: ProjectData;
}

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  return (
    <section className="relative py-8 md:py-10 bg-[#0A0A0A]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left - About */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${project.glowColor}15`, border: `1px solid ${project.glowColor}30` }}
              >
                <img 
                  src={project.logo} 
                  alt={project.name} 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-xs uppercase tracking-widest text-white/40">About the Client</span>
            </div>
            
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              {project.description}
            </p>
          </motion.div>
          
          {/* Right - Meta Info */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div 
              className="p-6 rounded-xl border bg-gradient-to-br from-white/[0.03] to-transparent"
              style={{ borderColor: `${project.glowColor}15` }}
            >
              {/* Category */}
              <div className="flex items-start gap-4 pb-4 border-b border-white/5">
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${project.glowColor}10` }}
                >
                  <Layers className="w-4 h-4" style={{ color: project.glowColor }} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Category</p>
                  <p className="text-white font-medium">{project.category}</p>
                </div>
              </div>
              
              {/* Services */}
              <div className="flex items-start gap-4 py-4 border-b border-white/5">
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${project.glowColor}10` }}
                >
                  <Users className="w-4 h-4" style={{ color: project.glowColor }} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Services</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.shortServices?.map((service, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/70"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Key Result */}
              <div className="flex items-start gap-4 pt-4">
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${project.glowColor}10` }}
                >
                  <Calendar className="w-4 h-4" style={{ color: project.glowColor }} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Key Result</p>
                  <p className="font-semibold" style={{ color: project.glowColor }}>{project.result}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
