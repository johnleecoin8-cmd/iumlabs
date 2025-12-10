import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageTransition from "@/components/PageTransition";
import { Users, Target, Zap, Globe, Linkedin, Twitter } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Result-Driven",
    description: "측정 가능한 성과를 통해 프로젝트의 성공을 증명합니다.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "최신 트렌드와 기술을 활용한 혁신적인 마케팅 전략을 제시합니다.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "진정성 있는 커뮤니티 구축이 Web3 성공의 핵심입니다.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "한국을 넘어 글로벌 시장으로의 확장을 지원합니다.",
  },
];

const team = [
  {
    name: "김민수",
    role: "CEO & Founder",
    description: "10년+ 디지털 마케팅 경력, 전 삼성전자 마케팅 팀장",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "이지은",
    role: "Head of Strategy",
    description: "Web3 전문가, 50+ DeFi/NFT 프로젝트 컨설팅",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "박준혁",
    role: "Creative Director",
    description: "브랜딩 전문가, 글로벌 에이전시 출신",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "최서연",
    role: "Community Lead",
    description: "100만+ 커뮤니티 성장 경험, KOL 네트워크 전문",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageTransition>
        {/* Page Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">About Us</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              CryptoBridge는 한국 최고의 Web3 전문 마케팅 에이전시입니다.
              블록체인 프로젝트의 성공적인 런칭과 성장을 지원합니다.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="text-gradient">Mission</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  우리는 혁신적인 Web3 프로젝트들이 글로벌 시장에서 성공할 수 있도록 
                  전략적 마케팅 파트너십을 제공합니다. 단순한 홍보를 넘어, 
                  지속 가능한 커뮤니티와 브랜드 가치를 구축합니다.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  2021년 설립 이후, 100개 이상의 프로젝트와 함께 
                  $500M 이상의 자금 조달을 지원했습니다.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">100+</div>
                  <div className="text-muted-foreground text-sm">Projects Launched</div>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">$500M+</div>
                  <div className="text-muted-foreground text-sm">Funds Raised</div>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">50+</div>
                  <div className="text-muted-foreground text-sm">Team Members</div>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">30+</div>
                  <div className="text-muted-foreground text-sm">Countries Reached</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our <span className="text-gradient">Values</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="glass-card p-6 text-center group hover:border-primary/50 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our <span className="text-gradient">Team</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div 
                  key={member.name} 
                  className="glass-card p-6 text-center group hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Profile Image */}
                  <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Social icons on hover */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href="#" className="p-1.5 bg-background/80 rounded-full hover:bg-primary transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href="#" className="p-1.5 bg-background/80 rounded-full hover:bg-primary transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/20 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-xs">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default About;
