import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Linkedin, Send } from "lucide-react";
import { images } from "@/config/content";

const team = [
  {
    name: "James",
    role: "Co-Founder",
    background: "Ex-Lead of Korea from Kucoin, Ex-VC from Outlier Ventures",
    image: images.team.james || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
    telegram: "https://t.me/cryptobridgekorea",
  },
  {
    name: "David",
    role: "Co-Founder",
    background: "Ex-Head of Business Development from Binance, Ex-Analyst from 21shares",
    image: images.team.david || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    telegram: "https://t.me/cryptobridgekorea",
  },
];

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 relative overflow-hidden min-h-screen bg-[hsl(0,0%,5%)]">
      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <div className={`flex items-center justify-between mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="number-badge text-emerald-400/50">Team of 2 People</span>
        </div>

        {/* Giant Typography - Centered */}
        <div className={`text-center mb-20 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-light leading-none tracking-tight">
            <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px rgba(16,185,129,0.4)' }}>
              Our
            </span>
            <span className="serif-italic text-transparent bg-clip-text ml-4" style={{ WebkitTextStroke: '2px rgba(16,185,129,0.4)' }}>
              Team
            </span>
          </h2>
        </div>

        {/* Team Cards - Scattered Layout */}
        <div className={`relative h-[600px] md:h-[500px] transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* James Card - Left */}
          <div className="absolute left-0 md:left-[5%] top-0 w-[280px] md:w-[320px] group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 border border-emerald-500/20">
              {/* Photo */}
              <div className="relative h-[350px] md:h-[400px]">
                <img
                  src={team[0].image}
                  alt={team[0].name}
                  className="w-full h-full object-cover"
                />
                {/* Neon Green gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/60 via-green-500/20 to-transparent" />
                
                {/* Social Icons - Hover */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={team[0].linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center hover:bg-emerald-300 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-black" />
                  </a>
                  <a
                    href={team[0].telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center hover:bg-emerald-300 transition-colors"
                  >
                    <Send className="w-4 h-4 text-black" />
                  </a>
                </div>
              </div>
              
              {/* Info */}
              <div className="p-4 bg-zinc-900">
                <p className="text-emerald-400 text-sm font-medium mb-1">{team[0].role}</p>
                <h3 className="text-xl font-semibold text-white mb-2">{team[0].name}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{team[0].background}</p>
              </div>
            </div>
          </div>

          {/* David Card - Right */}
          <div className="absolute right-0 md:right-[5%] top-20 md:top-10 w-[280px] md:w-[320px] group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 border border-emerald-500/20">
              {/* Photo */}
              <div className="relative h-[350px] md:h-[400px]">
                <img
                  src={team[1].image}
                  alt={team[1].name}
                  className="w-full h-full object-cover"
                />
                {/* Neon Green gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/60 via-green-500/20 to-transparent" />
                
                {/* Social Icons - Hover */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={team[1].linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center hover:bg-emerald-300 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-black" />
                  </a>
                  <a
                    href={team[1].telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center hover:bg-emerald-300 transition-colors"
                  >
                    <Send className="w-4 h-4 text-black" />
                  </a>
                </div>
              </div>
              
              {/* Info */}
              <div className="p-4 bg-zinc-900">
                <p className="text-emerald-400 text-sm font-medium mb-1">{team[1].role}</p>
                <h3 className="text-xl font-semibold text-white mb-2">{team[1].name}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{team[1].background}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;