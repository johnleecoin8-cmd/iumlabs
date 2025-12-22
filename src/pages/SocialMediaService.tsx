import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Calendar, Send, LineChart, Eye, Heart, Users, TrendingUp, MessageCircle, Repeat2, Share } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

const ACCENT_COLOR = "#EC4899";

const serviceTags: ServiceTag[] = [
  { label: "Content Strategy" },
  { label: "Post Creation" },
  { label: "Community Replies" },
  { label: "Engagement Tracking" },
  { label: "Trend Analysis" },
  { label: "Partner Amplification" },
];

const stats: ServiceStat[] = [
  { value: 2, label: "Impressions Generated", suffix: "M+" },
  { value: 50, label: "Accounts Managed", suffix: "+" },
  { value: 18, label: "Avg Engagement Rate", suffix: "%" },
  { value: 156, label: "Monthly Posts", suffix: "K+" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Onboarding",
    description: "We run a kickoff workshop and conduct competitor research to define your narrative, tone, and content strategy.",
    icon: Pencil,
  },
  {
    number: "02",
    title: "Content Production",
    description: "We create post copy, a content calendar, branded visuals, and a reply strategy to guide day-to-day engagement.",
    icon: Calendar,
  },
  {
    number: "03",
    title: "Campaign Goes Live",
    description: "We publish high-impact posts and actively monitor conversations across X, replying where relevant.",
    icon: Send,
  },
  {
    number: "04",
    title: "Reporting",
    description: "We deliver a performance report with insights, learnings, and next-step recommendations.",
    icon: LineChart,
  },
];

const dashboardMetrics = [
  { label: "Impressions", value: "2.4M", change: "+24%", icon: Eye },
  { label: "Engagement", value: "18.2%", change: "+12%", icon: Heart },
  { label: "Followers", value: "156K", change: "+8%", icon: Users },
  { label: "Link Clicks", value: "45.2K", change: "+31%", icon: TrendingUp },
];

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

const SocialMediaService = () => {
  usePageTitle("Social Media Marketing");
  
  const [activeTweet, setActiveTweet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTweet(prev => (prev + 1) % sampleTweets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ServicePageLayout
      serviceName="Social Media Marketing"
      serviceTitle="Social Media"
      serviceSubtitle="Marketing"
      serviceDescription="High-impact content strategy and real-time ecosystem engagement to grow your visibility on X."
      serviceIcon={Pencil}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      currentSlug="social-media"
    >
      {/* Dashboard Section */}
      <section className="scroll-reveal bg-[#0A0A0A]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Real-Time Dashboard" badge="Overview" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left - Metrics Grid */}
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
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

                  <p className="text-white/60 text-lg leading-relaxed">
                    We manage your presence on X with consistent, high-impact content and real-time ecosystem awareness. Our team handles content strategy, post creation, community replies, and partner engagement.
                  </p>
                </div>

                {/* Right - Tweet Cards */}
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default SocialMediaService;
