# More Than Perfect — Signature & Arsenal Manifest

## Redesign (06-23-2026) — "The Brass Standard"
Owner's verdict on v1: the hero "doesn't scream barbershop" and the "dark and
light blue contrast seems basic." Two fixes shipped:

1. **Hero now reads BARBERSHOP on sight.** Full-bleed photo of the real shop (a
   Black barber mid-cut, mirror lights, chairs down the wall) with an
   unmistakable spinning barber-pole spine down the left edge (red / cream /
   brass stripes, brass caps) and the name struck in bold brass display type. No
   ambiguity in the first viewport.
2. **Palette replaced.** Out: navy + ice-blue. In: deep espresso leather ground,
   real brass / amber gold as the signature chroma, bone-cream type, a single
   barber-pole red as the secondary. Warm, confident, premium, masculine.
   Nothing blue anywhere on the page.

## Deep-thought asset decision (BUILD_RULES §11)
- **Primary medium: community-true photography.** Barbershop is a trust/local
  vertical (Ramos template: realness forward). Six verified Black-men/boys
  getting-cut photos carry the page.
- **Video considered: yes. Used: no.** The only video on hand showed a white
  client + tattooed barber (wrong cast for South Orange's Black/Latino
  clientele) and no community-true clipper-fade clip was confirmable without a
  wrong-cast violation (no Pexels key; blind Mixkit IDs returned non-barbershop
  content). Strong verified photography leads instead, per the prior MTP lesson.
- **Clientele:** South Orange / Orange NJ skews Black and Latino. Every person
  shown is a Black man or boy getting a fade / line up / shave. The white-client
  video + poster from v1 were removed.

## Arsenal Manifest
- Primary medium: photography — barbershop is realness-forward; the real shop +
  real cuts make the page read as its category and as its community.
- Video considered: yes — used: no — reason: no community-true clip confirmable
  without a wrong-cast violation.
- Media used (each appears once, no repeats):
  - photo `interior.jpg` — barber mid-cut, mirror lights, shop energy — HERO
    full-bleed (the strongest "this is a barbershop" frame) + OG image source.
  - photo `hero.jpg` — hot towel straight-razor shave, warm rim light — THE CRAFT
    full-bleed band statement.
  - photo `fade-detail.jpg` — clippers blending a taper into skin — Services
    sticky photo.
  - photo `chair.jpg` — client front-facing in the chair mid-cut — Work gallery
    (tall anchor).
  - photo `afro.jpg` — scissor + comb shaping curls — Work gallery.
  - photo `kids.jpg` — boy getting a clean clipper cut by the window — Work
    gallery.
- Signature: **THE RECORD** — 164 brass bars (one per five-star Booksy review)
  ramped into a fade profile; a clipper-light follows the cursor/finger, lifting
  and brightening the lines it passes (idle self-sweep when untouched). Plus the
  hero **barber-pole spine** as the category cue. Both visible-by-default,
  reduced-motion safe.
- Motion / technique: pointer-driven canvas-free instrument (rAF scaleY/opacity
  per bar) for The Record; CSS keyframe `poleSpin` for the pole; brass sheen
  sweep on the wordmark; Lenis smooth scroll; pure-CSS armed reveals.
- Custom icons: bespoke brass barber-pole favicon (`icon.svg`), single source,
  redrawn — license: original.
- Fontshare pairing: **Tanker** (display, heavy condensed barbershop signage) +
  **General Sans** (body). Differs from v1's Clash Display + Switzer.
- GPU-verified: n/a (no WebGL/shader). Verified in headless Chromium at 1280 +
  390; 390px scrollWidth = 390 (no document overflow); zero console errors;
  production build passes.

## Verified recon facts (unchanged, sources in data.ts)
- Booksy listing 790040 · (973) 763-5921 · 131 South Orange Ave, South Orange NJ
  07079 · 5.0 across 164 reviews · open early, seven days.
- Booking platform: **Booksy**. Upsell gaps: no AI phone receptionist; Booksy is
  the only booking surface (no on-site deposits / Stripe).
