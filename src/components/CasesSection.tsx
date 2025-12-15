import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// Import logos
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
import bybitLogo from "@/assets/logos/bybit.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import mantraLogo from "@/assets/logos/mantra.png";
import fogoLogo from "@/assets/logos/fogo.png";
import zkpassLogo from "@/assets/logos/zkpass.png";

// Import campaign images for card backgrounds
import bnbCampaign from "@/assets/campaigns/bnb-event.jpg";
import storyCampaign from "@/assets/campaigns/story-origin-summit.jpg";
import saharaCampaign from "@/assets/campaigns/sahara-ai.jpg";
import mantraCampaign from "@/assets/campaigns/mantra-party.jpg";
import peaqCampaign from "@/assets/campaigns/peaq-summit.jpg";
import triaCampaign from "@/assets/campaigns/tria-launch.jpg";
import fogoCampaign from "@/assets/campaigns/fogo-fest.avif";
import lbankCampaign from "@/assets/campaigns/lbank-festival.jpg";
import zkpassCampaign from "@/assets/campaigns/zkpass-verifiable-nights.jpg";
import openledgerCampaign from "@/assets/campaigns/openledger-interview.jpg";

const featuredCases = [
  {
    number: "01",
    name: "BNB Chain",
    logo: bnbLogo,
    bgImage: bnbCampaign,
    slug: "bnb-chain",
    category: "Infrastructure",
    result: "+340% Korean Trading Volume",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage.",
  },
  {
    number: "02",
    name: "Story Protocol",
    logo: storyLogo,
    bgImage: storyCampaign,
    slug: "story-protocol",
    category: "IP",
    result: "Korean IP Revolution",
    description: "IP infrastructure platform launch with Korean creator community and media partnerships.",
  },
  {
    number: "03",
    name: "Sahara AI",
    logo: saharaAiLogo,
    bgImage: saharaCampaign,
    slug: "sahara-ai",
    category: "AI",
    result: "Korean AI x Web3 Launch",
    description: "AI blockchain platform launch with Korean developer community and enterprise partnerships.",
  },
  {
    number: "04",
    name: "Mantra",
    logo: mantraLogo,
    bgImage: mantraCampaign,
    slug: "mantra",
    category: "RWA",
    result: "Korean RWA Expansion",
    description: "Real World Assets platform expansion targeting Korean institutional investors.",
  },
  {
    number: "05",
    name: "Peaq",
    logo: peaqLogo,
    bgImage: peaqCampaign,
    slug: "peaq",
    category: "DePIN",
    result: "#1 DePIN in Korea",
    description: "Established thought leadership in DePIN space with IoT partnerships and developer community.",
  },
  {
    number: "06",
    name: "Tria",
    logo: triaLogo,
    bgImage: triaCampaign,
    slug: "tria",
    category: "Wallet",
    result: "30K+ Korean Wallets",
    description: "User acquisition campaign with simplified onboarding for Korean Web3 wallet users.",
  },
  {
    number: "07",
    name: "FOGO",
    logo: fogoLogo,
    bgImage: fogoCampaign,
    slug: "fogo",
    category: "Layer 1",
    result: "Fogo Fest 2025 Success",
    description: "Launch event and community activation for FOGO ecosystem in Korean market.",
  },
  {
    number: "08",
    name: "Lbank",
    logo: null,
    bgImage: lbankCampaign,
    slug: "lbank",
    category: "Exchange",
    result: "1001 Festival Seoul",
    description: "Major exchange event marketing and Korean community engagement campaign.",
  },
  {
    number: "09",
    name: "zkPass",
    logo: zkpassLogo,
    bgImage: zkpassCampaign,
    slug: "zkpass",
    category: "Privacy",
    result: "The Verifiable Nights",
    description: "Privacy-focused Web3 identity solution launch with Korean developer community.",
  },
  {
    number: "10",
    name: "Open Ledger",
    logo: null,
    bgImage: openledgerCampaign,
    slug: "openledger",
    category: "Infrastructure",
    result: "Korea Media Coverage",
    description: "Strategic media interviews and PR campaign for Korean market awareness.",
  },
];

const additionalClients = [
  { name: "KuCoin", logo: kucoinLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Bybit", logo: bybitLogo },
];

interface CaseCardProps {
  number: string;
  name: string;
  logo: string | null;
  bgImage: string;
  slug: string;
  category: string;
  result: string;
  description: string;
  index: number;
}

const CaseCard = ({ name, logo, bgImage, slug, category, result, description, index }: CaseCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <Link
      to={`/projects/${slug}`}
      onClick={() => window.scrollTo(0, 0)}
      className="group block h-full relative overflow-hidden rounded-xl transition-all duration-300"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      </div>
      
      {/* Content */}
      <div className="relative p-6 min-h-[280px] flex flex-col justify-end">
        <div className="flex items-start justify-between mb-4">
          <span className="text-white/60 text-xs uppercase tracking-wider bg-white/10 px-2 py-1 rounded">{category}</span>
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          {logo && (
            <img
              src={logo}
              alt={name}
              className="w-10 h-10 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
          )}
          <h4 className="text-xl font-bold text-white">{name}</h4>
        </div>
        
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-semibold text-sm mb-3">
          {result}
        </p>
        
        <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors text-sm">
          View case study
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const CasesSection = () => {
  return (
    <div className="bg-[#0A0A0B] px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-7xl">
        {/* Option B Header - Background number + gradient title */}
        <motion.div 
          className="relative mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Large background number */}
          <span className="absolute -top-8 md:-top-12 left-0 text-[120px] md:text-[180px] lg:text-[220px] font-black text-white/[0.03] leading-none pointer-events-none select-none">
            03
          </span>
          
          {/* Title */}
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-white/50">Our</span>{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Cases
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mt-4" />
            <p className="text-white/50 text-lg mt-6 max-w-2xl">
              Real results, not just promises. Here's how we've helped global Web3 projects conquer the Korean market.
            </p>
          </div>
        </motion.div>

        {/* Cases Grid - 3x2 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {featuredCases.slice(0, 6).map((caseItem, index) => (
            <CaseCard key={caseItem.slug} {...caseItem} index={index} />
          ))}
        </div>

        {/* Additional Clients */}
        <motion.div 
          className="border-t border-white/10 pt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-white/40 text-sm uppercase tracking-widest">
              And many more...
            </p>
            <div className="flex items-center gap-8 md:gap-12">
              {additionalClients.map((client, index) => (
                <div key={index} className="opacity-40 hover:opacity-80 transition-opacity">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="h-8 w-auto object-contain brightness-0 invert" 
                  />
                </div>
              ))}
            </div>
            <Link 
              to="/projects" 
              className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            >
              View all projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CasesSection;
