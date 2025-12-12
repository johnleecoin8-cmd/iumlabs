import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TrendingUp, Users, Building2, Handshake } from "lucide-react";

const stats = [
  { 
    value: "200+", 
    label: "Projects Launched",
    icon: TrendingUp,
    description: "Successfully launched in Korea"
  },
  { 
    value: "$500M+", 
    label: "Funds Raised",
    icon: Building2,
    description: "Total fundraising supported"
  },
  { 
    value: "50+", 
    label: "Exchange Partners",
    icon: Handshake,
    description: "CEX & DEX partnerships"
  },
  { 
    value: "1000+", 
    label: "KOL Network",
    icon: Users,
    description: "Influencers & creators"
  },
];

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-32 px-4 bg-[hsl(0,0%,4%)]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
              Why Choose Us
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              We Bridge Your Project to{" "}
              <span className="text-primary">Korea</span>
            </h2>
            
            <p className="text-lg text-white/60 mb-8 leading-relaxed max-w-lg">
              Founded by veterans from <span className="text-white font-medium">Binance</span> and{" "}
              <span className="text-white font-medium">KuCoin</span>, we deliver unmatched expertise 
              in Korean Web3 market entry, community building, and exchange partnerships.
            </p>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-sm font-bold">J</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-2 border-blue-500/30 flex items-center justify-center">
                  <span className="text-blue-400 text-sm font-bold">D</span>
                </div>
              </div>
              <div>
                <p className="text-white/80 text-sm">Founded by</p>
                <p className="text-white font-medium">Ex-Binance & Ex-KuCoin Leaders</p>
              </div>
            </div>
          </div>

          {/* Right - Stats Grid */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                
                <div className="mt-8">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/80 font-medium text-sm mb-1">
                    {stat.label}
                  </div>
                  <div className="text-white/40 text-xs">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
