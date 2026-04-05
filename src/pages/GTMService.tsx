import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import gtmHeroImage from "@/assets/services/gtm-hero.avif";

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

const allServices = [
  {
    num: "01", title: "GTM Strategy", href: "/services/gtm",
    desc: "Competitive landscape analysis, Korea-fit narrative, launch timeline, and full market entry roadmap.",
    tags: ["Market Analysis", "Positioning", "Roadmap"],
  },
  {
    num: "02", title: "KOL & Influencer", href: "/services/influencer",
    desc: "170+ vetted Korean KOLs. YouTube, X, Telegram, Naver. Managed campaigns with fraud filtering and ROI tracking.",
    tags: ["YouTube", "X", "Naver"],
  },
  {
    num: "03", title: "PR & Media", href: "/services/pr",
    desc: "CoinDesk Korea, Block Media, TokenPost, mainstream outlets. Press releases, crisis comms, narrative control.",
    tags: ["CoinDesk KR", "BlockMedia", "TokenPost"],
  },
  {
    num: "04", title: "Community Management", href: "/services/community",
    desc: "24/7 native Korean managers. Telegram, Discord, KakaoTalk. Sentiment monitoring and engagement programs.",
    tags: ["Telegram", "Discord", "KakaoTalk"],
  },
  {
    num: "05", title: "Offline Events", href: "/services/offline-event",
    desc: "KBW side events, Seoul meetups, VIP dinners. Full logistics, venue sourcing, and post-event content.",
    tags: ["KBW", "Seoul", "Networking"],
  },
  {
    num: "06", title: "Deep Research", href: "/services/deep-research",
    desc: "On-chain wallet profiling, competitor share-of-voice, market ecosystem mapping, investment thesis support.",
    tags: ["On-chain", "Dune", "Analytics"],
  },
  {
    num: "07", title: "SEO & Paid Ads", href: "/services/seo-ads",
    desc: "Naver SEO, Google Ads, crypto ad networks. Keyword strategy, A/B testing, conversion optimization.",
    tags: ["Naver SEO", "Google Ads", "Performance"],
  },
  {
    num: "08", title: "AMA Hosting", href: "/services/ama",
    desc: "Telegram, Discord, X Spaces AMAs. Native Korean hosts, question curation, post-AMA analytics.",
    tags: ["Live AMA", "Korean Host", "Recap"],
  },
  {
    num: "09", title: "Compliance", href: "/services/compliance",
    desc: "VASP registration, PIPA compliance, regulatory landscape analysis, and compliance documentation.",
    tags: ["VASP", "PIPA", "Regulatory"],
  },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "Protocol deep-dive, competitor mapping, Korean market landscape audit. We identify exactly where the opportunity is.", time: "Week 1" },
  { num: "02", title: "Strategy", desc: "Custom GTM playbook. Channel strategy, KOL shortlists, content calendars, community scaffolding — localized end to end.", time: "Week 2" },
  { num: "03", title: "Launch", desc: "Multi-channel activation. KOL drops, community events, PR blitz, paid campaigns — orchestrated for maximum impact.", time: "Week 3–6" },
  { num: "04", title: "Scale", desc: "Performance analytics, A/B messaging, KOL rotation, double down on winners. Continuous iteration, monthly reporting.", time: "Ongoing" },
];

const caseStudies = [
  { slug: "bnb-chain", category: "L1 Infrastructure", metric: "+420%", label: "Korean trading volume surge in 2 weeks through KOL blitz and Seoul networking events" },
  { slug: "kucoin", category: "Exchange", metric: "35K", label: "New Korean users acquired via community airdrop, KOL campaigns, and Naver SEO" },
  { slug: "mantra", category: "RWA Layer 1", metric: "$50M+", label: "Institutional pipeline built through Korean investor dinners and BD introductions" },
];

const GTMService = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korea Web3 GTM Strategy | Go-To-Market Agency | ium Labs"
        description="Full-stack Go-To-Market strategy for Web3 projects entering Korea. Market analysis, KOL, PR, community, events, compliance — 9 integrated services."
        path="/services/gtm"
        keywords={['Korea Web3 GTM', 'Go-To-Market Korea', 'Web3 Market Entry Korea', 'Crypto GTM Strategy']}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={gtmHeroImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.15)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0A0A0A]" />
        <div className="relative z-10 px-4 sm:px-8 text-center max-w-5xl mx-auto pt-24">
          <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase mb-6">Go-To-Market Strategy</p>
          <h1 className="font-sans text-[2.2rem] sm:text-[4rem] md:text-[6rem] font-black text-white leading-[0.92] tracking-[-0.04em] mb-6">
            Enter Korea.<br />
            <span className="text-white/30">Own the market.</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/40 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            9 integrated services. One partner. Full-stack execution for the #2 crypto market globally. From first contact to market dominance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CalendlyButton className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all">
              Book Strategy Call
            </CalendlyButton>
            <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-4 border border-white/[0.1] text-white/40 text-sm rounded-full hover:border-white/[0.2] hover:text-white/70 transition-all">
              See Our Work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LOGO MARQUEE ===== */}
      <div className="py-4 sm:py-6 overflow-hidden border-y border-white/[0.04]">
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
            <Link key={index} to={`/projects/${client.slug}`} className="flex items-center gap-2 sm:gap-3 mx-1 sm:mx-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 hover:bg-zinc-800/80 transition-all duration-300 flex-shrink-0">
              <img src={client.logo} alt={client.name} loading="lazy" decoding="async" className={`h-4 sm:h-7 w-auto max-w-[70px] sm:max-w-[140px] object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`} />
              <span className="text-white/75 text-[11px] sm:text-sm font-medium whitespace-nowrap">{client.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== STATS ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { value: "$7B+", label: "Client Valuation" },
            { value: "230+", label: "KOL Network" },
            { value: "22+", label: "Projects Launched" },
            { value: "70+", label: "Events Hosted" },
          ].map((stat, i) => (
            <div key={i} className="py-8 sm:py-12 text-center border-r border-white/[0.04] last:border-r-0">
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tighter">{stat.value}</div>
              <div className="text-[10px] text-white/20 tracking-[0.15em] uppercase mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-[1.05] tracking-tight">
          Most projects fail in Korea<br />
          <span className="text-white/20">because they never truly enter it.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/30 leading-relaxed max-w-2xl mx-auto">
          16M active crypto users. $4B+ daily volume on Upbit alone. But translated decks and global KOLs don't work here. Korea is trust-first, community-driven, and moves faster than any other market. You need operators on the ground — not a deck from Singapore.
        </p>
      </section>

      {/* ===== 9 SERVICES — numbered rows ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-14">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">Full-Stack Capabilities</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            9 services. <span className="text-white/20">One integrated team.</span>
          </h2>
        </div>
        <div className="flex flex-col">
          {allServices.map((svc) => (
            <Link
              key={svc.num}
              to={svc.href}
              className="group grid grid-cols-[40px_1fr] lg:grid-cols-[60px_240px_1fr_auto] gap-3 lg:gap-6 items-center py-5 sm:py-7 border-t border-white/[0.04] last:border-b last:border-white/[0.04] relative transition-all hover:bg-white/[0.015]"
            >
              <span className="text-[11px] text-white/10 font-mono group-hover:text-white/30 transition-colors">
                {svc.num}
              </span>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white/80 group-hover:text-white transition-colors tracking-tight">
                {svc.title}
              </h3>
              <p className="hidden lg:block text-[13px] text-white/25 leading-relaxed group-hover:text-white/40 transition-colors">
                {svc.desc}
              </p>
              <div className="hidden lg:flex items-center gap-2">
                {svc.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-0.5 border border-white/[0.05] rounded-full text-white/15 group-hover:border-white/[0.1] group-hover:text-white/30 transition-all whitespace-nowrap">
                    {tag}
                  </span>
                ))}
                <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-white/40 group-hover:translate-x-1 transition-all ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 bg-[#0c0c0e]">
        <div className="text-center mb-14">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">How We Work</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            From zero to <span className="text-white/20">market presence</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
          <div className="hidden lg:block absolute top-4 left-[60px] right-[60px] h-px bg-white/[0.04]" />
          {processSteps.map((step, i) => (
            <div key={i} className="group lg:px-6 relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-all relative z-10" />
                <span className="text-[10px] text-white/15 tracking-[0.15em] uppercase group-hover:text-white/30 transition-colors">{step.num}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{step.title}</h3>
              <p className="text-[13px] text-white/25 leading-relaxed mb-4">{step.desc}</p>
              <span className="text-[10px] text-white/20 px-2.5 py-1 border border-white/[0.06] rounded-full">{step.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-12">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">Results</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Campaigns that <span className="text-white/20">moved markets</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              to={`/projects/${cs.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group block border border-white/[0.04] rounded-2xl p-7 sm:p-9 hover:border-white/[0.08] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-[9px] text-white/15 tracking-[0.12em] uppercase block pb-5 mb-5 border-b border-white/[0.04]">{cs.category}</span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-3">{cs.metric}</div>
              <p className="text-[13px] text-white/30 leading-relaxed mb-5">{cs.label}</p>
              <span className="text-[11px] text-white/15 group-hover:text-white/40 transition-colors">
                Read case study →
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/projects" className="text-sm text-white/20 hover:text-white/50 transition-colors">
            View all 22+ projects →
          </Link>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 bg-[#0c0c0e]">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Why ium Labs
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.03] max-w-4xl mx-auto">
          {[
            { title: "Operators, not account managers", desc: "Every campaign is run by people who've held BD and growth roles at exchanges and protocols. Your GTM isn't delegated to juniors." },
            { title: "Native Korean team", desc: "Not translated decks. Localized strategy from people who live the ecosystem daily — Naver, KakaoTalk, Korean CT, DC Inside." },
            { title: "Full-stack from day one", desc: "KOL, PR, community, events, SEO, research, compliance — 9 services under one roof. No vendor coordination overhead." },
            { title: "Retention over reach", desc: "We optimize for 30-day community retention and on-chain stickiness. Vanity metrics don't build markets." },
          ].map((card, i) => (
            <div key={i} className="bg-[#0c0c0e] p-7 sm:p-10 group hover:bg-[#111] transition-all cursor-default">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 tracking-tight">{card.title}</h3>
              <p className="text-[13px] text-white/25 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight text-center mb-10">FAQ</h2>
        <div className="max-w-3xl mx-auto">
          {[
            { q: "What makes Korean GTM different?", a: "Korea is trust-first, retail-driven. Projects need native community managers, localized narratives, local KOLs — not translated global campaigns. We handle all of this in-house from Seoul." },
            { q: "How long does a Korea launch take?", a: "Focused launch: 2–3 weeks. Full GTM engagement: 2–3 months covering analysis, community, KOL, PR, events, and ongoing optimization." },
            { q: "What's the budget range?", a: "Focused campaigns start at $15K/month. Full-stack GTM across all 9 services runs $30K–$50K/month." },
            { q: "Do you work with pre-TGE projects?", a: "Yes. We help pre-launch projects with Korean positioning, narrative building, community scaffolding, and KOL pre-commitment before launch day." },
          ].map((item, i) => (
            <div key={i} className="py-6 sm:py-8 border-b border-white/[0.04] first:border-t cursor-default">
              <p className="text-sm sm:text-base font-semibold text-white mb-2">{item.q}</p>
              <p className="text-[13px] text-white/25 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-24 sm:py-36 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-3xl pointer-events-none" />
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-[0.92] tracking-[-0.04em] mb-5 relative z-10">
          Ready to enter<br /><span className="text-white/25">Korea?</span>
        </h2>
        <p className="text-sm sm:text-base text-white/25 max-w-lg mx-auto mb-10 relative z-10 leading-relaxed">
          30-minute strategy call. We'll map your market entry — channels, KOLs, timeline, budget. No fluff.
        </p>
        <CalendlyButton className="inline-flex items-center gap-2 px-9 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.1)] transition-all relative z-10">
          Book Strategy Call <ArrowRight className="w-4 h-4" />
        </CalendlyButton>
      </section>

      <FooterLinksSection />
      <div className="border-t border-white/[0.04]"><Footer /></div>
    </div>
  );
};

export default GTMService;
