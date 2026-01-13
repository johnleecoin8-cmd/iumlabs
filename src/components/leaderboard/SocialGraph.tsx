import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, TrendingUp, TrendingDown } from 'lucide-react';
import type { HypeProject } from '@/hooks/useHypeProjects';

interface SocialGraphProps {
  projects: HypeProject[];
  onProjectHover: (projectId: string | null) => void;
  activeProjectId: string | null;
}

// Normalize sparkline data to 0-100 range for visualization
const normalizeSparkline = (data: number[]): number[] => {
  if (!data || data.length === 0) return [];
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  return data.map(v => ((v - min) / range) * 100);
};

// Generate fallback sparkline data when DB data is not available
const generateFallbackSparkline = (isPositive: boolean): number[] => {
  const points = [];
  let value = 50;
  for (let i = 0; i < 24; i++) {
    const change = (Math.random() - 0.5) * 15;
    value = Math.max(10, Math.min(90, value + change + (isPositive ? 1 : -1)));
    points.push(value);
  }
  return points;
};

// Treemap layout algorithm
const calculateTreemap = (
  items: { value: number; id: string }[],
  width: number,
  height: number,
  x: number = 0,
  y: number = 0
): { id: string; x: number; y: number; width: number; height: number }[] => {
  if (items.length === 0) return [];
  if (items.length === 1) {
    return [{ id: items[0].id, x, y, width, height }];
  }

  const total = items.reduce((sum, item) => sum + item.value, 0);
  
  let leftSum = 0;
  let splitIndex = 0;
  for (let i = 0; i < items.length; i++) {
    if (leftSum + items[i].value <= total / 2) {
      leftSum += items[i].value;
      splitIndex = i + 1;
    } else {
      break;
    }
  }
  
  if (splitIndex === 0) splitIndex = 1;
  if (splitIndex === items.length) splitIndex = items.length - 1;
  
  const leftItems = items.slice(0, splitIndex);
  const rightItems = items.slice(splitIndex);
  const leftTotal = leftItems.reduce((sum, item) => sum + item.value, 0);
  
  const isHorizontalSplit = width >= height;
  
  if (isHorizontalSplit) {
    const leftWidth = (leftTotal / total) * width;
    return [
      ...calculateTreemap(leftItems, leftWidth, height, x, y),
      ...calculateTreemap(rightItems, width - leftWidth, height, x + leftWidth, y),
    ];
  } else {
    const topHeight = (leftTotal / total) * height;
    return [
      ...calculateTreemap(leftItems, width, topHeight, x, y),
      ...calculateTreemap(rightItems, width, height - topHeight, x, y + topHeight),
    ];
  }
};

// Sparkline component
const Sparkline = ({ data, isPositive, width, height }: { data: number[]; isPositive: boolean; width: number; height: number }) => {
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (value / 100) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="absolute bottom-0 left-0 right-0 opacity-40">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? '#10B981' : '#EF4444'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SocialGraph = ({ projects, onProjectHover, activeProjectId }: SocialGraphProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Calculate treemap layout with sparkline data
  const treemapData = useMemo(() => {
    const topProjects = projects.slice(0, 20);
    const containerWidth = 100;
    const containerHeight = 100;
    const gap = 0.5;

    const items = topProjects.map(p => ({
      value: Math.max(Number(p.score), 50),
      id: p.id,
    }));

    const layout = calculateTreemap(items, containerWidth, containerHeight);

    return topProjects.map((project) => {
      const rect = layout.find(l => l.id === project.id);
      
      // Use trend from DB
      const isPositive = project.trend === 'positive';
      
      // Use real sparkline from DB if available, otherwise generate fallback
      const sparklineData = project.sparkline && project.sparkline.length > 0
        ? normalizeSparkline(project.sparkline)
        : generateFallbackSparkline(isPositive);
      
      return {
        ...project,
        x: (rect?.x || 0) + gap,
        y: (rect?.y || 0) + gap,
        width: Math.max((rect?.width || 10) - gap * 2, 8),
        height: Math.max((rect?.height || 10) - gap * 2, 8),
        isPositive,
        sparklineData,
        displayName: project.ticker ? `$${project.ticker}` : project.name,
      };
    });
  }, [projects]);

  const handleMouseEnter = (projectId: string) => {
    setHoveredId(projectId);
    onProjectHover(projectId);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    onProjectHover(null);
  };

  const isHighlighted = (projectId: string) => {
    return hoveredId === projectId || activeProjectId === projectId;
  };

  return (
    <div className="relative w-full h-full min-h-[450px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/[0.05]">
        <div>
          <h3 className="text-base font-semibold text-white">Top 20 Hype</h3>
          <p className="text-xs text-white/40 mt-0.5">Score Distribution</p>
        </div>
      </div>

      {/* Treemap Container */}
      <div className="flex-1 p-2">
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#0d0d0d]">
          {treemapData.map((node, index) => {
            const highlighted = isHighlighted(node.id);
            const isLarge = node.width > 20 && node.height > 15;
            const isMedium = node.width > 12 || node.height > 12;
            
            // Calculate pixel dimensions for sparkline
            const cellWidth = (node.width / 100) * 400;
            const cellHeight = (node.height / 100) * 350;
            
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                onMouseEnter={() => handleMouseEnter(node.id)}
                onMouseLeave={handleMouseLeave}
                className={`absolute cursor-pointer overflow-hidden transition-all duration-200 ${
                  highlighted ? 'z-10 ring-1 ring-white/30' : ''
                }`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: `${node.width}%`,
                  height: `${node.height}%`,
                  background: node.isPositive 
                    ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)'
                    : 'linear-gradient(180deg, rgba(127, 29, 29, 0.4) 0%, rgba(127, 29, 29, 0.2) 100%)',
                  borderRadius: '6px',
                  border: `1px solid ${node.isPositive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)'}`,
                }}
              >
                {/* Sparkline background */}
                {isMedium && (
                  <Sparkline 
                    data={node.sparklineData} 
                    isPositive={node.isPositive}
                    width={cellWidth}
                    height={cellHeight}
                  />
                )}

                {/* Content */}
                <div className="relative z-10 p-2 h-full flex flex-col">
                  {/* Top row - Logo & Crown */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1.5">
                      {/* Avatar/Logo placeholder */}
                      <div className={`rounded-full bg-white/10 flex items-center justify-center text-white/60 font-medium ${
                        isLarge ? 'w-6 h-6 text-xs' : 'w-4 h-4 text-[8px]'
                      }`}>
                        {node.displayName.charAt(0)}
                      </div>
                      {isLarge && (
                        <span className="text-white font-medium text-sm truncate max-w-[80px]">
                          {node.displayName}
                        </span>
                      )}
                    </div>
                    {node.rank <= 2 && isLarge && (
                      <Crown className={`w-4 h-4 ${node.rank === 1 ? 'text-yellow-400' : 'text-gray-400'}`} />
                    )}
                  </div>

                  {/* Name for medium cells */}
                  {!isLarge && isMedium && (
                    <span className="text-white font-medium text-[10px] mt-1 truncate">
                      {node.displayName.length > 8 ? node.displayName.slice(0, 7) + '..' : node.displayName}
                    </span>
                  )}

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Bottom - Score */}
                  <div className="mt-auto">
                    <span className={`font-semibold ${
                      isLarge ? 'text-lg' : isMedium ? 'text-sm' : 'text-[10px]'
                    } ${node.isPositive ? 'text-emerald-400' : 'text-white/80'}`}>
                      {Number(node.score).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                {highlighted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/[0.03] pointer-events-none"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Legend */}
      <div className="p-4 border-t border-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-b from-emerald-500/30 to-emerald-500/10 border border-emerald-500/30" />
              <span className="text-xs text-white/50">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-b from-red-900/60 to-red-900/30 border border-red-500/20" />
              <span className="text-xs text-white/50">Negative</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>Total: <span className="text-white/60 font-medium">{projects.length}</span></span>
            <span>|</span>
            <span>Avg: <span className="text-white/60 font-medium">
              {projects.length > 0 
                ? Math.round(projects.reduce((a, b) => a + Number(b.score), 0) / projects.length).toLocaleString()
                : '0'
              }
            </span></span>
          </div>
        </div>
      </div>

      {/* Hover tooltip for small cells */}
      {hoveredId && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-4 right-4 p-3 rounded-lg bg-black/95 backdrop-blur-sm border border-white/10 z-20"
        >
          {(() => {
            const project = treemapData.find(p => p.id === hoveredId);
            if (!project) return null;
            
            return (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                      project.isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    #{project.rank}
                  </div>
                  <div>
                    <p className="text-white font-medium">{project.displayName}</p>
                    <p className="text-white/40 text-xs">{project.ticker}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold text-lg">
                    {Number(project.score).toLocaleString()}
                  </p>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    project.isPositive ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {project.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{project.trend}</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};

export default SocialGraph;
