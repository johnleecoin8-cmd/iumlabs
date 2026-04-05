import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";

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

const kolServices = [
  {
    num: "01", title: "KOL Discovery & Vetting",
    desc: "Audience-fit scoring, engagement fraud filtering, niche mapping across YouTube, X, Telegram, and Naver. We find the voices your community already trusts.",
    tags: ["Fraud Filter", "Audience Fit", "Niche Map"],
  },
  {
    num: "02", title: "Campaign Strategy & Briefing",
    desc: "Narrative development, content calendars, posting cadences, and cross-platform sequencing — all localized for the Korean crypto audience.",
    tags: ["Narrative", "Calendar", "Localization"],
  },
  {
    num: "03", title: "Outreach & Negotiation",
    desc: "Rate negotiation, contract management, and deliverable alignment. We manage every DM thread so you don't have to.",
    tags: ["Contracts", "Rates", "Coordination"],
  },
  {
    num: "04", title: "Content Activation",
    desc: "Multi-platform launch across X threads, YouTube deep-dives, Telegram alpha calls, and Naver blog posts — orchestrated for maximum overlap.",
    tags: ["YouTube", "X / Twitter", "Telegram"],
  },
  {
    num: "05", title: "Performance Analytics",
    desc: "Real-time tracking of reach, engagement quality, sentiment, and conversion. We separate signal from vanity metrics.",
    tags: ["ROI Tracking", "Sentiment", "Reporting"],
  },
  {
    num: "06", title: "Scaling & Rotation",
    desc: "Double down on top performers, rotate underperformers, expand to micro-KOLs for grassroots saturation. Continuous optimization every cycle.",
    tags: ["Optimization", "Micro-KOL", "Scaling"],
  },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "Protocol deep-dive, target audience mapping, KOL landscape audit. We identify which voices your community already listens to.", time: "Week 1" },
  { num: "02", title: "Outreach", desc: "Shortlist curation, rate negotiation, brief alignment. Every KOL is personally vetted and matched to your narrative.", time: "Week 2" },
  { num: "03", title: "Activation", desc: "Coordinated multi-platform launch. X threads, YouTube reviews, Telegram calls, Naver posts — all timed for maximum overlap.", time: "Week 3–4" },
  { num: "04", title: "Amplification", desc: "Performance analysis, top-performer doubling, micro-KOL expansion, and community retargeting. Iterate every cycle.", time: "Ongoing" },
];

const caseStudies = [
  { slug: "bnb-chain", category: "L1 Infrastructure", metric: "+420%", label: "Korean trading volume surge in 2 weeks through a coordinated KOL blitz across YouTube and X" },
  { slug: "kucoin", category: "Exchange", metric: "35K", label: "New Korean users acquired via KOL-driven community campaigns paired with airdrop activations" },
  { slug: "mantra", category: "RWA Layer 1", metric: "$50M+", label: "Institutional pipeline sourced through Korean KOL introductions and investor dinner content" },
];

const InfluencerService = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korean Crypto KOL & Influencer Marketing | ium Labs"
        description="83 verified Korean crypto KOLs with 22.5M+ combined reach. YouTube, X, Telegram, Naver — managed campaigns with fraud filtering and ROI tracking."
        path="/services/influencer"
        keywords={['Korean KOL Marketing', 'Crypto Influencer Korea', 'Web3 KOL Network', 'Korean Crypto YouTube', 'Blockchain Influencer Marketing']}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0A0A0A]" />
        <div className="relative z-10 px-4 sm:px-8 text-center max-w-5xl mx-auto pt-24">
          <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase mb-6">KOL & Influencer Marketing</p>
          <h1 className="font-sans text-[2.2rem] sm:text-[4rem] md:text-[6rem] font-black text-white leading-[0.92] tracking-[-0.04em] mb-6">
            The right voices.<br />
            <span className="text-white/30">The right audience.</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/40 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            83 verified Korean crypto KOLs. 22.5M+ combined reach. YouTube, X, Telegram, Naver. Managed campaigns with fraud filtering and ROI tracking — not just shilling.
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
            { value: "83", label: "Verified KOLs" },
            { value: "22.5M", label: "Combined Reach" },
            { value: "36", label: "Campaigns Executed" },
            { value: "4.7%", label: "Avg. Engagement Rate" },
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
          Most KOL campaigns fail in Korea<br />
          <span className="text-white/20">because they hire global, not local.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/30 leading-relaxed max-w-2xl mx-auto">
          English-speaking crypto influencers don't move the Korean market. Korean retail lives on Naver, KakaoTalk, and local Telegram alpha channels. They trust Korean YouTubers, not global CT personalities. Without native KOLs who speak the language and live the ecosystem, your campaign is noise — expensive noise that never converts.
        </p>
      </section>

      {/* ===== SERVICE BREAKDOWN — numbered rows ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-14">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">End-to-End KOL Management</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            6 capabilities. <span className="text-white/20">One managed pipeline.</span>
          </h2>
        </div>
        <div className="flex flex-col">
          {kolServices.map((svc) => (
            <div
              key={svc.num}
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 bg-[#0c0c0e]">
        <div className="text-center mb-14">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">How We Work</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            From shortlist to <span className="text-white/20">market impact</span>
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
            KOL campaigns that <span className="text-white/20">moved markets</span>
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
            Why ium Labs for KOL
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.03] max-w-4xl mx-auto">
          {[
            { title: "83 vetted, not 500 random", desc: "Every KOL in our network has been verified for engagement authenticity, audience quality, and content relevance. We filter out bots and pay-to-play influencers before they touch your brand." },
            { title: "Native Korean operators", desc: "Our team negotiates in Korean, understands local rate norms, and manages KOLs who dominate Naver, KakaoTalk, and Korean Telegram — not just global CT." },
            { title: "Fraud filtering built in", desc: "We run engagement audits on every KOL before activation. Fake followers, bot comments, inflated impressions — we catch them so your budget goes to real reach." },
            { title: "ROI, not vanity metrics", desc: "We track on-chain conversions, community joins, and sentiment shifts — not just impressions. Every campaign report ties spend to measurable outcomes." },
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
            { q: "Do you have a specialized Korean KOL network?", a: "Yes. Beyond the global names, we have deep ties with Korea's top crypto YouTubers, Telegram alpha callers, and Naver bloggers who dominate the local scene." },
            { q: "What's the budget for a KOL campaign?", a: "It varies. We can run anything from a targeted micro-KOL blitz to a massive campaign with top-tier influencers. We'll help you build a plan that fits your goals." },
            { q: "How do you measure success?", a: "We look at more than just likes. We track reach, engagement quality, on-chain conversions, and sentiment to make sure people are actually talking about your project in a positive way." },
            { q: "Is the content organic?", a: "We prioritize authenticity. We work with KOLs who actually like your tech, so their threads and videos feel like a natural part of the conversation — not a scripted ad." },
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
          Ready for Korean<br /><span className="text-white/25">KOLs that convert?</span>
        </h2>
        <p className="text-sm sm:text-base text-white/25 max-w-lg mx-auto mb-10 relative z-10 leading-relaxed">
          30-minute strategy call. We'll map your KOL campaign — target KOLs, platforms, timeline, budget. No fluff.
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

export default InfluencerService;
