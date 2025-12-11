import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus in the Korean market.",
  },
  {
    number: "02",
    title: "Community Management",
    description: "Complete KakaoTalk, Telegram, and Discord community infrastructure to build sticky, scalable and self-sustaining growth.",
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Content strategy and execution on Korean platforms to grow visibility and engage with your ecosystem in real time.",
  },
  {
    number: "04",
    title: "Influencer Strategy",
    description: "Influencer campaigns powered by top Korean crypto voices aligned with your message and goals.",
  },
  {
    number: "05",
    title: "KOL Marketing",
    description: "Targeted campaigns through a 1,000+ creator network designed to drive awareness and traction across Korean Crypto.",
  },
  {
    number: "06",
    title: "PR & Media Relations",
    description: "Narrative development and media placements to get your story published and seen in the right Korean publications.",
  },
];

const floatingTags = [
  { label: "Go-To-Market Strategy", position: "top-[5%] left-[15%]" },
  { label: "Influencer Strategy", position: "top-[35%] left-[30%]" },
  { label: "Social Media Marketing", position: "top-[15%] right-[5%]" },
  { label: "KOL Marketing", position: "top-[55%] right-[20%]" },
  { label: "PR", position: "top-[45%] right-[8%]" },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeService, setActiveService] = useState(0);

  return (
    <section ref={ref} className="section-dark py-0 relative overflow-hidden">
      {/* Hero Typography Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center px-4 py-24">
        {/* Floating Service Tags */}
        {floatingTags.map((tag, index) => (
          <div
            key={index}
            className={`absolute ${tag.position} hidden lg:block animate-float z-10`}
            style={{ animationDelay: `${index * 0.4}s` }}
          >
            <span className="lunar-tag-dark text-xs whitespace-nowrap">
              {tag.label}
            </span>
          </div>
        ))}

        {/* Giant Typography */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-[12vw] md:text-[15vw] lg:text-[18vw] font-light leading-[0.85] tracking-tight text-white">
            Our<span className="serif-italic">Services</span>
          </h2>
        </div>
      </div>

      {/* Dotted Line Separator */}
      <div className="dotted-line-dark mx-6" />

      {/* Services List */}
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {services.map((service, index) => (
          <div
            key={service.number}
            className={`group border-b border-white/10 last:border-b-0 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={() => setActiveService(index)}
          >
            <div className="grid grid-cols-12 gap-4 py-8 md:py-12 items-start">
              {/* Number */}
              <div className="col-span-2 md:col-span-1">
                <span className="text-white/40 text-sm font-mono">[ {service.number} ]</span>
              </div>

              {/* Content */}
              <div className="col-span-10 md:col-span-7">
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 text-base leading-relaxed max-w-xl">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <Link 
                  to="/services"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 border border-dashed border-primary/50 rounded text-primary text-sm hover:bg-primary/10 hover:border-primary transition-all duration-300"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Abstract Graphic - Desktop Only */}
              <div className="hidden md:flex col-span-4 items-center justify-end">
                <div className={`relative w-48 h-32 transition-all duration-500 ${activeService === index ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                  {/* Abstract shapes */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/10 rounded-sm" />
                  <div 
                    className="absolute bottom-4 left-1/2 w-12 h-20 border-4 border-primary rounded-bl-none"
                    style={{ 
                      borderTop: 'none', 
                      borderRight: 'none',
                      transform: 'translateX(20%)'
                    }}
                  />
                  <div 
                    className="absolute top-0 right-8 w-8 h-12 border-4 border-primary"
                    style={{ 
                      borderBottom: 'none', 
                      borderLeft: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className={`container mx-auto max-w-6xl px-4 pb-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.6s' }}>
        <div className="flex items-center justify-between py-8 border-t border-white/10">
          <p className="text-white/40 text-sm">
            Ready to grow in the Korean market?
          </p>
          <Link 
            to="/services"
            className="bracket-link text-white/60 hover:text-white"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
