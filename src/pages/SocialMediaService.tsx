import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Heart, MessageCircle, Repeat2, Share, TrendingUp, BarChart3, Users, Eye, Pencil, Send, LineChart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import CalendlyButton from "@/components/CalendlyButton";
import socialMediaImage from "@/assets/backgrounds/seoul-gangnam-night.jpg";
import { usePageTitle } from "@/hooks/usePageTitle";

// Twitter/X Pink accent
const ACCENT_COLOR = "#EC4899";

// Sample tweets for animation
const sampleTweets = [
  {
    handle: "@YourProject",
    content: "Big announcement coming tomorrow 🔥 Stay tuned for something game-changing in Korean DeFi",
    likes: "2.4K",
    retweets: "892",
    replies: "156",
    time: "2h",
  },
  {
    handle: "@YourProject",
    content: "We just hit 100K community members! 🎉 Thank you to everyone who believed in our vision from day one",
    likes: "5.1K",
    retweets: "1.2K",
    replies: "324",
    time: "5h",
  },
];

// Metrics for dashboard
const dashboardMetrics = [
  { label: "Impressions", value: "2.4M", change: "+24%", icon: Eye },
  { label: "Engagement", value: "18.2%", change: "+12%", icon: Heart },
  { label: "Followers", value: "156K", change: "+8%", icon: Users },
  { label: "Link Clicks", value: "45.2K", change: "+31%", icon: TrendingUp },
];

const processSteps = [
  {
    number: "01",
    title: "Onboarding",
    description: "We run a kickoff workshop and conduct competitor research to define your narrative, tone, and content strategy.",
    icon: Pencil,
    hashtag: "#Strategy",
  },
  {
    number: "02",
    title: "Content Production",
    description: "We create post copy, a content calendar, branded visuals, and a reply strategy to guide day-to-day engagement.",
    icon: Calendar,
    hashtag: "#Content",
  },
  {
    number: "03",
    title: "Campaign Goes Live",
    description: "We publish high-impact posts and actively monitor conversations across X, replying where relevant.",
    icon: Send,
    hashtag: "#Launch",
  },
  {
    number: "04",
    title: "Reporting",
    description: "We deliver a performance report with insights, learnings, and next-step recommendations.",
    icon: LineChart,
    hashtag: "#Analytics",
  },
];

const stats = [
  { value: "2M+", label: "Impressions Generated" },
  { value: "50+", label: "Accounts Managed" },
];

const SocialMediaService = () => {
  usePageTitle("Social Media Marketing");
  
  const [activeTweet, setActiveTweet] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Rotate tweets
    const interval = setInterval(() => {
      setActiveTweet(prev => (prev + 1) % sampleTweets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-advance carousel
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % processSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-0.5 sm:p-1 md:p-2">
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden relative">
        {/* Ambient Glow */}
        <div 
          className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-15"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${ACCENT_COLOR} 0%, transparent 60%)` }}
        />
        <div 
          className="fixed bottom-0 right-0 w-[40vw] h-[40vh] pointer-events-none z-0 opacity-10"
          style={{ background: `radial-gradient(ellipse at 100% 100%, ${ACCENT_COLOR} 0%, transparent 60%)` }}
        />
        
        <Navbar />

        {/* Hero Section - Twitter Feed Style */}
        <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-[-5%] bg-cover bg-center bg-no-repeat animate-kenburns"
              style={{ 
                backgroundImage: `url(${socialMediaImage})`,
                filter: "brightness(0.2) saturate(1.2)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />
          </div>

          {/* Floating Hashtags */}
          {["#Web3", "#CryptoTwitter", "#DeFi", "#NFT", "#Viral"].map((tag, i) => (
            <motion.span
              key={tag}
              className="absolute px-3 py-1.5 text-xs border rounded-full backdrop-blur-sm z-10 hidden md:block"
              style={{ 
                top: `${15 + i * 12}%`, 
                left: i % 2 === 0 ? `${5 + i * 2}%` : undefined,
                right: i % 2 === 1 ? `${8 + i * 2}%` : undefined,
                borderColor: `${ACCENT_COLOR}40`,
                color: ACCENT_COLOR,
                backgroundColor: `${ACCENT_COLOR}10`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ y: { duration: 3, repeat: Infinity, delay: i * 0.3 } }}
            >
              {tag}
            </motion.span>
          ))}

          {/* Content */}
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
                  <span className="text-xl">𝕏</span>
                  <span className="text-sm" style={{ color: ACCENT_COLOR }}>Social Media Marketing</span>
                </motion.div>
                
                <h1 className="text-white mb-6">
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]">
                    Social Media
                  </span>
                  <span 
                    className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]"
                    style={{ color: ACCENT_COLOR }}
                  >
                    Marketing
                  </span>
                </h1>

                <p className="text-white/70 text-lg max-w-xl mb-8 font-light leading-relaxed">
                  High-impact content strategy and real-time ecosystem engagement to grow your visibility on X.
                </p>

                <CalendlyButton 
                  className="inline-flex items-center gap-3 px-6 py-3 font-medium text-sm transition-all duration-300 hover:scale-105 rounded-full"
                  style={{ backgroundColor: ACCENT_COLOR, color: '#fff' }}
                >
                  <Calendar className="w-4 h-4" />
                  Book a Meeting
                </CalendlyButton>
              </div>

              {/* Right - Tweet Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  {sampleTweets.map((tweet, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: activeTweet === index ? 1 : 0.3,
                        y: activeTweet === index ? 0 : 20,
                        scale: activeTweet === index ? 1 : 0.95,
                      }}
                      className={`bg-[#16181c] border border-white/10 rounded-2xl p-5 mb-4 transition-all ${
                        activeTweet === index ? 'z-10 relative' : 'absolute top-0 left-0 right-0'
                      }`}
                    >
                      {/* Tweet Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: ACCENT_COLOR }}
                        >
                          <span className="text-white font-bold">YP</span>
                        </div>
                        <div>
                          <p className="text-white font-bold">Your Project</p>
                          <p className="text-gray-500 text-sm">{tweet.handle} · {tweet.time}</p>
                        </div>
                      </div>

                      {/* Tweet Content */}
                      <p className="text-white text-lg mb-4">{tweet.content}</p>

                      {/* Tweet Actions */}
                      <div className="flex items-center justify-between text-gray-500">
                        <div className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer">
                          <MessageCircle className="w-5 h-5" />
                          <span>{tweet.replies}</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer">
                          <Repeat2 className="w-5 h-5" />
                          <span>{tweet.retweets}</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-pink-400 transition-colors cursor-pointer">
                          <Heart className="w-5 h-5" />
                          <span>{tweet.likes}</span>
                        </div>
                        <Share className="w-5 h-5 hover:text-blue-400 transition-colors cursor-pointer" />
                      </div>
                    </motion.div>
                  ))}

                  {/* Heart Particles */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ left: `${20 + i * 15}%`, bottom: 0 }}
                      animate={{
                        y: [-20, -100],
                        opacity: [1, 0],
                        scale: [1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    >
                      <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="scroll-reveal bg-[#0A0A0A]">
          <div className="border-t border-white/10">
            <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs font-mono tracking-widest" style={{ color: ACCENT_COLOR }}>01</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Real-Time Dashboard</h2>
              </div>
              <span 
                className="text-xs tracking-wider hidden sm:block px-3 py-1 border rounded-full"
                style={{ color: ACCENT_COLOR, borderColor: `${ACCENT_COLOR}40` }}
              >
                Overview
              </span>
            </div>

            <div className="py-16 md:py-20">
              <div className="container mx-auto px-6 lg:px-16">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                  {dashboardMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#16181c] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <metric.icon className="w-5 h-5 text-gray-500" />
                        <span className="text-green-400 text-sm font-medium">{metric.change}</span>
                      </div>
                      <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
                      <p className="text-gray-500 text-sm">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* About Text */}
                <div className="max-w-3xl">
                  <p className="text-white/60 text-lg leading-relaxed">
                    We manage your presence on X with consistent, high-impact content and real-time ecosystem awareness. Our team handles content strategy, post creation, community replies, and partner engagement while tracking sentiment and identifying opportunities to amplify momentum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="scroll-reveal bg-[#0A0A0A]">
          <div className="border-t border-white/10">
            <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs font-mono tracking-widest" style={{ color: ACCENT_COLOR }}>02</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
              </div>
              <span 
                className="text-xs tracking-wider hidden sm:block px-3 py-1 border rounded-full"
                style={{ color: ACCENT_COLOR, borderColor: `${ACCENT_COLOR}40` }}
              >
                How We Work
              </span>
            </div>

            <div className="py-16 md:py-20">
              <div className="container mx-auto px-6 lg:px-16">
                {/* Carousel Navigation */}
            <div className="flex gap-2 mb-8">
              {processSteps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    activeStep === index 
                      ? 'text-white' 
                      : 'text-white/40 hover:text-white/60'
                  }`}
                  style={{ 
                    backgroundColor: activeStep === index ? ACCENT_COLOR : 'transparent',
                    border: `1px solid ${activeStep === index ? ACCENT_COLOR : 'rgba(255,255,255,0.1)'}`
                  }}
                >
                  {step.hashtag}
                </button>
              ))}
            </div>

            {/* Carousel Content */}
            <div className="relative min-h-[200px]">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={false}
                  animate={{
                    opacity: activeStep === index ? 1 : 0,
                    x: activeStep === index ? 0 : 50,
                  }}
                  className={`${activeStep === index ? 'relative' : 'absolute top-0 left-0 right-0 pointer-events-none'}`}
                >
                  <div className="bg-[#16181c] border border-white/10 rounded-2xl p-8">
                    <div className="flex items-start gap-6">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${ACCENT_COLOR}20` }}
                      >
                        <step.icon className="w-7 h-7" style={{ color: ACCENT_COLOR }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono" style={{ color: ACCENT_COLOR }}>Step {step.number}</span>
                          <span className="text-gray-500">{step.hashtag}</span>
                        </div>
                        <h3 className="text-2xl font-medium text-white mb-3">{step.title}</h3>
                        <p className="text-white/60 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="flex gap-2 mt-6">
              {processSteps.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 rounded-full overflow-hidden bg-white/10"
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: ACCENT_COLOR }}
                    initial={{ width: 0 }}
                    animate={{ width: activeStep === index ? '100%' : '0%' }}
                    transition={{ duration: 3, ease: 'linear' }}
                  />
                </div>
              ))}
            </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-16">
            <div 
              className="rounded-2xl p-10 text-center relative overflow-hidden"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Go Viral?</h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Let's build a social media strategy that gets your project trending on Crypto Twitter.
              </p>
              <CalendlyButton className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-medium rounded-full hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
                Book Your Strategy Call
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
                { slug: "community", title: "Community Management", color: "#5865F2" },
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

        <ContactFormSection sectionNumber="04" />
        <Footer />
      </div>
    </div>
  );
};

export default SocialMediaService;
