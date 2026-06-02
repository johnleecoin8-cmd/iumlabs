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
import multipliBg from "@/assets/campaigns/multipli-hero.jpg";
import talusThumb from "@/assets/campaigns/talus-thumbnail.png";

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
import multipliLogo from "@/assets/logos/multipli.png";
import talusLogo from "@/assets/logos/talus.png";

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
  { name: "Multipli", slug: "multipli", category: "RWA", result: "90K+", resultLabel: "Investors", bgImage: multipliBg, logo: multipliLogo },
  { name: "Talus", slug: "talus", category: "AI", result: "AI Agents", resultLabel: "On+Offchain", bgImage: talusThumb, logo: talusLogo },
];

const ProjectCard = ({ project, index }: { project: typeof projects[number]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.08, rootMargin: '40px', triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      <Link
        to={`/projects/${project.slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className="group relative block w-full aspect-[3/4] rounded-xl overflow-hidden"
      >
        <img
          src={project.bgImage}
          alt={project.name}
          loading={index < 8 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.06]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <div className="absolute top-3.5 right-3.5">
          <span className="text-[8px] sm:text-[9px] text-white/30 uppercase tracking-[0.15em] font-medium">
            {project.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <div className="flex items-center gap-2.5 mb-2.5">
            <img
              src={project.logo}
              alt=""
              className="h-4 sm:h-[18px] w-auto brightness-0 invert opacity-50 group-hover:opacity-80 transition-opacity duration-500"
            />
            <div className="h-3 w-px bg-white/10" />
            <h3 className="text-[13px] sm:text-[15px] font-semibold text-white/90 tracking-tight leading-none">
              {project.name}
            </h3>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-lg sm:text-xl font-black text-white leading-none tracking-tight">
              {project.result}
            </span>
            <span className="text-[10px] text-white/30 font-medium">{project.resultLabel}</span>
          </div>

          <div className="overflow-hidden h-0 group-hover:h-6 transition-all duration-500 ease-out">
            <div className="flex items-center gap-1.5 pt-2.5 text-white/50 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[10px] font-medium tracking-wider uppercase">View Case</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProjectCardsSection = () => {
  return (
    <div className="px-5 sm:px-6 lg:px-10 py-10 sm:py-14">
      <div className="flex items-center justify-between mb-7 sm:mb-9">
        <h2 className="text-lg sm:text-xl font-semibold text-white tracking-[-0.01em]">Case Studies</h2>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/70 transition-colors font-medium group"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {projects.slice(0, 12).map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCardsSection;
