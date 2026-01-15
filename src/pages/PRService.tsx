import { useState, useEffect } from "react";
import { Newspaper, Users, FileText, Eye, Share2, BarChart3, Send, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

// Import media logos
import blockmediaLogo from "@/assets/logos/blockmedia-new.png";
import coinnessLogo from "@/assets/logos/coinness.png";
import bloomingbitLogo from "@/assets/logos/bloomingbit.png";
import coindeskLogo from "@/assets/logos/coindesk.png";
import cointelegraphLogo from "@/assets/logos/cointelegraph.png";

const ACCENT_COLOR = "#8B5CF6";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "PR & Media", url: "https://iumlabs.io/services/pr" }
];

const serviceTags: ServiceTag[] = [
  { label: "Korean Media Distribution" },
  { label: "Press Release (KR/EN)" },
  { label: "Media Outreach" },
  { label: "Blockmedia/Coinness" },
  { label: "Interview Setup" },
  { label: "Crisis Management" },
];

const stats: ServiceStat[] = [{
  value: 50,
  label: "Articles Published",
  suffix: "+"
}, {
  value: 20,
  label: "Media Partners",
  suffix: "+"
}, {
  value: 5,
  label: "Total Reach",
  suffix: "M+"
}, {
  value: 90,
  label: "Coverage Success Rate",
  suffix: "%"
}];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Story Development",
    description: "We craft compelling narratives that resonate with Korean media and audiences, positioning your project for maximum impact.",
    icon: Newspaper,
  },
  {
    number: "02",
    title: "Media Outreach",
    description: "We leverage our network of 20+ Korean media outlets to secure premium coverage and interviews.",
    icon: Users,
  },
  {
    number: "03",
    title: "Content Distribution",
    description: "We coordinate multi-channel distribution across news sites, social media, and community platforms.",
    icon: Share2,
  },
  {
    number: "04",
    title: "Impact Tracking",
    description: "We monitor coverage, measure reach, and provide detailed analytics on media performance.",
    icon: BarChart3,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Korean Media",
    items: [
      "Korean press release writing",
      "Blockmedia/Coinness/TokenPost placement",
      "Business section in major outlets",
      "Korean crypto podcast features",
    ],
  },
  {
    title: "Global Media",
    items: [
      "English press release",
      "CoinDesk/Cointelegraph distribution",
      "Global interview coordination",
      "Op-ed contributions",
    ],
  },
  {
    title: "Reporting & Analysis",
    items: [
      "Coverage tracking dashboard",
      "KR/EN sentiment analysis",
      "Competitor benchmarking",
      "Monthly PR report",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Which Korean media outlets do you work with?",
    answer: "We have direct partnerships with major Korean crypto media including Blockmedia, Coinness, BloomingBit, and TokenPost. We can also distribute to mainstream business outlets like Chosun Biz and Hankyung.",
  },
  {
    question: "How long does it take to publish a press release?",
    answer: "From writing to publication typically takes 3-5 business days. For urgent news or time-sensitive announcements, same-day publication is possible.",
  },
  {
    question: "Do you support crisis communication?",
    answer: "Yes, we provide 24/7 crisis management support. This includes rapid response messaging, media coordination, and reputation management strategies.",
  },
  {
    question: "Can you arrange Korean media interviews?",
    answer: "Absolutely. We regularly arrange interviews with top Korean crypto journalists and podcasters. We handle all logistics including interpretation support.",
  },
];

// News headlines for ticker
const newsHeadlines = [
  { outlet: "Blockmedia", title: "Story Protocol Raises $80M to Revolutionize IP Licensing", time: "2 min ago" },
  { outlet: "Coinness", title: "Peaq Network Launches DePIN Infrastructure on Polkadot", time: "5 min ago" },
  { outlet: "CoinDesk", title: "Korean Exchange Volumes Surge as Bitcoin Breaks $100K", time: "12 min ago" },
  { outlet: "Cointelegraph", title: "MANTRA DAO Partners with Major Korean Enterprises", time: "18 min ago" },
  { outlet: "BloomingBit", title: "Sahara AI Announces Korean Market Expansion Strategy", time: "25 min ago" },
  { outlet: "TokenPost", title: "MegaETH Breaks Testnet Records with 100K TPS", time: "32 min ago" },
];

// Media outlets for distribution flow
const mediaOutlets = [
  { name: "Blockmedia", logo: blockmediaLogo, region: "Korea" },
  { name: "Coinness", logo: coinnessLogo, region: "Korea" },
  { name: "BloomingBit", logo: bloomingbitLogo, region: "Korea" },
  { name: "CoinDesk", logo: coindeskLogo, region: "Global" },
  { name: "Cointelegraph", logo: cointelegraphLogo, region: "Global" },
];

// Live News Distribution Simulation
const LiveNewsDistribution = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [activeOutlets, setActiveOutlets] = useState<number[]>([]);
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [reachCount, setReachCount] = useState(0);

  const steps = [
    { label: "Press Release", icon: FileText, status: "complete" },
    { label: "Distribution", icon: Send, status: "active" },
    { label: "Published", icon: CheckCircle2, status: "pending" },
  ];

  // Cycle through distribution animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= 2) {
          // Reset after completion
          setTimeout(() => {
            setActiveOutlets([]);
            setPublishedCount(0);
          }, 1000);
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animate outlets publishing one by one
  useEffect(() => {
    if (currentStep === 1) {
      let index = 0;
      const outletInterval = setInterval(() => {
        if (index < mediaOutlets.length) {
          setActiveOutlets(prev => [...prev, index]);
          setPublishedCount(prev => prev + 1);
          index++;
        } else {
          clearInterval(outletInterval);
        }
      }, 400);
      return () => clearInterval(outletInterval);
    }
  }, [currentStep]);

  // Animate reach counter
  useEffect(() => {
    if (publishedCount > 0) {
      const targetReach = publishedCount * 890000;
      const duration = 800;
      const startTime = Date.now();
      const startValue = reachCount;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setReachCount(Math.floor(startValue + (targetReach - startValue) * eased));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [publishedCount]);

  // News ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline(prev => (prev + 1) % newsHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatReach = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${Math.floor(num / 1000)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Live News Ticker */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/50">
        <div className="flex items-center gap-3 px-4 py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-medium text-red-400 uppercase tracking-wider">Live</span>
          </div>
          <span className="text-xs text-white/40">Latest Coverage</span>
        </div>
        
        <div className="h-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeadline}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center px-4"
            >
              <span 
                className="text-xs font-medium px-2 py-0.5 rounded mr-3"
                style={{ backgroundColor: `${ACCENT_COLOR}30`, color: ACCENT_COLOR }}
              >
                {newsHeadlines[currentHeadline].outlet}
              </span>
              <span className="text-sm text-white flex-1 truncate">
                {newsHeadlines[currentHeadline].title}
              </span>
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {newsHeadlines[currentHeadline].time}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Distribution Flow Visualization */}
      <div className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isComplete = index < currentStep;
            
            return (
              <div key={step.label} className="flex items-center">
                <motion.div
                  animate={{ 
                    scale: isActive ? [1, 1.1, 1] : 1,
                    borderColor: isActive ? ACCENT_COLOR : isComplete ? '#22C55E' : 'rgba(255,255,255,0.2)'
                  }}
                  transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center ${
                    isComplete ? 'bg-green-500/20' : isActive ? 'bg-purple-500/20' : 'bg-white/5'
                  }`}
                >
                  <Icon 
                    className="w-5 h-5" 
                    style={{ color: isComplete ? '#22C55E' : isActive ? ACCENT_COLOR : 'rgba(255,255,255,0.4)' }} 
                  />
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="w-12 sm:w-20 h-0.5 mx-2">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: isComplete ? '#22C55E' : 'rgba(255,255,255,0.1)' }}
                      animate={{ 
                        scaleX: isComplete ? 1 : 0,
                        transformOrigin: 'left'
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Media Outlets Grid */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {mediaOutlets.map((outlet, index) => {
            const isActive = activeOutlets.includes(index);
            
            return (
              <motion.div
                key={outlet.name}
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? [1, 1.05, 1] : 1,
                  borderColor: isActive ? ACCENT_COLOR : 'rgba(255,255,255,0.1)'
                }}
                transition={{ duration: 0.4 }}
                className="relative p-3 rounded-xl border-2 bg-white/[0.02] flex flex-col items-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center p-1.5">
                  <img 
                    src={outlet.logo} 
                    alt={outlet.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] text-white/60 text-center">{outlet.name}</span>
                <span className="text-[8px] text-white/30 uppercase">{outlet.region}</span>
                
                {/* Publishing indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-2 -right-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Live Stats */}
        <div className="flex items-center justify-center gap-8 pt-4 border-t border-white/10">
          <div className="text-center">
            <motion.div
              key={publishedCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: ACCENT_COLOR }}
            >
              {publishedCount}
            </motion.div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Articles Published</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {formatReach(reachCount)}
            </div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Estimated Reach</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-400">
              Live
            </div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Status</div>
          </div>
        </div>
      </div>

      {/* Today's Coverage Timeline */}
      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-white/60">Today's Coverage Timeline</span>
          <span className="text-xs text-white/40">Jan 15, 2026</span>
        </div>
        
        <div className="space-y-2">
          {newsHeadlines.slice(0, 4).map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span className="text-[10px] text-purple-400 w-20">{news.outlet}</span>
              <span className="text-xs text-white/80 flex-1 truncate">{news.title}</span>
              <span className="text-[10px] text-white/30">{news.time}</span>
              <ArrowRight className="w-3 h-3 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PRService = () => {
  usePageMeta({
    title: "Korea Web3 PR Agency & Crypto Media Strategy",
    description: "Secure top-tier coverage in Korea's leading crypto media. We specialize in localized PR, press releases, and strategic narratives for global Web3 projects.",
    path: "/services/pr",
    image: "/og-image.png"
  });

  return (
    <ServicePageLayout 
      serviceName="PR & Media Relations" 
      serviceTitle="PR &" 
      serviceSubtitle="Media" 
      serviceDescription="Secure premium coverage across Korean media outlets with our established network of 20+ publishers and journalists." 
      serviceIcon={Newspaper} 
      serviceTags={serviceTags} 
      stats={stats} 
      accentColor={ACCENT_COLOR} 
      videoSrc="/videos/pr-hero.mp4" 
      posterSrc="/images/posters/pr-hero.jpg" 
      processSteps={processSteps} 
      deliverables={deliverables} 
      faqItems={faqItems} 
      currentSlug="pr"
    >
      {/* Live News Distribution Section */}
      <section className="scroll-reveal bg-[#0F0F0F] relative overflow-hidden">
        {/* Background glow effect */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ACCENT_COLOR} 0%, transparent 70%)` }}
        />
        
        <div className="border-t border-white/10 relative z-10">
          <SectionHeader title="Media Network" badge="Live Distribution" />
          
          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <div className="max-w-4xl mx-auto">
                <LiveNewsDistribution />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Partners Marquee */}
      <MediaPartnersSection />
      
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Crypto PR & Media"
        description="Secure premium coverage across 20+ Korean crypto media outlets including Blockmedia, Coinness, and TokenPost. Korean Web3 marketing through strategic PR."
        url="/services/pr"
        serviceType={["PR & Media", "Press Release", "Media Outreach", "Crisis Management"]}
      />
    </ServicePageLayout>
  );
};

export default PRService;