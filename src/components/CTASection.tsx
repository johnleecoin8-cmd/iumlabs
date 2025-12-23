import { useState, useMemo } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import { ArrowRight, Mail, MapPin, Send, CheckCircle2, Linkedin } from "lucide-react";
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
    <section className="bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Contact Info */}
        <div className="w-full lg:w-1/3 lg:border-r border-border">
          <motion.div
            className="p-6 md:p-8 lg:p-10 lg:sticky lg:top-0 flex flex-col pt-8 md:pt-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ready to enter the Korean market? Let's discuss how we can help your project grow.
            </p>

            {/* Office */}
            <div className="flex items-start gap-4 pb-6 mb-6 border-b border-border">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Office</p>
                <p className="text-foreground text-sm">{brand.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-muted-foreground text-xs">Live in Seoul • {seoulTime}</span>
                </div>
              </div>
            </div>

            {/* Email */}
            <a
              href={`mailto:${brand.email}`}
              className="group flex items-start gap-4 pb-6 mb-6 border-b border-border hover:bg-secondary/50 -mx-4 px-4 py-4 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Email</p>
                <p className="text-foreground text-sm group-hover:text-foreground/70 transition-colors">{brand.email}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Telegram */}
            <a
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 pb-6 mb-6 border-b border-border hover:bg-secondary/50 -mx-4 px-4 py-4 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Telegram</p>
                <p className="text-foreground text-sm group-hover:text-foreground/70 transition-colors">@iumlabs</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
            </a>

            {/* LinkedIn */}
            <a
              href={brand.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 pb-6 mb-6 border-b border-border hover:bg-secondary/50 -mx-4 px-4 py-4 rounded-lg transition-colors"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">LinkedIn</p>
                <p className="text-foreground text-sm group-hover:text-foreground/70 transition-colors">Ium Labs</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
            </a>


            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs">
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/transparency" className="text-muted-foreground hover:text-foreground transition-colors">Transparency</Link>
            </div>
          </motion.div>
        </div>

        {/* Right: Contact Form */}
        <motion.div
          className="w-full lg:w-2/3 p-6 md:p-8 lg:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground text-sm">Contact Form</p>
              <span className="text-muted-foreground/60 text-xs">{Math.round(formProgress)}% complete</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-border py-3 text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-border py-3 text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Budget */}
            <div className="mb-6">
              <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-4">Budget *</label>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget: option })}
                    className={`px-5 py-2.5 text-sm rounded-full transition-all duration-300 ${
                      formData.budget === option
                        ? 'bg-foreground text-background shadow-lg shadow-foreground/20'
                        : 'bg-transparent border border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:-translate-y-0.5'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-2">Project Details *</label>
              <textarea
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-transparent border-b border-border py-3 text-foreground outline-none focus:border-foreground transition-colors resize-none placeholder:text-muted-foreground"
                placeholder="Tell us about your project and goals..."
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting || formProgress < 100}
              className={`group relative inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full overflow-hidden transition-all duration-300 ${
                isSubmitted
                  ? 'bg-green-500 text-white'
                  : formProgress === 100
                  ? 'bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg hover:shadow-foreground/20'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              whileHover={formProgress === 100 && !isSubmitted ? { scale: 1.02, y: -2 } : {}}
              whileTap={formProgress === 100 && !isSubmitted ? { scale: 0.98 } : {}}
            >
              {/* Shine sweep effect */}
              {formProgress === 100 && !isSubmitted && (
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-background/10 to-transparent" />
              )}
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Message Sent!
                </>
              ) : isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
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
