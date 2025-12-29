import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Logo3D from "@/components/Logo3D";

// Import logos
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyLogo from "@/assets/logos/story-protocol.png";
import triaLogo from "@/assets/logos/tria-official.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import mantraLogo from "@/assets/logos/mantra.png";

// Import campaign images
import bnbCampaign from "@/assets/campaigns/bnb-event.jpg";
import storyCampaign from "@/assets/campaigns/story-origin-summit.jpg";
import saharaCampaign from "@/assets/campaigns/sahara-ai.jpg";
import mantraCampaign from "@/assets/campaigns/mantra-party.jpg";
import peaqCampaign from "@/assets/campaigns/peaq-summit.jpg";
import triaCampaign from "@/assets/campaigns/tria-launch.jpg";

const featuredCases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    bgImage: bnbCampaign,
    slug: "bnb-chain",
    category: "Infrastructure",
    result: "+340% Korean Trading Volume",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage.",
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    bgImage: storyCampaign,
    slug: "story-protocol",
    category: "IP",
    result: "Korean IP Revolution",
    description: "IP infrastructure platform launch with Korean creator community and media partnerships.",
  },
  {
    name: "Sahara AI",
    logo: saharaAiLogo,
    bgImage: saharaCampaign,
    slug: "sahara-ai",
    category: "AI",
    result: "Korean AI x Web3 Launch",
    description: "AI blockchain platform launch with Korean developer community and enterprise partnerships.",
  },
  {
    name: "Mantra",
    logo: mantraLogo,
    bgImage: mantraCampaign,
    slug: "mantra",
    category: "RWA",
    result: "Korean RWA Expansion",
    description: "Real World Assets platform expansion targeting Korean institutional investors.",
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    bgImage: peaqCampaign,
    slug: "peaq",
    category: "DePIN",
    result: "#1 DePIN in Korea",
    description: "Established thought leadership in DePIN space with IoT partnerships and developer community.",
  },
  {
    name: "Tria",
    logo: triaLogo,
    bgImage: triaCampaign,
    slug: "tria",
    category: "Wallet",
    result: "30K+ Korean Wallets",
    description: "User acquisition campaign with simplified onboarding for Korean Web3 wallet users.",
  },
];

interface CaseCardProps {
  name: string;
  logo: string;
  bgImage: string;
  slug: string;
  category: string;
  result: string;
  description: string;
  index: number;
}

const CaseCard = ({ name, logo, bgImage, slug, category, result, description, index }: CaseCardProps) => {
  const isLastRow = index >= 4;
  const isRightColumn = index % 2 === 1;

  return (
    <div>
      <Link
        to={`/projects/${slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className={`group block p-4 sm:p-6 md:p-8 transition-all duration-300 hover:bg-secondary/50 active:bg-secondary/70 ${
          !isRightColumn ? "sm:border-r border-border" : ""
        } ${!isLastRow ? "border-b border-border" : ""}`}
      >
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Image */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 group-hover:shadow-lg group-hover:shadow-foreground/10 transition-all duration-300">
            <img
              src={bgImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 text-muted-foreground text-[11px] sm:text-xs mb-1 sm:mb-2">
              <span className="uppercase tracking-wider">{category}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 group-hover:text-foreground/80 transition-colors">
              {name}
            </h3>
            <p className="text-foreground font-medium text-sm mb-1 sm:mb-2">
              {result}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 hidden sm:block">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors text-sm mt-3 sm:mt-4 min-h-[44px] sm:min-h-0">
          <span className="group-hover:underline underline-offset-4">View case study</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
};

const CasesSection = () => {
  return (
    <section className="bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Cases Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {featuredCases.map((caseItem, index) => (
              <CaseCard key={caseItem.slug} {...caseItem} index={index} />
            ))}
          </div>
        </div>

        {/* Right: Sticky Info Panel */}
        <div className="w-full lg:w-1/3 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Our Cases
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
            Real results, not just promises. Here's how we've helped global Web3 projects conquer the Korean market.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4 pb-3 border-b border-border">
              <span className="text-2xl md:text-3xl font-bold text-foreground">340%</span>
              <span className="text-muted-foreground text-sm">Average volume increase</span>
            </div>
            <div className="flex items-center gap-4 pb-3 border-b border-border">
              <span className="text-2xl md:text-3xl font-bold text-foreground">50K+</span>
              <span className="text-muted-foreground text-sm">New users acquired</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl md:text-3xl font-bold text-foreground">18+</span>
              <span className="text-muted-foreground text-sm">Projects launched</span>
            </div>
          </div>

          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 sm:py-3 text-sm font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 w-full sm:w-fit mb-6 min-h-[48px]"
          >
            START YOUR PROJECT
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* View All Projects */}
          <div className="pt-6 border-t border-border">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-foreground/70 transition-colors"
            >
              <span className="group-hover:underline underline-offset-4">View all projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3D Bridge Logo */}
          <div className="h-32 w-full mt-6">
            <Logo3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
