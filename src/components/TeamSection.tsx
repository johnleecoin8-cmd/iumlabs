import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Linkedin, Send } from "lucide-react";
import { images } from "@/config/content";

const team = [
  {
    name: "James",
    role: "Co-Founder",
    background: [
      "Ex-Korea Lead @ KuCoin",
      "Ex-VC @ Outlier Ventures",
    ],
    image: images.team.james,
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
    telegram: "https://t.me/cryptobridgekorea",
  },
  {
    name: "David",
    role: "Co-Founder",
    background: [
      "Ex-Head of BD @ Binance",
      "Ex-Analyst @ 21shares",
    ],
    image: images.team.david,
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    telegram: "https://t.me/cryptobridgekorea",
  },
];

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-card/30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-6">
            Team of 2 People
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Our Team
          </h2>
        </div>

        {/* Team Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-3xl mx-auto">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`flex-1 max-w-sm w-full p-8 rounded-2xl bg-card border border-border/30 text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Photo */}
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 ring-4 ring-border/30">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Role */}
              <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-4">{member.role}</p>

              {/* Background */}
              <div className="space-y-1 mb-6">
                {member.background.map((item, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">{item}</p>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4">
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={member.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
