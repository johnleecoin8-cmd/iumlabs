import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { treemap, hierarchy, treemapSquarify, HierarchyRectangularNode } from 'd3-hierarchy';
import MindshareCell from './MindshareCell';
import ProjectDetailModal from './ProjectDetailModal';
import { cn } from '@/lib/utils';

export interface MindshareProject {
  id: string;
  ticker: string;
  name: string;
  mindshare: number;
  mindshare_change?: number | null;
  narrative?: string | null;
  score: number;
  trend: 'up' | 'down' | 'neutral';
  sparkline: number[];
  logo_url: string | null;
  rank: number;
  token_status?: 'tge' | 'pre-tge';
  // Price data
  price?: number | null;
  market_cap?: number | null;
  change_24h?: number | null;
  // Social links
  twitter_url?: string | null;
  website_url?: string | null;
  // Trending signal
  isTrending?: boolean;
}

interface MindshareTreemapProps {
  projects: MindshareProject[];
  className?: string;
}

interface TreemapDataNode extends MindshareProject {
  value: number;
}

interface TreemapNode {
  data: TreemapDataNode;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

const MindshareTreemap: React.FC<MindshareTreemapProps> = ({ projects, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedProject, setSelectedProject] = useState<MindshareProject | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Measure container size with ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const { width, height } = container.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Calculate treemap layout using d3-hierarchy - STRICTLY 20 items
  const nodes = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || projects.length === 0) {
      return [];
    }

    // Take EXACTLY top 20 projects sorted by mindshare
    const top20 = [...projects]
      .sort((a, b) => b.mindshare - a.mindshare)
      .slice(0, 20)
      .map((p, i) => ({
        ...p,
        rank: i + 1,
        value: Math.max(p.mindshare, 0.1) // Ensure minimum value for visibility
      }));

    // Create hierarchy data structure
    const root = hierarchy<{ children?: TreemapDataNode[] }>({ children: top20 })
      .sum(d => (d as TreemapDataNode).value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    // Create treemap layout with refined padding
    const treemapLayout = treemap<{ children?: TreemapDataNode[] }>()
      .size([dimensions.width, dimensions.height])
      .paddingInner(5) // Increased gap between cells for Kaito-style separation
      .paddingOuter(2)
      .round(true)
      .tile(treemapSquarify.ratio(1.1)); // Better aspect ratios

    treemapLayout(root);

    // Extract leaf nodes with their calculated positions
    return root.leaves().map((leaf) => {
      const rectNode = leaf as HierarchyRectangularNode<{ children?: TreemapDataNode[] }>;
      return {
        data: rectNode.data as TreemapDataNode,
        x0: rectNode.x0,
        y0: rectNode.y0,
        x1: rectNode.x1,
        y1: rectNode.y1
      } as TreemapNode;
    });
  }, [projects, dimensions]);

  // Determine cell size based on area ratio
  const getCellSize = (node: TreemapNode): 'large' | 'medium' | 'small' | 'tiny' => {
    const width = node.x1 - node.x0;
    const height = node.y1 - node.y0;
    const area = width * height;
    const containerArea = dimensions.width * dimensions.height;
    const ratio = area / containerArea;

    if (ratio > 0.08) return 'large';
    if (ratio > 0.035) return 'medium';
    if (ratio > 0.015) return 'small';
    return 'tiny';
  };

  if (projects.length === 0) {
    return (
      <div className={cn('flex items-center justify-center h-full', className)}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-white/40 text-sm font-medium">No data available</p>
          <p className="text-white/20 text-xs mt-1">Check back soon for updates</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'relative w-full h-full overflow-hidden',
        'bg-gradient-to-br from-[#030303] via-[#050505] to-[#080808]',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial gradient accent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(20, 184, 166, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Treemap cells */}
      {nodes.map((node, index) => {
        const width = node.x1 - node.x0;
        const height = node.y1 - node.y0;
        
        // Skip rendering if cell is too small
        if (width < 20 || height < 20) return null;

        return (
          <motion.div
            key={node.data.id}
            className="absolute box-border"
            style={{
              left: node.x0,
              top: node.y0,
              width: width,
              height: height,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.02,
              ease: [0.25, 0.1, 0.25, 1] // Custom easing
            }}
          >
            <MindshareCell
              ticker={node.data.ticker}
              name={node.data.name}
              mindshare={node.data.mindshare}
              mindshareChange={node.data.mindshare_change}
              narrative={node.data.narrative}
              trend={node.data.trend}
              tokenStatus={node.data.token_status}
              sparkline={node.data.sparkline}
              logoUrl={node.data.logo_url}
              size={getCellSize(node)}
              rank={node.data.rank}
              isTrending={(node.data as MindshareProject).isTrending}
              price={node.data.price}
              change24h={node.data.change_24h}
              onClick={() => {
                setSelectedProject(node.data);
                setModalOpen(true);
              }}
            />
          </motion.div>
        );
      })}

      {/* Bottom fade for depth */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </motion.div>
  );
};

export default MindshareTreemap;