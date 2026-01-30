import { useEffect, useRef, useState, useMemo } from "react";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

interface KOL {
  name: string;
  handle: string;
  followers: string;
  expertise: string;
  platform: string;
}

interface KOLNetworkGraphProps {
  kols: KOL[];
  accentColor?: string;
}

interface Node {
  id: string;
  x: number;
  y: number;
  radius: number;
  kol: KOL | null;
  isCenter: boolean;
  angle: number;
  ring: number;
}

const KOLNetworkGraph = ({ kols, accentColor = "#F59E0B" }: KOLNetworkGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const { isMobile } = useMobileOptimization();

  // Resize observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: isMobile ? 500 : 600,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [isMobile]);

  // Generate node positions
  const nodes: Node[] = useMemo(() => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const maxNodes = isMobile ? 24 : 48;
    const selectedKols = kols.slice(0, maxNodes);
    
    // Center node (Ium Labs)
    const nodeList: Node[] = [
      {
        id: "center",
        x: centerX,
        y: centerY,
        radius: isMobile ? 35 : 45,
        kol: null,
        isCenter: true,
        angle: 0,
        ring: 0,
      },
    ];

    // Calculate rings
    const rings = isMobile ? 2 : 3;
    const nodesPerRing = isMobile ? [10, 14] : [12, 18, 18];
    const ringRadii = isMobile 
      ? [dimensions.width * 0.2, dimensions.width * 0.35]
      : [dimensions.width * 0.15, dimensions.width * 0.26, dimensions.width * 0.38];

    let kolIndex = 0;
    
    for (let ring = 0; ring < rings; ring++) {
      const count = Math.min(nodesPerRing[ring], selectedKols.length - kolIndex);
      const radius = ringRadii[ring];
      
      for (let i = 0; i < count && kolIndex < selectedKols.length; i++) {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        // Add slight randomness
        const jitterX = (Math.random() - 0.5) * 15;
        const jitterY = (Math.random() - 0.5) * 15;
        
        nodeList.push({
          id: selectedKols[kolIndex].handle,
          x: centerX + Math.cos(angle) * radius + jitterX,
          y: centerY + Math.sin(angle) * radius + jitterY,
          radius: isMobile ? 20 : (ring === 0 ? 28 : ring === 1 ? 24 : 20),
          kol: selectedKols[kolIndex],
          isCenter: false,
          angle,
          ring: ring + 1,
        });
        kolIndex++;
      }
    }

    return nodeList;
  }, [kols, dimensions, isMobile]);

  // Get connection color based on platform
  const getConnectionColor = (kol: KOL | null) => {
    if (!kol) return accentColor;
    return kol.platform === "telegram" ? "#0088cc" : accentColor;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/[0.06]"
      style={{ height: dimensions.height }}
    >
      {/* SVG for connections */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      >
        <defs>
          {/* Gradients for connections */}
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="telegramGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0088cc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0088cc" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Connection lines from center to each node */}
        {nodes.slice(1).map((node, index) => {
          const centerNode = nodes[0];
          const isHovered = hoveredNode === node.id;
          const isTelegram = node.kol?.platform === "telegram";
          
          // Calculate control points for curved lines
          const midX = (centerNode.x + node.x) / 2;
          const midY = (centerNode.y + node.y) / 2;
          const offset = (index % 2 === 0 ? 1 : -1) * 20;
          const controlX = midX + offset;
          const controlY = midY + offset;
          
          return (
            <g key={node.id}>
              {/* Main connection line */}
              <path
                d={`M ${centerNode.x} ${centerNode.y} Q ${controlX} ${controlY} ${node.x} ${node.y}`}
                stroke={isTelegram ? "url(#telegramGradient)" : "url(#amberGradient)"}
                strokeWidth={isHovered ? 2.5 : 1.2}
                fill="none"
                opacity={isHovered ? 1 : 0.4}
                className="transition-all duration-300"
              />
              
              {/* Glow effect on hover */}
              {isHovered && (
                <path
                  d={`M ${centerNode.x} ${centerNode.y} Q ${controlX} ${controlY} ${node.x} ${node.y}`}
                  stroke={isTelegram ? "#0088cc" : accentColor}
                  strokeWidth={4}
                  fill="none"
                  opacity={0.2}
                  filter="blur(4px)"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          
          if (node.isCenter) {
            // Center node (Ium Labs logo)
            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: node.x,
                  top: node.y,
                  width: node.radius * 2,
                  height: node.radius * 2,
                }}
              >
                <div 
                  className="w-full h-full rounded-full border-2 flex items-center justify-center overflow-hidden"
                  style={{ 
                    borderColor: accentColor,
                    background: `radial-gradient(circle, ${accentColor}30 0%, #0a0a0a 70%)`,
                    boxShadow: `0 0 30px ${accentColor}40, 0 0 60px ${accentColor}20`,
                  }}
                >
                  <img 
                    src="/logo.png" 
                    alt="Ium Labs"
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
              </div>
            );
          }

          const kol = node.kol!;
          const isTelegram = kol.platform === "telegram";
          const avatarUrl = isTelegram 
            ? `https://unavatar.io/telegram/${kol.handle.replace("@", "")}`
            : `https://unavatar.io/twitter/${kol.handle.replace("@", "")}`;
          const fallbackUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=0a0a0a`;
          const profileUrl = isTelegram 
            ? `https://t.me/${kol.handle.replace("@", "")}`
            : `https://x.com/${kol.handle.replace("@", "")}`;
          const nodeColor = isTelegram ? "#0088cc" : accentColor;

          return (
            <a
              key={node.id}
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: node.x,
                top: node.y,
                width: node.radius * 2,
                height: node.radius * 2,
                zIndex: isHovered ? 10 : 2,
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Node circle */}
              <div 
                className="w-full h-full rounded-full overflow-hidden border-2 transition-all duration-300"
                style={{ 
                  borderColor: isHovered ? nodeColor : `${nodeColor}50`,
                  transform: isHovered ? "scale(1.2)" : "scale(1)",
                  boxShadow: isHovered ? `0 0 20px ${nodeColor}60` : "none",
                  backgroundColor: "#111",
                }}
              >
                <img 
                  src={avatarUrl}
                  alt={kol.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackUrl;
                  }}
                />
              </div>

              {/* Hover tooltip */}
              {isHovered && (
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
                  style={{
                    top: node.radius * 2 + 8,
                    zIndex: 100,
                  }}
                >
                  <div 
                    className="px-3 py-2 rounded-lg border whitespace-nowrap"
                    style={{
                      backgroundColor: "rgba(10, 10, 10, 0.95)",
                      borderColor: `${nodeColor}40`,
                      boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5)`,
                    }}
                  >
                    <p className="text-white text-xs font-medium">{kol.name}</p>
                    <p className="text-xs" style={{ color: nodeColor }}>{kol.handle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white/50 text-[10px]">{kol.followers}</span>
                      <span 
                        className="text-[10px] px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: `${nodeColor}20`, color: nodeColor }}
                      >
                        {kol.expertise}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </a>
          );
        })}
      </div>

      {/* Ambient glow effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}08 0%, transparent 50%)`,
          zIndex: 0,
        }}
      />
      
      {/* Corner vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
          zIndex: 3,
        }}
      />
    </div>
  );
};

export default KOLNetworkGraph;
