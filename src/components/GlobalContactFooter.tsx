import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Send, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";

const budgetOptions = ["$15K - $25K", "$25K - $50K", "$50K +", "Raising funds"];

const GlobalContactFooter = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seoulTime, setSeoulTime] = useState("");

  // Update Seoul time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setSeoulTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate form completion percentage
  const filledFields = [formData.name, formData.email, formData.budget, formData.message].filter(Boolean).length;
  const completionPercentage = Math.round(filledFields / 4 * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert({
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

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours."
      });
      setFormData({ name: "", email: "", company: "", website: "", message: "", budget: "" });
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black text-white">
      {/* Contact Section */}
      <section className="border-t border-white/10">
        {/* Section Header */}
        <div className="flex items-baseline justify-between px-6 md:px-12 py-6 border-b border-white/10">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-xs text-white/40 font-mono tracking-widest">08</span>
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">Contact</h2>
          </div>
          <Link 
            to="/contact" 
            className="text-xs text-white/60 tracking-wider hidden sm:flex items-center gap-2 px-4 py-1.5 border border-white/20 rounded-full hover:border-white/40 transition-colors font-medium"
          >
            Get Started
          </Link>
        </div>
        
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Contact Info */}
          <div className="w-full lg:w-2/5 p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Get in Touch
              </h3>
              <p className="text-white/50 text-base leading-relaxed mb-10">
                Ready to enter the Korean market? Let's discuss how we can help your project grow.
              </p>

              {/* Office */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/40 block mb-2">Office</span>
                    <p className="text-white/80 text-sm leading-relaxed">{brand.address}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-white/40">Live in Seoul • {seoulTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <a 
                href={`mailto:${brand.email}`} 
                className="group flex items-center justify-between mb-6 pb-6 border-b border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/40 block mb-2">Email</span>
                    <p className="text-white/80 text-sm">{brand.email}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/50 group-hover:translate-x-1.5 transition-all" />
              </a>

              {/* Telegram */}
              <a 
                href={brand.telegramLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-between"
              >
                <div className="flex items-start gap-4">
                  <Send className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/40 block mb-2">Telegram</span>
                    <p className="text-white/80 text-sm">{brand.telegram}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/50 group-hover:translate-x-1.5 transition-all" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full lg:w-3/5 p-6 md:p-10 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/40">Contact Form</span>
                  <div className="flex items-center gap-2">
                    {completionPercentage === 100 ? (
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-emerald-400 font-medium">Ready to send</span>
                      </div>
                    ) : (
                      <span className="text-sm text-white/40">{completionPercentage}%</span>
                    )}
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white/60 transition-all duration-500" 
                    style={{ width: `${completionPercentage}%` }} 
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Name *</label>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      value={formData.name} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
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
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required 
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors" 
                    />
                  </div>
                </div>

                {/* Company & Website Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company</label>
                    <input 
                      type="text" 
                      placeholder="Company name" 
                      value={formData.company} 
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Website</label>
                    <input 
                      type="url" 
                      placeholder="https://..." 
                      value={formData.website} 
                      onChange={e => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors" 
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-4">Budget *</label>
                  <div className="flex flex-wrap gap-3">
                    {budgetOptions.map(option => (
                      <button 
                        key={option} 
                        type="button" 
                        onClick={() => setFormData({ ...formData, budget: option })}
                        className={`px-5 py-3 text-sm border transition-all font-medium ${
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
                    placeholder="Tell us about your project..." 
                    value={formData.message} 
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={3} 
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors resize-none" 
                  />
                </div>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
                  <div className="text-sm text-white/40">
                    <p className="font-medium text-white/60 mb-1">Have a project in mind?</p>
                    <p>Let's discuss how we can help you succeed in Korea.</p>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting || completionPercentage < 100}
                    className="px-8 py-4 bg-white text-black font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? "Sending..." : "Get Your Free Proposal"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-white/40">Response within 24h</span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs text-white/40">Join 18+ projects that launched with us</span>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="border-t border-white/10 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* Research */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Research</h4>
              <ul className="space-y-3">
                <li><Link to="/research" className="text-sm text-white/50 hover:text-white transition-colors">Proprietary Insights</Link></li>
                <li><Link to="/research" className="text-sm text-white/50 hover:text-white transition-colors">Market Analytics</Link></li>
                <li><Link to="/research" className="text-sm text-white/50 hover:text-white transition-colors">Reports</Link></li>
              </ul>
            </div>

            {/* Marketing */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Marketing</h4>
              <ul className="space-y-3">
                <li><Link to="/services/gtm" className="text-sm text-white/50 hover:text-white transition-colors">GTM Strategy</Link></li>
                <li><Link to="/services/influencer" className="text-sm text-white/50 hover:text-white transition-colors">Influencer Marketing</Link></li>
                <li><Link to="/services/community" className="text-sm text-white/50 hover:text-white transition-colors">Community Growth</Link></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">About</h4>
              <ul className="space-y-3">
                <li><Link to="/services" className="text-sm text-white/50 hover:text-white transition-colors">Our Mission</Link></li>
                <li><Link to="/contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-white/50 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li><a href={`mailto:${brand.email}`} className="text-sm text-white/50 hover:text-white transition-colors">{brand.email}</a></li>
                <li><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Telegram</a></li>
                <li><a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
              <p className="text-xs text-white/30 mt-4 leading-relaxed">{brand.address}</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-white/40">© 2026 ium Labs. All rights reserved.</p>
          </div>
        </div>
      </section>

      {/* Giant Brand Name */}
      <div className="w-full py-8 overflow-hidden bg-black border-t border-white/5">
        <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[8rem] xl:text-[12rem] font-bold leading-none tracking-tighter text-center whitespace-nowrap lowercase">
          <span className="text-white/10">{brand.name.toLowerCase()}</span>
        </h2>
      </div>
      
      {/* Final Copyright */}
      <div className="w-full px-6 pb-8 text-center space-y-2">
        <p className="text-sm text-white/30">
          © 2026 ium labs (이음 랩스). All rights reserved.
        </p>
        <p className="text-xs text-white/20">
          Korean Web 3 Marketing, Blockchain Research, GTM Agency.
        </p>
      </div>
    </footer>
  );
};

export default GlobalContactFooter;
