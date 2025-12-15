import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Megaphone, TrendingUp, FileText, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction.",
    icon: Rocket,
    link: "/services/gtm-strategy"
  },
  {
    number: "02",
    title: "Community Management",
    description: "Complete Discord infrastructure for sticky, scalable growth.",
    icon: Users,
    link: "/services/community"
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Content strategy and execution on X to grow visibility.",
    icon: Globe,
    link: "/services/social-media"
  },
  {
    number: "04",
    title: "Influencer Strategy",
    description: "Campaigns powered by top crypto voices aligned with your goals.",
    icon: Megaphone,
    link: "/services/influencer"
  },
  {
    number: "05",
    title: "Yap Strategy",
    description: "600+ creator network to drive awareness across Crypto X.",
    icon: TrendingUp,
    link: "/services/yap"
  },
  {
    number: "06",
    title: "PR & Media",
    description: "Narrative development and placements in the right publications.",
    icon: FileText,
    link: "/services/pr"
  }
];

const ServicesSection = () => {
  return (
    <section className="relative bg-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono text-gray-500 mb-4 block">/ SERVICES</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              What We <span className="text-gray-500">Do</span>
            </h2>
            <Link 
              to="/services"
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors group"
            >
              CONNECT WITH US
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Services Grid - 2x3 Line Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isTopRow = index < 3;
            const isLeftColumn = index % 3 === 0;
            const isRightColumn = index % 3 === 2;
            
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={service.link}
                  className={`group block h-full p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.03]
                    ${!isTopRow ? 'border-t border-white/10' : ''}
                    ${!isLeftColumn ? 'lg:border-l border-white/10' : ''}
                    ${index >= 3 && index < 6 && 'md:border-t'}
                    ${index % 2 === 1 ? 'md:border-l lg:border-l-0' : ''}
                    ${index === 3 || index === 4 || index === 5 ? 'lg:border-t' : ''}
                  `}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                  </div>

                  {/* Number */}
                  <span className="text-xs font-mono text-gray-600 mb-3 block">
                    [{service.number}]
                  </span>

                  {/* Title */}
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-white/30 group-hover:text-white transition-colors">
                    <span className="text-sm">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
