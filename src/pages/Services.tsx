import { motion } from "framer-motion";
import { ArrowRight, Compass, Users, AtSign, Mic2, MessageCircle, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Compass,
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus.",
    link: "/services/gtm-strategy"
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Complete Discord community infrastructure to build sticky, scalable and self-sustaining growth.",
    link: "/services/community"
  },
  {
    icon: AtSign,
    title: "Social Media Marketing",
    description: "Content strategy and execution on X to grow visibility and engage with your ecosystem in real time.",
    link: "/services/social-media"
  },
  {
    icon: Mic2,
    title: "Influencer Strategy",
    description: "Influencer campaigns powered by top crypto voices aligned with your message and goals.",
    link: "/services/influencer"
  },
  {
    icon: MessageCircle,
    title: "Yap Strategy",
    description: "Targeted campaigns through a 600+ creator network designed to drive awareness and traction across Crypto X.",
    link: "/services/yap"
  },
  {
    icon: Newspaper,
    title: "PR",
    description: "Narrative development and media placements to get your story published and seen in the right places.",
    link: "/services/pr"
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  
  // Determine border classes based on position
  const isRightColumn = index % 2 === 1;
  const isLastRow = index >= 4;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        to={service.link}
        className={`group block h-full p-8 md:p-12 transition-all duration-300 hover:bg-gray-50
          ${!isRightColumn ? 'border-r border-gray-200' : ''}
          ${!isLastRow ? 'border-b border-gray-200' : ''}
        `}
      >
        <div className="flex flex-col h-full min-h-[240px]">
          {/* Icon */}
          <div className="mb-8">
            <Icon 
              className="w-10 h-10 md:w-12 md:h-12 text-gray-900 stroke-[1.5] transition-transform duration-300 group-hover:scale-110" 
            />
          </div>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
            {service.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 flex-grow">
            {service.description}
          </p>
          
          {/* Arrow Link */}
          <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
            <span className="text-sm font-medium">Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// 3D Abstract Gold Shape Component
const GoldShape = () => (
  <div className="relative w-full aspect-square max-w-[280px] mx-auto">
    {/* Main shape layers */}
    <motion.div 
      className="absolute inset-0"
      animate={{ rotateY: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gold gradient layers */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
        style={{
          background: "linear-gradient(135deg, #C4A35A 0%, #F5E6C8 50%, #C4A35A 100%)",
          filter: "blur(1px)",
          transform: "rotateX(60deg) rotateZ(45deg)",
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        style={{
          background: "linear-gradient(45deg, #D4B86A 0%, #F5E6C8 100%)",
          filter: "blur(0.5px)",
          transform: "rotateX(60deg) rotateZ(-30deg) translateZ(20px)",
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24"
        style={{
          background: "linear-gradient(180deg, #C4A35A 0%, #8B7355 100%)",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          transform: "rotateX(45deg) translateZ(40px)",
        }}
      />
    </motion.div>
    
    {/* Glow effect */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-30"
      style={{
        background: "radial-gradient(circle, #C4A35A 0%, transparent 70%)",
        filter: "blur(20px)",
      }}
    />
  </div>
);

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Simple Header */}
      <motion.header 
        className="pt-32 md:pt-40 pb-12 md:pb-16 px-4 md:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight">
          Our Services
        </h1>
        <p className="text-gray-500 mt-4 text-lg max-w-xl">
          Strategic solutions to launch and grow your Web3 project in the Korean market.
        </p>
      </motion.header>
      
      {/* Main 2-Column Layout */}
      <main className="flex flex-col lg:flex-row max-w-7xl mx-auto border-t border-gray-200">
        {/* Left: Service Grid (2/3) */}
        <div className="w-full lg:w-2/3 border-r-0 lg:border-r border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
        
        {/* Right: Sticky CTA Panel (1/3) */}
        <div className="w-full lg:w-1/3">
          <div className="lg:sticky lg:top-24 p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why CryptoBridge
              </h2>
              
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
                We're the Korean Web3 marketing agency that builds the bridge between your project and the Korean market. Founded by former executives from Binance and KuCoin.
              </p>
              
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300"
              >
                CONNECT WITH US
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              {/* 3D Gold Shape */}
              <div className="mt-12 md:mt-16">
                <GoldShape />
              </div>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">18+</div>
                  <div className="text-sm text-gray-500">Projects Launched</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">120+</div>
                  <div className="text-sm text-gray-500">KOL Network</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
