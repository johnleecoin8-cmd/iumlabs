import { useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import CTABannerSection from "@/components/CTABannerSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import SEOHead from "@/components/SEOHead";

import { ArrowRight, Calendar, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountUp } from "@/hooks/useCountUp";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

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
import kucoinBg from "@/assets/campaigns/kucoin-oldschool.jpg";
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

// Additional images for featured projects
import storyWorkshop from "@/assets/campaigns/story-workshop.jpg";
import openledgerInterview from "@/assets/campaigns/openledger-interview.jpg";
import openledgerHeroOfficial from "@/assets/campaigns/openledger-hero-official.png";
import kucoinCampaign from "@/assets/campaigns/kucoin-campaign.jpg";
import kucoinNew from "@/assets/campaigns/kucoin-new.jpg";
import openledgerEvent from "@/assets/campaigns/openledger-event.jpg";
import mantraEvent from "@/assets/campaigns/mantra.jpg";

// Map gallery `src` (stored as file path strings) to bundled campaign assets.
const campaignAssetByFile: Record<string, string> = {
  "bnb-event.jpg": bnbBg,
  "kucoin-campaign.jpg": kucoinCampaign,
  "sahara-ai.jpg": saharaAiBg,
  "story-origin-summit.jpg": storyBg,
  "story-workshop.jpg": storyWorkshop,
  "openledger-interview.jpg": openledgerInterview,
  "openledger-hero-official.png": openledgerHeroOfficial,
  "peaq-summit.jpg": peaqBg,
  "bybit-event.jpg": bybitBg,
  "mantra-party.jpg": mantraBg,
  "megaeth-launch.jpg": megaethBg,
  "tria-launch.jpg": triaBg,
  "zkpass-verifiable-nights.jpg": zkpassBg,
  "synfutures-billboard.jpg": synfuturesBg,
  "fogo-fest.avif": fogoBg,
  "kucoin-new.jpg": kucoinNew,
  "openledger-event.jpg": openledgerEvent,
  "mantra.jpg": mantraEvent,
};

const resolveGallerySrcToAsset = (src?: string | null) => {
  if (!src) return null;
  const file = src.split("/").pop();
  if (!file) return null;
  return campaignAssetByFile[file] ?? null;
};

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
  website_url: string | null;
}

const stats = [
  { value: 18, label: "Projects Launched", suffix: "+" },
  { value: 130, label: "Avg. Impression", suffix: "K" },
  { value: 8, label: "Client Valuation", prefix: "$", suffix: "B+" },
  { value: 2, label: "Avg. Community Users", suffix: "K+" },
];


// Stat Item Component
const StatItem = ({ 
  value, 
  label, 
  prefix = "", 
  suffix = "",
  isVisible,
  delay 
}: { 
  value: number; 
  label: string; 
  prefix?: string; 
  suffix?: string;
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
    <div className="text-center group">
      <div className="text-lg sm:text-xl md:text-3xl font-bold text-white mb-0.5 group-hover:text-primary transition-colors">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[10px] sm:text-caption text-white/50 font-light group-hover:text-white/70 transition-colors">
        {label}
      </div>
    </div>
  );
};

// Project Card Component
interface ProjectCardProps {
  project: { name: string; slug: string; description: string; result: string; category: string; logo?: string; bgImage: string; websiteUrl?: string };
  index: number;
  totalCount: number;
}

const ProjectCard = ({ project, index, totalCount }: ProjectCardProps) => {
  // 3-column grid border logic
  const isRightColumn = index % 3 === 2;
  const rowCount = Math.ceil(totalCount / 3);
  const currentRow = Math.floor(index / 3);
  const isLastRow = currentRow === rowCount - 1;

  const { ref, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '30px',
    triggerOnce: true 
  });

  return (
    <div 
      ref={ref}
      className={cn(
        "h-full transition-all duration-500 ease-out will-change-transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: `${(index % 6) * 50}ms` }}
    >
      <div
        className={cn(
          "group block p-3 sm:p-4 md:p-5 transition-all duration-300 hover:bg-secondary/50 h-full",
          !isRightColumn && "lg:border-r border-border",
          !isLastRow && "border-b border-border"
        )}
      >
        <Link
          to={`/projects/${project.slug}`}
          onClick={() => window.scrollTo(0, 0)}
          className="block active:scale-[0.98] transition-transform duration-150"
        >
          {/* Image - Full width on top */}
          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-3 group-hover:shadow-lg group-hover:shadow-foreground/10 transition-all duration-300">
            <img
              src={project.bgImage}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[9px] sm:text-[10px] uppercase tracking-wider">{project.category}</span>
              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-foreground/80 transition-colors line-clamp-1">
              {project.name}
            </h3>
            <p className="text-foreground/80 font-medium text-[10px] sm:text-xs line-clamp-1">
              {project.result}
            </p>
            <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed line-clamp-2 hidden sm:block">
              {project.description}
            </p>
          </div>

          {/* View case link */}
          <div className="flex items-center gap-1.5 mt-3 text-muted-foreground group-hover:text-foreground transition-colors text-[10px] sm:text-xs">
            <span className="group-hover:underline underline-offset-4">View case</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
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
    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
      <button
        onClick={() => onCategoryChange("All")}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-medium rounded-full border transition-all duration-300 active:scale-95 min-h-[32px] sm:min-h-[36px] ${
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
          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-medium rounded-full border transition-all duration-300 active:scale-95 min-h-[32px] sm:min-h-[36px] ${
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

// Logo mapping for gallery section
const logoMap: Record<string, string | null> = {
  "bnb-chain": bnbLogo,
  "kucoin": kucoinLogo,
  "sahara-ai": saharaAiLogo,
  "mantra": mantraLogo,
  "peaq": peaqLogo,
  "story-protocol": storyLogo,
  "megaeth": megaethLogo,
  "tria": triaLogo,
  "bybit": bybitLogo,
  "fogo": fogoLogo,
  "zkpass": zkpassLogo,
  "synfutures": synfuturesLogo,
};

// Video mapping for projects that have videos
const videoMap: Record<string, string | null> = {
  "story-protocol": "/videos/projects/story-hero.mp4",
  "mantra": "/videos/projects/mantra-hero.mp4",
  "bybit": "/videos/projects/bybit-hero.mp4",
  "peaq": "/videos/projects/peaq-hero.mp4",
  "bnb-chain": "/videos/projects/bnb-hero.mp4",
  "sahara-ai": "/videos/projects/sahara-hero.mp4",
  "kucoin": "/videos/projects/kucoin-hero.mp4",
};

interface SelectedWorkProject {
  name: string;
  slug: string;
  category: string;
  result: string;
  bgImage: string;
  logo: string | null;
  video: string | null;
}

const SelectedWorkSection = ({ projects }: { projects: SelectedWorkProject[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseEnter = (index: number) => {
    if (!isDragging) {
      setHoveredIndex(index);
      setActiveVideo(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setHoveredIndex(null);
      setActiveVideo(null);
    }
  };

  // Scroll progress tracking
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setHoveredIndex(null);
    setActiveVideo(null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  if (projects.length === 0) return null;

  return (
    <section ref={ref} className="scroll-reveal bg-[#0A0A0A]" id="gallery">
      <div className="border-t border-border">
        {/* Section Header - matches other sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-border"
        >
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-muted-foreground font-mono tracking-widest">02</span>
            <h2 className="text-lg md:text-xl font-medium text-foreground">Gallery</h2>
          </div>
          <span className="text-xs text-muted-foreground tracking-wider hidden sm:flex items-center gap-2 px-3 py-1 border border-border rounded-full">
            ← Drag / Scroll →
          </span>
        </motion.div>
        
        {/* Gallery Content */}
        <div className="py-4 md:py-6 relative">
          {/* Horizontal Scroll Container */}
          <motion.div 
            ref={scrollRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className={`overflow-x-auto scrollbar-hide select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => { handleMouseUp(); handleMouseLeave(); }}
            onMouseMove={handleMouseMove}
          >
            <div className="flex gap-1 px-6 md:px-10 pb-4" style={{ width: 'max-content' }}>
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + Math.min(i, 10) * 0.03 }}
                  className="relative overflow-hidden group"
                  style={{ 
                    width: hoveredIndex === null ? '180px' : hoveredIndex === i ? '400px' : '100px',
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: isDragging ? 'none' : 'auto'
                  }}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative h-[450px] md:h-[500px] overflow-hidden">
                    {/* Background Image */}
                    <img
                      src={project.bgImage}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                      draggable={false}
                    />

                    {/* Video (plays on hover) */}
                    {project.video && (
                      <video
                        src={project.video}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          activeVideo === i ? 'opacity-100' : 'opacity-0'
                        }`}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 transition-all duration-500 ${
                      hoveredIndex === i 
                        ? 'bg-gradient-to-t from-black via-black/40 to-transparent' 
                        : 'bg-black/70'
                    }`} />

                    {/* Vertical Title (collapsed state) */}
                    <AnimatePresence>
                      {hoveredIndex !== i && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="text-white/80 font-bold text-sm tracking-[0.3em] whitespace-nowrap rotate-90 origin-center">
                            {project.name.toUpperCase()}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {hoveredIndex === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
                        >
                          {/* Category Tag */}
                          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-3">
                            {project.category}
                          </span>

                          {/* Logo */}
                          <div className="mb-4">
                            {project.logo ? (
                              <img
                                src={project.logo}
                                alt={project.name}
                                className="h-8 md:h-10 w-auto object-contain brightness-0 invert"
                                draggable={false}
                              />
                            ) : (
                              <span className="text-white font-black text-xl md:text-2xl tracking-tight">
                                {project.name}
                              </span>
                            )}
                          </div>

                          {/* Result Metric */}
                          <div className="mb-6">
                            <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent leading-tight">
                              {project.result}
                            </span>
                          </div>

                          {/* View Project Button */}
                          <Link
                            to={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs tracking-widest transition-colors group/link"
                            onClick={(e) => isDragging && e.preventDefault()}
                          >
                            <span>VIEW PROJECT</span>
                            <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Panel Border */}
                    <div className="absolute inset-0 border-r border-white/5 pointer-events-none" />
                  </div>
                </motion.div>
              ))}
              
              {/* View All Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
                style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
              >
                <Link
                  to="#cases"
                  onClick={(e) => {
                    if (isDragging) {
                      e.preventDefault();
                      return;
                    }
                    e.preventDefault();
                    document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative flex items-center justify-center w-[160px] h-[450px] md:h-[500px] border border-white/20 hover:border-primary/50 hover:bg-white/5 transition-all group"
                >
                  <div className="text-center">
                    <ArrowRight className="w-8 h-8 text-white/40 group-hover:text-primary mx-auto mb-3 group-hover:translate-x-1 transition-all" />
                    <span className="text-white/60 group-hover:text-white text-sm font-medium transition-colors">
                      View All
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="px-6 md:px-10 mt-6"
          >
            <div className="relative h-[2px] bg-border rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                style={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-muted-foreground text-[10px] tracking-wider">01</span>
              <span className="text-muted-foreground text-[10px] tracking-wider">{String(projects.length).padStart(2, '0')}</span>
            </div>
          </motion.div>

          {/* Scroll Hint Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  // Fetch projects from database + first gallery image (display_order asc)
  const { data: dbProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      if (!projects || projects.length === 0) return [];

      const projectIds = projects.map((p) => p.id);

      const { data: galleryRows, error: galleryError } = await supabase
        .from("project_gallery")
        .select("project_id, src, display_order")
        .in("project_id", projectIds)
        .order("display_order", { ascending: true });

      if (galleryError) throw galleryError;

      const firstGalleryByProject = new Map<string, string>();
      for (const row of galleryRows ?? []) {
        if (!firstGalleryByProject.has(row.project_id)) {
          firstGalleryByProject.set(row.project_id, row.src);
        }
      }

      return projects.map((p) => ({
        ...p,
        first_gallery_src: firstGalleryByProject.get(p.id) ?? null,
      }));
    },
  });

  // Use DB projects if available, otherwise fallback
  const cases = dbProjects && dbProjects.length > 0
    ? dbProjects.map((p: Project & { first_gallery_src?: string | null }) => {
        const galleryAsset = resolveGallerySrcToAsset(p.first_gallery_src ?? null);
        const fallback = fallbackCases.find((f) => f.slug === p.slug);

        return {
          name: p.name,
          slug: p.slug,
          description: p.description || "",
          result: p.result || "",
          category: p.category || "",
          bgImage: galleryAsset || p.background_url || fallback?.bgImage || "",
          websiteUrl: p.website_url || "",
          logo: fallback?.logo || null,
        };
      })
    : fallbackCases.map(f => ({ ...f, logo: f.logo }));

  // Transform cases to SelectedWorkProject format
  const selectedWorkProjects: SelectedWorkProject[] = cases.map(c => ({
    name: c.name,
    slug: c.slug,
    category: c.category,
    result: c.result,
    bgImage: c.bgImage,
    logo: logoMap[c.slug] || null,
    video: videoMap[c.slug] || null,
  }));

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
      <SEOHead
        title="Web3 GTM Case Studies | ium Labs Korea Portfolio"
        description="View our portfolio of 18+ successful Korean crypto and Web3 marketing campaigns. Real results from Polygon, Ondo, Story Protocol, and more blockchain projects launched in Korea."
        path="/projects"
        keywords={['Web3 Case Studies', 'Crypto Marketing Portfolio', 'Korean Blockchain Projects', 'GTM Success Stories']}
      />
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
                <source src="/videos/projects-hero.mp4" type="video/mp4" />
              </video>
              
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
            </div>

            {/* Main Content - Centered */}
            <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto text-center">
                {/* Main Headline */}
                <h1 className="font-sans text-display-hero mb-4 sm:mb-6 mt-8 sm:mt-12">
                  <span className="text-white">Our </span>
                  <span className="text-white/90">Case </span>
                  <span className="text-white">Studies</span>
                </h1>

                {/* Subtext */}
                <p className="text-body-lg text-white/60 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                  Real results from <span className="text-white font-medium">18+ global Web3 projects</span> successfully entering and scaling in the Korean market.
                </p>

                {/* CTA Button */}
                <div className="flex flex-col items-center gap-3">
                  <a
                    href={brand.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group primary-cta-dark inline-flex items-center gap-3 px-8 py-4 font-medium text-sm rounded-full active:scale-[0.98] min-h-[48px]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Discuss Your Project</span>
                  </a>
                  <p className="text-xs text-white/50">
                    Free consultation • Want results like these?
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="relative z-10 py-4 sm:py-6">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  {stats.map((stat, index) => (
                    <StatItem 
                      key={index}
                      value={stat.value}
                      label={stat.label}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      isVisible={isStatsVisible}
                      delay={index * 100}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 z-10 flex items-center gap-2 sm:gap-3">
              <span className="text-white/40 text-xs sm:text-sm font-medium">scroll</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 animate-bounce" />
            </div>
          </div>
        </div>
      </main>
      
      {/* Cases Section - 01 */}
      <section className="scroll-reveal bg-[#121212]" id="cases">
        <div className="border-t border-border">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-border">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-muted-foreground font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-foreground">Case Studies</h2>
            </div>
            <span className="text-xs text-muted-foreground tracking-wider hidden sm:block px-3 py-1 border border-border rounded-full">
              {filteredCases.length} Projects
            </span>
          </div>
          
          {/* Category Filter - integrated below header */}
          <div className="p-4 sm:p-6 md:px-10 md:py-6 border-b border-border/50">
            <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>
      
      {/* Selected Work Section - Horizontal Scroll Gallery */}
      <SelectedWorkSection projects={selectedWorkProjects} />
      
      
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
