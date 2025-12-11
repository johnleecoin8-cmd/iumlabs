import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { brand, images } from "@/config/content";

const stats = [
  { value: "50+", label: "Projects Launched", color: "text-red-600" },
  { value: "$2B+", label: "Total Value Marketed", color: "text-blue-600" },
  { value: "100+", label: "KOL Partners", color: "text-green-600" },
];

const founders = [
  {
    name: "James",
    role: "Co-Founder",
    background: "Ex-Korea Lead @ KuCoin, Ex-VC @ Outlier Ventures",
    image: images.team.james,
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
    telegram: "https://t.me/cryptobridgekorea",
    color: "border-red-200 hover:border-red-400",
  },
  {
    name: "David",
    role: "Co-Founder",
    background: "Ex-Head of BD @ Binance, Ex-Analyst @ 21shares",
    image: images.team.david,
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    telegram: "https://t.me/cryptobridgekorea",
    color: "border-blue-200 hover:border-blue-400",
  },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 relative bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left - Content */}
          <div>
            <span className="text-sm font-medium text-blue-600 tracking-wider mb-4 block">ABOUT US</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground">
              Korea's Leading<br />
              <span className="text-gradient">Web3 Marketing</span> Agency
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We bridge global Web3 projects to Korea's 5M+ crypto-native audience. 
              With deep local expertise and proven strategies, we help you succeed in 
              one of the world's most active crypto markets.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link to="/contact">
              <Button 
                size="lg" 
                className="rounded-full bg-primary hover:bg-primary/90 group shadow-md"
              >
                Book a Meeting
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right - Founders Preview */}
          <div className="grid grid-cols-2 gap-6">
            {founders.map((founder, index) => (
              <div 
                key={founder.name}
                className={`group p-6 rounded-2xl bg-card border-2 ${founder.color} transition-all shadow-sm hover:shadow-md`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-muted">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{founder.name}</h3>
                <p className="text-sm text-primary mb-2">{founder.role}</p>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{founder.background}</p>
                
                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <a 
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:bg-blue-100 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href={founder.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:bg-blue-100 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
