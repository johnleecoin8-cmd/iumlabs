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
import heroImg from "@/assets/platforms/res-thesis.jpg";
import vcImg from "@/assets/platforms/pr-interview.jpg";
import otcImg from "@/assets/platforms/res-market.jpg";
import custodyImg from "@/assets/platforms/comp-vasp.jpg";
import structImg from "@/assets/platforms/comp-legal.jpg";
import networkImg from "@/assets/platforms/pr-analytics.jpg";
import timingImg from "@/assets/platforms/comp-landscape.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const CapitalService = () => {
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
      <SEOHead title="Capital & OTC Introduction — Korean Crypto VCs, OTC & Custody | ium Labs" description="Warm introductions to Korea's crypto capital network: VCs and strategic investors, licensed OTC desks, and institutional custody — plus fund-ready structuring. Introductions and structuring, not capital deployment." path="/services/capital" image={heroImg} keywords={["Korean crypto VC","crypto OTC Korea","Hashed introduction","crypto capital Korea","institutional custody Korea","Web3 fundraising Korea"]} />
      <ServiceSchema name="Capital & OTC Introduction" description="Introductions to Korean crypto VCs, strategic investors, licensed OTC desks, and institutional custodians, plus offshore-entity and fund-ready structuring advisory." url="/services/capital" serviceType={["Capital Introduction", "OTC Introduction", "Investor Relations", "Fundraising Advisory"]} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: "Capital & OTC Introduction", url: "https://iumlabs.io/services/capital" }]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1200} height={800} /><div className="hero-overlay" />
        <div className="hero-center">
          <h1>Capital & <strong>OTC Introduction</strong></h1>
          <p className="hero-desc">Korea's capital network is relationship-gated and largely invisible from the outside. We open the door — warm introductions to crypto VCs and strategic investors, licensed OTC desks, and institutional custody, plus the structuring to make you fund-ready. We connect and structure; we never deploy capital or promise a check.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">VC</div><div className="stat-sub">+ Strategic Investors</div></div>
          <div className="stat"><div className="stat-val">OTC</div><div className="stat-sub">Licensed Desks Only</div></div>
          <div className="stat"><div className="stat-val">KODA</div><div className="stat-sub">Institutional Custody</div></div>
          <div className="stat"><div className="stat-val">KBW</div><div className="stat-sub">Deal Ecosystem Access</div></div>
        </div>
      </section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Korea's real capital is <strong>relationship-gated.</strong></h2></div>
          <div className="problem-right">
            <p>The deployable on-shore fiat pool is still constrained — corporate exchange trading is only partially open, and unlicensed OTC is a prosecuted crime. The capital that actually moves runs through crypto-native VCs, strategic corporate arms, licensed desks, and cross-border flows you can't cold-email your way into.</p>
            <p>We give you the warm introductions and the structuring to be taken seriously: the right desks, the right funds, set up the right way. As Phase-2 regulation opens corporate participation, the relationships you build now become the capital you deploy later.</p>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "Korean VC & Strategic Introductions", desc: "Warm intros to Korea's crypto-native funds and strategic corporate arms for token and equity rounds — the players who actually write checks and open ecosystems, not a cold list.", img: vcImg },
          { icon: "◉", title: "Licensed OTC Desk Connections", desc: "Connections to VASP-registered OTC desks for compliant execution. Domestic desks broker crypto-to-crypto today and are positioned for crypto-to-cash as regulation opens. We never touch unlicensed OTC.", img: otcImg },
          { icon: "◈", title: "Institutional Custody Onboarding", desc: "Onboarding to institutional-grade Korean custodians (bank-backed and independent) — the plumbing every institutional allocation and treasury needs before it can move.", img: custodyImg },
          { icon: "◆", title: "Offshore Entity & Fund-Ready Structuring", desc: "Advisory on the entity, custody, and compliance setup that makes you investable — so when you sit in front of a fund, the structure is already right.", img: structImg },
          { icon: "◇", title: "Deal-Ecosystem Access", desc: "Warm access to the Korea Blockchain Week deal ecosystem where Korean and cross-border capital converge — curated introductions, not a badge and a hope.", img: networkImg },
          { icon: "◐", title: "Phase-2 Positioning", desc: "We help you build the relationships and compliance scaffolding now, so you're first in line the day corporate market participation and the Digital Asset Basic Act open the on-shore capital taps.", img: timingImg },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} width={600} height={400} /></div></div></div>
          </div>
        ))}
      </div></section>

      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>Be fund-ready, then <strong>get introduced.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase I</div><div className="proc-title">Readiness & Fit</div><div className="proc-text">Assess your raise, structure, and stage; identify the right funds, desks, and custodians.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase II</div><div className="proc-title">Structuring</div><div className="proc-text">Advise on offshore entity, custody, and compliance so you present as investable.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase III</div><div className="proc-title">Introductions</div><div className="proc-text">Warm, curated introductions to VCs, strategic arms, OTC desks, and custodians.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase IV</div><div className="proc-title">Ongoing Network</div><div className="proc-text">Keep you in the deal ecosystem and positioned for Phase-2 corporate capital.</div></div>
        </div>
      </div></section>

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "Do you invest or guarantee fundraising?", a: "No. We are not a fund and we do not deploy capital. We provide warm introductions and fund-ready structuring, on an introduction basis — clearly separated from any investment outcome. We open doors; the capital decision is the investor's." },
          { q: "Can you help a Korean corporate buy crypto?", a: "Not in a way the law doesn't yet permit. Corporate on-exchange trading is only partially open in Korea, and we never facilitate unlicensed OTC, which is a criminal offense. We work strictly through licensed desks and compliant structures." },
          { q: "What kind of OTC can you actually arrange?", a: "Introductions to VASP-registered, licensed desks. Today domestic desks broker crypto-to-crypto; crypto-to-cash for corporates depends on regulation that is still opening. We position you for both, compliantly." },
          { q: "Why build these relationships now if corporate capital isn't fully open?", a: "Because the relationships and compliance scaffolding take time, and the firms that have them will be first to deploy when Phase-2 regulation and the Digital Asset Basic Act open the taps — plausibly within 2026, though timing is uncertain. Early positioning is the entire play." },
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
export default CapitalService;
