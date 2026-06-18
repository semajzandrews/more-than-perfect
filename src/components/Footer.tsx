import {
  ADDRESS,
  CITY_STATE_ZIP,
  PHONE_DISPLAY,
  PHONE_TEL,
  BOOKSY,
  RATING,
  REVIEW_COUNT,
} from "./data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <span className="wordmark">
            More Than Perfect<span className="dot">.</span>
          </span>
          <p className="footer-line mono">
            {RATING} ★ across {REVIEW_COUNT} cuts on South Orange Avenue.
          </p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <span className="fc-label mono">Find us</span>
            <a
              href="https://www.google.com/maps?q=131+South+Orange+Ave+South+Orange+NJ+07079"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ADDRESS}
              <br />
              {CITY_STATE_ZIP}
            </a>
          </div>
          <div className="footer-col">
            <span className="fc-label mono">Reach us</span>
            <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            <a href={BOOKSY} target="_blank" rel="noopener noreferrer">
              Book on Booksy
            </a>
          </div>
        </div>
      </div>

      <div className="wrap footer-base">
        <span className="mono">More Than Perfect Barber Shop</span>
        <span className="mono">South Orange, New Jersey</span>
      </div>

      <style>{`
        .footer {
          position: relative;
          z-index: 2;
          border-top: 1px solid var(--border);
          background: var(--void);
          padding: clamp(3rem, 7vw, 5rem) 0 calc(2rem + env(safe-area-inset-bottom));
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.4rem;
        }
        .footer-line { color: var(--accent); margin: 0.9rem 0 0; font-size: 0.78rem; letter-spacing: 0.1em; }
        .footer-cols { display: flex; flex-wrap: wrap; gap: 2.6rem; }
        .footer-col { display: grid; gap: 0.5rem; align-content: start; }
        .fc-label {
          font-size: 0.66rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.2rem;
        }
        .footer-col a { color: var(--ink-soft); font-size: 0.98rem; line-height: 1.45; }
        .footer-col a:hover { color: var(--accent-hi); }
        .footer-base {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 3rem;
          padding-top: 1.4rem;
          border-top: 1px solid var(--border);
          color: var(--muted);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        @media (min-width: 760px) {
          .footer-inner { grid-template-columns: 1fr auto; align-items: start; }
        }
      `}</style>
    </footer>
  );
}
