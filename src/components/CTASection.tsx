import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import { ArrowRight, Mail, MapPin, Send, Loader2, Phone } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        comments: `Company: ${formData.company}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\n\n${formData.message}`
      });
      
      if (error) throw error;
      
      supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          website: formData.website,
          budget: formData.budget,
          message: formData.message
        }
      }).catch(console.error);
      
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", company: "", website: "", budget: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgetOptions = ["<$10K", "$10K-$30K", "$30K-$50K", "$50K+"];

  return (
    <section className="relative bg-[#0A0A0B] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Let's Build <span className="text-primary">Something Great</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Office Card */}
            <div className="relative h-[220px] md:h-[260px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-6 flex flex-col justify-end">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Seoul Office</h4>
              <p className="text-white/60 text-sm">{brand.address}</p>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              <a 
                href={`mailto:${brand.email}`}
                className="group p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/30 hover:bg-white/[0.05] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Email</h4>
                <p className="text-xs text-white/50 group-hover:text-primary transition-colors truncate">{brand.email}</p>
              </a>

              {/* Telegram */}
              <a 
                href={brand.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/30 hover:bg-white/[0.05] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Telegram</h4>
                <p className="text-xs text-white/50 group-hover:text-primary transition-colors">@cryptobridgekorea</p>
              </a>

              {/* Phone */}
              <a 
                href={`tel:${brand.phone}`}
                className="group p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/30 hover:bg-white/[0.05] transition-all col-span-2"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Phone</h4>
                <p className="text-xs text-white/50 group-hover:text-primary transition-colors">{brand.phone}</p>
              </a>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 bg-white/[0.02] backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/60 mb-1.5">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              {/* Company & Website */}
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/60 mb-1.5">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1.5">Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs text-white/60 mb-1.5">Budget Range</label>
                <div className="grid grid-cols-4 gap-2">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: option })}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                        formData.budget === option
                          ? "bg-primary text-white"
                          : "bg-white/[0.03] text-white/60 border border-white/10 hover:border-white/30"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-white/60 mb-1.5">Message *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
