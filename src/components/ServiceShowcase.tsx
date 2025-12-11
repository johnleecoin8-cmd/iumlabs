import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, CalendarDays, Building2, Users, Mic2, Search, Calendar, Users2, GraduationCap, Rocket, Landmark, Handshake, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ServiceShowcaseProps {
  onLearnMore: () => void;
  isVisible: boolean;
}

// Package data based on the deck
const packages = [
  {
    id: "marketing",
    name: "Multi-channel Marketing",
    icon: Megaphone,
    color: "hsl(0, 72%, 51%)",
    description: "Quickly secure brand establishment and drive verifiable adoption through local campaigns.",
    categories: [
      {
        name: "KOL & Influence Network",
        icon: Users,
        items: [
          "Direct Trust Building with Korean investors",
          "High-Value KOL Access (X, Telegram, Youtube)",
          "CEO AMAs, interviews, and in-depth reviews"
        ]
      },
      {
        name: "Community Growth",
        icon: Mic2,
        items: [
          "Korean Telegram & KakaoTalk management",
          "Data-driven campaigns (giveaways, whitelists, airdrops)",
          "High engagement metrics & organic growth"
        ]
      },
      {
        name: "SEO & Media",
        icon: Search,
        items: [
          "Naver ecosystem SEO optimization",
          "Tier-1 Korean crypto media coverage",
          "Professional localized research reports"
        ]
      }
    ]
  },
  {
    id: "events",
    name: "Event & Compliance",
    icon: CalendarDays,
    color: "hsl(25, 95%, 53%)",
    description: "Ensure seamless event execution and strategic regulatory guidance for Korea's Web3 ecosystem.",
    categories: [
      {
        name: "Web3 Conferences",
        icon: Calendar,
        items: [
          "Full planning & execution (KBW, WebX, AWS Summit)",
          "Venue sourcing & speaker acquisition",
          "Booth setup & sponsor operations"
        ]
      },
      {
        name: "Side Event Management",
        icon: Users2,
        items: [
          "Exclusive side events (40-200 pax)",
          "KOL activation & media coverage via Luma",
          "Full on-site staffing & support"
        ]
      },
      {
        name: "Developer & Academic Outreach",
        icon: GraduationCap,
        items: [
          "Hackathon & dev conference sponsorship",
          "University blockchain society partnerships",
          "Future developer pipeline nurturing"
        ]
      }
    ]
  },
  {
    id: "institutional",
    name: "Institutional Acceleration",
    icon: Building2,
    color: "hsl(45, 93%, 47%)",
    description: "Support project launch with expert tokenomics design, financial modeling, and investor relations.",
    categories: [
      {
        name: "Web3 Venture Building",
        icon: Rocket,
        items: [
          "Custom GTM Blueprint for Korean market",
          "Tokenomics & financial modeling",
          "Long-term viability proof for VCs"
        ]
      },
      {
        name: "Exchange Settings",
        icon: Landmark,
        items: [
          "VASP & real-name account securement",
          "Listing strategy & documentation",
          "ISMS certification & security audit"
        ]
      },
      {
        name: "Investor Relations (IR)",
        icon: Handshake,
        items: [
          "VC-optimized IR deck production",
          "Korean VC targeting (Hashed, Kakao Ventures)",
          "Institutional partnership initiation"
        ]
      }
    ]
  }
];

// Service lane definitions for background animation
const serviceLanes = [
  { id: "marketing", color: "hsl(0, 72%, 51%)", yOffset: -50 },
  { id: "events", color: "hsl(25, 95%, 53%)", yOffset: 0 },
  { id: "institutional", color: "hsl(45, 93%, 47%)", yOffset: 50 },
];

interface Particle {
  id: number;
  laneId: string;
  progress: number;
  speed: number;
  size: number;
}

const ServiceShowcase = ({ onLearnMore, isVisible }: ServiceShowcaseProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>(0);
  const particleIdCounter = useRef(0);
  const [activeTab, setActiveTab] = useState("marketing");

  // Get bezier curve points for a lane
  const getBezierPoint = useCallback((t: number, lane: typeof serviceLanes[0], width: number, height: number) => {
    const startX = 0;
    const endX = width;
    const centerY = height / 2 + lane.yOffset;
    const controlX = width / 2;
    const archHeight = 30;
    
    const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
    const y = (1 - t) * (1 - t) * centerY + 2 * (1 - t) * t * (centerY - archHeight) + t * t * centerY;
    
    return { x, y };
  }, []);

  // Create a new particle
  const createParticle = useCallback(() => {
    const lane = serviceLanes[Math.floor(Math.random() * serviceLanes.length)];
    
    particlesRef.current.push({
      id: particleIdCounter.current++,
      laneId: lane.id,
      progress: 0,
      speed: 0.002 + Math.random() * 0.002,
      size: 2 + Math.random() * 2,
    });
  }, []);

  // Background animation effect
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
    };
    
    resize();
    window.addEventListener("resize", resize);

    // Initial particles
    for (let i = 0; i < 10; i++) {
      createParticle();
      particlesRef.current[i].progress = Math.random();
    }

    const spawnInterval = setInterval(() => {
      if (particlesRef.current.length < 20) {
        createParticle();
      }
    }, 800);

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);

      // Draw subtle bridge lanes
      serviceLanes.forEach((lane) => {
        ctx.beginPath();
        for (let t = 0; t <= 1; t += 0.02) {
          const point = getBezierPoint(t, lane, width, height);
          if (t === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
        ctx.strokeStyle = lane.color;
        ctx.globalAlpha = 0.08;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        const lane = serviceLanes.find((l) => l.id === particle.laneId);
        if (!lane) return false;

        particle.progress += particle.speed;
        if (particle.progress >= 1) return false;

        const pos = getBezierPoint(particle.progress, lane, width, height);

        // Draw trail
        for (let i = 3; i >= 0; i--) {
          const trailProgress = Math.max(0, particle.progress - i * 0.03);
          const trailPos = getBezierPoint(trailProgress, lane, width, height);
          
          ctx.beginPath();
          ctx.arc(trailPos.x, trailPos.y, particle.size - i * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = lane.color;
          ctx.globalAlpha = 0.15 - i * 0.03;
          ctx.fill();
        }

        // Draw main particle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = lane.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
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
  }, [getBezierPoint, createParticle]);

  const activePackage = packages.find(p => p.id === activeTab)!;
  const ActiveIcon = activePackage.icon;

  return (
    <div
      className={`rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 via-card/60 to-card/40 border border-border/30 backdrop-blur-sm transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary font-medium">🌉</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Service Packages</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Choose Your <span className="text-primary">Bridge</span> to Korea
          </h2>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 md:px-8 pt-4">
            <TabsList className="w-full h-auto p-1 bg-card/50 border border-border/30 rounded-2xl grid grid-cols-3 gap-1">
              {packages.map((pkg) => {
                const Icon = pkg.icon;
                return (
                  <TabsTrigger
                    key={pkg.id}
                    value={pkg.id}
                    className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 px-2 md:px-4 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm font-medium text-center leading-tight">{pkg.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {packages.map((pkg) => (
            <TabsContent key={pkg.id} value={pkg.id} className="mt-0 focus-visible:outline-none">
              <div className="p-6 md:p-8">
                {/* Package Description */}
                <div className="mb-6 pb-6 border-b border-border/20">
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${pkg.color}20` }}
                    >
                      <pkg.icon className="w-6 h-6" style={{ color: pkg.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{pkg.name}</h3>
                      <p className="text-muted-foreground">{pkg.description}</p>
                    </div>
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                  {pkg.categories.map((category, idx) => {
                    const CategoryIcon = category.icon;
                    return (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl bg-card/50 border border-border/20 hover:border-border/40 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <CategoryIcon className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold text-foreground text-sm">{category.name}</h4>
                        </div>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Bottom CTA */}
        <div className="p-6 md:p-8 border-t border-border/20 bg-card/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                Interested in <span className="text-primary">{activePackage.name}</span>?
              </h3>
              <p className="text-sm text-muted-foreground">
                Let's discuss how we can help your project enter the Korean market.
              </p>
            </div>
            <Link to="/contact">
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 group">
                Book a Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceShowcase;
