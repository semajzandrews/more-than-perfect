import Reveal from "./Reveal";

const CUTS = [
  {
    n: "01",
    name: "Fades and tapers",
    d: "Skin, low, mid or high. Blended up the side until the line disappears.",
  },
  {
    n: "02",
    name: "Edge ups",
    d: "A sharp front line and clean temples. The first thing anyone notices.",
  },
  {
    n: "03",
    name: "Hot towel shaves",
    d: "Straight razor, hot towel, no rush. You walk out smooth.",
  },
  {
    n: "04",
    name: "Afros and curls",
    d: "Shaped with scissor and comb, kept full and kept yours.",
  },
  {
    n: "05",
    name: "Kids' cuts",
    d: "First chair or hundredth, we keep the little ones easy.",
  },
  {
    n: "06",
    name: "Women's cuts",
    d: "Clean lines and honest shapes for everyone who sits down.",
  },
];

export default function Services() {
  return (
    <section id="chair" className="section chair">
      <div className="wrap chair-grid">
        <div className="chair-left">
          <Reveal>
            <span className="kicker">The Chair · What we cut</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display chair-title">
              The menu is short. The standard is not.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="chair-intro">
              Walk in or book ahead. The same hands cut a skin fade, a hot towel
              shave and a six year old's first haircut, and every one of them
              leaves at five stars.
            </p>
          </Reveal>

          <ul className="cut-list">
            {CUTS.map((c, i) => (
              <Reveal as="li" key={c.n} delay={i * 60} className="cut-row">
                <span className="cut-n mono">{c.n}</span>
                <span className="cut-name">{c.name}</span>
                <span className="cut-d">{c.d}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={120} className="chair-photo-wrap">
          <figure className="framed tint chair-photo">
            <img
              src="/images/fade-detail.jpg"
              width={900}
              height={1200}
              alt="Clippers blending a fade clean into the skin at the nape"
              loading="lazy"
            />
            <figcaption className="photo-tag mono">
              The fade · blended to skin
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <style>{`
        .chair-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 5vw, 3.4rem);
        }
        .chair-title {
          font-size: clamp(2rem, 5.5vw, 3.4rem);
          margin: 1.2rem 0 0;
          max-width: 18ch;
        }
        .chair-intro {
          color: var(--ink-soft);
          margin: 1.4rem 0 2.2rem;
          max-width: 38rem;
        }
        .cut-list { list-style: none; margin: 0; padding: 0; }
        .cut-row {
          display: grid;
          grid-template-columns: auto 1fr;
          column-gap: 1rem;
          row-gap: 0.3rem;
          align-items: baseline;
          padding: 1.2rem 0;
          border-top: 1px solid var(--border);
        }
        .cut-row:last-child { border-bottom: 1px solid var(--border); }
        .cut-n { color: var(--brass); font-size: 0.78rem; }
        .cut-name {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.15rem, 3.6vw, 1.5rem);
          color: var(--ink);
        }
        .cut-d {
          grid-column: 2;
          color: var(--muted);
          font-size: 0.95rem;
          max-width: 42ch;
        }
        .chair-photo { aspect-ratio: 3 / 4; border-radius: 3px; height: 100%; }
        @media (min-width: 980px) {
          .chair-grid { grid-template-columns: 1.2fr 0.8fr; align-items: start; }
          .chair-photo-wrap { position: sticky; top: 100px; }
        }
      `}</style>
    </section>
  );
}
