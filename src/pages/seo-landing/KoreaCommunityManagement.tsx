import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, MessageSquare, Shield, Globe } from "lucide-react";
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
    icon: MessageSquare,
    title: "KakaoTalk & Telegram Management",
    text: "Korean crypto users live on KakaoTalk and Telegram. Our native Korean community managers run 24/7 moderation, onboarding flows, and engagement campaigns across both platforms. We build communities that retain members and convert lurkers into active participants.",
  },
  {
    icon: Users,
    title: "Discord Localization",
    text: "Discord is growing fast in Korea's Web3 scene. We set up Korean-language channels, run localized events, AMAs, and quests, and staff them with native moderators who understand Korean community culture and humor.",
  },
  {
    icon: Shield,
    title: "Sentiment Monitoring & Crisis Management",
    text: "Korean communities can turn hostile fast when FUD spreads. We monitor sentiment in real-time across Naver Cafe, DC Inside, and crypto-specific forums, flagging issues before they escalate and deploying rapid-response communication strategies.",
  },
  {
    icon: Globe,
    title: "Community Growth Strategy",
    text: "We don't just manage communities, we grow them. Through KOL partnerships, AMA events, referral campaigns, and content seeding, we build organic growth engines that scale your Korean community from hundreds to tens of thousands.",
  },
];

const KoreaCommunityManagement = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korea Crypto Community Management | Telegram & KakaoTalk | ium Labs"
        description="Expert crypto community management in Korea. We run Telegram, KakaoTalk, and Discord communities with native Korean managers. 24/7 moderation, growth strategy, and engagement for Web3 projects."
        path="/korea-community-management"
        keywords={["korea crypto community management", "web3 community korea", "telegram community management korea", "kakaotalk crypto community", "korean discord management", "crypto community growth korea"]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight">
            Korea Crypto Community{" "}<br className="hidden md:block" />Management
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Native Korean community managers across Telegram, KakaoTalk, and Discord. We build, grow, and protect Web3 communities that drive real engagement in Korea's crypto market.
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
                <motion.div key={s.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="border-t border-white/10 pt-6">
                  <Icon className="w-8 h-8 text-white/40 mb-4" />
                  <h2 className="text-white font-medium text-lg mb-2">{s.title}</h2>
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
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Ready to Build Your Korean Community?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="text-white/50 mb-8 max-w-2xl mx-auto">
            Learn more about our full community management service or get in touch to discuss your project.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services/community" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors text-sm">
              Community Service Details <ArrowRight className="w-4 h-4 ml-2" />
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

export default KoreaCommunityManagement;
