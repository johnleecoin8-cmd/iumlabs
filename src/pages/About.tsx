import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Linkedin, Send, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { images } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";
import seoulSkyline from "@/assets/seoul-skyline.jpg";

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

const floatingTags = [
  { label: "Since 2023", top: "18%", left: "5%", mobileTop: "12%", mobileLeft: "3%" },
  { label: "200+ Projects", top: "28%", right: "8%", mobileTop: "15%", mobileRight: "3%" },
  { label: "Korea Experts", top: "55%", left: "3%", mobileTop: "75%", mobileLeft: "3%" },
  { label: "Ex-Binance", bottom: "32%", right: "6%", mobileBottom: "18%", mobileRight: "3%" },
  { label: "Ex-KuCoin", bottom: "18%", left: "10%", mobileBottom: "10%", mobileLeft: "3%" },
];

const About = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Full Screen with Parallax Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{ 
            backgroundImage: `url(${seoulSkyline})`,
            filter: "brightness(0.25) grayscale(0.4)",
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
        
        {/* Floating Tags - Responsive */}
        <div>
          {floatingTags.map((tag, index) => (
            <span
              key={tag.label}
              className="lunar-tag-dark absolute animate-float hidden sm:block"
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                bottom: tag.bottom,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {tag.label}
            </span>
          ))}
          {/* Mobile floating tags - repositioned */}
          {floatingTags.slice(0, 3).map((tag, index) => (
            <span
              key={`mobile-${tag.label}`}
              className="lunar-tag-dark absolute animate-float sm:hidden"
              style={{
                top: tag.mobileTop,
                left: tag.mobileLeft,
                right: tag.mobileRight,
                bottom: tag.mobileBottom,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block">[ About Us ]</span>
            <h1 className="text-[12vw] md:text-[150px] lg:text-[180px] font-light text-white leading-[0.85] tracking-tight">
              Ab<span className="serif-italic text-primary">o</span>ut
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10">
            <p className="text-lg text-white/60 max-w-xl">
              We're a Korea-based Web3 marketing agency. Since 2023, we've been the trusted partner for blockchain projects entering the Korean market.
            </p>
            <CalendlyButton className="lunar-btn">
              <Calendar className="w-4 h-4" />
              <span>Book a Meeting</span>
            </CalendlyButton>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Mission Section - Light Theme */}
      <section ref={ref} className="section-light py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left - Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="CryptoBridge Korea Office"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <span className="text-sm text-[hsl(var(--light-fg),0.4)] mb-4 block">[ 01 ]</span>
              <h2 className="text-4xl md:text-5xl font-light text-[hsl(var(--light-fg))] mb-6">
                Our <span className="serif-italic">Mission</span>
              </h2>
              <div className="space-y-6 text-[hsl(var(--light-fg),0.6)] text-lg leading-relaxed">
                <p>
                  Founded by ex-KuCoin and ex-Binance executives, CryptoBridge Korea is the premier Web3 marketing agency connecting global blockchain projects with the Korean market.
                </p>
                <p>
                  We don't just run campaigns – we build sustainable growth strategies that create lasting connections between your project and the Korean crypto community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Light Theme with Giant Typography */}
      <section className="section-light py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Giant Header */}
          <div className="mb-20">
            <h2 className="text-[15vw] md:text-[150px] lg:text-[180px] font-light leading-[0.85] tracking-tight text-[hsl(var(--light-fg))]">
              Our <span className="serif-italic">Team</span>
            </h2>
            <div className="mt-8">
              <span className="px-4 py-2 rounded-full border border-[hsl(var(--light-fg),0.15)] text-sm text-[hsl(var(--light-fg),0.6)]">
                [ Team of {team.length} People ]
              </span>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`group ${index === 1 ? 'md:mt-24' : ''}`}
              >
                {/* Image with Blue Overlay */}
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="team-photo-overlay" />
                  
                  {/* Social icons on hover */}
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
                  <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                  <h3 className="text-3xl md:text-4xl font-medium text-[hsl(var(--light-fg))] mb-3">{member.name}</h3>
                  <p className="text-[hsl(var(--light-fg),0.6)] text-base leading-relaxed">{member.background}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dotted-line-light mt-24" />
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;