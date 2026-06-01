import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const LeadMagnetSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div ref={ref} className="py-12 sm:py-16">
      <div className="px-4 sm:px-6 lg:px-10">
        <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#141414] to-[#0D0D0D] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#a78bfa]/[0.04] blur-[100px]" />

          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-6 sm:p-10 lg:p-14">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a78bfa]/10 border border-[#a78bfa]/20 mb-5">
                <FileText className="w-3.5 h-3.5 text-[#a78bfa]" />
                <span className="text-[11px] sm:text-xs font-medium text-[#a78bfa] tracking-wide">Free Report</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight mb-3">
                Korea Web3 Market<br />Entry Playbook
              </h3>
              <p className="text-sm text-white/50 leading-relaxed max-w-md">
                Exchange landscape, regulatory overview, KOL pricing benchmarks, and community platform strategy — everything you need before launching in Korea.
              </p>
            </div>

            <div className="w-full lg:w-auto lg:min-w-[340px]">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">Check your inbox</p>
                  <p className="text-xs text-white/40">The report is on its way.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="work@company.com"
                    required
                    className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#a78bfa]/40 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
                  >
                    Download Free Report
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-white/30 text-center">No spam. Unsubscribe anytime.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnetSection;
