import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ArrowUpDown,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { HypeProject } from '@/hooks/useHypeProjects';
import { useHypeTrends } from '@/hooks/useHypeProjects';
import { ensureSparkline, hashSeed } from '@/lib/sparkline';

interface LeaderboardTableProps {
  projects: HypeProject[];
  onProjectHover: (projectId: string | null) => void;
  activeProjectId: string | null;
}

type SortField = 'rank' | 'score' | 'ticker' | 'change7d' | 'change30d';
type SortDirection = 'asc' | 'desc';

const LeaderboardTable = ({ projects, onProjectHover, activeProjectId }: LeaderboardTableProps) => {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch historical trends for 7d/30d columns
  const { data: trends = {} } = useHypeTrends();

  // Filter and sort
  const filteredAndSorted = useMemo(() => {
    let result = [...projects];
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.ticker.toLowerCase().includes(query)
      );
    }
    
    // Sort
    result.sort((a, b) => {
      let aVal: number | string, bVal: number | string;
      
      switch (sortField) {
        case 'rank':
          aVal = a.rank;
          bVal = b.rank;
          break;
        case 'score':
          aVal = Number(a.score);
          bVal = Number(b.score);
          break;
        case 'ticker':
          aVal = a.ticker;
          bVal = b.ticker;
          break;
        case 'change7d':
          aVal = trends[a.ticker]?.change7d || 0;
          bVal = trends[b.ticker]?.change7d || 0;
          break;
        case 'change30d':
          aVal = trends[a.ticker]?.change30d || 0;
          bVal = trends[b.ticker]?.change30d || 0;
          break;
        default:
          return 0;
      }
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      
      return sortDirection === 'asc' 
        ? (aVal as number) - (bVal as number) 
        : (bVal as number) - (aVal as number);
    });
    
    return result;
  }, [projects, searchQuery, sortField, sortDirection, trends]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'rank' ? 'asc' : 'desc');
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-400';
    if (rank === 2) return 'bg-gradient-to-r from-slate-400/20 to-slate-400/5 text-slate-300';
    if (rank === 3) return 'bg-gradient-to-r from-orange-600/20 to-orange-600/5 text-orange-400';
    return '';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'positive':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
      case 'negative':
        return <TrendingDown className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Minus className="w-3.5 h-3.5 text-white/40" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'positive':
        return 'text-emerald-400';
      case 'negative':
        return 'text-rose-400';
      default:
        return 'text-white/40';
    }
  };

  // Mini sparkline for table rows
  const MiniSparkline = ({
    data,
    trend,
    base,
    seed,
  }: {
    data: number[] | null | undefined;
    trend: string;
    base: number;
    seed: number;
  }) => {
    const mappedTrend = ((): 'up' | 'down' | 'neutral' => {
      if (trend === 'positive' || trend === 'up') return 'up';
      if (trend === 'negative' || trend === 'down') return 'down';
      return 'neutral';
    })();

    const safeData = ensureSparkline(data, {
      base,
      trend: mappedTrend,
      seed,
      points: 14,
    });
    
    const max = Math.max(...safeData, 1);
    const min = Math.min(...safeData, 0);
    const range = max - min || 1;
    const normalized = safeData.map(v => ((v - min) / range) * 20);
    
    const points = normalized.map((value, i) => {
      const x = (i / (normalized.length - 1)) * 60;
      const y = 20 - value;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={60} height={20} className="opacity-60">
        <polyline
          points={points}
          fill="none"
          stroke={trend === 'positive' ? '#10B981' : trend === 'negative' ? '#EF4444' : '#6B7280'}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const SortableHeader = ({ field, children, className = '' }: { field: SortField; children: React.ReactNode; className?: string }) => (
    <th 
      className={`px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider cursor-pointer hover:text-white/60 transition-colors ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={`w-3 h-3 ${sortField === field ? 'text-primary' : 'opacity-40'}`} />
      </div>
    </th>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header with search */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 border-b border-white/5">
        <h3 className="text-sm font-semibold text-white">Hype Leaderboard</h3>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search ticker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full sm:w-[200px] bg-white/5 border-white/10 text-sm"
          />
        </div>
      </div>
      
      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-white/10">
            <tr>
              <SortableHeader field="rank" className="w-16">Rank</SortableHeader>
              <SortableHeader field="ticker">Ticker</SortableHeader>
              <SortableHeader field="score">Hype Score</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Trend</th>
              <SortableHeader field="change7d">7d</SortableHeader>
              <SortableHeader field="change30d">30d</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">24h Chart</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((project, index) => {
              const isActive = activeProjectId === project.id;
              const rankStyle = getRankStyle(project.rank);
              const projectTrend = trends[project.ticker];
              const change7d = projectTrend?.change7d || 0;
              const change30d = projectTrend?.change30d || 0;
              
              return (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`
                    border-b border-white/5 cursor-pointer transition-all duration-200
                    ${isActive ? 'bg-primary/10' : 'hover:bg-white/[0.02]'}
                    ${rankStyle}
                  `}
                  onMouseEnter={() => onProjectHover(project.id)}
                  onMouseLeave={() => onProjectHover(null)}
                >
                  {/* Rank */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-sm font-bold ${project.rank <= 3 ? '' : 'text-white/60'}`}>
                        {String(project.rank).padStart(2, '0')}
                      </span>
                      {project.rank === 1 && <Crown className="w-4 h-4 text-amber-400" />}
                    </div>
                  </td>
                  
                  {/* Ticker with logo */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {project.logo_url ? (
                        <img 
                          src={project.logo_url} 
                          alt={project.ticker}
                          className="w-8 h-8 rounded-lg object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-white/60">
                            {project.ticker.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm text-white">{project.name}</p>
                        <p className="text-xs text-white/40">${project.ticker}</p>
                      </div>
                    </div>
                  </td>
                  
                  {/* Score */}
                  <td className="px-4 py-3">
                    <span className="font-bold text-sm tabular-nums text-white">
                      {Number(project.score).toLocaleString()}
                    </span>
                  </td>
                  
                  {/* Trend */}
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-1.5 ${getTrendColor(project.trend)}`}>
                      {getTrendIcon(project.trend)}
                      <span className="text-sm font-medium capitalize">{project.trend}</span>
                    </div>
                  </td>
                  
                  {/* 7d Change */}
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium tabular-nums ${
                      change7d > 0 ? 'text-emerald-400' : change7d < 0 ? 'text-rose-400' : 'text-white/40'
                    }`}>
                      {change7d > 0 ? '+' : ''}{change7d.toFixed(1)}%
                    </span>
                  </td>
                  
                  {/* 30d Change */}
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium tabular-nums ${
                      change30d > 0 ? 'text-emerald-400' : change30d < 0 ? 'text-rose-400' : 'text-white/40'
                    }`}>
                      {change30d > 0 ? '+' : ''}{change30d.toFixed(1)}%
                    </span>
                  </td>
                  
                  {/* Sparkline */}
                  <td className="px-4 py-3">
                    <MiniSparkline
                      data={project.sparkline}
                      trend={project.trend}
                      base={Number(project.score) || 1}
                      seed={hashSeed(project.ticker)}
                    />
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredAndSorted.length === 0 && (
          <div className="flex items-center justify-center py-12 text-white/40">
            {projects.length === 0 
              ? 'Waiting for data from Python backend...'
              : 'No projects found'
            }
          </div>
        )}
      </div>
      
      {/* Footer stats */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
        <span>{filteredAndSorted.length} projects</span>
        <span>Real-time data from Telegram</span>
      </div>
    </div>
  );
};

export default LeaderboardTable;
