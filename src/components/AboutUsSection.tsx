import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, Award, Clock } from "lucide-react";
import { images } from "@/config/content";

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div 
          className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left Column - Team Photos */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* James Photo */}
              <div className="relative group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                  <img 
                    src={images.team.james} 
                    alt="James - Co-Founder"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-xl p-3">
                    <p className="font-semibold text-foreground">James</p>
                    <p className="text-sm text-muted-foreground">Co-Founder</p>
                  </div>
                </div>
              </div>

              {/* David Photo */}
              <div className="relative group mt-8">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                  <img 
                    src={images.team.david} 
                    alt="David - Co-Founder"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-xl p-3">
                    <p className="font-semibold text-foreground">David</p>
                    <p className="text-sm text-muted-foreground">Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Award Badge - Floating */}
            <div className="absolute -top-4 -right-4 md:right-8">
              <div className="award-badge shadow-lg">
                <Award className="w-4 h-4" />
                <span>Top Web3 Agency</span>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span>About Us ///</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Since <span className="serif-italic">2023</span>, we've worked with
              <span className="text-primary"> 200+</span> Web3 projects
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded by ex-KuCoin and ex-Binance executives, CryptoBridge Korea 
              is the premier Web3 marketing agency connecting global blockchain 
              projects with the Korean market. Our team combines deep crypto 
              expertise with local market knowledge.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-border">
              <div>
                <p className="text-3xl font-bold text-foreground">$500M+</p>
                <p className="text-sm text-muted-foreground">Value Marketed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">1,000+</p>
                <p className="text-sm text-muted-foreground">KOL Network</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Media Partners</p>
              </div>
            </div>

            {/* Open Hours & CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>Mon - Fri, 9AM - 6PM KST</span>
              </div>
              <a
                href="https://calendly.com/cryptobridgekorea"
                target="_blank"
                rel="noopener noreferrer"
                className="lunar-btn inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Meeting</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
