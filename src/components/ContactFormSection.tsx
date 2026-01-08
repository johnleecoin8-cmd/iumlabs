import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Send, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
const budgetOptions = ["$15K - $25K", "$25K - $50K", "$50K +", "Raising funds"];
interface ContactFormSectionProps {
  sectionNumber?: string;
  accentColor?: string;
}
const ContactFormSection = ({
  sectionNumber = "08",
  accentColor = "white"
}: ContactFormSectionProps) => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate form completion percentage
  const filledFields = [formData.name, formData.email, formData.budget, formData.message].filter(Boolean).length;
  const completionPercentage = Math.round(filledFields / 4 * 100);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from('contact_submissions').insert({
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
      setFormData({
        name: "",
        email: "",
        company: "",
        website: "",
        message: "",
        budget: ""
      });
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
  return <section className="bg-[#0A0A0A]">
      <div className="border-t border-white/15">
        {/* Section Header */}
        <div className="bg-[#1A1A1A] flex items-baseline justify-between p-4 sm:p-5 md:px-10 lg:px-12 md:py-7 border-b border-white/15">
          <div className="flex items-baseline gap-4 sm:gap-6 md:gap-10">
            <span className="text-[10px] sm:text-label text-white/40 font-mono tracking-widest">{sectionNumber}</span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-tight">Contact</h2>
          </div>
          <Link to="/contact" className="text-[10px] sm:text-caption text-white/65 tracking-wider hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 border border-white/25 rounded-full hover:border-white/45 transition-colors font-medium">
            Get Started
          </Link>
        </div>
        
        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Contact Info */}
          <div className="w-full md:w-2/5 p-4 sm:p-6 md:p-8 lg:p-12 border-b md:border-b-0 md:border-r border-white/15">
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-3 sm:mb-5 tracking-tight">
              Get in Touch
            </h3>
            <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-10">
              Ready to enter the Korean market? Let's discuss how we can help your project grow.
            </p>

            {/* Office */}
            <div className="mb-4 sm:mb-7 pb-4 sm:pb-7 border-b border-white/15">
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] sm:text-label uppercase tracking-wider text-white/50 block mb-1.5 sm:mb-2">Office</span>
                  <p className="text-white text-xs sm:text-sm leading-relaxed">{brand.address}</p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-3">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] sm:text-caption text-white/50">Live in Seoul • {getSeoulTime()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <a href={`mailto:${brand.email}`} className="group flex items-center justify-between mb-4 sm:mb-7 pb-4 sm:pb-7 border-b border-white/15 hover:border-white/25 transition-colors active:scale-[0.98] min-h-[44px]">
              <div className="flex items-start gap-3 sm:gap-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] sm:text-label uppercase tracking-wider text-white/50 block mb-1.5 sm:mb-2">Email</span>
                  <p className="text-white text-xs sm:text-sm">{brand.email}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/25 group-hover:text-white/65 group-hover:translate-x-1.5 transition-all flex-shrink-0" />
            </a>

            {/* Telegram */}
            <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between mb-4 sm:mb-7 pb-4 sm:pb-7 border-b border-white/15 hover:border-white/25 transition-colors active:scale-[0.98] min-h-[44px]">
              <div className="flex items-start gap-3 sm:gap-4">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] sm:text-label uppercase tracking-wider text-white/50 block mb-1.5 sm:mb-2">Telegram</span>
                  <p className="text-white text-xs sm:text-sm">{brand.telegram}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/25 group-hover:text-white/65 group-hover:translate-x-1.5 transition-all flex-shrink-0" />
            </a>

            {/* LinkedIn */}
            

            {/* Footer Links */}
            
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full md:w-3/5 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:px-12 lg:py-8">
            <div className="mb-4 sm:mb-8">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm text-white/50">Contact Form</span>
                <div className="flex items-center gap-2">
                  {completionPercentage === 100 ? <div className="flex items-center gap-1.5 success-animate">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" className="checkmark-animate" />
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-sm text-emerald-400 font-medium">Ready to send</span>
                    </div> : <span className="text-xs sm:text-sm text-white/50">{completionPercentage}%</span>}
                </div>
              </div>
              {/* Progress Bar */}
              <div className="form-progress-bar h-1 sm:h-1.5">
                <div className="form-progress-bar-fill" style={{
                width: `${completionPercentage}%`
              }} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div>
                  <label className="block text-[10px] sm:text-label uppercase tracking-wider text-white/50 mb-2 sm:mb-3">Name *</label>
                  <input type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required className="w-full bg-transparent border-b border-white/25 pb-2.5 sm:pb-3 text-sm sm:text-base text-white placeholder:text-white/35 focus:border-white focus:outline-none transition-colors min-h-[44px]" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-label uppercase tracking-wider text-white/50 mb-2 sm:mb-3">Email *</label>
                  <input type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} required className="w-full bg-transparent border-b border-white/25 pb-2.5 sm:pb-3 text-sm sm:text-base text-white placeholder:text-white/35 focus:border-white focus:outline-none transition-colors min-h-[44px]" />
                </div>
              </div>

              {/* Company & Website Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div>
                  <label className="block text-[10px] sm:text-label uppercase tracking-wider text-white/50 mb-2 sm:mb-3">Company</label>
                  <input type="text" placeholder="Company name" value={formData.company} onChange={e => setFormData({
                  ...formData,
                  company: e.target.value
                })} className="w-full bg-transparent border-b border-white/25 pb-2.5 sm:pb-3 text-sm sm:text-base text-white placeholder:text-white/35 focus:border-white focus:outline-none transition-colors min-h-[44px]" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-label uppercase tracking-wider text-white/50 mb-2 sm:mb-3">Website</label>
                  <input type="url" placeholder="https://..." value={formData.website} onChange={e => setFormData({
                  ...formData,
                  website: e.target.value
                })} className="w-full bg-transparent border-b border-white/25 pb-2.5 sm:pb-3 text-sm sm:text-base text-white placeholder:text-white/35 focus:border-white focus:outline-none transition-colors min-h-[44px]" />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-[10px] sm:text-label uppercase tracking-wider text-white/50 mb-3 sm:mb-4">Budget *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3">
                  {budgetOptions.map(option => <button key={option} type="button" onClick={() => setFormData({
                  ...formData,
                  budget: option
                })} className={`px-3 sm:px-5 py-2 sm:py-3 text-[11px] sm:text-sm border transition-all min-h-[40px] sm:min-h-[48px] font-medium active:scale-[0.97] ${formData.budget === option ? 'bg-white/15 border-white text-white' : 'bg-transparent border-white/25 text-white/65 hover:border-white/45 hover:text-white active:bg-white/15'}`}>
                      {option}
                    </button>)}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-[10px] sm:text-label uppercase tracking-wider text-white/50 mb-2 sm:mb-3">Project Details *</label>
                <textarea placeholder="Tell us about your project..." value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} rows={3} className="w-full bg-transparent border-b border-white/25 pb-2.5 sm:pb-3 text-sm sm:text-base text-white placeholder:text-white/35 focus:border-white focus:outline-none transition-colors resize-none min-h-[80px]" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || completionPercentage < 100}
                className={`w-full mt-3 sm:mt-4 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 min-h-[48px] active:scale-[0.98] ${
                  completionPercentage === 100
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-white/15 text-white/50 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactFormSection;