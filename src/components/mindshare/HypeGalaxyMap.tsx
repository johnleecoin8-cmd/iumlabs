import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  ReferenceLine,
  Cell,
  Label
} from 'recharts';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

interface GalaxyProject {
  id: string;
  ticker: string;
  name: string;
  score: number;
  mindshare: number;
  mindshare_change?: number | null;
  trend: 'up' | 'down' | 'neutral';
  rank: number;
  logo_url?: string | null;
  narrative?: string | null;
  market_cap?: number | null;
  price?: number | null;
}

interface HypeGalaxyMapProps {
  projects: GalaxyProject[];
}

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const change = data.mindshare_change ?? 0;
    
    return (
      <div className="bg-slate-900/95 border border-slate-700/50 p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[180px]">
        <div className="flex items-center gap-3 mb-3">
          {data.logo_url ? (
            <img 
              src={data.logo_url} 
              alt={data.ticker}
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
              {data.ticker[0]}
            </div>
          )}
          <div>
            <p className="font-bold text-lg text-white flex items-center gap-2">
              {data.ticker}
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-medium",
                data.trend === 'up' 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : data.trend === 'down'
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'bg-slate-500/20 text-slate-400'
              )}>
                #{data.rank}
              </span>
            </p>
            {data.narrative && (
              <p className="text-xs text-slate-400">{data.narrative}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Mindshare</span>
            <span className="font-mono text-white">{data.mindshare.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Hype Score</span>
            <span className="font-mono text-white">{data.score.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Momentum</span>
            <span className={cn(
              "font-mono font-medium",
              change >= 0 ? 'text-emerald-400' : 'text-rose-400'
            )}>
              {change >= 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
          </div>
          {data.price && data.price > 0 && (
            <div className="flex justify-between pt-1 border-t border-slate-700/50">
              <span className="text-slate-400">Price</span>
              <span className="font-mono text-white">
                ${data.price >= 1 ? data.price.toFixed(2) : data.price.toFixed(6)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

// Custom dot component for rendering project logos/initials
const CustomDot = (props: any) => {
  const { cx, cy, payload, z } = props;
  const size = Math.max(20, Math.min(z / 3, 60)); // Clamp size between 20 and 60
  
  const fillColor = payload.trend === 'up' 
    ? 'rgba(52, 211, 153, 0.6)' 
    : payload.trend === 'down' 
    ? 'rgba(251, 113, 133, 0.6)'
    : 'rgba(148, 163, 184, 0.5)';
  
  const strokeColor = payload.trend === 'up' 
    ? '#10b981' 
    : payload.trend === 'down' 
    ? '#f43f5e'
    : '#64748b';

  return (
    <g>
      {/* Glow effect for top 5 */}
      {payload.rank <= 5 && (
        <circle
          cx={cx}
          cy={cy}
          r={size + 8}
          fill={payload.trend === 'up' ? 'rgba(16, 185, 129, 0.15)' : payload.trend === 'down' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(148, 163, 184, 0.1)'}
          className="animate-pulse"
        />
      )}
      
      {/* Main bubble */}
      <circle
        cx={cx}
        cy={cy}
        r={size}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
      />
      
      {/* Logo or Initial */}
      {payload.logo_url ? (
        <image
          href={payload.logo_url}
          x={cx - size * 0.5}
          y={cy - size * 0.5}
          width={size}
          height={size}
          clipPath={`circle(${size * 0.5}px at ${size * 0.5}px ${size * 0.5}px)`}
          style={{ pointerEvents: 'none' }}
        />
      ) : (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize={Math.max(10, size * 0.35)}
          fontWeight="bold"
          style={{ pointerEvents: 'none' }}
        >
          {payload.ticker.substring(0, 3)}
        </text>
      )}
      
      {/* Ticker label for larger bubbles */}
      {size >= 35 && (
        <text
          x={cx}
          y={cy + size + 14}
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize={11}
          fontWeight="500"
          style={{ pointerEvents: 'none' }}
        >
          {payload.ticker}
        </text>
      )}
    </g>
  );
};

export default function HypeGalaxyMap({ projects }: HypeGalaxyMapProps) {
  // Transform data for the scatter chart
  const chartData = useMemo(() => {
    return projects.map(project => ({
      ...project,
      x: project.mindshare, // X-axis: Mindshare %
      y: project.mindshare_change ?? 0, // Y-axis: Change %
      z: Math.max(60, Math.log(project.score + 1) * 25), // Bubble size based on score
    }));
  }, [projects]);

  // Calculate domain for better visualization
  const { xDomain, yDomain } = useMemo(() => {
    if (chartData.length === 0) return { xDomain: [0, 10], yDomain: [-20, 20] };
    
    const xValues = chartData.map(d => d.x);
    const yValues = chartData.map(d => d.y);
    
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    
    // Add padding
    const yPadding = Math.max(10, (yMax - yMin) * 0.2);
    
    return {
      xDomain: [0, Math.ceil(xMax * 1.1)],
      yDomain: [Math.floor(yMin - yPadding), Math.ceil(yMax + yPadding)]
    };
  }, [chartData]);

  // Separate data by trend for layering
  const upTrend = chartData.filter(d => d.trend === 'up');
  const downTrend = chartData.filter(d => d.trend === 'down');
  const neutralTrend = chartData.filter(d => d.trend === 'neutral');

  // Stats for legend
  const stats = useMemo(() => ({
    trending: chartData.filter(d => d.y > 10).length,
    stable: chartData.filter(d => Math.abs(d.y) <= 10).length,
    declining: chartData.filter(d => d.y < -10).length,
  }), [chartData]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/50 via-slate-900/30 to-slate-950/50 rounded-2xl border border-white/[0.06] p-4 sm:p-6 relative overflow-hidden">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Corner glow effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-400" />
            Hype Galaxy
          </h2>
          <span className="text-[10px] font-medium text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
            BETA
          </span>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Rising</span>
            <span className="text-white font-medium">{stats.trending}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="text-slate-400">Stable</span>
            <span className="text-white font-medium">{stats.stable}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-400">Falling</span>
            <span className="text-white font-medium">{stats.declining}</span>
          </div>
        </div>
      </div>

      {/* Axis Labels */}
      <div className="relative flex items-center justify-center mb-2">
        <div className="absolute left-0 flex items-center gap-2 text-xs text-slate-500">
          <span>← Low Mindshare</span>
        </div>
        <div className="absolute right-0 flex items-center gap-2 text-xs text-slate-500">
          <span>High Mindshare →</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="85%">
        <ScatterChart
          margin={{ top: 30, right: 30, bottom: 40, left: 50 }}
        >
          <defs>
            <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.05)" 
            vertical={true}
            horizontal={true}
          />
          
          {/* X-axis: Mindshare % */}
          <XAxis 
            type="number" 
            dataKey="x" 
            domain={xDomain}
            stroke="rgba(255,255,255,0.1)"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickFormatter={(value) => `${value}%`}
          >
            <Label 
              value="Mindshare %" 
              position="bottom" 
              offset={20}
              style={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            />
          </XAxis>

          {/* Y-axis: Momentum (Change %) */}
          <YAxis 
            type="number" 
            dataKey="y"
            domain={yDomain}
            stroke="rgba(255,255,255,0.1)"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}%`}
          >
            <Label 
              value="Momentum" 
              angle={-90} 
              position="insideLeft"
              offset={-10}
              style={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12, textAnchor: 'middle' }}
            />
          </YAxis>
          
          {/* Z-axis: Bubble size */}
          <ZAxis type="number" dataKey="z" range={[60, 400]} />

          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeDasharray: '3 3' }}
            wrapperStyle={{ zIndex: 100 }}
          />
          
          {/* Reference line at y=0 */}
          <ReferenceLine 
            y={0} 
            stroke="rgba(255,255,255,0.15)" 
            strokeDasharray="5 5"
            label={{
              value: 'Neutral',
              position: 'right',
              fill: 'rgba(255,255,255,0.3)',
              fontSize: 10
            }}
          />

          {/* Neutral trend (render first - background) */}
          <Scatter 
            name="Neutral" 
            data={neutralTrend} 
            shape={<CustomDot />}
          />

          {/* Down trend */}
          <Scatter 
            name="Trending Down" 
            data={downTrend} 
            shape={<CustomDot />}
          />

          {/* Up trend (render last - foreground) */}
          <Scatter 
            name="Trending Up" 
            data={upTrend} 
            shape={<CustomDot />}
          />

        </ScatterChart>
      </ResponsiveContainer>

      {/* Quadrant labels */}
      <div className="absolute top-16 right-8 text-[10px] text-teal-400/60 font-medium hidden sm:block">
        🚀 HOT & RISING
      </div>
      <div className="absolute top-16 left-16 text-[10px] text-violet-400/60 font-medium hidden sm:block">
        💎 HIDDEN GEMS
      </div>
      <div className="absolute bottom-16 right-8 text-[10px] text-slate-500/60 font-medium hidden sm:block">
        📊 ESTABLISHED
      </div>
      <div className="absolute bottom-16 left-16 text-[10px] text-rose-400/60 font-medium hidden sm:block">
        ⚠️ COOLING OFF
      </div>
    </div>
  );
}
