import { ArrowRight, Play } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

// Import actual campaign images from assets
import bnbEvent from "@/assets/campaigns/bnb-event.jpg";
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import fogoFest from "@/assets/campaigns/fogo-fest.avif";
import peaqSummit from "@/assets/campaigns/peaq-summit.jpg";
import triaLaunch from "@/assets/campaigns/tria-launch.jpg";
import lbankFestival from "@/assets/campaigns/lbank-festival.jpg";
import kucoinOldschool from "@/assets/campaigns/kucoin-oldschool.jpg";
import openledgerInterview from "@/assets/campaigns/openledger-interview.jpg";
import zkpassNights from "@/assets/campaigns/zkpass-verifiable-nights.jpg";
import saharaAi from "@/assets/campaigns/sahara-ai.jpg";
import synfuturesBillboard from "@/assets/campaigns/synfutures-billboard.jpg";

const campaignImages = [
  { src: bnbEvent, alt: "BNB Chain Event", title: "BNB Chain", subtitle: "Korea Launch Event 2024" },
  { src: ondoSeminar, alt: "Story Protocol", title: "Story Protocol", subtitle: "Origin Summit 2025" },
  { src: fogoFest, alt: "FOGO Fest", title: "FOGO", subtitle: "Fogo Fest 2025" },
  { src: peaqSummit, alt: "Peaq Summit", title: "Peaq", subtitle: "KBW 2025" },
  { src: triaLaunch, alt: "Tria Launch", title: "Tria", subtitle: "Korea Media Interview" },
  { src: lbankFestival, alt: "Lbank Festival", title: "Lbank", subtitle: "1001 Festival Seoul" },
  { src: kucoinOldschool, alt: "Kucoin Event", title: "Kucoin", subtitle: "Old School is Back" },
  { src: openledgerInterview, alt: "Open Ledger", title: "Open Ledger", subtitle: "Korea Media Interview" },
  { src: zkpassNights, alt: "zkPass Nights", title: "zkPass", subtitle: "The Verifiable Nights" },
  { src: saharaAi, alt: "Sahara AI", title: "Sahara AI", subtitle: "Korean AI x Web3 Launch" },
  { src: synfuturesBillboard, alt: "SynFutures", title: "SynFutures", subtitle: "Gangnam Billboard" },
];

// 3D Tilt Card Component
const TiltGalleryCard = ({ image, index }: { image: typeof campaignImages[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative aspect-[4/5] cursor-pointer"
    >
      {/* Card with 3D depth */}
      <div className="absolute inset-0 rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-xl shadow-black/20"
           style={{ transform: "translateZ(0px)" }}>
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5"
             style={{ transform: "translateZ(30px)" }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <p className="text-white font-semibold text-lg mb-1">{image.title}</p>
            <p className="text-white/60 text-sm">{image.subtitle}</p>
          </motion.div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
             style={{
               background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)"
             }} />
      </div>
    </motion.div>
  );
};

const FilmstripGallerySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-[#050508] py-20 overflow-hidden">
      {/* Cinematic header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            {/* Play button style icon */}
            <motion.div
              className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-sm"
              whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.5)" }}
            >
              <Play className="w-6 h-6 text-white/70 ml-1" />
            </motion.div>
            <div>
              <p className="text-white/40 text-sm tracking-widest uppercase mb-2">Campaign Reel</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Our Work</h2>
            </div>
          </div>
          
          {/* Carousel indicators */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/30'
                }`}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3D Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
             style={{ perspective: 2000 }}>
          {campaignImages.slice(0, 8).map((image, index) => (
            <TiltGalleryCard key={index} image={image} index={index} />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mt-16"
      >
        <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-t border-b border-white/10">
          <div className="flex items-center gap-12 flex-wrap">
            <div>
              <p className="text-3xl font-bold text-white">48+</p>
              <p className="text-white/40 text-sm">Events Hosted</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden md:block" />
            <div>
              <p className="text-3xl font-bold text-white">200+</p>
              <p className="text-white/40 text-sm">Media Placements</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden md:block" />
            <div>
              <p className="text-3xl font-bold text-white">60+</p>
              <p className="text-white/40 text-sm">Campaigns</p>
            </div>
          </div>
          
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
           style={{
             background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
           }} />
    </section>
  );
};

export default FilmstripGallerySection;