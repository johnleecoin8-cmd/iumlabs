# Reference CSS Library (extracted 2026-07-02)

Real values mined from live sites via computed-style audit + stylesheet download.
17 sites, 4 parallel extraction passes. Use these instead of inventing values.
Provenance is mandatory in commits that consume this file.

## Easing tokens (already in src/index.css :root)
| token | curve | source | use |
|---|---|---|---|
| --ease-loco | cubic-bezier(.215,.61,.355,1) | locomotive.ca (46 uses) + zajno --o3 | scroll reveals |
| --ease-reveal | cubic-bezier(.16,1,.3,1) | cuberto (11x), obys (11x), zajno --io6 | big reveals 0.6-1.2s |
| --ease-expo | cubic-bezier(.19,1,.22,1) | unseen, buzzworthy (60x), family (only bezier), zajno --o6 | hovers/underlines 350-800ms |
| --ease-wipe | cubic-bezier(.87,0,.13,1) | unseen | clip-path wipes |
| --ease-spring | cubic-bezier(.34,1.56,.64,1) | unseen, raycast (3x) | playful overshoot |
| --ease-swift | cubic-bezier(.25,.46,.45,.94) 0.16s | linear.app buttons; ninjapromo (13x) | micro-interactions |

Other verified curves: stripe cubic-bezier(.25,1,.5,1) .3s (23x) · raycast cubic-bezier(.23,1,.32,1) .3s (21x) · buzzworthy hard-swap cubic-bezier(1,0,0,1) 500ms clip-path masks · cuberto bounce cubic-bezier(.34,5.56,.64,1) button squash · exoape GSAP CustomEase "M0,0 C0.496,0.004 0,1 1,1".

## Typography formulas
- Vercel: display >=40px -> ls -0.06em, lh 1.0-1.2, w600; 24-32px -> -0.04em; body -0.02em.
- Stripe: headings w300, lh 1.03-1.07, ls -0.025em (editorial light).
- Raycast: small text on dark gets POSITIVE ls (+.1/.2px); hero 86px w400 ls -2px lh 1.
- Studio consensus (exoape/zajno/lunar): display vw-fluid, w300-400, lh 0.85-1.0, ls -0.02~-0.05em.
- Hello Monday: serif display lh 0.85 (Clarendon w300).
- Lunar: body letter-spacing -0.03em site-wide (421 uses).

## Dark-surface recipes (Raycast)
- Edge light: inset 0 1px 0 0 rgba(255,255,255,.08) (utility .surface-edge)
- Glow card: 0 0 40px 20px rgba(255,255,255,.03), inset 0 .5px 0 0 rgba(255,255,255,.3)
- Glass button: bg linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.1)); ring 0 0 0 1px rgba(255,255,255,.25) -> hover .5 -> active .15
- Grey ramp: #07080a 0c0d0f 111214 1b1c1e 2f3031 434345 6a6b6c 9c9c9d cdcece e6e6e6
- Floating window: 0 4px 40px 8px rgba(0,0,0,.4), 0 0 0 .5px rgba(0,0,0,.8), inset 0 .5px 0 0 rgba(255,255,255,.3)
- Linear button stack (--shadow-linear in index.css), Linear nav: fixed 73px, blur(20px), border-b rgba(255,255,255,.08)
- Family card: 0 1px 6px rgba(0,0,0,.04), 0 0 24px rgba(0,0,0,.05); hover pop 0 3px 16px rgba(0,0,0,.1)
- Stripe navy shadow pair: 0 30px 60px -50px rgba(0,0,0,.1), 0 30px 60px -10px rgba(50,50,93,.25)

## Interaction patterns (implemented as utilities in src/index.css)
- .link-underline — locomotive background-size sweep 0->100% 1px .25s
- .link-sweep — buzzworthy directional underline (sweep-in/out keyframes)
- .text-roll — cuberto attr(data-text) label roll .8s
- .stagger-rise — zajno 70ms-cascade meta rise 1000ms
- .surface-edge / .text-gradient-hero (vercel #fff->#adadad 110%)
- .footer-cta-type — cuberto 108px/w300/uppercase/ls -3%/lh .95
- .reveal-line / .reveal-fade — unseen line-mask entrance (body.intro-done gate)
- .mask-swap — buzzworthy clip-path text swap (footer CTA)
- .dim-list — hellomonday sibling dimming (footer columns, menu nav)
- .btn-glass — raycast glass button (nav pills)
- .bg-dots — vercel dot grid (coverage section)
- fading scrollbar — activetheory --baropacity (App.tsx scroll listener)
- Work-row accent fill — zajno: row hover floods brand color, text flips dark, .2s

## Not yet ported (next candidates)
- Lusion nav double-text roll + pill bg (scale .85->1, opacity .1)
- Lusion preloader odometer percent digits clamp(7em,8vw,20em)
- Hello Monday inline video slide-up on list rows
- Buzzworthy follow-cursor pill with rolling label (work slider)
- Cuberto card video-on-hover + cursor system (data-cursor-text)
- Exo Ape asymmetric 12-col work grid (explicit grid-line placement)
- Vercel conic rotating border, shimmer text; Stripe arrow-in nav hover, dashed hairlines
- Raycast kbd keycap, noise data-URI, mouse-follow spotlight (--gradient-x/y)
- Competitor trust devices: per-service outcome stats + verb CTAs (coinbound), one-giant-number case cards (marketacross), live coverage wall (marketacross), named-person Calendly section (lunar), homepage pricing (ninjapromo)

## Font substitution map (all reference faces are commercial)
Suisse Intl/Aeonik/TT Lakes/NB -> Inter (current) is fine; serif contrast option: Playfair (already loaded) ~ Saol/Clarendon role.
