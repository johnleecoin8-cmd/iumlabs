import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
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

const featuredCases = [
  {
    number: "01",
    name: "BNB Chain",
    logo: bnbLogo,
    slug: "bnb-chain",
    category: "Infrastructure",
    result: "+340%",
    resultLabel: "Korean Trading Volume",
  },
  {
    number: "02",
    name: "Story Protocol",
    logo: storyLogo,
    slug: "story-protocol",
    category: "IP",
    result: "Top 3",
    resultLabel: "Korean IP Platform",
  },
  {
    number: "03",
    name: "Sahara AI",
    logo: saharaAiLogo,
    slug: "sahara-ai",
    category: "AI",
    result: "50K+",
    resultLabel: "Community Members",
  },
  {
    number: "04",
    name: "Mantra",
    logo: mantraLogo,
    slug: "mantra",
    category: "RWA",
    result: "#1",
    resultLabel: "RWA in Korea",
  },
  {
    number: "05",
    name: "Peaq",
    logo: peaqLogo,
    slug: "peaq",
    category: "DePIN",
    result: "#1",
    resultLabel: "DePIN in Korea",
  },
  {
    number: "06",
    name: "Tria",
    logo: triaLogo,
    slug: "tria",
    category: "Wallet",
    result: "30K+",
    resultLabel: "Korean Wallets",
  },
];

const additionalClients = [
  { name: "KuCoin", logo: kucoinLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Bybit", logo: bybitLogo },
];

const CasesSection = () => {
  return (
    <div className="bg-[#0A0A0B] px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-7xl">
        <SectionHeader 
          title="CASES" 
          linkTo="/projects" 
          linkText="VIEW ALL"
          dark={true}
        />

        {/* a41 style: minimal flat cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
          {featuredCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/projects/${caseItem.slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className="group block bg-white rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
              >
                {/* Header: Number + Category */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-gray-300 font-mono text-sm">{caseItem.number}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{caseItem.category}</span>
                </div>

                {/* Logo */}
                <div className="mb-6">
                  <img
                    src={caseItem.logo}
                    alt={caseItem.name}
                    className="h-10 w-auto object-contain"
                  />
                </div>

                {/* Name */}
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {caseItem.name}
                </h4>

                {/* Result */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-3xl font-bold text-primary mb-1">{caseItem.result}</div>
                  <div className="text-sm text-gray-500">{caseItem.resultLabel}</div>
                </div>

                {/* Arrow */}
                <div className="flex justify-end mt-4">
                  <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </Link>
            </motion.div>
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
    </div>
  );
};

export default CasesSection;
