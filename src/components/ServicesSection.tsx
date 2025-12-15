import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import Bridge3D from "./Bridge3D";

const services = [
  {
    number: "01",
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity for Korean market entry",
    link: "/services/gtm-strategy"
  },
  {
    number: "02",
    title: "Community Management",
    description: "Complete Discord infrastructure and sticky community growth",
    link: "/services/community"
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Content strategy and execution on X (Twitter) for Korean audiences",
    link: "/services/social-media"
  },
  {
    number: "04",
    title: "Influencer Strategy",
    description: "Campaigns with top Korean crypto KOLs and thought leaders",
    link: "/services/influencer"
  },
  {
    number: "05",
    title: "Yap Strategy",
    description: "600+ creator network to drive awareness across Crypto X",
    link: "/services/yap"
  },
  {
    number: "06",
    title: "PR & Media",
    description: "Strategic placements in Korean crypto media outlets",
    link: "/services/pr"
  }
];

const ServicesSection = () => {
  return (
    <section className="relative bg-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      {/* 3D Abstract Bridge - Background Right */}
      <div className="absolute -right-32 top-1/3 w-[500px] h-[400px] opacity-15 z-0 pointer-events-none">
        <Bridge3D type="abstract" color="#6B7280" className="w-full h-full" />
      </div>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* 4pillars-style Header */}
        <SectionHeader 
          title="SERVICES" 
          linkTo="/services" 
          linkText="VIEW ALL"
          dark={true}
        />

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 -mt-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Make Korean Market{' '}
            <span className="text-primary">Actually Work</span> for You
          </h2>
        </motion.div>

        {/* 4pillars-style Full-Width List */}
        <div className="border-t border-white/10">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link 
                to={service.link}
                className="group flex items-center justify-between py-6 md:py-8 border-b border-white/10 transition-all duration-500 ease-out hover:bg-white/[0.05] hover:pl-4 md:hover:pl-6 hover:border-l-2 hover:border-l-primary"
              >
                {/* Left - Number & Title */}
                <div className="flex items-start md:items-center gap-4 md:gap-8 flex-1">
                  {/* Number */}
                  <span className="text-sm font-mono text-white/30 pt-1 md:pt-0 group-hover:text-primary/60 transition-colors duration-500">
                    [{service.number}]
                  </span>
                  
                  {/* Title & Description */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-primary transition-colors duration-500 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/40 group-hover:text-white/60 transition-colors duration-500">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Right - Arrow */}
                <div className="flex items-center gap-3 text-white/30 group-hover:text-primary transition-colors duration-500">
                  <span className="hidden md:block text-sm font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Learn more
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
