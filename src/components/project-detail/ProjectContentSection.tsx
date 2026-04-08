import { motion } from "framer-motion";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import ProjectStrategy from "./ProjectStrategy";

interface ProjectContentSectionProps {
  project: ProjectData & { client_name?: string; duration?: string; featureImage?: string };
  metrics?: ProjectMetric[];
  gallery?: Array<{ src: string; title?: string; description?: string }>;
}

const ProjectContentSection = ({ project, metrics, gallery }: ProjectContentSectionProps) => {
  const displayMetrics = metrics || project.metrics;

  return (
    <div className="bg-[#0A0A0A]">
      {/* ===== META BAR ===== */}
      <section className="border-b border-white/10">
        <div className="px-6 md:px-10 lg:px-16 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider block mb-2">
                Category
              </span>
              <span className="text-sm font-medium text-white/80">{project.category}</span>
            </motion.div>

            {/* Duration */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider block mb-2">
                Duration
              </span>
              <span className="text-sm font-medium text-white/80">
                {project.duration || "Ongoing"}
              </span>
            </motion.div>

            {/* Key Result */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider block mb-2">
                Key Result
              </span>
              <span className="text-sm font-medium text-white/80">{project.result}</span>
            </motion.div>

            {/* Services Used */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider block mb-2">
                Services Used
              </span>
              <span className="text-sm font-medium text-white/80">
                {project.shortServices?.join(", ") || project.services?.join(", ")}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CORE: WHAT WE DID + RESULTS ===== */}
      <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Column: What We Did */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "2rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              What We Did
            </h2>

            <div className="space-y-5">
              {(project.whatWeDid || project.challenge) && (
                <p className="text-[15px] leading-[1.75] text-white/60">
                  {project.whatWeDid || project.challenge}
                </p>
              )}
              {project.description && !project.whatWeDid && !project.challenge && (
                <p className="text-[15px] leading-[1.75] text-white/60">
                  {project.description}
                </p>
              )}
            </div>

            {/* Deliverables List */}
            {project.services && project.services.length > 0 && (
              <div className="mt-10">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider block mb-4">
                  Deliverables
                </span>
                <ul className="space-y-3">
                  {project.services.map((service, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-3 text-sm text-white/70"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                    >
                      <span
                        className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#4A7CFF" }}
                      />
                      {service}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Right Column: Results Stack */}
          {displayMetrics && displayMetrics.length > 0 && (
            <div>
              <motion.span
                className="font-mono text-[10px] text-white/30 uppercase tracking-wider block mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Results
              </motion.span>

              <div className="border-t border-white/10">
                {displayMetrics.map((metric, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between py-6 border-b border-white/10"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <div>
                      <span className="text-[0.88rem] font-medium text-white/80 block">
                        {metric.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 300,
                        fontSize: "3rem",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        color: "#4A7CFF",
                      }}
                    >
                      {metric.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== SECTION: APPROACH / STRATEGY ===== */}
      {project.strategy && project.strategy.length > 0 && (
        <ProjectStrategy strategy={project.strategy} glowColor={project.glowColor} />
      )}

      <div className="h-8 md:h-10" />
    </div>
  );
};

export default ProjectContentSection;
