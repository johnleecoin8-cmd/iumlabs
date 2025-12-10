import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const MetallicRings = lazy(() => import("./MetallicRings"));

const clientLogos = ["SOLANA", "POLKADOT", "COSMOS", "NEAR", "AVALANCHE", "ARBITRUM"];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 40%, hsl(var(--gradient-red) / 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 80% 30%, hsl(var(--gradient-crimson) / 0.08) 0%, transparent 50%)
            `,
          }}
        />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Tag */}
            <div className="inline-flex items-center px-4 py-2 border border-border/50 rounded-full bg-background/50 backdrop-blur-sm text-sm text-muted-foreground mb-8">
              <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
              WEB3 MARKETING STUDIO
            </div>

            {/* Main Headline - Mixed Typography */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-[1.1]">
              <span className="font-serif italic text-foreground">Pioneering</span>
              <span className="font-sans font-bold text-foreground"> Korean </span>
              <br />
              <span className="font-sans font-bold text-foreground">Crypto Marketing, and </span>
              <br />
              <span className="font-serif italic text-gradient">Growth Strategies</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Trusted partner for <span className="text-foreground font-medium">Web3 projects</span>, guiding them from pre-TGE planning to post-TGE growth with <span className="text-foreground font-medium">strategic advisory, marketing, and investments</span> for lasting success.
            </p>

            {/* Team Avatars */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium"
                    style={{
                      background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%))`
                    }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                  +5
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeWidth="2" d="M12 6v6l4 2" />
                </svg>
                We will reach out in 24 hours.
              </div>
            </div>

            {/* CTA Button */}
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-primary/10 text-foreground border border-border hover:bg-primary/20 px-8 py-6 text-base rounded-full group"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right Content - 3D Metallic Rings */}
          <div className="relative h-[400px] lg:h-[500px] hidden lg:block">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin" />
              </div>
            }>
              <MetallicRings />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Client Logos at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-widest">
            Trusted by leading Web3 teams:
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {clientLogos.map((logo) => (
              <span 
                key={logo} 
                className="text-sm md:text-base font-medium tracking-wider text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;