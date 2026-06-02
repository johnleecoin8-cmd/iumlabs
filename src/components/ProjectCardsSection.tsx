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
import triaBg from "@/assets/campaigns/tria-launch.jpg";
import zkpassBg from "@/assets/campaigns/zkpass-verifiable-nights.jpg";
import openledgerBg from "@/assets/campaigns/openledger-hero-official.jpg";

import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import mantraLogo from "@/assets/logos/mantra.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import bybitLogo from "@/assets/logos/bybit.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import spacecoinLogo from "@/assets/logos/spacecoin.png";
import triaLogo from "@/assets/logos/tria-official.png";
import zkpassLogo from "@/assets/logos/zkpass.png";
import peaqLogo from "@/assets/logos/peaq.png";

const projects = [
  { name: "BNB Chain", slug: "bnb-chain", category: "Infrastructure", result: "2M+", resultLabel: "Impressions", bgImage: bnbBg, logo: bnbLogo },
  { name: "KuCoin", slug: "kucoin", category: "Exchange", result: "$550M+", resultLabel: "TVL", bgImage: kucoinBg, logo: kucoinLogo },
  { name: "Sahara AI", slug: "sahara-ai", category: "AI", result: "400+", resultLabel: "Attendees", bgImage: saharaAiBg, logo: saharaAiLogo },
  { name: "Mantra", slug: "mantra", category: "RWA", result: "$50M+", resultLabel: "Pipeline", bgImage: mantraBg, logo: mantraLogo },
  { name: "MegaETH", slug: "megaeth", category: "Layer 2", result: "2M+", resultLabel: "Reach", bgImage: megaethBg, logo: megaethLogo },
  { name: "Bybit", slug: "bybit", category: "Exchange", result: "#2", resultLabel: "Korea Traffic", bgImage: bybitBg, logo: bybitLogo },
  { name: "FOGO", slug: "fogo", category: "Layer 1", result: "250+", resultLabel: "Attendees", bgImage: fogoBg, logo: fogoLogo },
  { name: "SynFutures", slug: "synfutures", category: "DeFi", result: "5M+", resultLabel: "OOH", bgImage: synfuturesBg, logo: synfuturesLogo },
  { name: "Spacecoin", slug: "spacecoin", category: "DePIN", result: "200K+", resultLabel: "Impressions", bgImage: spacecoinBg, logo: spacecoinLogo },
  { name: "Tria", slug: "tria", category: "Wallet", result: "450K+", resultLabel: "Impressions", bgImage: triaBg, logo: triaLogo },
  { name: "zkPass", slug: "zkpass", category: "Privacy", result: "The Verifiable", resultLabel: "Nights", bgImage: zkpassBg, logo: zkpassLogo },
  { name: "OpenLedger", slug: "openledger", category: "AI", result: "30M+", resultLabel: "Reach", bgImage: openledgerBg, logo: peaqLogo },
];

const ProjectCard = ({ project, index }: { project: typeof projects[number]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.08, rootMargin: '40px', triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${(index % 6) * 100}ms` }}
    >
      <Link
        to={`/projects/${project.slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className="group relative block w-full aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-white/[0.06] hover:ring-white/[0.12] transition-all duration-500"
      >
        <img
          src={project.bgImage}
          alt={project.name}
          loading={index < 6 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <img
            src={project.logo}
            alt=""
            className="h-5 sm:h-6 w-auto brightness-0 invert opacity-60 group-hover:opacity-90 transition-opacity duration-500"
          />
          <span className="text-[9px] text-white/35 uppercase tracking-[0.2em] font-medium group-hover:text-white/55 transition-colors duration-500">
            {project.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 leading-tight">
            {project.name}
          </h3>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent leading-none">
              {project.result}
            </span>
            <span className="text-[11px] sm:text-xs text-white/35 font-medium tracking-wide">{project.resultLabel}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="w-10 h-[1px] bg-gradient-to-r from-white/25 to-transparent" />
            <div className="flex items-center gap-2 text-white/0 group-hover:text-white/60 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <span className="text-[11px] font-medium tracking-wide">View Case</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProjectCardsSection = () => {
  return (
    <div className="px-5 sm:px-6 lg:px-10 py-14 sm:py-20">
      <div className="flex items-end justify-between mb-12 sm:mb-16">
        <div>
          <span className="text-[10px] sm:text-[11px] text-white/25 uppercase tracking-[0.25em] font-medium block mb-3">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">Case Studies</h2>
        </div>
        <Link
          to="/projects"
          className="hidden sm:inline-flex items-center gap-2.5 text-[13px] text-white/35 hover:text-white transition-colors font-medium group"
        >
          <span>View All</span>
          <div className="w-7 h-7 rounded-full border border-white/15 group-hover:border-white/40 group-hover:bg-white/[0.05] flex items-center justify-center transition-all duration-300">
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
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
