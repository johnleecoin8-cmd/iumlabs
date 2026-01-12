import { Users, Settings, Sparkles, ChevronRight, Hash, MessageSquare, Bell, Shield, Send, Megaphone, HelpCircle, Pin } from "lucide-react";
import { useState, useEffect } from "react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";
const ACCENT_COLOR = "#5865F2";
const breadcrumbItems = [{
  name: "Home",
  url: "https://iumlabs.io"
}, {
  name: "Services",
  url: "https://iumlabs.io/services"
}, {
  name: "Community Building",
  url: "https://iumlabs.io/services/community"
}];
const TELEGRAM_COLOR = "#0088CC";
const serviceTags: ServiceTag[] = [{
  label: "Discord Management"
}, {
  label: "Telegram Ops"
}, {
  label: "KakaoTalk Open Chat"
}, {
  label: "Naver Cafe"
}, {
  label: "24/7 Moderation"
}, {
  label: "AI Automation"
}];
const stats: ServiceStat[] = [{
  value: 15,
  label: "Discord & Telegram Servers",
  suffix: "+"
}, {
  value: 80,
  label: "Members Managed",
  suffix: "K+"
}, {
  value: 24,
  label: "Support Coverage",
  suffix: "/7"
}, {
  value: 95,
  label: "Retention Rate",
  suffix: "%"
}];
const processSteps: ProcessStep[] = [{
  number: "01",
  title: "Onboarding",
  description: "We run a detailed onboarding process to collect information about your project, community goals, and current setup.",
  icon: Users
}, {
  number: "02",
  title: "Infrastructure Setup",
  description: "We implement AI automation, gamified engagement systems, and community training modules tailored to your needs.",
  icon: Settings
}, {
  number: "03",
  title: "Launch & Activation",
  description: "We activate all systems, conduct A/B testing to optimize performance, and monitor early community engagement.",
  icon: Sparkles
}, {
  number: "04",
  title: "Reporting",
  description: "We deliver performance reports with top contributors, engagement trends, and actionable recommendations.",
  icon: ChevronRight
}];
const deliverables: Deliverable[] = [{
  title: "Global Platforms",
  items: ["Discord/Telegram server setup", "Role hierarchy & permissions", "Verification system", "AI chatbot & automation"]
}, {
  title: "Korean Platforms",
  items: ["KakaoTalk open chat management", "Naver Cafe setup & operation", "Korean content creation", "Korean community events"]
}, {
  title: "Management & Support",
  items: ["24/7 KR/EN moderation", "Engagement event planning", "Sentiment monitoring", "Weekly performance report"]
}];
const faqItems: FAQItem[] = [{
  question: "Do you support Korean platforms (KakaoTalk, Naver)?",
  answer: "Yes, we specialize in KakaoTalk open chat and Naver Cafe management. Korean users prefer these platforms over global ones, making them essential for Korean market entry."
}, {
  question: "Do you also manage Discord and Telegram?",
  answer: "Absolutely. We provide integrated management for global (Discord, Telegram) and Korean (KakaoTalk, Naver Cafe) platforms with customized strategies for each platform's unique characteristics."
}, {
  question: "What's included in 24/7 moderation?",
  answer: "Our bilingual moderators cover all time zones with Korean and English support. This includes spam removal, FUD management, user support, and escalation handling."
}, {
  question: "Can you migrate an existing community?",
  answer: "Yes. We carefully migrate communities while maintaining member relationships and engagement. We audit your current setup and create a transition plan."
}];

// Fake chat messages
const discordMessages = [{
  user: "Alex_Web3",
  message: "GM everyone! 🌅",
  time: "9:02 AM",
  avatar: "A"
}, {
  user: "CryptoSarah",
  message: "Just joined! What's happening?",
  time: "9:03 AM",
  avatar: "C"
}, {
  user: "ModTeam",
  message: "Welcome! Check out #announcements for the latest",
  time: "9:04 AM",
  avatar: "M",
  isBot: true
}, {
  user: "BlockchainDev",
  message: "The new update looks great 🔥",
  time: "9:05 AM",
  avatar: "B"
}];
const telegramMessages = [{
  user: "CryptoKing",
  message: "방금 공지 확인했어요!",
  time: "9:02 AM",
  avatar: "C"
}, {
  user: "Web3Dev",
  message: "다음 AMA 언제인가요?",
  time: "9:03 AM",
  avatar: "W"
}, {
  user: "Admin",
  message: "내일 오후 3시에 진행됩니다 📢",
  time: "9:04 AM",
  avatar: "A",
  isBot: true
}, {
  user: "NFTCollector",
  message: "기대됩니다! 🚀",
  time: "9:05 AM",
  avatar: "N"
}];
const discordChannels = [{
  name: "announcements",
  icon: Bell,
  unread: 3
}, {
  name: "general",
  icon: Hash,
  active: true
}, {
  name: "support",
  icon: MessageSquare
}, {
  name: "governance",
  icon: Shield
}];
const telegramChannels = [{
  name: "📢 Announcements",
  icon: Megaphone,
  unread: 2
}, {
  name: "💬 General Chat",
  icon: MessageSquare,
  active: true
}, {
  name: "❓ Q&A",
  icon: HelpCircle
}, {
  name: "📌 Pinned",
  icon: Pin
}];
const CommunityService = () => {
  usePageMeta({
    title: "Korean Web3 Community Management",
    description: "Build thriving Korean crypto communities on Discord, Telegram, KakaoTalk, and Naver. 24/7 KR/EN moderation for Korean Web3 marketing success.",
    path: "/services/community",
    image: "/og-image.png"
  });
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'discord' | 'telegram'>('discord');
  const currentMessages = activePlatform === 'discord' ? discordMessages : telegramMessages;
  useEffect(() => {
    setVisibleMessages(0);
  }, [activePlatform]);
  useEffect(() => {
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
  return <ServicePageLayout serviceName="Community Management" serviceTitle="Community" serviceSubtitle="Management" serviceDescription="Build thriving Discord & Telegram communities with AI-powered automation, gamified engagement, and 24/7 moderation." serviceIcon={Users} serviceTags={serviceTags} stats={stats} accentColor={ACCENT_COLOR} videoSrc="/videos/community-hero.mp4" posterSrc="/images/posters/community-hero.jpg" processSteps={processSteps} deliverables={deliverables} faqItems={faqItems} currentSlug="community">
      {/* Platform Preview Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="Platform Management" badge="Discord & Telegram" />
          
          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
                {/* Left - Description */}
                <div>
                  <p className="text-white/60 leading-relaxed mb-6 text-lg">
                    We manage your presence on Discord and Telegram with AI-powered automation, 24/7 moderation, and gamified engagement systems. Our team handles community setup, member onboarding, event coordination, and sentiment monitoring.
                  </p>
                  
                  {/* Platform Toggle */}
                  <div className="flex gap-2 mb-6">
                    <button onClick={() => setActivePlatform('discord')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] ${activePlatform === 'discord' ? 'bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/30' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      Discord
                    </button>
                    <button onClick={() => setActivePlatform('telegram')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] ${activePlatform === 'telegram' ? 'bg-[#0088CC] text-white shadow-lg shadow-[#0088CC]/30' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                      <Send className="w-5 h-5" />
                      Telegram
                    </button>
                  </div>
                </div>

                {/* Right - Chat Preview */}
                {activePlatform === 'discord' ? <div className="bg-[#36393f] rounded-xl overflow-hidden shadow-2xl border border-white/10">
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
                        {discordChannels.map(channel => <div key={channel.name} className={`flex items-center gap-2 px-2 py-1.5 rounded mb-1 cursor-pointer transition-colors ${channel.active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                            <channel.icon className="w-4 h-4" />
                            <span className="text-sm">{channel.name}</span>
                            {channel.unread && <span className="ml-auto bg-red-500 text-white text-xs px-1.5 rounded-full">
                                {channel.unread}
                              </span>}
                          </div>)}
                      </div>

                      {/* Chat Area */}
                      <div className="flex-1 p-4 min-h-[300px]">
                        {discordMessages.slice(0, visibleMessages).map((msg, index) => <div key={index} className="flex gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${msg.isBot ? 'bg-indigo-500' : 'bg-gray-600'}`}>
                              {msg.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${msg.isBot ? 'text-indigo-400' : 'text-white'}`}>
                                  {msg.user}
                                </span>
                                {msg.isBot && <span className="text-xs px-1.5 py-0.5 bg-indigo-500 text-white rounded">BOT</span>}
                                <span className="text-xs text-gray-500">{msg.time}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{msg.message}</p>
                            </div>
                          </div>)}
                        
                        {typingIndicator && <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                          animationDelay: '0ms'
                        }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                          animationDelay: '150ms'
                        }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                          animationDelay: '300ms'
                        }} />
                            </div>
                            <span>Someone is typing...</span>
                          </div>}
                      </div>
                    </div>
                  </div> : <div className="bg-[#17212b] rounded-xl overflow-hidden shadow-2xl border border-white/10">
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

                    <div className="flex">
                      {/* Telegram Topics Sidebar */}
                      <div className="w-48 bg-[#1e2c3a] p-3 hidden md:block">
                        {telegramChannels.map(channel => <div key={channel.name} className={`flex items-center gap-2 px-2 py-1.5 rounded mb-1 cursor-pointer transition-colors ${channel.active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                            <span className="text-sm">{channel.name}</span>
                            {channel.unread && <span className="ml-auto bg-[#0088CC] text-white text-xs px-1.5 rounded-full">
                                {channel.unread}
                              </span>}
                          </div>)}
                      </div>

                      {/* Chat Area */}
                      <div className="flex-1 p-4 min-h-[300px]">
                        {telegramMessages.slice(0, visibleMessages).map((msg, index) => <div key={index} className="flex gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${msg.isBot ? 'bg-[#0088CC]' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                              {msg.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${msg.isBot ? 'text-[#0088CC]' : 'text-white'}`}>
                                  {msg.user}
                                </span>
                                {msg.isBot && <span className="text-xs px-1.5 py-0.5 bg-[#0088CC] text-white rounded">Admin</span>}
                                <span className="text-xs text-gray-500">{msg.time}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{msg.message}</p>
                            </div>
                          </div>)}
                        
                        {typingIndicator && <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                          animationDelay: '0ms'
                        }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                          animationDelay: '150ms'
                        }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                          animationDelay: '300ms'
                        }} />
                            </div>
                            <span>누군가 입력 중...</span>
                          </div>}
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Web3 Community Management"
        description="Build thriving Korean crypto communities on Discord, Telegram, KakaoTalk, and Naver. 24/7 KR/EN moderation for Korean Web3 marketing success."
        url="/services/community"
        serviceType={["Community Management", "Discord Management", "Telegram Management", "KakaoTalk Management"]}
      />
    </ServicePageLayout>;
};
export default CommunityService;