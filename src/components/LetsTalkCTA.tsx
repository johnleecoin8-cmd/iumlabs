import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { clientLogos } from "@/data/clients";

// Total delivered projects (top-level keys in projectsData.ts). Hardcoded so
// this above-the-fold CTA doesn't pull the image-heavy projectsData module
// into the initial bundle. Bump when the case-study roster grows.
const TOTAL_PROJECTS = 23;

/**
 * Big-type "Let's talk" CTA — ported from cuberto.com's footer "Tell us"
 * treatment (computed-style audit 2026-07-02: fw300 uppercase / ls -3% /
 * lh 0.95). Centered over an embedded client-logo cloud: the roster tiles the
 * background as a dense monochrome texture, radially masked and darkened at
 * center so the headline reads clean. Lives directly above the contact form
 * as the lead-in to the conversation.
 */
const LetsTalkCTA = () => (
  <div className="bg-[#0A0A0A] px-5 sm:px-6 lg:px-10">
    <Link
      to="/contact"
      className="group relative block overflow-hidden py-14 sm:py-16 lg:py-20"
    >
      {/* Background logo cloud — dense woven monochrome texture, radially
          masked + darkened at center; brightens and drifts on hover. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="grid w-[112%] grid-cols-6 place-items-center gap-x-5 gap-y-6 opacity-[0.17] transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-[0.28] group-hover:scale-[1.04] sm:grid-cols-9 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-12 lg:gap-x-10"
          style={{
            maskImage:
              "radial-gradient(ellipse 58% 78% at center, transparent 6%, rgba(0,0,0,0.3) 30%, black 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 58% 78% at center, transparent 6%, rgba(0,0,0,0.3) 30%, black 70%)",
          }}
        >
          {Array.from({ length: 96 }, (_, i) => {
            // offset the repeat each wrap so identical marks never stack
            // vertically into obvious columns
            const client = clientLogos[(i * 7 + Math.floor(i / 12) * 3) % clientLogos.length];
            return (
              <img
                key={i}
                src={client.logo}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-4 w-auto max-w-[52px] object-contain brightness-0 invert sm:h-5 sm:max-w-[64px]"
              />
            );
          })}
        </div>
      </div>

      {/* Center scrim keeps the headline legible over the cloud */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 64% at center, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 42%, transparent 74%)",
        }}
      />

      {/* Accent glow — a whisper of brand green blooms behind the type on
          hover, giving the panel depth without color-washing the marks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 40% 46% at center, hsl(var(--primary) / 0.14) 0%, transparent 70%)",
        }}
      />

      {/* Centered headline */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-[10px] sm:text-[11px] font-mono text-white/40 uppercase tracking-[0.3em] mb-4 sm:mb-5">
          Got a project in Korea?
        </p>
        <span className="footer-cta-type flex items-center justify-center gap-x-4 sm:gap-x-8 text-white">
          {/* buzzworthystudio.com mask-swap: brand-colored duplicate wipes
              across on hover (500ms cubic-bezier(1,0,0,1)) */}
          <span className="mask-swap" data-text="Let's talk">
            <span>Let&apos;s talk</span>
          </span>
          <ArrowUpRight
            className="w-[0.8em] h-[0.8em] text-primary transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[0.12em] group-hover:-translate-y-[0.12em]"
            strokeWidth={1.5}
          />
        </span>
        <span className="mt-5 sm:mt-6 inline-flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-[0.28em]">
          <span className="h-1 w-1 rounded-full bg-primary/70" />
          {TOTAL_PROJECTS} projects delivered
        </span>
      </div>
    </Link>
  </div>
);

export default LetsTalkCTA;
