import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ResearchHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const tabs = [
  { id: "all", label: "All Research" },
  { id: "market-research", label: "Market Research" },
  { id: "defi", label: "DeFi" },
  { id: "strategy", label: "Strategy" },
];

const ResearchHeader = ({ activeTab, onTabChange, searchQuery, onSearchChange }: ResearchHeaderProps) => {
  return (
    <div className="sticky top-16 z-30 border-b border-white/[0.06] bg-[#0A0A0A]/95 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4">
          {/* Page Title */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-lg font-semibold text-white tracking-tight">
              Ium Labs Research
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchHeader;
