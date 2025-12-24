import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo3D from './Logo3D';
const WhyChooseUsSection = () => {
  return <section className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: 3D Logo */}
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="lg:border-r border-border">
          <div className="aspect-[4/3] overflow-hidden bg-background">
            <Logo3D />
          </div>
        </motion.div>

        {/* Right: Content */}
        <div className="flex flex-col">
          {/* About Text */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="p-6 md:p-8 lg:p-10 flex-1 flex flex-col justify-center border-b border-border">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              About Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We bridge global Web3 projects to growth in the Korean market. Established in 2025, we have become a trusted partner for 18+ brands expanding into Korea's dynamic crypto ecosystem. Our name, 'Ium', is derived from the Korean verb 'to connect' (잇다), embodying our core mission to seamlessly link global innovation with local opportunities.
            </p>
            <p className="text-foreground font-medium">
              Founded by former executives from Binance and KuCoin
            </p>
          </motion.div>

          {/* Stats + CTA */}
          
        </div>
      </div>
    </section>;
};
export default WhyChooseUsSection;