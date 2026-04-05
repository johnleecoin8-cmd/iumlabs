import { Link } from "react-router-dom";
import { ArrowRight, Search, Globe, Megaphone, Users, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import gtmHeroImage from "@/assets/services/gtm-hero.avif";
import { projectsData } from "@/data/projectsData";

// Campaign images
import bnbHanokEventImg from "@/assets/campaigns/bnb-hanok-event.png";
import peaqBoothEventImg from "@/assets/campaigns/peaq-booth-event.png";
import kucoinPartyEventImg from "@/assets/campaigns/kucoin-party-event.png";

// Client logos — same as home hero
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import spacecoinLogo from "@/assets/logos/spacecoin.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import aptosLogo from "@/assets/logos/aptos.png";
import kiteLogo from "@/assets/logos/kite.png";

const clientLogos = [
  { name: "BNB", logo: bnbLogo, noInvert: false, slug: "bnb-chain" },
  { name: "KuCoin", logo: kucoinLogo, noInvert: true, slug: "kucoin" },
  { name: "Polygon", logo: polygonLogo, noInvert: false, slug: "polygon" },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false, slug: "ondo" },
  { name: "Bybit", logo: bybitLogo, noInvert: false, slug: "bybit" },
  { name: "Peaq", logo: peaqLogo, noInvert: true, slug: "peaq" },
  { name: "Spacecoin", logo: spacecoinLogo, noInvert: true, slug: "spacecoin" },
  { name: "Tria", logo: triaLogo, noInvert: true, slug: "tria" },
  { name: "Mantra", logo: mantraLogo, noInvert: true, slug: "mantra" },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true, slug: "sahara-ai" },
  { name: "FOGO", logo: fogoLogo, noInvert: true, slug: "fogo" },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true, slug: "synfutures" },
  { name: "Aptos", logo: aptosLogo, noInvert: true, slug: "aptos" },
  { name: "Kite", logo: kiteLogo, noInvert: true, slug: "kite" },
];

const services = [
  {
    icon: Search,
    title: "Market Intelligence",
    desc: "Full scan of the Korean crypto landscape. Competitor share-of-voice, on-chain wallet profiling, opportunity mapping, and regulatory review.",
    tags: ["Naver", "On-chain", "Dune"],
  },
  {
    icon: Globe,
    title: "Brand Localization",
    desc: "Your global narrative doesn't work here. We rebuild it. Korea-fit positioning, localized content across Naver and Kakao, community infra on Telegram and KakaoTalk.",
    tags: ["Kakao", "Naver", "Telegram"],
  },
  {
    icon: Megaphone,
    title: "KOL & Media Launch",
    desc: "Tier-1 coverage through BlockMedia, CoinDesk Korea, TokenPost. Verified Korean KOL deployment across YouTube, X, Telegram. Structured AMAs that drive real engagement.",
    tags: ["PR", "KOL", "AMA"],
  },
  {
    icon: Users,
    title: "Community Growth",
    desc: "24/7 native Korean community managers. Telegram and Discord moderation, KakaoTalk open chat, sentiment monitoring, engagement programs that keep communities loyal.",
    tags: ["TG", "Discord", "Kakao"],
  },
  {
    icon: Rocket,
    title: "Events & Scale",
    desc: "Offline events in Seoul, KBW side events, VIP networking dinners. Ambassador programs, retention analytics, monthly performance reporting.",
    tags: ["Offline", "KBW", "Growth"],
  },
];

const processSteps = [
  { phase: "Phase 01", title: "Market Intelligence", desc: "Deep-dive into your protocol, competitors, and the Korean landscape. Map narrative gaps and identify growth levers.", time: "Week 1–2" },
  { phase: "Phase 02", title: "GTM Architecture", desc: "Custom playbook: channel strategy, KOL shortlists, content calendars, community scaffolding — all localized for Korea.", time: "Week 2–3" },
  { phase: "Phase 03", title: "Campaign Execution", desc: "Multi-channel activation. KOL drops, community events, PR blitz — orchestrated for maximum narrative velocity.", time: "Week 3–8" },
  { phase: "Phase 04", title: "Optimize & Scale", desc: "Weekly reports, A/B messaging, rotate KOLs, double down on winners. Continuous iteration until dominance.", time: "Ongoing" },
];

const approachCards = [
  { icon: "🧬", title: "Operator-led, not account-managed", desc: "Every campaign is run by operators who've held BD and marketing roles at exchanges and protocols. No juniors running your GTM." },
  { icon: "🌏", title: "Native in every channel", desc: "Korean campaigns run by Koreans on Korean platforms. Not translated decks — localized strategy from people who live the ecosystem." },
  { icon: "📊", title: "Data-driven decisions", desc: "On-chain analytics, community sentiment tracking, CT velocity metrics — combined for real-time campaign optimization." },
  { icon: "🔄", title: "Retention, not just reach", desc: "We optimize for 30-day retention and community stickiness, not just impressions. Post-campaign engagement is measured, not assumed." },
];

const GTMService = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korea Web3 GTM Strategy | Go-To-Market Agency | ium Labs"
        description="Full-stack Go-To-Market strategy for Web3 projects entering Korea. Market analysis, brand positioning, and actionable GTM roadmaps."
        path="/services/gtm"
        keywords={['Korea Web3 GTM', 'Go-To-Market Korea', 'Web3 Market Entry Korea', 'Crypto GTM Strategy']}
      />
      <Navbar />

      {/* ===== HERO — center aligned ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={gtmHeroImage} alt="Korea" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.2)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 60%, rgba(255,255,255,0.03) 0%, transparent 60%)" }} />
        <div className="relative z-10 px-4 sm:px-8 text-center max-w-4xl mx-auto pt-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/[0.08] rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] font-mono text-white/40 tracking-wider uppercase">Accepting Q2 2026 Clients</span>
          </div>
          <h1 className="font-sans text-[2rem] sm:text-[3.5rem] md:text-[5.5rem] font-black text-white leading-[0.95] tracking-[-0.03em] mb-6">
            Korea Market<br />
            <span className="text-white/40">Entry & Growth</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/45 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Full-stack GTM for Web3 projects entering the #2 crypto market globally. From positioning to launch day — one partner, full execution.
          </p>
          <div className="flex items-center justify-center gap-3">
            <CalendlyButton className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 transition-all">
              Book Strategy Call
            </CalendlyButton>
            <Link to="/projects" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/[0.12] text-white/50 text-sm rounded-full hover:border-white/[0.2] hover:text-white transition-all">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LOGO MARQUEE — same as home hero ===== */}
      <div className="relative z-[14] py-4 sm:py-6 overflow-hidden border-b border-white/[0.06]">
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
            <Link key={index} to={`/projects/${client.slug}`} className="flex items-center gap-2 sm:gap-3 mx-1 sm:mx-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 hover:bg-zinc-800/80 transition-all duration-300 flex-shrink-0">
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className={`h-4 sm:h-7 w-auto max-w-[70px] sm:max-w-[140px] object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`}
              />
              <span className="text-white/75 text-[11px] sm:text-sm font-medium whitespace-nowrap">
                {client.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== STATS BAR ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {[
            { value: "$7B+", label: "Client Valuation" },
            { value: "230+", label: "KOL Network" },
            { value: "22+", label: "Korea Entries" },
            { value: "70+", label: "Events Hosted" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0A0A0A] p-6 sm:p-8 text-center">
              <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-white/25 font-mono uppercase tracking-[0.15em] mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== THE PROBLEM — center ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 text-center">
        <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-medium mb-4 block">The Problem</span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-5 leading-[1.05] tracking-tight">
          Most global projects <span className="text-white/30">fail in Korea.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/40 leading-relaxed max-w-2xl mx-auto">
          Korea has 16M active crypto users and Upbit processes $4B+ daily. But translated campaigns, global KOLs, and zero Korean presence don't work here. The market is trust-first, retail-driven, and brutally fast. We solve this from Seoul.
        </p>
      </section>

      {/* ===== SERVICES — numbered rows ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-12">
          <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-medium mb-3 block">What We Build</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            End-to-end GTM <span className="text-white/30">infrastructure</span>
          </h2>
          <p className="text-sm text-white/35 max-w-md mx-auto mt-4 leading-relaxed">
            Five core service pillars, each with dedicated operators who've shipped in-market for the chains that matter.
          </p>
        </div>
        <div className="flex flex-col">
          {services.map((item, i) => (
            <div key={i} className="group grid grid-cols-[48px_1fr] lg:grid-cols-[80px_1fr_1.2fr_200px] gap-3 lg:gap-8 items-center py-6 sm:py-8 border-t border-white/[0.06] last:border-b last:border-white/[0.06] relative cursor-default transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="font-mono text-xs text-white/15 group-hover:text-white/30 transition-colors relative z-10">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-white/50 transition-colors relative z-10 tracking-tight">
                {item.title}
              </h3>
              <p className="hidden lg:block text-sm text-white/40 leading-relaxed relative z-10">
                {item.desc}
              </p>
              <div className="hidden lg:flex flex-wrap gap-1.5 justify-end relative z-10">
                {item.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] px-2.5 py-1 border border-white/[0.06] rounded-full text-white/20 group-hover:border-white/[0.12] group-hover:text-white/40 transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY US — 2x2 cards ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0e0f12] to-[#0A0A0A] pointer-events-none" />
        <div className="relative z-10">
          <div className="text-center mb-10">
            <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-medium mb-3 block">Why Us</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
              Not another agency. <span className="text-white/50">A growth system.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.04]">
            {approachCards.map((card, i) => (
              <div key={i} className="group bg-[#0e0f12] hover:bg-[#131419] p-6 sm:p-10 cursor-default transition-all relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-2xl sm:text-3xl block mb-5 grayscale group-hover:grayscale-0 transition-all">{card.icon}</span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight relative z-10">{card.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed relative z-10">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS TIMELINE ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-12">
          <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-medium mb-3 block">How We Operate</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Zero to <span className="text-white/50">dominance</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 relative">
          <div className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-white/[0.06]" />
          {processSteps.map((step, i) => (
            <div key={i} className="group lg:px-5 cursor-default relative text-center lg:text-left">
              <div className="hidden lg:block w-3 h-3 rounded-full border-2 border-white/[0.08] bg-[#0A0A0A] mb-8 relative z-10 group-hover:border-white group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all mx-auto lg:mx-0" />
              <span className="font-mono text-[10px] text-white/20 tracking-[0.15em] uppercase mb-2 block group-hover:text-white/30 transition-colors">{step.phase}</span>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight">{step.title}</h3>
              <p className="text-sm text-white/35 leading-relaxed mb-3">{step.desc}</p>
              <span className="inline-block font-mono text-[11px] text-white/30 px-2.5 py-1 border border-white/20 rounded-full">{step.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 bg-[#0e0f12]">
        <div className="text-center mb-10">
          <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-medium mb-3 block">Proof of Work</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Campaigns that <span className="text-white/50">moved markets</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { slug: "bnb-chain", category: "Infrastructure", metric: "+420%", metricLabel: "Korean volume surge in 2 weeks" },
            { slug: "kucoin", category: "Exchange", metric: "35K", metricLabel: "New Korean users acquired" },
            { slug: "mantra", category: "RWA L1", metric: "$50M+", metricLabel: "Pipeline through KR institutional entry" },
          ].map((cs) => (
            <Link
              key={cs.slug}
              to={`/projects/${cs.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group block border border-white/[0.06] rounded-2xl p-5 sm:p-7 bg-[#0A0A0A] hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <span className="font-mono text-[10px] text-white/20 tracking-[0.12em] uppercase block pb-4 mb-4 border-b border-white/[0.06]">{cs.category}</span>
              <div className="text-3xl sm:text-4xl font-black text-white/50 tracking-tight mb-2">{cs.metric}</div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">{cs.metricLabel}</p>
              <div className="flex items-center justify-center gap-1.5 text-white/25 group-hover:text-white/60 transition-colors text-xs">
                <span className="group-hover:underline underline-offset-4">View case</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
            View all 22+ projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== WHO THIS IS FOR ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-8">
          <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-medium mb-3 block">Who This Is For</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Three types of projects we work with</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Pre-Launch", desc: "Building toward TGE. Need Korean positioning, narrative, and community before launch day." },
            { title: "Post-Launch Stalling", desc: "Launched globally but Korea traction is flat. Need local team, local KOLs, local strategy." },
            { title: "Scaling in Korea", desc: "Already have traction. Need to accelerate with events, partnerships, and deeper community." },
          ].map((item, i) => (
            <div key={i} className="group p-5 sm:p-6 border border-white/[0.06] rounded-xl hover:border-white/30 hover:bg-white/[0.02] transition-all cursor-default text-center">
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-white/50 transition-colors">{item.title}</h3>
              <p className="text-[13px] text-white/35 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-10">
          <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-medium mb-3 block">Common Questions</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">FAQ</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          {[
            { q: "What makes Korean GTM different?", a: "Korea is trust-first, retail-driven. Projects need native community managers, localized narratives, local KOLs — not translated global campaigns. We handle all of this in-house from Seoul." },
            { q: "How long does a Korea launch take?", a: "Focused launch: 2-3 weeks. Full GTM engagement: 2-3 months covering analysis, community, KOL, PR, and events." },
            { q: "What's the budget range?", a: "Focused campaigns start at $15K/month. Full-stack GTM (PR + community + KOL + events) runs $30K–$50K/month." },
          ].map((item, i) => (
            <div key={i} className="group py-7 sm:py-9 border-b border-white/[0.06] first:border-t cursor-default">
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs text-white/10 group-hover:text-white/30 transition-colors pt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-base sm:text-lg font-semibold text-white mb-2">{item.q}</p>
                  <p className="text-sm text-white/40 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-20 sm:py-32 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.04] pointer-events-none" />
        <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-medium mb-4 block relative z-10">Ready to Scale</span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-[-0.03em] mb-4 relative z-10">
          Let's build your<br /><span className="text-white/50">Korean market.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/35 max-w-md mx-auto mb-8 relative z-10 leading-relaxed">
          30-minute strategy call. We'll show you exactly how we'd attack the Korean market — no fluff, just signal.
        </p>
        <CalendlyButton className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] transition-all relative z-10">
          Book Strategy Call <ArrowRight className="w-4 h-4" />
        </CalendlyButton>
      </section>

      <FooterLinksSection />
      <div className="border-t border-white/10"><Footer /></div>
    </div>
  );
};

export default GTMService;
