import { useEffect, useState } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";
import ServicePageLayout, { 
  ServiceTag, 
  ServiceStat, 
  ProcessStep,
  Deliverable,
  FAQItem
} from "@/components/ServicePageLayout";
import { motion } from "framer-motion";
import { FileText, BarChart3, TrendingUp, Users, Newspaper, Share2, Search, PenTool, Send } from "lucide-react";

const ACCENT_COLOR = "#06B6D4";

const serviceTags: ServiceTag[] = [
  { label: "Market Analysis" },
  { label: "Competitor Research" },
  { label: "Trend Reports" },
  { label: "Investment Thesis" },
  { label: "Media Distribution" },
  { label: "KOL Amplification" },
];

const stats: ServiceStat[] = [
  { value: 100, label: "Research Reports Published", suffix: "+" },
  { value: 50, label: "Media Partners", suffix: "+" },
  { value: 5, label: "Avg Media Coverage", suffix: "M+" },
  { value: 200, label: "KOL Network Reach", suffix: "K+" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "We understand your project, target audience, and research objectives to define the scope and key focus areas.",
    icon: Search
  },
  {
    number: "02",
    title: "Research & Analysis",
    description: "Our analysts conduct in-depth market research, competitor analysis, and data gathering tailored for the Korean crypto market.",
    icon: BarChart3
  },
  {
    number: "03",
    title: "Report Creation",
    description: "We compile findings into comprehensive, visually appealing reports in both Korean and English.",
    icon: PenTool
  },
  {
    number: "04",
    title: "Distribution",
    description: "We distribute your research through our media network and KOL partners to maximize reach and establish brand authority.",
    icon: Send
  }
];

const deliverables: Deliverable[] = [
  {
    title: "Research Outputs",
    items: [
      "Market sizing & opportunity report",
      "Competitor analysis deck",
      "Token economics review",
      "Korean market entry thesis",
      "User behavior insights"
    ]
  },
  {
    title: "Distribution Package",
    items: [
      "Korean media placement (5-10 outlets)",
      "KOL review threads (3-5 KOLs)",
      "Community summary posts",
      "Executive briefing deck",
      "Social media snippets"
    ]
  },
  {
    title: "Ongoing Support",
    items: [
      "Monthly market updates",
      "Trend alert reports",
      "Strategy recommendations",
      "Media monitoring dashboard",
      "Quarterly deep dives"
    ]
  }
];

const faqItems: FAQItem[] = [
  {
    question: "What types of research do you provide?",
    answer: "We offer comprehensive research services including market sizing reports, competitor analysis, token economics reviews, user behavior studies, and Korean market entry strategies. Each report is tailored to your project's specific needs and objectives."
  },
  {
    question: "How do you distribute the research?",
    answer: "We leverage our network of 50+ Korean media partners (Block Media, Tokenpost, CoinDesk Korea, etc.) and 200+ KOL connections. Research is published as articles, Twitter threads, and community posts to maximize reach and credibility."
  },
  {
    question: "Can you write research in Korean?",
    answer: "Absolutely. All our research is produced in both Korean and English by native speakers who understand the crypto market. This ensures cultural relevance and maximum impact in the Korean market."
  },
  {
    question: "How long does a research report take?",
    answer: "A standard research report takes 2-3 weeks from kickoff to delivery. Complex reports with extensive data analysis may take 4-6 weeks. Distribution and amplification typically runs for 2-4 weeks following report completion."
  },
  {
    question: "What makes your research different?",
    answer: "Our research combines on-chain data analysis with local market insights that only a Korea-based team can provide. We don't just deliver reports—we ensure they reach the right audience through our established media and KOL network."
  }
];

const researchTopics = [
  {
    icon: BarChart3,
    title: "Market Analysis",
    description: "Korean crypto market sizing, trends, and opportunities",
    stats: "50+ reports"
  },
  {
    icon: TrendingUp,
    title: "Investment Thesis",
    description: "Deep dives into tokenomics, fundamentals, and growth potential",
    stats: "30+ projects"
  },
  {
    icon: Users,
    title: "User Research",
    description: "Korean user behavior, preferences, and adoption patterns",
    stats: "100K+ data points"
  }
];

const distributionChannels = [
  { name: "Block Media", type: "Media" },
  { name: "Tokenpost", type: "Media" },
  { name: "CoinDesk Korea", type: "Media" },
  { name: "Top KOLs", type: "KOL Network" },
  { name: "Crypto Communities", type: "Community" },
  { name: "Telegram Groups", type: "Community" }
];

const DeepResearchService = () => {
  usePageTitle("Deep Research");
  const [activeChannel, setActiveChannel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChannel((prev) => (prev + 1) % distributionChannels.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ServicePageLayout
      serviceName="Deep Research"
      serviceTitle="Deep Research"
      serviceSubtitle="& Distribution"
      serviceDescription="Data-driven market research tailored for the Korean crypto market, distributed through our media and KOL network to establish your brand authority."
      serviceIcon={FileText}
      serviceTags={serviceTags}
      stats={stats}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      accentColor={ACCENT_COLOR}
      currentSlug="deep-research"
    >
      {/* Research Showcase Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span 
              className="text-sm font-medium tracking-wider uppercase mb-4 block"
              style={{ color: ACCENT_COLOR }}
            >
              What We Analyze
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Research That Drives Results
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From market sizing to user behavior, we deliver actionable insights 
              that position your project for success in the Korean market.
            </p>
          </motion.div>

          {/* Research Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {researchTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-[#06B6D4]/50 transition-all duration-300"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${ACCENT_COLOR}20` }}
                >
                  <topic.icon className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{topic.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                <span 
                  className="text-xs font-medium"
                  style={{ color: ACCENT_COLOR }}
                >
                  {topic.stats}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Distribution Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Research Icon */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${ACCENT_COLOR}20` }}
                >
                  <FileText className="w-8 h-8" style={{ color: ACCENT_COLOR }} />
                </div>
                <span className="text-sm font-medium text-foreground">Research</span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-24 h-0.5 bg-gradient-to-r from-[#06B6D4] to-[#06B6D4]/30" />
                <Share2 className="w-5 h-5 mx-2" style={{ color: ACCENT_COLOR }} />
                <div className="w-24 h-0.5 bg-gradient-to-r from-[#06B6D4]/30 to-[#06B6D4]" />
              </div>

              {/* Distribution Channels */}
              <div className="flex-1 max-w-md">
                <div className="text-center mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Distributed Through
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {distributionChannels.map((channel, index) => (
                    <motion.div
                      key={channel.name}
                      animate={{
                        scale: activeChannel === index ? 1.05 : 1,
                        borderColor: activeChannel === index ? ACCENT_COLOR : 'transparent'
                      }}
                      className="p-3 rounded-xl border-2 bg-background/50 text-center transition-all"
                    >
                      <span className="text-xs font-medium text-foreground block">
                        {channel.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {channel.type}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-24 h-0.5 bg-gradient-to-r from-[#06B6D4] to-[#06B6D4]/30" />
                <Newspaper className="w-5 h-5 mx-2" style={{ color: ACCENT_COLOR }} />
                <div className="w-24 h-0.5 bg-gradient-to-r from-[#06B6D4]/30 to-[#06B6D4]" />
              </div>

              {/* Result */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${ACCENT_COLOR}20` }}
                >
                  <TrendingUp className="w-8 h-8" style={{ color: ACCENT_COLOR }} />
                </div>
                <span className="text-sm font-medium text-foreground">Brand Authority</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default DeepResearchService;
