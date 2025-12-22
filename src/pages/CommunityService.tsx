import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, Users, Hash, MessageSquare, Bell, Settings, ChevronRight, Shield, Sparkles, UserPlus, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import communityImage from "@/assets/services/community-growth.jpg";
import seoulHanriver from "@/assets/backgrounds/seoul-hanriver-twilight.jpg";

// Platform colors
const DISCORD_COLOR = "#5865F2";
const TELEGRAM_COLOR = "#0088CC";

// Fake chat messages for Discord
const discordMessages = [
  { user: "Alex_Web3", message: "GM everyone! 🌅", time: "9:02 AM", avatar: "A" },
  { user: "CryptoSarah", message: "Just joined! What's happening?", time: "9:03 AM", avatar: "C" },
  { user: "ModTeam", message: "Welcome! Check out #announcements for the latest", time: "9:04 AM", avatar: "M", isBot: true },
  { user: "BlockchainDev", message: "The new update looks great 🔥", time: "9:05 AM", avatar: "B" },
];

// Fake chat messages for Telegram
const telegramMessages = [
  { user: "CryptoKing", message: "방금 공지 확인했어요!", time: "9:02 AM", avatar: "C" },
  { user: "Web3Dev", message: "다음 AMA 언제인가요?", time: "9:03 AM", avatar: "W" },
  { user: "Admin", message: "내일 오후 3시에 진행됩니다 📢", time: "9:04 AM", avatar: "A", isBot: true },
  { user: "NFTCollector", message: "기대됩니다! 🚀", time: "9:05 AM", avatar: "N" },
];

// Discord channels
const discordChannels = [
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
  { value: "50+", label: "Discord & Telegram Servers" },
  { value: "500K+", label: "Members Managed" },
];

const CommunityService = () => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'discord' | 'telegram'>('discord');

  const currentMessages = activePlatform === 'discord' ? discordMessages : telegramMessages;
  const accentColor = activePlatform === 'discord' ? DISCORD_COLOR : TELEGRAM_COLOR;

  useEffect(() => {
    // Reset messages when platform changes
    setVisibleMessages(0);
  }, [activePlatform]);

  useEffect(() => {
    // Animate chat messages appearing
    const interval = setInterval(() => {
      setVisibleMessages(prev => {
        if (prev < currentMessages.length) {
          setTypingIndicator(true);
          setTimeout(() => setTypingIndicator(false), 500);
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentMessages.length]);

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
          className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-15 transition-colors duration-500"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${accentColor} 0%, transparent 60%)` }}
        />
        <div 
          className="fixed bottom-0 right-0 w-[40vw] h-[40vh] pointer-events-none z-0 opacity-10 transition-colors duration-500"
          style={{ background: `radial-gradient(ellipse at 100% 100%, ${accentColor} 0%, transparent 60%)` }}
        />
        
        <Navbar />

        {/* Hero Section */}
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

          {/* Content */}
          <div className="container mx-auto px-6 lg:px-16 pt-32 pb-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 transition-colors duration-300"
                  style={{ borderColor: `${accentColor}50`, backgroundColor: `${accentColor}10` }}
                >
                  <Users className="w-4 h-4 transition-colors duration-300" style={{ color: accentColor }} />
                  <span className="text-sm transition-colors duration-300" style={{ color: accentColor }}>Community Management</span>
                </motion.div>
                
                <h1 className="text-white mb-6">
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]">
                    Community
                  </span>
                  <span 
                    className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95] transition-colors duration-300"
                    style={{ color: accentColor }}
                  >
                    Management
                  </span>
                </h1>

                <p className="text-white/70 text-lg max-w-xl mb-8 font-light leading-relaxed">
                  Build thriving Discord & Telegram communities with AI-powered automation, gamified engagement, and 24/7 moderation.
                </p>

                <CalendlyButton 
                  className="inline-flex items-center gap-3 px-6 py-3 font-medium text-sm transition-all duration-300 hover:scale-105 rounded-lg"
                  style={{ 
                    backgroundColor: accentColor,
                    color: '#fff',
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  Book a Meeting
                </CalendlyButton>
              </div>

              {/* Right - Platform Preview with Tabs */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block"
              >
                {/* Platform Tabs */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setActivePlatform('discord')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      activePlatform === 'discord' 
                        ? 'bg-[#5865F2] text-white' 
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Discord
                  </button>
                  <button
                    onClick={() => setActivePlatform('telegram')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      activePlatform === 'telegram' 
                        ? 'bg-[#0088CC] text-white' 
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    Telegram
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activePlatform === 'discord' ? (
                    <motion.div
                      key="discord"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#36393f] rounded-xl overflow-hidden shadow-2xl border border-white/10"
                    >
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
                          {discordChannels.map((channel) => (
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
                            {discordMessages.slice(0, visibleMessages).map((msg, index) => (
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
                    </motion.div>
                  ) : (
                    <motion.div
                      key="telegram"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#17212b] rounded-xl overflow-hidden shadow-2xl border border-white/10"
                    >
                      {/* Telegram Header */}
                      <div className="bg-[#232e3c] px-4 py-3 flex items-center gap-3 border-b border-black/20">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                          <span className="text-white font-bold">P</span>
                        </div>
                        <div>
                          <span className="text-white font-medium block">Project Community</span>
                          <span className="text-xs text-gray-400">1,234 members</span>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-gray-400">423 online</span>
                        </div>
                      </div>

                      {/* Chat Area */}
                      <div className="p-4 min-h-[300px] bg-[#0e1621]">
                        <AnimatePresence>
                          {telegramMessages.slice(0, visibleMessages).map((msg, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex gap-3 mb-4 ${msg.isBot ? '' : ''}`}
                            >
                              <div 
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                  msg.isBot ? 'bg-cyan-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                                }`}
                              >
                                {msg.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="inline-block bg-[#182533] rounded-2xl rounded-tl-sm px-4 py-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`font-medium text-sm ${msg.isBot ? 'text-cyan-400' : 'text-purple-400'}`}>
                                      {msg.user}
                                    </span>
                                    {msg.isBot && (
                                      <span className="text-xs px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">ADMIN</span>
                                    )}
                                  </div>
                                  <p className="text-white/90 text-sm">{msg.message}</p>
                                  <span className="text-[10px] text-gray-500 float-right mt-1">{msg.time}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {/* Typing Indicator */}
                        {typingIndicator && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-cyan-400 text-sm"
                          >
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span>typing...</span>
                          </motion.div>
                        )}
                      </div>

                      {/* Telegram Input */}
                      <div className="bg-[#17212b] px-4 py-3 border-t border-white/5">
                        <div className="flex items-center gap-3 bg-[#242f3d] rounded-full px-4 py-2">
                          <input 
                            type="text" 
                            placeholder="Message..." 
                            className="flex-1 bg-transparent text-white/60 text-sm outline-none"
                            readOnly
                          />
                          <Send className="w-5 h-5 text-cyan-400" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section - Member Grid */}
        <section 
          className="relative"
          style={{ background: `linear-gradient(to bottom, #0A0A0A, ${accentColor}08, #0A0A0A)` }}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-px transition-colors duration-300"
            style={{ background: `linear-gradient(to right, transparent, ${accentColor}60, transparent)` }}
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
                    className="absolute -bottom-4 -right-4 bg-[#0A0A0A] border px-6 py-3 rounded-xl transition-colors duration-300"
                    style={{ borderColor: accentColor }}
                  >
                    <p className="text-2xl font-bold transition-colors duration-300" style={{ color: accentColor }}>500K+</p>
                    <p className="text-white/60 text-sm">Members Managed</p>
                  </motion.div>
                </div>

                {/* Right - Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono transition-colors duration-300" style={{ color: accentColor }}>01</span>
                    <h2 className="text-2xl md:text-3xl font-medium text-white">About</h2>
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    Complete community infrastructure transforms Discord & Telegram servers into growth engines through AI automation, gamified engagement, community training and beyond. Our team handles the setup and management while tracking metrics and identifying growth opportunities.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="p-4 rounded-xl border border-white/10 bg-white/5">
                        <p className="text-3xl font-bold transition-colors duration-300" style={{ color: accentColor }}>{stat.value}</p>
                        <p className="text-white/50 text-sm">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Vertical Chat Timeline */}
        <section className="bg-[#0A0A0A] relative py-20">
          <div 
            className="absolute top-0 left-0 right-0 h-px transition-colors duration-300"
            style={{ background: `linear-gradient(to right, transparent, ${accentColor}40, transparent)` }}
          />

          <div className="container mx-auto px-6 lg:px-16">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-12">
              <span className="text-xs font-mono transition-colors duration-300" style={{ color: accentColor }}>02</span>
              <h2 className="text-2xl md:text-3xl font-medium text-white">Process</h2>
            </div>

            {/* Vertical Timeline */}
            <div className="relative max-w-2xl mx-auto">
              {/* Timeline Line */}
              <div 
                className="absolute left-8 top-0 bottom-0 w-0.5 transition-colors duration-300"
                style={{ backgroundColor: `${accentColor}30` }}
              />

              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative flex gap-6 mb-8 last:mb-0"
                >
                  {/* Node */}
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 relative z-10 transition-colors duration-300"
                    style={{ backgroundColor: `${accentColor}20`, border: `2px solid ${accentColor}` }}
                  >
                    <step.icon className="w-6 h-6 transition-colors duration-300" style={{ color: accentColor }} />
                  </div>

                  {/* Chat Bubble Style Card */}
                  <div className="flex-1 bg-[#2f3136] rounded-xl p-6 relative">
                    {/* Triangle pointer */}
                    <div 
                      className="absolute left-0 top-6 w-0 h-0 -translate-x-full"
                      style={{
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderRight: '8px solid #2f3136',
                      }}
                    />
                    <div className="flex items-center gap-3 mb-2">
                      <span 
                        className="text-xs font-mono px-2 py-1 rounded transition-colors duration-300"
                        style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                      >
                        Step {step.number}
                      </span>
                      <h3 className="text-white font-medium">{step.title}</h3>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <CalendlyButton 
                className="inline-flex items-center gap-2 px-8 py-4 font-medium transition-all duration-300 hover:scale-105 rounded-xl"
                style={{ backgroundColor: accentColor, color: '#fff' }}
              >
                <UserPlus className="w-5 h-5" />
                Start Building Your Community
              </CalendlyButton>
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
