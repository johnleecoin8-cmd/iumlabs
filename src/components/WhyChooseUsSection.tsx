import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import iumLabsLogo from '@/assets/ium-labs-logo-about.png';

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
          <div className="aspect-[4/3] overflow-hidden bg-[#0A0A0A] flex items-center justify-center p-6">
            <img
              src={iumLabsLogo}
              alt="Ium Labs Logo"
              className="w-full h-auto max-w-[420px] object-contain invert"
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
            className="p-6 md:p-8 lg:p-10 flex-1 flex flex-col justify-center border-b border-white/10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              About Us
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">
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
            className="p-6 md:p-8 lg:p-10"
          >
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">18+</p>
                <p className="text-white/50 text-sm">Projects Launched</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">120+</p>
                <p className="text-white/50 text-sm">KOL Network</p>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors w-fit"
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
