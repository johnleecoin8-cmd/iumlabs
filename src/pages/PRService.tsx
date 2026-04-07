import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import ServiceSchema from "@/components/ServiceSchema";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/pr-coindesk.jpg";
import cdImg from "@/assets/platforms/pr-newsroom.jpg";
import bmImg from "@/assets/platforms/pr-interview.jpg";
import tpImg from "@/assets/platforms/pr-media.jpg";
import msImg from "@/assets/platforms/pr-mainstream.jpg";
import crisisImg from "@/assets/platforms/pr-crisis.jpg";
import prAnalImg from "@/assets/platforms/pr-analytics.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const PRService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
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
    const tick = () => { if (clockRef.current) clockRef.current.textContent = `Seoul ${new Date().toLocaleString("en-US",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",hour12:false})}`; };
    tick(); const ci = setInterval(tick, 60000);
    return () => { ctx.revert(); clearInterval(ci); };
  }, []);

  return (
    <div className="svc-detail" ref={containerRef}>
      <SEOHead title="Korea PR & Media | ium Labs" description="Korean press coverage through CoinDesk Korea, Block Media, TokenPost." path="/services/pr" keywords={["Korea Crypto PR","Korean Media Relations"]} />
      <ServiceSchema name="Korea PR & Media" description="Korean press coverage through CoinDesk Korea, Block Media, TokenPost." url="/services/pr" serviceType={["PR", "Media Relations", "Press Coverage"]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" />
        <div className="hero-center">
          <div className="hero-label">Service 03 of 08</div>
          <h1>PR & <strong>Media</strong></h1>
          <p className="hero-desc">Stories Korean journalists actually want to publish. CoinDesk Korea, Block Media, TokenPost, and mainstream outlets. Direct journalist relationships, not spray-and-pray pitching.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">64</div><div className="stat-sub">Articles Published</div></div>
          <div className="stat"><div className="stat-val">18</div><div className="stat-sub">Media Partners</div></div>
          <div className="stat"><div className="stat-val">3.2M</div><div className="stat-sub">Avg Article Reach</div></div>
          <div className="stat"><div className="stat-val">87%</div><div className="stat-sub">Coverage Success Rate</div></div>
        </div>
      </section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Global PR doesn't work <strong>in Korean media.</strong></h2></div>
          <div className="problem-right">
            <p>Korean crypto journalists don't read English press releases. They have their own editorial calendars, beat structures, and trust networks.</p>
            <p>Sending a translated press release to a generic Korea media list gets you zero coverage. The journalists who matter respond to relationships, not cold pitches.</p>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "Korean Press Release Writing", desc: "Native Korean writers who understand crypto terminology and Korean media conventions. Press releases that read naturally, not translated corporate speak.", img: cdImg },
          { icon: "◉", title: "Direct Journalist Outreach", desc: "Personal relationships with reporters at CoinDesk Korea, Block Media, TokenPost, BloomingBit, Hankyung. We pitch stories, not press releases.", img: bmImg },
          { icon: "◈", title: "Thought Leadership", desc: "Interview placement, bylined articles, expert commentary. Positioning your founders as credible voices in the Korean crypto narrative.", img: tpImg },
          { icon: "◆", title: "Mainstream Media", desc: "Beyond crypto — Chosun Ilbo, MBN, Maeil Business. For stories with broader financial relevance.", img: msImg },
          { icon: "◇", title: "Crisis Communication", desc: "Korean CT moves fast. Pre-drafted statement templates, rapid response protocols, real-time monitoring.", img: crisisImg },
          { icon: "◐", title: "Coverage Analytics", desc: "Article reach tracking, sentiment analysis, share of voice measurement. Monthly reports on Korean media presence.", img: prAnalImg },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} /></div></div></div>
          </div>
        ))}
      </div></section>

      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From story to <strong>published coverage.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase I</div><div className="proc-title">Story Development</div><div className="proc-text">Identify the newsworthy angle, craft narrative, write Korean-native press materials.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase II</div><div className="proc-title">Media Outreach</div><div className="proc-text">Direct pitching to relevant journalists. Personalized angles per outlet.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase III</div><div className="proc-title">Distribution</div><div className="proc-text">Coordinated publishing. Embargo management. Social amplification.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase IV</div><div className="proc-title">Impact Tracking</div><div className="proc-text">Article performance, reach analytics, sentiment monitoring. Monthly reports.</div></div>
        </div>
      </div></section>

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "How fast can you get coverage?", a: "Urgent placements: 24-48 hours. Planned campaigns: 1-2 weeks including story development and journalist coordination." },
          { q: "Do you guarantee coverage?", a: "No ethical PR firm guarantees specific placements. Our 87% success rate means the vast majority of stories we pitch get published." },
          { q: "Can you handle crisis communication?", a: "Yes. Pre-built crisis protocols and Korean-language statements ready within hours." },
          { q: "Do you write in both Korean and English?", a: "All materials written natively in Korean. English versions also provided for your global team." },
        ].map((faq, i) => (
          <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
            <div className="faq-q" role="button" tabIndex={0} onClick={() => toggleFaq(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(i); } }} aria-expanded={openFaq === i}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      <section className="invite" id="contact"><div className="invite-inner">
        <div className="invite-right"><Link to="/contact" className="invite-cta">Book a PR Strategy Call →</Link></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div>© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span ref={clockRef} style={{ marginRight: 12 }} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default PRService;
