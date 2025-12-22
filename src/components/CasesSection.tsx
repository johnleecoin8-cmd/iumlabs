import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";

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

const CasesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const handleDrag = (event: any, info: any) => {
    if (info.offset.x < -100 && currentIndex < featuredCases.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (info.offset.x > 100 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(featuredCases.length - 1, index)));
  };

  return (
    <section className="relative bg-[#050508] py-24 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Case Studies</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Our Work</h2>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => goToSlide(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goToSlide(currentIndex + 1)}
              disabled={currentIndex === featuredCases.length - 1}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div ref={containerRef} className="relative">
        <motion.div
          className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -((featuredCases.length - 1) * 400), right: 0 }}
          onDragEnd={handleDrag}
          animate={{ x: -currentIndex * 420 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {featuredCases.map((caseItem, index) => {
            const isActive = index === currentIndex;
            
            return (
              <motion.div
                key={caseItem.slug}
                className="relative flex-shrink-0 w-[380px] md:w-[500px]"
                animate={{
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  to={`/projects/${caseItem.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group block"
                >
                  {/* Card */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                    {/* Background image */}
                    <img
                      src={caseItem.bgImage}
                      alt={caseItem.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
                        {caseItem.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={caseItem.logo}
                          alt={caseItem.name}
                          className="w-10 h-10 object-contain rounded-lg bg-white/10 p-1"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {caseItem.name}
                          </h3>
                          <p className="text-white/60 text-sm">{caseItem.result}</p>
                        </div>
                      </div>
                      
                      <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                        {caseItem.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors text-sm font-medium">
                        View case study
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-8">
        {featuredCases.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mt-16"
      >
        <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-t border-b border-white/10">
          <div className="flex items-center gap-12 flex-wrap">
            <div>
              <p className="text-3xl font-bold text-white">340%</p>
              <p className="text-white/40 text-sm">Avg Volume Increase</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden md:block" />
            <div>
              <p className="text-3xl font-bold text-white">50K+</p>
              <p className="text-white/40 text-sm">Users Acquired</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden md:block" />
            <div>
              <p className="text-3xl font-bold text-white">18+</p>
              <p className="text-white/40 text-sm">Projects</p>
            </div>
          </div>
          
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CasesSection;