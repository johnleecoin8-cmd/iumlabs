import { useEffect, useState } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ServicePageLayout, { 
  ServiceTag, 
  ServiceStat, 
  ProcessStep,
  Deliverable,
  FAQItem
} from "@/components/ServicePageLayout";
import { motion } from "framer-motion";
import { FileText, BarChart3, TrendingUp, Users, Newspaper, Share2, Search, PenTool, Send, ArrowRight, BookOpen, Mic2, Globe, MessageSquare, CheckCircle2, Rocket, Clock } from "lucide-react";

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
  { value: 50, label: "Distribution Partners", suffix: "+" },
  { value: 5, label: "Avg Coverage Reach", suffix: "M+" },
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
      "Korean media placement",
      "KOL review threads",
      "Blog articles & posts",
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
      "Performance tracking",
      "Quarterly deep dives"
    ]
  }
];

const faqItems: FAQItem[] = [
  {
    question: "What types of research do you provide?",
    answer: "We offer comprehensive research services including market sizing reports, competitor analysis, token economics reviews, user behavior studies, and Korean market entry strategies. Each report is tailored to your specific needs."
  },
  {
    question: "How do you distribute the research?",
    answer: "We leverage our network of media partners, blog platforms, and KOL connections. Research is published as articles, review threads, and community posts to maximize reach and credibility in the Korean market."
  },
  {
    question: "Can you write research in Korean?",
    answer: "Absolutely. All our research is produced in both Korean and English by native speakers who understand the crypto market. This ensures cultural relevance and maximum impact in the Korean market."
  },
  {
    question: "How long does a research report take?",
    answer: "A standard research report takes 2-3 weeks from kickoff to delivery. Complex reports with extensive data analysis may take 4-6 weeks. Distribution typically runs for 2-4 weeks following report completion."
  },
  {
    question: "What makes your research different?",
    answer: "Our research combines on-chain data analysis with local market insights that only a Korea-based team can provide. We ensure research reaches the right audience through our established distribution network."
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
  { name: "KOL Networks", icon: Mic2 },
  { name: "Blog Platforms", icon: BookOpen },
  { name: "Media Outlets", icon: Globe }
];

// Timeline steps for research process
const timelineSteps = [
  {
    week: "Week 1",
    title: "Kickoff & Discovery",
    description: "Initial consultation, scope definition, and research planning",
    icon: MessageSquare,
    tasks: ["Project briefing", "Scope alignment", "Timeline confirmation"]
  },
  {
    week: "Week 2-3",
    title: "Deep Research",
    description: "Market analysis, data collection, and competitive research",
    icon: Search,
    tasks: ["Market sizing", "Competitor mapping", "Data analysis"]
  },
  {
    week: "Week 3-4",
    title: "Report Creation",
    description: "Drafting, design, and bilingual localization",
    icon: PenTool,
    tasks: ["Report drafting", "Visual design", "KR/EN localization"]
  },
  {
    week: "Week 4-5",
    title: "Review & Finalize",
    description: "Client review, revisions, and final approval",
    icon: CheckCircle2,
    tasks: ["Client review", "Revisions", "Final approval"]
  },
  {
    week: "Week 5-8",
    title: "Distribution",
    description: "Media placement, KOL outreach, and performance tracking",
    icon: Rocket,
    tasks: ["Media publishing", "KOL distribution", "Performance report"]
  }
];

const DeepResearchService = () => {
  usePageTitle("Deep Research");
  const [activeChannel, setActiveChannel] = useState(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  // Fetch latest research posts
  const { data: researchPosts } = useQuery({
    queryKey: ['research-posts-preview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_posts')
        .select('id, title, slug, excerpt, image, category, date, read_time')
        .eq('is_published', true)
        .order('date', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChannel((prev) => (prev + 1) % distributionChannels.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Timeline auto-progression
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimelineStep((prev) => (prev + 1) % timelineSteps.length);
    }, 3000);
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
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4] to-[#06B6D4]/30" />
                <Share2 className="w-5 h-5 mx-2" style={{ color: ACCENT_COLOR }} />
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4]/30 to-[#06B6D4]" />
              </div>

              {/* Distribution Channels */}
              <div className="flex-1 max-w-sm">
                <div className="text-center mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Distributed Through
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {distributionChannels.map((channel, index) => {
                    const Icon = channel.icon;
                    return (
                      <motion.div
                        key={channel.name}
                        animate={{
                          scale: activeChannel === index ? 1.08 : 1,
                          borderColor: activeChannel === index ? ACCENT_COLOR : 'rgba(255,255,255,0.1)'
                        }}
                        className="p-4 rounded-xl border-2 bg-background/50 text-center transition-all flex flex-col items-center gap-2"
                      >
                        <Icon 
                          className="w-5 h-5" 
                          style={{ color: activeChannel === index ? ACCENT_COLOR : 'rgba(255,255,255,0.5)' }} 
                        />
                        <span className="text-xs font-medium text-foreground">
                          {channel.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4] to-[#06B6D4]/30" />
                <Newspaper className="w-5 h-5 mx-2" style={{ color: ACCENT_COLOR }} />
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#06B6D4]/30 to-[#06B6D4]" />
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

      {/* Timeline Process Section */}
      <section className="py-20 relative bg-[#0F0F0F] overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06B6D4]/5 to-transparent" />
        
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
              Timeline
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              From Request to Distribution
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A typical research engagement spans 5-8 weeks, from initial discovery to full market distribution.
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Timeline Line */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-border/30 rounded-full">
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: ACCENT_COLOR }}
                initial={{ width: "0%" }}
                animate={{ width: `${((activeTimelineStep + 1) / timelineSteps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Timeline Steps */}
            <div className="grid grid-cols-5 gap-4">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === activeTimelineStep;
                const isPast = index < activeTimelineStep;
                
                return (
                  <motion.div
                    key={step.title}
                    className="relative pt-16 cursor-pointer"
                    onClick={() => setActiveTimelineStep(index)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Node */}
                    <motion.div 
                      className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300"
                      style={{ 
                        backgroundColor: isActive || isPast ? ACCENT_COLOR : '#1a1a1a',
                        borderColor: isActive || isPast ? ACCENT_COLOR : 'rgba(255,255,255,0.1)'
                      }}
                      animate={{ 
                        scale: isActive ? 1.2 : 1,
                        boxShadow: isActive ? `0 0 30px ${ACCENT_COLOR}50` : 'none'
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isActive || isPast ? '#fff' : 'rgba(255,255,255,0.4)' }} />
                    </motion.div>

                    {/* Content */}
                    <motion.div 
                      className="text-center p-4 rounded-xl transition-all duration-300"
                      animate={{ 
                        backgroundColor: isActive ? 'rgba(6,182,212,0.1)' : 'transparent',
                        scale: isActive ? 1.02 : 1
                      }}
                    >
                      <span 
                        className="text-xs font-medium tracking-wider uppercase mb-2 block"
                        style={{ color: isActive ? ACCENT_COLOR : 'rgba(255,255,255,0.4)' }}
                      >
                        {step.week}
                      </span>
                      <h3 
                        className="text-sm font-semibold mb-2 transition-colors"
                        style={{ color: isActive || isPast ? '#fff' : 'rgba(255,255,255,0.6)' }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {step.description}
                      </p>
                      
                      {/* Tasks - Only show for active step */}
                      <motion.div 
                        className="mt-3 space-y-1 overflow-hidden"
                        initial={false}
                        animate={{ 
                          height: isActive ? 'auto' : 0,
                          opacity: isActive ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.tasks.map((task, idx) => (
                          <motion.div 
                            key={task}
                            className="flex items-center justify-center gap-1 text-xs"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <CheckCircle2 className="w-3 h-3" style={{ color: ACCENT_COLOR }} />
                            <span className="text-foreground/80">{task}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-4">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeTimelineStep;
              const isPast = index < activeTimelineStep;
              
              return (
                <motion.div
                  key={step.title}
                  className="relative flex gap-4 cursor-pointer"
                  onClick={() => setActiveTimelineStep(index)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Left line */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0"
                      style={{ 
                        backgroundColor: isActive || isPast ? ACCENT_COLOR : '#1a1a1a',
                        borderColor: isActive || isPast ? ACCENT_COLOR : 'rgba(255,255,255,0.1)'
                      }}
                      animate={{ 
                        scale: isActive ? 1.1 : 1,
                        boxShadow: isActive ? `0 0 20px ${ACCENT_COLOR}40` : 'none'
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: isActive || isPast ? '#fff' : 'rgba(255,255,255,0.4)' }} />
                    </motion.div>
                    {index < timelineSteps.length - 1 && (
                      <div 
                        className="w-0.5 flex-1 my-2"
                        style={{ backgroundColor: isPast ? ACCENT_COLOR : 'rgba(255,255,255,0.1)' }}
                      />
                    )}
                  </div>
                  
                  {/* Content */}
                  <motion.div 
                    className="flex-1 pb-6 p-4 rounded-xl transition-all"
                    animate={{ 
                      backgroundColor: isActive ? 'rgba(6,182,212,0.1)' : 'transparent'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: isActive ? `${ACCENT_COLOR}30` : 'rgba(255,255,255,0.05)',
                          color: isActive ? ACCENT_COLOR : 'rgba(255,255,255,0.5)'
                        }}
                      >
                        {step.week}
                      </span>
                    </div>
                    <h3 
                      className="text-base font-semibold mb-1"
                      style={{ color: isActive || isPast ? '#fff' : 'rgba(255,255,255,0.6)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    
                    {/* Tasks */}
                    <motion.div 
                      className="space-y-1 overflow-hidden"
                      initial={false}
                      animate={{ 
                        height: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0
                      }}
                    >
                      {step.tasks.map((task, idx) => (
                        <div key={task} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3 h-3" style={{ color: ACCENT_COLOR }} />
                          <span className="text-foreground/80">{task}</span>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Total Duration Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border"
              style={{ borderColor: `${ACCENT_COLOR}30`, backgroundColor: `${ACCENT_COLOR}10` }}
            >
              <Clock className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
              <span className="text-sm font-medium text-foreground">
                Total Duration: <span style={{ color: ACCENT_COLOR }}>5-8 Weeks</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {researchPosts && researchPosts.length > 0 && (
        <section className="py-20 relative bg-[#0A0A0A]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
            >
              <div>
                <span 
                  className="text-sm font-medium tracking-wider uppercase mb-4 block"
                  style={{ color: ACCENT_COLOR }}
                >
                  Sample Work
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Latest Research
                </h2>
              </div>
              <Link 
                to="/research"
                className="group inline-flex items-center gap-2 mt-4 md:mt-0 text-sm font-medium transition-colors hover:text-[#06B6D4]"
                style={{ color: ACCENT_COLOR }}
              >
                View All Research
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/research/${post.slug}`}
                    className="group block h-full rounded-2xl border border-border/50 bg-card/30 overflow-hidden hover:border-[#06B6D4]/50 transition-all duration-300"
                  >
                    {/* Image */}
                    {post.image && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-6">
                      {post.category && (
                        <span 
                          className="inline-block text-xs font-medium px-2 py-1 rounded-full mb-3"
                          style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                        >
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-[#06B6D4] transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {post.date && <span>{post.date}</span>}
                        {post.read_time && <span>{post.read_time}</span>}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </ServicePageLayout>
  );
};

export default DeepResearchService;
