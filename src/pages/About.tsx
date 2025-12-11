import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Linkedin, Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { images, brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";

const stats = [
  { value: "50+", label: "Projects Launched" },
  { value: "$2B+", label: "Total Value Marketed" },
  { value: "100+", label: "KOL Partners" },
  { value: "5M+", label: "Community Reach" },
];

const team = [
  {
    name: "James",
    role: "Co-Founder",
    background: ["Ex-Korea Lead @ KuCoin", "Ex-VC @ Outlier Ventures"],
    image: images.team.james,
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
    telegram: "https://t.me/cryptobridgekorea",
  },
  {
    name: "David",
    role: "Co-Founder",
    background: ["Ex-Head of BD @ Binance", "Ex-Analyst @ 21shares"],
    image: images.team.david,
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    telegram: "https://t.me/cryptobridgekorea",
  },
];

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - What */}
            <div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-8">
                About
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                CryptoBridge Korea bridges global Web3 projects to Korea's 5M+ crypto-native audience with deep local expertise, proven strategies, and unmatched industry connections.
              </p>
              <CalendlyButton 
                variant="outline" 
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                [ book a meeting ]
              </CalendlyButton>
            </div>

            {/* Right - Stats */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Numbers
              </h2>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="flex items-baseline justify-between py-4 border-b border-dashed border-border/50"
                  >
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="text-3xl font-bold text-foreground">[ {stat.value} ]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={ref} className="py-24 px-4 border-t border-border/30">
        <div className="container mx-auto max-w-5xl">
          <div className={`grid lg:grid-cols-2 gap-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="text-sm font-mono text-primary mb-4 block">[ 01 ]</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Mission
              </h2>
            </div>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Since 2023, we've been the trusted partner for Web3 projects looking to establish a presence in Korea. Our team combines deep crypto industry knowledge with local market expertise.
              </p>
              <p>
                We don't just run campaigns – we build sustainable growth strategies that create lasting connections between your project and the Korean crypto community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 border-t border-border/30">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16">
            <span className="text-sm font-mono text-primary mb-4 block">[ 02 ]</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Founders
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div 
                key={member.name}
                className="group p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-border shrink-0">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <div className="space-y-1 mb-4">
                      {member.background.map((item, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">{item}</p>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a 
                        href={member.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                      >
                        <Send className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;