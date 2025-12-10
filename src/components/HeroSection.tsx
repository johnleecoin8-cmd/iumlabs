import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import AnimatedText from "./AnimatedText";
import ScrambleText from "./ScrambleText";
import { useParallax } from "@/hooks/useParallax";
import dashboardMockup from "@/assets/dashboard-mockup.png";
import { hero } from "@/config/content";

const HeroSection = () => {
  const { ref: glowRef, position, isHovering } = useMouseGlow();
  const { ref: parallaxRef1, offset: offset1 } = useParallax({ speed: 0.3 });
  const { ref: parallaxRef2, offset: offset2 } = useParallax({ speed: 0.5 });

  return (
    <section 
      ref={glowRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Mouse-tracking gradient glow */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${position.x}% ${position.y}%, rgba(167, 139, 250, 0.15), transparent 40%)`,
          opacity: isHovering ? 1 : 0.5,
        }}
      />

      {/* Dynamic Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 animate-mesh-gradient opacity-60">
          <div 
            className="absolute w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 30%, hsl(var(--gradient-purple) / 0.4) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 20%, hsl(var(--gradient-pink) / 0.3) 0%, transparent 50%),
                radial-gradient(ellipse 70% 60% at 60% 80%, hsl(var(--gradient-orange) / 0.25) 0%, transparent 50%),
                radial-gradient(ellipse 50% 40% at 30% 70%, hsl(var(--gradient-cyan) / 0.2) 0%, transparent 50%)
              `,
            }}
          />
        </div>
        
        {/* Parallax gradient blobs */}
        <div 
          ref={parallaxRef1}
          className="gradient-blob gradient-blob-purple w-[600px] h-[600px] -top-40 -left-20 animate-pulse-glow"
          style={{ transform: `translateY(${offset1}px)` }}
        />
        <div 
          className="gradient-blob gradient-blob-pink w-[500px] h-[500px] top-1/4 right-0 animate-pulse-glow" 
          style={{ animationDelay: '-2s' }} 
        />
        <div 
          ref={parallaxRef2}
          className="gradient-blob gradient-blob-orange w-[400px] h-[400px] bottom-20 left-1/4 animate-pulse-glow" 
          style={{ animationDelay: '-4s', transform: `translateY(${offset2}px)` }} 
        />
        <div 
          className="gradient-blob gradient-blob-cyan w-[300px] h-[300px] bottom-40 right-1/4 animate-pulse-glow opacity-40" 
          style={{ animationDelay: '-1s' }} 
        />
      </div>

      {/* Animated particles/stars with varying sizes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: `hsl(var(--${['gradient-purple', 'gradient-pink', 'gradient-cyan'][Math.floor(Math.random() * 3)]}) / ${0.3 + Math.random() * 0.4})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] animate-grid-shift"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Overline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">{hero.badge}</span>
            </div>

            {/* Main Headline with letter animations */}
            <h1 className="text-display-lg md:text-display-xl mb-6">
              <AnimatedText 
                text={hero.headline.line1} 
                animation="letter-slide"
                delay={300}
                staggerDelay={40}
              />
              <br />
              <span className="text-gradient">
                <ScrambleText text={hero.headline.highlight} delay={800} />
              </span>
              <br />
              <AnimatedText 
                text={hero.headline.line2} 
                animation="letter-slide"
                delay={1200}
                staggerDelay={40}
              />
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 animate-fade-up delay-500 leading-relaxed">
              {hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 animate-fade-up delay-700">
              <Button variant="gradient" size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  {hero.buttons.primary}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              <Button variant="glass" size="lg" className="magnetic-btn">
                {hero.buttons.secondary}
              </Button>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative hidden lg:block">
            <div className="relative animate-float group/mockup">
              {/* Glow effect behind image - intensifies on hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/20 to-gradient-pink/30 rounded-3xl blur-2xl opacity-60 transition-all duration-500 group-hover/mockup:opacity-100 group-hover/mockup:blur-3xl group-hover/mockup:-inset-8 group-hover/mockup:from-primary/50 group-hover/mockup:via-accent/40 group-hover/mockup:to-gradient-pink/50" />
              
              {/* Main dashboard image */}
              <div className="relative glass-card p-2 rounded-2xl overflow-hidden transition-all duration-500 group-hover/mockup:scale-105 group-hover/mockup:shadow-[0_0_80px_rgba(167,139,250,0.4)]">
                <img 
                  src={dashboardMockup} 
                  alt="Web3 마케팅 분석 대시보드" 
                  className="rounded-xl w-full h-auto shadow-2xl transition-transform duration-500 group-hover/mockup:scale-[1.02]"
                />
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover/mockup:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-3 -right-3 glass-card px-4 py-2 rounded-full animate-bounce-slow group-hover/mockup:scale-110 transition-transform">
                  <span className="text-sm font-semibold text-gradient">{hero.badges.liveData}</span>
                </div>
                
                <div className="absolute -bottom-3 -left-3 glass-card px-4 py-2 rounded-full group-hover/mockup:scale-110 transition-transform">
                  <span className="text-sm font-medium text-green-400">{hero.badges.roi}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
