import { useState, useMemo } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import { ArrowRight, Mail, MapPin, Send, CheckCircle2, Linkedin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const budgetOptions = ["$15K - $25K", "$25K - $50K", "$50K +", "Raising funds"];

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formProgress = useMemo(() => {
    const fields = [formData.name, formData.email, formData.budget, formData.message];
    const filledFields = fields.filter(Boolean).length;
    return filledFields / fields.length * 100;
  }, [formData.name, formData.email, formData.budget, formData.message]);

  const seoulTime = useMemo(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Seoul',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }, []);

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
          budget: formData.budget,
          message: formData.message
        }
      }).catch(console.error);
      setIsSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        company: "",
        website: "",
        message: "",
        budget: ""
      });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden">
      {/* Cyan/Teal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row relative">
        {/* Left: Contact Info */}
        <div className="w-full lg:w-1/3 lg:border-r border-white/10">
          <motion.div
            className="p-8 md:p-12 lg:sticky lg:top-0 flex flex-col pt-8 md:pt-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon decoration */}
            <motion.div
              className="mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <MessageSquare className="w-10 h-10 text-cyan-400" strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Get in <span className="text-cyan-400">Touch</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-8">
              Ready to enter the Korean market? Let's discuss how we can help your project grow.
            </p>

            {/* Office */}
            <div className="flex items-start gap-4 pb-6 mb-6 border-b border-cyan-500/20">
              <MapPin className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Office</p>
                <p className="text-white text-sm">{brand.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-cyan-400/70 text-xs">Live in Seoul • {seoulTime}</span>
                </div>
              </div>
            </div>

            {/* Email */}
            <a
              href={`mailto:${brand.email}`}
              className="group flex items-start gap-4 pb-6 mb-6 border-b border-cyan-500/20 hover:bg-cyan-500/5 -mx-4 px-4 py-4 transition-colors rounded"
            >
              <Mail className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                <p className="text-white text-sm group-hover:text-cyan-300 transition-colors">{brand.email}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400/30 ml-auto group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" />
            </a>

            {/* Telegram */}
            <a
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 pb-6 mb-6 border-b border-cyan-500/20 hover:bg-cyan-500/5 -mx-4 px-4 py-4 transition-colors rounded"
            >
              <Send className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Telegram</p>
                <p className="text-white text-sm group-hover:text-cyan-300 transition-colors">@iumlabs</p>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400/30 ml-auto group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" />
            </a>

            {/* LinkedIn */}
            <a
              href={brand.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 pb-6 mb-6 border-b border-cyan-500/20 hover:bg-cyan-500/5 -mx-4 px-4 py-4 transition-colors rounded"
            >
              <Linkedin className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">LinkedIn</p>
                <p className="text-white text-sm group-hover:text-cyan-300 transition-colors">Ium Labs</p>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400/30 ml-auto group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" />
            </a>


            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs">
              <Link to="/terms" className="text-white/40 hover:text-cyan-400 transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-white/40 hover:text-cyan-400 transition-colors">Privacy Policy</Link>
              <Link to="/transparency" className="text-white/40 hover:text-cyan-400 transition-colors">Transparency</Link>
            </div>
          </motion.div>
        </div>

        {/* Right: Contact Form */}
        <motion.div
          className="w-full lg:w-2/3 p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="flex items-center justify-between mb-8">
              <p className="text-white/40 text-sm">Contact Form</p>
              {/* Progress bar with cyan gradient */}
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${formProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-cyan-400/70 text-xs">{Math.round(formProgress)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-cyan-500/30 py-3 text-white outline-none focus:border-cyan-400 transition-colors placeholder:text-white/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-cyan-500/30 py-3 text-white outline-none focus:border-cyan-400 transition-colors placeholder:text-white/30"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-transparent border-b border-cyan-500/30 py-3 text-white outline-none focus:border-cyan-400 transition-colors placeholder:text-white/30"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                  className="w-full bg-transparent border-b border-cyan-500/30 py-3 text-white outline-none focus:border-cyan-400 transition-colors placeholder:text-white/30"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Budget */}
            <div className="mb-6">
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-4">Budget *</label>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget: option })}
                    className={`px-4 py-2 text-sm transition-all duration-300 rounded ${
                      formData.budget === option
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/20'
                        : 'bg-transparent border border-cyan-500/30 text-white/60 hover:border-cyan-400 hover:text-cyan-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Project Details *</label>
              <textarea
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-transparent border-b border-cyan-500/30 py-3 text-white outline-none focus:border-cyan-400 transition-colors resize-none placeholder:text-white/30"
                placeholder="Tell us about your project and goals..."
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting || formProgress < 100}
              className={`group relative inline-flex items-center gap-2 px-8 py-4 text-sm font-medium overflow-hidden transition-all duration-300 rounded ${
                isSubmitted
                  ? 'bg-teal-500 text-white'
                  : formProgress === 100
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:shadow-lg hover:shadow-cyan-500/30'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
              whileHover={formProgress === 100 && !isSubmitted ? { scale: 1.02, y: -2 } : {}}
              whileTap={formProgress === 100 && !isSubmitted ? { scale: 0.98 } : {}}
            >
              {/* Shine sweep effect */}
              {formProgress === 100 && !isSubmitted && (
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              )}
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Message Sent!
                </>
              ) : isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  SEND MESSAGE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
