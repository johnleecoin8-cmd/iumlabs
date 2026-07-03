# Service-page media overhaul — plan

Goal: replace the generic / AI / stock media on every service detail page (and the homepage cards) with real, topically-precise media — real video or the exact right image — so each page *shows the actual work*. John's canonical example: **Paid Ads → pull a real OKX ad video from the Meta Ad Library** rather than a mockup graphic.

Standing constraint (from memory): reference-driven, not invented taste. Real assets over renders. Full color (no monochrome). Where no real asset fits, a clean branded panel (already built into ServiceTemplate).

---

## 1. Current inventory (grounding)

13 service pages via ServiceTemplate. Each: 1 hero + 2–5 feature images + 1 deliverable ≈ **60+ media slots**, plus 12 homepage cards.

**Already real / keep:**
- GTM — real campaign event photos (bnb-hanok, kucoin-party, mantra, bybit, sahara, polygon) + team.
- Offline Events — event-conference/dinner/party/meetup (real).
- Listing hero, Exchange-marketing (partially real screens).

**Bad (generic / AI / UI-mockup) → replace:**
- SEO & Paid Ads: `paid-ads-gallery.png`, `seo-performance.png`, `seo-growth-plan.webp`
- Exchange Marketing: `paid-ads-gallery.png`, `trading-kol-chart.webp`, `exchange-numbers.png`
- Influencer/KOL: `kol-performance.png`, `kol-multiplatform.png`, `kol-campaign.webp`, `kol-roster.webp`
- Community: `community-moderation.webp`, `comm-*`, `community-events.jpg`
- PR: `pr-newsroom.jpg`, `pr-distribution.webp`, `pr-mainstream.jpg`, `pr-crisis.jpg`, `pr-narrative-plan.webp`
- Deep Research: `dr-market-mapping.png`, `dr-onchain.png`, `dr-report.png`, `res-competitor.jpg`
- AMA: `ama-telegram/discord/moderation/content.jpg`, `ama-runofshow.webp`
- Capital / Liquidity: `capital-hero`, `res-market`, `liquidity-sizing`, `pr-analytics` (generic finance)
- Compliance: already converted to clean panels ✓

Phase 1 of execution = a screenshot contact-sheet audit that grades every slot keep / replace-image / replace-video / clean.

---

## 2. Per-service media strategy + source

| Service | Right media | Source |
|---|---|---|
| SEO / Paid Ads | Real KR crypto ad creatives (OKX/Bybit/Upbit), short video | **Meta Ad Library**, Google Ads Transparency, TikTok Creative Center |
| Exchange Marketing | Real exchange ad creatives + real funnel dashboard | Meta Ad Library + our own campaign numbers |
| Influencer / KOL | Real Korean crypto KOL clips/thumbnails | YouTube (real KR KOL channels), our own campaign clips |
| Community | Real meetup/event photos + Telegram/Kakao screens | Our campaign folder + captured chat screens |
| PR & Media | Real KR media article screenshots | CoinDesk Korea, TokenPost, Block Media (captured) |
| AMA | Real AMA recording clip / Spaces screenshot | YouTube/X of past AMAs |
| Deep Research | Our own native charts / on-chain dashboards | Reuse blog charts, Dune/DefiLlama captures |
| CEX Listing | Real Upbit/Bithumb listing-notice screenshots | Exchange announcement pages (captured) |
| Market Making | Real order-book depth / spread visuals | TradingView / exchange depth (captured) |
| Capital & OTC | Clean branded panel (no honest photo) | ServiceTemplate clean mode |
| GTM / Offline | Keep real event photos | — |
| Compliance | Clean panels (done) | — |

Rule of honesty: our own work first; market/competitor examples only where framed as market examples, never implied as ours.

---

## 3. Sourcing pipeline
1. **Meta Ad Library** (`facebook.com/ads/library`) — public. Search advertiser (OKX, Bybit, Bithumb, Upbit) + region KR. Capture the creative (image) or download the video. Headless capture via gstack browse.
2. **Headless screenshots** — Upbit/Bithumb notices, Naver SERP, KR media articles, on-chain dashboards. gstack browse at 1280×800, cookie banners removed, verify by eye (same discipline as blog primary-source captures).
3. **YouTube embeds** — real KOL / AMA videos, privacy-nocookie, lazy facade (click-to-load) for perf + CSP.
4. **Our own assets** — campaign folder, event footage, blog charts.

Processing: images → webp/avif, sized; videos → mp4/webm, muted, ≤ ~10s loops for ambient, poster frame captured, mobile falls back to poster image.

---

## 4. Technical build
- Extend ServiceTemplate: media slot accepts `{type: image|video|youtube, src, poster}`; feature/hero/deliverable render accordingly. Video = muted autoplay loop w/ poster + reduced-motion & mobile fallback to poster. (Clean mode already exists.)
- Homepage cards: optional video-on-hover (reference candidate: Cuberto card video-on-hover).
- Perf budget: hero video ≤ ~1.5 MB, lazy past-fold, `preload=none`, poster always set, `prefers-reduced-motion` respected.
- CSP: self-hosted video needs no external host; YouTube facade only loads on click.

---

## 5. Risks
- **Competitor creatives** (OKX/Binance ads): trademark/perception. Mitigate by framing as "market examples," preferring our own, and never implying authorship. **Needs John's call.**
- **Video weight / LCP**: strict budgets, posters, lazy load, image fallback.
- **Link rot** on captured screenshots: store the asset, cite source+date.
- **Maintenance**: ad creatives rotate; captured assets are snapshots, fine.

---

## 6. Phasing (large job, sequenced)
- **P0 Audit** — contact-sheet grade every slot (keep/replace/clean) + confirm per-service media spec.
- **P1 Plumbing** — add video/media support to ServiceTemplate + homepage card hover-video; ship with 1 pilot page (SEO/Paid Ads) end-to-end.
- **P2 Source** — batch capture/download real media per service (parallel), process to budget.
- **P3 Apply** — wire assets page by page, verify each by screenshot, keep clean panels where nothing honest fits.
- **P4 Finish** — OG re-capture where hero changed, perf pass (LCP/CLS), mobile check, push.

Pilot first (SEO/Paid Ads with a real OKX ad) to prove the pipeline before scaling to all 13.

---

## 7. Decisions (John, confirmed 2026-07-04)
- **Video hosting: HYBRID** — self-host ad-creative + event loops (mp4/webm, muted, poster, budgeted); YouTube facade (click-to-load) for long-form KOL/AMA.
- **Competitor creatives: USE AS MARKET EXAMPLES** — our own assets first; real OKX/Bybit/etc. ads from Meta Ad Library allowed, clearly framed as "Korea paid-ads market examples," never implied as ours.
- **Scope: PILOT THEN SEQUENTIAL** — build SEO/Paid Ads end-to-end with a real OKX ad to prove the pipeline, then replace worst-offenders in order (Paid Ads → Exchange → KOL → PR → Research → Community), leaving GTM / Offline Events / Compliance as-is.

---

## 8. Design decisions (from /plan-design-review, 2026-07-04)

Focused on the three biggest gaps. Ratings are for the plan-as-written before these fixes.

### 8.1 Video interaction states (was 4/10 — states unspecified, real a11y gap in code)
The current `<video autoPlay muted loop playsInline preload="metadata">` has two real defects to fix at implementation, not just prose:
1. **prefers-reduced-motion is NOT honored.** `autoPlay` is unconditional; browsers do not auto-pause muted autoplay for reduced-motion. Decision: gate autoplay on `matchMedia('(prefers-reduced-motion: reduce)')` — when reduce is set, do not autoplay; the poster is the resting state. (Add a small `useReducedMotion` guard in ServiceTemplate.)
2. **No lazy-load — below-fold videos waste data (240KB–2.3MB each).** Decision: mount/`preload` the video only when its container enters the viewport (IntersectionObserver, ~200px rootMargin); until then show the poster `<img>`. Keeps mobile data cost near zero for videos the user never scrolls to.

Locked states for every media video slot:
- **Loading**: fixed `aspect-[4/3]` container (already set) so there is zero CLS; poster visible until the first frame paints.
- **Reduced-motion / autoplay-blocked / data-saver**: poster image is the resting state; no broken UI, no controls needed (decorative).
- **Error (video 404)**: poster remains (always set a poster); assets are self-hosted under `public/videos/` so there is no third-party runtime dependency or link rot.
- **Mobile**: `playsInline muted` (iOS-safe) + lazy mount; poster-first.
- **A11y**: decorative video is `aria-hidden` with empty/absent alt; it must never carry information not also in the copy. The market-example caption stays as real text, not baked into the frame.

### 8.2 Media-treatment system + 13-page consistency (was 5/10 — per-service, no rule)
One rule, four allowed treatments, nothing else:
1. **real work / event photo** (our campaigns/events) — highest trust, use first.
2. **real product / ad screenshot or self-hosted ad video** (Meta Ad Library market examples, labeled).
3. **clean branded panel** — the canonical photo-less pattern (accent radial glow + `bg-dots` + oversized ghost icon), used where no honest real asset exists.
4. never: stock, AI-render, generic city photo, or baked-in-text mockup.

Consistency guardrails across the 13 pages:
- **Every page keeps at least one real anchor** (hero or one feature) so a page never reads as all-empty clean panels.
- **Cap clean panels** at roughly half a page's media slots; if more than half would be clean, the page needs sourcing, not more panels.
- Clean-panel accent = the page's own service accent (documented in 8.3), never a random color.

### 8.3 DESIGN.md alignment (was 3/10 — doc says one thing, code does another)
DESIGN.md §2 declares purple `#b48cde` the sole chromatic accent ("purple is the only chromatic color"), but the live system is: green `--brand: 158 64% 52%` as the global primary (hero CTA, links), plus per-service category accents (compliance purple `#A855F7`, liquidity teal, etc.), plus a 12-color neon set on the homepage service cards. Three accent systems, none matching the doc. The clean panels and market-example UI both inherit the per-page accent, so this drift is now load-bearing for the media work. This needs a brand call (see UNRESOLVED DECISIONS) before DESIGN.md can be trusted as the calibration source. Canonical stats also drift (doc $7B/22+/70+ vs live $8B/25+/116+) — out of this plan's scope but flagged.

---

## GSTACK REVIEW REPORT

| Run | Status | Findings |
|---|---|---|
| plan-design-review (focused, 3 gaps) | issues_found → fixed | 3 |

Focus (user-selected): the 3 biggest gaps, not the full 7 passes.

1. **Video interaction states** (4/10 → 8/10). Added §8.1: real a11y gap — `autoPlay` ignores `prefers-reduced-motion`; below-fold videos preload and waste 240KB–2.3MB. Locked loading/reduced-motion/error/mobile/a11y states. Fix at implementation (reduced-motion guard + IntersectionObserver lazy-mount in ServiceTemplate).
2. **Media-treatment system + 13-page consistency** (5/10 → 9/10). Added §8.2: one rule, four allowed treatments (real work photo > real product/ad > clean panel > never stock/AI); guardrails (≥1 real anchor per page, cap clean panels at ~half, accent = page category accent).
3. **DESIGN.md alignment** (3/10 → 8/10). Added §8.3. Resolved the accent drift: green is the global brand, per-service category accents are the secondary system. DESIGN.md §2 + don'ts + display-gradient line updated to match live. Canonical-stat drift flagged (out of scope).

VERDICT: PASS — plan design-complete for the media overhaul; §8.1 items are implementation TODOs, not blockers. (No CODEX / CROSS-MODEL run — user chose focused review.)

**UNRESOLVED DECISIONS:**
- Canonical stats drift (DESIGN.md $7B/22+/70+ vs live $8B/25+/116+) — pick the true numbers and make one source win. Out of this plan's scope; flagged for a separate pass.
