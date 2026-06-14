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
import diagImg from "@/assets/platforms/comp-landscape.jpg";
import packImg from "@/assets/platforms/comp-legal.jpg";
import legalImg from "@/assets/platforms/comp-vasp.jpg";
import amlImg from "@/assets/platforms/comp-aml.jpg";
import maintImg from "@/assets/platforms/seo-analytics.jpg";
import relImg from "@/assets/platforms/pr-interview.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const ListingService = () => {
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
      <SEOHead title="Korean CEX Listing Advisory — Upbit, Bithumb, Coinone, Korbit | ium Labs" description="Listing-readiness diagnosis, application packaging, and exchange relations for Korea's KRW-market exchanges. DAXA-aligned, compliance-first — we make you the strongest applicant. The exchange makes the decision." path="/services/listing" image={heroImg} keywords={["Korean exchange listing","Upbit listing","Bithumb listing","CEX listing advisory Korea","DAXA listing","KRW market listing","Coinone Korbit listing"]} />
      <ServiceSchema name="Korean CEX Listing Advisory" description="Listing-readiness diagnosis, application packaging, securities legal-opinion coordination, and exchange relationship facilitation for Upbit, Bithumb, Coinone, and Korbit." url="/services/listing" serviceType={["Exchange Listing Advisory", "CEX Listing Korea", "Listing Readiness", "Regulatory Compliance"]} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: "CEX Listing Advisory", url: "https://iumlabs.io/services/listing" }]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1200} height={800} /><div className="hero-overlay" />
        <div className="hero-center">
          <h1>CEX Listing <strong>Advisory</strong></h1>
          <p className="hero-desc">The KRW market is the prize and the hardest gate in crypto. We make your project the strongest, best-prepared, fully-compliant applicant for Upbit, Bithumb, Coinone, and Korbit — and put you in front of the right people. The exchange makes the decision; we make sure you deserve a yes.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">4</div><div className="stat-sub">KRW Exchanges Covered</div></div>
          <div className="stat"><div className="stat-val">DAXA</div><div className="stat-sub">Best-Practices Aligned</div></div>
          <div className="stat"><div className="stat-val">100%</div><div className="stat-sub">Compliance-First</div></div>
          <div className="stat"><div className="stat-val">25+</div><div className="stat-sub">Korea Market Entries</div></div>
        </div>
      </section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Reality</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Listing demand vastly exceeds slots — and the rules just got <strong>much harder.</strong></h2></div>
          <div className="problem-right">
            <p>Each exchange decides its own listings through an independent review committee — not DAXA, and not any advisor. Since the 2024 Best-Practices framework and its 2025 overhaul, the bar has risen sharply: tougher review criteria targeting post-listing pumps, meme-coin floods, and "zombie coins," plus a quarterly maintenance review that means a listing is no longer permanent.</p>
            <p>The grey market of unlicensed "listing brokers" is illegal and prosecuted. The legitimate path is to be undeniably ready — a clean securities legal opinion, airtight tokenomics and disclosure, and a credible Korean representative managing the process. That is exactly what we build.</p>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "Listing-Readiness Diagnosis", desc: "We audit your project against the DAXA Best-Practices axes and each exchange's known criteria — securities exposure, tokenomics and unlock red flags, disclosure gaps, audit and AML documentation — and deliver a prioritized gap report before you ever apply.", img: diagImg },
          { icon: "◉", title: "Application Packaging & Localization", desc: "We assemble and Korean-localize the full dossier exchanges expect: whitepaper, cap table and legal structure, technical and security audits, tokenomics, and the mandatory virtual-asset disclosure document (가상자산 설명서).", img: packImg },
          { icon: "◈", title: "Securities Legal-Opinion Coordination", desc: "Upbit and Coinone require a domestic Korean legal opinion on securities status before review. We coordinate it through independent partner law firms — Kim & Chang, Yoon & Yang, Hwawoo — without ever authoring or pressuring the conclusion.", img: legalImg },
          { icon: "◆", title: "Compliance & AML Preparation", desc: "We prepare your project for the AML, disclosure, and user-protection scrutiny that each exchange's dedicated team applies, coordinated with our in-house compliance practice and the Virtual Asset User Protection Act.", img: amlImg },
          { icon: "◇", title: "Maintenance-Review Survival", desc: "Listing is no longer once-and-done. We stand up the ongoing IR and disclosure cadence needed to survive the quarterly maintenance review and avoid caution-item (유의종목) designation and delisting.", img: maintImg },
          { icon: "◐", title: "Exchange Relationship Facilitation", desc: "Warm, transparent introductions to exchange listing and research teams, and management of the back-and-forth, timing, and Korean-market narrative. We sell competent representation and access — never a decision.", img: relImg },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} width={600} height={400} /></div></div></div>
          </div>
        ))}
      </div></section>

      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From candidate to <strong>credible applicant.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase I</div><div className="proc-title">Readiness Diagnosis</div><div className="proc-text">Audit against DAXA Best-Practices and per-exchange criteria. Deliver a prioritized gap report.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase II</div><div className="proc-title">Dossier & Legal Opinion</div><div className="proc-text">Package and localize the application; coordinate the independent Korean securities legal opinion.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase III</div><div className="proc-title">Submission & Relations</div><div className="proc-text">Manage submission, timing, and the narrative with exchange listing and research teams.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase IV</div><div className="proc-title">Maintenance & Disclosure</div><div className="proc-text">Stand up the ongoing IR and disclosure cadence to survive quarterly maintenance review.</div></div>
        </div>
      </div></section>

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "Can you guarantee a listing on Upbit or Bithumb?", a: "No — and anyone who does is a red flag. Each exchange decides independently through its own review committee. What we guarantee is that you arrive as the strongest, best-prepared, fully-compliant applicant, with the right documentation and the right introductions. The decision is the exchange's." },
          { q: "Do you pay exchanges or use listing brokers?", a: "Never. Unlicensed listing brokerage and paid listing guarantees are illegal in Korea and have led to prosecutions. We work strictly as a compliance and GTM advisor: readiness, packaging, legal-opinion coordination, and transparent relationship facilitation." },
          { q: "Do we need a Korean entity or foundation to list?", a: "Not as a formal requirement — most foreign projects list via an offshore foundation, which is normal. A Korean entity, audited statements, and a credible board are trust-and-readiness signals that strengthen your case, and they matter more on the capital and treasury side. We advise you precisely, without overstating requirements." },
          { q: "What changed with the 2024–2025 rules?", a: "DAXA's Best-Practices framework (in force from July 2024) and its 2025 overhaul raised the bar: tougher criteria against post-listing pumps, meme-coins, and zombie coins, plus a quarterly maintenance review. Staying listed is now an ongoing compliance job — which is why we build your disclosure and IR cadence from day one." },
          { q: "KRW market or BTC market first?", a: "It depends on the project. The KRW market holds the deep retail liquidity everyone wants but is the hardest gate; a BTC-pair listing can build a Korean trading history first, though each market is reviewed separately and one does not guarantee the other. We sequence it as part of your overall strategy." },
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
export default ListingService;
