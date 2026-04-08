import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, TrendingUp, Target, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import SEOHead from "@/components/SEOHead";
import CalendlyButton from "@/components/CalendlyButton";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const sections = [
  {
    icon: Search,
    title: "Naver SEO for Crypto Projects",
    text: "75% of Korean internet users search on Naver, not Google. Naver's algorithm prioritizes Naver Blog, Naver Cafe, and Naver Knowledge-in content. We create and optimize Korean-native content across all Naver properties to capture search traffic that Google SEO completely misses.",
  },
  {
    icon: TrendingUp,
    title: "Google Ads (Crypto Certified)",
    text: "Running crypto ads on Google requires advertiser certification that most agencies can't obtain. We handle the full certification process and run search, display, and YouTube campaigns targeting Korean crypto audiences with compliant ad copy.",
  },
  {
    icon: Target,
    title: "X Ads & Crypto Ad Networks",
    text: "Korean Crypto Twitter is where sentiment forms. We run promoted posts, follower campaigns, and engagement campaigns targeting Korean CT. Plus Coinzilla, Bitmedia, and other crypto-native networks that accept Web3 advertising.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics & ROAS",
    text: "Every dollar tracked from impression to conversion. We provide weekly reports with full attribution, campaign-level and channel-level ROAS, and actionable optimization recommendations. Average client sees 3.4x ROAS across all channels.",
  },
];

const KoreaSEONaver = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Naver SEO & Crypto Ads Korea | Google Certified | ium Labs"
        description="Naver SEO, Google Ads (crypto certified), X Ads, and crypto ad networks for the Korean market. We know which platforms ban crypto and how to get certified for the ones that don't."
        path="/korea-seo-naver"
        keywords={["naver SEO crypto", "korea search engine optimization", "crypto google ads korea", "naver blog SEO", "korean crypto advertising", "web3 ads korea"]}
      />
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            Naver SEO & Crypto{" "}<br className="hidden md:block" />Advertising Korea
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            75% of Koreans search on Naver, not Google. Most crypto projects have zero Naver presence. We fix that with native Korean SEO, certified Google Ads, and crypto ad network management.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-10">
            <CalendlyButton size="lg" className="bg-white text-black hover:bg-white/90 text-base px-8 py-6 rounded-full">Book a Free Strategy Call</CalendlyButton>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <Icon className="w-8 h-8 text-white/40 mb-4" />
                  <h2 className="text-white font-semibold text-lg mb-2">{s.title}</h2>
                  <p className="text-white/50 text-sm leading-relaxed">{s.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl md:text-4xl font-bold text-white mb-6">
            Ready to Dominate Korean Search?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="text-white/50 mb-8 max-w-2xl mx-auto">
            Learn more about our SEO and paid advertising services or get in touch for a free audit.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services/seo-ads" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors text-sm">
              SEO & Ads Service Details <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <FooterLinksSection />
      <Footer />
    </div>
  );
};

export default KoreaSEONaver;
