import { TrendingUp, FileText, BarChart3, Users, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TrendingTopic {
  emoji: string;
  title: string;
  slug: string;
}

interface QuickStat {
  icon: React.ElementType;
  value: string;
  label: string;
}

const trendingTopics: TrendingTopic[] = [
  { emoji: "📈", title: "Token Sale Strategies", slug: "avoid-flopped-tge" },
  { emoji: "🤖", title: "AI in DeFi", slug: "ai-agents-defi" },
  { emoji: "🇰🇷", title: "Korea Market Entry", slug: "ecosystem-growth-2025" },
  { emoji: "💬", title: "KOL Marketing", slug: "kol-marketing-guide" },
  { emoji: "🔥", title: "TGE Best Practices", slug: "avoid-flopped-tge" },
];

const quickStats: QuickStat[] = [
  { icon: FileText, value: "50+", label: "Reports Published" },
  { icon: BarChart3, value: "8", label: "Market Sectors" },
  { icon: Users, value: "34+", label: "Expert Contributors" },
  { icon: Zap, value: "Weekly", label: "Updates" },
];

const TrendingSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Trending Topics</h3>
        </div>

        <div className="space-y-1">
          {trendingTopics.map((topic, index) => (
            <Link
              key={index}
              to={`/research/${topic.slug}`}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.04] transition-colors group"
            >
              <span className="text-base">{topic.emoji}</span>
              <span className="text-sm text-white/60 group-hover:text-white transition-colors flex-1">
                {topic.title}
              </span>
              <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white mb-4">Research Hub</h3>

        <div className="space-y-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <stat.icon className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-white/40">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
        <h3 className="text-sm font-semibold text-white mb-2">Need Custom Research?</h3>
        <p className="text-xs text-white/50 mb-4 leading-relaxed">
          Get tailored market analysis for your project's Korea market entry.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-400 transition-colors"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default TrendingSidebar;
