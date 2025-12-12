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
  { label: "Go-To-Market Strategy", top: "15%", left: "5%", color: "border-cyan-400/50 text-cyan-400" },
  { label: "Influencer Strategy", top: "30%", left: "8%", color: "border-pink-400/50 text-pink-400" },
  { label: "Social Media", top: "20%", right: "8%", color: "border-yellow-400/50 text-yellow-400" },
  { label: "KOL Network", top: "45%", right: "5%", color: "border-green-400/50 text-green-400" },
  { label: "PR & Media", bottom: "30%", left: "10%", color: "border-orange-400/50 text-orange-400" },
];

const GlowingOrbs = () => (
  <>
    <div 
      className="glowing-orb glowing-orb-cyan w-[450px] h-[450px] -top-40 right-20"
      style={{ animationDelay: '0s' }}
    />
    <div 
      className="glowing-orb glowing-orb-purple w-[350px] h-[350px] bottom-40 -left-20"
      style={{ animationDelay: '-8s' }}
    />
  </>
);

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="relative overflow-hidden flex-1">
      {/* Hero Typography Section - Dark */}
      <div className="relative min-h-[60vh] flex items-center justify-center px-4 py-24 bg-[hsl(0,0%,4%)]">
        {/* Glowing Orbs */}
        <GlowingOrbs />

        {/* Floating Service Tags with connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block">
          <defs>
            <linearGradient id="service-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
          {/* Connection lines to center */}
          <line x1="8%" y1="20%" x2="50%" y2="50%" className="connection-line" stroke="url(#service-line-gradient)" />
          <line x1="10%" y1="35%" x2="50%" y2="50%" className="connection-line" stroke="url(#service-line-gradient)" />
          <line x1="90%" y1="25%" x2="50%" y2="50%" className="connection-line" stroke="url(#service-line-gradient)" />
          <line x1="92%" y1="50%" x2="50%" y2="50%" className="connection-line" stroke="url(#service-line-gradient)" />
          <line x1="12%" y1="70%" x2="50%" y2="50%" className="connection-line" stroke="url(#service-line-gradient)" />
        </svg>

        {/* Floating Service Tags */}
        {floatingTags.map((tag, index) => (
          <div
            key={index}
            className="absolute hidden lg:block floating-tag z-10"
            style={{ 
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom,
              animationDelay: `${index * 0.4}s` 
            }}
          >
            <span className={`px-4 py-2 text-xs rounded-full border bg-black/40 backdrop-blur-sm ${tag.color} glow-border`}>
              {tag.label}
            </span>
          </div>
        ))}

        {/* Giant Typography */}
        <div className={`text-center transition-all duration-1000 relative z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-[15vw] md:text-[18vw] lg:text-[20vw] font-light leading-[0.85] tracking-tight text-white">
            Our<span className="serif-italic text-primary text-glow">Services</span>
          </h2>
        </div>

        {/* Link to All Cases */}
        <div className="absolute bottom-8 right-8">
          <Link 
            to="/projects"
            className="text-white/50 text-sm hover:text-white transition-colors flex items-center gap-2"
          >
            All Cases <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Services List - Light Background with enhanced design */}
      <div className="bg-[hsl(0,0%,96%)] py-20 relative overflow-hidden">
        {/* Subtle orbs for light section */}
        <div 
          className="absolute w-[500px] h-[500px] -top-40 -right-40 rounded-full pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, hsl(217 91% 60% / 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={`group py-10 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Dotted Line */}
              <div className="dotted-line-light mb-10" />
              
              <div className="grid grid-cols-12 gap-6 items-start">
                {/* Number with glow */}
                <div className="col-span-12 md:col-span-1">
                  <span className="text-primary text-sm font-mono glass-card-light px-2 py-1 rounded">[ {service.number} ]</span>
                </div>

                {/* Title */}
                <div className="col-span-12 md:col-span-4">
                  <h3 className="text-2xl md:text-3xl font-medium text-[hsl(0,0%,8%)] group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-5">
                  <p className="text-[hsl(0,0%,40%)] text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow with enhanced hover */}
                <div className="col-span-12 md:col-span-2 flex justify-end">
                  <Link 
                    to="/services"
                    className="w-12 h-12 rounded-full border border-[hsl(0,0%,80%)] flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5 text-[hsl(0,0%,40%)] group-hover:text-white transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Last Dotted Line */}
          <div className="dotted-line-light mt-10" />
        </div>

        {/* Bottom CTA */}
        <div className={`container mx-auto max-w-6xl px-4 pt-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.6s' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[hsl(0,0%,40%)] text-lg">
              Ready to grow in the Korean market?
            </p>
            <Link 
              to="/services"
              className="lunar-btn"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
