import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProjectData } from "@/data/projectsData";
interface NextProjectProps {
  nextSlug: string;
  nextProject: ProjectData;
  currentGlowColor: string;
}
const NextProject = ({
  nextSlug,
  nextProject
}: NextProjectProps) => {
  return <section className="relative py-16 bg-black overflow-hidden border-t border-gray-800 md:py-[20px]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <Link to={`/projects/${nextSlug}`} onClick={() => window.scrollTo(0, 0)} className="block group">
          <motion.div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                Next Project
              </p>
              
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-white group-hover:text-gray-400 transition-colors">
                {nextProject.name}
              </h3>
              
              <p className="text-gray-500 mt-3">{nextProject.category}</p>
            </div>
            
            {/* Arrow */}
            <motion.div className="flex-shrink-0" whileHover={{
            x: 10
          }} transition={{
            type: "spring",
            stiffness: 300
          }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all group-hover:bg-white group-hover:border-white" style={{
              borderColor: nextProject.glowColor
            }}>
                <ArrowRight className="w-6 h-6 transition-colors group-hover:text-black" style={{
                color: nextProject.glowColor
              }} />
              </div>
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </section>;
};
export default NextProject;