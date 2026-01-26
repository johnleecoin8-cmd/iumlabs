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

  // 자연스러운 sparkline 생성 (데이터가 부족할 경우)
  const generateNaturalSparkline = (baseScore: number, trend: 'up' | 'down' | 'neutral', seed: number): number[] => {
    const points = 14; // 14일 데이터
    const result: number[] = [];
    
    // 시드 기반 랜덤 생성기
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };
    
    // 트렌드에 따른 시작점 계산
    const trendMultiplier = trend === 'up' ? 0.7 : trend === 'down' ? 1.3 : 1;
    let currentValue = baseScore * trendMultiplier;
    
    for (let i = 0; i < points; i++) {
      // 자연스러운 변동 (-5% ~ +5%)
      const noise = (seededRandom(seed + i * 17) - 0.5) * 0.1 * baseScore;
      
      // 트렌드 방향으로 점진적 이동
      const trendStep = (baseScore - currentValue) / (points - i);
      currentValue += trendStep * 0.3 + noise;
      
      // 값이 너무 작아지지 않도록
      currentValue = Math.max(currentValue, baseScore * 0.3);
      
      result.push(Math.round(currentValue * 100) / 100);
    }
    
    // 마지막 값은 현재 스코어에 가깝게
    result[points - 1] = baseScore;
    
    return result;
  };

  // sparkline 배열을 시계열 데이터로 변환
  const chartData = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    
    const POINTS = 14; // 14일 고정
    
    const timeLabels = Array.from({ length: POINTS }, (_, i) => {
      const day = new Date();
      day.setDate(day.getDate() - (POINTS - 1 - i));
      return `${day.getMonth() + 1}/${day.getDate()}`;
    });

    // 각 프로젝트의 sparkline 보정
    const normalizedProjects = projects.map((project, idx) => {
      const existingSparkline = project.sparkline || [];
      
      // sparkline이 충분하지 않으면 자연스러운 데이터 생성
      if (existingSparkline.length < 3) {
        return {
          ...project,
          normalizedSparkline: generateNaturalSparkline(
            project.score, 
            project.trend as 'up' | 'down' | 'neutral',
            project.ticker.charCodeAt(0) * 100 + idx
          )
        };
      }
      
      // 기존 sparkline을 14개 포인트로 보간
      const interpolated: number[] = [];
      for (let i = 0; i < POINTS; i++) {
        const ratio = i / (POINTS - 1);
        const srcIdx = ratio * (existingSparkline.length - 1);
        const lowIdx = Math.floor(srcIdx);
        const highIdx = Math.min(lowIdx + 1, existingSparkline.length - 1);
        const frac = srcIdx - lowIdx;
        interpolated.push(
          existingSparkline[lowIdx] * (1 - frac) + existingSparkline[highIdx] * frac
        );
      }
      
      return { ...project, normalizedSparkline: interpolated };
    });

    return timeLabels.map((time, timeIdx) => {
      const point: Record<string, string | number> = { time };
      normalizedProjects.forEach(project => {
        point[project.ticker] = Math.round((project.normalizedSparkline[timeIdx] || 0) * 100) / 100;
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
                    {project?.logo_url ? (
                      <img 
                        src={project.logo_url} 
                        alt={p.name}
                        className="w-6 h-6 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <span 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ backgroundColor: p.color + '20', color: p.color }}
                      >
                        {p.name[0]}
                      </span>
                    )}
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
    <div className="w-full h-full bg-background rounded-xl border border-white/[0.06] overflow-hidden flex flex-col">
      {/* 미니멀 헤더 */}
      <div className="flex justify-between items-center px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
        <h2 className="text-sm font-medium text-foreground tracking-wide">
          Mindshare Trends
        </h2>
        <p className="text-xs text-muted-foreground/60 hidden sm:block">
          Click to filter · Hover to highlight
        </p>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* 차트 영역 */}
        <div className="flex-1 min-h-[400px] lg:min-h-0 p-4 relative">
          {/* 그라데이션 배경 */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.03] via-transparent to-violet-500/[0.03] pointer-events-none rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
          
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

        {/* 사이드바 범례 (데스크탑) - Premium scrollbar */}
        <div 
          className="hidden lg:block w-[200px] border-l border-white/[0.06] p-3 overflow-y-auto flex-shrink-0 relative
            [&::-webkit-scrollbar]:w-[6px]
            [&::-webkit-scrollbar-track]:bg-gradient-to-b [&::-webkit-scrollbar-track]:from-white/[0.02] [&::-webkit-scrollbar-track]:to-white/[0.01] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:my-2
            [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-teal-500/40 [&::-webkit-scrollbar-thumb]:via-violet-500/30 [&::-webkit-scrollbar-thumb]:to-teal-500/40
            [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-white/[0.08]
            [&::-webkit-scrollbar-thumb]:shadow-[0_0_10px_rgba(20,184,166,0.3)]
            hover:[&::-webkit-scrollbar-thumb]:from-teal-400/60 hover:[&::-webkit-scrollbar-thumb]:via-violet-400/50 hover:[&::-webkit-scrollbar-thumb]:to-teal-400/60
            hover:[&::-webkit-scrollbar-thumb]:shadow-[0_0_15px_rgba(20,184,166,0.5)]
            [&::-webkit-scrollbar-thumb]:transition-all"
        >
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-3 px-1 sticky top-0 bg-background/95 backdrop-blur-sm py-1 -mt-1">
            Projects
          </p>
          <div className="space-y-0.5">
            {sortedByCurrentValue.slice(0, 20).map((project, index) => {
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
                    w-full flex items-center justify-between gap-2 px-2 py-2 rounded-lg text-xs
                    transition-all duration-200
                    ${isSelected ? 'text-foreground' : 'text-muted-foreground/30'}
                    ${isHovered ? 'bg-white/[0.06] scale-[1.02]' : 'hover:bg-white/[0.03]'}
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[10px] text-muted-foreground/40 font-mono w-4 text-right">
                      {index + 1}
                    </span>
                    <span 
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-200"
                      style={{ 
                        backgroundColor: colorMap[project.ticker],
                        opacity: isSelected ? 1 : 0.3,
                        boxShadow: isHovered ? `0 0 12px ${colorMap[project.ticker]}` : 'none'
                      }}
                    />
                    <span className="truncate font-medium">{project.ticker}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {project.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-500 flex-shrink-0" />}
                    {project.trend === 'down' && <TrendingDown className="w-3 h-3 text-rose-500 flex-shrink-0" />}
                    <span className="font-mono text-[10px] text-muted-foreground/50 flex-shrink-0">
                      {currentValue.toFixed(1)}
                    </span>
                  </div>
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