import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import ClientLogosSection from '@/components/ClientLogosSection';
import WalledGardenHero from '@/components/gtm/WalledGardenHero';
import WeaponSection from '@/components/gtm/WeaponSection';
import MethodSection from '@/components/gtm/MethodSection';
import ProofSection from '@/components/gtm/ProofSection';
import ArchitectsSection from '@/components/gtm/ArchitectsSection';

const GTMService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      
      <WalledGardenHero />
      <WeaponSection />
      <MethodSection />
      <ProofSection />
      <ArchitectsSection />
      
      <section className="py-20 bg-background border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-muted-foreground tracking-widest mb-2">TRUSTED BY</p>
            <p className="text-lg text-muted-foreground">Projects that unlocked Korea with us</p>
          </div>
          <ClientLogosSection />
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </motion.div>
  );
};

export default GTMService;
