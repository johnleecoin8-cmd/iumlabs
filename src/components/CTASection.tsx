import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import CalendlyButton from "./CalendlyButton";
import { brand } from "@/config/content";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";
import { ArrowUpRight, Mail, MapPin, Send, Sparkles } from "lucide-react";

const budgetOptions = [
  "$15K - $25K",
  "$25K - $50K",
  "$50K +",
  "Raising funds",
];

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
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
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
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

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", company: "", website: "", message: "", budget: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="flex-1">
      {/* Hero CTA Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-blue-600 py-20 md:py-32 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        
        {/* Floating Sparkles */}
        <Sparkles className="absolute top-[15%] left-[10%] w-6 h-6 text-white/40 animate-pulse hidden md:block" />
        <Sparkles className="absolute top-[25%] right-[15%] w-8 h-8 text-cyan-300/50 animate-pulse hidden md:block" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute bottom-[30%] left-[20%] w-5 h-5 text-white/30 animate-pulse hidden md:block" style={{ animationDelay: '1s' }} />

        <div className={`container mx-auto max-w-5xl text-center relative z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 md:mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Free 30-min Strategy Call</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Ready to Conquer
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              the Korean Market?
            </span>
          </h2>
          
          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-10 px-4">
            Join 200+ Web3 projects that have successfully launched in Korea with our strategic guidance and unmatched network.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CalendlyButton className="group w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-6 md:px-10 py-4 md:py-5 rounded-2xl font-semibold transition-all hover:shadow-2xl hover:shadow-white/20 hover:scale-105 flex items-center justify-center gap-2">
              <span>Book a Meeting</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </CalendlyButton>
            <a 
              href="https://calendly.com/cryptobridgekorea/free-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-4 md:py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-emerald-500/30"
            >
              <Sparkles className="w-5 h-5" />
              <span>Free Marketing Audit</span>
            </a>
            <a 
              href={`mailto:${brand.email}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-4 md:py-5 rounded-2xl border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline">Send Email</span>
              <span className="sm:hidden">Email Us</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-10 md:mt-12 pt-8 md:pt-10 border-t border-white/10">
            <div className="text-center px-2">
              <div className="text-2xl md:text-3xl font-bold text-white">200+</div>
              <div className="text-xs md:text-sm text-white/60">Projects Launched</div>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="text-center px-2">
              <div className="text-2xl md:text-3xl font-bold text-white">$500M+</div>
              <div className="text-xs md:text-sm text-white/60">Funds Raised</div>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="text-center px-2">
              <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
              <div className="text-xs md:text-sm text-white/60">Exchange Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative bg-[hsl(0,0%,4%)] py-16 md:py-24 px-4 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
        </div>
        
        <div className={`container mx-auto max-w-6xl relative z-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
              Get in Touch
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Let's Start a <span className="text-primary">Conversation</span>
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
            {/* Left - Contact Info Cards */}
            <div className="space-y-4 order-2 lg:order-1">
              {/* Office Card - Full height image */}
              <div className="group relative rounded-2xl overflow-hidden h-[180px] md:h-[240px] cursor-pointer">
                <img
                  src={seoulBridgeNight}
                  alt="Seoul Office"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-500" />
                {/* Animated border on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-500" />
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 60px rgba(59, 130, 246, 0.15)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform group-hover:translate-y-[-4px] transition-transform duration-500">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/40 group-hover:scale-110 transition-all duration-500">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1 group-hover:text-primary/80 transition-colors">OFFICE</p>
                      <p className="text-white text-sm md:text-base group-hover:text-white transition-colors">{brand.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Cards - Side by side */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <a 
                  href={`mailto:${brand.email}`}
                  className="group relative flex flex-col items-start gap-2 md:gap-3 p-3 md:p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-primary/40 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative w-9 h-9 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="relative">
                    <p className="text-white/50 text-[10px] md:text-xs mb-0.5 group-hover:text-primary/70 transition-colors">E-MAIL</p>
                    <p className="text-white text-[11px] md:text-sm group-hover:text-primary transition-colors break-all leading-tight">{brand.email}</p>
                  </div>
                  {/* Arrow indicator */}
                  <ArrowUpRight className="absolute top-3 right-3 w-3 h-3 md:w-4 md:h-4 text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>

                <a 
                  href={brand.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-start gap-2 md:gap-3 p-3 md:p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-primary/40 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative w-9 h-9 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                    <Send className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="relative">
                    <p className="text-white/50 text-[10px] md:text-xs mb-0.5 group-hover:text-primary/70 transition-colors">TELEGRAM</p>
                    <p className="text-white text-[11px] md:text-sm group-hover:text-primary transition-colors leading-tight">@cryptobridgekorea</p>
                  </div>
                  {/* Arrow indicator */}
                  <ArrowUpRight className="absolute top-3 right-3 w-3 h-3 md:w-4 md:h-4 text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="group/form space-y-5 md:space-y-6 p-4 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 relative overflow-hidden">
                {/* Form background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 relative">
                  <div className="group/input">
                    <label className="block text-white/50 text-xs mb-2 group-focus-within/input:text-primary transition-colors">NAME *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] outline-none transition-all duration-300 text-sm md:text-base placeholder:text-white/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="group/input">
                    <label className="block text-white/50 text-xs mb-2 group-focus-within/input:text-primary transition-colors">E-MAIL *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] outline-none transition-all duration-300 text-sm md:text-base placeholder:text-white/30"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 relative">
                  <div className="group/input">
                    <label className="block text-white/50 text-xs mb-2 group-focus-within/input:text-primary transition-colors">COMPANY</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] outline-none transition-all duration-300 text-sm md:text-base placeholder:text-white/30"
                      placeholder="Company name"
                    />
                  </div>
                  <div className="group/input">
                    <label className="block text-white/50 text-xs mb-2 group-focus-within/input:text-primary transition-colors">WEBSITE</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] outline-none transition-all duration-300 text-sm md:text-base placeholder:text-white/30"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-white/50 text-xs mb-3">BUDGET</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                    {budgetOptions.map((option, index) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: option })}
                        className={`group/btn relative px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm border transition-all duration-300 overflow-hidden ${
                          formData.budget === option
                            ? 'bg-primary text-white border-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                            : 'bg-transparent border-white/10 text-white/70 hover:border-primary/50 hover:bg-white/[0.05] hover:text-white'
                        }`}
                        style={{ transitionDelay: `${index * 30}ms` }}
                      >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                        <span className="relative">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="group/input relative">
                  <label className="block text-white/50 text-xs mb-2 group-focus-within/input:text-primary transition-colors">PROJECT DETAILS *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] outline-none transition-all duration-300 resize-none text-sm md:text-base placeholder:text-white/30"
                    placeholder="Tell us about your project and goals..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group/submit w-full py-3.5 md:py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <ArrowUpRight className="w-5 h-5 relative z-10 group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform duration-300" />
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] opacity-0 group-hover/submit:opacity-100 transition-opacity" />
                  {/* Shine sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/submit:translate-x-full transition-transform duration-700" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;