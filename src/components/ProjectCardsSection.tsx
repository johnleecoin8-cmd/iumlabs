import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

import bnbLogo from "@/assets/logos/bnb-new.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import saharaAiLogo from "@/assets/logos/sahara-ai-wordmark.png";
import mantraLogo from "@/assets/logos/mantra-new.png";
import megaethLogo from "@/assets/logos/megaeth-icon.png";
import bybitLogo from "@/assets/logos/bybit-wordmark.png";
import fogoLogo from "@/assets/logos/fogo-new.jpg";
import synfuturesLogo from "@/assets/logos/synfutures-new.png";
import spacecoinLogo from "@/assets/logos/spacecoin-wordmark.png";
import triaLogo from "@/assets/logos/tria-new.jpg";
import zkpassLogo from "@/assets/logos/zkpass-icon.jpeg";
import peaqLogo from "@/assets/logos/openledger-wordmark.png";
import multipliLogo from "@/assets/logos/multipli.png";
import talusLogo from "@/assets/logos/talus.png";
import aptosLogo from "@/assets/logos/aptos.png";

// Lunar-style case tiles: a brand-colored gradient with the project logo
// centered, ium's proof metric kept at the bottom. `color` drives the gradient.
const projects = [
  { name: "Spacecoin", slug: "spacecoin", category: "DePIN", result: "200K+", resultLabel: "Impressions", color: "#6E56CF", logo: spacecoinLogo, isIcon: false },
  { name: "Sahara AI", slug: "sahara-ai", category: "AI", result: "30K+", resultLabel: "Community", color: "#00D4FF", logo: saharaAiLogo, isIcon: false },
  { name: "Aptos", slug: "aptos", category: "Layer 1", result: "15K+", resultLabel: "Community", color: "#4AE8A0", logo: aptosLogo, isIcon: true },
  { name: "KuCoin", slug: "kucoin", category: "Exchange", result: "$150M+", resultLabel: "Trading Volume", color: "#23AF91", logo: kucoinLogo, isIcon: false },
  { name: "BNB Chain", slug: "bnb-chain", category: "Infrastructure", result: "50+", resultLabel: "VIP & Institutions", color: "#F3BA2F", logo: bnbLogo, isIcon: true },
  { name: "MegaETH", slug: "megaeth", category: "Layer 2", result: "2M+", resultLabel: "Reach", color: "#FF6B9D", logo: megaethLogo, isIcon: false },
  { name: "Bybit", slug: "bybit", category: "Exchange", result: "#2", resultLabel: "Korea Traffic", color: "#F7931A", logo: bybitLogo, isIcon: false },
  { name: "Mantra", slug: "mantra", category: "RWA", result: "$50M+", resultLabel: "Pipeline", color: "#00D4FF", logo: mantraLogo, isIcon: true },
  { name: "FOGO", slug: "fogo", category: "Layer 1", result: "500+", resultLabel: "Attendees", color: "#FF6B35", logo: fogoLogo, isIcon: true },
  { name: "SynFutures", slug: "synfutures", category: "DeFi", result: "5M+", resultLabel: "OOH", color: "#9B59B6", logo: synfuturesLogo, isIcon: true },
  { name: "Tria", slug: "tria", category: "Wallet", result: "30K+", resultLabel: "Korean Wallets", color: "#4169E1", logo: triaLogo, isIcon: true },
  { name: "zkPass", slug: "zkpass", category: "Privacy", result: "The Verifiable", resultLabel: "Nights", color: "#2DD4BF", logo: zkpassLogo, isIcon: true },
  { name: "OpenLedger", slug: "openledger", category: "AI", result: "2M+", resultLabel: "Reach", color: "#10B981", logo: peaqLogo, isIcon: false },
  { name: "Multipli", slug: "multipli", category: "RWA", result: "90K+", resultLabel: "Investors", color: "#8B5CF6", logo: multipliLogo, isIcon: false },
  { name: "Talus", slug: "talus", category: "AI", result: "AI Agents", resultLabel: "On+Offchain", color: "#00E5A0", logo: talusLogo, isIcon: true },
];

// brand gradient: vivid glow from the top fading into near-black (8-digit hex
// alpha: F2≈95%, 59≈35%, 00=0%, 30≈19%).
const tileBg = (c: string) => ({
  backgroundColor: "#0a0a0a",
  backgroundImage: `radial-gradient(120% 85% at 50% 2%, ${c}F2 0%, ${c}59 38%, ${c}00 72%), linear-gradient(180deg, ${c}30 0%, #0a0a0a 84%)`,
});

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
        className="group relative block w-full aspect-[4/5] sm:aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.06]"
      >
        {/* brand gradient backdrop */}
        <div
          className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
          style={tileBg(project.color)}
        />
        {/* deepen the bottom for the label */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* category */}
        <div className="absolute top-4 left-4">
          <span className="text-[8px] sm:text-[9px] text-white/45 uppercase tracking-[0.18em] font-medium">
            {project.category}
          </span>
        </div>

        {/* centered logo (the Lunar signature) */}
        <div className="absolute inset-0 flex items-center justify-center p-6 pb-16">
          <img
            src={project.logo}
            alt={project.name}
            loading={index < 8 ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              "object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-[1.06]",
              project.isIcon
                ? "h-12 w-12 sm:h-16 sm:w-16 rounded-2xl"
                : "max-h-9 sm:max-h-11 w-auto max-w-[72%] brightness-0 invert"
            )}
          />
        </div>

        {/* bottom: name + proof metric */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight mb-1">
            {project.name}
          </h3>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-white leading-none tracking-tight">
              {project.result}
            </span>
            <span className="text-[9px] sm:text-[10px] text-white/45 font-medium">{project.resultLabel}</span>
          </div>

          <div className="overflow-hidden h-0 group-hover:h-5 transition-all duration-500 ease-out">
            <div className="flex items-center gap-1.5 pt-2 text-white/60 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[9px] font-medium tracking-wider uppercase">View Case</span>
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
    <div className="px-5 sm:px-6 lg:px-10 pb-12 sm:pb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {projects.slice(0, 12).map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCardsSection;
