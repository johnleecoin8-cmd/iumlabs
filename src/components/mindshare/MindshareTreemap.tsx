import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { treemap, hierarchy, treemapSquarify, HierarchyRectangularNode } from 'd3-hierarchy';
import MindshareCell from './MindshareCell';
import { cn } from '@/lib/utils';

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

  // Calculate treemap layout using d3-hierarchy
  const nodes = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || projects.length === 0) {
      return [];
    }

    // Take top 20 projects sorted by mindshare
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

    // Create treemap layout - NO GAPS
    const treemapLayout = treemap<{ children?: TreemapDataNode[] }>()
      .size([dimensions.width, dimensions.height])
      .paddingInner(0) // Zero padding between cells
      .paddingOuter(0) // Zero outer padding
      .round(true)
      .tile(treemapSquarify.ratio(1.2)); // Squarify for better aspect ratios

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

    if (ratio > 0.10) return 'large';
    if (ratio > 0.04) return 'medium';
    if (ratio > 0.015) return 'small';
    return 'tiny';
  };

  if (projects.length === 0) {
    return (
      <div className={cn('flex items-center justify-center h-full', className)}>
        <p className="text-white/40">No data available</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative w-full h-full overflow-hidden bg-black', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {nodes.map((node, index) => {
        const width = node.x1 - node.x0;
        const height = node.y1 - node.y0;
        
        // Skip rendering if cell is too small
        if (width < 15 || height < 15) return null;

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.015,
              ease: 'easeOut'
            }}
          >
            <MindshareCell
              ticker={node.data.ticker}
              name={node.data.name}
              mindshare={node.data.mindshare}
              trend={node.data.trend}
              tokenStatus={node.data.token_status}
              sparkline={node.data.sparkline}
              logoUrl={node.data.logo_url}
              size={getCellSize(node)}
              rank={node.data.rank}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default MindshareTreemap;
