"use client";

import { useEffect, useRef } from "react";
import { RATING, REVIEW_COUNT } from "./data";

/* The kinetic band: real clipper-fade footage graded to midnight, with an
   oversized statement. Video is the craft (a guard running up a fade), not an
   identity portrait, so it carries the medium without a community-cast concern.
   Respects reduced-motion by holding on the poster. */
export default function TheFade() {
  const vidRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="fadeband" aria-label="The fade">
      <video
        ref={vidRef}
        className="fadeband-vid"
        poster="/images/fade-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/images/fade-loop.mp4" type="video/mp4" />
      </video>
      <div className="fadeband-scrim" aria-hidden="true" />

      <div className="wrap fadeband-inner">
        <span className="kicker">The Fade · The craft</span>
        <h2 className="display fadeband-title">
          Every line, <span className="hl">exact</span>.
        </h2>
        <p className="fadeband-sub">
          Skin fades, tapers and edge ups, blended by the same steady hand until
          the line disappears. That is how a record stays perfect.
        </p>
        <div className="fadeband-stat mono">
          <span className="fb-num">{RATING}</span>
          <span className="fb-of">across {REVIEW_COUNT} cuts</span>
        </div>
      </div>

      <style>{`
        .fadeband {
          position: relative;
          z-index: 2;
          min-height: 82svh;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .fadeband-vid {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          filter: saturate(0.55) contrast(1.08) brightness(0.6) hue-rotate(8deg);
          z-index: 0;
        }
        .fadeband-scrim {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(90deg, rgba(10,16,34,0.94) 0%, rgba(10,16,34,0.6) 45%, rgba(10,16,34,0.2) 100%),
            linear-gradient(180deg, rgba(10,16,34,0.7) 0%, transparent 30%, rgba(10,16,34,0.85) 100%),
            radial-gradient(90% 70% at 12% 50%, rgba(78,166,255,0.12), transparent 60%);
        }
        .fadeband-inner { position: relative; z-index: 2; width: 100%; padding-block: clamp(3rem, 8vw, 5rem); }
        .fadeband-title {
          font-size: clamp(2.8rem, 11vw, 7rem);
          margin: 1.1rem 0 0;
          text-shadow: 0 2px 50px rgba(6,10,22,0.6);
        }
        .fadeband-title .hl { color: var(--accent); }
        .fadeband-sub { color: var(--ink-soft); max-width: 32rem; margin: 1.5rem 0 0; font-size: clamp(1rem, 2.6vw, 1.15rem); }
        .fadeband-stat { display: flex; align-items: baseline; gap: 0.8rem; margin-top: 2.2rem; }
        .fb-num {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.4rem, 7vw, 3.4rem); color: var(--accent-hi);
        }
        .fb-of { font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-soft); }
      `}</style>
    </section>
  );
}
