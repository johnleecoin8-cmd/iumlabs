import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import teamPhoto from '@/assets/team-photo.png';

// Count up animation hook
const useCountUp = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, ref };
};

const WhyChooseUsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  const projectsCount = useCountUp(18, 1500);
  const kolCount = useCountUp(120, 2000);
  const eventsCount = useCountUp(48, 1800);

  return (
    <section ref={containerRef} className="relative bg-[#0A0A0A] py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full"
             style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full"
             style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Large typography header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2 
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white/10 leading-none"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
          >
            ABOUT
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Parallax image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden"
              style={{ y: imageY }}
            >
              <div className="aspect-[4/5]">
                <img
                  src={teamPhoto}
                  alt="Ium Labs Team"
                  className="w-full h-full object-cover object-[center_65%]"
                />
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
              >
                <p className="text-white text-sm font-medium">Founded 2025</p>
                <p className="text-white/60 text-xs">Seoul, South Korea</p>
              </motion.div>
            </motion.div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-white/20 rounded-tl-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-white/20 rounded-br-2xl" />
          </motion.div>

          {/* Right: Story content */}
          <motion.div 
            style={{ y: textY, opacity }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Who We Are</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Korea's Premier<br />Web3 Growth Agency
              </h3>
              <p className="text-white/60 text-lg leading-relaxed">
                We bridge global Web3 projects to growth in the Korean market. Founded by former executives from Binance and KuCoin, we combine deep local expertise with global Web3 experience.
              </p>
            </motion.div>

            {/* Stats with count-up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6 py-8 border-y border-white/10"
            >
              <div ref={projectsCount.ref}>
                <p className="text-4xl md:text-5xl font-bold text-white">
                  {projectsCount.count}+
                </p>
                <p className="text-white/50 text-sm mt-1">Projects</p>
              </div>
              <div ref={kolCount.ref}>
                <p className="text-4xl md:text-5xl font-bold text-white">
                  {kolCount.count}+
                </p>
                <p className="text-white/50 text-sm mt-1">KOL Network</p>
              </div>
              <div ref={eventsCount.ref}>
                <p className="text-4xl md:text-5xl font-bold text-white">
                  {eventsCount.count}+
                </p>
                <p className="text-white/50 text-sm mt-1">Events</p>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              {[
                "Local expertise with global perspective",
                "Data-driven growth strategies",
                "Trusted by leading Web3 protocols"
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <p className="text-white/70">{value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;