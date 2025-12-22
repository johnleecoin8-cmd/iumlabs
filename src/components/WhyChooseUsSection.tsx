import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamPhoto from '@/assets/team-photo.png';

interface WhyChooseUsSectionProps {
  bgColor?: string;
}

const WhyChooseUsSection = ({ bgColor = "#0A0A0A" }: WhyChooseUsSectionProps) => {
  return (
    <section style={{ backgroundColor: bgColor }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:border-r border-white/5"
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
            className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col justify-center border-b border-white/5"
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
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">18+</p>
                <p className="text-white/50 text-sm">Projects Launched</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">120+</p>
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
