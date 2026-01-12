import { useMemo, useState, useEffect } from 'react';
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
const categoryColors: Record<string, { bg: string; text: string; glow: string }> = {
  'Layer 1': { bg: 'rgba(59, 130, 246, 0.2)', text: '#3B82F6', glow: '0 0 20px rgba(59, 130, 246, 0.4)' },
  'Layer 2': { bg: 'rgba(16, 185, 129, 0.2)', text: '#10B981', glow: '0 0 20px rgba(16, 185, 129, 0.4)' },
  'DeFi': { bg: 'rgba(139, 92, 246, 0.2)', text: '#8B5CF6', glow: '0 0 20px rgba(139, 92, 246, 0.4)' },
  'AI': { bg: 'rgba(236, 72, 153, 0.2)', text: '#EC4899', glow: '0 0 20px rgba(236, 72, 153, 0.4)' },
  'Gaming': { bg: 'rgba(245, 158, 11, 0.2)', text: '#F59E0B', glow: '0 0 20px rgba(245, 158, 11, 0.4)' },
  'Infrastructure': { bg: 'rgba(6, 182, 212, 0.2)', text: '#06B6D4', glow: '0 0 20px rgba(6, 182, 212, 0.4)' },
  'Exchange': { bg: 'rgba(239, 68, 68, 0.2)', text: '#EF4444', glow: '0 0 20px rgba(239, 68, 68, 0.4)' },
  'default': { bg: 'rgba(107, 114, 128, 0.2)', text: '#6B7280', glow: '0 0 20px rgba(107, 114, 128, 0.4)' },
};

// Bubble packing algorithm
const packBubbles = (
  bubbles: { id: string; radius: number }[],
  containerWidth: number,
  containerHeight: number
) => {
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  
  const positions: { id: string; x: number; y: number; radius: number }[] = [];
  
  // Sort by radius (largest first)
  const sorted = [...bubbles].sort((a, b) => b.radius - a.radius);
  
  sorted.forEach((bubble, index) => {
    if (index === 0) {
      // First bubble goes to center
      positions.push({ ...bubble, x: centerX, y: centerY });
      return;
    }
    
    // Try to find a position that doesn't overlap
    let bestPosition = { x: centerX, y: centerY };
    let minDistance = Infinity;
    
    // Try multiple angles around placed bubbles
    for (let attempts = 0; attempts < 100; attempts++) {
      const angle = (attempts / 100) * Math.PI * 2;
      const distance = 30 + attempts * 2;
      
      const testX = centerX + Math.cos(angle) * distance;
      const testY = centerY + Math.sin(angle) * distance;
      
      // Check for overlaps
      let hasOverlap = false;
      for (const placed of positions) {
        const dx = testX - placed.x;
        const dy = testY - placed.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = bubble.radius + placed.radius + 4;
        
        if (dist < minDist) {
          hasOverlap = true;
          break;
        }
      }
      
      if (!hasOverlap) {
        const distFromCenter = Math.sqrt(
          Math.pow(testX - centerX, 2) + Math.pow(testY - centerY, 2)
        );
        if (distFromCenter < minDistance) {
          minDistance = distFromCenter;
          bestPosition = { x: testX, y: testY };
        }
      }
    }
    
    positions.push({ ...bubble, ...bestPosition });
  });
  
  return positions;
};

const SocialGraph = ({ projects, onProjectHover, activeProjectId }: SocialGraphProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 400, height: 350 });

  // Calculate bubble positions
  const bubbles = useMemo(() => {
    const topProjects = projects.slice(0, 15);
    const maxScore = Math.max(...topProjects.map(p => p.mindshare_score), 1);
    const minRadius = 25;
    const maxRadius = 55;

    const bubbleData = topProjects.map(project => {
      const normalizedScore = project.mindshare_score / maxScore;
      const radius = minRadius + normalizedScore * (maxRadius - minRadius);
      
      return {
        id: project.id,
        radius,
      };
    });

    const positions = packBubbles(bubbleData, containerSize.width, containerSize.height);

    return topProjects.map(project => {
      const pos = positions.find(p => p.id === project.id);
      const colors = categoryColors[project.category] || categoryColors.default;
      
      return {
        ...project,
        x: pos?.x || containerSize.width / 2,
        y: pos?.y || containerSize.height / 2,
        radius: pos?.radius || 30,
        colors,
      };
    });
  }, [projects, containerSize]);

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

  const getChange = (project: Project) => {
    if (project.previous_score === 0) return 0;
    return ((project.mindshare_score - project.previous_score) / project.previous_score) * 100;
  };

  return (
    <div className="relative w-full h-full min-h-[450px] p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white">Mindshare Bubbles</h3>
          <p className="text-xs text-white/40 mt-0.5">Size = Mindshare Score</p>
        </div>
        <div className="flex items-center gap-3">
          {['Layer 1', 'DeFi', 'AI'].map(cat => (
            <div key={cat} className="flex items-center gap-1.5">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: categoryColors[cat]?.text || '#666' }}
              />
              <span className="text-[10px] text-white/40">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bubble Chart Container */}
      <div 
        className="relative flex-1 rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.05]"
        style={{ minHeight: 350 }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
        </div>

        {/* Bubbles */}
        <svg 
          viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {bubbles.map(bubble => (
              <radialGradient key={`grad-${bubble.id}`} id={`bubble-grad-${bubble.id}`} cx="30%" cy="30%">
                <stop offset="0%" stopColor={bubble.colors.text} stopOpacity="0.4" />
                <stop offset="100%" stopColor={bubble.colors.text} stopOpacity="0.1" />
              </radialGradient>
            ))}
            <filter id="bubble-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {bubbles.map((bubble, index) => {
            const highlighted = isHighlighted(bubble.id);
            const change = getChange(bubble);
            
            return (
              <motion.g
                key={bubble.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.05 
                }}
                style={{ transformOrigin: `${bubble.x}px ${bubble.y}px` }}
                onMouseEnter={() => handleMouseEnter(bubble.id)}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer"
              >
                {/* Outer glow ring */}
                {highlighted && (
                  <motion.circle
                    cx={bubble.x}
                    cy={bubble.y}
                    r={bubble.radius + 4}
                    fill="none"
                    stroke={bubble.colors.text}
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Main bubble */}
                <motion.circle
                  cx={bubble.x}
                  cy={bubble.y}
                  r={bubble.radius}
                  fill={`url(#bubble-grad-${bubble.id})`}
                  stroke={bubble.colors.text}
                  strokeWidth={highlighted ? 2 : 1}
                  strokeOpacity={highlighted ? 0.8 : 0.3}
                  filter={highlighted ? 'url(#bubble-glow)' : undefined}
                  animate={{
                    r: highlighted ? bubble.radius * 1.08 : bubble.radius,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />

                {/* Rank badge */}
                {bubble.rank <= 3 && (
                  <g>
                    <circle
                      cx={bubble.x - bubble.radius * 0.6}
                      cy={bubble.y - bubble.radius * 0.6}
                      r={10}
                      fill={bubble.rank === 1 ? '#FFD700' : bubble.rank === 2 ? '#C0C0C0' : '#CD7F32'}
                    />
                    <text
                      x={bubble.x - bubble.radius * 0.6}
                      y={bubble.y - bubble.radius * 0.6}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#000"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {bubble.rank}
                    </text>
                  </g>
                )}

                {/* Project name */}
                <text
                  x={bubble.x}
                  y={bubble.y - 4}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#fff"
                  fontSize={Math.max(bubble.radius / 4, 9)}
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {bubble.name.length > 8 ? bubble.name.slice(0, 7) + '..' : bubble.name}
                </text>

                {/* Score */}
                <text
                  x={bubble.x}
                  y={bubble.y + 10}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={bubble.colors.text}
                  fontSize={Math.max(bubble.radius / 5, 8)}
                  fontWeight="500"
                  className="pointer-events-none"
                >
                  {bubble.mindshare_score >= 1000 
                    ? (bubble.mindshare_score / 1000).toFixed(1) + 'K'
                    : bubble.mindshare_score
                  }
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/90 backdrop-blur-sm border border-white/10"
          >
            {(() => {
              const project = bubbles.find(p => p.id === hoveredId);
              if (!project) return null;
              const change = getChange(project);
              
              return (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2"
                      style={{ 
                        backgroundColor: project.colors.bg, 
                        color: project.colors.text,
                        borderColor: project.colors.text 
                      }}
                    >
                      #{project.rank}
                    </div>
                    <div>
                      <p className="text-white font-medium">{project.name}</p>
                      <p className="text-white/40 text-xs">{project.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold text-lg">{project.mindshare_score.toLocaleString()}</p>
                    <p className={`text-xs font-medium ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
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
