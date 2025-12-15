import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import { ArrowRight, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const budgetOptions = ["<$10K", "$10K-$30K", "$30K-$50K", "$50K+"];

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
        comments: `Budget: ${formData.budget}\n\n${formData.message}`
      });
      
      if (error) throw error;
      
      supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          budget: formData.budget,
          message: formData.message
        }
      }).catch(console.error);
      
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", budget: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <SectionHeader 
          title="CONTACT" 
          dark={true}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Let's Build<br />
              <span className="text-primary">Something Great</span>
            </h2>
            
            <p className="text-lg text-white/60 max-w-md">
              Ready to conquer the Korean market? Get in touch and let's discuss your project.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 pt-6">
              {/* Office */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Seoul Office</h4>
                  <p className="text-sm text-white/50">{brand.address}</p>
                </div>
              </div>

              {/* Email */}
              <a 
                href={`mailto:${brand.email}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Email</h4>
                  <p className="text-sm text-white/50 group-hover:text-primary transition-colors">{brand.email}</p>
                </div>
              </a>

              {/* Telegram */}
              <a 
                href={brand.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Telegram</h4>
                  <p className="text-sm text-white/50 group-hover:text-primary transition-colors">@cryptobridgekorea</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right - Simplified Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-5 bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Budget Range</label>
                <div className="grid grid-cols-4 gap-2">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: option })}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
                <label className="block text-sm text-white/60 mb-2">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
