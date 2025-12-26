import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import CTABannerSection from "@/components/CTABannerSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import { ArrowRight, Calendar, ChevronDown, Filter, Rocket, TrendingUp, Users, DollarSign, Zap, Globe, Target, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCountUp } from "@/hooks/useCountUp";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";

// Import logos as fallbacks
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

// Import campaign images for backgrounds as fallbacks
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

// Hardcoded fallback data
const fallbackCases = [
  { name: "BNB Chain", logo: bnbLogo, bgImage: bnbBg, slug: "bnb-chain", result: "+340% Korean Trading Volume", category: "Infrastructure", description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage." },
  { name: "KuCoin", logo: kucoinLogo, bgImage: kucoinBg, slug: "kucoin", result: "50K+ New Korean Users", category: "Exchange", description: "Successful market launch with Korean trader-focused campaigns and ambassador partnerships." },
  { name: "Sahara AI", logo: saharaAiLogo, bgImage: saharaAiBg, slug: "sahara-ai", result: "Korean AI x Web3 Launch", category: "AI", description: "AI blockchain platform launch with Korean developer community and enterprise partnerships." },
  { name: "Mantra", logo: mantraLogo, bgImage: mantraBg, slug: "mantra", result: "Korean RWA Expansion", category: "RWA", description: "Real World Assets platform expansion targeting Korean institutional investors." },
  { name: "Peaq", logo: peaqLogo, bgImage: peaqBg, slug: "peaq", result: "#1 DePIN in Korea", category: "DePIN", description: "Established thought leadership in DePIN space with IoT partnerships and developer community." },
  { name: "Story Protocol", logo: storyLogo, bgImage: storyBg, slug: "story-protocol", result: "5K+ Korean Creators", category: "IP Protocol", description: "Korean content creator onboarding for IP tokenization platform targeting webtoon and music artists." },
  { name: "MegaETH", logo: megaethLogo, bgImage: megaethBg, slug: "megaeth", result: "+500% Korean Engagement", category: "Layer 2", description: "Pre-launch hype building and community engagement ahead of mainnet launch." },
  { name: "Tria", logo: triaLogo, bgImage: triaBg, slug: "tria", result: "30K+ Korean Wallets", category: "Wallet", description: "User acquisition campaign with simplified onboarding for Korean Web3 wallet users." },
  { name: "Bybit", logo: bybitLogo, bgImage: bybitBg, slug: "bybit", result: "#2 Korean Exchange Traffic", category: "Exchange", description: "Multi-channel user acquisition and VIP program for Korean high-volume traders." },
  { name: "FOGO", logo: fogoLogo, bgImage: fogoBg, slug: "fogo", result: "Fogo Fest 2025 Success", category: "Layer 1", description: "Launch event and community activation for FOGO ecosystem in Korean market." },
  { name: "zkPass", logo: zkpassLogo, bgImage: zkpassBg, slug: "zkpass", result: "The Verifiable Nights", category: "Privacy", description: "Privacy-focused Web3 identity solution launch with Korean developer community." },
  { name: "SynFutures", logo: synfuturesLogo, bgImage: synfuturesBg, slug: "synfutures", result: "Gangnam Billboard Promotion", category: "DeFi", description: "High-visibility billboard campaign in Gangnam district for Korean market awareness." },
];

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  result: string | null;
  category: string | null;
  logo_url: string | null;
  background_url: string | null;
}

const stats = [
  { value: 18, label: "Successful Launches", suffix: "+", icon: Rocket },
  { value: 340, label: "Average Growth", suffix: "%", icon: TrendingUp },
  { value: 6, label: "Token Sale Raised", prefix: "$", suffix: "M+", icon: DollarSign },
  { value: 50, label: "Korean Users Onboarded", suffix: "K+", icon: Users },
];

// Stat Item Component
const StatItem = ({ 
  value, 
  label, 
  prefix = "", 
  suffix = "",
  icon: Icon,
  isVisible,
  delay 
}: { 
  value: number; 
  label: string; 
  prefix?: string; 
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
  isVisible: boolean;
  delay: number;
}) => {
  const count = useCountUp({
    end: value,
    isVisible,
    delay,
    duration: 2000,
  });
  
  return (
    <motion.div 
      className="text-center p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (delay + 600) / 1000, duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-2 sm:mb-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
        </div>
      </div>
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/50 font-light">
        {label}
      </div>
    </motion.div>
  );
};

// Project Card Component
interface ProjectCardProps {
  project: { name: string; slug: string; description: string; result: string; category: string; logo?: string; bgImage: string };
  index: number;
  totalCount: number;
}

const ProjectCard = ({ project, index, totalCount }: ProjectCardProps) => {
  const isLastRow = index >= Math.floor((totalCount - 1) / 2) * 2;
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
        className={`group block p-5 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 hover:bg-secondary/50 active:bg-secondary/70 ${
          !isRightColumn ? "sm:border-r border-border" : ""
        } ${!isLastRow ? "border-b border-border" : ""}`}
      >
        <div className="flex items-start gap-4 sm:gap-6">
          {/* Image */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 group-hover:shadow-lg group-hover:shadow-foreground/10 transition-all duration-300">
            <img 
              src={project.bgImage} 
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 text-muted-foreground text-[11px] sm:text-xs mb-1 sm:mb-2">
              <span className="uppercase tracking-wider">{project.category}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 group-hover:text-foreground/80 transition-colors">
              {project.name}
            </h3>
            <p className="text-foreground font-medium text-sm mb-1 sm:mb-2">
              {project.result}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 hidden sm:block">
              {project.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors text-sm mt-3 sm:mt-4 min-h-[44px] sm:min-h-0">
          <span className="group-hover:underline underline-offset-4">View case study</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};

// Category Filter Component
const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: { 
  categories: string[]; 
  activeCategory: string; 
  onCategoryChange: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <button
        onClick={() => onCategoryChange("All")}
        className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full border transition-all duration-300 ${
          activeCategory === "All"
            ? "bg-foreground text-background border-foreground"
            : "bg-transparent text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full border transition-all duration-300 ${
            activeCategory === category
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const Projects = () => {
  usePageTitle("Projects");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  // Fetch projects from Supabase, fallback to hardcoded data
  const { data: dbProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });

  // Use DB projects if available, otherwise fallback
  const cases = dbProjects && dbProjects.length > 0
    ? dbProjects.map(p => ({
        name: p.name,
        slug: p.slug,
        description: p.description || '',
        result: p.result || '',
        category: p.category || '',
        bgImage: p.background_url || fallbackCases.find(f => f.slug === p.slug)?.bgImage || '',
      }))
    : fallbackCases;

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(cases.map(c => c.category))].filter(Boolean);
    return cats.sort();
  }, [cases]);

  // Filter projects by category
  const filteredCases = useMemo(() => {
    if (activeCategory === "All") return cases;
    return cases.filter(c => c.category === activeCategory);
  }, [cases, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Homepage Style */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-background" id="hero">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="relative min-h-[calc(100vh-2rem)] flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl">
            {/* Background Layer - Video */}
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
                  setTimeout(() => setIsStatsVisible(true), 800);
                }}
              >
                <source src="/videos/projects-background.mp4" type="video/mp4" />
              </video>
              
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
            </div>

            {/* Main Content - Centered */}
            <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto text-center">
                {/* Main Headline */}
                <motion.h1 
                  className="font-sans text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] font-bold leading-[1.1] tracking-[-0.02em] mb-6 sm:mb-8 mt-8 sm:mt-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="text-white">Proven </span>
                  <span className="text-white/90">Results </span>
                  <span className="text-white">in Korea</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 font-light tracking-wide leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  We don't just promise—<span className="text-white font-medium">we deliver measurable outcomes</span>. See how global Web3 projects achieved real growth in the Korean market.
                </motion.p>

                {/* CTA Button */}
                <motion.a
                  href={brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  <Calendar className="w-4 h-4" />
                  <span>Start Your Project</span>
                </motion.a>
              </div>
            </div>

            {/* Stats Section */}
            <div className="relative z-10 py-6 sm:py-10">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {stats.map((stat, index) => (
                    <StatItem 
                      key={index}
                      value={stat.value}
                      label={stat.label}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      icon={stat.icon}
                      isVisible={isStatsVisible}
                      delay={index * 100}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 z-10 flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-white/40 text-xs sm:text-sm font-medium">scroll</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </main>
      
      {/* Filter Section - 01 */}
      <section className="scroll-reveal bg-[#0F0F0F]" id="filter">
        <div className="border-t border-border">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-border">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-muted-foreground font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-foreground">Browse by Category</h2>
            </div>
            <span className="text-xs text-muted-foreground tracking-wider hidden sm:flex items-center gap-2 px-3 py-1 border border-border rounded-full">
              <Filter className="w-3 h-3" />
              {categories.length} Categories
            </span>
          </div>
          
          <div className="p-6 md:px-10 md:py-8">
            <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </div>
        </div>
      </section>
      
      {/* Cases Section - 02 */}
      <section className="scroll-reveal bg-[#121212]" id="cases">
        <div className="border-t border-border">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-border">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-muted-foreground font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-foreground">Featured Projects</h2>
            </div>
            <span className="text-xs text-muted-foreground tracking-wider hidden sm:block px-3 py-1 border border-border rounded-full">
              {filteredCases.length} Projects
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            {/* Left: Projects Grid */}
            <div className="w-full lg:w-2/3 lg:border-r border-border">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {filteredCases.map((project, index) => (
                  <ProjectCard 
                    key={project.slug} 
                    project={project} 
                    index={index} 
                    totalCount={filteredCases.length} 
                  />
                ))}
              </div>
            </div>

            {/* Right: Sticky Info Panel - Animated Visual */}
            <motion.div
              className="w-full lg:w-1/3 p-6 md:p-8 lg:p-10 flex flex-col justify-center lg:sticky lg:top-20 lg:h-fit"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Animated Floating Keywords */}
              <div className="relative h-48 mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-foreground/5 to-transparent border border-border">
                {/* Floating Tags */}
                {["DeFi", "Layer 1", "Layer 2", "NFT", "GameFi", "AI", "RWA", "DePIN"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="absolute px-3 py-1.5 text-xs font-medium rounded-full bg-foreground/10 text-foreground/70 border border-border/50"
                    style={{
                      left: `${10 + (i % 4) * 22}%`,
                      top: `${15 + Math.floor(i / 4) * 45}%`,
                    }}
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
                
                {/* Center Glow Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-foreground/20 to-foreground/5 blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>

              {/* Animated Service Icons */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Globe, label: "Korea Market", delay: 0 },
                  { icon: Target, label: "GTM Strategy", delay: 0.1 },
                  { icon: Users, label: "Community", delay: 0.2 },
                  { icon: BarChart3, label: "Analytics", delay: 0.3 },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-foreground/5 border border-border/50 hover:bg-foreground/10 transition-colors cursor-default"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay + 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <item.icon className="w-4 h-4 text-foreground/70" />
                    </motion.div>
                    <span className="text-xs font-medium text-foreground/80">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Animated Progress Indicator */}
              <div className="space-y-4 mb-8">
                <p className="text-sm text-muted-foreground">Average project success rate</p>
                <div className="relative h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-foreground/60 to-foreground rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "94%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">0%</span>
                  <motion.span
                    className="font-bold text-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 }}
                  >
                    94%
                  </motion.span>
                </div>
              </div>

              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 sm:py-3 text-sm font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 w-full sm:w-fit min-h-[48px]"
              >
                <Zap className="w-4 h-4" />
                START YOUR PROJECT
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Section - 03 */}
      <section className="scroll-reveal bg-[#0F0F0F]" id="contact">
        <ContactFormSection sectionNumber="03" />
      </section>
      
      {/* CTA Banner */}
      <CTABannerSection />
      
      {/* Footer Links */}
      <FooterLinksSection />
      
      {/* Footer */}
      <Footer />
      
      <FloatingContactButton />
    </div>
  );
};

export default Projects;