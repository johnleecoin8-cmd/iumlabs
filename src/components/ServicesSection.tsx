import { motion } from "framer-motion";
import { ArrowRight, Compass, Users, AtSign, Mic2, MessageCircle, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import Logo3D from "@/components/Logo3D";
const services = [
  {
    number: "01",
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus.",
    link: "/services/gtm",
    icon: Compass
  },
  {
    number: "02",
    title: "Community Management",
    description: "Complete Discord community infrastructure to build sticky, scalable and self-sustaining growth.",
    link: "/services/community",
    icon: Users
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Content strategy and execution on X to grow visibility and engage with your ecosystem in real time.",
    link: "/services/social-media",
    icon: AtSign
  },
  {
    number: "04",
    title: "Influencer Strategy",
    description: "Influencer campaigns powered by top crypto voices aligned with your message and goals.",
    link: "/services/influencer",
    icon: Mic2
  },
  {
    number: "05",
    title: "Yap Strategy",
    description: "Targeted campaigns through a 600+ creator network designed to drive awareness and traction across Crypto X.",
    link: "/services/yap",
    icon: MessageCircle
  },
  {
    number: "06",
    title: "PR",
    description: "Narrative development and media placements to get your story published and seen in the right places.",
    link: "/services/pr",
    icon: Newspaper
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
        className={`group block p-6 md:p-8 transition-all duration-300 hover:bg-white/5 hover:shadow-lg hover:shadow-white/5 ${
          !isRightColumn ? "border-r border-white/10" : ""
        } ${!isLastRow ? "border-b border-white/10" : ""}`}
      >
        <Icon className="w-10 h-10 mb-6 text-white/40 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold text-white mb-3">
          {service.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {service.description}
        </p>
        <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors text-sm">
          Learn more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};


const ServicesSection = () => {
  return (
    <section className="bg-[#0A0A0A]">
      <div className="flex flex-col lg:flex-row">
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
          className="w-full lg:w-1/3 p-6 md:p-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Ium Labs
          </h2>
          <p className="text-white/50 leading-relaxed mb-8">
            We're the Korean Web3 marketing agency that bridges your project to the Korean market. Our team combines local expertise with global Web3 experience.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors w-fit mb-6"
          >
            CONNECT WITH US
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="h-64">
            <Logo3D />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
