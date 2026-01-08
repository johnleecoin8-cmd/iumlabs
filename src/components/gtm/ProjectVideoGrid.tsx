import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Play } from 'lucide-react';

// Project assets
import storyLogo from '@/assets/logos/story-protocol.png';
import mantraLogo from '@/assets/logos/mantra.png';
import peaqLogo from '@/assets/logos/peaq.svg';
import saharaLogo from '@/assets/logos/sahara-ai.png';
import kucoinLogo from '@/assets/logos/kucoin.svg';
import bybitLogo from '@/assets/logos/bybit.png';
import bnbLogo from '@/assets/logos/bnb.svg';

// Background images for fallback
import storyBg from '@/assets/projects/story-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';
import bybitBg from '@/assets/projects/bybit-bg.jpg';
import bnbBg from '@/assets/projects/bnb-bg.jpg';

interface Project {
  name: string;
  slug: string;
  logo: string;
  image: string;
  video?: string;
  result: string;
  resultSub: string;
  category: string;
}

const projects: Project[] = [
  {
    name: "Story Protocol",
    slug: "story-protocol",
    logo: storyLogo,
    image: storyBg,
    video: "/videos/projects/story-hero.mp4",
    result: "+340%",
    resultSub: "Trading Volume",
    category: "IP Protocol"
  },
  {
    name: "MANTRA",
    slug: "mantra",
    logo: mantraLogo,
    image: mantraBg,
    video: "/videos/projects/mantra-hero.mp4",
    result: "+500%",
    resultSub: "Volume Growth",
    category: "RWA"
  },
  {
    name: "peaq",
    slug: "peaq",
    logo: peaqLogo,
    image: peaqBg,
    video: "/videos/projects/peaq-hero.mp4",
    result: "#1",
    resultSub: "DePIN in Korea",
    category: "DePIN L1"
  },
  {
    name: "Sahara AI",
    slug: "sahara-ai",
    logo: saharaLogo,
    image: saharaAiBg,
    video: "/videos/projects/sahara-hero.mp4",
    result: "200K+",
    resultSub: "Community Built",
    category: "AI x Crypto"
  },
  {
    name: "KuCoin",
    slug: "kucoin",
    logo: kucoinLogo,
    image: kucoinBg,
    video: "/videos/projects/kucoin-hero.mp4",
    result: "Top 5",
    resultSub: "Exchange Korea",
    category: "Exchange"
  },
  {
    name: "Bybit",
    slug: "bybit",
    logo: bybitLogo,
    image: bybitBg,
    video: "/videos/projects/bybit-hero.mp4",
    result: "1M+",
    resultSub: "Korean Users",
    category: "Exchange"
  },
  {
    name: "BNB Chain",
    slug: "bnb-chain",
    logo: bnbLogo,
    image: bnbBg,
    video: "/videos/projects/bnb-hero.mp4",
    result: "50+",
    resultSub: "Partner Projects",
    category: "L1 Chain"
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group block relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 hover:border-primary/40 transition-all duration-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image */}
        <img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Video overlay on hover */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/0 to-primary/0 group-hover:from-primary/20 transition-all duration-500" />

        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          {/* Top: Category + Play icon */}
          <div className="flex items-start justify-between">
            <span className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full text-white/70">
              {project.category}
            </span>
            {project.video && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Play className="w-4 h-4 text-white fill-white" />
              </motion.div>
            )}
          </div>

          {/* Bottom: Logo + Result */}
          <div>
            <img
              src={project.logo}
              alt={project.name}
              className="h-6 w-auto brightness-0 invert mb-3"
            />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-bold text-lg">{project.result}</span>
              <span className="text-white/50 text-sm">{project.resultSub}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectVideoGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Portfolio</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            함께한 <span className="bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">프로젝트</span>
          </h3>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Hover to preview. Click to explore full case study.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-full text-white/70 hover:text-white"
          >
            <span>View All 30+ Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectVideoGrid;
