import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, FileCheck, Scale, Building2 } from "lucide-react";
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
    icon: Building2,
    title: "Upbit & Bithumb Listing Requirements",
    text: "Korean exchanges have the strictest listing standards globally. Upbit requires extensive due diligence, legal opinions, and compliance documentation. Bithumb has its own review process. We prepare your project to meet every requirement before you even apply.",
  },
  {
    icon: FileCheck,
    title: "VASP Registration Support",
    text: "Operating as a Virtual Asset Service Provider in Korea requires registration under the Specific Financial Information Act. We work with partner law firms (Law Office Asset, Freeman Law) to prepare your VASP documentation and navigate the registration process.",
  },
  {
    icon: Scale,
    title: "PIPA & AML/KYC Compliance",
    text: "Korea's Personal Information Protection Act (PIPA) is one of the strictest data privacy laws globally. We design data handling procedures, consent flows, privacy policies, and AML/KYC frameworks that satisfy both Korean regulators and exchange compliance teams.",
  },
  {
    icon: Shield,
    title: "Pre-Listing Market Preparation",
    text: "Listing alone doesn't guarantee success. We build Korean market presence before listing through KOL campaigns, community building, and media coverage so that when you list, there's already an audience waiting to trade.",
  },
];

const KoreaExchangeListing = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korean Exchange Listing | Upbit & Bithumb | ium Labs"
        description="Navigate Korean exchange listing requirements for Upbit, Bithumb, and Coinone. VASP registration, PIPA compliance, due diligence preparation, and pre-listing market strategy."
        path="/korea-exchange-listing"
        keywords={["upbit listing requirements", "bithumb listing", "korean exchange listing", "VASP registration korea", "crypto listing korea", "upbit due diligence"]}
      />
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight">
            Korean Exchange{" "}<br className="hidden md:block" />Listing Guide
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Upbit and Bithumb control 97% of Korean trading volume. Getting listed requires navigating VASP regulations, PIPA compliance, and exchange-specific due diligence. We've helped 19+ projects through the process.
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

      <section className="border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Ready to List in Korea?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="text-white/50 mb-8 max-w-2xl mx-auto">
            Learn more about our compliance and regulatory services or discuss your listing strategy.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services/compliance" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors text-sm">
              Compliance Service Details <ArrowRight className="w-4 h-4 ml-2" />
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

export default KoreaExchangeListing;
