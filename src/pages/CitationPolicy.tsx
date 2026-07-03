import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterLinksSection from "@/components/FooterLinksSection";
import SEOHead from "@/components/SEOHead";
import logoImage from "@/assets/ium-logo.png";

// Tiger Research's device: a formal fair-use policy makes citing us easy
// and puts the brand on every reuse. Linked from the footer and reports.
const CitationPolicy = () => (
  <div className="min-h-screen bg-[#0A0A0A]">
    <SEOHead
      title="Citation Policy | ium Research"
      description="How to cite ium Research charts, datasets, and reports. Free to use with attribution and a link."
      path="/citations"
    />
    <Navbar />
    <section className="pt-28 pb-20 px-5 sm:px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-10">
          <ArrowLeft className="w-4 h-4" /> Research
        </Link>
        <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-primary/80">ium Research</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-white">
          Citation Policy
        </h1>

        <div className="mt-8 space-y-6 text-white/70 leading-relaxed">
          <p>
            Everything ium Research publishes, articles, charts, the Korea Crypto GTM Index,
            the Upbit Listing Tracker, is <strong className="text-white">free to cite, quote, screenshot,
            and republish in part</strong>. We ask for two things:
          </p>
          <ol className="list-decimal ml-5 space-y-2">
            <li><strong className="text-white">Attribution</strong>: credit "ium Research" (or "ium Labs Research").</li>
            <li><strong className="text-white">A link</strong>: to the source article on iumlabs.io.</li>
          </ol>
          <p>
            No permission needed, no email required. For media use, translations, or full
            republication, reach us at{" "}
            <a href="mailto:info@iumlabs.io" className="link-editorial">info@iumlabs.io</a> or Telegram{" "}
            <a href="https://t.me/hnes2d" target="_blank" rel="noopener noreferrer" className="link-editorial">@hnes2d</a>.
          </p>
          <p className="text-white/50 text-sm">
            Machine-readable versions of every article live at{" "}
            <a href="/llms.txt" className="link-editorial">/llms.txt</a> (clean markdown per post).
            Datasets: <a href="/data/upbit-listings-2026.json" className="link-editorial">Upbit Listing Tracker</a> ·{" "}
            <a href="/downloads/korea-crypto-gtm-index-2026.pdf" className="link-editorial">GTM Index PDF</a>.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/[0.08] surface-edge bg-white/[0.02] p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-white mb-4">Logo kit</h2>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-black border border-white/[0.1] flex items-center justify-center">
              <img src={logoImage} alt="ium Research logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <a
                href={logoImage}
                download="ium-research-logo.png"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black text-sm font-semibold transition-swift hover:opacity-90"
              >
                <Download className="w-4 h-4" /> Download logo (PNG)
              </a>
              <p className="mt-2 text-xs text-white/40">
                Use it next to any chart or excerpt you republish. Don't recolor or distort it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <FooterLinksSection />
  </div>
);

export default CitationPolicy;
