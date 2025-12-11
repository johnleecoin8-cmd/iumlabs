import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import CalendlyButton from "./CalendlyButton";
import { brand } from "@/config/content";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";
import { Check } from "lucide-react";

const floatingTags = [
  { label: "30 min Free Call", color: "bg-cyan-400", top: "15%", left: "8%" },
  { label: "Calendly", color: "bg-pink-400", top: "25%", right: "12%" },
  { label: "Flexible Scheduling", color: "bg-yellow-400", bottom: "35%", left: "5%" },
  { label: "Ask Us Anything", color: "bg-green-400", bottom: "20%", right: "8%" },
  { label: "Start Your Journey", color: "bg-orange-400", top: "40%", left: "15%" },
];

const budgetOptions = [
  "$15,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
  "Looking to raise funds",
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
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacyAccepted) {
      toast.error("Please accept the Privacy Policy to continue.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        comments: `Company: ${formData.company}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\n\n${formData.message}`,
      });

      if (error) throw error;

      // Send email notification
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
      setPrivacyAccepted(false);
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="flex-1">
      {/* Blue CTA Section - Rounded Container */}
      <div className="bg-[#0a0a0a] py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="relative bg-primary rounded-3xl py-20 px-8 overflow-hidden">
            {/* Aurora overlay */}
            <div className="absolute inset-0 animate-aurora pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/30 via-transparent to-blue-300/20" />
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-300/20 via-transparent to-cyan-400/10" />
            </div>
            
            {/* Light sweep effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-light-sweep" />
            </div>
            
            {/* Floating Tags */}
            {floatingTags.map((tag, index) => (
              <span
                key={tag.label}
                className={`absolute ${tag.color} text-black text-xs font-medium px-4 py-2 rounded-full animate-float hidden lg:block`}
                style={{
                  top: tag.top,
                  left: tag.left,
                  right: tag.right,
                  bottom: tag.bottom,
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                {tag.label}
              </span>
            ))}

            <div className={`text-center relative z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                Let's Talk <span className="serif-italic">Strategy</span>
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Ready to launch your Web3 project in Korea? Schedule a free 30-minute consultation 
                with our team to discuss your goals and explore how we can help.
              </p>
              <CalendlyButton className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-full font-medium transition-all hover:shadow-xl">
                Book a Meeting
              </CalendlyButton>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative bg-[hsl(0,0%,4%)] py-24 px-4 overflow-hidden">
        {/* Aurora overlay for dark section */}
        <div className="absolute inset-0 animate-aurora pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-cyan-500/5" />
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/5 via-transparent to-blue-500/5" />
        </div>
        
        <div className={`container mx-auto max-w-6xl relative z-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Office Image & Address */}
            <div>
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <img
                  src={seoulBridgeNight}
                  alt="Seoul Office"
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-white/50 text-sm mb-1">office:</p>
                  <p className="text-white text-lg">{brand.address}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">e-mail:</p>
                  <a href={`mailto:${brand.email}`} className="text-white text-lg hover:text-primary transition-colors">
                    {brand.email}
                  </a>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">telegram:</p>
                  <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="text-white text-lg hover:text-primary transition-colors">
                    @cryptobridgekorea
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/50 text-sm mb-2">NAME</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-primary outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm mb-2">E-MAIL</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-primary outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/50 text-sm mb-2">COMPANY NAME</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-primary outline-none transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm mb-2">COMPANY WEBSITE</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-primary outline-none transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Budget Selection */}
                <div>
                  <label className="block text-white/50 text-sm mb-4">BUDGET</label>
                  <div className="flex flex-wrap gap-3">
                    {budgetOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: option })}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                          formData.budget === option
                            ? 'bg-primary text-white border-primary'
                            : 'bg-transparent text-white/70 border-white/20 hover:border-white/40'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-sm mb-2">TELL US ABOUT YOUR PROJECT</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-primary outline-none transition-colors resize-none"
                    placeholder="Describe your project and goals..."
                  />
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setPrivacyAccepted(!privacyAccepted)}
                    className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                      privacyAccepted
                        ? 'bg-primary border-primary'
                        : 'bg-transparent border-white/30 hover:border-white/50'
                    }`}
                  >
                    {privacyAccepted && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <p className="text-white/50 text-sm">
                    I agree to the{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and consent to receiving communications from CryptoBridge Korea.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="lunar-btn w-full sm:w-auto disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
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
