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
import heroImg from "@/assets/services/community-management.jpg";
import capImg1 from "@/assets/platforms/comm-telegram.jpg";
import capImg2 from "@/assets/platforms/comm-discord.jpg";
import capImg3 from "@/assets/platforms/comm-kakao.jpg";
import capImg4 from "@/assets/platforms/comm-naver.jpg";
import capImg5 from "@/assets/platforms/comm-engage.jpg";
import capImg6 from "@/assets/platforms/comm-sentiment.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const CommunityService = () => {
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
      <SEOHead title="Korea Web3 Community Management & Growth | ium Labs" description="24/7 native Korean community management and moderation across Telegram, Discord, and KakaoTalk for sustainable Web3 ecosystem growth." path="/services/community" image={heroImg} keywords={["Korea Community Management","Web3 Community Korea"]} />
      <ServiceSchema name="Korea Community Management" description="24/7 native Korean community management across Telegram, Discord, KakaoTalk." url="/services/community" serviceType={["Community Management", "Social Media Management"]} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: "Community", url: "https://iumlabs.io/services/community" }]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1200} height={800} /><div className="hero-overlay" />
        <div className="hero-center">
          <h1>Community <strong>Management</strong></h1>
          <p className="hero-desc">24/7 native Korean community managers across Telegram, Discord, and KakaoTalk. We don't just moderate — we design community culture that retains and grows.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">18</div><div className="stat-sub">Communities Managed</div></div>
          <div className="stat"><div className="stat-val">127K+</div><div className="stat-sub">Members Engaged</div></div>
          <div className="stat"><div className="stat-val">6.8%</div><div className="stat-sub">Daily Active Rate</div></div>
          <div className="stat"><div className="stat-val">92%</div><div className="stat-sub">30-Day Retention</div></div>
        </div>
      </section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Korean communities don't run on <strong>global rules.</strong></h2></div>
          <div className="problem-right">
            <p>KakaoTalk Open Chat replaces Telegram for many Korean users. Naver Cafe is where long-form discussion happens. DC Inside is where sentiment shifts. Each platform has its own culture, moderation norms, and engagement patterns.</p>
            <p>A community manager who doesn't speak Korean natively, doesn't understand 24-hour crypto culture, and doesn't know the difference between KakaoTalk and Telegram culture will lose your members in weeks.</p>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "Telegram Management", desc: "Korean Telegram group setup, moderation, engagement programming. Bot configuration, anti-spam, welcome flows, daily engagement prompts. 24/7 coverage.", img: capImg1 },
          { icon: "◉", title: "Discord Operations", desc: "Server architecture, role systems, channel structure, Korean localization. Event programming, ticketing, and moderation workflows.", img: capImg2 },
          { icon: "◈", title: "KakaoTalk Open Chat", desc: "Korea's native messaging platform. Open chat room management, content sharing, real-time Q&A. The channel most global projects miss entirely.", img: capImg3 },
          { icon: "◆", title: "Naver Cafe Management", desc: "Long-form Korean community platform. Post moderation, content curation, SEO-optimized community content that drives Naver search traffic.", img: capImg4 },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} width={600} height={400} /></div></div></div>
          </div>
        ))}
      </div></section>

      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From setup to <strong>self-sustaining community.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 1</div><div className="proc-title">Onboarding</div><div className="proc-text">Platform audit, channel setup, bot configuration, welcome flows, Korean localization.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 2–3</div><div className="proc-title">Infrastructure</div><div className="proc-text">Moderation workflows, content calendar, engagement event schedule, ambassador program design.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 3–6</div><div className="proc-title">Activation</div><div className="proc-text">Daily engagement, weekly events, KOL AMAs, quest campaigns. Active growth phase.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Ongoing</div><div className="proc-title">Optimization</div><div className="proc-text">Sentiment monitoring, engagement analytics, retention optimization, monthly community health reports.</div></div>
        </div>
      </div></section>

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "Do you provide 24/7 coverage?", a: "Yes. Native Korean speakers managing your community around the clock — holidays, 3AM, weekends. Crypto never sleeps, and neither do we." },
          { q: "Can you manage multiple platforms simultaneously?", a: "Yes. Most clients use Telegram + Discord + at least one Korean platform (KakaoTalk or Naver Cafe). We handle all of them with a unified content and moderation strategy." },
          { q: "How do you handle FUD and negative sentiment?", a: "Real-time monitoring with alert systems. Pre-approved response templates for common FUD scenarios. Escalation protocols for serious issues. We respond within minutes, not hours." },
          { q: "What's the typical engagement improvement?", a: "Most communities see 2-3x increase in daily active rate within the first month. Our average across all managed communities is 6.8% DAR, compared to the industry average of under 3%." },
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
export default CommunityService;
