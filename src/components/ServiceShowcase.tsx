import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/useCountUp";

interface ServiceShowcaseProps {
  onLearnMore: () => void;
  isVisible: boolean;
}

const ServiceShowcase = ({ onLearnMore, isVisible }: ServiceShowcaseProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const kolCount = useCountUp({ end: 100, duration: 2000, isVisible });

  // Particle network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create more particles for denser network
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw particles
      particles.forEach((p, i) => {
        // Enhanced mouse attraction - faster response
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.vx += dx * 0.0008 * force;
          p.vy += dy * 0.0008 * force;
        }
        
        // Add some friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(0, 72%, 51%)";
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Draw connections with increased range
        particles.slice(i + 1).forEach((p2) => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "hsl(0, 72%, 51%)";
            ctx.globalAlpha = 0.15 * (1 - d / 120);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const processSteps = ["Discovery", "KOL Selection", "Campaign Launch", "Analytics"];

  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-0 rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 via-card/60 to-card/40 border border-border/30 backdrop-blur-sm transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Left Content */}
      <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 w-fit">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Most Popular Service</span>
        </div>

        {/* Icon with bounce animation on hover */}
        <div className="group/icon w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-orange-500/20 flex items-center justify-center mb-8 transform hover:scale-110 transition-all duration-300">
          <Megaphone className="w-10 h-10 text-foreground group-hover/icon:animate-icon-bounce" />
        </div>

        {/* Title */}
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          KOL <span className="text-primary">Marketing</span>
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8">
          Partner with Korea's top crypto influencers to amplify your project's reach. We manage relationships with{" "}
          <span className="text-primary font-semibold">100+ verified KOLs</span> across Twitter, YouTube, and Korean platforms.
        </p>

        {/* Stat with animation */}
        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-7xl md:text-8xl font-bold text-primary tabular-nums">{kolCount}+</span>
          <div className="flex flex-col">
            <span className="text-foreground font-medium">Verified KOLs</span>
            <span className="text-muted-foreground text-sm">Ready to promote your project</span>
          </div>
        </div>

        {/* Process Flow */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {processSteps.map((step, idx) => (
            <div key={step} className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-card border border-border/50 text-sm text-foreground/80 hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default">
                {step}
              </span>
              {idx < processSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link to="/contact">
            <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 py-6 text-base group">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={onLearnMore}
            className="rounded-full border-border/50 hover:bg-card/80 px-8 py-6 text-base group"
          >
            Learn More
            <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Right Visual - Particle Network */}
      <div className="relative min-h-[400px] lg:min-h-full bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-primary/20 animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border border-primary/10 animate-[pulse_3s_ease-in-out_infinite]" />
          
          {/* Gradient orbs */}
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/10 rounded-full blur-[80px] animate-[float_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px] animate-[float_8s_ease-in-out_infinite_reverse]" />
          
          {/* Stats cards floating */}
          <div className="absolute top-1/4 right-12 p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/30 animate-[float_4s_ease-in-out_infinite]">
            <div className="text-2xl font-bold text-primary">98%</div>
            <div className="text-xs text-muted-foreground">Satisfaction</div>
          </div>
          
          <div className="absolute bottom-1/4 left-12 p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/30 animate-[float_5s_ease-in-out_infinite_reverse]">
            <div className="text-2xl font-bold text-primary">24h</div>
            <div className="text-xs text-muted-foreground">Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceShowcase;
