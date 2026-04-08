import { motion } from "framer-motion";
import { useState } from "react";
import { Expand } from "lucide-react";
import { ProjectData, ProjectMetric } from "@/data/projectsData";
import Lightbox from "@/components/Lightbox";

interface ProjectContentSectionProps {
  project: ProjectData & { client_name?: string; duration?: string; featureImage?: string };
  metrics?: ProjectMetric[];
  gallery?: Array<{ src: string; title?: string; description?: string }>;
}

const ProjectContentSection = ({ project, metrics, gallery }: ProjectContentSectionProps) => {
  const displayMetrics = metrics || project.metrics;
  const displayGallery = gallery || project.gallery;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = (displayGallery || []).map(item => ({
    src: item.src,
    title: item.title || "",
    description: item.description || ""
  }));

  return (
    <div className="bg-[#0A0A0A]">
      {/* ===== META BAR ===== */}
      <section className="border-b border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent">
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
      <section
        className="relative px-6 md:px-10 lg:px-16 py-16 md:py-24"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* Radial accent glow behind results */}
        <div
          className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none blur-[160px]"
          style={{ backgroundColor: project.glowColor, opacity: 0.04 }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0">
          {/* Left Column: What We Did */}
          <motion.div
            className="lg:pr-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-[10px] text-white/30 font-mono tracking-widest">01</span>
              <h2
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
            </div>

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

            {/* Deliverables as chips/tags */}
            {project.services && project.services.length > 0 && (
              <div className="mt-10">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider block mb-4">
                  Deliverables
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {project.services.map((service, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-white/70 hover:bg-white/[0.07] hover:text-white/90 transition-colors duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <span
                        className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#4A7CFF" }}
                      />
                      {service}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Results Stack */}
          {displayMetrics && displayMetrics.length > 0 && (
            <div className="lg:border-l lg:border-white/[0.06] lg:pl-20">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-[10px] text-white/30 font-mono tracking-widest">02</span>
                <motion.span
                  className="font-mono text-[10px] text-white/30 uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Results
                </motion.span>
              </div>

              <div className="border-t border-white/10">
                {displayMetrics.map((metric, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between py-6 border-b border-white/10 hover:bg-white/[0.03] transition-colors duration-300 px-2 -mx-2 rounded-sm"
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

      {/* ===== GALLERY SECTION ===== */}
      {displayGallery && displayGallery.length > 0 && (
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24 border-t border-white/[0.06]">
          <motion.div
            className="flex items-baseline gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] text-white/30 font-mono tracking-widest">03</span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "2rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              Gallery
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayGallery.map((item, i) => (
              <motion.div
                key={i}
                className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={item.src}
                  alt={item.title || ""}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90">
                  <Expand className="w-5 h-5 text-gray-700" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-lg font-medium text-white">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-white/80 mt-1">{item.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />

      <div className="h-8 md:h-10" />
    </div>
  );
};

export default ProjectContentSection;
