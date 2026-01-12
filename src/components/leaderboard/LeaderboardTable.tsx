import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ExternalLink,
  ArrowUpDown,
  Search
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

interface Project {
  id: string;
  name: string;
  slug: string;
  rank: number;
  mindshare_score: number;
  previous_score: number;
  previous_rank: number;
  category: string;
  logo_url: string | null;
  twitter_url: string | null;
  twitter_mentions: number | null;
  telegram_members: number | null;
  website_url: string | null;
}

interface LeaderboardTableProps {
  projects: Project[];
  onProjectHover: (projectId: string | null) => void;
  activeProjectId: string | null;
}

type SortField = 'rank' | 'mindshare_score' | 'change' | 'twitter_mentions' | 'telegram_members';
type SortDirection = 'asc' | 'desc';
type Period = '7D' | '30D' | '3M' | '6M' | '12M';

const formatNumber = (num: number | null): string => {
  if (num === null || num === undefined) return '-';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const LeaderboardTable = ({ projects, onProjectHover, activeProjectId }: LeaderboardTableProps) => {
  const [period, setPeriod] = useState<Period>('7D');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate trend percentages
  const projectsWithTrend = useMemo(() => {
    return projects.map(p => {
      const current = Number(p.mindshare_score);
      const previous = Number(p.previous_score);
      const changePercent = previous > 0 ? ((current - previous) / previous) * 100 : 0;
      const rankChange = p.previous_rank - p.rank; // Positive = moved up
      return { ...p, changePercent, rankChange };
    });
  }, [projects]);

  // Filter and sort
  const filteredAndSorted = useMemo(() => {
    let result = [...projectsWithTrend];
    
    // Filter by search
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    result.sort((a, b) => {
      let aVal: number, bVal: number;
      
      switch (sortField) {
        case 'rank':
          aVal = a.rank;
          bVal = b.rank;
          break;
        case 'mindshare_score':
          aVal = a.mindshare_score;
          bVal = b.mindshare_score;
          break;
        case 'change':
          aVal = a.changePercent;
          bVal = b.changePercent;
          break;
        case 'twitter_mentions':
          aVal = a.twitter_mentions || 0;
          bVal = b.twitter_mentions || 0;
          break;
        case 'telegram_members':
          aVal = a.telegram_members || 0;
          bVal = b.telegram_members || 0;
          break;
        default:
          return 0;
      }
      
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
    
    return result;
  }, [projectsWithTrend, searchQuery, sortField, sortDirection]);

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
      {/* Header with period tabs and search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-4 border-b border-white/5">
        <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <TabsList className="bg-white/5 border border-white/10">
            {['7D', '30D', '3M', '6M', '12M'].map((p) => (
              <TabsTrigger 
                key={p} 
                value={p}
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {p}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search projects..."
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
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Project</th>
              <SortableHeader field="mindshare_score">Score</SortableHeader>
              <SortableHeader field="change">Δ{period}</SortableHeader>
              <SortableHeader field="twitter_mentions">Twitter</SortableHeader>
              <SortableHeader field="telegram_members">Telegram</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider w-12"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((project, index) => {
              const isActive = activeProjectId === project.id;
              const rankStyle = getRankStyle(project.rank);
              
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
                  
                  {/* Project */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {project.logo_url ? (
                        <img 
                          src={project.logo_url} 
                          alt={project.name}
                          className="w-8 h-8 rounded-lg object-cover bg-white/10"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-white/40">
                            {project.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm text-white">{project.name}</p>
                        <p className="text-xs text-white/40">{project.category}</p>
                      </div>
                    </div>
                  </td>
                  
                  {/* Score */}
                  <td className="px-4 py-3">
                    <span className="font-bold text-sm tabular-nums text-white">
                      {project.mindshare_score.toFixed(0)}
                    </span>
                  </td>
                  
                  {/* Change */}
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-1 text-sm ${
                      project.changePercent > 0 ? 'text-emerald-400' : 
                      project.changePercent < 0 ? 'text-rose-400' : 'text-white/40'
                    }`}>
                      {project.changePercent > 0 ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : project.changePercent < 0 ? (
                        <TrendingDown className="w-3.5 h-3.5" />
                      ) : (
                        <Minus className="w-3.5 h-3.5" />
                      )}
                      <span className="font-medium tabular-nums">
                        {project.changePercent > 0 ? '+' : ''}
                        {project.changePercent.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  
                  {/* Twitter */}
                  <td className="px-4 py-3">
                    <span className="text-sm text-white/60 tabular-nums">
                      {formatNumber(project.twitter_mentions)}
                    </span>
                  </td>
                  
                  {/* Telegram */}
                  <td className="px-4 py-3">
                    <span className="text-sm text-white/60 tabular-nums">
                      {formatNumber(project.telegram_members)}
                    </span>
                  </td>
                  
                  {/* Link */}
                  <td className="px-4 py-3">
                    {project.website_url && (
                      <a 
                        href={project.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredAndSorted.length === 0 && (
          <div className="flex items-center justify-center py-12 text-white/40">
            No projects found
          </div>
        )}
      </div>
      
      {/* Footer stats */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
        <span>{filteredAndSorted.length} projects</span>
        <span>Period: {period}</span>
      </div>
    </div>
  );
};

export default LeaderboardTable;
