import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { TrendingUp, TrendingDown, LineChart as LineChartIcon } from 'lucide-react';

// Ium Labs 스타일 Curated 색상 팔레트 (10색)
const COLORS = [
  '#14b8a6', // Teal (메인)
  '#8b5cf6', // Violet
  '#f59e0b', // Amber
  '#22c55e', // Green
  '#ec4899', // Pink
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#f97316', // Orange
  '#a855f7', // Purple
  '#06b6d4', // Cyan
];

interface HypeGalaxyMapProps {
  projects: {
    ticker: string;
    name: string;
    score: number;
    mindshare: number;
    mindshare_change?: number | null;
    trend: 'up' | 'down' | 'neutral';
    rank: number;
    sparkline?: number[];
    logo_url?: string | null;
  }[];
}

const HypeGalaxyMap: React.FC<HypeGalaxyMapProps> = ({ projects }) => {
  const [hoveredTicker, setHoveredTicker] = useState<string | null>(null);
  const [selectedTickers, setSelectedTickers] = useState<Set<string>>(new Set());

  // sparkline 배열을 시계열 데이터로 변환
  const chartData = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    
    const maxLength = Math.max(...projects.map(p => p.sparkline?.length || 0));
    if (maxLength === 0) return [];

    const timeLabels = Array.from({ length: maxLength }, (_, i) => {
      const day = new Date();
      day.setDate(day.getDate() - (maxLength - 1 - i));
      return `${day.getMonth() + 1}/${day.getDate()}`;
    });

    return timeLabels.map((time, timeIdx) => {
      const point: Record<string, string | number> = { time };
      projects.forEach(project => {
        const sparkline = project.sparkline || [];
        point[project.ticker] = sparkline[timeIdx] ?? 0;
      });
      return point;
    });
  }, [projects]);

  // 프로젝트별 색상 매핑
  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    projects.forEach((project, idx) => {
      map[project.ticker] = COLORS[idx % COLORS.length];
    });
    return map;
  }, [projects]);

  // 현재 값 기준 정렬 (사이드바용)
  const sortedByCurrentValue = useMemo(() => {
    return [...projects].sort((a, b) => {
      const aVal = a.sparkline?.[a.sparkline.length - 1] ?? 0;
      const bVal = b.sparkline?.[b.sparkline.length - 1] ?? 0;
      return bVal - aVal;
    });
  }, [projects]);

  // 범례 클릭 핸들러
  const handleLegendClick = (ticker: string) => {
    setSelectedTickers(prev => {
      const next = new Set(prev);
      if (next.has(ticker)) {
        next.delete(ticker);
      } else {
        next.add(ticker);
      }
      return next;
    });
  };

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const sortedPayload = [...payload].sort((a, b) => (b.value || 0) - (a.value || 0));
      
      return (
        <div className="bg-background/95 border border-white/[0.08] p-4 rounded-xl shadow-2xl backdrop-blur-xl min-w-[180px]">
          <p className="text-muted-foreground text-xs mb-3 font-mono border-b border-white/[0.06] pb-2">
            {label}
          </p>
          <div className="space-y-1.5 max-h-[280px] overflow-y-auto">
            {sortedPayload.slice(0, 10).map((p: any, idx: number) => {
              const project = projects.find(pr => pr.ticker === p.name);
              return (
                <div 
                  key={p.name} 
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground/50 font-mono w-4 text-right text-[10px]">
                      {idx + 1}
                    </span>
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="text-foreground/90 font-medium">
                      {p.name}
                    </span>
                  </div>
                  <span className="text-foreground font-mono font-semibold">
                    {typeof p.value === 'number' ? p.value.toFixed(2) : '-'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="w-full h-[600px] bg-background rounded-xl border border-white/[0.06] flex items-center justify-center">
        <div className="text-center">
          <LineChartIcon className="w-12 h-12 text-primary/30 mx-auto mb-4" />
          <p className="text-muted-foreground mb-1">No historical data available</p>
          <p className="text-muted-foreground/50 text-sm">Sparkline data will appear once collected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background rounded-xl border border-white/[0.06] overflow-hidden">
      {/* 미니멀 헤더 */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-white/[0.06]">
        <h2 className="text-sm font-medium text-foreground tracking-wide">
          Mindshare Trends
        </h2>
        <p className="text-xs text-muted-foreground/60 hidden sm:block">
          Click to filter · Hover to highlight
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* 차트 영역 */}
        <div className="flex-1 h-[480px] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid 
                strokeDasharray="2 6" 
                stroke="hsl(var(--border))" 
                strokeOpacity={0.3}
                vertical={false} 
              />
              
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, opacity: 0.5 }} 
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, opacity: 0.5 }} 
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
                width={40}
                tickFormatter={(val) => val.toFixed(1)}
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.5 }} 
              />
              
              <ReferenceLine y={0} stroke="hsl(var(--border))" strokeOpacity={0.3} />

              {/* 라인 렌더링 */}
              {projects.slice(0, 20).map((project) => {
                const isHovered = hoveredTicker === project.ticker;
                const isSelected = selectedTickers.size === 0 || selectedTickers.has(project.ticker);
                const isAnyHovered = hoveredTicker !== null;
                
                let opacity = 0.7;
                let strokeWidth = 1.5;
                
                if (selectedTickers.size > 0) {
                  opacity = isSelected ? 0.85 : 0.05;
                  strokeWidth = isSelected ? 2 : 1;
                }
                
                if (isAnyHovered) {
                  opacity = isHovered ? 1 : 0.05;
                  strokeWidth = isHovered ? 3 : 1;
                }

                return (
                  <Line
                    key={project.ticker}
                    type="monotone"
                    dataKey={project.ticker}
                    stroke={colorMap[project.ticker]}
                    strokeWidth={strokeWidth}
                    opacity={opacity}
                    dot={false}
                    activeDot={{ 
                      r: 5, 
                      strokeWidth: 2,
                      stroke: 'hsl(var(--background))',
                      fill: colorMap[project.ticker]
                    }}
                    style={{
                      transition: 'opacity 0.2s ease, stroke-width 0.2s ease',
                      filter: isHovered ? `drop-shadow(0 0 6px ${colorMap[project.ticker]}80)` : 'none'
                    }}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 사이드바 범례 (데스크탑) */}
        <div className="hidden lg:block w-[200px] border-l border-white/[0.06] p-3 overflow-y-auto max-h-[480px]">
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-3 px-1">
            Projects
          </p>
          <div className="space-y-0.5">
            {sortedByCurrentValue.slice(0, 20).map((project) => {
              const isSelected = selectedTickers.size === 0 || selectedTickers.has(project.ticker);
              const isHovered = hoveredTicker === project.ticker;
              const currentValue = project.sparkline?.[project.sparkline.length - 1] ?? 0;
              
              return (
                <button
                  key={project.ticker}
                  onClick={() => handleLegendClick(project.ticker)}
                  onMouseEnter={() => setHoveredTicker(project.ticker)}
                  onMouseLeave={() => setHoveredTicker(null)}
                  className={`
                    w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-xs
                    transition-all duration-150
                    ${isSelected ? 'text-foreground' : 'text-muted-foreground/30'}
                    ${isHovered ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}
                  `}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span 
                      className="w-2 h-2 rounded-sm flex-shrink-0 transition-all duration-150"
                      style={{ 
                        backgroundColor: colorMap[project.ticker],
                        opacity: isSelected ? 1 : 0.3,
                        boxShadow: isHovered ? `0 0 8px ${colorMap[project.ticker]}` : 'none'
                      }}
                    />
                    <span className="truncate font-medium">{project.ticker}</span>
                    {project.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-500/70 flex-shrink-0" />}
                    {project.trend === 'down' && <TrendingDown className="w-3 h-3 text-rose-500/70 flex-shrink-0" />}
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/60 flex-shrink-0">
                    {currentValue.toFixed(1)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 하단 범례 (모바일) */}
      <div className="lg:hidden border-t border-white/[0.06] p-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {projects.slice(0, 20).map((project) => {
            const isSelected = selectedTickers.size === 0 || selectedTickers.has(project.ticker);
            const isHovered = hoveredTicker === project.ticker;
            
            return (
              <button
                key={project.ticker}
                onClick={() => handleLegendClick(project.ticker)}
                onMouseEnter={() => setHoveredTicker(project.ticker)}
                onMouseLeave={() => setHoveredTicker(null)}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium
                  transition-all duration-150 border whitespace-nowrap
                  ${isSelected 
                    ? 'bg-white/[0.04] border-white/[0.08] text-foreground' 
                    : 'bg-transparent border-transparent text-muted-foreground/40'
                  }
                  ${isHovered ? 'border-white/[0.15]' : ''}
                `}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-sm"
                  style={{ 
                    backgroundColor: colorMap[project.ticker],
                    opacity: isSelected ? 1 : 0.4
                  }}
                />
                {project.ticker}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HypeGalaxyMap;