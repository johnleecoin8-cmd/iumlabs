import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, Calendar, ArrowUpRight, ArrowRight, Linkedin, CheckCircle2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";
import { usePageTitle } from "@/hooks/usePageTitle";

// Import office image
import seoulOffice from "@/assets/backgrounds/seoul-gangnam-night.jpg";

const budgetOptions = [
  "$15,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 +",
  "Looking to raise funds",
];

const contactInfo = [
  { icon: Mail, label: "Email", value: brand.email, link: `mailto:${brand.email}` },
  { icon: Phone, label: "Phone", value: brand.phone, link: `tel:${brand.phone.replace(/\s/g, '')}` },
  { icon: Send, label: "Telegram", value: brand.telegram, link: brand.telegramLink },
  { icon: Linkedin, label: "LinkedIn", value: "Ium Labs", link: brand.linkedin },
];

// Floating tags similar to HeroSection
const floatingTags = [
  { label: "Free Consultation", position: "top-[15%] left-[5%]" },
  { label: "24h Response", position: "top-[35%] left-[4%]" },
  { label: "Korean Market Expert", position: "top-[18%] right-[6%]" },
  { label: "Global Partners", position: "top-[40%] right-[5%]" },
];

const mobileFloatingTags = [
  { label: "Free Consult", position: "top-[8%] left-[3%]" },
  { label: "24h Response", position: "top-[12%] right-[3%]" },
];

// Confetti particle component
const ConfettiParticle = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ 
      left: `${x}%`,
      background: `hsl(${Math.random() * 360}, 80%, 60%)`,
    }}
    initial={{ y: 0, opacity: 1, scale: 1 }}
    animate={{ 
      y: [0, -100, 200],
      opacity: [1, 1, 0],
      scale: [1, 1.2, 0.5],
      x: [0, (Math.random() - 0.5) * 100],
      rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
    }}
    transition={{ 
      duration: 2,
      delay,
      ease: "easeOut",
    }}
  />
);

// Success overlay component
const SuccessOverlay = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Confetti particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <ConfettiParticle key={i} delay={i * 0.05} x={Math.random() * 100} />
        ))}
      </div>

      {/* Success content */}
      <motion.div
        className="relative text-center px-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {/* Animated ring */}
        <motion.div
          className="absolute inset-0 -m-8 rounded-full border-2 border-white/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5, repeat: 2 }}
        />
        
        {/* Glowing circle background */}
        <motion.div
          className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-green-500/50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
        </motion.div>

        {/* Sparkle effects */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 0], y: -30 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </motion.div>
        <motion.div
          className="absolute top-8 left-1/4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
        </motion.div>
        <motion.div
          className="absolute top-8 right-1/4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <Sparkles className="w-5 h-5 text-blue-400" />
        </motion.div>

        {/* Text */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Message Sent!
        </motion.h2>
        <motion.p
          className="text-white/70 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          We'll get back to you within 24 hours
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="mt-8 h-1 bg-white/10 rounded-full overflow-hidden w-48 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.7, duration: 2.5, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Contact = () => {
  usePageTitle("Contact");
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);
  
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          comments: `Company: ${formData.company}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\n\n${formData.message}`,
        });

      if (error) throw error;

      supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          message: formData.message,
        },
      }).catch(console.error);

      setShowSuccess(true);
      setFormData({ name: "", email: "", company: "", website: "", message: "", budget: "" });
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessOverlay onComplete={() => setShowSuccess(false)} />
        )}
      </AnimatePresence>
      
      {/* Hero Section - Glassmorphism Style */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Video Background */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.35)" }}
              onLoadedMetadata={(e) => {
                (e.target as HTMLVideoElement).currentTime = 0;
              }}
            >
              <source src="/videos/services-background.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay gradient matching hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
          </div>

          {/* Floating Tags - Desktop */}
          {floatingTags.map((tag, index) => (
            <motion.div
              key={index}
              className={`absolute ${tag.position} hidden lg:block z-10`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
            >
              <span className="font-sans px-4 py-2 text-xs whitespace-nowrap rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:border-primary/40 hover:text-white transition-all duration-300">
                {tag.label}
              </span>
            </motion.div>
          ))}

          {/* Floating Tags - Mobile */}
          {mobileFloatingTags.map((tag, index) => (
            <div
              key={`mobile-${index}`}
              className={`absolute ${tag.position} lg:hidden z-10`}
            >
              <span className="font-sans px-2 py-1 text-[10px] rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/60 whitespace-nowrap">
                {tag.label}
              </span>
            </div>
          ))}

          {/* Main Content - Centered */}
          <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6 w-full">
            <div className="max-w-7xl mx-auto text-center">
              {/* Main Headline */}
              <motion.h1 
                className="font-sans text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] font-bold leading-[1.1] tracking-[-0.02em] mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-white">Let's Build</span>
                <br />
                <span className="text-white/90">Something </span>
                <span className="text-white">Great Together</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 font-light tracking-wide leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Tell us about your project and we'll explain how we can help you <span className="text-white font-medium">succeed in Korea</span>.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <CalendlyButton className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  <Calendar className="w-4 h-4" />
                  <span>Book a Meeting</span>
                </CalendlyButton>
              </motion.div>
            </div>
          </div>

          {/* Contact Info Cards - Bottom Section */}
          <div className="relative z-10 w-full border-t border-white/10 py-4 sm:py-6">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {contactInfo.map((info, index) => (
                  <motion.a 
                    key={info.label}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                      <info.icon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">{info.label}</p>
                      <p className="text-white text-xs sm:text-sm font-medium truncate">{info.value}</p>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-white/20 group-hover:text-white transition-colors flex-shrink-0" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact Form Section - Glassmorphism */}
      <section className="bg-[#0A0A0A] py-16 sm:py-24" id="contact-form">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 text-xs rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60 mb-6">
              Send a Message
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Start Your Project
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          {/* Two Column Layout: Form + Office Image */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Glassmorphism Form Container */}
            <motion.div 
              className="lg:col-span-3 relative p-6 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Subtle gradient glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01] pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Name *</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Email *</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Company Name & Website Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company Name</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company Website</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Estimated Budget */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-4">Estimated Budget</label>
                  <div className="grid grid-cols-2 gap-3">
                    {budgetOptions.map((option) => (
                      <motion.button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: option })}
                        className={`px-4 py-3 rounded-xl text-sm border transition-all text-center ${
                          formData.budget === option
                            ? 'bg-white/[0.1] border-white/30 text-white'
                            : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:border-white/20 hover:bg-white/[0.05] hover:text-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Tell Us About Your Project</label>
                  <textarea
                    placeholder="Describe your project and goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 disabled:opacity-50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Office Image & Location Card */}
            <motion.div 
              className="lg:col-span-2 flex flex-col gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {/* Office Image */}
              <div className="relative rounded-3xl overflow-hidden flex-1 min-h-[300px]">
                <img 
                  src={seoulOffice} 
                  alt="Seoul Gangnam Office Area"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Location badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 text-xs rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                    📍 Seoul, Korea
                  </span>
                </div>

                {/* Location info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">Gangnam Office</h3>
                  <p className="text-white/70 text-sm">{brand.address}</p>
                </div>
              </div>

              {/* Quick contact cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  href={brand.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20 transition-all text-center"
                  whileHover={{ y: -4 }}
                >
                  <Send className="w-6 h-6 text-white/50 group-hover:text-white mx-auto mb-2 transition-colors" />
                  <p className="text-white text-sm font-medium">Telegram</p>
                  <p className="text-white/40 text-xs">{brand.telegram}</p>
                </motion.a>
                <motion.a
                  href={`mailto:${brand.email}`}
                  className="group p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20 transition-all text-center"
                  whileHover={{ y: -4 }}
                >
                  <Mail className="w-6 h-6 text-white/50 group-hover:text-white mx-auto mb-2 transition-colors" />
                  <p className="text-white text-sm font-medium">Email</p>
                  <p className="text-white/40 text-xs">{brand.email}</p>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;