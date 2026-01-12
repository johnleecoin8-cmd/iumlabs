import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  slug: string;
  rank: number;
  mindshare_score: number;
  previous_score: number;
  category: string;
  logo_url: string | null;
}

interface SocialGraphProps {
  projects: Project[];
  onProjectHover: (projectId: string | null) => void;
  activeProjectId: string | null;
}

// Category color mapping with gradients
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Layer 1': { bg: 'rgba(59, 130, 246, 0.15)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.3)' },
  'Layer 2': { bg: 'rgba(16, 185, 129, 0.15)', text: '#10B981', border: 'rgba(16, 185, 129, 0.3)' },
  'DeFi': { bg: 'rgba(139, 92, 246, 0.15)', text: '#8B5CF6', border: 'rgba(139, 92, 246, 0.3)' },
  'AI': { bg: 'rgba(236, 72, 153, 0.15)', text: '#EC4899', border: 'rgba(236, 72, 153, 0.3)' },
  'Gaming': { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' },
  'Infrastructure': { bg: 'rgba(6, 182, 212, 0.15)', text: '#06B6D4', border: 'rgba(6, 182, 212, 0.3)' },
  'Exchange': { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' },
  'default': { bg: 'rgba(107, 114, 128, 0.15)', text: '#6B7280', border: 'rgba(107, 114, 128, 0.3)' },
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
  
  // Split items into two groups with roughly equal total values
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
  const rightTotal = rightItems.reduce((sum, item) => sum + item.value, 0);
  
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

const SocialGraph = ({ projects, onProjectHover, activeProjectId }: SocialGraphProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Calculate treemap layout
  const treemapData = useMemo(() => {
    const topProjects = projects.slice(0, 15);
    const containerWidth = 100;
    const containerHeight = 100;
    const padding = 0.5;

    const items = topProjects.map(p => ({
      value: Math.max(p.mindshare_score, 10),
      id: p.id,
    }));

    const layout = calculateTreemap(items, containerWidth, containerHeight);

    return topProjects.map((project, index) => {
      const rect = layout.find(l => l.id === project.id);
      const colors = categoryColors[project.category] || categoryColors.default;
      
      return {
        ...project,
        x: (rect?.x || 0) + padding,
        y: (rect?.y || 0) + padding,
        width: Math.max((rect?.width || 10) - padding * 2, 5),
        height: Math.max((rect?.height || 10) - padding * 2, 5),
        colors,
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

  // Calculate percentage change
  const getChange = (project: Project) => {
    if (project.previous_score === 0) return 0;
    return ((project.mindshare_score - project.previous_score) / project.previous_score) * 100;
  };

  return (
    <div className="relative w-full h-full min-h-[450px] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white">Mindshare Distribution</h3>
          <p className="text-xs text-white/40 mt-0.5">Top 15 projects by mindshare</p>
        </div>
        <div className="flex items-center gap-3">
          {['Layer 1', 'DeFi', 'AI'].map(cat => (
            <div key={cat} className="flex items-center gap-1.5">
              <div 
                className="w-2 h-2 rounded-sm" 
                style={{ backgroundColor: categoryColors[cat]?.text || '#666' }}
              />
              <span className="text-[10px] text-white/40">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Treemap Container */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.05]">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {treemapData.map((node, index) => {
            const highlighted = isHighlighted(node.id);
            const change = getChange(node);
            const showLabel = node.width > 12 && node.height > 10;
            const showScore = node.width > 15 && node.height > 12;
            
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                onMouseEnter={() => handleMouseEnter(node.id)}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer"
              >
                {/* Background rect */}
                <motion.rect
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  rx={0.8}
                  fill={node.colors.bg}
                  stroke={highlighted ? node.colors.text : node.colors.border}
                  strokeWidth={highlighted ? 0.3 : 0.1}
                  initial={{ scale: 0.9 }}
                  animate={{ 
                    scale: highlighted ? 0.98 : 1,
                    fill: highlighted ? node.colors.bg.replace('0.15', '0.25') : node.colors.bg
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
                
                {/* Rank badge for top 3 */}
                {node.rank <= 3 && (
                  <g>
                    <circle
                      cx={node.x + 2.5}
                      cy={node.y + 2.5}
                      r={2}
                      fill={node.rank === 1 ? '#FFD700' : node.rank === 2 ? '#C0C0C0' : '#CD7F32'}
                    />
                    <text
                      x={node.x + 2.5}
                      y={node.y + 2.5}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#000"
                      fontSize="1.5"
                      fontWeight="bold"
                    >
                      {node.rank}
                    </text>
                  </g>
                )}
                
                {/* Project name */}
                {showLabel && (
                  <text
                    x={node.x + node.width / 2}
                    y={node.y + node.height / 2 - (showScore ? 1.5 : 0)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#fff"
                    fontSize={Math.min(node.width / 8, 3)}
                    fontWeight="600"
                    className="pointer-events-none"
                  >
                    {node.name.length > 10 ? node.name.slice(0, 8) + '..' : node.name}
                  </text>
                )}
                
                {/* Score */}
                {showScore && (
                  <text
                    x={node.x + node.width / 2}
                    y={node.y + node.height / 2 + 2.5}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={node.colors.text}
                    fontSize={Math.min(node.width / 10, 2)}
                    fontWeight="500"
                    className="pointer-events-none"
                  >
                    {node.mindshare_score.toLocaleString()}
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10"
          >
            {(() => {
              const project = treemapData.find(p => p.id === hoveredId);
              if (!project) return null;
              const change = getChange(project);
              
              return (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: project.colors.bg, color: project.colors.text }}
                    >
                      #{project.rank}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{project.name}</p>
                      <p className="text-white/40 text-xs">{project.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{project.mindshare_score.toLocaleString()}</p>
                    <p className={`text-xs font-medium ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>

      {/* Bottom stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
          <p className="text-xs text-white/40 mb-1">Total Projects</p>
          <p className="text-lg font-semibold text-white">{projects.length}</p>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
          <p className="text-xs text-white/40 mb-1">Top Category</p>
          <p className="text-lg font-semibold text-white">
            {projects.length > 0 ? projects[0]?.category || 'N/A' : 'N/A'}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
          <p className="text-xs text-white/40 mb-1">Avg Score</p>
          <p className="text-lg font-semibold text-white">
            {projects.length > 0 
              ? Math.round(projects.reduce((a, b) => a + b.mindshare_score, 0) / projects.length).toLocaleString()
              : '0'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialGraph;
