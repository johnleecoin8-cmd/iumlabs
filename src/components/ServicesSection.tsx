import { motion } from "framer-motion";
import { ArrowRight, Compass, Users, AtSign, Mic2, MessageCircle, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

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
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={service.link}
        className={`group block p-5 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 hover:bg-secondary/50 active:bg-secondary/70 relative overflow-hidden ${
          !isRightColumn ? "sm:border-r border-border" : ""
        } ${!isLastRow ? "border-b border-border" : ""}`}
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        </div>

        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-4 sm:mb-6 text-muted-foreground group-hover:text-foreground group-hover:drop-shadow-[0_0_12px_hsl(var(--foreground)/0.3)] transition-all duration-300" strokeWidth={1.5} />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-foreground/90 transition-colors relative z-10">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 sm:mb-6 relative z-10">
          {service.description}
        </p>
        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0 relative z-10">
          <span className="group-hover:underline underline-offset-4">Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </Link>
    </motion.div>
  );
};

const GoldShape = () => (
  <motion.div
    className="relative w-40 h-40"
    animate={{ rotateY: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <div
      className="absolute inset-0 rounded-3xl"
      style={{
        background: "linear-gradient(135deg, #C4A35A 0%, #F5E6C8 50%, #C4A35A 100%)",
        transform: "rotateX(20deg) rotateZ(-10deg)",
        boxShadow: "0 25px 50px rgba(196, 163, 90, 0.35)"
      }}
    />
    <div
      className="absolute inset-6 rounded-2xl"
      style={{
        background: "linear-gradient(225deg, #F5E6C8 0%, #C4A35A 100%)",
        transform: "rotateX(20deg) rotateZ(-10deg) translateZ(25px)"
      }}
    />
  </motion.div>
);

const ServicesSection = () => {
  return (
    <section className="bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Services Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Right: Sticky CTA Panel */}
        <motion.div
          className="w-full lg:w-1/3 p-6 md:p-8 lg:p-10 flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Ium Labs
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We're the Korean Web3 marketing agency that bridges your project to the Korean market. Our team combines local expertise with global Web3 experience.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 sm:py-3 text-sm font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 w-full sm:w-fit mb-6 min-h-[48px]"
          >
            CONNECT WITH US
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="mt-6 flex justify-center">
            <GoldShape />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
