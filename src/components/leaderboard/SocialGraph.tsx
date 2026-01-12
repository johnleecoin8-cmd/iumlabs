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

// Category color mapping
const categoryColors: Record<string, string> = {
  'Layer 1': '#3B82F6',     // Blue
  'Layer 2': '#10B981',     // Emerald
  'DeFi': '#8B5CF6',        // Violet
  'AI': '#EC4899',          // Pink
  'Gaming': '#F59E0B',      // Amber
  'Infrastructure': '#06B6D4', // Cyan
  'Exchange': '#EF4444',    // Red
  'default': '#6B7280',     // Gray
};

const SocialGraph = ({ projects, onProjectHover, activeProjectId }: SocialGraphProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Calculate node positions in a circular layout
  const nodes = useMemo(() => {
    const topProjects = projects.slice(0, 20);
    const centerX = 250;
    const centerY = 250;
    
    return topProjects.map((project, index) => {
      const total = topProjects.length;
      const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
      
      // Vary radius based on rank - top ranked closer to center
      const baseRadius = 80 + (index * 6);
      const radius = Math.min(baseRadius, 180);
      
      // Node size based on mindshare score
      const maxScore = Math.max(...topProjects.map(p => p.mindshare_score));
      const minSize = 16;
      const maxSize = 50;
      const size = minSize + ((project.mindshare_score / maxScore) * (maxSize - minSize));
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const color = categoryColors[project.category] || categoryColors.default;
      
      return {
        ...project,
        x,
        y,
        size,
        color,
      };
    });
  }, [projects]);

  // Generate connection lines between same-category projects
  const connections = useMemo(() => {
    const lines: { from: typeof nodes[0]; to: typeof nodes[0]; key: string }[] = [];
    
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((otherNode) => {
        if (node.category === otherNode.category) {
          lines.push({
            from: node,
            to: otherNode,
            key: `${node.id}-${otherNode.id}`,
          });
        }
      });
    });
    
    return lines;
  }, [nodes]);

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
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full max-w-[500px] max-h-[500px]"
        style={{ overflow: 'visible' }}
      >
        {/* Background glow */}
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          
          {/* Glow filter for active nodes */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <circle cx="250" cy="250" r="200" fill="url(#centerGlow)" />
        
        {/* Connection lines */}
        {connections.map(({ from, to, key }) => {
          const isLineHighlighted = 
            hoveredId === from.id || 
            hoveredId === to.id ||
            activeProjectId === from.id ||
            activeProjectId === to.id;
          
          return (
            <motion.line
              key={key}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={from.color}
              strokeWidth={isLineHighlighted ? 1.5 : 0.5}
              strokeOpacity={isLineHighlighted ? 0.6 : 0.1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          );
        })}
        
        {/* Project nodes */}
        {nodes.map((node, index) => {
          const highlighted = isHighlighted(node.id);
          
          return (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: highlighted ? 1.2 : 1, 
                opacity: 1 
              }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: index * 0.03 
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              onMouseEnter={() => handleMouseEnter(node.id)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            >
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size / 2}
                fill={node.color}
                fillOpacity={highlighted ? 0.9 : 0.6}
                stroke={highlighted ? '#fff' : node.color}
                strokeWidth={highlighted ? 2 : 1}
                strokeOpacity={highlighted ? 1 : 0.3}
                filter={highlighted ? 'url(#glow)' : undefined}
              />
              
              {/* Rank number for top 3 */}
              {node.rank <= 3 && (
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#fff"
                  fontSize={node.size / 3}
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {node.rank}
                </text>
              )}
              
              {/* Project name tooltip */}
              {highlighted && (
                <motion.g
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <rect
                    x={node.x - 40}
                    y={node.y - node.size / 2 - 28}
                    width={80}
                    height={22}
                    rx={4}
                    fill="hsl(var(--background))"
                    stroke="hsl(var(--border))"
                    strokeWidth={1}
                  />
                  <text
                    x={node.x}
                    y={node.y - node.size / 2 - 14}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={10}
                    fontWeight="500"
                    className="pointer-events-none"
                  >
                    {node.name.length > 12 ? node.name.slice(0, 12) + '...' : node.name}
                  </text>
                </motion.g>
              )}
            </motion.g>
          );
        })}
        
        {/* Center label */}
        <text
          x="250"
          y="250"
          textAnchor="middle"
          dominantBaseline="central"
          fill="hsl(var(--muted-foreground))"
          fontSize="10"
          className="uppercase tracking-widest pointer-events-none"
        >
          Mindshare
        </text>
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        {Object.entries(categoryColors).slice(0, 6).map(([category, color]) => (
          <div key={category} className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] text-white/40">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialGraph;
