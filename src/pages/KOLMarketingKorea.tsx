import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Youtube, MessageCircle, Star, TrendingUp, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import ContactFormSection from "@/components/ContactFormSection";
import SEOHead from "@/components/SEOHead";
import CalendlyButton from "@/components/CalendlyButton";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stats = [
  { value: "170+", label: "Vetted KOLs" },
  { value: "4", label: "Platforms" },
  { value: "19+", label: "Campaigns" },
  { value: "100%", label: "ROI Tracked" },
];

const platforms = [
  {
    icon: Youtube,
    title: "YouTube",
    description: "50+ crypto YouTubers delivering long-form reviews, tutorials, and project deep-dives to Korea's most engaged crypto audience.",
  },
  {
    icon: Target,
    title: "Twitter / X",
    description: "Real-time narrative amplification through thread campaigns, quote tweets, and coordinated posting strategies with top Korean CT accounts.",
  },
  {
    icon: MessageCircle,
    title: "Telegram",
    description: "Community leaders, AMA hosts, and group admins who run Korea's most active crypto Telegram groups with 10K-50K+ members each.",
  },
  {
    icon: Star,
    title: "Naver",
    description: "Blog posts, cafe reviews, and search-optimized content on Korea's dominant search platform where 60% of Korean internet searches begin.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Project Brief & Audience Analysis",
    description: "We analyze your project's value proposition, target audience, and competitive landscape in the Korean market to build a data-driven KOL strategy.",
  },
  {
    number: "02",
    title: "KOL Selection & Vetting",
    description: "Every KOL is screened through our proprietary vetting process including fake follower detection, engagement rate analysis, and audience quality scoring.",
  },
  {
    number: "03",
    title: "Content Strategy & Messaging Alignment",
    description: "We craft culturally relevant messaging that resonates with Korean crypto audiences, ensuring KOL content feels authentic rather than scripted.",
  },
  {
    number: "04",
    title: "Campaign Execution & Management",
    description: "End-to-end campaign management including scheduling, content review, real-time monitoring, and KOL relationship coordination across all platforms.",
  },
  {
    number: "05",
    title: "Performance Reporting & ROI Analysis",
    description: "Detailed post-campaign reports with CPA, CPE, conversion metrics, sentiment analysis, and actionable recommendations for future campaigns.",
  },
];

const differentiators = [
  {
    icon: CheckCircle,
    title: "Vetted Network",
    description: "Every KOL is screened for engagement quality, not just follower count. We check for fake followers, bot engagement, and audience demographics before any partnership.",
  },
  {
    icon: TrendingUp,
    title: "Performance-Based",
    description: "We track CPA, CPE, and conversion metrics for every campaign. You see exactly what your investment delivers in reach, engagement, and community growth.",
  },
  {
    icon: Users,
    title: "Cultural Expertise",
    description: "Our native Korean team ensures authentic messaging that resonates with local crypto communities. No awkward translations or cultural missteps.",
  },
  {
    icon: Target,
    title: "End-to-End Management",
    description: "From KOL selection and content strategy to campaign execution and post-campaign reporting, we handle every detail so you can focus on building.",
  },
];

const faqs = [
  {
    question: "How do you vet Korean crypto KOLs?",
    answer: "We use a multi-layer vetting process that includes fake follower detection tools, engagement rate analysis (we look for 3%+ genuine engagement), audience demographic verification, content quality assessment, and historical campaign performance data. Every KOL in our network has been personally vetted by our Korean team.",
  },
  {
    question: "What is the average cost of a Korean KOL campaign?",
    answer: "Campaign costs vary based on KOL tier, platform mix, and campaign duration. A focused micro-KOL campaign on Telegram can start from $5K, while a comprehensive multi-platform campaign with top-tier YouTubers typically ranges from $15K-$50K+. We build custom packages based on your budget and goals.",
  },
  {
    question: "Which platforms drive the most engagement?",
    answer: "YouTube delivers the highest quality engagement with long-form content that builds deep understanding of your project. Telegram drives the most immediate community growth with direct access to active crypto traders. Twitter/X is best for narrative amplification and trending visibility. Naver is essential for Korean search visibility and long-term organic discovery.",
  },
  {
    question: "Can you run KOL campaigns for non-English projects?",
    answer: "Absolutely. We specialize in localizing global Web3 projects for the Korean market. Our team handles all translation, cultural adaptation, and messaging alignment to ensure your project resonates authentically with Korean crypto audiences, regardless of your project's original language.",
  },
  {
    question: "How do you measure KOL campaign ROI?",
    answer: "We track comprehensive metrics including impressions, engagement rate, click-through rate, new community members, CPA (cost per acquisition), CPE (cost per engagement), sentiment analysis, and conversion tracking where applicable. Every campaign includes a detailed performance report with benchmarks against industry standards.",
  },
];

const KOLMarketingKorea = () => {
  return (
    <>
      <SEOHead
        title="Korean KOL Marketing for Crypto & Web3 | ium Labs"
        description="Access 170+ vetted Korean crypto KOLs across YouTube, Twitter, Telegram, and Naver. ROI-tracked influencer campaigns for Web3 projects entering Korea."
        path="/kol-marketing-korea"
        keywords={[
          "Korean KOL marketing",
          "crypto KOL Korea",
          "Korean crypto influencer",
          "Web3 influencer marketing Korea",
          "Korean YouTube crypto",
          "crypto influencer agency Korea",
          "크립토 KOL 마케팅",
        ]}
      />

      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Navbar />

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/50 text-xs tracking-widest uppercase mb-8">
                <Star className="w-3 h-3" />
                Korean KOL Marketing
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                Korean KOL Marketing
                <br />
                <span className="text-white/40">for Crypto & Web3</span>
              </h1>

              <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-10 leading-relaxed">
                Access our network of 170+ vetted Korean crypto KOLs across YouTube, Twitter, Telegram, and Naver. Every campaign is ROI-tracked and performance-driven.
              </p>

              <CalendlyButton
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium"
              >
                Launch Your KOL Campaign
                <ArrowRight className="w-4 h-4 ml-2" />
              </CalendlyButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={3}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-white/[0.06]"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-bold tracking-tight">{stat.value}</div>
                  <div className="text-white/40 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 01 — Why KOL Marketing in Korea ===== */}
        <section className="border-t border-white/[0.06]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-20 md:py-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white/20 text-sm font-mono">01</span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16">
                Why KOL Marketing Is
                <br />
                <span className="text-white/40">Essential in Korea</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
              {[
                {
                  title: "Trust in influencers over brands",
                  text: "South Koreans trust influencers more than brands \u2014 73% of crypto users discover projects through KOLs. In a market where community trust drives adoption, KOL endorsements carry more weight than any ad campaign.",
                },
                {
                  title: "YouTube dominance",
                  text: "YouTube is the 'holy grail' of Korean content marketing. Korean crypto YouTubers command audiences of 100K-500K+ subscribers who watch 15-30 minute deep-dives on projects, creating deep understanding and conviction.",
                },
                {
                  title: "Telegram-first communities",
                  text: "Telegram is the primary platform for Korean crypto communities. The most influential alpha groups and trading communities operate exclusively on Telegram, making it the gateway to Korea's most active traders.",
                },
                {
                  title: "Cultural localization",
                  text: "KOLs localize global narratives into culturally relevant Korean content. Direct translations fail \u2014 Korean audiences need content that speaks to local market dynamics, regulatory context, and cultural preferences.",
                },
                {
                  title: "Long-term community building",
                  text: "Unlike Western markets, Korean KOLs build long-term communities, not just one-off promotions. A single YouTube review can drive sustained community growth for months as the content circulates through Korean crypto networks.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  custom={i}
                  className="flex gap-4"
                >
                  <CheckCircle className="w-5 h-5 text-white/30 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 02 — Platform Coverage ===== */}
        <section className="border-t border-white/[0.06]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-20 md:py-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white/20 text-sm font-mono">02</span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16">
                Our KOL Network Covers
                <br />
                <span className="text-white/40">Every Platform</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform, i) => (
                <motion.div
                  key={platform.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  custom={i}
                  className="group border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-colors bg-white/[0.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-5">
                    <platform.icon className="w-5 h-5 text-white/60" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{platform.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{platform.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 03 — How It Works ===== */}
        <section className="border-t border-white/[0.06]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-20 md:py-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white/20 text-sm font-mono">03</span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16">
                How Our KOL
                <br />
                <span className="text-white/40">Campaigns Work</span>
              </h2>
            </motion.div>

            <div className="space-y-0">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  custom={i}
                  className="flex gap-6 md:gap-10 py-8 border-b border-white/[0.06] last:border-b-0"
                >
                  <span className="text-3xl md:text-4xl font-bold text-white/10 font-mono flex-shrink-0 w-12">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-white/45 leading-relaxed max-w-2xl">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 04 — What Sets Us Apart ===== */}
        <section className="border-t border-white/[0.06]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-20 md:py-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white/20 text-sm font-mono">04</span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16">
                Why Choose ium Labs
                <br />
                <span className="text-white/40">for KOL Marketing</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-8">
              {differentiators.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  custom={i}
                  className="flex gap-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/45 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 05 — FAQ ===== */}
        <section className="border-t border-white/[0.06]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-20 md:py-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white/20 text-sm font-mono">05</span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16">
                Frequently Asked
                <br />
                <span className="text-white/40">Questions</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl space-y-0">
              {faqs.map((faq, i) => (
                <motion.details
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  custom={i}
                  className="group border-b border-white/[0.06] last:border-b-0"
                >
                  <summary className="flex items-center justify-between py-6 cursor-pointer list-none text-lg font-medium hover:text-white/80 transition-colors">
                    {faq.question}
                    <ArrowRight className="w-4 h-4 text-white/30 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <p className="text-white/45 leading-relaxed pb-6 pr-8">
                    {faq.answer}
                  </p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 06 — Contact ===== */}
        <section className="border-t border-white/[0.06]">
          <ContactFormSection sectionNumber="06" />
        </section>

        {/* ===== Footer ===== */}
        <FooterLinksSection />
        <Footer />
      </div>
    </>
  );
};

export default KOLMarketingKorea;
