import { motion } from "framer-motion";
import { ArrowRight, Compass, Users, Search, Mic2, MessageCircle, Newspaper, Rocket, Target } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "GTM Strategy",
    description: "Strategic market entry planning for Web3 projects in Korea.",
    link: "/services/gtm",
    icon: Rocket
  },
  {
    number: "02",
    title: "Branding/Website",
    description: "Distinctive brand identity and high-performance websites.",
    link: "/services/branding",
    icon: Compass
  },
  {
    number: "03",
    title: "SEO/Paid Ads",
    description: "Search optimization and targeted advertising across platforms.",
    link: "/services/seo-ads",
    icon: Search
  },
  {
    number: "04",
    title: "Offline Event",
    description: "End-to-end event planning and on-ground activation.",
    link: "/services/offline-event",
    icon: Target
  },
  {
    number: "05",
    title: "Community Management",
    description: "Discord & Telegram infrastructure for scalable growth.",
    link: "/services/community",
    icon: Users
  },
  {
    number: "06",
    title: "Influencer/KOL",
    description: "Campaigns powered by top crypto voices.",
    link: "/services/influencer",
    icon: Mic2
  },
  {
    number: "07",
    title: "Yap Strategy",
    description: "600+ creator network for awareness and traction.",
    link: "/services/yap",
    icon: MessageCircle
  },
  {
    number: "08",
    title: "PR",
    description: "Media placements to get your story published.",
    link: "/services/pr",
    icon: Newspaper
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  const row = Math.floor(index / 2);
  const isRightColumn = index % 2 === 1;
  const isLastRow = row === 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={service.link}
        className={`group block p-4 sm:p-5 md:p-6 transition-all duration-300 hover:bg-secondary/50 active:bg-secondary/70 relative overflow-hidden ${
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
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 text-muted-foreground group-hover:text-foreground group-hover:drop-shadow-[0_0_12px_hsl(var(--foreground)/0.3)] transition-all duration-300" strokeWidth={1.5} />
        </motion.div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2 group-hover:text-foreground/90 transition-colors relative z-10">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 relative z-10 line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors text-xs sm:text-sm relative z-10">
          <span className="group-hover:underline underline-offset-4">Learn more</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </Link>
    </motion.div>
  );
};

const FloatingOrb = ({ delay = 0, size = 80, x = 0, y = 0 }: { delay?: number; size?: number; x?: number; y?: number }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const ServicesSection = () => {
  return (
    <section className="bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Services Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Right: Sticky CTA Panel */}
        <motion.div
          className="w-full lg:w-1/3 p-6 md:p-8 flex flex-col justify-center relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated background orbs */}
          <FloatingOrb delay={0} size={100} x={10} y={20} />
          <FloatingOrb delay={1} size={60} x={70} y={60} />
          <FloatingOrb delay={2} size={80} x={50} y={10} />
          
          <div className="relative z-10">
            <motion.h2 
              className="text-2xl lg:text-3xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Why Ium Labs
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-sm leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              We're the Korean Web3 marketing agency that bridges your project to the Korean market. Our team combines local expertise with global Web3 experience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-5 py-3 text-sm font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 w-full sm:w-fit"
              >
                CONNECT WITH US
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="mt-8 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <div className="text-xl font-bold text-foreground">$500M+</div>
                <div className="text-xs text-muted-foreground">TGE Support</div>
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">600+</div>
                <div className="text-xs text-muted-foreground">Creator Network</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
