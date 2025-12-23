import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo3D from './Logo3D';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: 3D Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:border-r border-border"
        >
          <div className="aspect-[4/3] overflow-hidden bg-background">
            <Logo3D />
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
            className="p-6 md:p-8 lg:p-10 flex-1 flex flex-col justify-center border-b border-border"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              About Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We bridge global Web3 projects to growth in the Korean market. Established in 2025, we've become a trusted partner for 18+ brands looking to expand into Korea's dynamic crypto ecosystem.
            </p>
            <p className="text-foreground font-medium">
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
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">18+</p>
                <p className="text-muted-foreground text-sm">Projects Launched</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">120+</p>
                <p className="text-muted-foreground text-sm">KOL Network</p>
              </div>
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium rounded-full hover:bg-foreground/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 w-fit"
            >
              GET IN TOUCH
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
