import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProjectData } from "@/data/projectsData";

/**
 * Coinbound-style long-form case study, scoped to MANTRA as a format example.
 * Content is authored in code (not DB-driven) so the narrative is fully controlled.
 */

const ACCENT = "#9B59B6";

const stats = [
  { value: "$50M+", label: "Institutional pipeline built" },
  { value: "1", label: "Korea CEX listing secured" },
  { value: "130K+", label: "Korean impressions" },
  { value: "4+", label: "Tier-1 media features" },
];

const goals = [
  "Establish institutional credibility in a market that had never heard the Mantra story.",
  "Open a pipeline of serious Korean allocators, not retail noise.",
  "Educate the market on compliant, security-first RWA.",
  "Secure a credible path to a Korean exchange listing.",
];

const solutions = [
  {
    title: "Institutional-first PR & narrative",
    body: "We secured features across major Korean financial media and reframed Mantra's Middle Eastern track record as proof of institutional-grade execution, the language Korean allocators actually trust.",
  },
  {
    title: "RWA education seminars",
    body: "We hosted closed-door RWA seminars for Korean institutions, translating a complex, compliance-heavy thesis into the terms asset managers use to evaluate an allocation.",
  },
  {
    title: "Asset-manager partnerships & networking",
    body: "We partnered with Korean asset-management firms and ran networking events with financial professionals, turning a cold market entry into warm, credentialed introductions.",
  },
  {
    title: "Listing groundwork",
    body: "We built the relationships and documentation behind a Korean CEX listing, sequencing disclosure and partner trust so the listing landed as a milestone rather than a gamble.",
  },
];

const results = [
  { k: "Institutional pipeline", v: "$50M+ in qualified Korean allocator interest." },
  { k: "Exchange listing", v: "A Korean CEX listing secured, opening domestic liquidity." },
  { k: "Market presence", v: "130K+ impressions and 4+ tier-1 Korean media features." },
  { k: "Positioning", v: "Established as the compliant, security-first RWA name in Korean finance." },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Label = ({ index, label }: { index: string; label: string }) => (
  <div className="flex items-baseline gap-4">
    <span className="font-mono text-xs" style={{ color: ACCENT }}>{index}</span>
    <span className="text-xs uppercase tracking-[0.25em] text-white/40">{label}</span>
  </div>
);

const MantraCaseStudy = ({ project }: { project: ProjectData & { client_name?: string } }) => {
  return (
    <div className="bg-[#0A0A0A]">
      {/* ===== STATS BAND ===== */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-20">
          <Label index="" label="Results by the numbers" />
          <motion.div
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
              >
                <div className="text-4xl font-semibold leading-none tracking-tight text-white md:text-6xl" style={{ color: ACCENT }}>
                  {s.value}
                </div>
                <div className="mt-3 text-sm leading-snug text-white/55 md:text-base">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CLIENT OVERVIEW ===== */}
      <section className="border-t border-white/10">
        <motion.div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24" {...fadeUp}>
          <Label index="01" label="Client Overview" />
          <div className="mt-8 grid gap-x-16 gap-y-6 lg:grid-cols-[0.9fr_1.1fr]">
            <h2 className="text-3xl font-light leading-tight tracking-tight text-white md:text-4xl">
              The security-first RWA Layer 1, entering Korea's most demanding capital market.
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-white/60 md:text-lg">
              <p>
                Mantra is the security-first RWA Layer 1, purpose-built to tokenize real-world assets with regulatory compliance at its core. Backed by partnerships across Middle Eastern sovereign wealth and major financial institutions, Mantra had already proven its model abroad.
              </p>
              <p>
                The next frontier was Korea, one of the most active and most demanding capital markets in Asia. Winning there meant earning institutional trust on Korean terms, not importing a foreign playbook.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== THE CHALLENGE ===== */}
      <section className="border-t border-white/10">
        <motion.div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24" {...fadeUp}>
          <Label index="02" label="The Challenge" />
          <p className="mt-8 max-w-4xl text-2xl font-light leading-snug text-white/90 md:text-3xl lg:leading-[1.25]">
            Korean institutional capital is among the hardest in the world to earn. Allocators expect regulatory clarity, audited security, and credible local partners before a conversation even begins, and Middle Eastern success does not automatically translate.
          </p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            {goals.map((g, i) => (
              <div key={i} className="flex gap-4 bg-[#0A0A0A] p-6 md:p-8">
                <span className="font-mono text-sm" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[15px] leading-relaxed text-white/70">{g}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== WHAT WE DID ===== */}
      <section className="border-t border-white/10">
        <motion.div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24" {...fadeUp}>
          <Label index="03" label="What We Did" />
          <p className="mt-8 max-w-3xl text-xl font-light leading-relaxed text-white/80 md:text-2xl">
            An institutional-first market entry, positioning Mantra as the compliant RWA solution for Korean finance rather than another L1 chasing retail attention.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
            {solutions.map((s, i) => (
              <div key={s.title}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold text-white md:text-xl">{s.title}</h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55 md:text-base">{s.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== THE RESULTS ===== */}
      <section className="border-t border-white/10">
        <motion.div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24" {...fadeUp}>
          <Label index="04" label="The Results" />
          <p className="mt-8 max-w-3xl text-2xl font-light leading-snug text-white/90 md:text-3xl">
            Mantra didn't just enter Korea. It built a credentialed pipeline and a listing in a market that rarely opens to foreign protocols.
          </p>
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {results.map((r) => (
              <div key={r.k} className="grid gap-2 py-6 md:grid-cols-[0.4fr_1fr] md:gap-8 md:py-7">
                <span className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: ACCENT }}>{r.k}</span>
                <span className="text-base leading-relaxed text-white/75 md:text-lg">{r.v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="border-t border-white/10">
        <motion.div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16 py-20 md:py-28 text-center" {...fadeUp}>
          <p className="text-2xl font-light leading-snug text-white md:text-3xl lg:text-4xl lg:leading-[1.3]">
            <span style={{ color: ACCENT }}>&ldquo;</span>
            Korean institutions don&rsquo;t move on hype. ium gave us the credibility, the rooms, and the media to be taken seriously, and the pipeline followed.
            <span style={{ color: ACCENT }}>&rdquo;</span>
          </p>
          <div className="mt-8 text-sm text-white/45">
            <span className="font-medium text-white/70">Head of Marketing</span>, MANTRA
          </div>
        </motion.div>
      </section>

      {/* ===== CTA ===== */}
      <section className="border-t border-white/10">
        <motion.div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-20 md:py-28" {...fadeUp}>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-3xl font-light leading-tight tracking-tight text-white md:text-5xl">
              Planning a Korea entry of your own?
            </h2>
            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: ACCENT }}
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MantraCaseStudy;
