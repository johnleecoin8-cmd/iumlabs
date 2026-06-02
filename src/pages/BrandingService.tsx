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
import heroImg from "@/assets/services/compliance-hero.avif";
import capImg1 from "@/assets/platforms/comp-vasp.jpg";
import capImg2 from "@/assets/platforms/comp-pipa.jpg";
import capImg3 from "@/assets/platforms/comp-aml.jpg";
import capImg4 from "@/assets/platforms/comp-exchange.jpg";
import capImg5 from "@/assets/platforms/comp-landscape.jpg";
import capImg6 from "@/assets/platforms/comp-legal.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const BrandingService = () => {
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
      gsap.utils.toArray<HTMLElement>(".svc-detail .lbl,.svc-detail .problem-left,.svc-detail .problem-right,.svc-detail .cap-block,.svc-detail .proc-step,.svc-detail .tier-card,.svc-detail .plat,.svc-detail .case-split,.svc-detail .faq-item,.svc-detail .invite h2,.svc-detail .invite-kr,.svc-detail .highlight-box").forEach(el => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }});
      });
    }, containerRef);
    return () => { ctx.revert(); };
  }, []);

  return (
    <div className="svc-detail" ref={containerRef}>
      <SEOHead title="Korea Crypto Regulation & VASP Compliance | ium Labs" description="Navigate the Korean regulatory landscape. Strategic advisory on VASP frameworks, PIPA data compliance, and local crypto guidelines." path="/services/compliance" image={heroImg} keywords={["Korea Crypto Compliance","VASP Registration Korea"]} />
      <ServiceSchema name="Korea Regulations & Compliance" description="VASP registration, PIPA compliance, regulatory advisory for Korean crypto market." url="/services/compliance" serviceType={["Regulatory Compliance", "VASP Registration", "Legal Advisory"]} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: "Compliance", url: "https://iumlabs.io/services/compliance" }]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1200} height={800} /><div className="hero-overlay" />
        <div className="hero-center">
          <h1>Regulations & <strong>Compliance</strong></h1>
          <p className="hero-desc">In partnership with Law Office Asset and Freeman Law. VASP registration, PIPA compliance, regulatory landscape analysis, and exchange compliance documentation. Navigate Korea's regulations with confidence.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">19+</div><div className="stat-sub">Projects Advised</div></div>
          <div className="stat"><div className="stat-val">100%</div><div className="stat-sub">Compliance Rate</div></div>
          <div className="stat"><div className="stat-val">5</div><div className="stat-sub">Regulatory Frameworks</div></div>
          <div className="stat"><div className="stat-val">24h</div><div className="stat-sub">Response Time</div></div>
        </div>
      </section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Korean crypto regulations are <strong>complex and fast-changing.</strong></h2></div>
          <div className="problem-right">
            <p>The Virtual Asset User Protection Act, PIPA personal data requirements, and exchange-specific listing compliance create a regulatory maze that most global projects can't navigate alone.</p>
            <p>DeFi, NFT, and token projects each face different requirements. What worked for an L1 won't work for a DeFi protocol. And the regulations change quarterly — what was compliant 6 months ago might not be today.</p>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", img: capImg1, title: "VASP Registration", desc: "Full support for Korean Virtual Asset Service Provider registration. Documentation preparation, application submission, and follow-up with regulatory authorities." },
          { icon: "◈", img: capImg3, title: "Exchange Listing Compliance", desc: "Upbit, Bithumb, Coinone listing requirements. Due diligence preparation, compliance documentation, and regulatory review to meet exchange standards." },
          { icon: "◆", img: capImg4, title: "AML/KYC Advisory", desc: "Anti-money laundering and Know Your Customer framework design. Transaction monitoring procedures, suspicious activity reporting, and compliance training." },
          { icon: "◐", img: capImg6, title: "Legal Partnership Access", desc: "Direct access to Law Office Asset and Freeman Law for formal legal opinions, regulatory submissions, and litigation support when needed." },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} width={600} height={400} /></div></div></div>
          </div>
        ))}
      </div></section>

      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From assessment to <strong>full compliance.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 1–2</div><div className="proc-title">Assessment</div><div className="proc-text">Map your project against Korean regulatory framework. Identify compliance gaps and requirements.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 2–4</div><div className="proc-title">Strategy</div><div className="proc-text">Develop compliance roadmap. Documentation plan, timeline, and resource requirements.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 4–8</div><div className="proc-title">Implementation</div><div className="proc-text">Prepare documentation, submit applications, coordinate with legal partners and regulators.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Ongoing</div><div className="proc-title">Monitoring</div><div className="proc-text">Regulatory change tracking, quarterly compliance reviews, ongoing advisory as regulations evolve.</div></div>
        </div>
      </div></section>

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "How long does VASP registration take?", a: "Assessment takes 1-2 weeks. Full registration support typically runs 4-8 weeks depending on your project's complexity and current compliance state." },
          { q: "Do you provide legal opinions?", a: "Through our partnerships with Law Office Asset and Freeman Law, we can provide formal legal opinions and regulatory submissions. Our advisory covers both strategic guidance and formal legal work." },
          { q: "Is compliance different for DeFi vs token projects?", a: "Yes, significantly. DeFi protocols face different requirements than token issuers, NFT projects, or infrastructure providers. We map the specific regulatory framework that applies to your project type." },
          { q: "How often do Korean regulations change?", a: "Quarterly updates are common. We provide ongoing monitoring and alert you when regulatory changes affect your compliance status. Proactive updates, not reactive surprises." },
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
export default BrandingService;
