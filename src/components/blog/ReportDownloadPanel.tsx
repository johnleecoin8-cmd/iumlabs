import { useState } from "react";
import { Download, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Ungated report panel (CEO review D11): the PDF is a public link —
 * citation and seeding come first. The email field is OPTIONAL, a
 * one-line "get the re-cuts" subscribe that never blocks the download.
 * Insert is defensive: tries with the source column, falls back to the
 * legacy schema if the migration hasn't been applied yet.
 */
const ReportDownloadPanel = ({ href, title }: { href: string; title: string }) => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [trap, setTrap] = useState(""); // honeypot

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) return; // bot filled the hidden field
    if (!email || !/.+@.+\..+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setBusy(true);
    try {
      let { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email, source: "gtm-index" } as never);
      if (error && /source/.test(error.message)) {
        // migration not applied yet — legacy columns only
        ({ error } = await supabase.from("newsletter_subscribers").insert({ email }));
      }
      if (error && !/duplicate|unique/i.test(error.message)) throw error;
      setDone(true);
    } catch {
      toast.error("Subscription failed, but the PDF is yours either way.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="my-10 rounded-2xl border border-primary/25 bg-primary/[0.05] surface-edge p-6 sm:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80 mb-2">
        ium Research · Full Report
      </p>
      <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.01em] text-white mb-4">
        {title}
      </h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <a
          href={href}
          download
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-primary text-black font-semibold text-sm transition-swift hover:opacity-90 active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          Download the PDF — free, no email required
        </a>
        {done ? (
          <span className="text-sm text-primary">Subscribed. Quarterly re-cuts land in your inbox.</span>
        ) : (
          <form onSubmit={subscribe} className="flex items-center gap-2 flex-1 min-w-0">
            <input
              type="text"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Optional: email for quarterly re-cuts"
              className="flex-1 min-w-0 bg-white/[0.04] border border-white/[0.1] rounded-full px-4 h-11 text-sm text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-1.5 px-4 h-11 rounded-full border border-white/[0.15] text-white/70 text-sm hover:text-white hover:border-white/[0.3] transition-swift disabled:opacity-40 shrink-0"
            >
              {busy ? "..." : "Get updates"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportDownloadPanel;
