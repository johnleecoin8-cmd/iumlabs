import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

// Import campaign images for backgrounds
import bnbBg from "@/assets/campaigns/bnb-event.jpg";
import kucoinBg from "@/assets/campaigns/kucoin-oldschool-panel.jpg";
import peaqBg from "@/assets/campaigns/peaq-summit.jpg";
import storyBg from "@/assets/campaigns/story-origin-summit.jpg";
import megaethBg from "@/assets/campaigns/megaeth-launch.jpg";
import triaBg from "@/assets/campaigns/tria-launch.jpg";
import bybitBg from "@/assets/campaigns/bybit-event.jpg";
import saharaAiBg from "@/assets/campaigns/sahara-ai.jpg";
import mantraBg from "@/assets/campaigns/mantra-party.jpg";
import fogoBg from "@/assets/campaigns/fogo-fest.avif";
import zkpassBg from "@/assets/campaigns/zkpass-verifiable-nights.jpg";
import synfuturesBg from "@/assets/campaigns/synfutures-billboard.jpg";

const cases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    bgImage: bnbBg,
    slug: "bnb-chain",
    result: "+340% Korean Trading Volume",
    category: "Infrastructure",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage.",
    featured: true,
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    bgImage: kucoinBg,
    slug: "kucoin",
    result: "50K+ New Korean Users",
    category: "Exchange",
    description: "Successful market launch with Korean trader-focused campaigns and ambassador partnerships.",
    featured: true,
  },
  {
    name: "Sahara AI",
    logo: saharaAiLogo,
    bgImage: saharaAiBg,
    slug: "sahara-ai",
    result: "Korean AI x Web3 Launch",
    category: "AI",
    description: "AI blockchain platform launch with Korean developer community and enterprise partnerships.",
  },
  {
    name: "Mantra",
    logo: mantraLogo,
    bgImage: mantraBg,
    slug: "mantra",
    result: "Korean RWA Expansion",
    category: "RWA",
    description: "Real World Assets platform expansion targeting Korean institutional investors.",
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    bgImage: peaqBg,
    slug: "peaq",
    result: "#1 DePIN in Korea",
    category: "DePIN",
    description: "Established thought leadership in DePIN space with IoT partnerships and developer community.",
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    bgImage: storyBg,
    slug: "story-protocol",
    result: "5K+ Korean Creators",
    category: "IP Protocol",
    description: "Korean content creator onboarding for IP tokenization platform targeting webtoon and music artists.",
  },
  {
    name: "MegaETH",
    logo: megaethLogo,
    bgImage: megaethBg,
    slug: "megaeth",
    result: "+500% Korean Engagement",
    category: "Layer 2",
    description: "Pre-launch hype building and community engagement ahead of mainnet launch.",
  },
  {
    name: "Tria",
    logo: triaLogo,
    bgImage: triaBg,
    slug: "tria",
    result: "30K+ Korean Wallets",
    category: "Wallet",
    description: "User acquisition campaign with simplified onboarding for Korean Web3 wallet users.",
  },
  {
    name: "Bybit",
    logo: bybitLogo,
    bgImage: bybitBg,
    slug: "bybit",
    result: "#2 Korean Exchange Traffic",
    category: "Exchange",
    description: "Multi-channel user acquisition and VIP program for Korean high-volume traders.",
  },
  {
    name: "FOGO",
    logo: fogoLogo,
    bgImage: fogoBg,
    slug: "fogo",
    result: "Fogo Fest 2025 Success",
    category: "Layer 1",
    description: "Launch event and community activation for FOGO ecosystem in Korean market.",
  },
  {
    name: "zkPass",
    logo: zkpassLogo,
    bgImage: zkpassBg,
    slug: "zkpass",
    result: "The Verifiable Nights",
    category: "Privacy",
    description: "Privacy-focused Web3 identity solution launch with Korean developer community.",
  },
  {
    name: "SynFutures",
    logo: synfuturesLogo,
    bgImage: synfuturesBg,
    slug: "synfutures",
    result: "Gangnam Billboard Promotion",
    category: "DeFi",
    description: "High-visibility billboard campaign in Gangnam district for Korean market awareness.",
  },
];

const allCategories = ["All", ...Array.from(new Set(cases.map(c => c.category)))];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCases = activeCategory === "All" 
    ? cases 
    : cases.filter(c => c.category === activeCategory);

  const featuredProjects = filteredCases.filter(c => c.featured);
  const regularProjects = filteredCases.filter(c => !c.featured);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section - Minimal with Featured Project Preview */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative min-h-[60vh] flex overflow-hidden rounded-xl sm:rounded-2xl bg-[#0A0A0A]">
          {/* Left: Title */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20 relative z-10">
            <motion.span 
              className="text-xs text-amber-400/70 mb-4 tracking-widest"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              [ Portfolio ]
            </motion.span>
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Our<br />
              W<span className="serif-italic text-amber-400">o</span>rk
            </motion.h1>
            <motion.p 
              className="text-white/50 mt-6 max-w-md text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {cases.length} successful Korean market entries across {allCategories.length - 1} categories.
            </motion.p>
          </div>

          {/* Right: Featured Project Preview */}
          {featuredProjects[0] && (
            <Link 
              to={`/projects/${featuredProjects[0].slug}`}
              className="hidden lg:block w-1/2 relative group"
            >
              <motion.div 
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <img 
                  src={featuredProjects[0].bgImage} 
                  alt={featuredProjects[0].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                
                {/* Featured Label */}
                <div className="absolute top-8 right-8 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs">
                  Featured Project
                </div>
                
                {/* Project Info */}
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-amber-400 text-sm mb-2">{featuredProjects[0].result}</p>
                  <h3 className="text-white text-2xl font-medium mb-2 group-hover:text-amber-50 transition-colors">
                    {featuredProjects[0].name}
                  </h3>
                  <span className="text-white/40 text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          )}
        </section>
      </main>

      {/* Fixed Filter Bar */}
      <section className="sticky top-16 z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-y border-amber-500/20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Desktop Categories */}
            <div className="hidden md:flex items-center gap-2 overflow-x-auto">
              {allCategories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? "bg-amber-500 text-black font-medium" 
                      : "text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-2 opacity-50">
                      {cases.filter(c => c.category === cat).length}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 text-white/70 px-4 py-2 border border-white/10 rounded-full"
            >
              <Filter className="w-4 h-4" />
              {activeCategory}
            </button>

            {/* Results Count */}
            <span className="text-amber-400/60 text-sm">
              {filteredCases.length} Projects
            </span>
          </div>

          {/* Mobile Filter Dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                className="md:hidden pb-4 flex flex-wrap gap-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setShowFilters(false); }}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      activeCategory === cat 
                        ? "bg-amber-500 text-black" 
                        : "text-white/60 border border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="bg-[#0A0A0A] py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredCases.map((project, index) => {
                // Determine card size for bento layout
                const isLarge = project.featured || index === 0;
                const isWide = index === 3 || index === 7;
                
                return (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`
                      ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
                      ${isWide && !isLarge ? "md:col-span-2" : ""}
                    `}
                  >
                    <Link
                      to={`/projects/${project.slug}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="group block relative h-full overflow-hidden rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all duration-500"
                    >
                      {/* Background Image */}
                      <div className={`relative ${isLarge ? "aspect-square md:aspect-auto md:h-full md:min-h-[500px]" : "aspect-[4/3]"}`}>
                        <img 
                          src={project.bgImage} 
                          alt={project.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs">
                          {project.category}
                        </div>

                        {/* Featured Badge */}
                        {project.featured && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs">
                            ★ Featured
                          </div>
                        )}

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                          {/* Logo */}
                          <img 
                            src={project.logo} 
                            alt={project.name}
                            className="h-8 md:h-10 mb-4 brightness-0 invert opacity-80"
                          />
                          
                          {/* Result */}
                          <p className="text-amber-400 text-sm md:text-base mb-2 font-medium">
                            {project.result}
                          </p>
                          
                          {/* Title */}
                          <h3 className={`text-white font-medium mb-3 ${isLarge ? "text-2xl md:text-3xl" : "text-xl"}`}>
                            {project.name}
                          </h3>
                          
                          {/* Description - only on large cards */}
                          {isLarge && (
                            <p className="text-white/50 text-sm mb-4 max-w-md">
                              {project.description}
                            </p>
                          )}
                          
                          {/* CTA */}
                          <span className="inline-flex items-center gap-2 text-white/60 text-sm group-hover:text-amber-400 group-hover:gap-3 transition-all">
                            View Case Study
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-[#0A0A0A] border-t border-amber-500/20 py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Ready to be our next <span className="text-amber-400">success story</span>?
              </h2>
              <p className="text-white/50 max-w-xl">
                We've helped 18+ projects enter the Korean market. Let's discuss how we can help you.
              </p>
            </div>
            <Link
              to="/contact"
              className="group flex items-center gap-3 bg-amber-500 text-black px-8 py-4 rounded-xl font-medium hover:bg-amber-400 transition-all hover:gap-4"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10">
            {[
              { value: "18+", label: "Projects Launched" },
              { value: "$6M+", label: "Token Sales" },
              { value: "120+", label: "KOL Network" },
              { value: "38+", label: "AMA Sessions" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <p className="text-3xl md:text-4xl font-bold text-amber-400">{stat.value}</p>
                <p className="text-white/50 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
