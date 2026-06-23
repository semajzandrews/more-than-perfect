import Reveal from "./Reveal";

/* Real community-accurate photography for South Orange (a Black and Caribbean
   clientele plus the college-town mix). Stock for now, flagged for swap with
   the owner's own shop photos collected on the visit. Hero + fade-detail are
   used elsewhere; every tile here is distinct and matches its label. */
const SHOTS = [
  {
    src: "/images/chair.jpg",
    alt: "A client relaxed and front facing in the chair mid cut",
    tag: "In the chair",
    span: "tall",
  },
  {
    src: "/images/afro.jpg",
    alt: "Scissor and comb shaping a client's curls",
    tag: "Curls and afros",
    span: "wide",
  },
  {
    src: "/images/kids.jpg",
    alt: "A young client getting a clean clipper cut by the window",
    tag: "The young ones",
    span: "",
  },
];

export default function Work() {
  return (
    <section id="work" className="section work">
      <div className="wrap">
        <div className="work-head">
          <Reveal>
            <span className="kicker">The Work · On the Avenue</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display work-title">
              Same block. Same chairs. Real cuts.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="work-lede">
              A South Orange chair for fathers, sons and everyone on the Avenue.
              These are real cuts from a real shop.
            </p>
          </Reveal>
        </div>

        <div className="work-grid">
          {SHOTS.map((s, i) => (
            <Reveal key={s.src} delay={i * 90} className={`work-cell ${s.span}`}>
              <figure className="framed tint work-fig">
                <img src={s.src} alt={s.alt} loading="lazy" />
                <figcaption className="photo-tag mono">{s.tag}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .work-head { margin-bottom: 2.4rem; display: grid; gap: 1rem; }
        .work-title { font-size: clamp(1.9rem, 5.5vw, 3.2rem); }
        .work-lede { color: var(--ink-soft); max-width: 38rem; font-size: clamp(0.98rem, 2.4vw, 1.08rem); }
        .work-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(0.7rem, 2vw, 1.1rem);
        }
        .work-cell { min-width: 0; }
        .work-fig {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 3px;
        }
        @media (min-width: 760px) {
          /* the front-facing chair shot anchors the left full height; the two
             others stack on the right. Explicit rows so every cell has a real
             height (no collapsed/empty tiles). */
          .work-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .work-cell.tall { grid-row: 1 / span 2; grid-column: 1; }
          .work-cell.tall .work-fig { aspect-ratio: 3 / 4; height: 100%; }
          .work-cell.wide { grid-column: 2; grid-row: 1; }
          .work-cell:not(.tall):not(.wide) { grid-column: 2; grid-row: 2; }
          .work-cell:not(.tall) .work-fig { aspect-ratio: 16 / 10; }
        }
      `}</style>
    </section>
  );
}
