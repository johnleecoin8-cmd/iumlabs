import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";
import ProjectStrategy from "./ProjectStrategy";
import ProjectGalleryGrid from "./ProjectGalleryGrid";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const anim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
};

/* ── Metric ──────────────────────────────────── */
const MetricItem = ({ metric, index }: { metric: ProjectMetric; index: number }) => {
  const match = metric.value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const num = match ? parseFloat(match[2].replace(/,/g, "")) : 0;
  const suffix = match ? match[3] : metric.value;

  const display = useCountUp({ end: num, duration: 2000, prefix, suffix, isVisible: true });

  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight block mb-1.5">
        {match ? display : metric.value}
      </span>
      <span className="text-xs text-white/30 uppercase tracking-[0.12em]">{metric.label}</span>
    </div>
  );
};

/* ── Section Header ──────────────────────────── */
const SH = ({ num, title }: { num: string; title: string }) => (
  <div className="flex items-center gap-6 lg:gap-8 mb-10 md:mb-14">
    <span className="text-[10px] md:text-xs text-white/20 font-mono tracking-widest">{num}</span>
    <h2 className="text-base md:text-lg font-medium text-white">{title}</h2>
  </div>
);

/* ── Main ────────────────────────────────────── */
interface Props {
  project: ProjectData & { client_name?: string; duration?: string; featureImage?: string };
  metrics?: ProjectMetric[];
  gallery?: Array<{ src: string; title?: string; description?: string }>;
}

const ProjectContentSection = ({ project, metrics, gallery }: Props) => {
  const displayMetrics = metrics || project.metrics;

  return (
    <div className="bg-black">
      {/* ═══ Overview ═══ */}
      <section className="border-t border-white/[0.06]">
        <div className="px-6 lg:px-20 xl:px-24 py-16 md:py-24">
          <motion.div {...anim}>
            <SH num="01" title="Overview" />
          </motion.div>

          <motion.div {...anim} className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            {/* Left — Meta */}
            <div className="space-y-8">
              <div>
                <span className="text-[10px] text-white/20 uppercase tracking-[0.15em] block mb-2">Client</span>
                <span className="text-lg font-semibold text-white">{project.client_name || project.name}</span>
              </div>
              <div className="h-px bg-white/[0.06]" />
              <div>
                <span className="text-[10px] text-white/20 uppercase tracking-[0.15em] block mb-2">Category</span>
                <span className="text-lg font-semibold text-white">{project.category}</span>
              </div>
              <div className="h-px bg-white/[0.06]" />
              <div>
                <span className="text-[10px] text-white/20 uppercase tracking-[0.15em] block mb-2">Year</span>
                <span className="text-lg font-semibold text-white">2025</span>
              </div>
              {project.result && (
                <>
                  <div className="h-px bg-white/[0.06]" />
                  <div>
                    <span className="text-[10px] text-white/20 uppercase tracking-[0.15em] block mb-2">Key Result</span>
                    <span className="text-xl font-bold text-white">{project.result}</span>
                  </div>
                </>
              )}
            </div>

            {/* Right — Description + Challenge */}
            <div className="space-y-10">
              <div>
                <h3 className="text-xs text-white/25 uppercase tracking-[0.15em] mb-4">About</h3>
                <p className="text-base md:text-lg text-white/70 leading-[1.8]">{project.description}</p>
              </div>
              {project.challenge && (
                <div>
                  <h3 className="text-xs text-white/25 uppercase tracking-[0.15em] mb-4">Challenge</h3>
                  <p className="text-base md:text-lg text-white/70 leading-[1.8]">{project.challenge}</p>
                </div>
              )}
              {project.services && project.services.length > 0 && (
                <div>
                  <h3 className="text-xs text-white/25 uppercase tracking-[0.15em] mb-4">Scope of Work</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((s, i) => (
                      <span key={i} className="px-3.5 py-1.5 text-xs text-white/50 border border-white/[0.08] rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Metrics ═══ */}
      {displayMetrics && displayMetrics.length > 0 && (
        <section className="border-t border-white/[0.06]">
          <div className="px-6 lg:px-20 xl:px-24 py-16 md:py-24">
            <motion.div {...anim}>
              <SH num="02" title="Results" />
            </motion.div>
            <motion.div
              {...anim}
              className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-0 divide-y divide-white/[0.06] md:divide-y-0"
            >
              {displayMetrics.map((m, i) => (
                <MetricItem key={i} metric={m} index={i} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══ Strategy ═══ */}
      {project.strategy && project.strategy.length > 0 && (
        <ProjectStrategy strategy={project.strategy} glowColor={project.glowColor} />
      )}

      {/* ═══ Gallery ═══ */}
      {gallery && gallery.length > 0 && (
        <section className="border-t border-white/[0.06]">
          <div className="px-6 lg:px-20 xl:px-24 py-16 md:py-24">
            <motion.div {...anim}>
              <SH num="03" title="Gallery" />
            </motion.div>
            <ProjectGalleryGrid
              gallery={gallery.map((g) => ({ src: g.src, title: g.title || "", description: g.description || "" }))}
              glowColor={project.glowColor}
            />
          </div>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <section className="border-t border-white/[0.06]">
        <div className="px-6 lg:px-20 xl:px-24 py-20 md:py-28">
          <motion.div {...anim} className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to enter Korea?
            </h3>
            <p className="text-sm md:text-base text-white/35 mb-8 leading-relaxed">
              Let ium Labs be your gateway to the Korean Web3 ecosystem.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all text-sm"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectContentSection;
