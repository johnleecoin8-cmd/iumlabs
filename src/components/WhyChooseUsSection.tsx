import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamPhoto from '@/assets/team-photo.png';

const CoralShape = () => (
  <motion.div
    className="relative w-20 h-10 mx-auto"
    animate={{ rotateY: 360 }}
    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Bridge arch outer */}
    <div
      className="absolute inset-0 rounded-t-full"
      style={{
        background: "linear-gradient(135deg, #F97316 0%, #FB923C 50%, #F97316 100%)",
        transform: "rotateX(25deg)",
        boxShadow: "0 12px 25px rgba(249, 115, 22, 0.35)",
        clipPath: "ellipse(50% 100% at 50% 100%)"
      }}
    />
    {/* Bridge arch inner */}
    <div
      className="absolute inset-x-2 inset-y-1 rounded-t-full"
      style={{
        background: "linear-gradient(225deg, #FB923C 0%, #F97316 100%)",
        transform: "rotateX(25deg) translateZ(5px)",
        clipPath: "ellipse(50% 100% at 50% 100%)"
      }}
    />
  </motion.div>
);

const WhyChooseUsSection = () => {
  return (
    <section className="bg-[#0A0A0A]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:border-r border-white/10"
        >
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
            <img
              src={teamPhoto}
              alt="Ium Labs Team"
              className="w-full h-full object-cover object-[center_65%]"
            />
          </div>
        </motion.div>

        {/* Right: Content */}
        <div className="flex flex-col">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col justify-center border-b border-white/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About Us
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              We bridge global Web3 projects to growth in the Korean market. Established in 2025, we've become a trusted partner for 18+ brands looking to expand into Korea's dynamic crypto ecosystem.
            </p>
            <p className="text-white font-medium">
              Founded by former executives from Binance and KuCoin
            </p>
          </motion.div>

          {/* Stats + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12 lg:p-16"
          >
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">18+</p>
                <p className="text-white/50 text-sm">Projects Launched</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">120+</p>
                <p className="text-white/50 text-sm">KOL Network</p>
              </div>
            </div>

            <CoralShape />

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors w-fit mt-6"
            >
              GET IN TOUCH
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
