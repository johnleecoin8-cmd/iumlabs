import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProjectData } from "@/data/projectsData";
import AnimatedSection from "@/components/AnimatedSection";

interface NextProjectProps {
  nextSlug: string;
  nextProject: ProjectData;
  currentGlowColor: string;
}

const NextProject = ({ nextSlug, nextProject }: NextProjectProps) => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-muted-foreground">03</span>
              <div className="w-8 h-px bg-border" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Continue Exploring</h2>
            </div>
            <span className="hidden md:inline-flex px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground border border-white/10 rounded-full">
              Next
            </span>
          </div>

          {/* Next Project Card */}
          <Link 
            to={`/projects/${nextSlug}`} 
            onClick={() => window.scrollTo(0, 0)}
            className="block group"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={nextProject.bgImage}
                  alt={nextProject.name}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-12 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">
                    Next Project
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {nextProject.name}
                  </h3>
                  <p className="text-muted-foreground max-w-md">{nextProject.result}</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                  <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </motion.div>
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default NextProject;
