import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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

import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import mantraLogo from "@/assets/logos/mantra.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import bybitLogo from "@/assets/logos/bybit.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import spacecoinLogo from "@/assets/logos/spacecoin.png";

const projects = [
  { name: "BNB Chain", slug: "bnb-chain", category: "Infrastructure", result: "2M+", resultLabel: "Impressions", bgImage: bnbBg, logo: bnbLogo },
  { name: "KuCoin", slug: "kucoin", category: "Exchange", result: "$550M+", resultLabel: "TVL Achieved", bgImage: kucoinBg, logo: kucoinLogo },
  { name: "Sahara AI", slug: "sahara-ai", category: "AI", result: "400+", resultLabel: "Event Attendees", bgImage: saharaAiBg, logo: saharaAiLogo },
  { name: "Mantra", slug: "mantra", category: "RWA", result: "$50M+", resultLabel: "Pipeline", bgImage: mantraBg, logo: mantraLogo },
  { name: "MegaETH", slug: "megaeth", category: "Layer 2", result: "2M+", resultLabel: "Pre-Mainnet Reach", bgImage: megaethBg, logo: megaethLogo },
  { name: "Bybit", slug: "bybit", category: "Exchange", result: "#2", resultLabel: "Korea Exchange Traffic", bgImage: bybitBg, logo: bybitLogo },
  { name: "FOGO", slug: "fogo", category: "Layer 1", result: "250+", resultLabel: "Launch Attendees", bgImage: fogoBg, logo: fogoLogo },
  { name: "SynFutures", slug: "synfutures", category: "DeFi", result: "5M+", resultLabel: "OOH Impressions", bgImage: synfuturesBg, logo: synfuturesLogo },
  { name: "Spacecoin", slug: "spacecoin", category: "DePIN", result: "200K+", resultLabel: "Impressions", bgImage: spacecoinBg, logo: spacecoinLogo },
];

const FeaturedCard = ({ project }: { project: typeof projects[number] }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <Link
        to={`/projects/${project.slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className="group relative block w-full aspect-[2.2/1] sm:aspect-[2.5/1] rounded-2xl overflow-hidden"
      >
        <img
          src={project.bgImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-4">
              <span className="inline-block text-[10px] sm:text-[11px] text-white/50 uppercase tracking-[0.2em] font-medium px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm bg-white/[0.04]">
                {project.category}
              </span>
              <div className="flex items-center gap-4">
                <img src={project.logo} alt="" className="h-7 sm:h-9 w-auto brightness-0 invert opacity-90" />
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{project.name}</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">{project.result}</span>
                <span className="text-sm sm:text-base text-white/50 font-medium">{project.resultLabel}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors text-sm font-medium shrink-0">
              <span>View Case Study</span>
              <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-white/50 group-hover:bg-white/10 flex items-center justify-center transition-all">
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const CompactCard = ({ project, index }: { project: typeof projects[number]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '30px', triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-600 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
    >
      <Link
        to={`/projects/${project.slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className="group relative block w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden"
      >
        <img
          src={project.bgImage}
          alt={project.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/95 transition-all duration-500" />

        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm bg-white/[0.05]">
            {project.category}
          </span>
          <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm bg-white/[0.05]">
            <ArrowUpRight className="w-3 h-3 text-white/70" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 space-y-3">
          <img src={project.logo} alt="" className="h-5 sm:h-6 w-auto brightness-0 invert opacity-80" />
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{project.name}</h3>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-white">{project.result}</span>
            <span className="text-[11px] sm:text-xs text-white/40 font-medium">{project.resultLabel}</span>
          </div>
          <div className="w-8 h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
        </div>
      </Link>
    </div>
  );
};

const ProjectCardsSection = () => {
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <div className="px-5 sm:px-6 lg:px-10 py-14 sm:py-20">
      <div className="flex items-end justify-between mb-12 sm:mb-16">
        <div>
          <span className="text-[10px] sm:text-[11px] text-white/25 uppercase tracking-[0.25em] font-medium block mb-3">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">Case Studies</h2>
        </div>
        <Link
          to="/projects"
          className="hidden sm:inline-flex items-center gap-2.5 text-[13px] text-white/40 hover:text-white transition-colors font-medium group"
        >
          <span>View All</span>
          <div className="w-7 h-7 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center transition-all">
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <FeaturedCard project={featured} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {rest.map((project, index) => (
            <CompactCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>

      <div className="sm:hidden mt-10 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors font-medium"
        >
          View All Projects
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCardsSection;
