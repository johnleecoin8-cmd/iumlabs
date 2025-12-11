import { useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import logos
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";
import bybitLogo from "@/assets/logos/bybit.png";

// Import campaign images for hover preview
import bnbCampaign from "@/assets/campaigns/bnb-event.jpg";
import kucoinCampaign from "@/assets/campaigns/kucoin-campaign.jpg";
import polygonCampaign from "@/assets/campaigns/polygon-hackathon.jpg";
import ondoCampaign from "@/assets/campaigns/ondo-seminar.jpg";
import peaqCampaign from "@/assets/campaigns/peaq-summit.jpg";
import storyCampaign from "@/assets/campaigns/story-workshop.jpg";
import megaethCampaign from "@/assets/campaigns/megaeth-launch.jpg";
import triaCampaign from "@/assets/campaigns/tria-launch.jpg";
import bybitCampaign from "@/assets/campaigns/bybit-competition.jpg";

const cases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    slug: "bnb-chain",
    direction: "KOL, PR & Media",
    year: "2024",
    bgStyle: "bg-gradient-to-br from-[#F3BA2F] via-[#F0B90B] to-[#C99100]",
    decorations: "bnb",
    previewImage: bnbCampaign,
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    slug: "kucoin",
    direction: "User Acquisition, Ambassador",
    year: "2024",
    bgStyle: "bg-gradient-to-br from-[#23AF91] via-[#1A9B7F] to-[#147A63]",
    decorations: "kucoin",
    previewImage: kucoinCampaign,
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    slug: "polygon",
    direction: "Developer Relations, Events",
    year: "2024",
    bgStyle: "bg-gradient-to-br from-[#8247E5] via-[#7B3FE4] to-[#5A2D9C]",
    decorations: "polygon",
    previewImage: polygonCampaign,
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    slug: "ondo",
    direction: "Institutional, Content",
    year: "2024",
    bgStyle: "bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-[#0D1B2A]",
    decorations: "ondo",
    previewImage: ondoCampaign,
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    slug: "peaq",
    direction: "Brand, Developer Relations",
    year: "2024",
    bgStyle: "bg-gradient-to-br from-[#00E5A0] via-[#00D4AA] to-[#00A080]",
    decorations: "peaq",
    previewImage: peaqCampaign,
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    slug: "story-protocol",
    direction: "Creator Relations, Marketing",
    year: "2024",
    bgStyle: "bg-gradient-to-br from-[#FF6B6B] via-[#E5484D] to-[#C92A2A]",
    decorations: "story",
    previewImage: storyCampaign,
  },
  {
    name: "MegaETH",
    logo: megaethLogo,
    slug: "megaeth",
    direction: "Pre-Launch, Community",
    year: "2024",
    bgStyle: "bg-gradient-to-br from-[#1a1a2e] via-[#3C4DBB] to-[#627EEA]",
    decorations: "megaeth",
    previewImage: megaethCampaign,
  },
  {
    name: "Tria",
    logo: triaLogo,
    slug: "tria",
    direction: "User Acquisition, Product",
    year: "2023",
    bgStyle: "bg-gradient-to-br from-[#FF9500] via-[#FFB347] to-[#FF7F00]",
    decorations: "tria",
    previewImage: triaCampaign,
  },
  {
    name: "Bybit",
    logo: bybitLogo,
    slug: "bybit",
    direction: "Market Entry, VIP Relations",
    year: "2023",
    bgStyle: "bg-gradient-to-br from-[#F7A600] via-[#FFB800] to-[#E69500]",
    decorations: "bybit",
    previewImage: bybitCampaign,
  },
];

// Unique decorative elements for each card
const CardDecorations = ({ type }: { type: string }) => {
  switch (type) {
    case "bnb":
      return (
        <>
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="hexagons-projects" width="20" height="17.32" patternUnits="userSpaceOnUse">
                  <polygon points="10,0 20,5 20,15 10,17.32 0,15 0,5" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#hexagons-projects)" />
            </svg>
          </div>
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-radial from-yellow-200/40 to-transparent blur-2xl" />
        </>
      );
    case "kucoin":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" stroke="white" strokeWidth="0.5" fill="none" />
            <path d="M0,60 Q25,40 50,60 T100,60" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-t from-emerald-300/30 to-transparent" />
        </>
      );
    case "polygon":
      return (
        <>
          <div className="absolute top-10 right-10 w-16 h-16 rotate-45 border-2 border-white/30" />
          <div className="absolute bottom-20 left-16 w-12 h-12 rotate-45 bg-white/10" />
          <div className="absolute -top-10 left-1/3 w-40 h-40 rounded-full bg-purple-400/30 blur-3xl" />
        </>
      );
    case "ondo":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,80 L20,70 L40,75 L60,50 L80,55 L100,30" stroke="#3B82F6" strokeWidth="1" fill="none" />
          </svg>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{ 
              backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>
        </>
      );
    case "peaq":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
            <circle cx="20" cy="30" r="3" fill="#00FF9D" />
            <circle cx="80" cy="20" r="2" fill="#00FF9D" />
            <circle cx="60" cy="70" r="4" fill="#00FF9D" />
            <line x1="20" y1="30" x2="80" y2="20" stroke="#00FF9D" strokeWidth="0.5" />
            <line x1="20" y1="30" x2="60" y2="70" stroke="#00FF9D" strokeWidth="0.5" />
          </svg>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-green-400/20 blur-3xl" />
        </>
      );
    case "story":
      return (
        <>
          <div className="absolute top-8 right-8 w-20 h-28 bg-white/10 rounded-sm transform rotate-6" />
          <div className="absolute top-10 right-10 w-20 h-28 bg-white/15 rounded-sm transform rotate-3" />
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-red-300/40 to-pink-300/30" />
        </>
      );
    case "megaeth":
      return (
        <>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-blue-400/60 via-transparent to-transparent transform -rotate-2" />
          <div className="absolute top-1/3 left-0 w-3/4 h-px bg-gradient-to-r from-blue-300/40 via-transparent to-transparent" />
          <div className="absolute -top-20 right-0 w-60 h-60 bg-gradient-to-bl from-blue-400/40 to-transparent blur-2xl" />
        </>
      );
    case "tria":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 45 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={50 + 45 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
          </svg>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-gradient-to-t from-orange-300/40 to-amber-200/20" />
        </>
      );
    case "bybit":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,90 L30,70 L50,75 L70,40 L100,20" stroke="#FFD700" strokeWidth="2" fill="none" />
            <path d="M0,90 L30,70 L50,75 L70,40 L100,20 L100,100 L0,100 Z" fill="url(#goldGradient-projects)" />
            <defs>
              <linearGradient id="goldGradient-projects" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,215,0,0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </>
      );
    default:
      return null;
  }
};

// Introduction section floating tags
const introTags = [
  { label: "KOL Marketing", color: "bg-yellow-400 text-black", top: "10%", left: "5%" },
  { label: "PR & Media", color: "bg-blue-500 text-white", top: "20%", right: "8%" },
  { label: "Community Growth", color: "bg-pink-500 text-white", bottom: "25%", left: "3%" },
  { label: "GTM Strategy", color: "bg-green-500 text-white", top: "35%", left: "12%" },
  { label: "Events", color: "bg-purple-500 text-white", bottom: "35%", right: "5%" },
  { label: "VASP Compliance", color: "bg-orange-500 text-white", bottom: "15%", right: "15%" },
];

// Emoji badges
const emojiBadges = [
  { emoji: "🚀", top: "15%", right: "20%" },
  { emoji: "💡", bottom: "20%", left: "18%" },
  { emoji: "📦", top: "45%", right: "3%" },
  { emoji: "🎯", bottom: "30%", left: "8%" },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const listRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent, slug: string) => {
    if (listRef.current) {
      const rect = listRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setHoveredCase(slug);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Blue Background with Team Photo */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden bg-primary">
        {/* Blue duotone team photo placeholder */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-primary" />
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-pattern)" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pb-16 pt-32">
          <h1 className="text-[15vw] md:text-[180px] lg:text-[220px] font-light text-white leading-[0.85] tracking-tight animate-fade-up">
            Ca<span className="serif-italic">s</span>es
          </h1>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative py-24 px-4 bg-[#f5f5f5] overflow-hidden">
        {/* Floating Tags */}
        {introTags.map((tag, index) => (
          <span
            key={tag.label}
            className={`absolute ${tag.color} text-sm font-medium px-4 py-2 rounded-full animate-float hidden lg:block shadow-lg`}
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom,
              animationDelay: `${index * 0.4}s`,
            }}
          >
            {tag.label}
          </span>
        ))}

        {/* Emoji Badges */}
        {emojiBadges.map((badge, index) => (
          <div
            key={index}
            className="absolute w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-md animate-float hidden lg:flex"
            style={{
              top: badge.top,
              left: badge.left,
              right: badge.right,
              bottom: badge.bottom,
              animationDelay: `${index * 0.5 + 0.2}s`,
            }}
          >
            {badge.emoji}
          </div>
        ))}

        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Small text */}
            <div className="lg:pt-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                Projects don't go viral by accident.<br />
                They go viral on purpose.
              </p>
            </div>

            {/* Right - Large headline with highlights */}
            <div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                These case studies walk through the challenge, our approach, and the outcomes across services like{" "}
                <span className="text-primary font-medium">GTM</span>,{" "}
                <span className="text-primary font-medium">KOLs</span>,{" "}
                <span className="text-primary font-medium">PR</span>, and{" "}
                <span className="text-primary font-medium">community building</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cases Grid */}
      <section ref={ref} className="py-24 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.slice(0, 6).map((caseItem, index) => (
              <Link
                key={caseItem.name}
                to={`/projects/${caseItem.slug}`}
                className={`group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`relative aspect-[4/3] rounded-3xl overflow-hidden ${caseItem.bgStyle} transition-transform duration-300 group-hover:scale-[1.02]`}
                >
                  {/* Unique Decorations */}
                  <CardDecorations type={caseItem.decorations} />

                  {/* Logo centered */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
                    <img
                      src={caseItem.logo}
                      alt={caseItem.name}
                      className="max-h-20 max-w-[70%] object-contain brightness-0 invert drop-shadow-lg"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cases List Section */}
      <section className="relative py-24 px-4 bg-[#0a0a0a]" ref={listRef}>
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 pb-6 border-b border-white/10 text-white/40 text-sm uppercase tracking-wider">
            <div className="col-span-5 md:col-span-6">Title</div>
            <div className="col-span-4 md:col-span-3 hidden md:block">Direction</div>
            <div className="col-span-2 md:col-span-2 hidden md:block">Year</div>
            <div className="col-span-7 md:col-span-1 text-right">Link</div>
          </div>

          {/* Cases List */}
          {cases.map((caseItem) => (
            <Link
              key={caseItem.slug}
              to={`/projects/${caseItem.slug}`}
              className="group grid grid-cols-12 gap-4 py-8 border-b border-dotted border-white/10 items-center transition-colors"
              onMouseMove={(e) => handleMouseMove(e, caseItem.slug)}
              onMouseLeave={() => setHoveredCase(null)}
            >
              <div className="col-span-5 md:col-span-6">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-white group-hover:text-primary transition-colors duration-300">
                  {caseItem.name}
                </h3>
              </div>
              <div className="col-span-4 md:col-span-3 hidden md:block">
                <span className="text-white/60 text-sm">{caseItem.direction}</span>
              </div>
              <div className="col-span-2 md:col-span-2 hidden md:block">
                <span className="text-white/60 text-sm">{caseItem.year}</span>
              </div>
              <div className="col-span-7 md:col-span-1 text-right">
                <span className="text-white/40 text-sm group-hover:text-primary group-hover:underline transition-colors">
                  learn more
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Hover Preview Card */}
        {hoveredCase && (
          <div
            className="fixed pointer-events-none z-50 w-64 h-40 rounded-2xl overflow-hidden shadow-2xl transition-opacity duration-200 hidden lg:block"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y - 80,
              opacity: hoveredCase ? 1 : 0,
            }}
          >
            <img
              src={cases.find(c => c.slug === hoveredCase)?.previewImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${cases.find(c => c.slug === hoveredCase)?.bgStyle} opacity-30`} />
          </div>
        )}
      </section>

      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Projects;
