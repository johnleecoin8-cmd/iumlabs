import { type CSSProperties, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cell, workgridCells } from "./heroData";
import "./workgrid-hero.css";

// the word that riffles through the split-flap board in the headline
const ROLL_WORDS = ["Korea", "Seoul", "Asia"];

const FLAP_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

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

  const ch = shown === " " ? " " : shown;
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

// one vertically-flowing column of project tiles. content is rendered twice and
// the track translates by -50% so the loop is seamless; direction "down" plays
// the same loop in reverse. hovering a column pauses it (see CSS).
function MarqueeColumn({
  items,
  direction,
  duration,
  onSelect,
}: {
  items: Cell[];
  direction: "up" | "down";
  duration: number;
  onSelect: (cell: Cell) => void;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="wgh-col">
      <div
        className="wgh-col-track"
        style={{
          animationName: direction === "up" ? "wghFlowUp" : "wghFlowDown",
          animationDuration: `${duration}s`,
        }}
      >
        {doubled.map((cell, i) => (
          <button
            key={`${cell.id}-${i}`}
            className="wgh-tile"
            onClick={() => onSelect(cell)}
            aria-label={`${cell.title} case study`}
            style={cell.glowColor ? ({ "--tile-glow": cell.glowColor } as CSSProperties) : undefined}
          >
            <img src={cell.poster ?? ""} alt="" loading="lazy" decoding="async" />
            <span className="wgh-tile-label">
              <span className="wgh-tile-name">{cell.title}</span>
              {cell.zone && <span className="wgh-tile-zone wgh-mono">{cell.zone}</span>}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function WorkgridHero() {
  const navigate = useNavigate();
  const onSelect = (cell: Cell) => navigate(`/projects/${cell.slug}`);

  // split the case studies across three columns; flow down / up / down
  const columns = useMemo(() => {
    const cols: Cell[][] = [[], [], []];
    workgridCells.forEach((c, i) => cols[i % 3].push(c));
    return cols;
  }, []);
  const directions: ("up" | "down")[] = ["down", "up", "down"];
  const durations = [42, 36, 46];

  return (
    <section className="wgh-root" aria-label="ium Labs — selected work">
      <div className="wgh-grid" aria-hidden>
        {columns.map((items, i) => (
          <MarqueeColumn
            key={i}
            items={items}
            direction={directions[i]}
            duration={durations[i]}
            onSelect={onSelect}
          />
        ))}
      </div>

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
    </section>
  );
}
