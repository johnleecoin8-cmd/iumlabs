import { motion } from "framer-motion";
import { ArrowRight, Compass, Users, AtSign, Mic2, MessageCircle, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import { usePageTitle } from "@/hooks/usePageTitle";
import useScrollReveal from "@/hooks/useScrollReveal";

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
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/20 to-transparent" />
        </div>
        
        <div className="flex flex-col h-full min-h-[240px] relative">
          <motion.div 
            className="mb-8 relative"
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <Icon 
              className="w-10 h-10 md:w-12 md:h-12 text-white/60 stroke-[1.5] transition-colors duration-300 group-hover:text-emerald-400" 
            />
            <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10 scale-150 bg-emerald-500/30" 
            />
          </motion.div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-white transition-colors">
            {service.title}
          </h3>
          
          <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 flex-grow group-hover:text-white/70 transition-colors">
            {service.description}
          </p>
          
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

const Services = () => {
  usePageTitle("Services");
  useScrollReveal();
  
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative min-h-[60vh] flex flex-col justify-center items-center overflow-hidden rounded-xl sm:rounded-2xl">
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

          <div className="container mx-auto max-w-7xl px-4 relative z-20 text-center">
            <motion.span 
              className="text-xs text-emerald-400 mb-6 block tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              [ Services ]
            </motion.span>
            <motion.h1 
              className="text-[14vw] md:text-[120px] lg:text-[140px] font-light text-white leading-[0.85] tracking-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Gr<span className="serif-italic text-emerald-400">o</span>wth
            </motion.h1>
            <motion.p 
              className="text-lg text-white/80 max-w-xl mx-auto mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Strategic solutions to launch and grow your Web3 project in the Korean market.
            </motion.p>
          </div>
        </section>
      </main>
      
      {/* Services Section - 01 홀수 */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Services</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
              What We Do
            </span>
          </div>

          <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
            <div className="w-full lg:w-2/3 border-r-0 lg:border-r border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {services.map((service, index) => (
                  <ServiceCard key={service.title} service={service} index={index} />
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/3">
              <div className="lg:sticky lg:top-24 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Why Ium Labs
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
                  
                  <div className="mt-12 md:mt-16 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30" />
                  </div>
                  
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
      
      {/* Contact Section - 02 짝수 */}
      <section className="scroll-reveal bg-[#121212]">
        <ContactFormSection sectionNumber="02" />
      </section>
      
      <div className="border-t border-white/10">
        <Footer />
      </div>
    </div>
  );
};

export default Services;