"use client";

import { useEffect, useRef } from "react";
import { BOOKSY, RATING, REVIEW_COUNT } from "./data";
import Reveal from "./Reveal";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = heroRef.current;

    // parallax drift on the deep backdrop
    let raf = 0;
    const loop = () => {
      if (bgRef.current)
        bgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.16}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // pointer drives the clipper-light across the word; release resumes auto-sweep
    const onMove = (e: PointerEvent) => {
      const r = hero?.getBoundingClientRect();
      if (!r) return;
      const f = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      hero?.style.setProperty("--sx", f.toFixed(3));
      hero?.classList.add("hero--touched");
    };
    const onLeave = () => hero?.classList.remove("hero--touched");
    hero?.addEventListener("pointermove", onMove);
    hero?.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      hero?.removeEventListener("pointermove", onMove);
      hero?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="top" className="hero" ref={heroRef}>
      <div className="hero-bg" ref={bgRef} aria-hidden="true">
        <img src="/images/hero.jpg" width={1600} height={2200} alt="" fetchPriority="high" />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="wrap hero-inner">
        <Reveal>
          <span className="kicker hero-kicker">Barber Shop · 131 South Orange Ave</span>
        </Reveal>

        <h1 className="hero-lockup">
          <Reveal as="span" className="hero-pre">More than</Reveal>
          <Reveal delay={90} as="span" className="hero-word-wrap">
            <span className="hero-word display" data-text="Perfect.">Perfect.</span>
            <span className="hero-edgeup" aria-hidden="true" />
          </Reveal>
        </h1>

        <Reveal delay={180}>
          <p className="hero-sub">
            164 cuts on South Orange Avenue, and not one below five stars. A clean
            5.0 on Booksy, open from six in the morning, still going.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="hero-actions">
            <a href={BOOKSY} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Book the Chair
            </a>
            <a href="#record" className="btn btn-ghost">See the record</a>
            <span className="hero-pill mono">
              <span className="hp-star">★</span> {RATING} · {REVIEW_COUNT} reviews · Booksy
            </span>
          </div>
        </Reveal>
      </div>

      <span className="hero-scrollcue mono" aria-hidden="true">Scroll</span>

      <style>{`
        .hero {
          --sx: 0.5;
          position: relative; z-index: 2;
          min-height: 100svh; display: flex; align-items: center;
          overflow: hidden; padding: 110px 0 clamp(3rem, 8vh, 5rem);
        }
        .hero-bg { position: absolute; inset: -8% 0; z-index: 0; will-change: transform; }
        .hero-bg img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: 70% 26%;
          filter: saturate(0.5) contrast(1.05) brightness(0.4) blur(1px);
        }
        /* deep scrim — the photo is atmosphere, the type is the subject */
        .hero-scrim {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(180deg, rgba(10,16,34,0.86) 0%, rgba(10,16,34,0.6) 40%, rgba(10,16,34,0.92) 100%),
            linear-gradient(90deg, rgba(10,16,34,0.92) 0%, rgba(10,16,34,0.55) 55%, rgba(10,16,34,0.2) 100%),
            radial-gradient(100% 70% at 80% 12%, rgba(78,166,255,0.16), transparent 62%);
        }
        .hero-inner { position: relative; z-index: 2; width: 100%; }
        .hero-kicker { margin-bottom: clamp(1.4rem, 4vw, 2.2rem); }

        .hero-lockup { margin: 0; display: flex; flex-direction: column; gap: 0.1rem; }
        .hero-pre {
          font-family: var(--font-body); font-weight: 500;
          font-size: clamp(1.1rem, 4vw, 2rem); letter-spacing: 0.02em;
          color: var(--ink-soft); padding-left: 0.12em;
        }
        .hero-word-wrap { position: relative; display: inline-block; width: fit-content; }

        /* THE MOVE: the word built from clipper-lines (the fade), see-through gaps */
        .hero-word {
          display: block;
          font-size: clamp(4.2rem, 19vw, 15rem);
          line-height: 0.82; letter-spacing: -0.03em; text-transform: uppercase;
          color: transparent;
          background-image:
            linear-gradient(90deg, rgba(78,166,255,0.45) 0%, var(--accent) 45%, var(--accent-hi) 100%),
            repeating-linear-gradient(90deg, #000 0 1px, transparent 1px 5px);
          background-blend-mode: multiply;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        /* the clipper light sweeping across the word */
        .hero-word-wrap::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(100deg, transparent 44%, rgba(200,232,255,0.55) 50%, transparent 56%);
          mix-blend-mode: screen; filter: blur(3px);
          -webkit-mask-image: linear-gradient(90deg,#000,#000);
          transform: translateX(-120%);
          animation: heroSheen 5.2s cubic-bezier(0.7,0,0.3,1) infinite;
        }
        .hero--touched .hero-word-wrap::after {
          animation: none;
          transform: translateX(calc((var(--sx) * 240%) - 120%));
        }
        @keyframes heroSheen {
          0% { transform: translateX(-120%); }
          55%,100% { transform: translateX(120%); }
        }

        /* the edge-up line that draws in under the word */
        .hero-edgeup {
          position: absolute; left: 0.06em; bottom: -0.04em; height: 4px;
          width: 64%; background: var(--accent);
          box-shadow: 0 0 18px var(--accent-glow);
          transform-origin: left center; transform: scaleX(0);
          animation: edgeUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s forwards;
        }
        @keyframes edgeUp { to { transform: scaleX(1); } }

        .hero-sub {
          color: var(--ink-soft); max-width: 38rem;
          font-size: clamp(1rem, 2.6vw, 1.22rem); margin: clamp(1.8rem,5vw,2.6rem) 0 0;
        }
        .hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.8rem; margin-top: 2.1rem; }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-soft); border: 1px solid var(--border);
          border-radius: 999px; padding: 0.55rem 1rem; min-height: 44px;
        }
        .hp-star { color: var(--accent); }
        .hero-scrollcue {
          position: absolute; right: clamp(1.1rem,5vw,3rem); bottom: clamp(3rem,8vh,5rem);
          z-index: 2; font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--muted); writing-mode: vertical-rl; display: none;
        }
        @media (min-width: 980px) { .hero-scrollcue { display: inline-block; } }
        @media (prefers-reduced-motion: reduce) {
          .hero-word-wrap::after { display: none; }
          .hero-edgeup { transform: scaleX(1); animation: none; }
        }
      `}</style>
    </section>
  );
}
