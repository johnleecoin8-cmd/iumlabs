import { useEffect, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ServicePageLayout, { ServiceTag, ServiceStat, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { FileText, BarChart3, TrendingUp, Users, Newspaper, Share2, Search, PenTool, Send, ArrowRight, BookOpen, Mic2, Globe } from "lucide-react";
const ACCENT_COLOR = "#06B6D4";
const breadcrumbItems = [{
  name: "Home",
  url: "https://iumlabs.io"
}, {
  name: "Services",
  url: "https://iumlabs.io/services"
}, {
  name: "Deep Research",
  url: "https://iumlabs.io/services/deep-research"
}];
const serviceTags: ServiceTag[] = [{
  label: "Market Analysis"
}, {
  label: "Competitor Research"
}, {
  label: "Trend Reports"
}, {
  label: "Investment Thesis"
}, {
  label: "Media Distribution"
}, {
  label: "KOL Amplification"
}];
const stats: ServiceStat[] = [{
  value: 25,
  label: "Research Reports Published",
  suffix: "+"
}, {
  value: 15,
  label: "Distribution Partners",
  suffix: "+"
}, {
  value: 2,
  label: "Avg Coverage Reach",
  suffix: "M+"
}, {
  value: 100,
  label: "KOL Network Reach",
  suffix: "K+"
}];
const processSteps: ProcessStep[] = [{
  number: "01",
  title: "Discovery",
  description: "We understand your project, target audience, and research objectives to define the scope and key focus areas.",
  icon: Search
}, {
  number: "02",
  title: "Research & Analysis",
  description: "Our analysts conduct in-depth market research, competitor analysis, and data gathering tailored for the Korean crypto market.",
  icon: BarChart3
}, {
  number: "03",
  title: "Report Creation",
  description: "We compile findings into comprehensive, visually appealing reports in both Korean and English.",
  icon: PenTool
}, {
  number: "04",
  title: "Distribution",
  description: "We distribute your research through our media network and KOL partners to maximize reach and establish brand authority.",
  icon: Send
}];
const deliverables: Deliverable[] = [{
  title: "Research Outputs",
  items: ["Market sizing & opportunity report", "Competitor analysis deck", "Token economics review", "Korean market entry thesis", "User behavior insights"]
}, {
  title: "Distribution Package",
  items: ["Korean media placement", "KOL review threads", "Blog articles & posts", "Executive briefing deck", "Social media snippets"]
}, {
  title: "Ongoing Support",
  items: ["Monthly market updates", "Trend alert reports", "Strategy recommendations", "Performance tracking", "Quarterly deep dives"]
}];
const faqItems: FAQItem[] = [{
  question: "What types of research do you provide?",
  answer: "We offer comprehensive research services including market sizing reports, competitor analysis, token economics reviews, user behavior studies, and Korean market entry strategies. Each report is tailored to your specific needs."
}, {
  question: "How do you distribute the research?",
  answer: "We leverage our network of media partners, blog platforms, and KOL connections. Research is published as articles, review threads, and community posts to maximize reach and credibility in the Korean market."
}, {
  question: "Can you write research in Korean?",
  answer: "Absolutely. All our research is produced in both Korean and English by native speakers who understand the crypto market. This ensures cultural relevance and maximum impact in the Korean market."
}, {
  question: "How long does a research report take?",
  answer: "A standard research report takes 2-3 weeks from kickoff to delivery. Complex reports with extensive data analysis may take 4-6 weeks. Distribution typically runs for 2-4 weeks following report completion."
}, {
  question: "What makes your research different?",
  answer: "Our research combines on-chain data analysis with local market insights that only a Korea-based team can provide. We ensure research reaches the right audience through our established distribution network."
}];
const researchTopics = [{
  icon: BarChart3,
  title: "Market Analysis",
  description: "Korean crypto market sizing, trends, and opportunities",
  stats: "25+ reports"
}, {
  icon: TrendingUp,
  title: "Investment Thesis",
  description: "Deep dives into tokenomics, fundamentals, and growth potential",
  stats: "12+ projects"
}, {
  icon: Users,
  title: "User Research",
  description: "Korean user behavior, preferences, and adoption patterns",
  stats: "50K+ data points"
}];
const distributionChannels = [{
  name: "KOL Networks",
  icon: Mic2
}, {
  name: "Blog Platforms",
  icon: BookOpen
}, {
  name: "Media Outlets",
  icon: Globe
}];
const DeepResearchService = () => {
  usePageMeta("Korean Crypto Market Research", "Data-driven market research for the Korean crypto market. Korean Web3 marketing insights distributed through media and KOL networks.", "/services/deep-research");
  const [activeChannel, setActiveChannel] = useState(0);

  // Fetch latest research posts
  const {
    data: researchPosts
  } = useQuery({
    queryKey: ['research-posts-preview'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('research_posts').select('id, title, slug, excerpt, image, category, date, read_time').eq('is_published', true).order('date', {
        ascending: false
      }).limit(3);
      if (error) throw error;
      return data;
    }
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChannel(prev => (prev + 1) % distributionChannels.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return <ServicePageLayout serviceName="Deep Research" serviceTitle="Deep Research" serviceSubtitle="& Distribution" serviceDescription="Data-driven market research tailored for the Korean crypto market, distributed through our media and KOL network to establish your brand authority." serviceIcon={FileText} serviceTags={serviceTags} stats={stats} processSteps={processSteps} deliverables={deliverables} faqItems={faqItems} accentColor={ACCENT_COLOR} currentSlug="deep-research">
      {/* Research Showcase Section */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-10">
            <span className="text-xs font-medium tracking-wider uppercase mb-3 block" style={{
            color: ACCENT_COLOR
          }}>
              What We Analyze
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Research That Drives Results
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              From market sizing to user behavior, we deliver actionable insights 
              that position your project for success in the Korean market.
            </p>
          </div>

          {/* Research Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-12">
            {researchTopics.map(topic => <div key={topic.title} className="group relative p-4 sm:p-5 md:p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#06B6D4]/50 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4" style={{
              backgroundColor: `${ACCENT_COLOR}20`
            }}>
                  <topic.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{
                color: ACCENT_COLOR
              }} />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1.5">{topic.title}</h3>
                <p className="text-xs text-muted-foreground mb-2 sm:mb-3">{topic.description}</p>
                <span className="text-xs font-medium" style={{
              color: ACCENT_COLOR
            }}>
                  {topic.stats}
                </span>
              </div>)}
          </div>

          {/* Distribution Flow */}
          <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8">
              {/* Research Icon */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3" style={{
                backgroundColor: `${ACCENT_COLOR}20`
              }}>
                  <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" style={{
                  color: ACCENT_COLOR
                }} />
                </div>
                <span className="text-sm font-medium text-foreground">Research</span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4] to-[#06B6D4]/30" />
                <Share2 className="w-5 h-5 mx-2" style={{
                color: ACCENT_COLOR
              }} />
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4]/30 to-[#06B6D4]" />
              </div>

              {/* Distribution Channels */}
              <div className="flex-1 max-w-sm w-full">
                <div className="text-center mb-3 sm:mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Distributed Through
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {distributionChannels.map((channel, index) => {
                  const Icon = channel.icon;
                  return <div key={channel.name} className={`p-2.5 sm:p-4 rounded-lg sm:rounded-xl border-2 bg-background/50 text-center transition-all flex flex-col items-center gap-1.5 sm:gap-2 ${activeChannel === index ? 'scale-[1.08]' : ''}`} style={{
                    borderColor: activeChannel === index ? ACCENT_COLOR : 'rgba(255,255,255,0.1)'
                  }}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{
                      color: activeChannel === index ? ACCENT_COLOR : 'rgba(255,255,255,0.5)'
                    }} />
                        <span className="text-[10px] sm:text-xs font-medium text-foreground">
                          {channel.name}
                        </span>
                      </div>;
                })}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4] to-[#06B6D4]/30" />
                <Newspaper className="w-5 h-5 mx-2" style={{
                color: ACCENT_COLOR
              }} />
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4]/30 to-[#06B6D4]" />
              </div>

              {/* Result */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3" style={{
                backgroundColor: `${ACCENT_COLOR}20`
              }}>
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" style={{
                  color: ACCENT_COLOR
                }} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-foreground">Brand Authority</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Research Preview Section */}
      {researchPosts && researchPosts.length > 0}

      <BreadcrumbSchema items={breadcrumbItems} />
    </ServicePageLayout>;
};
export default DeepResearchService;