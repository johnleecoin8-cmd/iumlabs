import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import MindshareCell from './MindshareCell';

export interface MindshareProject {
  id: string;
  ticker: string;
  name: string;
  mindshare: number;
  score: number;
  trend: 'up' | 'down' | 'neutral';
  sparkline: number[];
  logo_url: string | null;
  rank: number;
  token_status?: 'tge' | 'pre-tge';
}

interface MindshareTreemapProps {
  projects: MindshareProject[];
  className?: string;
}

const MindshareTreemap = ({ projects, className }: MindshareTreemapProps) => {
  const [hoveredTicker, setHoveredTicker] = useState<string | null>(null);

  // Calculate treemap layout based on mindshare
  const layout = useMemo(() => {
    if (!projects.length) return [];

    // Sort by mindshare descending
    const sorted = [...projects].sort((a, b) => b.mindshare - a.mindshare);
    
    // Calculate total mindshare
    const totalMindshare = sorted.reduce((sum, p) => sum + p.mindshare, 0);
    
    // Assign sizes based on mindshare ratio
    return sorted.map((project, index) => {
      const ratio = project.mindshare / totalMindshare;
      let size: 'large' | 'medium' | 'small' | 'tiny';
      
      if (ratio > 0.08 || index < 3) {
        size = 'large';
      } else if (ratio > 0.04 || index < 8) {
        size = 'medium';
      } else if (ratio > 0.02 || index < 15) {
        size = 'small';
      } else {
        size = 'tiny';
      }

      return {
        ...project,
        size,
        ratio,
      };
    });
  }, [projects]);

  // Group projects by size for layout
  const grouped = useMemo(() => {
    const large = layout.filter(p => p.size === 'large');
    const medium = layout.filter(p => p.size === 'medium');
    const small = layout.filter(p => p.size === 'small');
    const tiny = layout.filter(p => p.size === 'tiny');
    
    return { large, medium, small, tiny };
  }, [layout]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut" as const,
      },
    },
  };

  if (!projects.length) {
    return (
      <div className="flex items-center justify-center h-full text-white/40">
        No data available
      </div>
    );
  }

  const renderCell = (project: typeof layout[0], index: number) => (
    <motion.div
      key={project.id}
      variants={itemVariants}
      className={cn(
        'transition-opacity duration-200',
        hoveredTicker && hoveredTicker !== project.ticker && 'opacity-40'
      )}
      onMouseEnter={() => setHoveredTicker(project.ticker)}
      onMouseLeave={() => setHoveredTicker(null)}
    >
      <MindshareCell
        ticker={project.ticker}
        name={project.name}
        mindshare={project.mindshare}
        trend={project.trend}
        tokenStatus={project.token_status}
        sparkline={project.sparkline}
        logoUrl={project.logo_url}
        size={project.size}
      />
    </motion.div>
  );

  return (
    <motion.div 
      className={cn('w-full h-full', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Treemap Grid Layout */}
      <div className="grid grid-cols-12 grid-rows-6 gap-1.5 h-full p-2">
        
        {/* Large cells (Top 3) - Take most space */}
        {grouped.large.slice(0, 1).map((project, i) => (
          <div key={project.id} className="col-span-4 row-span-3">
            {renderCell(project, i)}
          </div>
        ))}

        {grouped.large.slice(1, 2).map((project, i) => (
          <div key={project.id} className="col-span-3 row-span-3">
            {renderCell(project, i + 1)}
          </div>
        ))}

        {/* Medium cells container */}
        <div className="col-span-5 row-span-3 grid grid-cols-2 grid-rows-2 gap-1.5">
          {grouped.large.slice(2, 3).concat(grouped.medium.slice(0, 3)).map((project, i) => (
            <div key={project.id}>
              {renderCell(project, i + 2)}
            </div>
          ))}
        </div>

        {/* Bottom row - Medium and Small cells */}
        <div className="col-span-12 row-span-3 grid grid-cols-6 gap-1.5">
          {grouped.medium.slice(3, 9).map((project, i) => (
            <div key={project.id}>
              {renderCell(project, i + 6)}
            </div>
          ))}
        </div>
      </div>

      {/* Remaining Small/Tiny cells */}
      {(grouped.small.length > 0 || grouped.tiny.length > 0) && (
        <div className="grid grid-cols-8 sm:grid-cols-10 lg:grid-cols-12 gap-1 px-2 pb-2 mt-1">
          {[...grouped.small, ...grouped.tiny].map((project, i) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              className={cn(
                'aspect-square transition-opacity duration-200',
                hoveredTicker && hoveredTicker !== project.ticker && 'opacity-40'
              )}
              onMouseEnter={() => setHoveredTicker(project.ticker)}
              onMouseLeave={() => setHoveredTicker(null)}
            >
              <MindshareCell
                ticker={project.ticker}
                name={project.name}
                mindshare={project.mindshare}
                trend={project.trend}
                tokenStatus={project.token_status}
                sparkline={project.sparkline}
                logoUrl={project.logo_url}
                size={project.size}
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MindshareTreemap;
