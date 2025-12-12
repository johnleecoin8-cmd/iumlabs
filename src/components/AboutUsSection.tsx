import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock } from "lucide-react";
import CalendlyButton from "./CalendlyButton";

const floatingBadges = [
  { label: "200+ Brands", top: "15%", left: "5%", delay: 0 },
  { label: "50+ KOL Partners", top: "35%", right: "8%", delay: 0.5 },
  { label: "Since 2023", bottom: "25%", left: "8%", delay: 1 },
];

const GlowingOrbs = () => (
  <>
    <div 
      className="glowing-orb glowing-orb-blue w-[400px] h-[400px] -top-20 -left-20"
      style={{ animationDelay: '0s' }}
    />
    <div 
      className="glowing-orb glowing-orb-cyan w-[300px] h-[300px] bottom-20 right-10"
      style={{ animationDelay: '-5s' }}
    />
    <div 
      className="glowing-orb glowing-orb-purple w-[250px] h-[250px] top-1/2 left-1/3"
      style={{ animationDelay: '-10s' }}
    />
  </>
);

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 bg-[hsl(0,0%,4%)] relative overflow-hidden min-h-screen">
      {/* Glowing Orbs Background */}
      <GlowingOrbs />
      
      {/* Floating Badges */}
      {floatingBadges.map((badge, index) => (
        <div
          key={badge.label}
          className="absolute hidden lg:block floating-tag z-10"
          style={{
            top: badge.top,
            left: badge.left,
            right: badge.right,
            bottom: badge.bottom,
            animationDelay: `${badge.delay}s`,
          }}
        >
          <span className="glass-card px-4 py-2 rounded-full text-sm text-white/90 badge-glow">
            {badge.label}
          </span>
        </div>
      ))}

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left - Content */}
          <div>
            <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
              <span className="number-badge text-white/50">About Us</span>
            </div>

            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-white mb-8">
              We're an <span className="text-primary text-glow font-medium">Award-Winning Agency</span> supporting{" "}
              <span className="text-cyan-400 text-glow-cyan font-medium">Crypto Projects</span> since 2023.{" "}
              <span className="text-primary font-medium">Helping 200+ Brands</span> launch in{" "}
              <span className="serif-italic text-white">Korea</span> with expertise from{" "}
              <span className="text-primary font-medium">Binance</span> and{" "}
              <span className="text-primary font-medium">KuCoin</span> veterans.{" "}
              We specialize in <span className="text-primary font-medium">PR</span>,{" "}
              <span className="text-primary font-medium">Social Media</span>, and{" "}
              <span className="text-primary font-medium">Influencer Marketing</span>.
            </p>

            {/* CTA Row */}
            <div 
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <CalendlyButton className="lunar-btn group">
                <span className="relative z-10">Book a Meeting</span>
              </CalendlyButton>

              <div className="flex items-center gap-2 text-sm text-white/50">
                <Clock className="w-4 h-4" />
                <span>open hours: Mon-Fri 09:00 — 18:00 KST</span>
              </div>
            </div>
          </div>

          {/* Right - Team Photo with Glassmorphism */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <div className="relative rounded-2xl overflow-hidden glass-card glow-border card-shine">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="CryptoBridge Korea Team"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                <div className="glass-card rounded-xl px-4 py-3 flex-1 text-center">
                  <p className="text-2xl font-bold text-white">200+</p>
                  <p className="text-xs text-white/60">Brands</p>
                </div>
                <div className="glass-card rounded-xl px-4 py-3 flex-1 text-center">
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="text-xs text-white/60">KOLs</p>
                </div>
                <div className="glass-card rounded-xl px-4 py-3 flex-1 text-center">
                  <p className="text-2xl font-bold text-white">2023</p>
                  <p className="text-xs text-white/60">Since</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
