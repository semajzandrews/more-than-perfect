import { RATING, REVIEW_COUNT } from "./data";
import Reveal from "./Reveal";

/* THE CRAFT — a full-bleed cinematic photo band (the hot towel straight razor,
   warm-lit, community true) carrying an oversized statement. Replaces the old
   video band: no community-true clipper clip was confirmable without a
   wrong-cast violation, so the strong verified photography leads instead
   (deliberate medium choice, BUILD_RULES §7/§11). Breaks the grid rhythm. */
export default function TheFade() {
  return (
    <section className="craft" aria-label="The craft">
      <div className="craft-photo" aria-hidden="true">
        <img
          src="/images/hero.jpg"
          width={1200}
          height={1650}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="craft-scrim" aria-hidden="true" />

      <div className="wrap craft-inner">
        <Reveal>
          <span className="kicker">The Craft · A steady hand</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display craft-title">
            Every line, <span className="hl">exact</span>.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="craft-sub">
            Skin fades, tapers, line ups and the hot towel shave, blended by the
            same steady hand until the line disappears. That is how a record
            stays perfect.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="craft-stat mono">
            <span className="cs-num">{RATING}</span>
            <span className="cs-of">across {REVIEW_COUNT} cuts</span>
          </div>
        </Reveal>
      </div>

      <style>{`
        .craft {
          position: relative; z-index: 2;
          min-height: 82svh; display: flex; align-items: center;
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .craft-photo { position: absolute; inset: 0; z-index: 0; }
        .craft-photo img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: 50% 38%;
          filter: saturate(1.06) contrast(1.05) brightness(0.7) sepia(0.16);
        }
        .craft-scrim {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(90deg, rgba(16,10,6,0.95) 0%, rgba(16,10,6,0.55) 48%, rgba(16,10,6,0.15) 100%),
            linear-gradient(180deg, rgba(16,10,6,0.55) 0%, transparent 32%, rgba(16,10,6,0.82) 100%),
            radial-gradient(80% 70% at 14% 50%, rgba(210,154,63,0.12), transparent 60%);
        }
        .craft-inner { position: relative; z-index: 2; width: 100%; padding-block: clamp(3rem, 8vw, 5rem); }
        .craft-title {
          font-size: clamp(2.8rem, 11vw, 7rem);
          margin: 1.1rem 0 0; text-transform: uppercase;
          text-shadow: 0 2px 50px rgba(0,0,0,0.5);
        }
        .craft-sub { color: var(--ink-soft); max-width: 32rem; margin: 1.5rem 0 0; font-size: clamp(1rem, 2.6vw, 1.15rem); }
        .craft-stat { display: flex; align-items: baseline; gap: 0.8rem; margin-top: 2.2rem; }
        .cs-num {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(2.4rem, 7vw, 3.4rem); color: var(--brass-hi);
        }
        .cs-of { font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-soft); }
      `}</style>
    </section>
  );
}
