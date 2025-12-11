import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Linkedin, Send, Trophy, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { images } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";

const stats = [
  { value: "200+", label: "Projects Launched" },
  { value: "$500M+", label: "Total Value Marketed" },
  { value: "1,000+", label: "KOL Partners" },
  { value: "50+", label: "Media Partners" },
];

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

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Dark Section */}
      <section className="section-dark pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="number-badge text-[hsl(var(--dark-fg))] opacity-60 mb-4 inline-block">About Us</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-[hsl(var(--dark-fg))] leading-tight mb-6">
              We're a <span className="serif-italic">Korea-Based</span>
              <br />
              Web3 Marketing Agency
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--dark-fg))] opacity-60 max-w-2xl mx-auto">
              Since 2023, we've been the trusted partner for Web3 projects looking to establish a presence in Korea.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[hsl(var(--dark-fg))] opacity-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--dark-fg))] mb-2">{stat.value}</div>
                <div className="text-sm text-[hsl(var(--dark-fg))] opacity-60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Light */}
      <section ref={ref} className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left - Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="CryptoBridge Korea Office"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Award Badge */}
              <div className="absolute -top-4 -right-4">
                <div className="award-badge">
                  <Trophy className="w-4 h-4" />
                  <span>Top Web3 Agency</span>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <span className="number-badge mb-4 block">01</span>
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
                Our <span className="serif-italic">Mission</span>
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Founded by ex-KuCoin and ex-Binance executives, CryptoBridge Korea is the premier Web3 marketing agency connecting global blockchain projects with the Korean market.
                </p>
                <p>
                  We don't just run campaigns – we build sustainable growth strategies that create lasting connections between your project and the Korean crypto community.
                </p>
              </div>
              <div className="mt-8">
                <CalendlyButton className="lunar-btn">
                  <Calendar className="w-4 h-4" />
                  <span>Book a Meeting</span>
                </CalendlyButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Light */}
      <section className="py-24 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <span className="number-badge mb-4 block">Team of {team.length} People</span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Meet the <span className="serif-italic">Founders</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.name}
                className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-500"
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
                      <h3 className="text-2xl font-medium text-foreground">{member.name}</h3>
                      <p className="text-primary text-sm">{member.role}</p>
                    </div>
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
                  <p className="text-muted-foreground text-sm">{member.background}</p>
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
