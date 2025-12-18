import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const CasesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleCards = 3; // Show 3 cards at a time on desktop
  const maxIndex = Math.max(0, featuredCases.length - visibleCards);

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Header with Navigation */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-amber-400/60 text-sm uppercase tracking-wider mb-2">Featured Cases</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our <span className="text-amber-400">Work</span>
            </h2>
          </div>

          {/* Carousel Navigation */}
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm font-mono hidden sm:block">
              {String(currentIndex + 1).padStart(2, '0')} / {String(featuredCases.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <motion.button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden" ref={containerRef}>
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${currentIndex * (100 / visibleCards + 2)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {featuredCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.slug}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/projects/${caseItem.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group block relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="relative h-72 md:h-80 overflow-hidden">
                    <img
                      src={caseItem.bgImage}
                      alt={caseItem.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"
                    />
                    {/* Color Overlay on Hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ backgroundColor: caseItem.color }}
                    />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Row */}
                    <div className="flex items-start justify-between">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${caseItem.color}20`,
                          color: caseItem.color
                        }}
                      >
                        {caseItem.category}
                      </span>
                      <div 
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: `${caseItem.color}20`,
                          color: caseItem.color,
                          border: `1px solid ${caseItem.color}40`
                        }}
                      >
                        <Trophy className="w-3 h-3" />
                        {caseItem.roi}
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
                        {caseItem.name}
                      </h3>
                      <p 
                        className="text-sm font-medium mb-2"
                        style={{ color: caseItem.color }}
                      >
                        {caseItem.result}
                      </p>
                      <p className="text-white/50 text-sm line-clamp-2 group-hover:text-white/60 transition-colors">
                        {caseItem.description}
                      </p>

                      {/* View Link - appears on hover */}
                      <motion.div 
                        className="flex items-center gap-2 mt-4 text-white/60 group-hover:text-white transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-sm font-medium">View Case Study</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Link */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-amber-400 font-medium hover:text-amber-300 transition-colors"
          >
            View all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CasesSection;
