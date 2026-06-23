"use client";

import { BOOKSY, PHONE_TEL } from "./data";

export default function MobileBook() {
  return (
    <div
      className="mobilebook"
      role="region"
      aria-label="Quick actions"
    >
      <a href={`tel:${PHONE_TEL}`} className="mb-call" aria-label="Call the shop">
        Call
      </a>
      <a
        href={BOOKSY}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-book"
      >
        Book the Chair
      </a>
      <style>{`
        .mobilebook {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          z-index: 70;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0;
          background: rgba(16,10,6,0.92);
          backdrop-filter: blur(14px);
          border-top: 1px solid var(--brass-border);
          padding: 0.6rem;
          padding-bottom: calc(0.6rem + env(safe-area-inset-bottom));
        }
        .mobilebook a {
          min-height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: 2px;
        }
        .mb-call { color: var(--ink); border: 1px solid var(--brass-border); margin-right: 0.5rem; }
        .mb-book {
          background: linear-gradient(180deg, var(--brass-hi), var(--brass) 55%, var(--brass-deep));
          color: var(--void); font-weight: 700;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.35);
        }
        @media (min-width: 880px) { .mobilebook { display: none; } }
      `}</style>
    </div>
  );
}
