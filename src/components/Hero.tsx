"use client";

import { useEffect, useRef } from "react";
import { BOOKSY, RATING, REVIEW_COUNT } from "./data";
import Reveal from "./Reveal";

/* THE HERO — redesigned 06-23-2026.
   The owner said the old hero "doesn't scream barbershop." This one cannot be
   mistaken for anything else: a full-bleed photo of the real shop (a Black
   barber mid-cut, mirror lights, chairs down the wall), an unmistakable
   spinning barber-pole spine down the left edge, and the name struck on a brass
   nameplate. Barbershop on sight, first viewport, zero ambiguity. */
export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const loop = () => {
      if (bgRef.current)
        bgRef.current.style.transform = `translate3d(0, ${(window.scrollY * 0.14).toFixed(1)}px, 0) scale(1.06)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="top" className="hero" ref={heroRef}>
      {/* the real shop, edge to edge */}
      <div className="hero-bg" ref={bgRef} aria-hidden="true">
        <img
          src="/images/interior.jpg"
          width={1600}
          height={1067}
          alt=""
          fetchPriority="high"
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      {/* THE BARBER POLE — the unmistakable cue, a real spinning pole spine */}
      <div className="hero-pole" aria-hidden="true">
        <span className="pole-cap pole-cap--top" />
        <span className="pole-glass">
          <span className="pole-stripes" />
        </span>
        <span className="pole-cap pole-cap--bottom" />
      </div>

      <div className="wrap hero-inner">
        <Reveal>
          <span className="kicker hero-kicker">
            Barber Shop · South Orange Ave
          </span>
        </Reveal>

        <h1 className="hero-lockup">
          <Reveal as="span" className="hero-line1 display">More Than</Reveal>
          <Reveal delay={90} as="span" className="hero-plate">
            <span className="hero-word display">Perfect</span>
          </Reveal>
        </h1>

        <Reveal delay={180}>
          <p className="hero-sub">
            Fades, line ups, beards and hot towel shaves on the Avenue. One
            sixty four cuts on the books, and a clean five stars on every one.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="hero-actions">
            <a
              href={BOOKSY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book the Chair
            </a>
            <a href="#record" className="btn btn-ghost">
              See the record
            </a>
            <span className="hero-pill mono">
              <span className="hp-star">★</span> {RATING} · {REVIEW_COUNT} reviews
            </span>
          </div>
        </Reveal>
      </div>

      <span className="hero-scrollcue mono" aria-hidden="true">
        Scroll
      </span>

      <style>{`
        .hero {
          position: relative; z-index: 2;
          min-height: 100svh; display: flex; align-items: center;
          overflow: hidden;
          padding: 120px 0 clamp(3.5rem, 9vh, 6rem);
        }
        .hero-bg { position: absolute; inset: -6% 0; z-index: 0; will-change: transform; }
        .hero-bg img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: 50% 36%;
          filter: saturate(1.05) contrast(1.06) brightness(0.62) sepia(0.18);
        }
        /* warm scrim — photo stays legible AS a barbershop, type reads on top */
        .hero-scrim {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(180deg, rgba(16,10,6,0.55) 0%, rgba(16,10,6,0.35) 38%, rgba(16,10,6,0.92) 100%),
            linear-gradient(90deg, rgba(16,10,6,0.9) 0%, rgba(16,10,6,0.5) 52%, rgba(16,10,6,0.18) 100%),
            radial-gradient(90% 60% at 78% 30%, rgba(210,154,63,0.14), transparent 60%);
        }
        .hero-inner { position: relative; z-index: 3; width: 100%; }
        .hero-kicker { margin-bottom: clamp(1.2rem, 3.5vw, 1.8rem); }

        /* ---- THE BARBER POLE ---- */
        .hero-pole {
          position: absolute; z-index: 2;
          left: clamp(0.7rem, 4vw, 3.4rem); top: 0; bottom: 0;
          width: clamp(16px, 3.4vw, 26px);
          display: flex; flex-direction: column; align-items: stretch;
          justify-content: center;
          pointer-events: none;
          filter: drop-shadow(0 0 22px rgba(0,0,0,0.5));
        }
        .pole-glass {
          position: relative; flex: 0 1 clamp(220px, 46vh, 460px);
          border-radius: 999px; overflow: hidden;
          background: linear-gradient(90deg, rgba(0,0,0,0.35), transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%, rgba(0,0,0,0.35)),
            #f4ead7;
          box-shadow: inset 0 0 8px rgba(0,0,0,0.4);
          border: 1px solid rgba(0,0,0,0.25);
        }
        .pole-stripes {
          position: absolute; inset: -60% 0;
          background: repeating-linear-gradient(
            48deg,
            var(--pole-red) 0 14px,
            var(--pole-cream) 14px 26px,
            #1f160e 26px 30px,
            var(--pole-cream) 30px 42px
          );
          animation: poleSpin 5.5s linear infinite;
        }
        @keyframes poleSpin {
          from { transform: translateY(0); }
          to { transform: translateY(-42px); }
        }
        .pole-cap {
          flex: 0 0 18px; border-radius: 5px;
          background: linear-gradient(180deg, var(--brass-hi), var(--brass) 50%, var(--brass-deep));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 6px rgba(0,0,0,0.4);
          margin-inline: -2px;
        }
        .pole-cap--top { margin-bottom: 4px; }
        .pole-cap--bottom { margin-top: 4px; }

        /* ---- THE LOCKUP ---- */
        .hero-lockup { margin: 0; display: flex; flex-direction: column; gap: 0.4rem; }
        .hero-line1 {
          font-size: clamp(1.6rem, 6vw, 3.1rem);
          letter-spacing: 0.01em; color: var(--ink);
          line-height: 0.95;
        }
        .hero-plate { display: inline-flex; width: fit-content; }
        .hero-word {
          display: block;
          font-size: clamp(3.8rem, 17vw, 13rem);
          line-height: 0.8; letter-spacing: 0.005em; text-transform: uppercase;
          color: transparent;
          background: linear-gradient(176deg, var(--brass-hi) 0%, var(--brass) 42%, var(--brass-deep) 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 30px rgba(210,154,63,0.16);
          position: relative;
        }
        /* brass sheen sweeping the wordmark */
        .hero-plate::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(100deg, transparent 42%, rgba(255,245,220,0.6) 50%, transparent 58%);
          mix-blend-mode: screen; filter: blur(2px);
          transform: translateX(-130%);
          animation: heroSheen 6s cubic-bezier(0.7,0,0.3,1) infinite 1.2s;
          -webkit-background-clip: border-box;
        }
        @keyframes heroSheen {
          0% { transform: translateX(-130%); }
          60%, 100% { transform: translateX(130%); }
        }

        .hero-sub {
          color: var(--ink-soft); max-width: 36rem;
          font-size: clamp(1rem, 2.6vw, 1.22rem);
          margin: clamp(1.6rem, 4.5vw, 2.4rem) 0 0;
        }
        .hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.8rem; margin-top: 2.1rem; }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-soft); border: 1px solid var(--brass-border);
          border-radius: 999px; padding: 0.55rem 1rem; min-height: 44px;
        }
        .hp-star { color: var(--brass); }
        .hero-scrollcue {
          position: absolute; right: clamp(1.1rem,5vw,3rem); bottom: clamp(3rem,8vh,5rem);
          z-index: 3; font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--muted); writing-mode: vertical-rl; display: none;
        }
        /* keep the pole clear of the text on phones by indenting the content */
        @media (max-width: 560px) {
          .hero-inner { padding-left: clamp(2.4rem, 11vw, 3.4rem); }
        }
        @media (min-width: 980px) { .hero-scrollcue { display: inline-block; } }
        @media (prefers-reduced-motion: reduce) {
          .hero-plate::after { display: none; }
          .pole-stripes { animation: none; }
          .hero-bg { transform: scale(1.06) !important; }
        }
      `}</style>
    </section>
  );
}
