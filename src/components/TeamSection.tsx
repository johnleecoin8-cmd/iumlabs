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
    <section ref={ref} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="number-badge">Team of {team.length} People</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-foreground">
            Meet the <span className="serif-italic">Founders</span>
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`group bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-medium text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm">
                      {member.role}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-2">
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a 
                      href={member.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm">
                  {member.background}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
