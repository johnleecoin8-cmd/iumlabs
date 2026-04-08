import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ServiceSchema from "@/components/ServiceSchema";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/ama-spaces.jpg";
import capImg1 from "@/assets/platforms/ama-telegram.jpg";
import capImg2 from "@/assets/platforms/ama-discord.jpg";
import capImg3 from "@/assets/platforms/ama-spaces.jpg";
import capImg4 from "@/assets/platforms/ama-youtube.jpg";
import capImg5 from "@/assets/platforms/ama-moderation.jpg";
import capImg6 from "@/assets/platforms/ama-content.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const AMAService = () => {
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
      <SEOHead title="Korea AMA Hosting | ium Labs" description="Structured AMA sessions with native Korean hosts." path="/services/ama" image={heroImg} keywords={["Korea AMA Hosting","Web3 AMA Korea"]} />
      <ServiceSchema name="Korea AMA Hosting" description="Structured AMA sessions with native Korean hosts." url="/services/ama" serviceType={["AMA Hosting", "Live Events", "Community Engagement"]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1200} height={800} /><div className="hero-overlay" />
        <div className="hero-center">
          <h1>AMA <strong>Hosting</strong></h1>
          <p className="hero-desc">Structured AMA sessions with native Korean-speaking hosts. Pre-event promotion, live moderation, post-AMA recap content and analytics. AMAs that move communities, not just timelines.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">200+</div><div className="stat-sub">AMAs Hosted</div></div>
          <div className="stat"><div className="stat-val">50K+</div><div className="stat-sub">Live Participants</div></div>
          <div className="stat"><div className="stat-val">85%</div><div className="stat-sub">Session Retention</div></div>
          <div className="stat"><div className="stat-val">19+</div><div className="stat-sub">Projects Served</div></div>
        </div>
      </section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Most AMAs are <strong>wasted opportunities.</strong></h2></div>
          <div className="problem-right">
            <p>Generic questions, passive audiences, zero follow-up. The host stumbles through translations, the audience drops off after 5 minutes, and there's no content produced afterward. The AMA ends and nothing changes.</p>
            <p>Korean AMAs are especially tricky. The audience expects a native speaker who understands crypto deeply. Awkward translations kill engagement instantly. And the post-AMA window — when interest peaks — is completely wasted without recap content.</p>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", img: capImg1, title: "Native Korean Hosts", desc: "Professional hosts who speak crypto fluently in Korean. No awkward translations, no lost nuance. They manage pacing, drive engagement, and keep the audience hooked." },
          { icon: "◉", img: capImg2, title: "Pre-Event Hype Building", desc: "2-3 weeks of promotion across Korean channels. Teaser content, question seeding, community priming. By the time the AMA starts, the audience is ready." },
          { icon: "◈", img: capImg3, title: "Question Curation", desc: "We seed intelligent questions that drive the conversation toward your key narratives. No awkward silences, no off-topic tangents. Every question is strategic." },
          { icon: "◆", img: capImg4, title: "Multi-Platform Hosting", desc: "Telegram, Discord, X Spaces, KakaoTalk Live, YouTube Live. We host on whatever platform your audience uses. Simultaneous multi-platform when needed." },
          { icon: "◇", img: capImg5, title: "Live Moderation", desc: "Real-time spam filtering, question prioritization, engagement prompts, and audience management. The host focuses on the conversation — we handle everything else." },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} width={600} height={400} /></div></div></div>
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

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "How far in advance should we plan an AMA?", a: "Ideally 2-3 weeks. This gives time for proper promotion and question curation. For urgent launches, we can execute quality AMAs in as little as 5 business days." },
          { q: "Do your hosts speak English too?", a: "Yes. We can host in Korean, English with Korean translation, or fully bilingual. Most Korean community AMAs are hosted entirely in Korean for maximum engagement." },
          { q: "What happens after the AMA?", a: "We produce written recaps, video/audio highlights, key quote graphics, and a full engagement analytics report. This content gets distributed across your channels for weeks of additional value." },
          { q: "How do you handle trolls and spam during live AMAs?", a: "Real-time moderation team filtering spam, managing question queue, and handling disruptive participants. The host never has to deal with moderation — that's our job." },
        ].map((faq, i) => (
          <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
            <div className="faq-q" role="button" tabIndex={0} onClick={() => toggleFaq(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(i); } }} aria-expanded={openFaq === i}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      <section className="svc-footer">
        <ContactFormSection />
        <FooterLinksSection />
        <Footer />
      </section>
    </div>
  );
};
export default AMAService;
