import Reveal from "./Reveal";
import {
  ADDRESS,
  CITY_STATE_ZIP,
  PHONE_DISPLAY,
  PHONE_TEL,
  HOURS,
  BOOKSY,
  MAPS_EMBED,
} from "./data";

export default function Visit() {
  return (
    <section id="visit" className="section visit">
      <div className="wrap visit-grid">
        <div className="visit-info">
          <Reveal>
            <span className="kicker">Visit · South Orange Ave</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display visit-title">Open from six. Seven days.</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="visit-sub">
              On South Orange Avenue, a walk from the train and the village. Book
              the chair on Booksy or call and we will get you in.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="visit-block">
              <span className="vb-label mono">Where</span>
              <a
                className="vb-value"
                href="https://www.google.com/maps?q=131+South+Orange+Ave+South+Orange+NJ+07079"
                target="_blank"
                rel="noopener noreferrer"
              >
                {ADDRESS}
                <br />
                {CITY_STATE_ZIP}
              </a>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <div className="visit-block">
              <span className="vb-label mono">Call</span>
              <a className="vb-value" href={`tel:${PHONE_TEL}`}>
                {PHONE_DISPLAY}
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="visit-block">
              <span className="vb-label mono">Hours</span>
              <ul className="hours">
                {HOURS.map((h) => (
                  <li key={h.d}>
                    <span>{h.d}</span>
                    <span className="mono">{h.h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={380}>
            <a
              href={BOOKSY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary visit-book"
            >
              Book the Chair
            </a>
          </Reveal>
        </div>

        <Reveal delay={160} className="visit-map-wrap">
          <div className="framed visit-map">
            <iframe
              className="map-embed"
              src={MAPS_EMBED}
              title="Map to More Than Perfect, 131 South Orange Ave"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>

      <style>{`
        .visit { border-top: 1px solid var(--border); }
        .visit-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: clamp(2rem, 5vw, 3.4rem);
          align-items: start;
        }
        .visit-title { font-size: clamp(2rem, 6vw, 3.4rem); margin: 1.2rem 0 0; }
        .visit-sub { color: var(--ink-soft); margin: 1.3rem 0 2.2rem; max-width: 34rem; }
        .visit-block {
          display: grid;
          grid-template-columns: 5.5rem minmax(0, 1fr);
          gap: 1rem;
          padding: 1.1rem 0;
          border-top: 1px solid var(--border);
          align-items: start;
        }
        .vb-label {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          padding-top: 0.2rem;
        }
        .vb-value {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 1.15rem;
          color: var(--ink);
          line-height: 1.4;
        }
        a.vb-value:hover { color: var(--brass-hi); }
        .hours { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.55rem; }
        .hours li {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          color: var(--ink-soft);
          font-size: 0.98rem;
        }
        .hours li span.mono { color: var(--ink); font-size: 0.85rem; }
        .visit-book { margin-top: 1.8rem; }
        .visit-map { aspect-ratio: 4 / 3; width: 100%; border-radius: 3px; min-height: 300px; }
        @media (min-width: 980px) {
          .visit-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
          .visit-map { aspect-ratio: auto; height: 100%; min-height: 460px; }
        }
      `}</style>
    </section>
  );
}
