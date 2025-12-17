import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
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
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    bgImage: kucoinBg,
    slug: "kucoin",
    result: "50K+ New Korean Users",
    category: "Exchange",
    description: "Successful market launch with Korean trader-focused campaigns and ambassador partnerships.",
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

interface ProjectCardProps {
  project: typeof cases[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isLastRow = index >= Math.floor(cases.length / 2) * 2;
  const isRightColumn = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className={`group block p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.02] ${
          !isRightColumn ? "border-r border-white/10" : ""
        } ${!isLastRow ? "border-b border-white/10" : ""}`}
      >
        <div className="flex items-start gap-6">
          {/* Image */}
          <motion.div 
            className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={project.bgImage} 
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 text-white/40 text-xs mb-2">
              <span className="uppercase tracking-wider">{project.category}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-3 line-clamp-2 group-hover:text-white/60 transition-colors">
              {project.description}
            </p>
            <p className="text-primary font-medium text-sm mb-4">
              {project.result}
            </p>
            <div className="flex items-center gap-2 text-white/40 group-hover:text-primary transition-colors text-sm">
              View case study
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section - Simple centered like homepage */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative min-h-[70vh] flex flex-col justify-center items-center overflow-hidden rounded-xl sm:rounded-2xl bg-[#0A0A0A]">
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.35)" }}
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = 0;
              }}
            >
              <source src="/videos/projects-background.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-transparent to-[#0A0A0A]" />
          </div>

          {/* Content - Centered like homepage */}
          <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
            <motion.span 
              className="text-xs text-white/50 mb-6 block tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              [ Projects ]
            </motion.span>
            <motion.h1 
              className="text-[14vw] md:text-[120px] lg:text-[140px] font-light text-white leading-[0.85] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Our W<span className="serif-italic">o</span>rk
            </motion.h1>
            <motion.p 
              className="text-lg text-white/60 max-w-2xl mx-auto mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Case studies walking through the challenge, our approach, and the outcomes across GTM, KOLs, PR, and social media.
            </motion.p>
            <motion.div 
              className="flex items-center justify-center gap-4 text-white/40 text-sm mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>{cases.length} Projects</span>
              <span>•</span>
              <span>8 Categories</span>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Projects Grid Section with Header */}
      <section className="bg-[#0A0A0A]" id="projects-grid">
        <div className="border-t border-white/10">
          {/* Section Header */}
          <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Case Studies</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
              {cases.length} Projects
            </span>
          </div>
          
          {/* Grid Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Left: Projects Grid */}
            <div className="w-full lg:w-2/3 lg:border-r lg:border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {cases.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ))}
              </div>
            </div>

            {/* Right: Sticky CTA Panel */}
            <motion.div
              className="w-full lg:w-1/3 p-8 md:p-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Track Record
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                We've helped 18+ global Web3 projects successfully enter and scale in the Korean market. From infrastructure to DeFi, exchange to AI.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-6 py-3 text-sm font-medium hover:bg-white/90 transition-all duration-300 w-fit mb-12 hover:gap-3"
              >
                START YOUR PROJECT
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="pt-8 border-t border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-3xl font-bold text-white">18+</p>
                    <p className="text-white/50 text-sm">Projects Launched</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-3xl font-bold text-white">$6M+</p>
                    <p className="text-white/50 text-sm">Token Sales</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;