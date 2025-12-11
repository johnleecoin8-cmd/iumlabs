import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, Trophy, Clock } from "lucide-react";
import { images } from "@/config/content";
import CalendlyButton from "./CalendlyButton";

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left - Team Photos */}
          <div className="relative">
            {/* James Photo */}
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={images.team.james || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"}
                alt="James - Co-Founder"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-sm font-medium text-foreground">James</p>
                <p className="text-xs text-muted-foreground">Co-Founder</p>
              </div>
            </div>

            {/* David Photo - Overlapping */}
            <div className="absolute top-20 left-48 w-64 h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-background">
              <img 
                src={images.team.david || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"}
                alt="David - Co-Founder"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-sm font-medium text-foreground">David</p>
                <p className="text-xs text-muted-foreground">Co-Founder</p>
              </div>
            </div>

            {/* Award Badge */}
            <div className="absolute -top-4 right-0 lg:right-20">
              <div className="award-badge">
                <Trophy className="w-4 h-4" />
                <span>200+ Clients</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:pl-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="number-badge">About Us</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6 text-foreground">
              We're a <span className="serif-italic">Korea-Based</span>
              <br />
              Web3 Marketing Agency
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Since 2023, we've worked with over 200 global blockchain projects, 
              helping them establish a strong presence in the Korean crypto market. 
              Our deep understanding of local culture, regulations, and community 
              dynamics makes us the ideal bridge between your project and Korean investors.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-border">
              <div>
                <div className="text-3xl font-bold text-foreground">$500M+</div>
                <div className="text-sm text-muted-foreground">Value Marketed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">1,000+</div>
                <div className="text-sm text-muted-foreground">KOL Network</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Media Partners</div>
              </div>
            </div>

            {/* Open Hours + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <CalendlyButton className="lunar-btn">
                <Calendar className="w-4 h-4" />
                <span>Book a Meeting</span>
              </CalendlyButton>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>open hours: Mon-Fri 09:00 — 18:00 KST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
