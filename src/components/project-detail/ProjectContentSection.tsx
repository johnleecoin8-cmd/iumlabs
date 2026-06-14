import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import ProjectStrategy from "./ProjectStrategy";
import ProjectResults from "./ProjectResults";

// Resolve DB-stored asset paths (e.g. "/src/assets/campaigns/x.jpg") to real bundled URLs.
const assetModules = {
  ...import.meta.glob("../../assets/campaigns/*", { eager: true, query: "?url", import: "default" }),
  ...import.meta.glob("../../assets/projects/*", { eager: true, query: "?url", import: "default" }),
} as Record<string, string>;
const assetByName: Record<string, string> = {};
for (const [path, url] of Object.entries(assetModules)) {
  const name = path.split("/").pop();
  if (name) assetByName[name] = url;
}
const resolveAssetSrc = (src?: string) => {
  if (!src) return src;
  if (/^https?:\/\//.test(src) || src.startsWith("data:")) return src;
  const name = src.split("/").pop();
  return (name && assetByName[name]) || src;
};

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

  // Sequential section numbering — only count sections that actually render.
  const hasChallenge = !!project.challenge;
  const hasStrategy = !!(project.strategy && project.strategy.length > 0);
  const hasResults = !!((displayMetrics && displayMetrics.length > 0) || project.result);
  const hasGallery = !!(gallery && gallery.length > 0);
  let step = 0;
  const num = (present: boolean) => (present ? String(++step).padStart(2, "0") : "");
  const challengeNum = num(hasChallenge);
  const strategyNum = num(hasStrategy);
  const resultsNum = num(hasResults);
  const galleryNum = num(hasGallery);

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
            <SectionLabel index={challengeNum} label="The Challenge" />
            <p className="mt-8 max-w-4xl text-2xl font-light leading-snug text-white/90 md:text-3xl lg:text-[2.5rem] lg:leading-[1.2]">
              {project.challenge}
            </p>
          </motion.section>
        )}
      </div>

      {/* ===== OUR STRATEGY ===== */}
      {hasStrategy && (
        <ProjectStrategy
          strategy={project.strategy}
          glowColor={project.glowColor}
          intro={project.whatWeDid}
          index={strategyNum}
        />
      )}

      {/* ===== THE RESULTS ===== */}
      {hasResults && (
        <ProjectResults
          metrics={displayMetrics}
          glowColor={project.glowColor}
          headline={project.result}
          timeline={project.duration}
          index={resultsNum}
        />
      )}

      {/* ===== GALLERY ===== */}
      {hasGallery && (
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <motion.section className="border-t border-white/10 py-16 md:py-24" {...fadeUp}>
            <SectionLabel index={galleryNum} label="Selected Work" />
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {gallery.map((item, idx) => (
                <figure key={idx} className="group">
                  <div className="overflow-hidden rounded-xl bg-[#111]">
                    <img
                      src={resolveAssetSrc(item.src)}
                      alt={item.title || `${project.name} work ${idx + 1}`}
                      loading="lazy"
                      onError={(e) => {
                        const fig = (e.currentTarget.closest("figure") as HTMLElement | null);
                        if (fig) fig.style.display = "none";
                      }}
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
