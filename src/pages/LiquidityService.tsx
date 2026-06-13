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
import heroImg from "@/assets/platforms/comp-exchange.jpg";
import sizeImg from "@/assets/platforms/res-market.jpg";
import mmImg from "@/assets/platforms/comp-landscape.jpg";
import dayImg from "@/assets/platforms/res-trend.jpg";
import dexImg from "@/assets/platforms/res-onchain.jpg";
import compImg from "@/assets/platforms/seo-analytics.jpg";
import anaImg from "@/assets/platforms/pr-analytics.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const LiquidityService = () => {
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
      <SEOHead title="Crypto Market Making & Liquidity Provision Korea | ium Labs" description="Liquidity strategy and vetted market-making for crypto listings in Korea. Order-book depth and spread management for Upbit, Bithumb, and global venues — compliant, never wash trading." path="/services/liquidity" image={heroImg} keywords={["crypto market making Korea","liquidity provision crypto","Upbit liquidity","Bithumb market maker","exchange liquidity Korea"]} />
      <ServiceSchema name="Crypto Liquidity & Market Making" description="Liquidity strategy and vetted market-making coordination for crypto listings in Korea — Upbit, Bithumb, and global venues." url="/services/liquidity" serviceType={["Market Making", "Liquidity Provision", "Exchange Liquidity"]} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: "Liquidity & Market Making", url: "https://iumlabs.io/services/liquidity" }]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1200} height={800} /><div className="hero-overlay" />
        <div className="hero-center">
          <h1>Liquidity & <strong>Market Making</strong></h1>
          <p className="hero-desc">Healthy order books from listing day. We architect your Korea liquidity strategy and coordinate vetted market-making desks for Upbit, Bithumb, and global venues — so your token launches into depth, not a vacuum.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">2</div><div className="stat-sub">Korea Exchanges Covered</div></div>
          <div className="stat"><div className="stat-val">5+</div><div className="stat-sub">Vetted MM Desk Partners</div></div>
          <div className="stat"><div className="stat-val">24/7</div><div className="stat-sub">Liquidity Monitoring</div></div>
          <div className="stat"><div className="stat-val">T0</div><div className="stat-sub">Listing-Day Readiness</div></div>
        </div>
      </section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>A great listing into a thin book <strong>is a failed listing.</strong></h2></div>
          <div className="problem-right">
            <p>Korean exchanges and retail punish shallow liquidity. Wide spreads and a thin order book break price discovery on day one — exactly when attention and volatility peak.</p>
            <p>Most teams over-invest in the launch campaign and under-invest in the depth behind it. The result is a perfect listing that bleeds out into a vacuum. Liquidity is not an afterthought to GTM — it is part of it.</p>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "Liquidity Strategy & Sizing", desc: "We model the order-book depth, spread targets, and capital your listing actually needs across Upbit, Bithumb, and global venues — sized to your float and price, not a generic template.", img: sizeImg },
          { icon: "◉", title: "Market-Maker Matching", desc: "Access to vetted, reputable market-making desks. We broker the terms and manage the relationship — real partners with aligned incentives, never anonymous bots.", img: mmImg },
          { icon: "◈", title: "Listing-Day Liquidity", desc: "Coordinated depth and spread management from the first candle, when Korean retail attention and volatility are highest. Ready at T0, not days later.", img: dayImg },
          { icon: "◆", title: "CEX & DEX Coverage", desc: "Centralized order-book liquidity and on-chain DEX pool liquidity under one coordinated strategy — so depth holds wherever your volume actually trades.", img: dexImg },
          { icon: "◇", title: "Compliance-Aware Structuring", desc: "Liquidity programs structured to respect exchange rules and Korean regulation, coordinated with our compliance practice. Genuine depth and tight spreads — never fake volume or wash trading.", img: compImg },
          { icon: "◐", title: "Liquidity Analytics & Reporting", desc: "Real-time depth, spread, and volume-quality monitoring with transparent monthly reporting — so you can see exactly what your liquidity program is doing.", img: anaImg },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} width={600} height={400} /></div></div></div>
          </div>
        ))}
      </div></section>

      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From thin float to <strong>exchange-grade depth.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase I</div><div className="proc-title">Liquidity Assessment</div><div className="proc-text">Model depth, spread, and capital needs against your float, price, and target listing venues.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase II</div><div className="proc-title">Desk Matching</div><div className="proc-text">Match and broker terms with vetted market-making partners. Aligned incentives, clear scope.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase III</div><div className="proc-title">Listing Setup</div><div className="proc-text">Configure order-book depth and spread targets across CEX and DEX. Live and ready at T0.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase IV</div><div className="proc-title">Monitoring & Optimization</div><div className="proc-text">Track depth, spread, and volume quality. Tune the program monthly with transparent reporting.</div></div>
        </div>
      </div></section>

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "Do you make markets in-house?", a: "No. We architect the liquidity strategy and connect you with vetted, reputable market-making desks, then manage the relationship and reporting. This keeps incentives aligned and avoids conflicts of interest." },
          { q: "How much liquidity does an Upbit or Bithumb listing need?", a: "It depends on your float, price, and target spread. We model it per project — most serious KRW-pair listings require meaningful committed depth across both order books to hold a tight spread." },
          { q: "Is this compliant? Do you do volume or wash trading?", a: "No. We structure liquidity to respect exchange rules and Korean regulation, coordinated with our compliance team. We deliver genuine order-book depth and tight spreads — never fake volume or wash trading." },
          { q: "Do you cover CEX only, or DEX too?", a: "Both. We coordinate centralized order-book liquidity and on-chain DEX pool liquidity under one strategy, so depth holds wherever your token actually trades." },
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
export default LiquidityService;
