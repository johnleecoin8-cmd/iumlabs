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
import { HypeProject } from '@/hooks/useHypeProjects';
import { TrendingUp, TrendingDown } from 'lucide-react';

// TradingView 스타일 네온 컬러 팔레트 (20개)
const COLORS = [
  '#F7931A', // BTC Orange
  '#627EEA', // ETH Blue
  '#00FFA3', // SOL Green
  '#E84142', // AVAX Red
  '#2775CA', // ARB Blue
  '#FF007A', // UNI Pink
  '#F0B90B', // BNB Yellow
  '#8247E5', // MATIC Purple
  '#26A17B', // USDT Teal
  '#00D395', // AAVE Green
  '#FF6B6B', // Coral
  '#4ECDC4', // Turquoise
  '#45B7D1', // Sky Blue
  '#96CEB4', // Sage
  '#FFEAA7', // Cream Yellow
  '#DDA0DD', // Plum
  '#98D8C8', // Mint
  '#F7DC6F', // Soft Yellow
  '#BB8FCE', // Light Purple
  '#85C1E9', // Light Blue
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

  // 데이터 변환: sparkline 배열을 시계열 데이터로 변환
  const chartData = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    
    // sparkline 길이 확인
    const maxLength = Math.max(...projects.map(p => p.sparkline?.length || 0));
    if (maxLength === 0) return [];

    // 시간축 생성 (7일 기준)
    const timeLabels = Array.from({ length: maxLength }, (_, i) => {
      const day = new Date();
      day.setDate(day.getDate() - (maxLength - 1 - i));
      return `${day.getMonth() + 1}/${day.getDate()}`;
    });

    return timeLabels.map((time, timeIdx) => {
      const point: Record<string, string | number> = { time };
      projects.forEach(project => {
        const sparkline = project.sparkline || [];
        const val = sparkline[timeIdx] ?? 0;
        point[project.ticker] = val;
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

  // 현재 값 기준 정렬된 프로젝트 (툴팁용)
  const sortedByCurrentValue = useMemo(() => {
    return [...projects].sort((a, b) => {
      const aVal = a.sparkline?.[a.sparkline.length - 1] ?? 0;
      const bVal = b.sparkline?.[b.sparkline.length - 1] ?? 0;
      return bVal - aVal;
    });
  }, [projects]);

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const sortedPayload = [...payload].sort((a, b) => (b.value || 0) - (a.value || 0));
      
      return (
        <div className="bg-[#1E222D]/98 border border-slate-700/60 p-4 rounded-lg shadow-2xl backdrop-blur-md min-w-[200px] max-h-[400px] overflow-hidden">
          <p className="text-slate-400 text-xs mb-3 font-mono border-b border-slate-700/50 pb-2 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-slate-500">{sortedPayload.length} projects</span>
          </p>
          <div className="space-y-1 max-h-[320px] overflow-y-auto pr-2">
            {sortedPayload.map((p: any, idx: number) => {
              const project = projects.find(pr => pr.ticker === p.name);
              return (
                <div 
                  key={p.name} 
                  className="flex items-center justify-between gap-3 text-xs py-0.5 hover:bg-white/5 px-1 rounded"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono w-4 text-right">
                      {idx + 1}
                    </span>
                    <span 
                      className="w-2 h-2 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="text-slate-200 font-medium truncate max-w-[80px]">
                      {p.name}
                    </span>
                    {project?.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                    {project?.trend === 'down' && <TrendingDown className="w-3 h-3 text-rose-400" />}
                  </div>
                  <span className="text-white font-mono font-semibold tabular-nums">
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

  // 커스텀 범례
  const CustomLegend = () => (
    <div className="flex flex-wrap gap-1.5 justify-center px-4">
      {projects.slice(0, 20).map((project) => {
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
              flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium
              transition-all duration-200 border
              ${isSelected 
                ? 'bg-slate-800/80 border-slate-600/50 text-white' 
                : 'bg-slate-900/50 border-slate-800/30 text-slate-500'
              }
              ${isHovered ? 'ring-1 ring-white/40 scale-105 z-10' : ''}
              hover:bg-slate-700/60
            `}
          >
            <span 
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ 
                backgroundColor: colorMap[project.ticker],
                boxShadow: isHovered ? `0 0 8px ${colorMap[project.ticker]}` : 'none'
              }}
            />
            <span className="truncate max-w-[60px]">{project.ticker}</span>
            <span className="text-slate-500 font-mono text-[10px]">#{project.rank}</span>
          </button>
        );
      })}
    </div>
  );

  if (chartData.length === 0) {
    return (
      <div className="w-full h-[600px] bg-[#131722] rounded-xl border border-slate-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-2">No sparkline data available</p>
          <p className="text-slate-600 text-sm">Historical data will appear here once collected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#131722] rounded-xl border border-slate-800 shadow-xl overflow-hidden">
      {/* 헤더 - TradingView 스타일 */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-slate-800/50 bg-[#1E222D]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1 h-6 bg-teal-500 rounded-full" />
            <h2 className="text-base font-bold text-white">
              K-Mindshare Battle
            </h2>
          </div>
          <span className="text-[10px] font-medium text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
            7D CHART
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="hidden sm:inline">Click legend to filter • Hover to highlight</span>
          <span className="font-mono bg-slate-800/50 px-2 py-0.5 rounded">
            {Math.min(projects.length, 20)} projects
          </span>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="h-[500px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            {/* TradingView 스타일 그리드 */}
            <CartesianGrid 
              strokeDasharray="1 4" 
              stroke="#2A2E39" 
              vertical={false} 
            />
            
            <XAxis 
              dataKey="time" 
              stroke="#787B86" 
              tick={{ fill: '#787B86', fontSize: 11 }} 
              tickLine={false}
              axisLine={{ stroke: '#2A2E39' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#787B86" 
              tick={{ fill: '#787B86', fontSize: 11 }} 
              tickLine={false}
              axisLine={false}
              domain={['auto', 'auto']}
              width={50}
              tickFormatter={(val) => val.toFixed(1)}
            />
            
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#363A45', strokeWidth: 1 }} 
            />
            
            {/* 기준선 */}
            <ReferenceLine y={0} stroke="#363A45" strokeDasharray="3 3" />

            {/* 20개 라인 생성 */}
            {projects.slice(0, 20).map((project) => {
              const isHovered = hoveredTicker === project.ticker;
              const isSelected = selectedTickers.size === 0 || selectedTickers.has(project.ticker);
              const isAnyHovered = hoveredTicker !== null;
              
              // 호버/선택 상태에 따른 스타일
              let opacity = 0.85;
              let strokeWidth = 2;
              
              if (selectedTickers.size > 0) {
                opacity = isSelected ? 0.9 : 0.08;
                strokeWidth = isSelected ? 2.5 : 1;
              }
              
              if (isAnyHovered) {
                opacity = isHovered ? 1 : (isSelected ? 0.2 : 0.05);
                strokeWidth = isHovered ? 3.5 : (isSelected ? 1.5 : 1);
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
                    r: 6, 
                    strokeWidth: 2,
                    stroke: '#fff',
                    fill: colorMap[project.ticker]
                  }}
                  style={{
                    transition: 'opacity 0.3s ease, stroke-width 0.3s ease',
                    filter: isHovered ? `drop-shadow(0 0 8px ${colorMap[project.ticker]})` : 'none'
                  }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 커스텀 범례 */}
      <div className="border-t border-slate-800/50 bg-[#1E222D]/50 py-3">
        <CustomLegend />
      </div>
    </div>
  );
};

export default HypeGalaxyMap;
