import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const strategicServices = [
  {
    number: "01",
    title: "GTM Strategy",
    description: "Market entry roadmap & timing for Korean launch",
    link: "/services/gtm-strategy"
  },
  {
    number: "02",
    title: "VASP Compliance",
    description: "Navigate Korean regulatory requirements",
    link: "/services/social-media"
  },
  {
    number: "03",
    title: "Korean Relevance Audit",
    description: "Cultural fit & market readiness assessment",
    link: "/services/gtm-strategy"
  }
];

const growthServices = [
  {
    number: "01",
    title: "KOL & Influencer",
    description: "120+ verified Korean KOLs for authentic promotion",
    link: "/services/influencer"
  },
  {
    number: "02",
    title: "Community Growth",
    description: "Telegram, KakaoTalk, Discord management",
    link: "/services/community"
  },
  {
    number: "03",
    title: "PR & Media",
    description: "Coverage in top Korean crypto publications",
    link: "/services/pr"
  },
  {
    number: "04",
    title: "Events & AMAs",
    description: "Side events at major Korean conferences",
    link: "/services/yap"
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
      className="group block border border-white/10 hover:border-white/30 p-6 transition-all duration-300 hover:bg-white/[0.02]"
    >
      <span className="text-white/40 font-mono text-sm">[{number}]</span>
      <h4 className="text-xl font-bold text-white mt-3 group-hover:text-white transition-colors">
        {title}
      </h4>
      <p className="text-white/50 text-sm mt-2 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center gap-2 mt-4 text-white/40 group-hover:text-white transition-all">
        <span className="text-sm">Learn more</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  </motion.div>
);

interface CategoryHeaderProps {
  line1: string;
  line2: string;
  gradientFrom: string;
  gradientTo: string;
  description: string;
}

const CategoryHeader = ({ line1, line2, gradientFrom, gradientTo, description }: CategoryHeaderProps) => (
  <div className="mb-8">
    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
      {line1}<br />
      <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
        {line2}
      </span>
    </h3>
    <div className={`w-16 h-0.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} mt-4`} />
    <p className="text-white/40 mt-4 max-w-sm text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const ServicesSection = () => {
  return (
    <section className="relative bg-[#0A0A0B] py-24 md:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Impact Headline */}
        <motion.div 
          className="mb-20 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white text-left leading-[1.1] tracking-tight">
            Make Korean Market<br />
            <span className="text-white/30">Actually</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Work for You
            </span>
          </h2>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Strategic Infrastructure */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CategoryHeader
              line1="STRATEGIC"
              line2="INFRASTRUCTURE"
              gradientFrom="from-blue-400"
              gradientTo="to-cyan-400"
              description="The foundation that makes Korean market entry actually possible."
            />
            
            <div className="space-y-4">
              {strategicServices.map((service, index) => (
                <ServiceCard
                  key={service.number}
                  {...service}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column - Growth Engine */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CategoryHeader
              line1="GROWTH"
              line2="ENGINE"
              gradientFrom="from-purple-400"
              gradientTo="to-pink-400"
              description="The acceleration that drives viral growth in Korea."
            />
            
            <div className="space-y-4">
              {growthServices.map((service, index) => (
                <ServiceCard
                  key={service.number}
                  {...service}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
