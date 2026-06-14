import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import ProjectStrategy from "./ProjectStrategy";
import ProjectResults from "./ProjectResults";

interface ProjectContentSectionProps {
  project: ProjectData & { client_name?: string; duration?: string; featureImage?: string };
  metrics?: ProjectMetric[];
  gallery?: Array<{ src: string; title?: string; description?: string }>;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const SectionLabel = ({ index, label }: { index: string; label: string }) => (
  <div className="flex items-baseline gap-4">
    <span className="font-mono text-xs text-white/30">{index}</span>
    <span className="text-xs uppercase tracking-[0.25em] text-white/40">{label}</span>
  </div>
);

const ProjectContentSection = ({ project, metrics, gallery }: ProjectContentSectionProps) => {
  const displayMetrics = metrics || project.metrics;
  const meta = [
    { label: "Client", value: project.client_name || project.name },
    { label: "Category", value: project.category },
    { label: "Timeline", value: project.duration || "2025" },
    {
      label: "Services",
      value: (project.services && project.services.length > 0
        ? project.services
        : project.shortServices || []
      ).join(", "),
    },
  ].filter((m) => m.value);

  return (
    <div className="bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* ===== META GRID ===== */}
        <motion.section
          className="grid grid-cols-2 gap-x-6 gap-y-10 py-16 md:grid-cols-4 md:py-24"
          {...fadeUp}
        >
          {meta.map((m) => (
            <div key={m.label} className="border-t border-white/10 pt-5">
              <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
                {m.label}
              </span>
              <span className="block text-base font-medium leading-snug text-white md:text-lg">
                {m.value}
              </span>
            </div>
          ))}
        </motion.section>

        {/* ===== THE CHALLENGE ===== */}
        {project.challenge && (
          <motion.section className="border-t border-white/10 py-16 md:py-24" {...fadeUp}>
            <SectionLabel index="01" label="The Challenge" />
            <p className="mt-8 max-w-4xl text-2xl font-light leading-snug text-white/90 md:text-3xl lg:text-[2.5rem] lg:leading-[1.2]">
              {project.challenge}
            </p>
          </motion.section>
        )}
      </div>

      {/* ===== OUR STRATEGY ===== */}
      {project.strategy && project.strategy.length > 0 && (
        <ProjectStrategy
          strategy={project.strategy}
          glowColor={project.glowColor}
          intro={project.whatWeDid}
        />
      )}

      {/* ===== THE RESULTS ===== */}
      {displayMetrics && displayMetrics.length > 0 && (
        <ProjectResults
          metrics={displayMetrics}
          glowColor={project.glowColor}
          headline={project.result}
          timeline={project.duration}
        />
      )}

      {/* ===== GALLERY ===== */}
      {gallery && gallery.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <motion.section className="border-t border-white/10 py-16 md:py-24" {...fadeUp}>
            <SectionLabel index="04" label="Selected Work" />
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {gallery.map((item, idx) => (
                <figure key={idx} className="group">
                  <div className="overflow-hidden rounded-xl bg-[#111]">
                    <img
                      src={item.src}
                      alt={item.title || `${project.name} work ${idx + 1}`}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  {(item.title || item.description) && (
                    <figcaption className="mt-4">
                      {item.title && (
                        <span className="block text-sm font-medium text-white">{item.title}</span>
                      )}
                      {item.description && (
                        <span className="mt-1 block text-sm leading-relaxed text-white/50">
                          {item.description}
                        </span>
                      )}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </motion.section>
        </div>
      )}

      <div className="h-8 md:h-10" />
    </div>
  );
};

export default ProjectContentSection;
