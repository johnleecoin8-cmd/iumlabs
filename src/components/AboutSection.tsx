import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { brand, images } from "@/config/content";

const stats = [
  { value: "50+", label: "Projects Launched", color: "text-red-600" },
  { value: "$2B+", label: "Total Value Marketed", color: "text-blue-600" },
  { value: "100+", label: "KOL Partners", color: "text-green-600" },
];

const founders = [
  {
    name: "James",
    role: "Co-Founder",
    background: "Ex-Korea Lead @ KuCoin, Ex-VC @ Outlier Ventures",
    image: images.team.james,
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
    telegram: "https://t.me/cryptobridgekorea",
    color: "border-red-200 hover:border-red-400",
  },
  {
    name: "David",
    role: "Co-Founder",
    background: "Ex-Head of BD @ Binance, Ex-Analyst @ 21shares",
    image: images.team.david,
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    telegram: "https://t.me/cryptobridgekorea",
    color: "border-blue-200 hover:border-blue-400",
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const contentY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const foundersY = useTransform(scrollYProgress, [0, 1], [100, -40]);
  const statsY = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative bg-muted/30 overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div 
        className="container mx-auto px-4"
        style={{ opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content with Parallax */}
          <motion.div style={{ y: contentY }}>
            <motion.span 
              className="text-label font-medium text-blue-600 tracking-wider mb-3 block uppercase"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About Us
            </motion.span>
            <motion.h2 
              className="text-display-lg font-bold tracking-tight mb-4 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Korea's Leading<br />
              <span className="text-gradient">Web3 Marketing</span> Agency
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-body leading-relaxed mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We bridge global Web3 projects to Korea's 5M+ crypto-native audience. 
              With deep local expertise and proven strategies, we help you succeed in 
              one of the world's most active crypto markets.
            </motion.p>

            {/* Stats with Parallax */}
            <motion.div 
              className="flex flex-wrap gap-6 mb-8"
              style={{ y: statsY }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="cursor-default"
                >
                  <div className={`text-2xl font-bold ${stat.color} stat-glow`}>{stat.value}</div>
                  <div className="text-caption text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="rounded-full bg-primary hover:bg-primary/90 group shadow-md"
                >
                  Book a Meeting
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Founders with Parallax */}
          <motion.div 
            className="grid grid-cols-2 gap-6"
            style={{ y: foundersY }}
          >
            {founders.map((founder, index) => (
              <motion.div 
                key={founder.name}
                className={`group p-6 rounded-2xl bg-card border-2 ${founder.color} transition-all shadow-sm hover:shadow-lg`}
                initial={{ opacity: 0, y: 40, rotate: index === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-muted"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground">{founder.name}</h3>
                <p className="text-sm text-primary mb-2">{founder.role}</p>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{founder.background}</p>
                
                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <motion.a 
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:bg-blue-100 transition-all"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a 
                    href={founder.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:bg-blue-100 transition-all"
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
