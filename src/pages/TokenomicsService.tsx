import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ContactFormSection from "@/components/ContactFormSection";
import ServiceNav from "@/components/ServiceNav";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/platforms/res-competitor.jpg";
import distImg from "@/assets/platforms/res-onchain.jpg";
import floatImg from "@/assets/platforms/res-market.jpg";
import seqImg from "@/assets/platforms/comp-exchange.jpg";
import timingImg from "@/assets/platforms/res-thesis.jpg";
import unlockImg from "@/assets/platforms/seo-report.jpg";
import modelImg from "@/assets/platforms/res-thesis.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const TokenomicsService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openCap, setOpenCap] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleCap = useCallback((i: number) => setOpenCap(p => p === i ? null : i), []);
  const toggleFaq = useCallback((i: number) => setOpenFaq(p => p === i ? null : i), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-detail .hero-label", { opacity: 0, y: 20, duration: .8, delay: .2 });
      gsap.from(".svc-detail .hero h1", { opacity: 0, y: 50, duration: 1.2, delay: .3, ease: "power3.out" });
      gsap.from(".svc-detail .hero-desc", { opacity: 0, y: 30, duration: 1, delay: .7 });
      gsap.from(".svc-detail .hero-stats-bar .stat", { opacity: 0, y: 20, duration: .8, delay: .9, stagger: .1 });
      gsap.utils.toArray<HTMLElement>(".svc-detail .lbl,.svc-detail .stat,.svc-detail .problem-left,.svc-detail .problem-right,.svc-detail .cap-block,.svc-detail .proc-step,.svc-detail .tier-card,.svc-detail .plat,.svc-detail .case-split,.svc-detail .faq-item,.svc-detail .invite h2,.svc-detail .invite-kr,.svc-detail .highlight-box").forEach(el => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }});
      });
    }, containerRef);
    return () => { ctx.revert(); };
  }, []);

  return (
    <div className="svc-detail" ref={containerRef}>
      <SEOHead title="Tokenomics & Listing Strategy for Korea | ium Labs" description="Token distribution, vesting, unlock, and float design engineered for the Korean retail market — plus KRW-vs-BTC sequencing and listing-window timing around catalysts like KBW." path="/services/tokenomics" image={heroImg} keywords={["crypto tokenomics Korea","listing strategy Korea","token unlock design","KRW market strategy","token float planning","TGE Korea"]} />
      <ServiceSchema name="Tokenomics & Listing Strategy" description="Token distribution, vesting, unlock, and listing-supply design tuned for the Korean retail market, with KRW-vs-BTC sequencing and catalyst timing." url="/services/tokenomics" serviceType={["Tokenomics Advisory", "Listing Strategy", "Token Distribution Design"]} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: "Tokenomics & Listing Strategy", url: "https://iumlabs.io/services/tokenomics" }]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1200} height={800} /><div className="hero-overlay" />
        <div className="hero-center">
          <h1>Tokenomics & <strong>Listing Strategy</strong></h1>
          <p className="hero-desc">Korean retail trades the float, the unlock, and the catalyst — not the whitepaper. We design distribution, vesting, and listing supply for how this market actually behaves, and sequence your KRW and BTC market entries around the timing windows that move volume.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">T0</div><div className="stat-sub">Listing-Window Anchored</div></div>
          <div className="stat"><div className="stat-val">2.4×</div><div className="stat-sub">Post-Chuseok Volume Window*</div></div>
          <div className="stat"><div className="stat-val">KRW</div><div className="stat-sub">+ BTC Market Sequencing</div></div>
          <div className="stat"><div className="stat-val">4</div><div className="stat-sub">Exchanges Modeled</div></div>
        </div>
      </section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>The same token can moon or bleed — it's the <strong>unlock and the timing.</strong></h2></div>
          <div className="problem-right">
            <p>Korean retail is unusually sensitive to float and unlock schedules. A concentrated or opaque distribution is both a day-one price risk and, under the new rules, a delisting trigger. Get the supply wrong and even a flawless campaign bleeds out.</p>
            <p>Timing compounds it. Volume, attention, and KOL impact cluster around the listing window and Korea-specific catalysts — KBW week, post-holiday windows. A token launched into the wrong week leaves most of its potential on the table. We design both: the supply structure and the moment.</p>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "Distribution & Allocation Design", desc: "Allocation across team, investors, community, treasury, and liquidity — structured to read as credible to Korean retail and to pass the issuer-transparency and distribution scrutiny exchanges now apply.", img: distImg },
          { icon: "◉", title: "Listing Supply & Float Planning", desc: "How much circulating supply hits the book at T0, and how it grows. We size the initial float for healthy price discovery instead of a thin-float spike that craters on the first unlock.", img: floatImg },
          { icon: "◈", title: "Vesting & Unlock Scheduling", desc: "Cliff and unlock schedules modeled against the Korean market's sensitivity to supply shocks — so unlocks land as non-events, not sell-side avalanches.", img: unlockImg },
          { icon: "◆", title: "KRW vs BTC Market Sequencing", desc: "Which market to enter first, and when. The KRW market is the prize; a BTC-pair listing can build trading history first. We sequence entries as a deliberate strategy, not an afterthought.", img: seqImg },
          { icon: "◇", title: "Catalyst & Timing Modeling", desc: "We anchor the launch to the windows that actually move Korean volume — KBW week, post-holiday windows (post-Chuseok periods have shown materially higher first-weeks volume), and the listing window itself.", img: timingImg },
          { icon: "◐", title: "Pre-Listing Readiness Alignment", desc: "Tokenomics that align with what the listing application demands — disclosure-ready supply tables, defensible utility, and a structure our CEX Listing Advisory can take straight into an exchange dossier.", img: modelImg },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} width={600} height={400} /></div></div></div>
          </div>
        ))}
      </div></section>

      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>Supply and timing, <strong>designed together.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase I</div><div className="proc-title">Audit & Benchmark</div><div className="proc-text">Review current tokenomics against Korean-market comparables and the new listing criteria.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase II</div><div className="proc-title">Supply Design</div><div className="proc-text">Model distribution, float, and unlock schedules for healthy price discovery and disclosure-readiness.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase III</div><div className="proc-title">Sequencing & Timing</div><div className="proc-text">Plan KRW-vs-BTC market entry and anchor the launch to the right catalyst window.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase IV</div><div className="proc-title">Listing Handoff</div><div className="proc-text">Deliver a disclosure-ready structure straight into the CEX listing dossier and GTM plan.</div></div>
        </div>
      </div></section>

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "Do you redesign existing tokenomics or only new launches?", a: "Both. For pre-launch projects we design from scratch; for live tokens we optimize float, unlock cadence, and listing supply ahead of a Korea entry. The goal is a structure that survives Korean retail behavior and the new exchange criteria." },
          { q: "Why does the Korean market need its own tokenomics view?", a: "Korean retail is unusually sensitive to float and unlocks, volume clusters around listing windows and local catalysts, and the 2024–2025 listing rules explicitly penalize concentrated distribution and post-listing pumps. A globally 'fine' structure can still misfire here." },
          { q: "What is the *post-Chuseok window?", a: "Korea's market shows recurring timing effects around holidays and KBW week. Our research has observed materially higher first-weeks trading volume in certain post-Chuseok windows. We use these patterns as inputs to launch timing — directional signals, not guarantees." },
          { q: "How does this connect to listing and liquidity?", a: "Directly. Tokenomics feeds the listing application (disclosure-ready supply tables, defensible utility) and the liquidity plan (float sizing drives the depth you need). We design all three as one system, not separate vendors." },
        ].map((faq, i) => (
          <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
            <div className="faq-q" role="button" tabIndex={0} onClick={() => toggleFaq(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(i); } }} aria-expanded={openFaq === i}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      <section className="svc-footer">
        <ServiceNav />
        <ContactFormSection />
        <FooterLinksSection />
        <Footer />
      </section>
    </div>
  );
};
export default TokenomicsService;
