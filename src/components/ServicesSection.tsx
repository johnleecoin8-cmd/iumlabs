import { motion } from "framer-motion";
import { ArrowRight, Compass, Users, AtSign, Mic2, MessageCircle, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus.",
    link: "/services/gtm-strategy",
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
    >
      <Link
        to={service.link}
        className={`group block p-8 md:p-10 transition-colors duration-300 hover:bg-gray-50 ${
          !isRightColumn ? "border-r border-gray-200" : ""
        } ${!isLastRow ? "border-b border-gray-200" : ""}`}
      >
        <Icon className="w-10 h-10 mb-6 text-gray-400 group-hover:text-gray-900 transition-colors" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {service.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {service.description}
        </p>
        <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-900 transition-colors text-sm">
          Learn more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};

const GoldShape = () => (
  <motion.div
    className="relative w-48 h-48 mx-auto"
    animate={{ rotateY: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <div
      className="absolute inset-0 rounded-3xl"
      style={{
        background: "linear-gradient(135deg, #C4A35A 0%, #F5E6C8 50%, #C4A35A 100%)",
        transform: "rotateX(20deg) rotateZ(-10deg)",
        boxShadow: "0 20px 40px rgba(196, 163, 90, 0.3)"
      }}
    />
    <div
      className="absolute inset-4 rounded-2xl"
      style={{
        background: "linear-gradient(225deg, #F5E6C8 0%, #C4A35A 100%)",
        transform: "rotateX(20deg) rotateZ(-10deg) translateZ(20px)"
      }}
    />
  </motion.div>
);

const ServicesSection = () => {
  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Services Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-gray-200">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why CryptoBridge
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            We're the Korean Web3 marketing agency that builds the bridge between your project and the Korean market. Our team combines local expertise with global Web3 experience.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors w-fit mb-12"
          >
            CONNECT WITH US
            <ArrowRight className="w-4 h-4" />
          </Link>

          <GoldShape />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-bold text-gray-900">18+</p>
                <p className="text-gray-500 text-sm">Projects Launched</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">120+</p>
                <p className="text-gray-500 text-sm">KOL Network</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
