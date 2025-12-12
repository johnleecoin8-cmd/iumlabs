import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { 
  Users, 
  Megaphone, 
  Building2, 
  Mic2, 
  Newspaper, 
  Calendar,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    icon: Users,
    title: "KOL Marketing",
    description: "Access 1000+ vetted Korean crypto influencers across YouTube, Twitter, and Telegram",
    size: "large",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/20 hover:border-primary/40",
  },
  {
    icon: Megaphone,
    title: "Community Operation",
    description: "24/7 Korean community management with native speakers",
    size: "normal",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
  },
  {
    icon: Building2,
    title: "Exchange Support",
    description: "VASP compliance and CEX/DEX listing support",
    size: "normal",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
  },
  {
    icon: Newspaper,
    title: "Media & PR",
    description: "Coverage in top Korean crypto media outlets",
    size: "normal",
    color: "from-orange-500/20 to-orange-500/5",
    borderColor: "border-orange-500/20 hover:border-orange-500/40",
  },
  {
    icon: Mic2,
    title: "AMA Hosting",
    description: "Live AMAs with Korean communities",
    size: "normal",
    color: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
  },
  {
    icon: Calendar,
    title: "Offline Events",
    description: "Side events, meetups, and conference presence in Seoul",
    size: "large",
    color: "from-rose-500/20 to-rose-500/5",
    borderColor: "border-rose-500/20 hover:border-rose-500/40",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-32 px-4 bg-[hsl(0,0%,4%)]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Vertical Title */}
          <div className={`lg:col-span-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="lg:sticky lg:top-32">
              <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
                What We Do
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Our <span className="text-primary">Services</span>
              </h2>
              <p className="text-white/50 mb-8 max-w-sm">
                End-to-end Web3 marketing solutions tailored for the Korean market
              </p>
              <Link 
                to="/services" 
                className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                Explore all services
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right - Bento Grid */}
          <div className="lg:col-span-9">
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`group relative p-8 rounded-2xl bg-gradient-to-br ${service.color} border ${service.borderColor} transition-all duration-500 hover:-translate-y-1 ${
                    service.size === 'large' ? 'md:col-span-2' : ''
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <service.icon className="w-7 h-7 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-white/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
