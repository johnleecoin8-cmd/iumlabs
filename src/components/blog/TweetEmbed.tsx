import { useEffect, useRef } from "react";

/**
 * Live X/Twitter embed for a single public tweet.
 * Renders the standard blockquote and lets the official widgets.js upgrade it
 * into the full rendered tweet (author, text, media). No login required.
 * If widgets.js is blocked, the blockquote degrades to a linked citation.
 */
export default function TweetEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const w = window as unknown as { twttr?: { widgets?: { load: (el?: HTMLElement) => void } } };
    const load = () => w.twttr?.widgets?.load(ref.current?.parentElement || undefined);
    if (w.twttr?.widgets) {
      load();
      return;
    }
    let s = document.getElementById("twitter-wjs") as HTMLScriptElement | null;
    if (!s) {
      s = document.createElement("script");
      s.id = "twitter-wjs";
      s.async = true;
      s.src = "https://platform.twitter.com/widgets.js";
      document.body.appendChild(s);
    }
    s.addEventListener("load", load);
    return () => s?.removeEventListener("load", load);
  }, [url]);

  return (
    <figure className="my-10 flex justify-center">
      <blockquote
        ref={ref}
        className="twitter-tweet"
        data-theme="dark"
        data-dnt="true"
        data-conversation="none"
      >
        <a href={url}>{url}</a>
      </blockquote>
    </figure>
  );
}
