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
import bybitLogo from "@/assets/logos/bybit.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import megaethLogo from "@/assets/logos/megaeth.png";
import zkpassLogo from "@/assets/logos/zkpass.png";

// Import campaign images
import bnbCampaign from "@/assets/campaigns/bnb-event.jpg";
import storyCampaign from "@/assets/campaigns/story-origin-summit.jpg";
import saharaCampaign from "@/assets/campaigns/sahara-ai.jpg";
import mantraCampaign from "@/assets/campaigns/mantra-party.jpg";
import peaqCampaign from "@/assets/campaigns/peaq-summit.jpg";
import triaCampaign from "@/assets/campaigns/tria-launch.jpg";
import bybitCampaign from "@/assets/campaigns/bybit-event.jpg";
import kucoinCampaign from "@/assets/campaigns/kucoin-oldschool.jpg";
import polygonCampaign from "@/assets/campaigns/polygon-hackathon.jpg";
import ondoCampaign from "@/assets/campaigns/ondo-seminar.jpg";
import megaethCampaign from "@/assets/campaigns/megaeth-launch.jpg";
import zkpassCampaign from "@/assets/campaigns/zkpass-verifiable-nights.jpg";

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
    name: "Bybit",
    logo: bybitLogo,
    bgImage: bybitCampaign,
    slug: "bybit",
    category: "Exchange",
    result: "+200% Korean Users",
    description: "Comprehensive VIP trader acquisition and community building for Korean market expansion.",
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    bgImage: kucoinCampaign,
    slug: "kucoin",
    category: "Exchange",
    result: "Top 3 Exchange in Korea",
    description: "Strategic Korean market penetration with trading campaigns and community events.",
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    bgImage: polygonCampaign,
    slug: "polygon",
    category: "Infrastructure",
    result: "Korean Dev Ecosystem",
    description: "Developer community building and hackathon series for Korean blockchain developers.",
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    bgImage: ondoCampaign,
    slug: "ondo",
    category: "RWA",
    result: "Korean RWA Education",
    description: "RWA investment education and institutional investor outreach in Korean market.",
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
    name: "MegaETH",
    logo: megaethLogo,
    bgImage: megaethCampaign,
    slug: "megaeth",
    category: "Infrastructure",
    result: "Pre-launch Hype Campaign",
    description: "Strategic pre-launch marketing and community building for Layer 2 solution.",
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
    name: "zkPass",
    logo: zkpassLogo,
    bgImage: zkpassCampaign,
    slug: "zkpass",
    category: "Privacy",
    result: "Privacy Tech Awareness",
    description: "Zero-knowledge privacy solution awareness campaign in Korean market.",
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
  const isLastRow = index >= 10; // Last 2 cards (index 10, 11)
  const isRightColumn = index % 2 === 1;

  return (
    <div className="h-full">
      <Link
        to={`/projects/${slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className={`group block p-3 sm:p-4 md:p-5 transition-all duration-300 hover:bg-secondary/50 active:bg-secondary/70 h-full min-h-[120px] sm:min-h-[140px] ${
          !isRightColumn ? "sm:border-r border-border" : ""
        } ${!isLastRow ? "border-b border-border" : ""}`}
      >
        <div className="flex items-start gap-2.5 sm:gap-3">
          {/* Image */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg overflow-hidden flex-shrink-0 group-hover:shadow-lg group-hover:shadow-foreground/10 transition-all duration-300">
            <img
              src={bgImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-muted-foreground text-[9px] sm:text-[10px] mb-0.5">
              <span className="uppercase tracking-wider">{category}</span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-0.5 group-hover:text-foreground/80 transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-foreground font-medium text-[11px] sm:text-xs mb-0.5 line-clamp-1">
              {result}
            </p>
            <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed line-clamp-1 hidden sm:block">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors text-[10px] sm:text-xs mt-2 min-h-[36px] sm:min-h-0">
          <span className="group-hover:underline underline-offset-4">View case study</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
        <div className="w-full lg:w-1/3 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Our Cases
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm">
            Real results, not just promises. Here's how we've helped global Web3 projects conquer the Korean market.
          </p>

          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4 pb-2 sm:pb-3 border-b border-border">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">340%</span>
              <span className="text-muted-foreground text-xs sm:text-sm">Average volume increase</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 pb-2 sm:pb-3 border-b border-border">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">50K+</span>
              <span className="text-muted-foreground text-xs sm:text-sm">New users acquired</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">18+</span>
              <span className="text-muted-foreground text-xs sm:text-sm">Projects launched</span>
            </div>
          </div>

          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-5 sm:px-6 py-3 sm:py-3 text-xs sm:text-sm font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 w-full sm:w-fit mb-4 sm:mb-6 min-h-[44px]"
          >
            START YOUR PROJECT
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* View All Projects */}
          <div className="pt-4 sm:pt-6 border-t border-border">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-foreground/70 transition-colors text-sm"
            >
              <span className="group-hover:underline underline-offset-4">View all projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3D Bridge Logo */}
          <div className="h-24 sm:h-32 w-full mt-4 sm:mt-6 hidden sm:block">
            <Logo3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
