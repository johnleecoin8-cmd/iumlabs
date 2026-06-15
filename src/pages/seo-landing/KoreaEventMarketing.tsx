import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Users, Mic } from "lucide-react";
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
    icon: Calendar,
    title: "Korea Blockchain Week (KBW) Side Events",
    text: "KBW is the largest crypto event in Asia. We plan, produce, and promote side events during KBW week, from intimate dinners with top Korean investors to large-scale networking events. Our team handles venue sourcing, speaker coordination, RSVP management, and day-of logistics in Seoul.",
  },
  {
    icon: MapPin,
    title: "Seoul Event Venue & Logistics",
    text: "Running events in Seoul requires local expertise. We manage everything from Gangnam venue booking and catering to AV setup and on-site Korean-English interpreters. Our operations team in Seoul ensures flawless execution so you can focus on networking.",
  },
  {
    icon: Mic,
    title: "AMA Events & Community Meetups",
    text: "Beyond conferences, we organize Korean community meetups, Twitter Spaces with Korean KOLs, and in-person AMAs at crypto-friendly venues across Seoul. These high-touch events build the trust that Korean investors demand before committing to a project.",
  },
  {
    icon: Users,
    title: "Event Marketing & Promotion",
    text: "An event is only as good as its attendance. We promote your event across Korean crypto Telegram groups, KOL channels, Naver Blog, and crypto media. Our RSVP lists are curated to attract genuine investors, traders, and builders, not airdrop hunters.",
  },
];

const KoreaEventMarketing = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korea Blockchain Event Marketing | KBW Side Events Seoul | ium Labs"
        description="Plan and execute crypto events in Seoul. ium Labs produces Korea Blockchain Week side events, community meetups, and investor dinners. Full-service event marketing for Web3 projects in Korea."
        path="/korea-event-marketing"
        keywords={["korea blockchain week", "crypto events seoul", "KBW side events", "blockchain event marketing korea", "crypto meetup seoul", "web3 events korea"]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight">
            Korea Crypto Event{" "}<br className="hidden md:block" />Marketing & Production
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            From Korea Blockchain Week side events to intimate investor dinners in Gangnam, we produce and promote crypto events in Seoul that deliver real connections and results.
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
            Plan Your Next Seoul Crypto Event
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="text-white/50 mb-8 max-w-2xl mx-auto">
            See our full event production capabilities or reach out to start planning your Korea event.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services/offline-event" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors text-sm">
              Event Service Details <ArrowRight className="w-4 h-4 ml-2" />
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

export default KoreaEventMarketing;
