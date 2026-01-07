import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import CTABannerSection from "@/components/CTABannerSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import { HoverExpandGallery } from "@/components/HoverExpandGallery";
import { ArrowRight, Calendar, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
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

// Additional gallery images for hover expand gallery
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import polygonHackathon from "@/assets/campaigns/polygon-hackathon.jpg";
import polygonConnect from "@/assets/campaigns/polygon-connect.png";
import storyWorkshop from "@/assets/campaigns/story-workshop.jpg";
import openledgerInterview from "@/assets/campaigns/openledger-interview.jpg";
import openledgerHeroOfficial from "@/assets/campaigns/openledger-hero-official.png";
import seoulMetroBillboard from "@/assets/campaigns/seoul-metro-billboard.jpeg";
import seoulMetroPoster from "@/assets/campaigns/seoul-metro-poster.jpeg";
import lbankFestival from "@/assets/campaigns/lbank-festival.jpg";
import kucoinCampaign from "@/assets/campaigns/kucoin-campaign.jpg";
import kucoinOldschool from "@/assets/campaigns/kucoin-oldschool.jpg";
import ondoLogo from "@/assets/logos/ondo.svg";
import polygonLogo from "@/assets/logos/polygon.svg";

// Map gallery `src` (stored as file path strings) to bundled campaign assets.
const campaignAssetByFile: Record<string, string> = {
  "bnb-event.jpg": bnbBg,
  "kucoin-campaign.jpg": kucoinCampaign,
  "kucoin-oldschool.jpg": kucoinOldschool,
  "ondo-seminar.jpg": ondoSeminar,
  "polygon-hackathon.jpg": polygonHackathon,
  "polygon-connect.png": polygonConnect,
  "sahara-ai.jpg": saharaAiBg,
  "seoul-metro-billboard.jpeg": seoulMetroBillboard,
  "seoul-metro-poster.jpeg": seoulMetroPoster,
  "story-origin-summit.jpg": storyBg,
  "story-workshop.jpg": storyWorkshop,
  "openledger-interview.jpg": openledgerInterview,
  "openledger-hero-official.png": openledgerHeroOfficial,
  "lbank-festival.jpg": lbankFestival,
  "peaq-summit.jpg": peaqBg,
  "bybit-event.jpg": bybitBg,
  "mantra-party.jpg": mantraBg,
  "megaeth-launch.jpg": megaethBg,
  "tria-launch.jpg": triaBg,
  "zkpass-verifiable-nights.jpg": zkpassBg,
  "synfutures-billboard.jpg": synfuturesBg,
  "fogo-fest.avif": fogoBg,
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
  { value: 340, label: "Avg. Volume Increase", suffix: "%" },
  { value: 6, label: "Token Sales", prefix: "$", suffix: "M+" },
  { value: 50, label: "New Users Acquired", suffix: "K+" },
];

// Gallery images data for hover expand gallery - ALL campaign images
const galleryImages = [
  { src: storyBg, alt: "Story Protocol Origin Summit", title: "Story Origin Summit", description: "IP Protocol launch event in Seoul" },
  { src: synfuturesBg, alt: "SynFutures Billboard", title: "Gangnam Billboard", description: "High-visibility billboard campaign in Gangnam" },
  { src: peaqBg, alt: "Peaq Summit", title: "Peaq DePIN Summit", description: "DePIN thought leadership event" },
  { src: polygonHackathon, alt: "Polygon Hackathon", title: "Polygon Hackathon", description: "Developer hackathon in Seoul" },
  { src: openledgerInterview, alt: "OpenLedger Interview", title: "OpenLedger Interview", description: "Media interview session" },
  { src: seoulMetroBillboard, alt: "Seoul Metro Billboard", title: "Seoul Metro Billboard", description: "Subway advertising campaign" },
  { src: lbankFestival, alt: "LBank Festival", title: "LBank Festival", description: "Exchange partnership event" },
  { src: fogoBg, alt: "Fogo Fest", title: "Fogo Fest 2025", description: "FOGO community launch event" },
  { src: bnbBg, alt: "BNB Chain Event", title: "BNB Chain Seoul", description: "BNB Chain community event in Seoul" },
  { src: bybitBg, alt: "Bybit Event", title: "Bybit Trading Event", description: "Bybit VIP trader meetup" },
  { src: kucoinBg, alt: "KuCoin Panel", title: "KuCoin Old School Panel", description: "KuCoin crypto OG panel discussion" },
  { src: mantraBg, alt: "Mantra Party", title: "Mantra RWA Party", description: "Mantra community celebration" },
  { src: megaethBg, alt: "MegaETH Launch", title: "MegaETH Launch", description: "MegaETH pre-launch event" },
  { src: saharaAiBg, alt: "Sahara AI Summit", title: "Sahara AI Summit", description: "AI x Web3 summit in Korea" },
  { src: triaBg, alt: "Tria Launch", title: "Tria Wallet Launch", description: "Tria wallet Korean launch" },
  { src: zkpassBg, alt: "zkPass Verifiable Nights", title: "The Verifiable Nights", description: "zkPass privacy event" },
  { src: seoulMetroPoster, alt: "Seoul Metro Poster", title: "Seoul Metro Poster", description: "Subway poster campaign" },
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

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group rounded-lg sm:rounded-xl md:rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30 active:scale-[0.98]">
      {/* Image */}
      <Link
        to={`/projects/${project.slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className="block aspect-[16/10] overflow-hidden"
      >
        <img 
          src={project.bgImage} 
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      {/* Content */}
      <div className="p-2 sm:p-3 md:p-4 lg:p-5">
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-1.5 md:mb-2">
          <span className="text-[8px] sm:text-[10px] md:text-label uppercase tracking-wider font-medium text-muted-foreground truncate">{project.category}</span>
        </div>
        <Link
          to={`/projects/${project.slug}`}
          onClick={() => window.scrollTo(0, 0)}
        >
          <h3 className="text-xs sm:text-sm md:text-body-lg font-semibold text-foreground mb-1 sm:mb-1.5 md:mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {project.name}
          </h3>
        </Link>
        <p className="text-[10px] sm:text-xs md:text-body-sm text-foreground/80 font-medium mb-1 sm:mb-1.5 md:mb-2 line-clamp-1">
          {project.result}
        </p>
        <p className="text-[10px] sm:text-xs md:text-body-sm text-muted-foreground leading-relaxed line-clamp-2 mb-2 sm:mb-3 md:mb-4 hidden sm:block">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-3">
          <Link
            to={`/projects/${project.slug}`}
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[8px] sm:text-[10px] md:text-caption text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="hover:underline underline-offset-4">View</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hidden sm:flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-caption font-medium text-foreground/70 border border-border/50 rounded-full hover:border-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all duration-300 active:scale-95"
            >
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Website</span>
            </a>
          )}
        </div>
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

const Projects = () => {
  usePageMeta(
    "Case Studies",
    "View our portfolio of successful Korean Web3 marketing campaigns. 18+ global projects launched in Korea including Polygon, Ondo, and Story Protocol.",
    "/projects"
  );
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
        };
      })
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
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6 lg:p-8">
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
      
      {/* Gallery Section - 02 */}
      <section className="scroll-reveal bg-[#0A0A0A]" id="gallery">
        <div className="border-t border-border">
          <div className="flex items-baseline justify-between p-4 sm:p-6 md:px-10 md:py-6 border-b border-border">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-muted-foreground font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-foreground">Gallery</h2>
            </div>
            <span className="text-xs text-muted-foreground tracking-wider hidden sm:flex items-center gap-2 px-3 py-1 border border-border rounded-full">
              Campaign Highlights
            </span>
          </div>
          
          <div className="py-8 md:py-12">
            <HoverExpandGallery images={galleryImages} />
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
