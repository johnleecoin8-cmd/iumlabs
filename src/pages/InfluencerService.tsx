import { Star, Users, TrendingUp, Target, Sparkles } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

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
  { value: 70, label: "Elite KOL Network", suffix: "+" },
  { value: 15, label: "Total Combined Reach", suffix: "M+" },
  { value: 15, label: "Successful Campaigns", suffix: "+" },
  { value: 4, label: "Average Engagement Rate", suffix: "x" },
];

const processSteps: ProcessStep[] = [
  { 
    number: "01", 
    title: "Discovery", 
    description: "We find the KOLs who speak your language and share your audience.", 
    icon: Target 
  },
  { 
    number: "02", 
    title: "Outreach", 
    description: "We handle the negotiations and align everyone on the mission.", 
    icon: Users 
  },
  { 
    number: "03", 
    title: "Activation", 
    description: "Content goes live across X, YouTube, and Telegram with real-time monitoring.", 
    icon: TrendingUp 
  },
  { 
    number: "04", 
    title: "Amplification", 
    description: "We analyze the wins and optimize for maximum lasting impact.", 
    icon: Sparkles 
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Smart Selection",
    items: [
      "The Shortlist: We don't just send a list; we curate a selection of KOLs who actually fit your project's vibe",
      "Vibe Check: We verify engagement rates and audience quality to make sure you're not paying for bots",
    ],
  },
  {
    title: "Full Management",
    items: [
      "Narrative Shaping: We help craft the messaging so the content feels organic, not like a scripted ad",
      "Coordination: We handle the outreach, the brief, and the posting schedule so you don't have to manage 20 different DM threads",
    ],
  },
  {
    title: "Data & Analytics",
    items: [
      "Performance Reports: See exactly how your campaign performed with clear ROI and engagement data",
      "Scaling Tips: We tell you which creators worked best and how to double down for the next round",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you have a specialized Korean KOL network?",
    answer: "Yes. Beyond the global names, we have deep ties with Korea's top crypto YouTubers, Telegram alpha callers, and Naver bloggers who dominate the local scene.",
  },
  {
    question: "What's the budget for a KOL campaign?",
    answer: "It varies. We can run anything from a targeted 'micro-KOL' blitz to a massive campaign with top-tier influencers. We'll help you build a plan that fits your goals.",
  },
  {
    question: "How do you measure success?",
    answer: "We look at more than just likes. We track reach, engagement quality, and sentiment to make sure people are actually talking about your project in a positive way.",
  },
  {
    question: "Is the content organic?",
    answer: "We prioritize authenticity. We work with KOLs who actually like your tech, so their threads and videos feel like a natural part of the conversation.",
  },
];

// KOL data
const kolProfiles = [
  { name: "Pentoshi", handle: "@Pentosh1", followers: "610K", expertise: "Trading" },
  { name: "Hsaka", handle: "@HsakaTrades", followers: "450K", expertise: "TA" },
  { name: "Daan Crypto", handle: "@DaanCrypto", followers: "380K", expertise: "Trading" },
  { name: "ColdBloodShill", handle: "@ColdBloodShill", followers: "310K", expertise: "TA" },
  { name: "Tetranode", handle: "@Tetranode", followers: "310K", expertise: "DeFi" },
  { name: "Route 2 FI", handle: "@Route2FI", followers: "280K", expertise: "DeFi" },
  { name: "Cobie", handle: "@coaborting", followers: "740K", expertise: "Commentary" },
  { name: "Bluntz", handle: "@Bluntz_Capital", followers: "290K", expertise: "TA" },
  { name: "Crypto Birb", handle: "@crypto_birb", followers: "710K", expertise: "TA" },
  { name: "Tyler", handle: "@ApeDurden", followers: "185K", expertise: "Trading" },
  { name: "Kaleo", handle: "@CryptoKaleo", followers: "580K", expertise: "Trading" },
  { name: "SmartContracter", handle: "@SmartContracter", followers: "250K", expertise: "TA" },
  { name: "Loomdart", handle: "@loomdart", followers: "180K", expertise: "DeFi" },
  { name: "Ansem", handle: "@blaborance", followers: "520K", expertise: "Memecoins" },
  { name: "Crypto Tony", handle: "@CryptoTony__", followers: "410K", expertise: "TA" },
  { name: "The DeFi Edge", handle: "@thedefiedge", followers: "390K", expertise: "DeFi" },
  { name: "Miles Deutscher", handle: "@milesdeutscher", followers: "560K", expertise: "Research" },
  { name: "Crypto Rover", handle: "@rovercrc", followers: "480K", expertise: "News" },
];

// Extra faded KOLs to show there's more
const fadedKolProfiles = [
  { name: "Crypto Rand", handle: "@crypto_rand", followers: "620K", expertise: "Trading" },
  { name: "Lark Davis", handle: "@TheCryptoLark", followers: "510K", expertise: "Education" },
  { name: "Jacob Bury", handle: "@JacobCryptoBury", followers: "170K", expertise: "Research" },
  { name: "Crypto Banter", handle: "@cryptobanter", followers: "680K", expertise: "News" },
  { name: "DeFi Dad", handle: "@DeFi_Dad", followers: "140K", expertise: "DeFi" },
  { name: "Crypto Wendy", handle: "@CryptoWendyO", followers: "320K", expertise: "Education" },
];

const InfluencerService = () => {
  usePageMeta({
    title: "Korea Crypto KOL Marketing & Web3 Influencer Agency",
    description: "Access top Korea Crypto KOLs and Web3 influencers. Our data-driven campaign management ensures high-impact marketing for DeFi, GameFi, and L2 projects.",
    path: "/services/influencer",
    image: "/og-image.png"
  });
  
  return (
    <ServicePageLayout
      serviceName="Influencer/KOL"
      serviceTitle="Influencer &"
      serviceSubtitle="KOL Network"
      serviceDescription="Get the right eyes on your project. We connect you with our hand-picked network of 70+ elite crypto KOLs, reaching over 15M+ followers across X, YouTube, and Telegram. We don't just 'shill'—we build narratives."
      serviceIcon={Star}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/influencer-hero.mp4"
      posterSrc="/images/posters/influencer-hero.jpg"
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="influencer"
    >
      {/* KOL Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="Featured Creators" badge="Global & Local Legends" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-4">
            <p className="text-white/60 text-sm max-w-3xl">
              From global giants like Pentoshi, Cobie, and Miles Deutscher to the most influential voices in the Korean market, we provide direct access to the creators who move the needle.
            </p>
          </div>

          <div className="py-6 md:py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {kolProfiles.map((kol) => (
                  <a
                    key={kol.handle}
                    href={`https://x.com/${kol.handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-amber-500/50 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    {/* Avatar */}
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-amber-400/50 transition-colors">
                      <img 
                        src={`https://unavatar.io/twitter/${kol.handle.replace('@', '')}`}
                        alt={kol.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=1a1a1a`;
                        }}
                      />
                    </div>
                    
                    {/* Name */}
                    <div className="text-white text-sm font-medium truncate mb-0.5">
                      {kol.name}
                    </div>
                    
                    {/* Handle */}
                    <div className="text-amber-400 text-xs truncate mb-1">
                      {kol.handle}
                    </div>
                    
                    {/* Followers */}
                    <div className="text-white/60 text-sm mb-2">
                      {kol.followers}
                    </div>
                    
                    {/* Expertise Tag */}
                    <div className="inline-block px-2.5 py-1 rounded-full text-[10px] font-medium border border-amber-500/30 text-amber-400">
                      {kol.expertise}
                    </div>
                  </a>
                ))}
              </div>
              
              {/* Faded row to show more KOLs */}
              <div className="relative mt-4">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F0F0F] z-10 pointer-events-none" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 opacity-30">
                  {fadedKolProfiles.map((kol) => (
                    <div
                      key={kol.handle}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white/20">
                        <img 
                          src={`https://unavatar.io/twitter/${kol.handle.replace('@', '')}`}
                          alt={kol.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=1a1a1a`;
                          }}
                        />
                      </div>
                      <div className="text-white text-sm font-medium truncate mb-0.5">
                        {kol.name}
                      </div>
                      <div className="text-amber-400 text-xs truncate mb-1">
                        {kol.handle}
                      </div>
                      <div className="text-white/60 text-sm mb-2">
                        {kol.followers}
                      </div>
                      <div className="inline-block px-2.5 py-1 rounded-full text-[10px] font-medium border border-amber-500/30 text-amber-400">
                        {kol.expertise}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* "And more" text */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="text-white/40 text-sm">+50 more in our network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Crypto KOL Marketing"
        description="Access 70+ Korean and global crypto KOLs with 15M+ total reach. Korean Web3 marketing through strategic influencer campaigns."
        url="/services/influencer"
        serviceType={["KOL Marketing", "Influencer Marketing", "Crypto Marketing", "Web3 Marketing"]}
      />
    </ServicePageLayout>
  );
};

export default InfluencerService;