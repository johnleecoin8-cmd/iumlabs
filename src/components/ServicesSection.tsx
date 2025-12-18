import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Compass, Users, AtSign, Mic2, MessageCircle, Newspaper, Check } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus.",
    fullDescription: "We develop comprehensive market entry strategies tailored to the Korean Web3 landscape. This includes competitive analysis, audience segmentation, messaging frameworks, and launch timing optimization.",
    link: "/services/gtm",
    icon: Compass,
    color: "#10B981",
    features: ["Market Analysis", "Positioning Strategy", "Launch Roadmap", "Messaging Framework"]
  },
  {
    number: "02",
    title: "Community Management",
    description: "Complete Discord community infrastructure to build sticky, scalable and self-sustaining growth.",
    fullDescription: "Build thriving communities from scratch. We set up Discord/Telegram infrastructure, recruit moderators, create engagement programs, and develop community growth strategies.",
    link: "/services/community",
    icon: Users,
    color: "#3B82F6",
    features: ["Discord Setup", "Moderation Team", "Engagement Programs", "Growth Analytics"]
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Content strategy and execution on X to grow visibility and engage with your ecosystem in real time.",
    fullDescription: "Strategic content creation and community engagement on X (Twitter). We handle content calendars, real-time engagement, trend hijacking, and audience growth.",
    link: "/services/social-media",
    icon: AtSign,
    color: "#EC4899",
    features: ["Content Strategy", "Daily Posting", "Engagement", "Trend Analysis"]
  },
  {
    number: "04",
    title: "Influencer Strategy",
    description: "Influencer campaigns powered by top crypto voices aligned with your message and goals.",
    fullDescription: "Access our network of 120+ vetted Korean crypto KOLs. We match projects with the right influencers, negotiate rates, and manage campaign execution.",
    link: "/services/influencer",
    icon: Mic2,
    color: "#F59E0B",
    features: ["KOL Matching", "Campaign Design", "Performance Tracking", "ROI Optimization"]
  },
  {
    number: "05",
    title: "Yap Strategy",
    description: "Targeted campaigns through a 600+ creator network designed to drive awareness and traction across Crypto X.",
    fullDescription: "Leverage our extensive network of 600+ crypto content creators for coordinated awareness campaigns that drive measurable engagement and conversion.",
    link: "/services/yap",
    icon: MessageCircle,
    color: "#06B6D4",
    features: ["Creator Network", "Coordinated Campaigns", "Trend Seeding", "Viral Mechanics"]
  },
  {
    number: "06",
    title: "PR",
    description: "Narrative development and media placements to get your story published and seen in the right places.",
    fullDescription: "Secure coverage in top Korean crypto media outlets including Block Media, TokenPost, and CoinDesk Korea. We craft compelling narratives and manage media relationships.",
    link: "/services/pr",
    icon: Newspaper,
    color: "#8B5CF6",
    features: ["Press Releases", "Media Outreach", "Interview Prep", "Crisis Management"]
  }
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeService = services[activeTab];
  const Icon = activeService.icon;

  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Tab Navigation - Horizontal scroll on mobile */}
        <div className="flex gap-1 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {services.map((service, index) => (
            <motion.button
              key={service.number}
              onClick={() => setActiveTab(index)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg whitespace-nowrap ${
                activeTab === index
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
              style={{
                backgroundColor: activeTab === index ? `${service.color}20` : 'transparent',
                borderColor: activeTab === index ? service.color : 'transparent',
                border: activeTab === index ? `1px solid ${service.color}40` : '1px solid transparent'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-mono text-xs mr-2" style={{ color: activeTab === index ? service.color : undefined }}>
                {service.number}
              </span>
              {service.title}
            </motion.button>
          ))}
        </div>

        {/* Active Service Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20"
          >
            {/* Left: Service Info */}
            <div>
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
                style={{ 
                  backgroundColor: `${activeService.color}15`,
                  boxShadow: `0 0 40px ${activeService.color}20`
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Icon 
                  className="w-8 h-8" 
                  style={{ color: activeService.color }}
                />
              </motion.div>

              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                {activeService.title}
              </motion.h2>

              <motion.p 
                className="text-white/60 text-lg leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {activeService.fullDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  to={activeService.link}
                  className="group inline-flex items-center gap-3 text-white font-medium"
                >
                  <span 
                    className="px-6 py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                    style={{ 
                      backgroundColor: activeService.color,
                      boxShadow: `0 0 0 ${activeService.color}30`
                    }}
                  >
                    Learn More
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" style={{ color: activeService.color }} />
                </Link>
              </motion.div>
            </div>

            {/* Right: Features Grid */}
            <div className="space-y-4">
              <p className="text-white/40 text-sm uppercase tracking-wider mb-6">What's Included</p>
              {activeService.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-4 p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors bg-white/[0.02]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${activeService.color}20` }}
                  >
                    <Check className="w-4 h-4" style={{ color: activeService.color }} />
                  </div>
                  <span className="text-white font-medium">{feature}</span>
                </motion.div>
              ))}

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div>
                  <p className="text-3xl font-bold" style={{ color: activeService.color }}>18+</p>
                  <p className="text-white/50 text-sm">Projects Launched</p>
                </div>
                <div>
                  <p className="text-3xl font-bold" style={{ color: activeService.color }}>120+</p>
                  <p className="text-white/50 text-sm">KOL Network</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;
