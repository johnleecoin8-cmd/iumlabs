import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeader from "./SectionHeader";

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
import synfuturesLogo from "@/assets/logos/synfutures.png";

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
import synfuturesCampaign from "@/assets/campaigns/synfutures-billboard.jpg";

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

const CaseCard = ({ number, name, logo, bgImage, slug, category, result, description, index }: CaseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
      style={{ perspective: "1500px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/projects/${slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className="block h-full relative"
      >
        {/* 4pillars Reports Style - Deep 3D Stack with Book-Open Effect */}
        {/* Layer 5 - Deepest */}
        <div 
          className="absolute inset-0 rounded-2xl bg-white/[0.02] transition-all duration-700 ease-out"
          style={{ 
            transform: isHovered 
              ? "translateX(20px) translateY(20px) rotateX(-8deg) rotateY(4deg)" 
              : "translateX(10px) translateY(10px) rotateX(0deg)",
            zIndex: -5,
            boxShadow: "0 30px 60px -30px rgba(0,0,0,0.5)"
          }}
        />
        {/* Layer 4 */}
        <div 
          className="absolute inset-0 rounded-2xl bg-white/[0.03] transition-all duration-600 ease-out"
          style={{ 
            transform: isHovered 
              ? "translateX(15px) translateY(15px) rotateX(-6deg) rotateY(3deg)" 
              : "translateX(8px) translateY(8px) rotateX(0deg)",
            zIndex: -4,
            boxShadow: "0 25px 50px -25px rgba(0,0,0,0.4)"
          }}
        />
        {/* Layer 3 */}
        <div 
          className="absolute inset-0 rounded-2xl bg-white/[0.05] transition-all duration-500 ease-out"
          style={{ 
            transform: isHovered 
              ? "translateX(10px) translateY(10px) rotateX(-4deg) rotateY(2deg)" 
              : "translateX(6px) translateY(6px) rotateX(0deg)",
            zIndex: -3,
            boxShadow: "0 20px 40px -20px rgba(0,0,0,0.3)"
          }}
        />
        {/* Layer 2 */}
        <div 
          className="absolute inset-0 rounded-2xl bg-white/[0.08] transition-all duration-400 ease-out"
          style={{ 
            transform: isHovered 
              ? "translateX(6px) translateY(6px) rotateX(-2deg) rotateY(1deg)" 
              : "translateX(4px) translateY(4px) rotateX(0deg)",
            zIndex: -2,
            boxShadow: "0 15px 30px -15px rgba(0,0,0,0.2)"
          }}
        />
        {/* Layer 1 - Closest */}
        <div 
          className="absolute inset-0 rounded-2xl bg-white/[0.1] transition-all duration-300 ease-out"
          style={{ 
            transform: isHovered 
              ? "translateX(3px) translateY(3px) rotateX(-1deg)" 
              : "translateX(2px) translateY(2px) rotateX(0deg)",
            zIndex: -1,
          }}
        />
        
        {/* Main Card with Book-Opening Effect */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl transition-all duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isHovered 
              ? "translateY(-12px) rotateX(2deg) rotateY(-1deg)" 
              : "translateY(0) rotateX(0deg) rotateY(0deg)",
            boxShadow: isHovered 
              ? "0 50px 100px -30px rgba(0,0,0,0.8), 0 30px 60px -20px rgba(0,0,0,0.5)" 
              : "0 20px 40px -20px rgba(0,0,0,0.4)",
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={bgImage}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />
          </div>
          
          {/* Number Badge */}
          <div className="absolute top-4 left-4">
            <span className="text-white/20 text-6xl font-bold">{number}</span>
          </div>
          
          {/* Content */}
          <div className="relative p-6 min-h-[380px] flex flex-col justify-end">
            <div className="flex items-start justify-between mb-4">
              <span className="text-white/70 text-xs uppercase tracking-wider bg-white/[0.08] backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/[0.1] group-hover:bg-white/[0.15] group-hover:border-white/[0.2] transition-all">{category}</span>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              {logo && (
                <div className="w-12 h-12 rounded-xl bg-white/[0.08] backdrop-blur-sm p-2 flex items-center justify-center border border-white/[0.1] group-hover:bg-white/[0.15] group-hover:scale-110 transition-all duration-300">
                  <img
                    src={logo}
                    alt={name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <h4 className="text-2xl font-bold text-white">{name}</h4>
            </div>
            
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 font-semibold text-sm mb-3">
              {result}
            </p>
            
            <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-white/80 transition-colors">
              {description}
            </p>
            
            <div className="flex items-center gap-2 text-white/50 group-hover:text-primary transition-colors text-sm">
              <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                View case study
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const CasesSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#0A0A0B] via-[#0D1420] to-[#0A0A0B] px-4 py-16 md:py-24 overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/15 to-cyan-500/10 blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-500/10 to-primary/5 blur-[100px] pointer-events-none animate-blob-delay-2" />
      
      {/* Dot Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
      
      {/* Glow Line Top */}
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* 4pillars-style Header */}
        <SectionHeader 
          title="CASES" 
          linkTo="/projects" 
          linkText="VIEW ALL"
          dark={true}
        />

        {/* Cases Grid - 3x2 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {featuredCases.map((caseItem, index) => (
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
          </div>
        </motion.div>
      </div>
      
      {/* Glow Line Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px glow-line-cyan" />
    </div>
  );
};

export default CasesSection;
