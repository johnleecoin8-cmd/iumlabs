import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Megaphone, Newspaper, Globe, TrendingUp } from "lucide-react";
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
    icon: Newspaper,
    title: "Tier-1 Korean Crypto Media Placement",
    text: "We secure coverage in Korea's most influential crypto outlets: TokenPost, Blockmedia, CoinDesk Korea, Decenter, and more. Our editorial relationships ensure your story gets placed, not just pitched. We handle everything from press release localization to journalist briefings.",
  },
  {
    icon: Megaphone,
    title: "Narrative Development & Localization",
    text: "Korean media requires a different narrative angle than Western outlets. We craft Korean-first storylines that resonate with local journalists and readers, adapting your messaging for cultural context while preserving technical accuracy.",
  },
  {
    icon: Globe,
    title: "Naver News & Portal Optimization",
    text: "In Korea, Naver is the gateway to credibility. Articles indexed on Naver News carry disproportionate trust. We optimize press coverage for Naver News indexing, ensuring your project appears when Korean investors search for information.",
  },
  {
    icon: TrendingUp,
    title: "Ongoing Media Relations",
    text: "PR isn't a one-time push. We maintain ongoing relationships with Korean crypto journalists, providing them with exclusive updates, data, and commentary from your team. This builds a sustained media presence that compounds over time.",
  },
];

const KoreaPRMedia = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korea Crypto PR & Media Relations | Korean Press Coverage | ium Labs"
        description="Get featured in Korea's top crypto media outlets. ium Labs provides full-service PR and media relations for Web3 projects targeting the Korean market, including TokenPost, Blockmedia, and CoinDesk Korea placement."
        path="/korea-pr-media"
        keywords={["korea crypto PR", "korean media relations crypto", "tokenpost PR", "blockmedia coverage", "korean crypto press release", "web3 PR korea"]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            Korea Crypto PR{" "}<br className="hidden md:block" />& Media Relations
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Earned media coverage in Korea's leading crypto publications. We handle narrative development, journalist relations, and press placement to build credibility with Korean investors.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-10">
            <CalendlyButton size="lg" className="bg-white text-black hover:bg-white/90 text-base px-8 py-6 rounded-full">Book a Free Strategy Call</CalendlyButton>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
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

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl md:text-4xl font-bold text-white mb-6">
            Get Your Project Covered in Korean Media
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="text-white/50 mb-8 max-w-2xl mx-auto">
            Explore our full PR service or talk to us about your media strategy for the Korean market.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services/pr" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors text-sm">
              PR Service Details <ArrowRight className="w-4 h-4 ml-2" />
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

export default KoreaPRMedia;
