import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/ama-spaces.png";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const AMAService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const [openCap, setOpenCap] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleCap = useCallback((i: number) => setOpenCap(p => p === i ? null : i), []);
  const toggleFaq = useCallback((i: number) => setOpenFaq(p => p === i ? null : i), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-detail .hero-back", { opacity: 0, x: -20, duration: .8, delay: .3 });
      gsap.from(".svc-detail .hero-label", { opacity: 0, y: 20, duration: .8, delay: .4 });
      gsap.from(".svc-detail .hero h1", { opacity: 0, y: 40, duration: 1, delay: .5, ease: "power3.out" });
      gsap.from(".svc-detail .hero-desc", { opacity: 0, y: 30, duration: 1, delay: .9 });
      gsap.utils.toArray<HTMLElement>(".svc-detail .lbl,.svc-detail .stat,.svc-detail .problem-left,.svc-detail .problem-right,.svc-detail .cap-block,.svc-detail .proc-step,.svc-detail .plat,.svc-detail .faq-item,.svc-detail .invite h2,.svc-detail .highlight-box").forEach(el => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }});
      });
    }, containerRef);
    const tick = () => { if (clockRef.current) clockRef.current.textContent = `Seoul ${new Date().toLocaleString("en-US",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",hour12:false})}`; };
    tick(); const ci = setInterval(tick, 60000);
    return () => { ctx.revert(); clearInterval(ci); };
  }, []);

  return (
    <div className="svc-detail" ref={containerRef}>
      <SEOHead title="Korea AMA Hosting | ium Labs" description="Structured AMA sessions with native Korean hosts." path="/services/ama" keywords={["Korea AMA Hosting","Web3 AMA Korea"]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" />
        <div className="hero-grid" /><div className="hero-orb" /><div className="hero-num">08</div>
        <div className="wrap">
          <Link to="/services/gtm" className="hero-back">All Services</Link>
          <div className="hero-label">Service 08 of 08</div>
          <h1>AMA <strong>Hosting</strong></h1>
          <p className="hero-desc">Structured AMA sessions with native Korean-speaking hosts. Pre-event promotion, live moderation, post-AMA recap content and analytics. AMAs that move communities, not just timelines.</p>
        </div>
      </section>

      <section className="stats"><div className="wrap"><div className="stats-grid">
        <div className="stat"><div className="stat-val">200+</div><div className="stat-sub">AMAs Hosted</div></div>
        <div className="stat"><div className="stat-val">50K+</div><div className="stat-sub">Live Participants</div></div>
        <div className="stat"><div className="stat-val">85%</div><div className="stat-sub">Session Retention</div></div>
        <div className="stat"><div className="stat-val">19+</div><div className="stat-sub">Projects Served</div></div>
      </div></div></section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Most AMAs are <strong>wasted opportunities.</strong></h2></div>
          <div className="problem-right">
            <p>Generic questions, passive audiences, zero follow-up. The host stumbles through translations, the audience drops off after 5 minutes, and there's no content produced afterward. The AMA ends and nothing changes.</p>
            <p>Korean AMAs are especially tricky. The audience expects a native speaker who understands crypto deeply. Awkward translations kill engagement instantly. And the post-AMA window — when interest peaks — is completely wasted without recap content.</p>
            <div className="highlight-box"><p>AMA는 이벤트가 아니라 커뮤니티 전환점입니다. ium Labs는 모든 AMA를 구조화된 캠페인으로 설계합니다.</p></div>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "Native Korean Hosts", desc: "Professional hosts who speak crypto fluently in Korean. No awkward translations, no lost nuance. They manage pacing, drive engagement, and keep the audience hooked." },
          { icon: "◉", title: "Pre-Event Hype Building", desc: "2-3 weeks of promotion across Korean channels. Teaser content, question seeding, community priming. By the time the AMA starts, the audience is ready." },
          { icon: "◈", title: "Question Curation", desc: "We seed intelligent questions that drive the conversation toward your key narratives. No awkward silences, no off-topic tangents. Every question is strategic." },
          { icon: "◆", title: "Multi-Platform Hosting", desc: "Telegram, Discord, X Spaces, KakaoTalk Live, YouTube Live. We host on whatever platform your audience uses. Simultaneous multi-platform when needed." },
          { icon: "◇", title: "Live Moderation", desc: "Real-time spam filtering, question prioritization, engagement prompts, and audience management. The host focuses on the conversation — we handle everything else." },
          { icon: "◐", title: "Post-AMA Amplification", desc: "Written recaps, video highlights, key quote graphics, thread summaries, engagement analytics. The AMA keeps working for weeks after it ends." },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" onClick={() => toggleCap(i)}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div></div></div>
          </div>
        ))}
      </div></section>

      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From planning to <strong>post-AMA content.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 1–2</div><div className="proc-title">Pre-AMA Strategy</div><div className="proc-text">Define objectives, choose platform, curate questions, build promotion plan.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 2–3</div><div className="proc-title">Promotion</div><div className="proc-text">Teaser content, community announcements, KOL amplification, question collection.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Event Day</div><div className="proc-title">Live Execution</div><div className="proc-text">Native Korean host, live moderation, engagement prompts, real-time Q&A management.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Post-Event</div><div className="proc-title">Amplification</div><div className="proc-text">Written recap, video highlights, analytics report. Content distribution across channels.</div></div>
        </div>
      </div></section>

      <section className="platforms"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Platforms</div>
        <div className="plat-grid">
          <div className="plat"><div className="plat-name">Telegram</div><div className="plat-desc">Text-based AMAs in Korean Telegram groups. High engagement, easy participation.</div><div className="plat-stat">Most popular format</div></div>
          <div className="plat"><div className="plat-name">Discord</div><div className="plat-desc">Voice channel AMAs with stage channels. Good for deeper technical discussions.</div><div className="plat-stat">Voice + text hybrid</div></div>
          <div className="plat"><div className="plat-name">X Spaces</div><div className="plat-desc">Live audio sessions on X. Great for reach and discoverability beyond existing community.</div><div className="plat-stat">Maximum reach</div></div>
          <div className="plat"><div className="plat-name">YouTube Live</div><div className="plat-desc">Video AMAs with screen sharing. Best for product demos and visual presentations.</div><div className="plat-stat">Video format</div></div>
        </div>
      </div></section>

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "How far in advance should we plan an AMA?", a: "Ideally 2-3 weeks. This gives time for proper promotion and question curation. For urgent launches, we can execute quality AMAs in as little as 5 business days." },
          { q: "Do your hosts speak English too?", a: "Yes. We can host in Korean, English with Korean translation, or fully bilingual. Most Korean community AMAs are hosted entirely in Korean for maximum engagement." },
          { q: "What happens after the AMA?", a: "We produce written recaps, video/audio highlights, key quote graphics, and a full engagement analytics report. This content gets distributed across your channels for weeks of additional value." },
          { q: "How do you handle trolls and spam during live AMAs?", a: "Real-time moderation team filtering spam, managing question queue, and handling disruptive participants. The host never has to deal with moderation — that's our job." },
        ].map((faq, i) => (
          <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
            <div className="faq-q" onClick={() => toggleFaq(i)}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      <section className="invite" id="contact"><div className="invite-inner">
        <div><h2>Ready to host an AMA <strong>that converts?</strong></h2><div className="invite-kr">한국어 AMA, 전문 호스트가 필요합니다.</div></div>
        <div className="invite-right"><CalendlyButton className="invite-cta">Book an AMA Planning Call →</CalendlyButton></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div>© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span ref={clockRef} style={{ marginRight: 12 }} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default AMAService;
