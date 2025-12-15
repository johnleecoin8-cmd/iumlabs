import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// Import logos
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.svg";
import triaLogo from "@/assets/logos/tria-official.png";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import bybitLogo from "@/assets/logos/bybit.png";

// Import background images
import bnbBg from "@/assets/projects/bnb-bg.jpg";
import kucoinBg from "@/assets/projects/kucoin-bg.jpg";
import polygonBg from "@/assets/projects/polygon-bg.jpg";
import ondoBg from "@/assets/projects/ondo-bg.jpg";
import peaqBg from "@/assets/projects/peaq-bg.jpg";
import triaBg from "@/assets/projects/tria-bg.jpg";

const featuredCases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    bgImage: bnbBg,
    slug: "bnb-chain",
    category: "Infrastructure",
    result: "+340% Korean Trading Volume",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage.",
    glowColor: "#F3BA2F",
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    bgImage: kucoinBg,
    slug: "kucoin",
    category: "Exchange",
    result: "50K+ New Korean Users",
    description: "Successful market launch with Korean trader-focused campaigns and ambassador partnerships.",
    glowColor: "#23AF91",
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    bgImage: polygonBg,
    slug: "polygon",
    category: "Layer 2",
    result: "$2M Korean TVL in 30 Days",
    description: "Community growth from 0 to 50K Korean users with targeted developer relations and DeFi marketing.",
    glowColor: "#8247E5",
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    bgImage: ondoBg,
    slug: "ondo",
    category: "RWA",
    result: "100K+ Korean Community",
    description: "RWA education campaign targeting both retail and institutional Korean investors.",
    glowColor: "#3B82F6",
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    bgImage: peaqBg,
    slug: "peaq",
    category: "DePIN",
    result: "#1 DePIN in Korea",
    description: "Established thought leadership in DePIN space with IoT partnerships and developer community.",
    glowColor: "#00CED1",
  },
  {
    name: "Tria",
    logo: triaLogo,
    bgImage: triaBg,
    slug: "tria",
    category: "Wallet",
    result: "30K+ Korean Wallets",
    description: "User acquisition campaign with simplified onboarding for Korean Web3 wallet users.",
    glowColor: "#FF7F50",
  },
];

const clientLogos = [
  { name: "Story Protocol", logo: storyLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Bybit", logo: bybitLogo },
];

const floatingTags = [
  { label: "340% Growth", top: "8%", left: "3%", delay: 0 },
  { label: "50K+ Users", top: "12%", right: "5%", delay: 0.2 },
  { label: "$2M TVL", bottom: "15%", left: "5%", delay: 0.4 },
];

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="relative bg-[#0A0A0B] px-4 py-16 md:py-20 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Tags */}
      <div className="hidden lg:block">
        {floatingTags.map((tag, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: tag.delay + 0.3 }}
            className="absolute z-10 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.06] hover:border-white/20 hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm"
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom
            }}
          >
            {tag.label}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-white/40 text-xs font-mono tracking-widest uppercase mb-4 block">
              [ 03 ] ── Featured Cases
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Success <span className="text-primary">Stories</span>
            </h2>
          </div>
          <Link to="/projects" className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:border-primary/40 hover:text-white transition-all duration-300">
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Featured Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/projects/${caseItem.slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className="group cursor-pointer block"
              >
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden mb-4 transition-all duration-500 hover:-translate-y-2 bg-white/[0.03] border border-white/[0.08] hover:border-white/20"
                  style={{ boxShadow: `0 4px 30px ${caseItem.glowColor}10` }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 10px 60px ${caseItem.glowColor}30, 0 0 100px ${caseItem.glowColor}15`}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 4px 30px ${caseItem.glowColor}10`}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${caseItem.bgImage})` }}
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 pointer-events-none" />
                  
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                    {caseItem.slug !== 'tria' && (
                      <img
                        src={caseItem.logo}
                        alt={caseItem.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4 group-hover:scale-110 transition-transform duration-300"
                        style={{ filter: `drop-shadow(0 0 20px ${caseItem.glowColor}80)` }}
                      />
                    )}
                    <h3 className="text-white text-2xl md:text-3xl font-bold text-center tracking-tight drop-shadow-lg">
                      {caseItem.name}
                    </h3>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-semibold text-center" style={{ color: caseItem.glowColor }}>
                      {caseItem.result}
                    </p>
                    <p className="text-white/60 text-xs text-center mt-1 uppercase tracking-wider">
                      {caseItem.category}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.1] backdrop-blur-sm border border-white/[0.1]"
                    >
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] backdrop-blur-sm text-xs text-white/70 uppercase tracking-wider border border-white/[0.08]">
                      {caseItem.category}
                    </span>
                  </div>
                </div>

                {/* Text Below Card */}
                <div className="px-2">
                  <h3 className="text-xl font-medium text-white/90 mb-1 group-hover:text-primary transition-colors">
                    {caseItem.name}
                  </h3>
                  <p className="text-white/40 text-sm line-clamp-2">
                    {caseItem.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-center text-white/30 text-sm mb-8 uppercase tracking-widest">
            And More...
          </p>
          <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12">
            {clientLogos.map((client, index) => (
              <div key={index} className="opacity-30 hover:opacity-70 transition-opacity duration-300">
                <img src={client.logo} alt={client.name} className="h-8 w-auto object-contain brightness-0 invert" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CasesSection;
