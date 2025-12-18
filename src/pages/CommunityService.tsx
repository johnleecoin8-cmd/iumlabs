import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, Users, Hash, MessageSquare, Bell, Settings, ChevronRight, Shield, Sparkles, UserPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import communityImage from "@/assets/services/community-growth.jpg";
import seoulHanriver from "@/assets/backgrounds/seoul-hanriver-twilight.jpg";

// Discord-style color
const ACCENT_COLOR = "#5865F2"; // Discord Blurple

// Fake chat messages for animation
const chatMessages = [
  { user: "Alex_Web3", message: "GM everyone! 🌅", time: "9:02 AM", avatar: "A" },
  { user: "CryptoSarah", message: "Just joined! What's happening?", time: "9:03 AM", avatar: "C" },
  { user: "ModTeam", message: "Welcome! Check out #announcements for the latest", time: "9:04 AM", avatar: "M", isBot: true },
  { user: "BlockchainDev", message: "The new update looks great 🔥", time: "9:05 AM", avatar: "B" },
];

// Discord channels
const channels = [
  { name: "announcements", icon: Bell, unread: 3 },
  { name: "general", icon: Hash, active: true },
  { name: "support", icon: MessageSquare },
  { name: "governance", icon: Shield },
];

const processSteps = [
  {
    number: "01",
    title: "Onboarding",
    description: "We run a detailed onboarding process to collect information about your project, community goals, and current setup.",
    icon: Users,
  },
  {
    number: "02",
    title: "Infrastructure Setup",
    description: "We implement AI automation, gamified engagement systems, and community training modules tailored to your needs.",
    icon: Settings,
  },
  {
    number: "03",
    title: "Launch & Activation",
    description: "We activate all systems, conduct A/B testing to optimize performance, and monitor early community engagement.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Reporting",
    description: "We deliver performance reports with top contributors, engagement trends, and actionable recommendations.",
    icon: ChevronRight,
  },
];

const stats = [
  { value: "50+", label: "Discord Servers" },
  { value: "500K+", label: "Members Managed" },
];

const CommunityService = () => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [typingIndicator, setTypingIndicator] = useState(false);

  useEffect(() => {
    // Animate chat messages appearing
    const interval = setInterval(() => {
      setVisibleMessages(prev => {
        if (prev < chatMessages.length) {
          setTypingIndicator(true);
          setTimeout(() => setTypingIndicator(false), 500);
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-0.5 sm:p-1 md:p-2">
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden relative">
        {/* Persistent Ambient Glow */}
        <div 
          className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-15"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${ACCENT_COLOR} 0%, transparent 60%)` }}
        />
        <div 
          className="fixed bottom-0 right-0 w-[40vw] h-[40vh] pointer-events-none z-0 opacity-10"
          style={{ background: `radial-gradient(ellipse at 100% 100%, ${ACCENT_COLOR} 0%, transparent 60%)` }}
        />
        
        <Navbar />

        {/* Hero Section - Discord Style */}
        <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-[-5%] bg-cover bg-center bg-no-repeat animate-kenburns"
              style={{ 
                backgroundImage: `url(${seoulHanriver})`,
                filter: "brightness(0.25) saturate(1.2)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />
          </div>

          {/* Content - Discord Preview */}
          <div className="container mx-auto px-6 lg:px-16 pt-32 pb-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                  style={{ borderColor: `${ACCENT_COLOR}50`, backgroundColor: `${ACCENT_COLOR}10` }}
                >
                  <Users className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                  <span className="text-sm" style={{ color: ACCENT_COLOR }}>Community Management</span>
                </motion.div>
                
                <h1 className="text-white mb-6">
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]">
                    Community
                  </span>
                  <span 
                    className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]"
                    style={{ color: ACCENT_COLOR }}
                  >
                    Management
                  </span>
                </h1>

                <p className="text-white/70 text-lg max-w-xl mb-8 font-light leading-relaxed">
                  Build thriving Discord communities with AI-powered automation, gamified engagement, and 24/7 moderation.
                </p>

                <CalendlyButton 
                  className="inline-flex items-center gap-3 px-6 py-3 font-medium text-sm transition-all duration-300 hover:scale-105 rounded-lg"
                  style={{ 
                    backgroundColor: ACCENT_COLOR,
                    color: '#fff',
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  Book a Meeting
                </CalendlyButton>
              </div>

              {/* Right - Discord Preview */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block"
              >
                <div className="bg-[#36393f] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  {/* Discord Header */}
                  <div className="bg-[#2f3136] px-4 py-3 flex items-center gap-3 border-b border-black/20">
                    <Hash className="w-5 h-5 text-gray-400" />
                    <span className="text-white font-medium">general</span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-gray-400">1,234 online</span>
                    </div>
                  </div>

                  <div className="flex">
                    {/* Channels Sidebar */}
                    <div className="w-48 bg-[#2f3136] p-3 hidden md:block">
                      {channels.map((channel) => (
                        <div
                          key={channel.name}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded mb-1 cursor-pointer transition-colors ${
                            channel.active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <channel.icon className="w-4 h-4" />
                          <span className="text-sm">{channel.name}</span>
                          {channel.unread && (
                            <span className="ml-auto bg-red-500 text-white text-xs px-1.5 rounded-full">
                              {channel.unread}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-4 min-h-[300px]">
                      <AnimatePresence>
                        {chatMessages.slice(0, visibleMessages).map((msg, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3 mb-4"
                          >
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                msg.isBot ? 'bg-indigo-500' : 'bg-gray-600'
                              }`}
                            >
                              {msg.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${msg.isBot ? 'text-indigo-400' : 'text-white'}`}>
                                  {msg.user}
                                </span>
                                {msg.isBot && (
                                  <span className="text-xs px-1.5 py-0.5 bg-indigo-500 text-white rounded">BOT</span>
                                )}
                                <span className="text-xs text-gray-500">{msg.time}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{msg.message}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      
                      {/* Typing Indicator */}
                      {typingIndicator && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 text-gray-400 text-sm"
                        >
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span>Someone is typing...</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section - Member Grid */}
        <section 
          className="relative"
          style={{ background: `linear-gradient(to bottom, #0A0A0A, ${ACCENT_COLOR}08, #0A0A0A)` }}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${ACCENT_COLOR}60, transparent)` }}
          />
          
          <div className="py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left - Animated Avatar Grid */}
                <div className="relative">
                  <div className="grid grid-cols-5 gap-3">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="aspect-square rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden group"
                      >
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        >
                          <Users className="w-6 h-6 text-gray-500 group-hover:text-white/80 transition-colors" />
                        </motion.div>
                        {/* Online indicator for some */}
                        {i % 3 === 0 && (
                          <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                  {/* Floating "500K+ Members" badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-4 -right-4 bg-[#0A0A0A] border px-6 py-3 rounded-xl"
                    style={{ borderColor: ACCENT_COLOR }}
                  >
                    <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>500K+</p>
                    <p className="text-white/60 text-sm">Members Managed</p>
                  </motion.div>
                </div>

                {/* Right - Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono" style={{ color: ACCENT_COLOR }}>01</span>
                    <h2 className="text-2xl md:text-3xl font-medium text-white">About</h2>
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    Complete Discord infrastructure transforms servers into growth engines through AI automation, gamified engagement, community training and beyond. Our team handles the setup and management while tracking metrics and identifying growth opportunities.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="p-4 rounded-xl border border-white/10 bg-white/5">
                        <p className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>{stat.value}</p>
                        <p className="text-white/50 text-sm">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Discord Thread Style */}
        <section className="bg-[#2f3136] relative py-12">
          <div className="container mx-auto px-6 lg:px-16">
            {/* Discord Thread Header */}
            <div className="flex items-center gap-3 p-4 bg-[#36393f] rounded-t-xl border-b border-black/20">
              <Hash className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">how-we-work</span>
              <span className="text-gray-500 text-sm ml-2">Thread started</span>
            </div>

            {/* Thread Messages */}
            <div className="bg-[#36393f] rounded-b-xl p-6 space-y-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex gap-4"
                >
                  {/* Bot Avatar */}
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: ACCENT_COLOR }}
                  >
                    <step.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Message */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-indigo-400 font-medium">Ium Labs Bot</span>
                      <span className="text-xs px-1.5 py-0.5 bg-indigo-500 text-white rounded">BOT</span>
                      <span className="text-gray-500 text-xs">Step {step.number}</span>
                    </div>
                    <h3 className="text-white font-medium mb-1">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                    
                    {/* Reactions */}
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 hover:bg-white/10 cursor-pointer">
                        ✅ {4 + index}
                      </span>
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 hover:bg-white/10 cursor-pointer">
                        🔥 {2 + index}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* CTA inside thread */}
              <div className="pt-4 border-t border-white/10 mt-6">
                <CalendlyButton 
                  className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 hover:scale-105 rounded-lg"
                  style={{ backgroundColor: ACCENT_COLOR, color: '#fff' }}
                >
                  <UserPlus className="w-4 h-4" />
                  Start Building Your Community
                </CalendlyButton>
              </div>
            </div>
          </div>
        </section>

        {/* More Services */}
        <section className="bg-[#0A0A0A] border-t border-white/10 py-20">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono text-white/40">03</span>
              <h2 className="text-xl font-medium text-white">More Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { slug: "social-media", title: "Social Media Marketing", color: "#EC4899" },
                { slug: "influencer", title: "Influencer Strategy", color: "#F59E0B" },
                { slug: "gtm", title: "GTM Strategy", color: "#10B981" },
                { slug: "yap", title: "Yap Strategy", color: "#22D3EE" },
                { slug: "pr", title: "PR & Media", color: "#8B5CF6" },
              ].map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group p-6 border border-white/10 rounded-xl hover:border-white/30 transition-all duration-300"
                  style={{ ['--service-color' as string]: service.color }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white group-hover:text-[var(--service-color)] transition-colors">
                      {service.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[var(--service-color)] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default CommunityService;
