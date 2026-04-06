import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import prHeroImage from "@/assets/services/pr-media.jpg";
import bnbImg from "@/assets/campaigns/bnb-hanok-event.png";
import kucoinImg from "@/assets/campaigns/kucoin-party-event.png";
import mantraImg from "@/assets/campaigns/mantra-party.jpg";
import bybitImg from "@/assets/campaigns/bybit-event.jpg";
import saharaImg from "@/assets/campaigns/sahara-ai-event.png";
import ondoImg from "@/assets/campaigns/ondo-seminar.jpg";
import "./GTMService.css";

gsap.registerPlugin(ScrollTrigger);

const clients = ["BNB Chain","Sahara AI","PEAQ Network","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const prCapabilities = [
  { num: "01", title: "Korean Media Distribution", desc: "Guaranteed placements in CoinDesk Korea, Block Media, TokenPost, Coinness, and BloomingBit. Native-written articles that editors actually want to publish." },
  { num: "02", title: "Global PR Coverage", desc: "English-language press for CoinDesk, Cointelegraph, The Block, and mainstream business outlets. Coordinated with Korean distribution for maximum impact." },
  { num: "03", title: "Crisis Communications", desc: "Rapid-response narrative management when things go wrong. We protect your reputation across Korean media and community channels within hours, not days." },
  { num: "04", title: "Interview & Thought Leadership", desc: "Founder interviews with top Korean crypto journalists and podcast hosts. Op-ed placement that positions your team as industry experts." },
  { num: "05", title: "Press Release Production", desc: "Native Korean and English press releases written by crypto-native editors. Not translations — original storytelling tailored to each market's media culture." },
  { num: "06", title: "Coverage Analytics & Reporting", desc: "Real-time coverage dashboard, sentiment tracking, competitor share-of-voice analysis, and monthly impact reports with reach and engagement metrics." },
];

const workCards = [
  { img: bnbImg, cat: "BNB Chain — Media Blitz", metric: "42+", title: "Korean media placements, one cycle", desc: "Coordinated press across CoinDesk Korea, Block Media, and mainstream outlets driving ecosystem awareness.", tags: ["Korea","Media","L1"], slug: "bnb-chain" },
  { img: saharaImg, cat: "Sahara AI — Narrative Launch", metric: "4.2M", title: "Combined article reach", desc: "AI x Crypto narrative positioning through Korean crypto media and mainstream tech press.", tags: ["AI","PR","Narrative"], slug: "sahara-ai" },
  { img: kucoinImg, cat: "KuCoin — Brand Coverage", metric: "3.2M", title: "Combined press reach", desc: "Sustained Korean and global press distribution supporting user acquisition campaigns.", tags: ["Exchange","PR","Growth"], slug: "kucoin" },
  { img: mantraImg, cat: "MANTRA — Thought Leadership", metric: "100%", title: "Pitch-to-placement rate", desc: "Every story angle placed in at least one top-tier Korean outlet. Investor dinner coverage and institutional narrative.", tags: ["RWA","Institutional","PR"], slug: "mantra" },
  { img: bybitImg, cat: "Bybit — SEO + PR Synergy", metric: "150+", title: "First-page Korean rankings", desc: "Press coverage fueling Naver SEO dominance and organic brand discovery.", tags: ["SEO","PR","Naver"], slug: "bybit" },
  { img: ondoImg, cat: "Ondo Finance — Market Education", metric: "12K+", title: "Readers reached via press", desc: "Korea seminar series press coverage establishing RWA narrative with retail and institutional audiences.", tags: ["RWA","Education","Media"], slug: "ondo" },
];

const PRService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const workPinRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gtm-ed .hero-tag", { y: 30, opacity: 0, duration: 1, delay: .2, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-ed h1", { y: 60, opacity: 0, duration: 1.2, delay: .4, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-foot p", { y: 30, opacity: 0, duration: 1, delay: .7, ease: "power3.out" });

      gsap.utils.toArray<HTMLElement>(".gtm-ed .lbl,.gtm-ed .wk-item,.gtm-ed .manifesto p,.gtm-ed .pill,.gtm-ed .q-card,.gtm-ed .invite h2,.gtm-ed .invite-kr,.gtm-ed .appr-l,.gtm-ed .pull-q,.gtm-ed .svc-cap-row").forEach(el => {
        gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" }});
      });

      // Manifesto word reveal
      const mp = document.querySelector(".gtm-ed .manifesto p");
      if (mp) {
        const html = mp.innerHTML;
        const parts = html.split(/(<[^>]+>)/);
        let result = "";
        parts.forEach(part => {
          if (part.startsWith("<")) { result += part; return; }
          part.split(" ").forEach(w => { if (w.trim()) result += `<span class="mw" style="display:inline-block;opacity:.15">${w}</span> `; });
        });
        mp.innerHTML = result;
        gsap.utils.toArray<HTMLElement>(".gtm-ed .mw").forEach(w => {
          gsap.to(w, { opacity: 1, duration: .5, scrollTrigger: { trigger: w, start: "top 90%", end: "top 60%", scrub: 1 }});
        });
      }

      // Horizontal scroll
      if (workPinRef.current && window.innerWidth > 768) {
        const totalW = workPinRef.current.scrollWidth - window.innerWidth;
        gsap.to(workPinRef.current, { x: -totalW, ease: "none",
          scrollTrigger: { trigger: ".gtm-ed .work-sec", start: "top top", end: () => `+=${totalW}`, scrub: 1, pin: true, anticipatePin: 1 }
        });
      }
    }, containerRef);

    const tick = () => {
      if (!clockRef.current) return;
      const sg = new Date().toLocaleString("en-US",{timeZone:"Asia/Singapore",hour:"2-digit",minute:"2-digit",hour12:false});
      const kr = new Date().toLocaleString("en-US",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",hour12:false});
      clockRef.current.textContent = `SG ${sg} / KR ${kr}`;
    };
    tick(); const ci = setInterval(tick, 60000);
    return () => { ctx.revert(); clearInterval(ci); };
  }, []);

  return (
    <div className="gtm-ed" ref={containerRef}>
      <SEOHead title="Korean Crypto PR & Media Relations | ium Labs" description="Secure coverage in CoinDesk Korea, Block Media, TokenPost, and mainstream Korean media. 64+ articles published with 3.2M+ combined reach." path="/services/pr" keywords={["Korean Crypto PR","Web3 Media Relations Korea","Blockchain PR Seoul"]} />
      <Navbar />

      {/* HERO */}
      <section className="hero-ed">
        <img src={prHeroImage} alt="" className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="hero-kr">언론</div>
        <div className="hero-kr">보도</div>
        <div className="hero-kr">미디어</div>
        <div className="hero-wm">ium</div>
        <div className="hero-tag">Korean PR & Media Relations — Seoul</div>
        <h1>Stories Korean journalists <em>actually</em> want to <strong>publish.</strong></h1>
        <div className="hero-foot">
          <p>Direct relationships with 18+ Korean media partners. 64 articles published. From CoinDesk Korea to mainstream press — we get you covered where it matters.</p>
          <div className="hero-scroll">Scroll</div>
        </div>
      </section>

      {/* CLIENT MARQUEE */}
      <section className="clients">
        <div className="cl-track">
          {[...clients,...clients,...clients].map((c,i) => (
            <span key={i}>{i > 0 && i % clients.length !== 0 ? <><div className="cl-sep" />{c}</> : c}</span>
          ))}
        </div>
      </section>

      {/* WHY — PR STATS */}
      <section className="why-kr">
        <div className="wrap">
          <div className="lbl" style={{ color: "var(--g2)" }}>Why Korean PR</div>
          <div className="wk-grid">
            <div className="wk-item"><div className="wk-big">64</div><div className="wk-sub">Articles Published</div><div className="wk-note">Korean and English press placements across crypto and mainstream media outlets.</div></div>
            <div className="wk-item"><div className="wk-big">18</div><div className="wk-sub">Media Partners</div><div className="wk-note">Direct editor relationships at CoinDesk Korea, Block Media, TokenPost, Coinness, and more.</div></div>
            <div className="wk-item"><div className="wk-big">3.2M</div><div className="wk-sub">Combined Reach</div><div className="wk-note">Aggregate article readership across all published coverage and syndication.</div></div>
            <div className="wk-item"><div className="wk-big">87%</div><div className="wk-sub">Success Rate</div><div className="wk-note">Pitch-to-placement rate. Nearly 9 out of 10 stories we pitch get published.</div></div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="wrap">
          <p>Korean media doesn't work like the rest of the world. Translated press releases get ignored. Global PR agencies don't have editor contacts in Seoul. Korean journalists work through <strong>trust networks</strong> built over years — personal introductions, not cold pitches. Without native relationships, your story <strong>never gets told.</strong></p>
        </div>
      </section>

      {/* SERVICE DESCRIPTION & CAPABILITIES */}
      <section className="svc-sec" id="capabilities">
        <div className="wrap">
          <div className="lbl">What We Cover</div>
          <div style={{ maxWidth: 720, marginBottom: "4rem" }}>
            <p style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.3rem, 2vw, 1.8rem)", lineHeight: 1.6, color: "var(--char)" }}>
              We handle the full PR lifecycle — story development, journalist outreach, press release production, coordinated multi-outlet distribution, and post-coverage analytics. Every article is written by crypto-native Korean editors, not translated.
            </p>
          </div>
          {prCapabilities.map((cap) => (
            <div key={cap.num} className="svc-cap-row" style={{ display: "grid", gridTemplateColumns: "80px 280px 1fr", gap: "2rem", alignItems: "baseline", padding: "2rem 0", borderTop: "1px solid var(--g4)" }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: "2.5rem", fontWeight: 300, color: "var(--g4)", lineHeight: 1 }}>{cap.num}</span>
              <h4 style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: "1.15rem", letterSpacing: "-.01em" }}>{cap.title}</h4>
              <p style={{ fontSize: ".84rem", color: "var(--g1)", lineHeight: 1.7, fontWeight: 300 }}>{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HORIZONTAL WORK */}
      <section className="work-sec" id="work">
        <div className="work-pin" ref={workPinRef}>
          <div className="work-intro">
            <div className="lbl">Selected Work</div>
            <h2>Coverage that <strong>built brands.</strong></h2>
          </div>
          {workCards.map(card => (
            <Link key={card.slug} to={`/projects/${card.slug}`} className="work-card" onClick={() => window.scrollTo(0,0)}>
              <div className="wc-img"><img src={card.img} alt={card.title} loading="lazy" /></div>
              <div className="wc-cat">{card.cat}</div>
              <div className="wc-metric">{card.metric}</div>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
              <div className="wc-tags">{card.tags.map(t => <span key={t} className="wc-tag">{t}</span>)}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRANSITION: dark to light */}
      <div className="fade-dark-to-light" />

      {/* APPROACH */}
      <section className="approach-ed" id="approach">
        <div className="wrap">
          <div className="lbl">Approach</div>
          <div className="appr-grid">
            <div className="appr-l">
              <h2>Not a press blast. <strong>A media strategy.</strong></h2>
              <p>Every placement comes through personal relationships with editors — not cold emails. We find the hook in your project that journalists will actually want to write about, then coordinate multi-outlet distribution for maximum amplification.</p>
              <div className="pull-q">"번역된 보도자료는 무시됩니다. 우리는 한국 기자들이 원하는 이야기를 씁니다."</div>
            </div>
            <div className="pillars">
              <div className="pill"><div className="pill-n">I</div><h4>Direct journalist relationships</h4><p>We don't send cold emails. Every placement comes through personal relationships with editors at CoinDesk Korea, Block Media, TokenPost, and mainstream Korean press.</p></div>
              <div className="pill"><div className="pill-n">II</div><h4>Native Korean writers</h4><p>Press releases written by crypto-native Korean editors — not translated from English. Stories that read naturally and match the editorial tone of each outlet.</p></div>
              <div className="pill"><div className="pill-n">III</div><h4>Crisis-ready 24/7</h4><p>When narratives go south, we respond within hours. Direct lines to editors mean we can get corrections, counter-narratives, and official statements placed fast.</p></div>
              <div className="pill"><div className="pill-n">IV</div><h4>Full funnel, not just headlines</h4><p>PR is one piece of the GTM puzzle. We integrate media coverage with KOL campaigns, community activation, and events for compounding impact.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <div style={{ height: "20vh", background: "linear-gradient(180deg, var(--bg) 0%, var(--black) 100%)" }} />

      <section className="quotes-sec">
        <div className="wrap">
          <div className="lbl" style={{ color: "var(--g2)" }}>Testimonials</div>
          <div className="quotes-grid">
            <div className="q-card"><blockquote>"ium Labs didn't just translate our deck into Korean — they rebuilt our entire media strategy from scratch. Every article felt native because it was written by editors who understand the Korean crypto landscape."</blockquote><cite>Head of BD — BNB Chain Ecosystem Partner</cite></div>
            <div className="q-card"><blockquote>"We'd tried two other agencies for Korean press. Neither could get us into CoinDesk Korea. ium Labs got us covered in the first week — and followed up with Block Media and TokenPost the same cycle."</blockquote><cite>Co-founder — RWA Protocol (Confidential)</cite></div>
          </div>
        </div>
      </section>

      {/* INVITATION */}
      <section className="invite" id="contact">
        <div className="invite-inner">
          <div>
            <h2>If you're building for Korea,<br />we're here to <strong>make it happen.</strong></h2>
            <div className="invite-kr">한국 시장을 여는 가장 확실한 방법</div>
          </div>
          <div className="invite-right">
            <CalendlyButton className="invite-cta">Book a PR Strategy Call →</CalendlyButton>
            <div className="invite-offices"><span>KR</span><span>SG</span></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ft-ed">
        <div className="ft-inner">
          <div className="ft-cp">© 2026 ium labs — Seoul</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="ft-clock" ref={clockRef} />
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <a href={brand.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PRService;
