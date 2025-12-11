import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Linkedin, Send, ArrowUpRight } from "lucide-react";
import { images } from "@/config/content";
import { Link } from "react-router-dom";

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
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className={`flex items-center justify-between mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              [ Team of 2 People ]
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Meet the Founders <span className="text-muted-foreground">///</span>
            </h2>
          </div>
          <Link 
            to="/about" 
            className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            <span>About Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Photo */}
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Name & Role */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                  {/* Social Links */}
                  <div className="flex items-center gap-2">
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href={member.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Background */}
                <div className="space-y-2">
                  {member.background.map((item, idx) => (
                    <p key={idx} className="text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
