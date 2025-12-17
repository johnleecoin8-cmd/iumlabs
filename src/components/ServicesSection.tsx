import { motion } from "framer-motion";
import { ArrowRight, Compass, Users, AtSign, Mic2, MessageCircle, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus.",
    link: "/services/gtm",
    icon: Compass,
    color: "#10B981", // Emerald
    glowColor: "rgba(16, 185, 129, 0.3)"
  },
  {
    number: "02",
    title: "Community Management",
    description: "Complete Discord community infrastructure to build sticky, scalable and self-sustaining growth.",
    link: "/services/community",
    icon: Users,
    color: "#3B82F6", // Blue
    glowColor: "rgba(59, 130, 246, 0.3)"
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Content strategy and execution on X to grow visibility and engage with your ecosystem in real time.",
    link: "/services/social-media",
    icon: AtSign,
    color: "#EC4899", // Pink
    glowColor: "rgba(236, 72, 153, 0.3)"
  },
  {
    number: "04",
    title: "Influencer Strategy",
    description: "Influencer campaigns powered by top crypto voices aligned with your message and goals.",
    link: "/services/influencer",
    icon: Mic2,
    color: "#F59E0B", // Amber
    glowColor: "rgba(245, 158, 11, 0.3)"
  },
  {
    number: "05",
    title: "Yap Strategy",
    description: "Targeted campaigns through a 600+ creator network designed to drive awareness and traction across Crypto X.",
    link: "/services/yap",
    icon: MessageCircle,
    color: "#06B6D4", // Cyan
    glowColor: "rgba(6, 182, 212, 0.3)"
  },
  {
    number: "06",
    title: "PR",
    description: "Narrative development and media placements to get your story published and seen in the right places.",
    link: "/services/pr",
    icon: Newspaper,
    color: "#8B5CF6", // Violet
    glowColor: "rgba(139, 92, 246, 0.3)"
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  const isLastRow = index >= 4;
  const isRightColumn = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={service.link}
        className={`group block p-8 md:p-10 transition-all duration-300 hover:bg-white/5 ${
          !isRightColumn ? "border-r border-white/10" : ""
        } ${!isLastRow ? "border-b border-white/10" : ""}`}
        style={{
          // @ts-ignore
          '--service-color': service.color,
          '--service-glow': service.glowColor
        } as React.CSSProperties}
      >
        <Icon 
          className="w-10 h-10 mb-6 transition-all duration-300" 
          strokeWidth={1.5}
          style={{ 
            color: 'rgba(255,255,255,0.4)',
          }}
        />
        <style>
          {`
            .group:hover [data-service-icon="${service.number}"] {
              color: ${service.color} !important;
              filter: drop-shadow(0 0 12px ${service.glowColor});
            }
          `}
        </style>
        <div data-service-icon={service.number}>
          <Icon 
            className="w-10 h-10 mb-6 transition-all duration-300 group-hover:scale-110 -mt-16" 
            strokeWidth={1.5}
            style={{ 
              color: 'rgba(255,255,255,0.4)',
            }}
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white/90 transition-colors">
          {service.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {service.description}
        </p>
        <div 
          className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors text-sm"
          style={{ 
            // @ts-ignore
            '--hover-color': service.color 
          } as React.CSSProperties}
        >
          <span className="group-hover:underline">Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};

const EmeraldCrystal = () => (
  <motion.div
    className="relative w-48 h-48 mx-auto"
    animate={{ rotateY: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Main crystal body */}
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(135deg, #10B981 0%, #34D399 30%, #6EE7B7 50%, #10B981 70%, #059669 100%)",
        clipPath: "polygon(50% 0%, 100% 35%, 85% 100%, 15% 100%, 0% 35%)",
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.2)"
      }}
    />
    {/* Inner glow */}
    <div
      className="absolute inset-8"
      style={{
        background: "linear-gradient(225deg, #6EE7B7 0%, #34D399 50%, #10B981 100%)",
        clipPath: "polygon(50% 10%, 90% 40%, 75% 90%, 25% 90%, 10% 40%)",
        opacity: 0.8
      }}
    />
    {/* Shine effect */}
    <motion.div
      className="absolute top-4 left-1/4 w-1/3 h-1/3"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%)",
        clipPath: "polygon(0 0, 100% 0, 50% 100%)"
      }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.div>
);

const ServicesSection = () => {
  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle emerald gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row relative">
        {/* Left: Services Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Right: Sticky CTA Panel */}
        <motion.div
          className="w-full lg:w-1/3 p-8 md:p-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Why <span className="text-emerald-400">Ium Labs</span>
          </h2>
          <p className="text-white/50 leading-relaxed mb-8">
            We're the Korean Web3 marketing agency that bridges your project to the Korean market. Our team combines local expertise with global Web3 experience.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 w-fit mb-12 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
          >
            CONNECT WITH US
            <ArrowRight className="w-4 h-4" />
          </Link>

          <EmeraldCrystal />

          <div className="mt-12 pt-8 border-t border-emerald-500/20">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-bold text-emerald-400">18+</p>
                <p className="text-white/50 text-sm">Projects Launched</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-400">120+</p>
                <p className="text-white/50 text-sm">KOL Network</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
