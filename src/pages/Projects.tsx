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

const GoldShape = () => (
  <motion.div
    className="relative w-40 h-40 mx-auto"
    animate={{ rotateY: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <div
      className="absolute inset-0 rounded-3xl"
      style={{
        background: "linear-gradient(135deg, #C4A35A 0%, #F5E6C8 50%, #C4A35A 100%)",
        transform: "rotateX(20deg) rotateZ(-10deg)",
        boxShadow: "0 20px 40px rgba(196, 163, 90, 0.3)"
      }}
    />
    <div
      className="absolute inset-4 rounded-2xl"
      style={{
        background: "linear-gradient(225deg, #F5E6C8 0%, #C4A35A 100%)",
        transform: "rotateX(20deg) rotateZ(-10deg) translateZ(20px)"
      }}
    />
  </motion.div>
);

interface ProjectCardProps {
  project: typeof cases[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isLastRow = index >= Math.floor(cases.length / 2) * 2;
  const isRightColumn = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className={`group block p-8 md:p-10 transition-colors duration-300 hover:bg-gray-50 ${
          !isRightColumn ? "border-r border-gray-200" : ""
        } ${!isLastRow ? "border-b border-gray-200" : ""}`}
      >
        <div className="flex items-start gap-6">
          {/* Image */}
          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src={project.bgImage} 
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 text-gray-400 text-xs mb-2">
              <span className="uppercase tracking-wider">{project.category}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
              {project.name}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
              {project.description}
            </p>
            <p className="text-gray-900 font-medium text-sm mb-4">
              {project.result}
            </p>
            <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-900 transition-colors text-sm">
              View case study
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Keep dark style */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-white">
        <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-[#0A0A0A]">
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
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
          </div>

          <div className="flex-1 flex items-center relative z-10 px-4 sm:px-6 lg:px-16 py-24">
            <div className="max-w-4xl">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-white">Our </span>
                <span className="text-white">Projects</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-white/60 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Case studies walking through the challenge, our approach, and the outcomes across GTM, KOLs, PR, and social media.
              </motion.p>
            </div>
          </div>
        </section>
      </main>

      {/* Projects Grid - a41.io style 2-column layout */}
      <section className="bg-white">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Projects Grid */}
          <div className="w-full lg:w-2/3 border-r border-gray-200">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Track Record
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              We've helped 18+ global Web3 projects successfully enter and scale in the Korean market. From infrastructure to DeFi, exchange to AI.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors w-fit mb-12"
            >
              START YOUR PROJECT
              <ArrowRight className="w-4 h-4" />
            </Link>

            <GoldShape />

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-gray-900">18+</p>
                  <p className="text-gray-500 text-sm">Projects Launched</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">$6M+</p>
                  <p className="text-gray-500 text-sm">Token Sales</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
