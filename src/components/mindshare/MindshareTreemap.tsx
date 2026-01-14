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
      {/* Kaito-style Treemap Grid - NO GAPS, fills viewport completely */}
      <div className="grid grid-cols-12 gap-0 h-full w-full" style={{ gridTemplateRows: 'repeat(6, 1fr)' }}>
        
        {/* #1 - Largest cell (left side, spans 5 cols x 3 rows) */}
        {layout[0] && (
          <div className="col-span-5 row-span-3">
            {renderCell(layout[0], 0)}
          </div>
        )}

        {/* #2 - Second largest (top middle-right, 4 cols x 2 rows) */}
        {layout[1] && (
          <div className="col-span-4 row-span-2">
            {renderCell(layout[1], 1)}
          </div>
        )}

        {/* #3 - Third (top right, 3 cols x 2 rows) */}
        {layout[2] && (
          <div className="col-span-3 row-span-2">
            {renderCell(layout[2], 2)}
          </div>
        )}

        {/* #4, #5 - Medium cells below #2, #3 */}
        {layout[3] && (
          <div className="col-span-4 row-span-1">
            {renderCell(layout[3], 3)}
          </div>
        )}
        {layout[4] && (
          <div className="col-span-3 row-span-1">
            {renderCell(layout[4], 4)}
          </div>
        )}

        {/* #6 - Left side row 4-5 */}
        {layout[5] && (
          <div className="col-span-3 row-span-2">
            {renderCell(layout[5], 5)}
          </div>
        )}
        
        {/* #7 - Next to #6 */}
        {layout[6] && (
          <div className="col-span-3 row-span-2">
            {renderCell(layout[6], 6)}
          </div>
        )}

        {/* Right side: #8-#13 in 2x3 grid - NO GAPS */}
        <div className="col-span-6 row-span-2 grid grid-cols-3 grid-rows-2 gap-0">
          {layout.slice(7, 13).map((project, i) => (
            <div key={project.id}>
              {renderCell(project, i + 7)}
            </div>
          ))}
        </div>

        {/* Bottom row: 12 columns for remaining projects */}
        {layout.slice(13, 20).map((project, i) => (
          <div key={project.id} className="col-span-1 row-span-1">
            {renderCell(project, i + 13)}
          </div>
        ))}

        {/* Fill remaining space with empty cells if less than 20 projects */}
        {layout.length >= 13 && layout.length < 20 && Array.from({ length: 12 - (layout.length - 13) }).map((_, i) => (
          <div key={`empty-${i}`} className="col-span-1 row-span-1 bg-black/40 border-[0.5px] border-white/5" />
        ))}
      </div>
    </motion.div>
  );
};

export default MindshareTreemap;
