import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageTransition from "@/components/PageTransition";
import { Users, Target, Zap, Globe, Linkedin, Twitter } from "lucide-react";
import { about, images } from "@/config/content";

const iconMap = [Target, Zap, Users, Globe];
const teamImages = [images.team.james, images.team.david];

const About = () => {
  const parseHighlight = (text: string) => {
    const parts = text.split(/<highlight>|<\/highlight>/);
    return parts.length === 3 ? (
      <>{parts[0]}<span className="text-gradient">{parts[1]}</span>{parts[2]}</>
    ) : text;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageTransition>
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">{about.pageTitle}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{about.pageDescription}</p>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{parseHighlight(about.mission.title)}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{about.mission.description1}</p>
                <p className="text-muted-foreground text-lg leading-relaxed">{about.mission.description2}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {about.mission.stats.map((stat) => (
                  <div key={stat.label} className="glass-card p-6 text-center">
                    <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{parseHighlight(about.valuesTitle)}</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {about.values.map((value, index) => {
                const Icon = iconMap[index];
                return (
                  <div key={value.title} className="glass-card p-6 text-center group hover:border-primary/50 transition-all">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{parseHighlight(about.teamTitle)}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {about.team.map((member, index) => (
                <div key={member.name} className="glass-card p-6 text-center group hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 relative">
                  <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    {/* 권장 사이즈: 300x300px */}
                    <img src={teamImages[index]} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href="#" className="p-1.5 bg-background/80 rounded-full hover:bg-primary transition-colors"><Linkedin className="w-4 h-4" /></a>
                      <a href="#" className="p-1.5 bg-background/80 rounded-full hover:bg-primary transition-colors"><Twitter className="w-4 h-4" /></a>
                    </div>
                  </div>
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
