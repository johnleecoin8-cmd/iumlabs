import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Import project logos
import bnbLogo from "@/assets/logos/bnb.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import mantraLogo from "@/assets/logos/mantra.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import triaLogo from "@/assets/logos/tria-official.png";

// Import campaign backgrounds
import bnbBg from "@/assets/campaigns/bnb-event.jpg";
import storyBg from "@/assets/campaigns/story-origin-summit.jpg";
import saharaBg from "@/assets/campaigns/sahara-ai.jpg";
import mantraBg from "@/assets/campaigns/mantra-party.jpg";

const latestProjects = [
  { 
    name: "BNB Chain", 
    logo: bnbLogo, 
    slug: "bnb-chain",
    bg: bnbBg,
    timeAgo: "2d ago",
    color: "#F0B90B"
  },
  { 
    name: "Story Protocol", 
    logo: storyProtocolLogo, 
    slug: "story-protocol",
    bg: storyBg,
    timeAgo: "5d ago",
    color: "#6366F1"
  },
  { 
    name: "Sahara AI", 
    logo: saharaAiLogo, 
    slug: "sahara-ai",
    bg: saharaBg,
    timeAgo: "1w ago",
    color: "#10B981"
  },
  { 
    name: "Mantra", 
    logo: mantraLogo, 
    slug: "mantra",
    bg: mantraBg,
    timeAgo: "2w ago",
    color: "#F97316"
  },
];

const LatestProjectsStrip = () => {
  return (
    <div className="w-full">
      {/* 4pillars-style Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase">
            Latest
          </span>
          <div className="hidden sm:block h-[1px] w-16 md:w-24 bg-gradient-to-r from-white/30 to-transparent" />
        </div>
        <Link 
          to="/projects" 
          className="group flex items-center gap-2 text-white/60 hover:text-white text-xs sm:text-sm font-medium transition-colors duration-300"
        >
          <span className="tracking-wide">View All</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Projects Grid - 4pillars COMMENTS style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {latestProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
          >
            <Link 
              to={`/projects/${project.slug}`}
              className="group block relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300"
            >
              {/* Background Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={project.bg} 
                  alt={project.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Logo */}
                <div className="absolute top-3 left-3">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center backdrop-blur-sm"
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    <img 
                      src={project.logo} 
                      alt={project.name}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                  </div>
                </div>

                {/* Time Badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] sm:text-xs text-white/60 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
                    {project.timeAgo}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <h3 className="text-white/90 text-sm sm:text-base font-medium group-hover:text-white transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-[10px] sm:text-xs text-white/40">Case Study</span>
                </div>
              </div>

              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${project.color}10 0%, transparent 70%)`
                }}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestProjectsStrip;
