import { motion } from "framer-motion";
import { ProjectData } from "@/data/projectsData";

interface ProjectOverviewProps {
  project: ProjectData;
}

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  return (
    <section className="relative py-12 md:py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Strategy/Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Strategy</h3>
            <ul className="space-y-3">
              {project.shortServices?.map((service, i) => (
                <li 
                  key={i} 
                  className="text-xl md:text-2xl text-gray-700 font-light"
                >
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Right - Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
              {project.challenge || project.description}
            </p>
            
            {/* Details Grid */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Category</p>
                  <p className="text-gray-800 font-medium">{project.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Result</p>
                  <p className="font-medium" style={{ color: project.glowColor }}>{project.result}</p>
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
