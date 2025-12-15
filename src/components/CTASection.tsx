import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import { ArrowRight, Mail, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
        comments: formData.message
      });
      
      if (error) throw error;
      
      supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      }).catch(console.error);
      
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-[#0A0A0B] py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
        {/* despread style: centered, minimal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Let's Build
            <br />
            <span className="text-primary">Together</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Ready to enter the Korean market? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-16"
        >
          <a 
            href={`mailto:${brand.email}`}
            className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>{brand.email}</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
          
          <span className="text-white/20">|</span>
          
          <a 
            href={brand.telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
          >
            <Send className="w-5 h-5" />
            <span>@cryptobridgekorea</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
        </motion.div>

        {/* Minimal Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors text-lg"
                placeholder="Your name"
              />
            </div>
            <div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors text-lg"
                placeholder="Your email"
              />
            </div>
          </div>

          <div>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors resize-none text-lg"
              placeholder="Tell us about your project..."
            />
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-3 text-white text-lg font-medium hover:text-primary transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default CTASection;
