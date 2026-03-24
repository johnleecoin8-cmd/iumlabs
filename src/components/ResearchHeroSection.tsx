import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const categories = ["All", "Market Research", "Strategy", "DeFi", "Marketing", "Technology", "Industry"];

interface ResearchHeroSectionProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  totalResults?: number;
}

const ResearchHeroSection = ({
  searchQuery = "",
  onSearchChange,
  selectedCategory = "All",
  onCategoryChange,
  totalResults = 0,
}: ResearchHeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 overflow-hidden">
      {/* === Background depth layers === */}

      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.07] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-blue-400/[0.05] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.06] rounded-full blur-[120px] pointer-events-none" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Header */}
        <div
          className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_12px_rgba(64,128,255,0.6)]" />
            <span className="text-xs text-white/40 font-mono tracking-[0.2em] uppercase">Insights & Research</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-5 sm:mb-6">
            Explore the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Korean Web3
            </span>
            <br />
            Ecosystem
          </h1>

          <p className="text-base sm:text-lg text-white/40 max-w-xl leading-relaxed mb-10 sm:mb-12">
            Data-driven market analysis, strategic insights, and deep dives — curated by the team building Korea's Web3 bridge.
          </p>
        </div>

        {/* Search + Filter */}
        <div
          className={`transition-all duration-700 delay-300 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Search bar with glow */}
          <div className="relative mb-6 max-w-lg group">
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-[#111111] border border-white/[0.08] rounded-2xl group-focus-within:border-white/[0.15] transition-all duration-300">
              <Search className="ml-4 w-4 h-4 text-white/25 shrink-0" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange?.("")}
                  className="mr-4 text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange?.(cat)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    : "bg-white/[0.03] text-white/40 border border-white/[0.06] hover:bg-white/[0.07] hover:text-white/60 hover:border-white/[0.12]"
                }`}
              >
                {cat}
              </button>
            ))}
            {totalResults > 0 && (
              <span className="text-xs text-white/20 ml-3 font-mono">{totalResults} articles</span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
};

export default ResearchHeroSection;
