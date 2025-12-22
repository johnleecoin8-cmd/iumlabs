import { motion } from "framer-motion";
import { ArrowRight, Compass, Users, AtSign, Mic2, MessageCircle, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction.",
    link: "/services/gtm",
    icon: Compass,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    number: "02",
    title: "Community Management",
    description: "Complete Discord infrastructure for sticky, scalable growth.",
    link: "/services/community",
    icon: Users,
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Content strategy and execution on X to grow visibility.",
    link: "/services/social-media",
    icon: AtSign,
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    number: "04",
    title: "Influencer Strategy",
    description: "Campaigns powered by top crypto voices aligned with your goals.",
    link: "/services/influencer",
    icon: Mic2,
    color: "from-orange-500/20 to-amber-500/20"
  },
  {
    number: "05",
    title: "Yap Strategy",
    description: "600+ creator network designed to drive awareness across Crypto X.",
    link: "/services/yap",
    icon: MessageCircle,
    color: "from-red-500/20 to-rose-500/20"
  },
  {
    number: "06",
    title: "PR",
    description: "Narrative development and media placements in the right places.",
    link: "/services/pr",
    icon: Newspaper,
    color: "from-indigo-500/20 to-violet-500/20"
  }
];

const HexagonCard = ({ 
  service, 
  index, 
  isHovered, 
  onHover 
}: { 
  service: typeof services[0]; 
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}) => {
  const Icon = service.icon;
  
  // Calculate position in honeycomb pattern
  const row = Math.floor(index / 3);
  const col = index % 3;
  const offsetX = row % 2 === 1 ? 50 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      style={{ marginLeft: col === 0 ? `${offsetX}px` : 0 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <Link to={service.link} className="block">
        <motion.div
          className={`relative group p-8 rounded-2xl border border-white/10 bg-gradient-to-br ${service.color} backdrop-blur-sm transition-all duration-500`}
          whileHover={{ 
            scale: 1.05, 
            y: -8,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }}
          animate={{
            borderColor: isHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"
          }}
        >
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.color} blur-xl -z-10`} />
          
          {/* Number badge */}
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-white/60 text-xs font-mono">{service.number}</span>
          </div>

          <Icon className="w-10 h-10 mb-4 text-white/70 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300" strokeWidth={1.5} />
          
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors">
            {service.title}
          </h3>
          
          <p className="text-white/50 text-sm leading-relaxed mb-4 group-hover:text-white/70 transition-colors">
            {service.description}
          </p>
          
          <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors text-sm">
            Explore
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Animated connection lines between cards
const ConnectionLines = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
    <defs>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    <motion.line
      x1="25%" y1="25%" x2="50%" y2="25%"
      stroke="url(#lineGradient)"
      strokeWidth="1"
      strokeDasharray="5,5"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    <motion.line
      x1="50%" y1="25%" x2="75%" y2="25%"
      stroke="url(#lineGradient)"
      strokeWidth="1"
      strokeDasharray="5,5"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.7 }}
    />
    <motion.line
      x1="30%" y1="75%" x2="55%" y2="75%"
      stroke="url(#lineGradient)"
      strokeWidth="1"
      strokeDasharray="5,5"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.9 }}
    />
  </svg>
);

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-[#050508] py-24 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <ConnectionLines />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header with animated path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-r from-transparent to-white/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-white/40 text-sm tracking-widest uppercase">Our Services</span>
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-l from-transparent to-white/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Full-Stack Growth
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            End-to-end marketing solutions designed specifically for Web3 projects entering the Korean market.
          </p>
        </motion.div>

        {/* Honeycomb Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {services.map((service, index) => (
            <HexagonCard 
              key={service.number} 
              service={service} 
              index={index}
              isHovered={hoveredIndex === index}
              onHover={setHoveredIndex}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            to="/services"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
          >
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)" }} />
    </section>
  );
};

export default ServicesSection;