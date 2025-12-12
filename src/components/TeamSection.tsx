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
    badges: ["KuCoin", "Outlier Ventures"],
  },
  {
    name: "David",
    role: "Co-Founder",
    background: "Ex-Head of Business Development from Binance, Ex-Analyst from 21shares",
    image: images.team.david || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    telegram: "https://t.me/cryptobridgekorea",
    badges: ["Binance", "21shares"],
  },
];

const GlowingOrbs = () => (
  <>
    <div 
      className="glowing-orb glowing-orb-blue w-[400px] h-[400px] top-20 -left-40"
      style={{ animationDelay: '0s' }}
    />
    <div 
      className="glowing-orb glowing-orb-cyan w-[350px] h-[350px] bottom-20 right-10"
      style={{ animationDelay: '-5s' }}
    />
    <div 
      className="glowing-orb glowing-orb-purple w-[300px] h-[300px] top-1/3 right-1/4"
      style={{ animationDelay: '-10s' }}
    />
  </>
);

// Particles
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${10 + Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
);

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 bg-[hsl(0,0%,4%)] relative overflow-hidden min-h-screen">
      {/* Glowing Orbs */}
      <GlowingOrbs />
      
      {/* Particles */}
      <Particles />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className={`flex items-center justify-between mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="number-badge text-white/50 glass-card px-3 py-1.5 rounded-full">Team of 2 People</span>
        </div>

        {/* Giant Typography - Centered */}
        <div className={`text-center mb-20 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-light leading-none tracking-tight">
            <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px hsl(0 0% 40%)' }}>
              Our
            </span>
            <span className="serif-italic text-transparent bg-clip-text ml-4 text-glow" style={{ WebkitTextStroke: '2px hsl(217 91% 60%)' }}>
              Team
            </span>
          </h2>
        </div>

        {/* Team Cards - Enhanced with Glassmorphism */}
        <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {team.map((member, index) => (
            <div
              key={member.name}
              className="group"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative rounded-2xl overflow-hidden glass-card glow-border card-shine">
                {/* Photo */}
                <div className="relative h-[400px] md:h-[450px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay with glow ring on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 40px hsl(217 91% 60% / 0.3)' }} />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {member.badges.map((badge) => (
                      <span key={badge} className="glass-card px-3 py-1 rounded-full text-xs text-white/90 badge-glow">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Social Icons - Enhanced */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                    <a
                      href={member.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
                
                {/* Info with glassmorphism */}
                <div className="p-6 bg-gradient-to-t from-black/40 to-transparent">
                  <p className="text-primary text-sm font-medium mb-1 badge-glow inline-block">{member.role}</p>
                  <h3 className="text-2xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{member.background}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
