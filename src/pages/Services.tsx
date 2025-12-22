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
    link: "/services/gtm"
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link 
        to={service.link}
        className={`group block h-full p-8 md:p-12 transition-all duration-300 hover:bg-white/[0.03] relative overflow-hidden
          ${!isRightColumn ? 'border-r border-white/10' : ''}
          ${!isLastRow ? 'border-b border-white/10' : ''}
        `}
      >
        {/* Hover Glow Effect - Emerald */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/20 to-transparent" />
        </div>
        
        <div className="flex flex-col h-full min-h-[240px] relative">
          {/* Icon */}
          <motion.div 
            className="mb-8 relative"
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <Icon 
              className="w-10 h-10 md:w-12 md:h-12 text-white/60 stroke-[1.5] transition-colors duration-300 group-hover:text-emerald-400" 
            />
            {/* Icon Glow - Emerald */}
            <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10 scale-150 bg-emerald-500/30" 
            />
          </motion.div>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-white transition-colors">
            {service.title}
          </h3>
          
          {/* Description */}
          <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 flex-grow group-hover:text-white/70 transition-colors">
            {service.description}
          </p>
          
          {/* Arrow Link - Emerald */}
          <motion.div 
            className="flex items-center gap-2 text-white/40 group-hover:text-emerald-400 transition-colors duration-300"
            whileHover={{ x: 4 }}
          >
            <span className="text-sm font-medium">Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </motion.div>
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
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section - Emerald Theme */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.35)" }}
          >
            <source src="/videos/services-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
          <motion.span 
            className="text-xs text-emerald-400/70 mb-6 block tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            [ Services ]
          </motion.span>
          <motion.h1 
            className="text-[14vw] md:text-[120px] lg:text-[140px] font-light text-white leading-[0.85] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Gr<span className="serif-italic text-emerald-400">o</span>wth
          </motion.h1>
          <motion.p 
            className="text-lg text-white/60 max-w-xl mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Strategic solutions to launch and grow your Web3 project in the Korean market.
          </motion.p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="scroll-reveal bg-[#0A0A0A]">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-emerald-400 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Services</h2>
            </div>
            <span className="text-xs text-emerald-400 tracking-wider hidden sm:block px-3 py-1 border border-emerald-400/40 rounded-full">
              What We Do
            </span>
          </div>

          {/* Main 2-Column Layout */}
          <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
            {/* Left: Service Grid (2/3) */}
            <div className="w-full lg:w-2/3 border-r-0 lg:border-r border-white/10">
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
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Why CryptoBridge
                  </h2>
                  
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                    We're the Korean Web3 marketing agency that builds the bridge between your project and the Korean market. Founded by former executives from Binance and KuCoin.
                  </p>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link 
                      to="/contact"
                      className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 text-sm font-medium tracking-wide hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-emerald-500/30 rounded-lg"
                    >
                      CONNECT WITH US
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  
                  {/* 3D Gold Shape */}
                  <div className="mt-12 md:mt-16">
                    <GoldShape />
                  </div>
                  
                  {/* Stats */}
                  <div className="mt-12 grid grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="text-2xl md:text-3xl font-bold text-white">18+</div>
                      <div className="text-sm text-white/50">Projects Launched</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-2xl md:text-3xl font-bold text-white">120+</div>
                      <div className="text-sm text-white/50">KOL Network</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;