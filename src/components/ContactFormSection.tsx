import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";

const budgetOptions = [
  "$15K - $25K",
  "$25K - $50K",
  "$50K +",
  "Raising funds",
];

interface ContactFormSectionProps {
  sectionNumber?: string;
  accentColor?: string;
}

const ContactFormSection = ({ 
  sectionNumber = "08", 
  accentColor = "white" 
}: ContactFormSectionProps) => {
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

  // Calculate form completion percentage
  const filledFields = [formData.name, formData.email, formData.budget, formData.message].filter(Boolean).length;
  const completionPercentage = Math.round((filledFields / 4) * 100);

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

  // Get current time in Seoul
  const getSeoulTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      timeZone: 'Asia/Seoul', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <section className="bg-[#0A0A0A]">
      <div className="border-t border-white/10">
        {/* Section Header */}
        <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/10">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest">{sectionNumber}</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Contact</h2>
          </div>
          <Link 
            to="/contact"
            className="text-xs text-white/60 tracking-wider hidden sm:flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full hover:border-white/40 transition-colors"
          >
            Get Started
          </Link>
        </div>
        
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Contact Info */}
          <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get in Touch
            </h3>
            <p className="text-white/50 text-base leading-relaxed mb-12">
              Ready to enter the Korean market? Let's discuss how we can help your project grow.
            </p>

            {/* Office */}
            <div className="mb-8 pb-8 border-b border-white/10">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-white/30 mt-1" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/40 block mb-2">Office</span>
                  <p className="text-white text-sm leading-relaxed">{brand.address}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-white/40">Live in Seoul • {getSeoulTime()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <a 
              href={`mailto:${brand.email}`}
              className="group flex items-center justify-between mb-8 pb-8 border-b border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-white/30 mt-1" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/40 block mb-2">Email</span>
                  <p className="text-white text-sm">{brand.email}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </a>

            {/* Telegram */}
            <a 
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between mb-8 pb-8 border-b border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <Send className="w-5 h-5 text-white/30 mt-1" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/40 block mb-2">Telegram</span>
                  <p className="text-white text-sm">{brand.telegram}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/company/iumlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between"
            >
              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 text-white/30 mt-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/40 block mb-2">LinkedIn</span>
                  <p className="text-white text-sm">Ium Labs</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </a>

            {/* Footer Links */}
            <div className="mt-16 pt-8 border-t border-white/10 flex gap-6">
              <Link to="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">Privacy Policy</Link>
              <Link to="/transparency" className="text-xs text-white/40 hover:text-white/60 transition-colors">Transparency</Link>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm text-white/40">Contact Form</span>
              <span className="text-sm text-white/40">{completionPercentage}% complete</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
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
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Company & Website Row */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company</label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Website</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/40 mb-4">Budget *</label>
                <div className="flex flex-wrap gap-3">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: option })}
                      className={`px-5 py-3 text-sm border transition-all ${
                        formData.budget === option
                          ? 'bg-white/10 border-white text-white'
                          : 'bg-transparent border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Project Details *</label>
                <textarea
                  placeholder="Tell us about your project and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/10">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/20 transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
