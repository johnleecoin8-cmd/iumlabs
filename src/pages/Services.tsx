import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Users, AtSign, Mic2, MessageCircle, Newspaper, ChevronDown, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Compass,
    title: "Go-To-Market Strategy",
    shortDesc: "Positioning, messaging, and audience clarity to launch with direction.",
    fullDesc: "We develop comprehensive market entry strategies tailored to the Korean Web3 landscape. This includes competitive analysis, audience segmentation, messaging frameworks, and launch timing optimization.",
    link: "/services/gtm",
    color: "#10B981",
    deliverables: ["Market Analysis Report", "Positioning Strategy", "Launch Roadmap", "Messaging Framework", "Competitive Landscape"]
  },
  {
    icon: Users,
    title: "Community Management",
    shortDesc: "Complete Discord infrastructure to build sticky, scalable growth.",
    fullDesc: "Build thriving communities from scratch. We set up Discord/Telegram infrastructure, recruit moderators, create engagement programs, and develop community growth strategies tailored for Korean audiences.",
    link: "/services/community",
    color: "#3B82F6",
    deliverables: ["Discord/Telegram Setup", "Moderation Team", "Engagement Programs", "Growth Analytics", "Community Playbook"]
  },
  {
    icon: AtSign,
    title: "Social Media Marketing",
    shortDesc: "Content strategy and execution on X to grow visibility.",
    fullDesc: "Strategic content creation and community engagement on X (Twitter). We handle content calendars, real-time engagement, trend hijacking, and audience growth with Korean market focus.",
    link: "/services/social-media",
    color: "#EC4899",
    deliverables: ["Content Calendar", "Daily Posting", "Real-time Engagement", "Trend Analysis", "Performance Reports"]
  },
  {
    icon: Mic2,
    title: "Influencer Strategy",
    shortDesc: "Campaigns powered by top Korean crypto voices.",
    fullDesc: "Access our network of 120+ vetted Korean crypto KOLs. We match projects with the right influencers, negotiate rates, and manage end-to-end campaign execution.",
    link: "/services/influencer",
    color: "#F59E0B",
    deliverables: ["KOL Matching", "Campaign Design", "Contract Negotiation", "Performance Tracking", "ROI Analysis"]
  },
  {
    icon: MessageCircle,
    title: "Yap Strategy",
    shortDesc: "600+ creator network for coordinated awareness campaigns.",
    fullDesc: "Leverage our extensive network of 600+ crypto content creators for coordinated awareness campaigns that drive measurable engagement and conversion in Korean market.",
    link: "/services/yap",
    color: "#8B5CF6",
    deliverables: ["Creator Network Access", "Campaign Coordination", "Trend Seeding", "Viral Mechanics", "Reach Analytics"]
  },
  {
    icon: Newspaper,
    title: "PR & Media",
    shortDesc: "Narrative development and media placements in Korean outlets.",
    fullDesc: "Secure coverage in top Korean crypto media outlets including Block Media, TokenPost, and CoinDesk Korea. We craft compelling narratives and manage media relationships.",
    link: "/services/pr",
    color: "#F97316",
    deliverables: ["Press Releases", "Media Outreach", "Interview Prep", "Byline Articles", "Crisis Management"]
  }
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex flex-col justify-center items-center overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-[#0A0A0A]" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center py-20">
          <motion.p 
            className="text-emerald-400/70 text-sm tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            [ What We Do ]
          </motion.p>
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Services
          </motion.h1>
        </div>
      </section>

      {/* Accordion Services Section */}
      <main className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="space-y-0">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={service.title}
                className="border-b border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full py-6 md:py-8 flex items-center justify-between gap-4 group text-left"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span 
                      className="text-xs font-mono"
                      style={{ color: service.color }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ 
                        backgroundColor: isActive ? `${service.color}20` : 'transparent',
                        border: `1px solid ${isActive ? service.color : 'rgba(255,255,255,0.1)'}`
                      }}
                    >
                      <Icon 
                        className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300"
                        style={{ color: isActive ? service.color : 'rgba(255,255,255,0.5)' }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-white/80 transition-colors">
                        {service.title}
                      </h3>
                      {!isActive && (
                        <p className="text-white/40 text-sm mt-1 hidden md:block">
                          {service.shortDesc}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown 
                      className="w-5 h-5"
                      style={{ color: isActive ? service.color : 'rgba(255,255,255,0.4)' }}
                    />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div 
                        className="pb-8 pl-16 md:pl-24 pr-4"
                        style={{ 
                          background: `linear-gradient(to right, ${service.color}05, transparent)`
                        }}
                      >
                        <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                          {service.fullDesc}
                        </p>

                        {/* Deliverables */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                          {service.deliverables.map((item, i) => (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-center gap-2"
                            >
                              <Check 
                                className="w-4 h-4 flex-shrink-0"
                                style={{ color: service.color }}
                              />
                              <span className="text-white/70 text-sm">{item}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* CTA Link */}
                        <Link
                          to={service.link}
                          className="inline-flex items-center gap-2 font-medium transition-colors"
                          style={{ color: service.color }}
                        >
                          <span>Learn more about {service.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 border-t border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to enter the Korean market?
              </h2>
              <p className="text-white/60">
                Let's discuss how we can help your project grow.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-8 py-4 font-medium hover:bg-white/90 transition-all rounded-lg group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
