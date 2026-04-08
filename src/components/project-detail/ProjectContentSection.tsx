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
      <section className="border-b border-white/[0.08]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.2em] block mb-2">Category</span>
              <span className="text-base font-semibold text-white/90">{project.category}</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}>
              <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.2em] block mb-2">Duration</span>
              <span className="text-base font-semibold text-white/90">{project.duration || "Ongoing"}</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.2em] block mb-2">Key Result</span>
              <span className="text-base font-semibold text-white/90">{project.result}</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.2em] block mb-2">Services</span>
              <span className="text-base font-semibold text-white/90">
                {(project.shortServices || project.services || []).join(" · ")}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DID (full width) ===== */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="mb-10 max-w-3xl"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              color: "rgba(255,255,255,0.95)",
            }}
            dangerouslySetInnerHTML={{
              __html: (project.whatWeDid || project.challenge || project.description || "").replace(
                /\*\*(.*?)\*\*/g,
                '<strong style="font-weight:600">$1</strong>'
              ),
            }}
          />

          {project.description && (project.whatWeDid || project.challenge) && (
            <div className="max-w-3xl space-y-5">
              <p className="text-[15px] leading-[1.8] text-white/50 font-light">{project.description}</p>
            </div>
          )}
        </motion.div>

        {/* Deliverables - list with border lines */}
        {project.services && project.services.length > 0 && (
          <div className="mt-14 max-w-3xl">
            <div className="border-t border-white/[0.06]">
              {project.services.map((service, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4 py-4 border-b border-white/[0.06]"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 bg-[#4A7CFF]" />
                  <span className="text-[15px] text-white/70">{service}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ===== RESULTS (full width, large) ===== */}
      {displayMetrics && displayMetrics.length > 0 && (
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="border-t border-white/[0.08]">
              {displayMetrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between py-8 md:py-10 border-b border-white/[0.08]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <div>
                    <span className="text-base md:text-lg font-semibold text-white/85 block">
                      {metric.label}
                    </span>
                    {metric.note && (
                      <span className="text-xs text-white/30 mt-1 block">{metric.note}</span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 300,
                      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
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
        </section>
      )}

      {/* ===== GALLERY ===== */}
      {displayGallery && displayGallery.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24 border-t border-white/[0.06]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayGallery.map((item, i) => (
              <motion.div
                key={i}
                className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-white/[0.02]"
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
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90">
                  <Expand className="w-4 h-4 text-gray-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <Lightbox
        images={lightboxImages}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
};

export default ProjectContentSection;
