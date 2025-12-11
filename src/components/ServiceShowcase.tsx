import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceShowcaseProps {
  onLearnMore: () => void;
  isVisible: boolean;
}

// Service lane definitions
const serviceLanes = [
  {
    id: "marketing",
    name: "Marketing",
    icon: "📢",
    color: "hsl(0, 72%, 51%)",
    colorRgb: { r: 220, g: 38, b: 38 },
    services: ["KOL Network", "Community Growth", "SEO & Media"],
    targets: ["community", "media"],
    yOffset: -60,
  },
  {
    id: "events",
    name: "Events",
    icon: "🎪",
    color: "hsl(25, 95%, 53%)",
    colorRgb: { r: 249, g: 115, b: 22 },
    services: ["Conferences", "Side Events", "Dev Outreach"],
    targets: ["community", "media"],
    yOffset: 0,
  },
  {
    id: "institutional",
    name: "Institutional",
    icon: "🏛️",
    color: "hsl(45, 93%, 47%)",
    colorRgb: { r: 234, g: 179, b: 8 },
    services: ["Venture Building", "Exchange Listing", "Investor Relations"],
    targets: ["exchanges", "vcs"],
    yOffset: 60,
  },
];

// Global project nodes (left side)
const globalProjects = [
  { id: "defi", name: "DeFi", icon: "💰", yRatio: 0.25 },
  { id: "gamefi", name: "GameFi", icon: "🎮", yRatio: 0.5 },
  { id: "nft", name: "NFT/Meta", icon: "🖼️", yRatio: 0.75 },
];

// Korea market nodes (right side)
const koreaMarket = [
  { id: "community", name: "Community", icon: "💬", platforms: ["Telegram", "KakaoTalk"], yRatio: 0.2 },
  { id: "media", name: "Media", icon: "📰", platforms: ["Naver", "Tokenpost"], yRatio: 0.4 },
  { id: "exchanges", name: "Exchanges", icon: "🏦", platforms: ["Upbit", "Bithumb"], yRatio: 0.6 },
  { id: "vcs", name: "VCs", icon: "💼", platforms: ["Hashed", "Kakao"], yRatio: 0.8 },
];

interface Particle {
  id: number;
  laneId: string;
  progress: number;
  speed: number;
  size: number;
  targetNode: string;
}

const ServiceShowcase = ({ onLearnMore, isVisible }: ServiceShowcaseProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>(0);
  const [hoveredLane, setHoveredLane] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particleIdCounter = useRef(0);

  // Get bezier curve points for a lane
  const getBezierPoint = useCallback((t: number, lane: typeof serviceLanes[0], width: number, height: number) => {
    const startX = 80;
    const endX = width - 80;
    const centerY = height / 2 + lane.yOffset;
    const controlX = width / 2;
    const archHeight = 40;
    
    // Quadratic bezier
    const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
    const y = (1 - t) * (1 - t) * centerY + 2 * (1 - t) * t * (centerY - archHeight) + t * t * centerY;
    
    return { x, y };
  }, []);

  // Create a new particle
  const createParticle = useCallback(() => {
    const lane = serviceLanes[Math.floor(Math.random() * serviceLanes.length)];
    const targetNode = lane.targets[Math.floor(Math.random() * lane.targets.length)];
    
    particlesRef.current.push({
      id: particleIdCounter.current++,
      laneId: lane.id,
      progress: 0,
      speed: 0.003 + Math.random() * 0.002,
      size: 3 + Math.random() * 2,
      targetNode,
    });
  }, []);

  // Main animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      setDimensions({ width: rect.width, height: rect.height });
    };
    
    resize();
    window.addEventListener("resize", resize);

    // Initial particles
    for (let i = 0; i < 15; i++) {
      createParticle();
      particlesRef.current[i].progress = Math.random();
    }

    // Spawn new particles periodically
    const spawnInterval = setInterval(() => {
      if (particlesRef.current.length < 30) {
        createParticle();
      }
    }, 500);

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);

      // Draw bridge lanes
      serviceLanes.forEach((lane) => {
        ctx.beginPath();
        
        // Draw the lane path
        for (let t = 0; t <= 1; t += 0.02) {
          const point = getBezierPoint(t, lane, width, height);
          if (t === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
        
        const isHovered = hoveredLane === lane.id;
        ctx.strokeStyle = lane.color;
        ctx.globalAlpha = isHovered ? 0.5 : 0.2;
        ctx.lineWidth = isHovered ? 4 : 2;
        ctx.stroke();
        
        // Draw glow effect
        if (isHovered) {
          ctx.shadowColor = lane.color;
          ctx.shadowBlur = 20;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      ctx.globalAlpha = 1;

      // Draw global project nodes (left)
      globalProjects.forEach((project) => {
        const x = 50;
        const y = height * project.yRatio;
        
        // Node circle
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(0, 0%, 10%)";
        ctx.fill();
        ctx.strokeStyle = "hsl(0, 72%, 51%)";
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // Icon
        ctx.font = "18px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(project.icon, x, y);
      });

      // Draw korea market nodes (right)
      koreaMarket.forEach((market) => {
        const x = width - 50;
        const y = height * market.yRatio;
        
        // Determine if this node is a target for hovered lane
        const isTarget = hoveredLane && serviceLanes.find(l => l.id === hoveredLane)?.targets.includes(market.id);
        
        // Node circle
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(0, 0%, 10%)";
        ctx.fill();
        ctx.strokeStyle = isTarget ? "hsl(0, 72%, 51%)" : "hsl(0, 0%, 30%)";
        ctx.lineWidth = isTarget ? 3 : 2;
        ctx.globalAlpha = isTarget ? 1 : 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // Glow for targets
        if (isTarget) {
          ctx.shadowColor = "hsl(0, 72%, 51%)";
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
        
        // Icon
        ctx.font = "18px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(market.icon, x, y);
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        const lane = serviceLanes.find((l) => l.id === particle.laneId);
        if (!lane) return false;

        // Update progress
        const speedMultiplier = hoveredLane === lane.id ? 2 : 1;
        particle.progress += particle.speed * speedMultiplier;

        // Remove if completed
        if (particle.progress >= 1) {
          return false;
        }

        // Get position on bezier curve
        const pos = getBezierPoint(particle.progress, lane, width, height);

        // Draw trail
        for (let i = 4; i >= 0; i--) {
          const trailProgress = Math.max(0, particle.progress - i * 0.025);
          const trailPos = getBezierPoint(trailProgress, lane, width, height);
          
          ctx.beginPath();
          ctx.arc(trailPos.x, trailPos.y, particle.size - i * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = lane.color;
          ctx.globalAlpha = 0.3 - i * 0.05;
          ctx.fill();
        }

        // Draw main particle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = lane.color;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        
        // Particle glow
        ctx.shadowColor = lane.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.globalAlpha = 1;

        return true;
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(spawnInterval);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [getBezierPoint, hoveredLane, createParticle]);

  // Handle lane hover detection
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { width, height } = dimensions;
    
    if (width === 0 || height === 0) return;
    
    // Check if mouse is near any lane
    let foundLane: string | null = null;
    serviceLanes.forEach((lane) => {
      for (let t = 0; t <= 1; t += 0.05) {
        const point = getBezierPoint(t, lane, width, height);
        const dist = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
        if (dist < 30) {
          foundLane = lane.id;
          break;
        }
      }
    });
    
    setHoveredLane(foundLane);
  };

  const handleMouseLeave = () => {
    setHoveredLane(null);
  };

  return (
    <div
      className={`rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 via-card/60 to-card/40 border border-border/30 backdrop-blur-sm transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Canvas Container */}
      <div 
        className="relative h-[400px] md:h-[500px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Labels */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Label - Global */}
          <div className="absolute left-4 top-4 flex flex-col">
            <span className="text-lg font-bold text-foreground">🌍 GLOBAL</span>
            <span className="text-xs text-muted-foreground">Web3 Projects</span>
          </div>
          
          {/* Center Label - CryptoBridge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary tracking-wider">CRYPTOBRIDGE</div>
            <div className="text-xs text-muted-foreground mt-1">Connecting Projects to Korea</div>
          </div>
          
          {/* Right Label - Korea */}
          <div className="absolute right-4 top-4 flex flex-col items-end">
            <span className="text-lg font-bold text-foreground">🇰🇷 KOREA</span>
            <span className="text-xs text-muted-foreground">Market Access</span>
          </div>

          {/* Global Projects Labels */}
          {globalProjects.map((project) => (
            <div 
              key={project.id}
              className="absolute left-20 -translate-y-1/2"
              style={{ top: `${project.yRatio * 100}%` }}
            >
              <span className="text-sm text-foreground/80">{project.name}</span>
            </div>
          ))}

          {/* Korea Market Labels */}
          {koreaMarket.map((market) => (
            <div 
              key={market.id}
              className="absolute right-20 -translate-y-1/2 text-right"
              style={{ top: `${market.yRatio * 100}%` }}
            >
              <span className="text-sm text-foreground/80">{market.name}</span>
            </div>
          ))}
        </div>

        {/* Hovered Lane Info */}
        {hoveredLane && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-card/90 backdrop-blur-sm border border-border/50 pointer-events-none">
            {(() => {
              const lane = serviceLanes.find(l => l.id === hoveredLane);
              if (!lane) return null;
              return (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg font-semibold" style={{ color: lane.color }}>
                    {lane.icon} {lane.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {lane.services.join(" • ")}
                  </span>
                </div>
              );
            })()}
          </div>
        )}

        {/* Lane Legend */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 md:gap-6">
          {serviceLanes.map((lane) => (
            <div 
              key={lane.id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all cursor-default ${
                hoveredLane === lane.id 
                  ? "bg-card border border-border/50" 
                  : "bg-card/50"
              }`}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: lane.color }}
              />
              <span className="text-xs md:text-sm text-foreground/80">
                {lane.icon} {lane.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="p-6 md:p-8 border-t border-border/20 bg-card/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              Ready to bridge to <span className="text-primary">Korea</span>?
            </h3>
            <p className="text-sm text-muted-foreground">
              Choose from our Marketing, Events, or Institutional packages
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact">
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 group">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={onLearnMore}
              className="rounded-full border-border/50 hover:bg-card/80 group"
            >
              View Packages
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceShowcase;
