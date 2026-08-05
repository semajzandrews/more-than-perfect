"use client";

import { useEffect, useRef, useState } from "react";
import { formatPhone, telHref, smsHref } from "@/lib/phone";
import { PHONE_DIGITS, SMS_BODY, SMS_HINT } from "./data";

/**
 * Call OR Text. Half this shop's clientele will never dial a barber — they want
 * to send the photo of the cut and ask "can you do this". A dial-only CTA loses
 * every one of them, so the number is a chooser.
 *
 * Treatment is this build's own: a brass nameplate trigger, and a panel that
 * reads like the shop's price board — bone card, barber-pole stripe down the
 * left edge, hairline rule between the two choices, mono uppercase labels.
 * Square 2px corners throughout, matching .btn.
 */

type Props = {
  variant?: "plate" | "board" | "bar";
  className?: string;
  label?: string;
};

const stroke = {
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

function HandsetIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" {...stroke} aria-hidden="true">
      <path d="M7 3H4L3 6c0 8 7 15 15 15l3-1v-3l-4-2-2 2a17 17 0 0 1-6-6l2-2-2-4Z" />
    </svg>
  );
}

function BubbleIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" {...stroke} aria-hidden="true">
      <path d="M3 4h18v12H8l-5 4V4Z" />
      <path d="M7 9h10M7 12h6" />
    </svg>
  );
}

function TickIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" {...stroke} aria-hidden="true">
      <path d="M8 4l8 8-8 8" />
    </svg>
  );
}

export default function CallOrText({ variant = "plate", className, label }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pretty = formatPhone(PHONE_DIGITS);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* board: both choices laid out flat, for the Visit column where there is room
     and hiding the choice behind a tap would only cost a click. */
  if (variant === "board") {
    return (
      <div className={`cot cot-board ${className ?? ""}`}>
        <a className="cb-row" href={telHref(PHONE_DIGITS)}>
          <HandsetIcon size={16} />
          <span className="cb-copy">
            <strong>Call the shop</strong>
            <em>{pretty} · someone picks up from six</em>
          </span>
          <TickIcon />
        </a>
        <a className="cb-row" href={smsHref(PHONE_DIGITS, SMS_BODY)}>
          <BubbleIcon size={16} />
          <span className="cb-copy">
            <strong>Text the shop</strong>
            <em>{pretty} · {SMS_HINT.toLowerCase()}</em>
          </span>
          <TickIcon />
        </a>
        <style>{boardCss}</style>
      </div>
    );
  }

  const triggerClass =
    variant === "bar" ? "cot-trigger cot-trigger-bar" : "cot-trigger cot-trigger-plate";

  return (
    <div className={`cot ${className ?? ""}`} ref={rootRef} data-variant={variant}>
      <button
        type="button"
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Call or text More Than Perfect, ${pretty}`}
        onClick={() => setOpen((v) => !v)}
      >
        <HandsetIcon />
        <span className="cot-label">{label ?? pretty}</span>
      </button>

      <div className="cot-menu" data-open={open} role="menu">
        <a href={telHref(PHONE_DIGITS)} role="menuitem" onClick={() => setOpen(false)}>
          <HandsetIcon size={16} />
          <span>
            <strong>Call</strong>
            <em>Straight to the chair</em>
          </span>
          <TickIcon />
        </a>
        <a href={smsHref(PHONE_DIGITS, SMS_BODY)} role="menuitem" onClick={() => setOpen(false)}>
          <BubbleIcon size={16} />
          <span>
            <strong>Text</strong>
            <em>{SMS_HINT}</em>
          </span>
          <TickIcon />
        </a>
      </div>

      <style>{menuCss}</style>
    </div>
  );
}

/* NOT `.wrap` — that is this build's global page container (max-width + padding)
   and a same-named local class still matches it, throwing the panel off-screen. */
const menuCss = `
  .cot { position: relative; }

  .cot-trigger {
    display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem;
    min-height: 50px; padding: 0 1.1rem;
    border-radius: 2px; border: 1px solid var(--brass-border);
    font-family: var(--font-mono); font-size: 0.78rem;
    letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer;
    color: var(--ink); background: transparent;
    transition: color .25s ease, border-color .25s ease, background .25s ease;
  }
  .cot-trigger:hover { border-color: var(--brass); color: var(--brass-hi); }
  .cot-trigger[aria-expanded="true"] { border-color: var(--brass); color: var(--brass-hi); }
  .cot-trigger-bar {
    width: 100%; min-height: 52px; border-radius: 2px;
    white-space: nowrap; font-size: 0.72rem; letter-spacing: 0.1em; gap: 0.4rem;
    padding: 0 0.7rem;
  }
  .cot-label { display: none; }
  @media (min-width: 560px) {
    .cot-label { display: inline; }
    .cot-trigger { padding: 0 1.5rem; }
  }
  .cot[data-variant="bar"] .cot-label { display: inline; }

  /* the price-board panel: bone card, barber-pole stripe down its left edge */
  .cot-menu {
    position: absolute; top: calc(100% + 10px); right: 0; z-index: 90;
    width: max-content; min-width: 246px;
    background: #17100a;
    border: 1px solid var(--brass-border);
    border-left: 3px solid var(--pole-red);
    box-shadow: 0 18px 44px rgba(0,0,0,0.55);
    display: grid;
    opacity: 0; transform: translateY(-6px) ; pointer-events: none;
    transition: opacity .24s ease, transform .24s ease;
  }
  .cot[data-variant="bar"] .cot-menu { top: auto; bottom: calc(100% + 10px); left: 0; right: auto; }
  .cot-menu[data-open="true"] { opacity: 1; transform: none; pointer-events: auto; }
  .cot-menu a {
    display: grid; grid-template-columns: auto 1fr auto; align-items: center;
    gap: 0.8rem; padding: 0.85rem 1rem; color: var(--ink);
    transition: background .25s ease, color .25s ease;
  }
  .cot-menu a + a { border-top: 1px solid rgba(210,154,63,0.18); }
  .cot-menu a:hover { background: rgba(210,154,63,0.1); color: var(--brass-hi); }
  .cot-menu strong {
    display: block; font-family: var(--font-mono); font-size: 0.72rem;
    letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700;
  }
  .cot-menu em {
    display: block; font-style: normal; font-size: 0.74rem;
    color: var(--ink-soft); margin-top: 3px; letter-spacing: 0.01em;
  }
`;

const boardCss = `
  .cot-board { display: grid; gap: 0; border: 1px solid var(--brass-border); border-radius: 2px; }
  .cot-board .cb-row {
    display: grid; grid-template-columns: auto 1fr auto; align-items: center;
    gap: 0.9rem; padding: 0.95rem 1.05rem; color: var(--ink);
    transition: background .25s ease, color .25s ease;
  }
  .cot-board .cb-row + .cb-row { border-top: 1px solid rgba(210,154,63,0.18); }
  .cot-board .cb-row:hover { background: rgba(210,154,63,0.1); color: var(--brass-hi); }
  .cot-board strong {
    display: block; font-family: var(--font-mono); font-size: 0.76rem;
    letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700;
  }
  .cot-board em {
    display: block; font-style: normal; font-size: 0.78rem;
    color: var(--ink-soft); margin-top: 4px;
  }
`;
