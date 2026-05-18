import { useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import Navbar from "@/components/Navbar";
import FooterLinksSection from "@/components/FooterLinksSection";

import seoulCta from "@/assets/backgrounds/seoul-hanriver-twilight.jpg";

import logoCoindesk from "@/assets/logos/coindesk.png";
import logoBlockmedia from "@/assets/logos/blockmedia-new.png";
import logoHankyung from "@/assets/logos/hankyung-new.png";

import logoSaharaColor from "@/assets/logos/sahara-ai.png";
import logoStoryColor from "@/assets/logos/story-protocol-new.png";
import logoBnbColor from "@/assets/logos/bnb.png";
import logoMantraColor from "@/assets/logos/mantra.png";

import eventSahara from "@/assets/campaigns/sahara-ai-event.jpg";
import eventBnb from "@/assets/campaigns/bnb-hanok-event.jpg";
import eventStory from "@/assets/campaigns/story-origin-summit.jpg";
import eventMantra from "@/assets/campaigns/mantra-party.jpg";
import eventAptos from "@/assets/campaigns/aptos-seoul-event.jpg";
import eventPeaq from "@/assets/campaigns/peaq-summit.jpg";

import svcGtm from "@/assets/services/gtm-strategy.webp";
import svcKol from "@/assets/services/kol-avatars.webp";
import svcPr from "@/assets/services/pr-coindesk.jpg";
import svcCommunity from "@/assets/services/community-management.jpg";
import svcEvents from "@/assets/services/offline-event.webp";
import svcResearch from "@/assets/services/deep-research-blog.jpg";
import svcSeo from "@/assets/services/seo-naver.jpg";
import svcAma from "@/assets/services/ama-spaces.jpg";
import svcCompliance from "@/assets/services/vasp-compliance.jpg";

import teamDavid from "@/assets/team/kevin-bd-new.jpg";
import teamBennet from "@/assets/team/rachel-design.jpg";
import teamJ from "@/assets/team/j-cmo.jpg";
import teamKevin from "@/assets/team/helen-cm.jpg";
import teamSuki from "@/assets/team/bennet-coo.jpg";
import teamLewis from "@/assets/team/lewis-pr.jpg";
import teamRachel from "@/assets/team/kevin-bd.jpg";
import teamHyukjae from "@/assets/team/hyukjae-bdm-new.jpg";

const useScrollReveal = () => {
  const observed = useRef(new Set<Element>());
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("dk-vis");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    const els = document.querySelectorAll(".dk-reveal");
    els.forEach((el) => {
      if (!observed.current.has(el)) {
        observed.current.add(el);
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, []);
};

const PitchDeck = () => {
  useScrollReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .dk{--bg:#0A0A0A;--off:#111113;--ink:#d4d0c8;--g1:#aaa;--g2:#777;--g3:#555;--g4:rgba(255,255,255,.1);--g5:rgba(255,255,255,.05);--accent:#a78bfa;--serif:'Cormorant Garamond',Georgia,serif;--sans:'DM Sans','Inter',sans-serif;--mono:'IBM Plex Mono',monospace;font-family:var(--sans);background:var(--bg);color:#eae7e0;-webkit-font-smoothing:antialiased}
        .dk ::selection{background:var(--accent);color:#fff}
        .dk img{display:block;max-width:100%}
        .dk .wrap{max-width:1400px;margin:0 auto;padding:0 clamp(1.25rem,4vw,3rem)}
        .dk .lbl{font-family:var(--mono);font-size:.68rem;font-weight:500;letter-spacing:.25em;text-transform:uppercase;color:var(--g2);display:flex;align-items:center;gap:1.5rem;margin-bottom:3rem}
        .dk .lbl::after{content:'';flex:1;height:1px;background:var(--g4)}
        .dk .sn{font-family:var(--mono);font-size:.65rem;color:var(--g3);letter-spacing:.1em;text-align:right;padding:2rem 0;opacity:.5}

        /* SCROLL REVEAL */
        .dk-reveal{opacity:0;transform:translateY(32px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        .dk-reveal.dk-vis{opacity:1;transform:translateY(0)}
        .dk-reveal.dk-d1{transition-delay:.1s}
        .dk-reveal.dk-d2{transition-delay:.2s}
        .dk-reveal.dk-d3{transition-delay:.3s}

        /* HERO */
        .dk .hero{height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;overflow:hidden}
        .dk .hero-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .dk .hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1}
        .dk .hero-ov1{position:absolute;inset:0;background:rgba(0,0,0,.45);z-index:2}
        .dk .hero-ov2{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,11,.3) 0%,transparent 40%,rgba(10,10,11,.85) 100%);z-index:3}
        .dk .hero-c{position:relative;z-index:10;text-align:center;max-width:900px;padding:0 2rem}
        .dk .hero h1{font-family:var(--sans);font-weight:800;font-size:clamp(3rem,8vw,6.5rem);line-height:1.02;letter-spacing:-.04em}
        .dk .hero-accent{background:linear-gradient(135deg,#b48cde,#a78bfa,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .dk .hero-desc{font-size:clamp(.88rem,1.5vw,1.08rem);color:rgba(255,255,255,.7);line-height:1.8;font-weight:300;margin-top:2rem;max-width:640px;margin-left:auto;margin-right:auto}
        .dk .hero-pills{display:flex;gap:.5rem;justify-content:center;margin-top:2.5rem;flex-wrap:wrap}
        .dk .hero-pill{font-family:var(--mono);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;padding:.45rem 1rem;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.5);border-radius:99px}
        .dk .hero-stats{position:absolute;bottom:0;left:0;right:0;z-index:10;display:grid;grid-template-columns:repeat(4,1fr)}
        .dk .hero-stat{padding:2rem 1.5rem;text-align:center;border-top:1px solid rgba(255,255,255,.08)}
        .dk .hero-stat-n{font-family:var(--sans);font-weight:700;font-size:clamp(1.8rem,3.5vw,2.8rem);letter-spacing:-.03em;line-height:1}
        .dk .hero-stat-l{font-family:var(--mono);font-size:.55rem;color:rgba(255,255,255,.35);letter-spacing:.12em;text-transform:uppercase;margin-top:.5rem}

        /* EDITORIAL STATEMENT */
        .dk .stmt{padding:10rem 0;text-align:center}
        .dk .stmt-text{font-family:var(--serif);font-weight:300;font-size:clamp(2.2rem,5vw,4.5rem);line-height:1.15;letter-spacing:-.03em;max-width:900px;margin:0 auto}
        .dk .stmt-text strong{font-weight:600;color:var(--accent)}
        .dk .stmt-sub{font-family:var(--mono);font-size:.7rem;color:var(--g3);letter-spacing:.2em;text-transform:uppercase;margin-top:3rem}

        /* SECTION */
        .dk .sec{padding:8rem 0}
        .dk .sec-compact{padding:5rem 0}
        .dk .sec-alt{background:#111113}
        .dk .hed{font-family:var(--serif);font-weight:300;font-size:clamp(2rem,4vw,3.5rem);line-height:1.12;letter-spacing:-.02em}
        .dk .hed strong{font-weight:600}
        .dk .hed-accent{color:var(--accent)}
        .dk .sub{font-size:1.05rem;color:var(--g1);line-height:1.75;font-weight:300;margin-top:1.5rem;max-width:640px}

        /* STAT CARDS */
        .dk .stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--g4);border-radius:12px;overflow:hidden;margin-top:3rem}
        .dk .stat-card{padding:2.5rem 1.5rem;text-align:center;border-right:1px solid var(--g4)}
        .dk .stat-card:last-child{border-right:none}
        .dk .stat-n{font-family:var(--sans);font-weight:700;font-size:clamp(2rem,4vw,3rem);letter-spacing:-.03em;line-height:1}
        .dk .stat-n .plus{font-size:.5em;color:var(--accent)}
        .dk .stat-l{font-family:var(--mono);font-size:.6rem;color:var(--g2);letter-spacing:.12em;text-transform:uppercase;margin-top:.75rem}

        /* PROBLEM CARDS */
        .dk .prob-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:3rem}
        .dk .prob{padding:2.5rem;border:1px solid var(--g4);margin-right:-1px;margin-bottom:-1px}
        .dk .prob-idx{font-family:var(--serif);font-size:2rem;font-weight:300;color:var(--g4);line-height:1;margin-bottom:1rem}
        .dk .prob-t{font-weight:600;font-size:1rem;margin-bottom:.75rem}
        .dk .prob-d{font-size:.88rem;color:var(--g1);line-height:1.65;font-weight:300}

        /* WORK PHOTOS */
        .dk .photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-top:3rem;border-radius:12px;overflow:hidden}
        .dk .photo-grid img{width:100%;aspect-ratio:16/10;object-fit:cover;filter:brightness(.85);transition:filter .4s}
        .dk .photo-grid img:hover{filter:brightness(1)}
        .dk .photo-cap{font-family:var(--mono);font-size:.55rem;color:var(--g3);text-align:center;padding:.5rem;letter-spacing:.08em;text-transform:uppercase}

        /* CASE STUDY VIDEO CARDS */
        .dk .cs-vid-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;margin-top:3rem;border-radius:12px;overflow:hidden}
        .dk .cs-vid-card{position:relative;aspect-ratio:16/9;overflow:hidden}
        .dk .cs-vid-card video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .dk .cs-vid-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.7) 100%);z-index:2}
        .dk .cs-vid-c{position:absolute;bottom:0;left:0;right:0;z-index:3;padding:2rem 2.5rem}
        .dk .cs-vid-logo{height:20px;width:auto;margin-bottom:1rem;opacity:.9}
        .dk .cs-vid-title{font-weight:700;font-size:1.1rem;margin-bottom:.5rem}
        .dk .cs-vid-desc{font-size:.78rem;color:rgba(255,255,255,.65);font-weight:300;line-height:1.5}
        .dk .cs-vid-stats{display:flex;gap:2rem;margin-top:1.25rem}
        .dk .cs-vid-stat-n{font-family:var(--sans);font-weight:700;font-size:1.3rem;letter-spacing:-.02em;line-height:1}
        .dk .cs-vid-stat-l{font-family:var(--mono);font-size:.5rem;color:rgba(255,255,255,.4);letter-spacing:.1em;text-transform:uppercase;margin-top:.3rem}

        /* SERVICES GRID */
        .dk .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-top:3rem;border-radius:12px;overflow:hidden}
        .dk .svc-card{position:relative;overflow:hidden;min-height:280px;display:flex;flex-direction:column;justify-content:flex-end;padding:2rem 2rem;cursor:default}
        .dk .svc-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s;z-index:0}
        .dk .svc-card:hover img{transform:scale(1.06)}
        .dk .svc-card-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.78) 100%);z-index:1}
        .dk .svc-card-c{position:relative;z-index:2}
        .dk .svc-n{font-family:var(--serif);font-size:2.2rem;font-weight:300;color:rgba(255,255,255,.2);line-height:1;margin-bottom:.8rem}
        .dk .svc-t{font-weight:600;font-size:1.05rem;margin-bottom:.4rem}
        .dk .svc-d{font-size:.78rem;color:rgba(255,255,255,.55);line-height:1.55;font-weight:300}

        /* TEAM — larger photos, rounded rect */
        .dk .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:3rem;border-radius:12px;overflow:hidden}
        .dk .tm{background:var(--off);text-align:center;padding:2.5rem 1.5rem}
        .dk .tm img{width:120px;height:120px;border-radius:16px;object-fit:cover;margin:0 auto 1.2rem;filter:grayscale(1);border:2px solid var(--g4);transition:filter .4s}
        .dk .tm:hover img{filter:grayscale(0)}
        .dk .tm h4{font-weight:600;font-size:.95rem;margin-bottom:.25rem}
        .dk .tm span{font-family:var(--mono);font-size:.6rem;color:var(--g2);letter-spacing:.1em;text-transform:uppercase}

        /* GEO — full-width cards, no globe */
        .dk .geo-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:3rem;border-radius:12px;overflow:hidden}
        .dk .geo-card{background:var(--off);padding:2.5rem 2rem}
        .dk .geo-card h4{font-weight:600;font-size:1.2rem;margin-bottom:.6rem}
        .dk .geo-card p{font-size:.82rem;color:var(--g2);line-height:1.6;font-weight:300}
        .dk .geo-tag{font-family:var(--mono);font-size:.55rem;letter-spacing:.15em;text-transform:uppercase;margin-bottom:.75rem}

        /* PRESS */
        .dk .press-logos{display:flex;justify-content:center;gap:4rem;align-items:center;margin:3rem 0}
        .dk .press-logos img{height:28px;opacity:.4;filter:brightness(0) invert(1)}
        .dk .press-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--g4);border-radius:12px;overflow:hidden}
        .dk .press-stat{padding:2rem;text-align:center;border-right:1px solid var(--g4)}
        .dk .press-stat:last-child{border-right:none}
        .dk .press-stat-n{font-family:var(--serif);font-size:2.5rem;font-weight:300;line-height:1;letter-spacing:-.02em}
        .dk .press-stat-l{font-family:var(--mono);font-size:.55rem;color:var(--g2);letter-spacing:.12em;text-transform:uppercase;margin-top:.5rem}

        /* CTA */
        .dk .cta-sec{position:relative;padding:10rem 0;text-align:center;overflow:hidden}
        .dk .cta-bg{position:absolute;inset:0}
        .dk .cta-bg img{width:100%;height:100%;object-fit:cover}
        .dk .cta-ov{position:absolute;inset:0;background:rgba(10,10,11,.82)}
        .dk .cta-ov2{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,11,.6),transparent,rgba(10,10,11,.9))}
        .dk .cta-c{position:relative;z-index:2}
        .dk .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2.5rem}
        .dk .cta-btn-w{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 2rem;background:#fff;color:#000;font-weight:600;font-size:.85rem;border-radius:99px;text-decoration:none;transition:opacity .3s}
        .dk .cta-btn-w:hover{opacity:.85}
        .dk .cta-btn-o{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 2rem;border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);font-size:.85rem;border-radius:99px;text-decoration:none;transition:border-color .3s}
        .dk .cta-btn-o:hover{border-color:rgba(255,255,255,.35)}

        /* RESPONSIVE */
        @media(max-width:768px){
          .dk .hero h1{font-size:clamp(2.2rem,10vw,3.5rem)}
          .dk .hero-stats{grid-template-columns:repeat(2,1fr)}
          .dk .stat-grid,.dk .prob-grid,.dk .press-stats{grid-template-columns:repeat(2,1fr)}
          .dk .cs-vid-grid{grid-template-columns:1fr}
          .dk .team-grid{grid-template-columns:repeat(2,1fr)}
          .dk .photo-grid{grid-template-columns:repeat(2,1fr)}
          .dk .svc-grid{grid-template-columns:1fr 1fr}
          .dk .svc-card{min-height:220px}
          .dk .stmt{padding:6rem 0}
          .dk .stmt-text{font-size:clamp(1.8rem,6vw,2.5rem)}
          .dk .geo-strip{grid-template-columns:repeat(2,1fr)}
          .dk .press-logos{gap:2rem;flex-wrap:wrap}
        }
      `}</style>

      <Navbar />
      <div className="dk">

        {/* 01 — HERO */}
        <section className="hero">
          <img src="/images/posters/hero-background-poster.jpg" alt="" className="hero-poster" />
          <video autoPlay muted loop playsInline preload="auto">
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="hero-ov1" />
          <div className="hero-ov2" />
          <div className="hero-c">
            <img src={logo} alt="ium Labs" style={{ width: 52, height: 52, borderRadius: 14, margin: "0 auto 1.5rem" }} />
            <h1>Seoul Moves Fast.<br /><span className="hero-accent">We Make You Land.</span></h1>
            <p className="hero-desc">Korea-native operators engineering market entry for the world's top Web3 projects. From narrative to conversion — end-to-end.</p>
            <div className="hero-pills">
              {["Seoul HQ","Singapore","22+ Launches","$7B+ Client Valuation"].map(p => (
                <span key={p} className="hero-pill">{p}</span>
              ))}
            </div>
          </div>
          <div className="hero-stats">
            {[["14M","Active Investors"],["$12.8B","Daily Volume"],["78%","Upbit Dominance"],["340%","Listing Premium"]].map(([n,l]) => (
              <div key={l} className="hero-stat">
                <div className="hero-stat-n">{n}</div>
                <div className="hero-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* EDITORIAL STATEMENT */}
        <section className="stmt wrap dk-reveal">
          <p className="stmt-text">Korea is the world's third-largest crypto market by trading volume, but it's also the <strong>hardest to crack.</strong> Unique platforms, aggressive regulators, and cultural nuances that no translated deck will overcome.</p>
          <div className="stmt-sub">This is why we exist</div>
        </section>

        {/* 02 — PROBLEM */}
        <section className="sec wrap">
          <div className="dk-reveal">
            <div className="lbl">The Problem</div>
            <h2 className="hed">Why global projects <strong className="hed-accent">fail in Korea.</strong></h2>
            <p className="sub">Korea is not a "translate and launch" market. It has its own platforms, gatekeepers, cultural codes, and regulatory walls.</p>
          </div>
          <div className="prob-grid dk-reveal dk-d1">
            {([["01","Platform Lock-Out","Korean users live on Naver, KakaoTalk, DC Inside — not Google, Telegram, or Discord. Western playbooks have zero reach."],
              ["02","Exchange Gatekeeping","Upbit controls 78% of volume. Without relationships and compliance infrastructure, listing is impossible."],
              ["03","Cultural Mistranslation","Korean investors evaluate through institutional trust, not decentralization narratives. Western messaging doesn't convert."],
              ["04","KOL Fraud","60%+ of Korean crypto 'influencers' use fabricated engagement. Without direct relationships, you pay for bots."],
              ["05","Regulatory Complexity","VASP registration, Travel Rule, PIPA, crypto tax — the legal surface area is vast and enforcement is real."],
              ["06","Community Fragmentation","KakaoTalk (closed) not Telegram (open). Building across fragmented platforms requires native operators."]] as const).map(([i,t,d])=>(
              <div key={t} className="prob">
                <div className="prob-idx">{i}</div>
                <div className="prob-t">{t}</div>
                <div className="prob-d">{d}</div>
              </div>
            ))}
          </div>
          <div className="sn">02 / 08</div>
        </section>

        {/* 03 — SOLUTION */}
        <section className="sec wrap">
          <div className="dk-reveal">
            <div className="lbl">The Solution</div>
            <h2 className="hed">We don't localize decks. We <strong className="hed-accent">rebuild narratives</strong> and deploy operators.</h2>
            <p className="sub">ium Labs is Korea's dedicated growth engine for global Web3. Founded by Binance, KuCoin, and Upbit alumni who scaled exchanges to millions.</p>
          </div>
          <div className="stat-grid dk-reveal dk-d1" style={{ marginTop: "3rem" }}>
            {([["Operator Model","Founded by Binance, KuCoin, and Upbit operators. Same playbooks that scaled exchanges to millions."],
              ["Direct Access","230+ KOLs. Every one audience-verified, fraud-filtered. No broker markup."],
              ["End-to-End","9 services, one team. GTM to compliance. No vendor coordination."],
              ["30-Day Launch","Discovery to market presence in 30 days. Performance dashboards from week one."]] as const).map(([t,d])=>(
              <div key={t} className="stat-card" style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600, fontSize: ".9rem", marginBottom: ".5rem" }}>{t}</div>
                <div style={{ fontSize: ".8rem", color: "var(--g1)", lineHeight: 1.6, fontWeight: 300 }}>{d}</div>
              </div>
            ))}
          </div>
          <div className="sn">03 / 08</div>
        </section>

        {/* 04 — TRACTION */}
        <section className="sec sec-alt">
          <div className="wrap">
            <div className="dk-reveal">
              <div className="lbl">Traction</div>
              <h2 className="hed">Numbers that <strong className="hed-accent">compound.</strong></h2>
            </div>
            <div className="stat-grid dk-reveal dk-d1">
              {[["$7B","Combined Client Valuation"],["22","Successful Korea Entries"],["230","Direct KOL Relationships"],["$30M","Revenue Attributed"]].map(([n,l])=>(
                <div key={l} className="stat-card">
                  <div className="stat-n">{n}<span className="plus">+</span></div>
                  <div className="stat-l">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="wrap" style={{ marginTop: "4rem" }}>
            <div className="lbl dk-reveal">Selected Events & Activations</div>
            <div className="photo-grid dk-reveal dk-d1">
              {([
                [eventSahara, "Sahara AI · 400+ Attendees"],
                [eventBnb, "BNB Chain · VIP Hanok Dinner"],
                [eventAptos, "Aptos · Seoul Meetup"],
                [eventMantra, "Mantra · Networking Night"],
                [eventStory, "Story · Origin Summit 2025"],
                [eventPeaq, "peaq · Korea Summit"],
              ] as const).map(([img, cap]) => (
                <div key={cap}>
                  <img src={img} alt={cap} />
                  <div className="photo-cap">{cap}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="wrap"><div className="sn">04 / 08</div></div>
        </section>

        {/* EDITORIAL BREAK */}
        <section className="stmt wrap dk-reveal">
          <p className="stmt-text">We don't localize decks.<br />We <strong>rebuild narratives</strong> and deploy operators.</p>
          <div className="stmt-sub">22 projects launched in Korea</div>
        </section>

        {/* 05 — CASE STUDIES */}
        <section className="sec wrap">
          <div className="dk-reveal">
            <div className="lbl">Case Studies</div>
            <h2 className="hed">Projects we <strong className="hed-accent">launched in Korea.</strong></h2>
            <p className="sub">From AI infrastructure to IP protocols, each entry required a tailored Korea playbook.</p>
          </div>
          <div className="cs-vid-grid dk-reveal dk-d1">
            <div className="cs-vid-card">
              <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/sahara-hero.jpg">
                <source src="/videos/projects/sahara-hero.mp4" type="video/mp4" />
              </video>
              <div className="cs-vid-ov" />
              <div className="cs-vid-c">
                <img src={logoSaharaColor} alt="Sahara AI" className="cs-vid-logo" />
                <div className="cs-vid-title">AI Infrastructure Launch</div>
                <div className="cs-vid-desc">400-person Seoul flagship event, KOL blitz across Korean CT, Naver SEO + PR campaign.</div>
                <div className="cs-vid-stats">
                  <div><div className="cs-vid-stat-n">400+</div><div className="cs-vid-stat-l">Event Attendees</div></div>
                  <div><div className="cs-vid-stat-n">2.8M</div><div className="cs-vid-stat-l">Impressions</div></div>
                  <div><div className="cs-vid-stat-n">15K</div><div className="cs-vid-stat-l">KR Community</div></div>
                </div>
              </div>
            </div>
            <div className="cs-vid-card">
              <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/story-hero.jpg">
                <source src="/videos/projects/story-hero.mp4" type="video/mp4" />
              </video>
              <div className="cs-vid-ov" />
              <div className="cs-vid-c">
                <img src={logoStoryColor} alt="Story Protocol" className="cs-vid-logo" />
                <div className="cs-vid-title">Origin Summit Seoul</div>
                <div className="cs-vid-desc">Full Korea GTM: Origin Summit co-production, 50+ KOL activations, #1 trending on Korean CT.</div>
                <div className="cs-vid-stats">
                  <div><div className="cs-vid-stat-n">#1</div><div className="cs-vid-stat-l">Korean CT Trending</div></div>
                  <div><div className="cs-vid-stat-n">50+</div><div className="cs-vid-stat-l">KOLs Activated</div></div>
                  <div><div className="cs-vid-stat-n">4.2M</div><div className="cs-vid-stat-l">Media Reach</div></div>
                </div>
              </div>
            </div>
            <div className="cs-vid-card">
              <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/bnb-hero.jpg">
                <source src="/videos/projects/bnb-hero.mp4" type="video/mp4" />
              </video>
              <div className="cs-vid-ov" />
              <div className="cs-vid-c">
                <img src={logoBnbColor} alt="BNB Chain" className="cs-vid-logo" />
                <div className="cs-vid-title">Ecosystem Growth Korea</div>
                <div className="cs-vid-desc">VIP Hanok dinner series, institutional BD, ongoing community ops and quarterly events.</div>
                <div className="cs-vid-stats">
                  <div><div className="cs-vid-stat-n">30+</div><div className="cs-vid-stat-l">Partnerships</div></div>
                  <div><div className="cs-vid-stat-n">5</div><div className="cs-vid-stat-l">Seoul Events</div></div>
                  <div><div className="cs-vid-stat-n">$1.5B</div><div className="cs-vid-stat-l">TVL</div></div>
                </div>
              </div>
            </div>
            <div className="cs-vid-card">
              <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/mantra-hero.jpg">
                <source src="/videos/projects/mantra-hero.mp4" type="video/mp4" />
              </video>
              <div className="cs-vid-ov" />
              <div className="cs-vid-c">
                <img src={logoMantraColor} alt="Mantra" className="cs-vid-logo" />
                <div className="cs-vid-title">RWA Protocol Korea Entry</div>
                <div className="cs-vid-desc">Community launch, KOL campaign, exchange listing support, and ongoing PR in Korean media.</div>
                <div className="cs-vid-stats">
                  <div><div className="cs-vid-stat-n">25+</div><div className="cs-vid-stat-l">KOLs Activated</div></div>
                  <div><div className="cs-vid-stat-n">12</div><div className="cs-vid-stat-l">Press Articles</div></div>
                  <div><div className="cs-vid-stat-n">8K</div><div className="cs-vid-stat-l">KR Community</div></div>
                </div>
              </div>
            </div>
          </div>
          <div className="sn">05 / 08</div>
        </section>

        {/* 06 — SERVICES */}
        <section className="sec sec-alt">
          <div className="wrap">
            <div className="dk-reveal">
              <div className="lbl">Full-Stack Services</div>
              <h2 className="hed">Everything you need to <strong className="hed-accent">land in Korea.</strong></h2>
            </div>
            <div className="svc-grid dk-reveal dk-d1">
              {([["01","GTM Strategy","Competitive analysis, Korea-fit narrative, audience segmentation, launch roadmap.",svcGtm],
                ["02","KOL & Influencer","230+ vetted KOLs. YouTube, X, Telegram, Naver. Direct — no brokers.",svcKol],
                ["03","PR & Media","CoinDesk Korea, Block Media, TokenPost. 87% placement rate.",svcPr],
                ["04","Community","24/7 native managers. Telegram, Discord, KakaoTalk. 92% retention.",svcCommunity],
                ["05","Offline Events","KBW side events, VIP dinners, launch parties. 40+ Seoul venue relationships.",svcEvents],
                ["06","Deep Research","On-chain analytics, competitor mapping, sentiment tracking. 47 reports.",svcResearch],
                ["07","SEO & Paid Ads","Naver SEO, Google/X Ads, crypto ad networks. 287% traffic growth.",svcSeo],
                ["08","AMA Hosting","Native Korean hosts. 200+ AMAs, 50K+ live participants.",svcAma],
                ["09","Compliance","VASP registration, PIPA, AML/KYC. Partnership with Freeman Law.",svcCompliance]] as const).map(([n,t,d,img])=>(
                <div key={n} className="svc-card">
                  <img src={img} alt={t} />
                  <div className="svc-card-ov" />
                  <div className="svc-card-c">
                    <div className="svc-n">{n}</div>
                    <div className="svc-t">{t}</div>
                    <div className="svc-d">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="wrap"><div className="sn">06 / 08</div></div>
        </section>

        {/* 07 — TEAM */}
        <section className="sec wrap">
          <div className="dk-reveal">
            <div className="lbl">Team</div>
            <h2 className="hed">Built by operators, <strong className="hed-accent">not consultants.</strong></h2>
            <p className="sub">Every member has lived inside the Korean crypto ecosystem — operating exchanges, managing communities, running campaigns firsthand.</p>
          </div>
          <div className="team-grid dk-reveal dk-d1">
            {([
              [teamDavid, "David", "CEO"],
              [teamBennet, "Bennet", "COO"],
              [teamJ, "J", "CMO"],
              [teamKevin, "Kevin", "Head of BD"],
              [teamSuki, "Suki", "Managing Partner"],
              [teamLewis, "Lewis", "PR Manager"],
              [teamRachel, "Rachel", "Designer"],
              [teamHyukjae, "Hyukjae", "BD Manager"],
            ] as const).map(([img, n, r]) => (
              <div key={n} className="tm">
                <img src={img} alt={n} />
                <h4>{n}</h4>
                <span>{r}</span>
              </div>
            ))}
          </div>
          <div className="sn">07 / 08</div>
        </section>

        {/* COVERAGE + PRESS (combined compact) */}
        <section className="sec-compact sec-alt">
          <div className="wrap">
            <div className="dk-reveal">
              <div className="lbl">Coverage</div>
              <h2 className="hed">Korea-native. <strong className="hed-accent">Asia-wide reach.</strong></h2>
            </div>
            <div className="geo-strip dk-reveal dk-d1">
              <div className="geo-card" style={{ borderLeft: "2px solid var(--accent)" }}>
                <div className="geo-tag" style={{ color: "var(--accent)" }}>Headquarters</div>
                <h4>South Korea</h4>
                <p>Upbit, Bithumb, Korean CT, Naver, Kakao, DC Inside. Full native team in Seoul.</p>
              </div>
              {([["Japan","LINE ecosystem, bitFlyer, Coincheck. Regulated entry."],["Taiwan","Local KOL network, exchange partnerships, community ops."],["China","Mainland BD, institutional network, WeChat CT."]] as const).map(([c,d])=>(
                <div key={c} className="geo-card">
                  <div className="geo-tag" style={{ color: "var(--g2)" }}>Active Market</div>
                  <h4>{c}</h4>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="wrap" style={{ marginTop: "4rem" }}>
            <div className="lbl dk-reveal">Press & Media</div>
            <div className="press-logos dk-reveal dk-d1">
              {([
                [logoCoindesk, "CoinDesk Korea"],
                [logoBlockmedia, "Block Media"],
                [logoHankyung, "Hankyung"],
              ] as const).map(([img, name]) => (
                <img key={name} src={img} alt={name} />
              ))}
            </div>
            <div className="press-stats dk-reveal dk-d2">
              {[["64+","Press Articles"],["87%","Placement Rate"],["47","Research Reports"],["5M+","Media Reach"]].map(([n,l])=>(
                <div key={l} className="press-stat">
                  <div className="press-stat-n">{n}</div>
                  <div className="press-stat-l">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 — CTA */}
        <section className="cta-sec">
          <div className="cta-bg">
            <img src={seoulCta} alt="" />
            <div className="cta-ov" />
            <div className="cta-ov2" />
          </div>
          <div className="cta-c dk-reveal">
            <img src={logo} alt="ium Labs" style={{ width: 48, height: 48, borderRadius: 14, margin: "0 auto 1.5rem" }} />
            <h2 className="hed" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>Ready to land <strong className="hed-accent">in Korea?</strong></h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.6)", lineHeight: 1.8, fontWeight: 300, marginTop: "1.5rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
              From strategy to execution. One call to align on your Korea market entry. Free 30-minute discovery. 24-hour response guarantee.
            </p>
            <div className="cta-btns">
              <a href="/book-a-meeting" className="cta-btn-w">Book a Meeting</a>
              <a href="/contact" className="cta-btn-o">Send a Message</a>
            </div>
            <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap", marginTop: "3rem" }}>
              {([["Email","hello@iumlabs.io"],["Web","iumlabs.io"],["Location","Seoul · Singapore"]] as const).map(([l,v])=>(
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: ".55rem", color: "var(--g3)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".3rem" }}>{l}</div>
                  <div style={{ fontSize: ".9rem", fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ width: 40, height: 1, background: "var(--accent)", opacity: .4, margin: "3rem auto 1rem" }} />
            <div style={{ fontFamily: "var(--mono)", fontSize: ".6rem", color: "var(--g3)", letterSpacing: ".1em" }}>Confidential — ium Labs Q2 2026</div>
          </div>
          <div className="wrap"><div className="sn">08 / 08</div></div>
        </section>

      </div>
      <FooterLinksSection />
    </>
  );
};

export default PitchDeck;
