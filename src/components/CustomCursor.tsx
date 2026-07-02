import { useEffect, useRef, useState } from 'react';

// cuberto.com cursor system port (computed-style audit 2026-07-02).
// Single fixed element moved via style.transform (no React re-render per
// mousemove). States as classes, exactly like their .cb-cursor:
//   rest      -> small brand dot (::before circle scaled down)
//   -pointer  -> grows over interactive elements, mix-blend exclusion
//   -text     -> full circle with the label from data-cursor-text
const CustomCursor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      el.classList.add('is-visible');

      const t = e.target as HTMLElement;
      const textEl = t.closest?.('[data-cursor-text]') as HTMLElement | null;
      if (textEl) {
        setLabel(textEl.dataset.cursorText || '');
        el.classList.add('-text');
        el.classList.remove('-pointer');
      } else {
        el.classList.remove('-text');
        el.classList.toggle('-pointer', !!t.closest?.('a, button, [role="button"], input, textarea, select, label'));
      }
    };
    const leave = () => el.classList.remove('is-visible');

    window.addEventListener('mousemove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  // Touch devices keep the native experience
  if (typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches) {
    return null;
  }

  return (
    <div ref={ref} className="cb-cursor" aria-hidden="true">
      <span className="cb-cursor-text">{label}</span>
    </div>
  );
};

export default CustomCursor;
