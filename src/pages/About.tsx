import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ArrowRight, Linkedin, Send, Target, Users, Zap, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { images, brand } from "@/config/content";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { value: "50+", label: "Projects Launched", color: "text-red-600" },
  { value: "$2B+", label: "Total Value Marketed", color: "text-blue-600" },
  { value: "100+", label: "KOL Partners", color: "text-green-600" },
  { value: "5M+", label: "Community Reach", color: "text-purple-600" },
];

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure success through tangible outcomes and ROI for every campaign.",
    color: "bg-red-100 text-red-600",
    borderColor: "border-red-200 hover:border-red-400",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We stay ahead with cutting-edge marketing strategies for the Web3 space.",
    color: "bg-blue-100 text-blue-600",
    borderColor: "border-blue-200 hover:border-blue-400",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Building authentic, engaged communities is at the heart of everything we do.",
    color: "bg-green-100 text-green-600",
    borderColor: "border-green-200 hover:border-green-400",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Local expertise with global perspective to help you expand worldwide.",
    color: "bg-purple-100 text-purple-600",
    borderColor: "border-purple-200 hover:border-purple-400",
  },
];

const team = [
  {
    name: "James",
    role: "Co-Founder",
    background: ["Ex-Korea Lead @ KuCoin", "Ex-VC @ Outlier Ventures"],
    image: images.team.james,
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
    telegram: "https://t.me/cryptobridgekorea",
    color: "border-red-200 hover:border-red-400",
  },
  {
    name: "David",
    role: "Co-Founder",
    background: ["Ex-Head of BD @ Binance", "Ex-Analyst @ 21shares"],
    image: images.team.david,
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    telegram: "https://t.me/cryptobridgekorea",
    color: "border-blue-200 hover:border-blue-400",
  },
];

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="text-sm font-medium text-blue-600 tracking-wider mb-4 block">ABOUT US</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Korea's Leading<br />
            <span className="text-gradient">Web3 Marketing</span> Agency
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We bridge global Web3 projects to Korea's 5M+ crypto-native audience with deep local expertise and proven strategies.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section ref={ref} className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="text-sm font-medium text-green-600 tracking-wider mb-4 block">OUR MISSION</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Connecting Global Web3<br />to <span className="text-gradient">Korea's Market</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Since 2023, we've been the trusted partner for Web3 projects looking to establish a presence in Korea. 
                Our team combines deep crypto industry knowledge with local market expertise.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                We don't just run campaigns – we build sustainable growth strategies that create lasting connections 
                between your project and the Korean crypto community.
              </p>
              <Link to="/contact">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 shadow-md">
                  Work With Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className={`p-6 rounded-2xl bg-card border-2 ${value.borderColor} transition-all shadow-sm hover:shadow-md`}
                >
                  <div className={`w-12 h-12 rounded-xl ${value.color} flex items-center justify-center mb-4`}>
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              Team of 2 People
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Meet the Founders
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {team.map((member, index) => (
              <div 
                key={member.name}
                className={`flex-1 max-w-sm w-full p-8 rounded-2xl bg-card border-2 ${member.color} text-center transition-all shadow-sm hover:shadow-md`}
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 ring-4 ring-muted">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <div className="space-y-1 mb-6">
                  {member.background.map((item, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">{item}</p>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:bg-blue-100 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href={member.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:bg-blue-100 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </a>
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
