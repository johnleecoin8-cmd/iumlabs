import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, Calendar, ArrowUpRight, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";

const budgetOptions = [
  "$15,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 +",
  "Looking to raise funds",
];

const contactDetails = [
  { label: "office:", value: brand.address },
  { label: "e-mail:", value: brand.email, link: `mailto:${brand.email}` },
  { label: "telegram:", value: brand.telegram, link: brand.telegramLink },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: brand.email, link: `mailto:${brand.email}` },
  { icon: Phone, label: "Phone", value: brand.phone, link: `tel:${brand.phone.replace(/\s/g, '')}` },
  { icon: Send, label: "Telegram", value: brand.telegram, link: brand.telegramLink },
  { icon: MapPin, label: "Office", value: brand.address, link: "#" },
];

const Contact = () => {
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

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
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
      
      {/* Hero Section - Simple centered like homepage */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative min-h-[70vh] flex flex-col justify-center items-center overflow-hidden rounded-xl sm:rounded-2xl">
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-transparent to-[#0A0A0A]" />
          </div>

          {/* Content - Centered like homepage */}
          <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
            <motion.span 
              className="text-xs text-white/50 mb-6 block tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              [ Contact ]
            </motion.span>
            <motion.h1 
              className="text-[14vw] md:text-[120px] lg:text-[140px] font-light text-white leading-[0.85] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Let's T<span className="serif-italic">a</span>lk
            </motion.h1>
            <motion.p 
              className="text-lg text-white/60 max-w-xl mx-auto mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Tell us about your project and we'll explain how we can help you succeed in Korea.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <CalendlyButton className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Book a Meeting</span>
              </CalendlyButton>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Contact Info Section */}
      <section className="bg-[#0A0A0A]" id="contact-info">
        <div className="border-t border-white/10">
          {/* Section Header */}
          <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Contact Info</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
              Get in Touch
            </span>
          </div>
          
          {/* Contact Info Content */}
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a 
                  key={info.label}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-white/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">{info.label}</p>
                      <p className="text-white text-sm font-medium">{info.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-[#0A0A0A]" id="contact-form">
        <div className="border-t border-white/10">
          {/* Section Header */}
          <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Send a Message</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
              We'll respond within 24h
            </span>
          </div>
          
          {/* Form Content */}
          <div className="container mx-auto max-w-4xl px-4 md:px-8 py-16">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Email *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                </motion.div>
              </div>

              {/* Company Name & Website Row */}
              <div className="grid sm:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company Name</label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                >
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company Website</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                </motion.div>
              </div>

              {/* Estimated Budget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-xs uppercase tracking-wider text-white/40 mb-4">Estimated Budget</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {budgetOptions.map((option) => (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: option })}
                      className={`px-4 py-3 rounded-xl text-sm border transition-all text-center ${
                        formData.budget === option
                          ? 'bg-white/10 border-white text-white'
                          : 'bg-transparent border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Project Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
              >
                <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Tell Us About Your Project</label>
                <textarea
                  placeholder="Describe your project and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div 
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-medium hover:bg-white/90 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;