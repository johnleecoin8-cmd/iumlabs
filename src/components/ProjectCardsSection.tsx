import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

import bnbBg from "@/assets/campaigns/bnb-event.jpg";
import kucoinBg from "@/assets/campaigns/kucoin-oldschool.jpg";
import saharaAiBg from "@/assets/campaigns/sahara-ai.jpg";
import mantraBg from "@/assets/campaigns/mantra-party.jpg";
import megaethBg from "@/assets/campaigns/megaeth-launch.jpg";
import bybitBg from "@/assets/campaigns/bybit-event.jpg";
import fogoBg from "@/assets/campaigns/fogo-fest.avif";
import synfuturesBg from "@/assets/campaigns/synfutures-billboard.jpg";
import spacecoinBg from "@/assets/projects/spacecoin-bg.png";

const projects = [
  { name: "BNB Chain", slug: "bnb-chain", category: "Infrastructure", result: "2M+ Impressions", bgImage: bnbBg },
  { name: "KuCoin", slug: "kucoin", category: "Exchange", result: "$550M+ TVL", bgImage: kucoinBg },
  { name: "Sahara AI", slug: "sahara-ai", category: "AI", result: "400+ Event Attendees", bgImage: saharaAiBg },
  { name: "Mantra", slug: "mantra", category: "RWA", result: "$50M+ Pipeline", bgImage: mantraBg },
  { name: "MegaETH", slug: "megaeth", category: "Layer 2", result: "2M+ Impressions", bgImage: megaethBg },
  { name: "Bybit", slug: "bybit", category: "Exchange", result: "#2 Exchange Traffic", bgImage: bybitBg },
  { name: "FOGO", slug: "fogo", category: "Infrastructure", result: "250+ Attendees", bgImage: fogoBg },
  { name: "SynFutures", slug: "synfutures", category: "DeFi", result: "5M+ OOH Impressions", bgImage: synfuturesBg },
  { name: "Spacecoin", slug: "spacecoin", category: "Infrastructure", result: "200K+ Impressions", bgImage: spacecoinBg },
];

const ProjectCard = ({ project, index }: { project: typeof projects[number]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '30px',
    triggerOnce: true
  });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-600 ease-out will-change-transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
    >
      <Link
        to={`/projects/${project.slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className="group block"
      >
        <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-[#1a1a1a]">
          <img
            src={project.bgImage}
            alt={project.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="pt-4 pb-2 space-y-2">
          <span className="text-[11px] text-white/40 uppercase tracking-[0.15em] font-medium">{project.category}</span>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-white/80 transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-white/50 text-sm font-medium leading-snug">{project.result}</p>
        </div>
      </Link>
    </div>
  );
};

const ProjectCardsSection = () => {
  return (
    <div className="px-5 sm:px-6 lg:px-10 py-12 sm:py-16">
      <div className="flex items-end justify-between mb-10 sm:mb-12">
        <div>
          <span className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-medium block mb-3">Portfolio</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Case Studies</h2>
        </div>
        <Link
          to="/projects"
          className="hidden sm:inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <div className="sm:hidden mt-8 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          View All Projects <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCardsSection;
