import { Canvas } from "@react-three/fiber";
import {
  Component,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Cell, workgridCells } from "./heroData";
import Workgrid from "./Workgrid";
import "./workgrid-hero.css";

// WebGL can be missing (old/blocked GPUs, some mobiles, headless). Detect once
// so we render a static fallback instead of crashing the hero.
function webglSupported(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Belt-and-suspenders: if the Canvas throws at runtime (context lost mid-render),
// swallow it so the headline + CTAs stay on screen.
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

// the word that riffles through the split-flap board in the headline
const ROLL_WORDS = ["Korea", "Seoul", "Asia"];

const FLAP_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const isCoarse = () =>
  typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;

// one character on a solari split-flap board: when its target letter changes it
// riffles through a few random glyphs and flips up into place, airport-board style.
function FlapCell({ target, index }: { target: string; index: number }) {
  const [shown, setShown] = useState(target);
  const [tick, setTick] = useState(0);
  const prev = useRef(target);

  useEffect(() => {
    if (prev.current === target) return;
    prev.current = target;
    if (prefersReducedMotion()) {
      setShown(target);
      return;
    }
    const steps = 4 + (index % 3);
    let step = 0;
    let spin: ReturnType<typeof setInterval> | undefined;
    const begin = setTimeout(() => {
      spin = setInterval(() => {
        step += 1;
        if (step >= steps) {
          setShown(target);
          setTick((t) => t + 1);
          if (spin) clearInterval(spin);
        } else {
          setShown(FLAP_GLYPHS[Math.floor(Math.random() * FLAP_GLYPHS.length)]);
          setTick((t) => t + 1);
        }
      }, 78);
    }, index * 60);
    return () => {
      clearTimeout(begin);
      if (spin) clearInterval(spin);
    };
  }, [target, index]);

  const ch = shown === " " ? " " : shown;
  return (
    <span className="wgh-flap-cell">
      <span key={tick} className="wgh-flap-glyph">
        {ch}
      </span>
    </span>
  );
}

// headline word as a fixed-grid split-flap board, clipped to the current word's
// measured width so the line stays optically centered while it riffles.
function SplitFlap({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [wi, setWi] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const maxLen = useMemo(() => Math.max(...words.map((w) => w.length)), [words]);

  useLayoutEffect(() => {
    const measure = () =>
      setWidths(measureRefs.current.map((el) => el?.getBoundingClientRect().width ?? 0));
    measure();
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(measure);
  }, [words]);

  useEffect(() => {
    const id = setInterval(() => setWi((p) => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const word = words[wi];
  const w = widths[wi];

  return (
    <span className="wgh-flap" aria-label={words[0]} style={{ width: w ? `${w}px` : undefined }}>
      <span aria-hidden className="wgh-flap-measure">
        {words.map((wd, k) => (
          <span
            key={k}
            ref={(el) => {
              measureRefs.current[k] = el;
            }}
          >
            {wd}
          </span>
        ))}
      </span>
      {Array.from({ length: maxLen }).map((_, idx) => (
        <FlapCell key={idx} target={word[idx] ?? " "} index={idx} />
      ))}
    </span>
  );
}

const Arrow = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function WorkgridHero() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<Cell | null>(null);
  const coarse = useMemo(() => isCoarse(), []);
  const [glOk] = useState(() => webglSupported());

  const cells = useMemo(() => workgridCells, []);

  const onSelect = (cell: Cell) => navigate(`/projects/${cell.slug}`);

  return (
    <section className="wgh-root" aria-label="ium Labs — selected work">
      {glOk ? (
        <CanvasBoundary>
          <Canvas
            className="wgh-canvas"
            camera={{ position: [0, 0, 9], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
            style={{ touchAction: coarse ? "pan-y" : "none", cursor: hovered ? "pointer" : "grab" }}
          >
            <color attach="background" args={["#0a0a0a"]} />
            <Workgrid cells={cells} onHover={setHovered} onSelect={onSelect} />
          </Canvas>
        </CanvasBoundary>
      ) : (
        <div aria-hidden className="wgh-canvas wgh-canvas--fallback" />
      )}

      <div aria-hidden className="wgh-vignette" />
      <div aria-hidden className="wgh-grain" />

      {/* hero: headline + CTAs */}
      <div className="wgh-hero">
        <div aria-hidden className="wgh-scrim" />
        <div className="wgh-inner">
          <h2 className="wgh-title">
            <span className="wgh-line">Your Web3 growth</span>
            <span className="wgh-line">
              partner in&nbsp;
              <SplitFlap words={ROLL_WORDS} />
            </span>
          </h2>

          <p className="wgh-sub">
            Korea-native, Asia-wide. We don&rsquo;t sell you a list &mdash; we embed
            operators who run your go-to-market on the ground.
          </p>

          <div className="wgh-cta">
            <button
              onClick={() => navigate("/contact")}
              className="wgh-mono wgh-btn wgh-btn--primary"
            >
              <span>Get Your Free Proposal</span>
              <Arrow />
            </button>

            <span aria-hidden className="wgh-divider" />

            <button
              onClick={() => navigate("/projects")}
              className="wgh-mono wgh-btn wgh-btn--ghost"
            >
              <span>View Our Work</span>
              <Arrow />
            </button>
          </div>
        </div>
      </div>

      {/* hovered tile label */}
      <div
        className="wgh-hovered"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
        }}
      >
        {hovered && (
          <>
            <div
              className="wgh-mono"
              style={{ fontSize: 11, color: "var(--wgh-muted)", marginBottom: 6 }}
            >
              {hovered.client ?? "ium Labs"}
              {hovered.zone ? ` — ${hovered.zone}` : ""}
            </div>
            <div
              style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.02em" }}
            >
              {hovered.title}
            </div>
            {hovered.features.length > 0 && (
              <div
                className="wgh-mono"
                style={{ fontSize: 10, color: "var(--wgh-muted)", marginTop: 8 }}
              >
                {hovered.features.slice(0, 5).join(" · ")}
              </div>
            )}
          </>
        )}
      </div>

      {/* hint */}
      <div className="wgh-mono wgh-hint" style={{ opacity: hovered ? 0 : 0.7 }}>
        {coarse ? "tap a tile to explore" : "drag to explore · click to open"}
      </div>
    </section>
  );
}
