import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Linkedin, Send } from "lucide-react";
import { images } from "@/config/content";

const team = [
  {
    name: "James",
    role: "Co-Founder",
    background: "Ex-Lead of Korea @ KuCoin, Ex-VC @ Outlier Ventures",
    image: images.team.james || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
    telegram: "https://t.me/cryptobridgekorea",
  },
  {
    name: "David",
    role: "Co-Founder",
    background: "Ex-Head of BD @ Binance, Ex-Analyst @ 21shares",
    image: images.team.david || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    telegram: "https://t.me/cryptobridgekorea",
  },
];

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-32 px-4 relative overflow-hidden flex-1">
      <div className="container mx-auto max-w-7xl">
        {/* Giant Typography Header */}
        <div className={`mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-[15vw] md:text-[180px] lg:text-[220px] font-light leading-[0.85] tracking-tight text-[hsl(var(--light-fg))]">
            Our <span className="serif-italic">Team</span>
          </h2>
          
          {/* Team count badge */}
          <div className="mt-8 flex items-center gap-4">
            <span className="px-4 py-2 rounded-full border border-[hsl(var(--light-fg),0.15)] text-sm text-[hsl(var(--light-fg),0.6)]">
              [ Team of {team.length} People ]
            </span>
          </div>
        </div>

        {/* Team Grid - Asymmetric Layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`group transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${index === 1 ? 'md:mt-24' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image with Blue Overlay */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Blue Gradient Overlay - Lunar Strategy Style */}
                <div className="team-photo-overlay" />
                
                {/* Hover reveal - social icons */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href={member.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-primary text-sm font-medium mb-1">
                  {member.role}
                </p>
                <h3 className="text-3xl md:text-4xl font-medium text-[hsl(var(--light-fg))] mb-3">
                  {member.name}
                </h3>
                <p className="text-[hsl(var(--light-fg),0.6)] text-base leading-relaxed">
                  {member.background}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative dotted line */}
        <div className="dotted-line-light mt-24" />
      </div>
    </div>
  );
};

export default TeamSection;
