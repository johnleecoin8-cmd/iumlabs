import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProjectData } from "@/data/projectsData";
import { getCaseStudyContent } from "@/data/caseStudyContent";
import { caseStudyOverrides } from "@/data/caseStudyOverrides";

/**
 * Long-form, Coinbound-style case study used for every project.
 * Pulls from the project's own fields and layers optional hand-written depth from
 * caseStudyContent (goals grid, titled solution blocks, testimonial, richer overview).
 */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Label = ({ index, label, accent }: { index: string; label: string; accent: string }) => (
  <div className="flex items-baseline gap-4">
    {index && <span className="font-mono text-xs" style={{ color: accent }}>{index}</span>}
    <span className="text-xs uppercase tracking-[0.25em] text-white/40">{label}</span>
  </div>
);

const CaseStudyLayout = ({
  project,
  slug,
}: {
  project: ProjectData & { client_name?: string };
  slug: string;
}) => {
  const accent = project.glowColor || "#9B59B6";
  const content = getCaseStudyContent(slug);

  const metrics = project.metrics || [];
  const overviewBody =
    content.overviewBody && content.overviewBody.length > 0
      ? content.overviewBody
      : project.description
      ? [project.description]
      : [];
  const solutions = content.solutions && content.solutions.length > 0 ? content.solutions : null;
  const strategy = project.strategy || [];
  const results = project.results || [];
  const services = project.services && project.services.length > 0 ? project.services : project.shortServices || [];

  // Sequential numbering across the narrative sections that actually render.
  let step = 0;
  const num = () => String(++step).padStart(2, "0");
  const overviewNum = overviewBody.length ? num() : "";
  const challengeNum = project.challenge ? num() : "";
  const approachNum = project.whatWeDid || solutions || strategy.length ? num() : "";
  const beforeAfter = caseStudyOverrides[slug]?.beforeAfter;
  const beforeAfterNum = beforeAfter && beforeAfter.length > 0 ? num() : "";
  const resultsNum = results.length || metrics.length ? num() : "";

  return (
    <div className="bg-[#0A0A0A]">
      {/* ===== STATS BAND ===== */}
      {metrics.length > 0 && (
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-14 md:py-20">
            <Label index="" label="Results by the numbers" accent={accent} />
            <motion.div
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              {metrics.slice(0, 4).map((m) => (
                <motion.div
                  key={m.label}
                  variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                >
                  <div className="text-4xl font-semibold leading-none tracking-tight md:text-6xl" style={{ color: accent }}>
                    {m.value}
                  </div>
                  <div className="mt-3 text-sm leading-snug text-white/55 md:text-base">{m.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== CLIENT OVERVIEW ===== */}
      {overviewBody.length > 0 && (
        <section className="border-t border-white/10">
          <motion.div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24" {...fadeUp}>
            <Label index={overviewNum} label="Client Overview" accent={accent} />
            <div className={`mt-8 grid gap-x-16 gap-y-6 ${content.overviewHeading ? "lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
              {content.overviewHeading && (
                <h2 className="text-3xl font-light leading-tight tracking-tight text-white md:text-4xl">
                  {content.overviewHeading}
                </h2>
              )}
              <div className="space-y-5 text-base leading-relaxed text-white/60 md:text-lg">
                {overviewBody.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {services.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3">
                    {services.map((s) => (
                      <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/55">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ===== THE CHALLENGE ===== */}
      {project.challenge && (
        <section className="border-t border-white/10">
          <motion.div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24" {...fadeUp}>
            <Label index={challengeNum} label="The Challenge" accent={accent} />
            <p className="mt-8 max-w-4xl text-2xl font-light leading-snug text-white/90 md:text-3xl lg:leading-[1.25]">
              {project.challenge}
            </p>
            {content.goals && content.goals.length > 0 && (
              <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
                {content.goals.map((g, i) => (
                  <div key={i} className="flex gap-4 bg-[#0A0A0A] p-6 md:p-8">
                    <span className="font-mono text-sm" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[15px] leading-relaxed text-white/70">{g}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* ===== WHAT WE DID ===== */}
      {(project.whatWeDid || solutions || strategy.length > 0) && (
        <section className="border-t border-white/10">
          <motion.div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24" {...fadeUp}>
            <Label index={approachNum} label="What We Did" accent={accent} />
            {project.whatWeDid && (
              <p className="mt-8 max-w-3xl text-xl font-light leading-relaxed text-white/80 md:text-2xl">
                {project.whatWeDid}
              </p>
            )}
            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
              {solutions
                ? solutions.map((s, i) => (
                    <div key={s.title}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="text-lg font-semibold text-white md:text-xl">{s.title}</h3>
                      </div>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/55 md:text-base">{s.body}</p>
                    </div>
                  ))
                : strategy.map((s, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="mt-0.5 font-mono text-sm" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-[15px] leading-relaxed text-white/70 md:text-base">{s}</p>
                    </div>
                  ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ===== BEFORE / AFTER ===== */}
      {beforeAfter && beforeAfter.length > 0 && (
        <section className="border-t border-white/10">
          <motion.div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24" {...fadeUp}>
            <Label index={beforeAfterNum} label="Before / After" accent={accent} />
            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {beforeAfter.map((b) => (
                <div key={b.label} className="grid gap-3 py-7 md:grid-cols-[0.4fr_1fr] md:gap-8">
                  <span className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>{b.label}</span>
                  <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-5">
                    <span className="flex-1 text-base leading-relaxed text-white/40 md:text-lg">{b.before}</span>
                    <ArrowRight className="hidden h-5 w-5 flex-shrink-0 md:block" style={{ color: accent }} />
                    <span className="flex-1 text-base font-medium leading-relaxed text-white md:text-lg">{b.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ===== THE RESULTS ===== */}
      {(results.length > 0 || project.result) && (
        <section className="border-t border-white/10">
          <motion.div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24" {...fadeUp}>
            <Label index={resultsNum} label="The Results" accent={accent} />
            {project.result && (
              <p className="mt-8 max-w-3xl text-2xl font-light leading-snug text-white/90 md:text-3xl">
                {project.result}
              </p>
            )}
            {results.length > 0 && (
              <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
                {results.map((r) => (
                  <div key={r.metric} className="grid gap-2 py-6 md:grid-cols-[0.4fr_1fr] md:gap-8 md:py-7">
                    <span className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>{r.metric}</span>
                    <span className="text-base leading-relaxed text-white/75 md:text-lg">{r.value}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* ===== TESTIMONIAL ===== */}
      {content.testimonial && (
        <section className="border-t border-white/10">
          <motion.div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16 py-20 md:py-28 text-center" {...fadeUp}>
            <p className="text-2xl font-light leading-snug text-white md:text-3xl lg:text-4xl lg:leading-[1.3]">
              <span style={{ color: accent }}>&ldquo;</span>
              {content.testimonial.quote}
              <span style={{ color: accent }}>&rdquo;</span>
            </p>
            <div className="mt-8 text-sm text-white/45">
              <span className="font-medium text-white/70">{content.testimonial.name}</span>, {content.testimonial.role}
            </div>
          </motion.div>
        </section>
      )}

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
              style={{ backgroundColor: accent }}
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

export default CaseStudyLayout;
