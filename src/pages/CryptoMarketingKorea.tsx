import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Globe, Users, TrendingUp, MessageSquare, Megaphone, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import ContactFormSection from "@/components/ContactFormSection";
import SEOHead from "@/components/SEOHead";
import CalendlyButton from "@/components/CalendlyButton";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const services = [
  {
    icon: TrendingUp,
    title: "GTM Strategy",
    description: "Market entry plans tailored to Korea's unique crypto landscape. Positioning, timing, and channel strategy built for maximum traction.",
    link: "/services/gtm",
  },
  {
    icon: Users,
    title: "KOL & Influencer Marketing",
    description: "Access our network of 170+ vetted Korean crypto KOLs. Authentic endorsements that drive real community trust and engagement.",
    link: "/services/influencer",
  },
  {
    icon: MessageSquare,
    title: "Community Management",
    description: "Native Korean community managers across Telegram, KakaoTalk, and Discord. 24/7 engagement that keeps your community active.",
    link: "/services/community",
  },
  {
    icon: Megaphone,
    title: "PR & Media Relations",
    description: "Coverage in top Korean crypto outlets — TokenPost, Blockmedia, CoinDesk Korea, and more. Earned media that builds lasting credibility.",
    link: "/services/pr",
  },
  {
    icon: BarChart3,
    title: "Deep Research",
    description: "Data-driven market analysis, competitor mapping, and sentiment tracking across Korean crypto communities and exchanges.",
    link: "/services/deep-research",
  },
  {
    icon: Globe,
    title: "Branding & Website",
    description: "Korean-localized branding, landing pages, and pitch decks that resonate with local investors and community members.",
    link: "/services/branding",
  },
];

const stats = [
  { value: "19+", label: "Projects" },
  { value: "170+", label: "KOL Network" },
  { value: "$7M+", label: "Token Sales" },
  { value: "44+", label: "Events" },
];

const clients = ["BNB Chain", "Bybit", "KuCoin", "Polygon", "Mantra", "Aptos", "Sahara AI", "Peaq"];

const steps = [
  { number: "01", title: "Discovery", description: "We audit your project, tokenomics, and current Korean presence. We identify gaps, opportunities, and competitive positioning." },
  { number: "02", title: "Strategy", description: "A custom GTM playbook covering KOL selection, community channels, PR targets, event calendar, and content roadmap — all localized for Korea." },
  { number: "03", title: "Execution", description: "Our on-the-ground team in Seoul activates every channel simultaneously. KOL campaigns, community seeding, PR blitzes, and exchange coordination." },
  { number: "04", title: "Optimization", description: "Weekly performance reports, sentiment analysis, and strategy pivots. We double down on what works and cut what doesn't — fast." },
];

const faqs = [
  {
    q: "How much does crypto marketing in Korea cost?",
    a: "Monthly retainers typically range from $15K to $50K+ depending on scope. A focused KOL campaign might start at $15K/month, while a full-stack GTM engagement covering PR, community, KOL, and events usually falls in the $30K–$50K range. We structure pricing around deliverables, not hours.",
  },
  {
    q: "How long does it take to see results?",
    a: "KOL campaigns and PR placements can generate measurable buzz within 2–4 weeks. Community growth typically shows strong momentum by month 2. For exchange-listing-focused campaigns, plan for a 3–6 month runway. We set clear KPIs at kickoff so expectations are aligned from day one.",
  },
  {
    q: "Do you work with early-stage projects?",
    a: "Yes. We work with projects from pre-launch through post-TGE. For early-stage teams, we focus on narrative development, community seeding, and KOL relationship building — all of which create the foundation for a successful Korean market entry when you're ready to scale.",
  },
  {
    q: "What platforms do Korean crypto users use?",
    a: "Korean crypto users are most active on Telegram, KakaoTalk (Korea's dominant messaging app), X (Twitter), Naver Blog, and YouTube. For trading, Upbit dominates with ~80% market share, followed by Bithumb. We run campaigns across all of these channels natively.",
  },
  {
    q: "Do you handle exchange listings?",
    a: "We don't guarantee listings — no ethical agency can. But we provide end-to-end listing support: preparing applications, connecting you with exchange BD teams, coordinating market-making partners, and running the pre- and post-listing marketing campaigns that exchanges want to see.",
  },
];

const SectionHeader = ({ number, title, badge }: { number: string; title: string; badge: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="bg-[#1A1A1A] flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10"
  >
    <div className="flex items-baseline gap-6 md:gap-10">
      <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">{number}</span>
      <h2 className="text-lg md:text-xl font-medium text-white">{title}</h2>
    </div>
    <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">{badge}</span>
  </motion.div>
);

const CryptoMarketingKorea = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korea Crypto Marketing Agency | #1 Web3 GTM Partner | ium Labs"
        description="Looking for a crypto marketing agency in Korea? ium Labs provides full-stack Web3 GTM strategy, KOL marketing, community growth, and PR for blockchain projects entering the Korean market."
        path="/crypto-marketing-korea"
        keywords={[
          "Korea crypto marketing agency",
          "crypto marketing Korea",
          "Web3 marketing agency Korea",
          "blockchain marketing Seoul",
          "Korean crypto agency",
          "crypto GTM Korea",
          "한국 크립토 마케팅 에이전시",
        ]}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            Korea's #1 Crypto{" "}
            <br className="hidden md:block" />
            Marketing Agency
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            Full-stack Web3 GTM strategy for blockchain projects entering the Korean market.
            From KOL networks to community growth — we've launched 19+ projects and driven $7M+ in token sales.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10"
          >
            <CalendlyButton size="lg" className="bg-white text-black hover:bg-white/90 text-base px-8 py-6 rounded-full">
              Book a Free Strategy Call
            </CalendlyButton>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 01 — Why Korea */}
      <section className="border-t border-white/10">
        <SectionHeader number="01" title="Why Korea" badge="Market Opportunity" />
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-white mb-10 leading-tight"
          >
            Why Korea Is the #1 Market for Your Web3 Project
          </motion.h2>
          <div className="space-y-6">
            {[
              {
                title: "16M+ Active Crypto Users",
                text: "South Korea has over 16 million registered crypto exchange accounts — roughly 30% of the entire population. No other country comes close to this level of retail penetration. For any token or protocol looking to maximize holder count and trading volume, Korea is non-negotiable.",
              },
              {
                title: "The Kimchi Premium Is Real",
                text: "Korean retail investors are known for aggressive trading behavior, often pushing token prices 5–15% higher on Korean exchanges than global averages. This \"Kimchi Premium\" isn't just a meme — it reflects genuine demand and high engagement from a market that moves fast and trades with conviction.",
              },
              {
                title: "Massive Exchange Volume",
                text: "Upbit and Bithumb combined routinely handle $2–5 billion in daily trading volume, placing Korea among the top 3 crypto markets globally. A successful Korean listing can transform a project's liquidity profile overnight. Upbit alone has listed tokens that saw 10–50x volume increases within 48 hours.",
              },
              {
                title: "Trust-First Culture",
                text: "Korean investors don't ape into random projects. They rely on trusted KOLs, community managers, and local media coverage to evaluate legitimacy. Projects that skip localization — hiring native Korean speakers, building KakaoTalk communities, and getting coverage in TokenPost or Blockmedia — are effectively invisible in this market.",
              },
              {
                title: "Regulatory Clarity Is Improving",
                text: "Korea's Virtual Asset User Protection Act (VAUPA), enacted in July 2024, created a clear legal framework for crypto assets. While regulation is strict, it's also predictable — and projects that play by the rules gain a significant trust advantage. Korea is not a gray zone; it's a regulated, high-integrity market.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="flex gap-4"
              >
                <CheckCircle className="w-5 h-5 text-white/30 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 02 — Services */}
      <section className="border-t border-white/10">
        <SectionHeader number="02" title="Services" badge="What We Do" />
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-white mb-12 leading-tight"
          >
            What We Do: Full-Stack Crypto Marketing
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <Link
                    to={service.link}
                    className="block h-full p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
                  >
                    <Icon className="w-8 h-8 text-white/40 mb-4 group-hover:text-white/60 transition-colors" />
                    <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed mb-4">{service.description}</p>
                    <span className="inline-flex items-center text-sm text-white/50 group-hover:text-white/80 transition-colors">
                      Learn more <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 03 — Trust */}
      <section className="border-t border-white/10">
        <SectionHeader number="03" title="Clients" badge="Trust" />
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight"
          >
            Trusted by Leading Web3 Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white/50 mb-12 max-w-2xl mx-auto"
          >
            We've helped some of the biggest names in Web3 successfully enter and scale in the Korean market.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
          >
            {clients.map((client) => (
              <span
                key={client}
                className="px-5 py-2.5 rounded-full border border-white/10 text-white/60 text-sm md:text-base"
              >
                {client}
              </span>
            ))}
          </motion.div>
          <Link
            to="/projects"
            className="inline-flex items-center text-white/50 hover:text-white transition-colors text-sm"
          >
            View all projects <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* Section 04 — Process */}
      <section className="border-t border-white/10">
        <SectionHeader number="04" title="Process" badge="How We Work" />
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-white mb-12 leading-tight"
          >
            How We Work
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]"
              >
                <span className="text-xs text-white/30 font-mono tracking-widest">{step.number}</span>
                <h3 className="text-white font-semibold text-xl mt-3 mb-3">{step.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 05 — FAQ */}
      <section className="border-t border-white/10">
        <SectionHeader number="05" title="FAQ" badge="Common Questions" />
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-white mb-12 leading-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="pb-8 border-b border-white/10 last:border-0"
              >
                <h3 className="text-white font-semibold text-lg mb-3">{faq.q}</h3>
                <p className="text-white/50 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 06 — Contact */}
      <section className="border-t border-white/10">
        <ContactFormSection />
      </section>

      <FooterLinksSection />
      <Footer />
    </div>
  );
};

export default CryptoMarketingKorea;
