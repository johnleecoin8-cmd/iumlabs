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
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Header */}
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-white/50 font-mono tracking-widest uppercase">Blog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight mb-4 sm:mb-5">
            Insights & Research
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/50 max-w-2xl leading-relaxed mb-8 sm:mb-10">
            Data-driven market analysis, strategic insights, and deep dives into the Korean Web3 ecosystem.
          </p>
        </div>

        {/* Search + Filter bar */}
        <div
          className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {/* Search */}
          <div className="relative mb-5 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange?.(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-white text-black"
                    : "bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/70"
                }`}
              >
                {cat}
              </button>
            ))}
            {totalResults > 0 && (
              <span className="text-xs text-white/30 ml-2">{totalResults} articles</span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};

export default ResearchHeroSection;
