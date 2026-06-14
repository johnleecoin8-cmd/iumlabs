import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  // eslint-disable-next-line no-var
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Global buttery smooth scrolling (Lenis) integrated with GSAP ScrollTrigger so
 * pinned/scrubbed sections (e.g. the GTM page) stay in sync. Desktop only — touch
 * keeps native scrolling (smoothTouch off). Disabled under prefers-reduced-motion.
 * Exposes the instance on window.__lenis for route-change scroll resets.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
};
