"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BOOKSY, REVIEW_COUNT } from "./data";

/* THE SIGNATURE — "The Record", now a live instrument.
   164 lines, one per five-star review, ramped into a fade profile. A clipper
   light follows your finger or cursor across them, lifting and brightening the
   lines it passes, like a guard running up a fade. On touch or at rest it idles
   with a slow self-sweep. Resting state is fully lit + 164, so it is correct
   with no JS, under reduced motion, or in a hidden tab (DESIGN_LESSONS 06-03). */

const N = REVIEW_COUNT;
const MIN = 14;
const MAX = 150;

const HEIGHTS: number[] = Array.from({ length: N }, (_, i) => {
  const t = i / (N - 1);
  const ease = t * t * (3 - 2 * t);
  const tooth = Math.sin(i * 0.9) * 4;
  return Math.round(MIN + (MAX - MIN) * ease + tooth);
});

const SIGMA = 0.06; // width of the clipper light

export default function TheRecord() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wallRef = useRef<HTMLDivElement | null>(null);
  const barsRef = useRef<HTMLDivElement | null>(null);
  const bladeRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(N);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setFine(matchMedia("(pointer: fine)").matches);

    const bars = barsRef.current
      ? (Array.from(barsRef.current.children) as HTMLElement[])
      : [];
    let hx = 0.5; // current light position 0..1
    let target = 0.5;
    let pointerActive = false;
    let lastMove = 0;
    let raf = 0;
    let t0 = 0;

    const onMove = (e: PointerEvent) => {
      const r = barsRef.current?.getBoundingClientRect();
      if (!r) return;
      const f = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      target = f;
      pointerActive = true;
      lastMove = performance.now();
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top}px, 0)`;
        cursorRef.current.style.opacity = "1";
      }
    };
    const onLeave = () => {
      pointerActive = false;
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    const wall = wallRef.current;
    wall?.addEventListener("pointermove", onMove);
    wall?.addEventListener("pointerleave", onLeave);

    const draw = (now: number) => {
      if (!t0) t0 = now;
      // idle self-sweep when the pointer is not driving it
      const idle = !pointerActive || now - lastMove > 1400;
      if (idle) target = 0.5 + 0.5 * Math.sin((now - t0) * 0.0006);
      hx += (target - hx) * 0.12;

      for (let i = 0; i < bars.length; i++) {
        const d = i / (N - 1) - hx;
        const infl = Math.exp(-(d * d) / (SIGMA * SIGMA));
        const b = bars[i];
        b.style.transform = `scaleY(${(1 + infl * 0.16).toFixed(3)})`;
        b.style.opacity = (0.7 + infl * 0.3).toFixed(3);
      }
      if (bladeRef.current) {
        bladeRef.current.style.left = `${(hx * 100).toFixed(2)}%`;
        bladeRef.current.style.opacity = idle ? "0.5" : "1";
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // count up on first view
    let counted = false;
    const runCount = () => {
      if (counted) return;
      counted = true;
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * N));
        if (p < 1) requestAnimationFrame(tick);
      };
      setCount(0);
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && runCount()),
      { threshold: 0.3 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    const fb = window.setTimeout(runCount, 1900);

    return () => {
      cancelAnimationFrame(raf);
      wall?.removeEventListener("pointermove", onMove);
      wall?.removeEventListener("pointerleave", onLeave);
      io.disconnect();
      window.clearTimeout(fb);
    };
  }, []);

  const bars = useMemo(
    () =>
      HEIGHTS.map((h, i) => (
        <span key={i} className="rec-bar" style={{ height: `${h}px` }} />
      )),
    []
  );

  return (
    <section id="record" ref={sectionRef} className="section rec">
      <div className="wrap">
        <span className="kicker">The Record · Booksy 5.0</span>
        <div className="rec-head">
          <h2 className="display rec-title">
            Every cut, <span className="hl">five stars</span>.
          </h2>
          <p className="rec-lede">
            One sixty four reviews on Booksy, and not a single one below five.
            Run your finger across the record. Every line is one chair, one
            client, one perfect score.
          </p>
        </div>

        <div ref={wallRef} className="rec-wall">
          <div className="rec-readout mono">
            <span className="rec-count">{count}</span>
            <span className="rec-of">/ {N} five-star cuts</span>
          </div>
          <div
            ref={barsRef}
            className="rec-bars"
            role="img"
            aria-label={`${N} five-star reviews on Booksy, a perfect 5.0`}
          >
            {bars}
          </div>
          <div ref={bladeRef} className="rec-blade" aria-hidden="true" />
          {fine && (
            <div ref={cursorRef} className="rec-cursor" aria-hidden="true">
              <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
                <rect x="1" y="6" width="26" height="12" rx="2" fill="#9bd6ff" />
                <path d="M27 8 h10 M27 11 h11 M27 14 h10" stroke="#9bd6ff" strokeWidth="1.4" />
              </svg>
            </div>
          )}
          <div className="rec-baseline" />
        </div>

        <div className="rec-foot">
          <div className="rec-rating mono">
            <strong>5.0</strong>
            <span className="rec-stars">★★★★★</span>
          </div>
          <a
            href={BOOKSY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Read it on Booksy
          </a>
        </div>
      </div>

      <style>{`
        .rec {
          background:
            radial-gradient(80% 50% at 50% 0%, rgba(78,166,255,0.08), transparent 60%),
            var(--bg);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .rec-head { display: grid; gap: 1.2rem; margin: 1.4rem 0 2.6rem; }
        .rec-title { font-size: clamp(2.1rem, 6.5vw, 4.2rem); }
        .rec-title .hl { color: var(--accent); }
        .rec-lede { color: var(--ink-soft); max-width: 40rem; font-size: clamp(0.98rem, 2.4vw, 1.1rem); }
        @media (min-width: 900px) { .rec-head { grid-template-columns: 1fr 1fr; align-items: end; } }

        .rec-wall { position: relative; padding: 1.4rem 0 0; cursor: none; touch-action: pan-y; }
        @media (pointer: coarse) { .rec-wall { cursor: default; } }
        .rec-readout { display: flex; align-items: baseline; gap: 0.7rem; margin-bottom: 1rem; }
        .rec-count {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.6rem, 9vw, 4.6rem); color: var(--accent-hi);
          line-height: 1; font-variant-numeric: tabular-nums;
        }
        .rec-of { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
        .rec-bars {
          position: relative;
          display: flex; align-items: flex-end; gap: 1px;
          height: ${MAX + 10}px; width: 100%; overflow: visible;
        }
        .rec-bar {
          flex: 1 1 0; min-width: 0; border-radius: 1px 1px 0 0;
          background: var(--accent); opacity: 0.9;
          transform-origin: bottom; will-change: transform, opacity;
        }
        /* the clipper light */
        .rec-blade {
          position: absolute; top: -8px; bottom: 0; left: 50%;
          width: 2px; margin-left: -1px; pointer-events: none; opacity: 0.5;
          background: linear-gradient(180deg, var(--accent-hi), transparent);
          box-shadow: 0 0 24px 8px var(--accent-glow);
          transition: opacity 0.3s ease;
        }
        .rec-cursor {
          position: absolute; top: 0; left: 0; pointer-events: none; opacity: 0;
          margin: -11px 0 0 -14px; transition: opacity 0.25s ease;
          filter: drop-shadow(0 0 10px var(--accent-glow));
        }
        .rec-baseline { height: 1px; background: var(--border-strong); width: 100%; }
        .rec-foot {
          display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
          gap: 1.2rem; margin-top: 1.6rem;
        }
        .rec-rating { display: flex; align-items: baseline; gap: 0.7rem; }
        .rec-rating strong { font-family: var(--font-display); font-weight: 600; font-size: 2rem; color: var(--ink); }
        .rec-stars { color: var(--accent); letter-spacing: 0.16em; font-size: 1.1rem; }
        @media (prefers-reduced-motion: reduce) {
          .rec-bar { opacity: 1 !important; transform: none !important; }
          .rec-blade, .rec-cursor { display: none; }
        }
      `}</style>
    </section>
  );
}
