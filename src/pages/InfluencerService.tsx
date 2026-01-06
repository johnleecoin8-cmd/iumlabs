import { Star, Users, TrendingUp, Target, Sparkles } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const ACCENT_COLOR = "#F59E0B";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "Influencer Marketing", url: "https://iumlabs.io/services/influencer" }
];

const serviceTags: ServiceTag[] = [
  { label: "Global KOL" },
  { label: "Korean KOL" },
  { label: "Campaign Strategy" },
  { label: "Content Coordination" },
  { label: "Performance Tracking" },
  { label: "Korean YouTubers/Bloggers" },
];

const stats: ServiceStat[] = [
  { value: 70, label: "KOL Network", suffix: "+" },
  { value: 15, label: "Total Reach", suffix: "M+" },
  { value: 15, label: "Campaigns Delivered", suffix: "+" },
  { value: 4, label: "Avg Engagement", suffix: "x" },
];

const processSteps: ProcessStep[] = [
  { 
    number: "01", 
    title: "Discovery", 
    description: "Identify ideal KOL profiles matching your project's narrative and target audience.", 
    icon: Target 
  },
  { 
    number: "02", 
    title: "Outreach", 
    description: "Negotiate terms, align on messaging, and coordinate campaign timelines.", 
    icon: Users 
  },
  { 
    number: "03", 
    title: "Activation", 
    description: "Launch coordinated content across platforms with real-time monitoring.", 
    icon: TrendingUp 
  },
  { 
    number: "04", 
    title: "Amplification", 
    description: "Analyze performance and optimize for maximum reach and engagement.", 
    icon: Sparkles 
  },
];

const deliverables: Deliverable[] = [
  {
    title: "KOL Selection",
    items: [
      "Curated KOL shortlist",
      "Audience analysis report",
      "Engagement rate verification",
      "Brand fit assessment",
    ],
  },
  {
    title: "Campaign Management",
    items: [
      "Messaging & brief creation",
      "Content approval workflow",
      "Posting schedule coordination",
      "Real-time monitoring",
    ],
  },
  {
    title: "Reporting & Analytics",
    items: [
      "Campaign performance report",
      "ROI analysis",
      "Audience insights",
      "Recommendations for scale",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you have a Korean KOL network?",
    answer: "Yes, we have a network of 50+ Korean crypto KOLs specializing in DeFi, NFT, trading, and research. We also connect you with bilingual Korean/English KOLs.",
  },
  {
    question: "Do you work with Korean YouTubers and bloggers?",
    answer: "Absolutely. We have an influencer network on Korean local platforms including Naver Blog, YouTube crypto channels, and Tistory. This enables effective content distribution for Korean SEO.",
  },
  {
    question: "What's the typical KOL campaign budget?",
    answer: "Budgets vary by KOL tier and campaign scope. Micro-influencer campaigns start from $5K, while multi-KOL launches can range $100K+. We recommend optimal combinations based on your goals.",
  },
  {
    question: "How do you measure campaign performance?",
    answer: "We track impressions, engagement rate, follower growth, website traffic, and community signups. For token projects, we also correlate with on-chain metrics like holder growth.",
  },
];

const kolProfiles = [
  // Global KOLs
  { name: "Pentoshi", handle: "@Pentosh1", followers: "610K", expertise: "Trading" },
  { name: "Hsaka", handle: "@HsakaTrades", followers: "450K", expertise: "TA" },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", expertise: "DeFi" },
  { name: "Daan Crypto", handle: "@DaanCrypto", followers: "380K", expertise: "Trading" },
  { name: "ColdBloodShill", handle: "@ColdBloodShill", followers: "310K", expertise: "TA" },
  { name: "Tetranode", handle: "@Tetranode", followers: "310K", expertise: "DeFi" },
  // Korean KOLs
  { name: "CryptoQuant", handle: "@cryptoquant_com", followers: "280K", expertise: "On-chain Analysis" },
  { name: "Phyrex", handle: "@Phyrex_Ni", followers: "333K", expertise: "Data Analysis" },
  { name: "Hebi", handle: "@hebi555", followers: "377K", expertise: "Trading" },
  { name: "KuiGas", handle: "@KuiGas", followers: "96K", expertise: "Research" },
  { name: "Coinboy", handle: "@coinboy717", followers: "50K", expertise: "Trading" },
  { name: "Nakju", handle: "@nakjumon", followers: "18.7K", expertise: "Trading" },
];

const InfluencerService = () => {
  usePageMeta(
    "Korean Crypto KOL Marketing",
    "Access 70+ Korean and global crypto KOLs with 15M+ total reach. Korean Web3 marketing through strategic influencer campaigns.",
    "/services/influencer"
  );
  
  return (
    <ServicePageLayout
      serviceName="Influencer/KOL"
      serviceTitle="Access Our"
      serviceSubtitle="KOL Network"
      serviceDescription="Access our exclusive network of 70+ crypto KOLs and reach 15M+ engaged followers across X, YouTube, and Telegram."
      serviceIcon={Star}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="influencer"
    >
      {/* KOL Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="KOL Network" badge="Featured Creators" />

          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              {/* KOL Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {kolProfiles.map((kol, index) => (
                  <a
                    key={index}
                    href={`https://x.com/${kol.handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group cursor-pointer block hover:border-amber-500/50 transition-all hover:scale-[1.02]"
                  >
                    {/* Avatar */}
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-amber-400 transition-colors">
                      <img 
                        src={`https://unavatar.io/twitter/${kol.handle.replace('@', '')}`}
                        alt={kol.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=1a1a1a`;
                        }}
                      />
                    </div>

                    <div className="text-sm font-medium text-center mb-0.5">{kol.name}</div>
                    <div className="text-[10px] text-amber-400 text-center mb-1">{kol.handle}</div>
                    <div className="text-xs text-white/60 text-center mb-2">{kol.followers} followers</div>
                    
                    <div 
                      className="text-[9px] px-2 py-1 rounded-full text-center mx-auto w-fit"
                      style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                    >
                      {kol.expertise}
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-center text-white/40 text-sm mt-8">
                Click to view on 𝕏 · These are a sample of our network
              </p>
            </div>
          </div>
        </div>
      </section>

      <BreadcrumbSchema items={breadcrumbItems} />
    </ServicePageLayout>
  );
};

export default InfluencerService;