import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, BookOpen, Globe, Shield, Users, TrendingUp, MapPin, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import ContactFormSection from "@/components/ContactFormSection";
import SEOHead from "@/components/SEOHead";
import CalendlyButton from "@/components/CalendlyButton";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const platforms = [
  {
    name: "Telegram",
    description: "Primary community platform, used by 90%+ of Korean crypto communities. Most projects run their official Korean Telegram with dedicated moderators and daily updates.",
    icon: Users,
  },
  {
    name: "KakaoTalk",
    description: "Korea's #1 messaging app with 47M+ users. Open chat groups for crypto are thriving — essential for reaching mainstream Korean investors beyond the crypto-native crowd.",
    icon: MapPin,
  },
  {
    name: "Naver",
    description: "Korea's Google. Naver Blog and Naver Cafe content is critical for organic search visibility. Korean users trust Naver results over Google, making it a must-have for SEO.",
    icon: Globe,
  },
  {
    name: "YouTube",
    description: "Long-form KOL content drives trust and awareness. Korean crypto YouTubers like 코인원, 비트코인갤러리 have massive followings and can move markets with a single review.",
    icon: BookOpen,
  },
  {
    name: "Twitter/X",
    description: "Real-time narrative platform. CT (Crypto Twitter) Korea is growing rapidly, especially among DeFi and NFT communities. Essential for project credibility and global-local bridging.",
    icon: Zap,
  },
];

const checklist = [
  { title: "Market Research & Competitive Analysis", description: "Understand the Korean competitive landscape, identify comparable projects, and map community sentiment before you launch." },
  { title: "Brand Localization (Korean website, social media)", description: "Direct translation fails in Korea. You need culturally adapted messaging, Korean-native copywriting, and localized visual design." },
  { title: "Community Setup (Telegram, Discord, KakaoTalk, Naver Cafe)", description: "Build your Korean community infrastructure before any marketing push. Korean users expect active, well-moderated communities." },
  { title: "KOL & Influencer Partnerships", description: "Partner with credible Korean crypto influencers who align with your project's narrative. Authenticity matters more than follower count." },
  { title: "PR & Media Coverage (CoinDesk Korea, Block Media, TokenPost)", description: "Secure coverage in top Korean crypto media outlets. A well-timed press push around exchange listing or mainnet launch amplifies everything." },
  { title: "Exchange Listing Strategy (Upbit, Bithumb, Coinone)", description: "Plan your exchange listing timeline carefully. Upbit listings in particular can 5-10x Korean trading volume overnight." },
  { title: "Event Presence (Seoul meetups, side events)", description: "Show up in person. Korean crypto events, side events at Korea Blockchain Week, and Seoul meetups build irreplaceable trust." },
  { title: "Ongoing Community Management & Growth", description: "Korea is not a 'launch and leave' market. Sustained engagement, weekly AMAs, and consistent content keep your community growing." },
];

const KoreaWeb3Guide = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEOHead
        title="Korea Crypto Market Entry Guide | How to Launch Web3 in Korea | ium Labs"
        description="Complete guide to entering the Korean crypto market in 2026. Learn about regulations, KOL marketing, community building, exchange listings, and GTM strategies for Web3 projects."
        path="/korea-web3-guide"
        keywords={[
          'Korea crypto market entry',
          'how to launch Web3 in Korea',
          'Korean crypto market guide',
          'Korea blockchain regulations',
          'Upbit listing strategy',
          '한국 크립토 마케팅',
          '웹3 한국 시장 진입',
          '블록체인 마케팅 한국',
        ]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 mb-8"
          >
            <BookOpen className="w-4 h-4" />
            <span>2026 Edition — Updated Quarterly</span>
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            The Complete Guide to Entering Korea's Crypto Market
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Everything you need to know about launching your Web3 project in Korea — from regulations and exchange listings to KOL marketing and community building. Based on 19+ successful project launches.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
          >
            <CalendlyButton
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-8 py-6 text-base font-semibold rounded-full"
            >
              Get a Free Korea Strategy Session
            </CalendlyButton>
          </motion.div>
        </div>
      </section>

      {/* Section 01 — Market Overview */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-mono text-white/30 mb-4 block">01</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Korea Crypto Market Overview: Why It Matters
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={1}
            className="space-y-6 text-white/60 text-lg leading-relaxed"
          >
            <p>
              South Korea is one of the most active crypto markets in the world — and it's not even close. With <strong className="text-white">16 million+ active crypto users</strong>, roughly 30% of the entire population trades digital assets. No other developed nation comes close to that penetration rate.
            </p>
            <p>
              At the center of this ecosystem is <strong className="text-white">Upbit</strong>, which processes <strong className="text-white">$4B+ in daily trading volume</strong>, making it one of the world's largest crypto exchanges by volume. The exchange's influence is so significant that a new token listing on Upbit routinely triggers massive price movements — a phenomenon the market has come to expect.
            </p>
            <p>
              You've probably heard of the <strong className="text-white">"Kimchi Premium"</strong> — the price gap where cryptocurrencies trade at higher prices on Korean exchanges compared to global markets. This premium, which can range from 2-10% during bull markets, is a direct reflection of the intense demand and liquidity in the Korean market. For projects, it signals an opportunity: Korean investors are willing to pay more, and they trade aggressively.
            </p>
            <p>
              Regulatory clarity has also improved dramatically. The <strong className="text-white">Virtual Asset User Protection Act (VAUPA)</strong>, enacted in 2024, provides clear guardrails for exchanges and projects operating in Korea. While compliance requirements are strict, the regulatory framework actually benefits serious projects by weeding out scams and building investor trust.
            </p>
            <p>
              But here's what most projects get wrong: Korea is a <strong className="text-white">trust-first market</strong>. You can't airdrop your way to a Korean community. Investors expect localized content — not Google-translated blog posts, but genuine Korean-native messaging. They want to see Korean KOLs they trust vouching for your project. And they want active, well-moderated Korean communities where they can ask questions in their own language.
            </p>
          </motion.div>

          {/* Key stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={2}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { stat: "16M+", label: "Active crypto users" },
              { stat: "$4B+", label: "Daily Upbit volume" },
              { stat: "30%", label: "Population penetration" },
              { stat: "2024", label: "VAUPA enacted" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{item.stat}</div>
                <div className="text-sm text-white/40">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 02 — Regulatory Landscape */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-mono text-white/30 mb-4 block">02</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Korean Crypto Regulations You Need to Know
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={1}
            className="space-y-6 text-white/60 text-lg leading-relaxed"
          >
            <p>
              Korea's regulatory landscape has matured significantly. The <strong className="text-white">Virtual Asset User Protection Act (VAUPA)</strong>, enacted in July 2024, was a watershed moment. It establishes clear rules for virtual asset service providers (VASPs), mandates user asset segregation, and introduces penalties for market manipulation and unfair trading practices. For legitimate projects, this is good news — it means the market is getting cleaner.
            </p>
            <p>
              The <strong className="text-white">Financial Services Commission (FSC)</strong> is the primary regulatory body overseeing crypto in Korea. The FSC works alongside the Financial Intelligence Unit (FIU) to enforce compliance. All exchanges operating in Korea must register with the FIU and meet stringent operational requirements, including real-name verification partnerships with Korean banks.
            </p>
            <p>
              <strong className="text-white">KYC/AML requirements</strong> are among the strictest globally. Korean exchanges require real-name bank accounts linked to individual users, making anonymous trading virtually impossible. For projects, this means Korean users are verified, high-quality participants — not bots or Sybil attackers. Your Korean community metrics are likely your most reliable.
            </p>
            <p>
              On the tax side, Korea currently applies a <strong className="text-white">250 million KRW threshold</strong> (approximately $185,000 USD) for crypto gains reporting. Gains above this threshold are subject to taxation. The tax framework continues to evolve, and staying updated is critical for projects advising their Korean community.
            </p>
            <p>
              For marketing specifically, <strong className="text-white">compliance is non-negotiable</strong>. Korean regulations prohibit guaranteeing returns on crypto investments. All marketing materials must include proper disclaimers. Misleading promotional content can result in penalties for both the project and the marketing partners involved. Working with a Korea-native agency ensures your campaigns stay compliant while still being effective.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={2}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { icon: Shield, title: "VAUPA Compliance", desc: "User asset segregation, anti-manipulation rules, VASP registration" },
              { icon: Users, title: "KYC/AML Standards", desc: "Real-name bank accounts, verified users, FIU registration" },
              { icon: TrendingUp, title: "Tax Framework", desc: "250M KRW threshold for gains reporting, evolving regulations" },
              { icon: Globe, title: "Marketing Rules", desc: "No guaranteed returns, mandatory disclaimers, compliant promotions" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <item.icon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 03 — GTM Checklist */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-mono text-white/30 mb-4 block">03</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Korea Market Entry Checklist
            </h2>
            <p className="text-lg text-white/50 mb-12 max-w-2xl">
              A step-by-step framework based on 19+ successful Korea launches. Skip any of these steps at your own risk — the Korean market punishes half-measures.
            </p>
          </motion.div>

          <div className="space-y-4">
            {checklist.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i * 0.5}
                className="flex gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <span className="text-sm font-mono text-purple-400">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04 — Key Platforms */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-mono text-white/30 mb-4 block">04</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Essential Platforms for Korean Crypto Marketing
            </h2>
            <p className="text-lg text-white/50 mb-12 max-w-2xl">
              The Korean digital ecosystem is fundamentally different from the West. These are the platforms that matter — and how to use them.
            </p>
          </motion.div>

          <div className="space-y-4">
            {platforms.map((platform, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i * 0.5}
                className="flex gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <platform.icon className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{platform.name}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{platform.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 05 — Exchange Landscape */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-mono text-white/30 mb-4 block">05</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Korean Exchange Listing: Upbit, Bithumb & Beyond
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={1}
            className="space-y-6 text-white/60 text-lg leading-relaxed"
          >
            <p>
              Exchange listings are the single most impactful event for any crypto project entering Korea. <strong className="text-white">Upbit dominates with 70%+ market share</strong> of Korean crypto trading volume. A Upbit listing is widely considered one of the most valuable catalysts in crypto — tokens have historically seen 50-300% price increases on listing day alone.
            </p>
            <p>
              <strong className="text-white">Bithumb</strong> is Korea's second-largest exchange with a strong retail investor base. While it doesn't command the same volume as Upbit, a Bithumb listing still provides significant Korean market exposure and is often more accessible for mid-cap projects. Many projects pursue a Bithumb listing as a stepping stone to Upbit.
            </p>
            <p>
              Secondary exchanges like <strong className="text-white">Coinone</strong> and <strong className="text-white">GOPAX</strong> offer additional Korean market access. While their volumes are smaller, they serve niche communities and can provide valuable initial Korean market presence before pursuing tier-1 listings.
            </p>
            <p>
              Listing requirements vary by exchange but generally include: thorough technical audits, legal compliance review, proof of genuine community engagement, sufficient liquidity depth, and a clean regulatory history. The process typically takes <strong className="text-white">3-6 months</strong> from initial application to listing, and having a strong Korean community presence beforehand significantly improves your chances.
            </p>
            <p>
              The strategic insight most projects miss: <strong className="text-white">your Korean marketing should start months before you apply for an exchange listing</strong>. Korean exchanges evaluate community strength, Korean social media presence, and local brand awareness as part of their due diligence. Projects that invest in Korean community building before applying have dramatically higher listing success rates.
            </p>
          </motion.div>

          {/* Exchange comparison */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={2}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { name: "Upbit", share: "70%+", note: "Largest volume, highest impact listings", tier: "Tier 1" },
              { name: "Bithumb", share: "~15%", note: "Strong retail base, accessible process", tier: "Tier 1" },
              { name: "Coinone / GOPAX", share: "~10%", note: "Niche communities, stepping stone", tier: "Tier 2" },
            ].map((ex, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">{ex.tier}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-1">{ex.name}</h3>
                <div className="text-2xl font-bold text-white/80 mb-2">{ex.share}</div>
                <p className="text-sm text-white/40">{ex.note}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 06 — How ium Labs Helps */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-mono text-white/30 mb-4 block">06</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              How ium Labs Helps You Enter Korea
            </h2>
            <p className="text-lg text-white/50 mb-12 max-w-2xl">
              We're a Seoul-based Web3 marketing agency that has helped 19+ projects successfully launch in the Korean market. Here's how we can help you.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={1}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            {[
              { title: "GTM Strategy", desc: "Full go-to-market planning tailored to Korea's unique crypto landscape.", link: "/services/gtm" },
              { title: "KOL Marketing", desc: "Vetted Korean crypto influencer partnerships with guaranteed deliverables.", link: "/services/influencer" },
              { title: "Community Management", desc: "24/7 Korean community management across Telegram, Discord, and KakaoTalk.", link: "/services/community" },
              { title: "PR & Media", desc: "Coverage in CoinDesk Korea, Block Media, TokenPost, and 15+ Korean outlets.", link: "/services/pr" },
            ].map((service, i) => (
              <Link
                key={i}
                to={service.link}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{service.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-purple-400 mt-4 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={2}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              View our case studies and past project launches
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 07 — Contact */}
      <ContactFormSection sectionNumber="07" />

      {/* Footer */}
      <FooterLinksSection />
      <Footer />
    </div>
  );
};

export default KoreaWeb3Guide;
