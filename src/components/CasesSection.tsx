import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import { motion } from "framer-motion";

// Import logos
import bnbLogo from "@/assets/logos/bnb.svg";
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
    color: "#F59E0B",
    roi: "5x ROI"
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    bgImage: storyCampaign,
    slug: "story-protocol",
    category: "IP",
    result: "Korean IP Revolution",
    description: "IP infrastructure platform launch with Korean creator community and media partnerships.",
    color: "#8B5CF6",
    roi: "200% Growth"
  },
  {
    name: "Sahara AI",
    logo: saharaAiLogo,
    bgImage: saharaCampaign,
    slug: "sahara-ai",
    category: "AI",
    result: "Korean AI x Web3 Launch",
    description: "AI blockchain platform launch with Korean developer community and enterprise partnerships.",
    color: "#3B82F6",
    roi: "$10M Raised"
  },
  {
    name: "Mantra",
    logo: mantraLogo,
    bgImage: mantraCampaign,
    slug: "mantra",
    category: "RWA",
    result: "Korean RWA Expansion",
    description: "Real World Assets platform expansion targeting Korean institutional investors.",
    color: "#EF4444",
    roi: "3x Growth"
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    bgImage: peaqCampaign,
    slug: "peaq",
    category: "DePIN",
    result: "#1 DePIN in Korea",
    description: "Established thought leadership in DePIN space with IoT partnerships and developer community.",
    color: "#06B6D4",
    roi: "#1 Rank"
  },
  {
    name: "Tria",
    logo: triaLogo,
    bgImage: triaCampaign,
    slug: "tria",
    category: "Wallet",
    result: "30K+ Korean Wallets",
    description: "User acquisition campaign with simplified onboarding for Korean Web3 wallet users.",
    color: "#F97316",
    roi: "30K Users"
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
  color: string;
  roi: string;
  index: number;
}

const CaseCard = ({ name, logo, bgImage, slug, category, result, description, color, roi, index }: CaseCardProps) => {
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
        className={`group block p-8 md:p-10 transition-all duration-300 hover:bg-white/5 relative ${
          !isRightColumn ? "border-r border-white/10" : ""
        } ${!isLastRow ? "border-b border-white/10" : ""}`}
        style={{
          boxShadow: `inset 0 0 0 1px transparent`,
        }}
      >
        {/* ROI Badge */}
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ 
            backgroundColor: `${color}20`,
            color: color,
            border: `1px solid ${color}40`
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <Trophy className="w-3 h-3" />
          {roi}
        </motion.div>

        <div className="flex items-start gap-6">
          {/* Image */}
          <div 
            className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300"
            style={{
              boxShadow: `0 0 0 2px transparent`,
            }}
          >
            <div 
              className="w-full h-full relative group-hover:scale-110 transition-transform duration-500"
              style={{
                boxShadow: `0 4px 20px ${color}30`
              }}
            >
              <img
                src={bgImage}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 text-white/40 text-xs mb-2">
              <span 
                className="uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ 
                  backgroundColor: `${color}15`,
                  color: color
                }}
              >
                {category}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-white/80 transition-colors">
              {name}
            </h3>
            <p 
              className="font-medium text-sm mb-2"
              style={{ color }}
            >
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

        {/* Bottom accent on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: color }}
        />
      </Link>
    </motion.div>
  );
};

const CasesSection = () => {
  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row relative">
        {/* Left: Cases Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {featuredCases.map((caseItem, index) => (
              <CaseCard key={caseItem.slug} {...caseItem} index={index} />
            ))}
          </div>

          {/* View All */}
          <div className="p-8 md:p-10 border-t border-white/10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-amber-400 font-medium hover:text-amber-300 transition-colors"
            >
              View all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: Sticky Info Panel */}
        <motion.div
          className="w-full lg:w-1/3 p-8 md:p-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Trophy icon decoration */}
          <motion.div
            className="mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Trophy className="w-12 h-12 text-amber-400" strokeWidth={1.5} />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Our <span className="text-amber-400">Cases</span>
          </h2>
          <p className="text-white/50 leading-relaxed mb-8">
            Real results, not just promises. Here's how we've helped global Web3 projects conquer the Korean market.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 pb-4 border-b border-amber-500/20">
              <span className="text-3xl font-bold text-amber-400">340%</span>
              <span className="text-white/50 text-sm">Average volume increase</span>
            </div>
            <div className="flex items-center gap-4 pb-4 border-b border-amber-500/20">
              <span className="text-3xl font-bold text-amber-400">50K+</span>
              <span className="text-white/50 text-sm">New users acquired</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-amber-400">18+</span>
              <span className="text-white/50 text-sm">Projects launched</span>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 w-fit shadow-lg shadow-amber-500/20"
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
