import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/projects/${slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className={`group block p-8 md:p-10 transition-all duration-300 hover:bg-white/5 hover:shadow-lg hover:shadow-white/5 ${
          !isRightColumn ? "border-r border-white/10" : ""
        } ${!isLastRow ? "border-b border-white/10" : ""}`}
      >
        <div className="flex items-start gap-6">
          {/* Image */}
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 group-hover:shadow-lg group-hover:shadow-white/10 transition-shadow duration-300">
            <img
              src={bgImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 text-white/40 text-xs mb-2">
              <span className="uppercase tracking-wider">{category}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-white/80 transition-colors">
              {name}
            </h3>
            <p className="text-white font-medium text-sm mb-2">
              {result}
            </p>
            <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors text-sm mt-4">
          View case study
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};

const CasesSection = () => {
  return (
    <section className="bg-[#0A0A0A]">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Cases Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {featuredCases.map((caseItem, index) => (
              <CaseCard key={caseItem.slug} {...caseItem} index={index} />
            ))}
          </div>
        </div>

        {/* Right: Sticky Info Panel */}
        <motion.div
          className="w-full lg:w-1/3 p-6 md:p-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Our Cases
          </h2>
          <p className="text-white/50 leading-relaxed mb-6">
            Real results, not just promises. Here's how we've helped global Web3 projects conquer the Korean market.
          </p>

          {/* View All Projects */}
          <div className="pb-6 mb-6 border-b border-white/10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors"
            >
              View all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-6 mb-6">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <span className="text-3xl font-bold text-white">340%</span>
              <span className="text-white/50 text-sm">Average volume increase</span>
            </div>
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <span className="text-3xl font-bold text-white">50K+</span>
              <span className="text-white/50 text-sm">New users acquired</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-white">18+</span>
              <span className="text-white/50 text-sm">Projects launched</span>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors w-fit"
          >
            START YOUR PROJECT
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CasesSection;
