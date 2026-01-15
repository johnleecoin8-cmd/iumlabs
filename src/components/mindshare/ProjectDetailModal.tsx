import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, ExternalLink, Globe, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectDetailModalProps {
  project: {
    ticker: string;
    name: string;
    mindshare: number;
    mindshare_change?: number | null;
    narrative?: string | null;
    trend: 'up' | 'down' | 'neutral';
    sparkline: number[];
    logo_url: string | null;
    rank: number;
    token_status?: 'tge' | 'pre-tge';
    score: number;
    // Price data
    price?: number | null;
    market_cap?: number | null;
    change_24h?: number | null;
    // Social links
    twitter_url?: string | null;
    website_url?: string | null;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Format large numbers (e.g., 1234567 -> 1.23M)
const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return '-';
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
};

// Format price with proper decimals
const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return '-';
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 100) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

const narrativeColors: Record<string, { bg: string; text: string; border: string }> = {
  'AI': { bg: 'bg-violet-500/15', text: 'text-violet-300', border: 'border-violet-400/30' },
  'L2': { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-400/30' },
  'DePIN': { bg: 'bg-orange-500/15', text: 'text-orange-300', border: 'border-orange-400/30' },
  'Meme': { bg: 'bg-pink-500/15', text: 'text-pink-300', border: 'border-pink-400/30' },
  'DeFi': { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-400/30' },
  'Gaming': { bg: 'bg-yellow-500/15', text: 'text-yellow-300', border: 'border-yellow-400/30' },
  'Infra': { bg: 'bg-cyan-500/15', text: 'text-cyan-300', border: 'border-cyan-400/30' },
  'RWA': { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-400/30' },
  'NFT': { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-300', border: 'border-fuchsia-400/30' },
  'CEX': { bg: 'bg-sky-500/15', text: 'text-sky-300', border: 'border-sky-400/30' },
};

const ProjectDetailModal = ({ project, open, onOpenChange }: ProjectDetailModalProps) => {
  if (!project) return null;

  const TrendIcon = project.trend === 'up' ? TrendingUp : project.trend === 'down' ? TrendingDown : null;
  const isPreTge = project.token_status === 'pre-tge';
  
  // Check if we have price data
  const hasPriceData = project.price !== null && project.price !== undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0a0a0a] border border-white/10 sm:max-w-md p-0 gap-0 overflow-hidden">
        {/* Header with gradient */}
        <div 
          className="relative p-5 pb-4"
          style={{
            background: project.trend === 'up' 
              ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, transparent 100%)'
              : project.trend === 'down'
              ? 'linear-gradient(180deg, rgba(239, 68, 68, 0.15) 0%, transparent 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)'
          }}
        >
          <DialogHeader className="space-y-0">
            <div className="flex items-start gap-4">
              {/* Logo */}
              <div className="relative flex-shrink-0">
                {project.logo_url ? (
                  <img
                    src={project.logo_url}
                    alt={project.ticker}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-white/10"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/15 to-white/5 ring-2 ring-white/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-white/80">{project.ticker.charAt(0)}</span>
                  </div>
                )}
              </div>

              {/* Title & badges */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <DialogTitle className="text-xl font-bold text-white">{project.ticker}</DialogTitle>
                  {TrendIcon && (
                    <TrendIcon className={cn(
                      "w-4 h-4",
                      project.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
                    )} />
                  )}
                </div>
                <p className="text-sm text-white/50 truncate">{project.name}</p>
                
                {/* Badges */}
                <div className="flex items-center gap-2 mt-2">
                  {project.narrative && (
                    <span className={cn(
                      'px-2 py-0.5 text-[10px] font-semibold rounded border',
                      narrativeColors[project.narrative]?.bg || 'bg-slate-500/15',
                      narrativeColors[project.narrative]?.text || 'text-slate-300',
                      narrativeColors[project.narrative]?.border || 'border-slate-400/30',
                    )}>
                      {project.narrative}
                    </span>
                  )}
                  {isPreTge && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      PRE-TGE
                    </span>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Stats grid */}
        <div className="px-5 py-4 border-t border-white/[0.06]">
          <div className="grid grid-cols-2 gap-3">
            {/* Mindshare */}
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Mindshare</p>
              <p className="text-lg font-bold text-white">{project.mindshare.toFixed(2)}%</p>
              {project.mindshare_change !== null && project.mindshare_change !== undefined && (
                <p className={cn(
                  "text-xs font-medium mt-0.5",
                  project.mindshare_change > 0 ? 'text-emerald-400' : project.mindshare_change < 0 ? 'text-rose-400' : 'text-white/40'
                )}>
                  {project.mindshare_change > 0 ? '+' : ''}{project.mindshare_change.toFixed(1)}%
                </p>
              )}
            </div>

            {/* K-Score */}
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">K-Score</p>
              <p className="text-lg font-bold text-teal-400">{project.score.toFixed(0)}</p>
              <p className="text-xs text-white/30 mt-0.5">Rank #{project.rank}</p>
            </div>

            {/* Price - only show if data exists */}
            {hasPriceData ? (
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Price</p>
                <p className="text-lg font-bold text-white">{formatPrice(project.price)}</p>
                {project.change_24h !== null && project.change_24h !== undefined && (
                  <p className={cn(
                    "text-xs font-medium mt-0.5",
                    project.change_24h > 0 ? 'text-emerald-400' : project.change_24h < 0 ? 'text-rose-400' : 'text-white/40'
                  )}>
                    {project.change_24h > 0 ? '+' : ''}{project.change_24h.toFixed(2)}% (24h)
                  </p>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Price</p>
                <p className="text-sm text-white/30">{isPreTge ? 'Pre-TGE' : 'Not listed'}</p>
              </div>
            )}

            {/* Market Cap */}
            {hasPriceData && project.market_cap ? (
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Market Cap</p>
                <p className="text-lg font-bold text-white">{formatNumber(project.market_cap)}</p>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Market Cap</p>
                <p className="text-sm text-white/30">-</p>
              </div>
            )}
          </div>
        </div>

        {/* Social links */}
        <div className="px-5 py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            {project.twitter_url && (
              <a
                href={project.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
              >
                <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-xs text-white/60 group-hover:text-white transition-colors">Twitter</span>
                <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/50" />
              </a>
            )}
            {project.website_url && (
              <a
                href={project.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
              >
                <Globe className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                <span className="text-xs text-white/60 group-hover:text-white transition-colors">Website</span>
                <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/50" />
              </a>
            )}
            {!project.twitter_url && !project.website_url && (
              <p className="text-xs text-white/30">No social links available</p>
            )}
          </div>
        </div>

        {/* Footer note */}
        <div className="px-5 py-3 border-t border-white/[0.04] bg-white/[0.01]">
          <p className="text-[10px] text-white/25 text-center">
            Data sourced from Korean crypto communities. Updated hourly.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
