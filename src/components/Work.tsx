import Reveal from "./Reveal";

/* Real community-accurate photography for South Orange (a Black and Caribbean
   clientele plus the college-town mix). Stock for now, flagged for swap with
   the owner's own shop photos collected on the visit. Hero + fade-detail are
   used elsewhere; every tile here is distinct and matches its label. */
const SHOTS = [
  {
    src: "/images/interior.jpg",
    alt: "A barber cutting a client inside More Than Perfect, mirrors and chairs down the wall",
    tag: "The shop",
    span: "tall",
  },
  {
    src: "/images/chair.jpg",
    alt: "A client relaxed in the chair mid cut",
    tag: "In the chair",
    span: "wide",
  },
  {
    src: "/images/afro.jpg",
    alt: "Scissor and comb shaping a client's curls",
    tag: "Curls and afros",
    span: "",
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
        .work-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(0.7rem, 2vw, 1.1rem);
        }
        .work-fig {
          width: 100%;
          height: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 3px;
        }
        .work-cell.tall .work-fig { aspect-ratio: 3 / 4; }
        .work-cell.wide .work-fig { aspect-ratio: 3 / 4; }
        @media (min-width: 760px) {
          .work-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 1fr;
          }
          .work-cell.tall { grid-row: span 2; }
          .work-cell.tall .work-fig { aspect-ratio: auto; }
          .work-cell.wide { grid-column: span 2; }
          .work-cell.wide .work-fig { aspect-ratio: 16 / 10; }
          .work-cell .work-fig { aspect-ratio: 1 / 1; }
        }
      `}</style>
    </section>
  );
}
