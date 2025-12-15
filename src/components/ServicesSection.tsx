import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus.",
    link: "/services/gtm-strategy"
  },
  {
    number: "02",
    title: "Community Management",
    description: "Complete Discord community infrastructure to build sticky, scalable and self-sustaining growth.",
    link: "/services/community"
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Content strategy and execution on X to grow visibility and engage with your ecosystem in real time.",
    link: "/services/social-media"
  },
  {
    number: "04",
    title: "Influencer Strategy",
    description: "Influencer campaigns powered by top crypto voices aligned with your message and goals.",
    link: "/services/influencer"
  },
  {
    number: "05",
    title: "Yap Strategy",
    description: "Targeted campaigns through a 600+ creator network designed to drive awareness and traction across Crypto X.",
    link: "/services/yap"
  },
  {
    number: "06",
    title: "PR",
    description: "Narrative development and media placements to get your story published and seen in the right places.",
    link: "/services/pr"
  }
];

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  link: string;
  index: number;
}

const ServiceCard = ({ number, title, description, link, index }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link 
      to={link}
      className="group block h-full border border-white/10 hover:border-white/30 p-6 transition-all duration-300 hover:bg-white/[0.02]"
    >
      <span className="text-white/40 font-mono text-sm">[{number}]</span>
      <h4 className="text-xl font-bold text-white mt-3">
        {title}
      </h4>
      <p className="text-white/50 text-sm mt-2 leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors text-sm">
        Learn more
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  </motion.div>
);

const ServicesSection = () => {
  return (
    <section className="relative bg-[#0A0A0B] py-24 md:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Option B Header - Background number + gradient title */}
        <motion.div 
          className="relative mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Large background number */}
          <span className="absolute -top-8 md:-top-12 left-0 text-[120px] md:text-[180px] lg:text-[220px] font-black text-white/[0.03] leading-none pointer-events-none select-none">
            01
          </span>
          
          {/* Title */}
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-white/50">Our</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mt-4" />
          </div>
        </motion.div>

        {/* Services Grid - 3x2 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              {...service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
