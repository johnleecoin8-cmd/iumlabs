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
  { label: "Go-To-Market Strategy", top: "15%", left: "5%", color: "border-emerald-400/50 text-emerald-400" },
  { label: "Influencer Strategy", top: "30%", left: "8%", color: "border-green-400/50 text-green-400" },
  { label: "Social Media", top: "20%", right: "8%", color: "border-lime-400/50 text-lime-400" },
  { label: "KOL Network", top: "45%", right: "5%", color: "border-emerald-300/50 text-emerald-300" },
  { label: "PR & Media", bottom: "30%", left: "10%", color: "border-green-300/50 text-green-300" },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="relative overflow-hidden flex-1">
      {/* Hero Typography Section - Dark */}
      <div className="relative min-h-[60vh] flex items-center justify-center px-4 py-24 bg-[hsl(0,0%,4%)]">
        {/* Floating Service Tags */}
        {floatingTags.map((tag, index) => (
          <div
            key={index}
            className="absolute hidden lg:block animate-float z-10"
            style={{ 
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom,
              animationDelay: `${index * 0.4}s` 
            }}
          >
            <span className={`px-4 py-2 text-xs rounded-full border bg-transparent ${tag.color}`}>
              {tag.label}
            </span>
          </div>
        ))}

        {/* Giant Typography */}
        <div className={`text-center transition-all duration-1000 relative z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-[15vw] md:text-[18vw] lg:text-[20vw] font-light leading-[0.85] tracking-tight text-white">
            Our<span className="serif-italic text-emerald-400">Services</span>
          </h2>
        </div>

        {/* Link to All Cases */}
        <div className="absolute bottom-8 right-8">
          <Link 
            to="/projects"
            className="text-emerald-400/50 text-sm hover:text-emerald-400 transition-colors flex items-center gap-2"
          >
            All Cases <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Services List - Dark Background */}
      <div className="bg-[hsl(0,0%,6%)] py-20">
        <div className="container mx-auto max-w-6xl px-4">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={`group py-10 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Dotted Line */}
              <div className="dotted-line-dark mb-10" />
              
              <div className="grid grid-cols-12 gap-6 items-start">
                {/* Number */}
                <div className="col-span-12 md:col-span-1">
                  <span className="text-emerald-400/60 text-sm font-mono">[ {service.number} ]</span>
                </div>

                {/* Title */}
                <div className="col-span-12 md:col-span-4">
                  <h3 className="text-2xl md:text-3xl font-medium text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-5">
                  <p className="text-white/50 text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="col-span-12 md:col-span-2 flex justify-end">
                  <Link 
                    to="/services"
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-400 transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-black transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Last Dotted Line */}
          <div className="dotted-line-dark mt-10" />
        </div>

        {/* Bottom CTA */}
        <div className={`container mx-auto max-w-6xl px-4 pt-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.6s' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-white/50 text-lg">
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
