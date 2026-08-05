"use client";

/**
 * More Than Perfect — book the chair, direct.
 *
 * SPINE (identical across every build): when -> service -> who -> confirm
 *
 * SKIN (the eleventh archetype, and the only CALENDAR-FIRST one):
 *   - it opens on a real month grid with month navigation. Every other build
 *     leads with a service list or a horizontal strip of the next few days; this
 *     one leads with the calendar and works backwards, because a shop open
 *     seven days a week has no "which days are you open" problem to solve — the
 *     only question is which square you want.
 *
 * THE HOOK — their hours are the differentiator. data.ts carries verified hours:
 * 6:00 AM to 8:00 PM, seven days. A barbershop you can sit in before work is
 * rare, so the time picker bands the day and labels the early band plainly.
 * Seven-day opening also means no greyed-out days, unlike the other builds.
 *
 * WHY: every Book CTA on this site hands the client to Booksy, which charges the
 * shop per booking and owns the client relationship.
 *
 * data.ts says "Verified facts only. No fabricated names, prices, or socials."
 * No prices are published, so none are shown or invented.
 *
 * Static export: nothing is charged.
 */

import { useEffect, useMemo, useState } from "react";

import { formatAsYouType, isCompletePhone, telHref } from "@/lib/phone";
import { PHONE_DISPLAY, PHONE_DIGITS } from "./data";


/* The mask and the completeness gate come from the one phone module, so the
   number a visitor types back matches the one the site shows them. This file
   used to carry its own copy — exactly the drift the doctrine exists to stop. */

const CUTS = [
  "Fades and tapers", "Edge ups", "Hot towel shaves",
  "Afros and curls", "Kids' cuts", "Women's cuts",
];

/* Verified: 6:00 AM – 8:00 PM, seven days. */
const OPEN_HOUR = 6, CLOSE_HOUR = 20, SLOT_MIN = 30;
const BANDS = [
  { key: "early", label: "Before work", from: 6, to: 9 },
  { key: "day", label: "Daytime", from: 9, to: 16 },
  { key: "evening", label: "After work", from: 16, to: 20 },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["S","M","T","W","T","F","S"];

function slotsFor(dateKey: string, band: string) {
  const b = BANDS.find((x) => x.key === band);
  if (!b) return [];
  const out: string[] = [];
  const now = new Date();
  const today = dateKey === now.toISOString().slice(0, 10);
  for (let h = Math.max(b.from, OPEN_HOUR); h < Math.min(b.to, CLOSE_HOUR); h++) {
    for (let m = 0; m < 60; m += SLOT_MIN) {
      if (today && (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes()))) continue;
      const t = new Date(); t.setHours(h, m, 0, 0);
      out.push(t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
    }
  }
  return out;
}
const pretty = (k: string) =>
  new Date(k + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

export default function ChairCalendar() {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [dateKey, setDateKey] = useState("");
  const [band, setBand] = useState("");
  const [time, setTime] = useState("");
  const [cut, setCut] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const todayKey = new Date().toISOString().slice(0, 10);
  const S = useMemo(() => (dateKey && band ? slotsFor(dateKey, band) : []), [dateKey, band]);

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("mtp:book", on as EventListener);
    return () => window.removeEventListener("mtp:book", on as EventListener);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* month grid */
  const grid = useMemo(() => {
    const first = new Date(cursor.y, cursor.m, 1);
    const lead = first.getDay();
    const count = new Date(cursor.y, cursor.m + 1, 0).getDate();
    const cells: ({ key: string; day: number; past: boolean } | null)[] = [];
    for (let i = 0; i < lead; i++) cells.push(null);
    for (let d = 1; d <= count; d++) {
      const dt = new Date(cursor.y, cursor.m, d);
      const key = `${cursor.y}-${String(cursor.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ key, day: d, past: key < todayKey });
    }
    return cells;
  }, [cursor, todayKey]);

  const ready = !!dateKey && !!time && !!cut && !!name.trim() && isCompletePhone(phone);
  function reset() { setDateKey(""); setBand(""); setTime(""); setCut(""); setName(""); setPhone(""); setDone(false); }

  const cell = (on: boolean, past: boolean) => ({
    aspectRatio: "1", display: "grid", placeItems: "center",
    border: `1px solid ${on ? "var(--brass)" : "transparent"}`,
    background: on ? "var(--brass)" : "transparent",
    color: on ? "var(--void)" : past ? "rgba(140,122,98,0.4)" : "var(--ink)",
    fontSize: 14, cursor: past ? "not-allowed" : "pointer",
    borderRadius: 2, transition: "all .15s ease",
  });
  const chip = (on: boolean) => ({
    border: `1px solid ${on ? "var(--brass)" : "rgba(246,237,224,0.16)"}`,
    background: on ? "var(--brass)" : "transparent",
    color: on ? "var(--void)" : "var(--ink)",
    padding: "9px 15px", fontSize: 13, cursor: "pointer", transition: "all .18s ease",
  });

  return (
    <>
      <div onClick={() => setOpen(false)} aria-hidden={!open}
        style={{ position: "fixed", inset: 0, zIndex: 190, background: "rgba(16,10,6,0.76)", backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .3s ease" }} />

      <div role="dialog" aria-modal="true" aria-label="Book the chair"
        style={{ position: "fixed", inset: 0, zIndex: 200, display: "grid", placeItems: "center", padding: 16,
          pointerEvents: open ? "auto" : "none", opacity: open ? 1 : 0, transition: "opacity .3s ease" }}>
        <div style={{
          width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto",
          background: "var(--bg)", border: "1px solid rgba(246,237,224,0.14)",
          transform: open ? "translateY(0)" : "translateY(10px)",
          transition: "transform .4s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "0 40px 100px -30px rgba(0,0,0,0.85)",
        }}>
          <header style={{ padding: "20px 22px 16px", borderBottom: "1px solid rgba(246,237,224,0.12)", display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 10.5, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--brass)" }}>
                {done ? "Chair held" : "Open 6 AM – 8 PM · seven days"}
              </p>
              <h2 style={{ fontSize: "1.55rem", color: "var(--ink)", marginTop: 6, lineHeight: 1.1 }}>
                {done ? `See you, ${name.split(" ")[0]}.` : "Pick your day."}
              </h2>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"
              style={{ width: 34, height: 34, display: "grid", placeItems: "center", border: "1px solid rgba(246,237,224,0.18)", color: "var(--ink)", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </header>

          <div style={{ padding: 22 }}>
            {done ? (
              <div>
                <dl style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[["Cut", cut], ["Day", pretty(dateKey)], ["Time", time]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 14.5, color: "var(--ink)" }}>
                      <dt style={{ color: "var(--muted)" }}>{k}</dt><dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p style={{ marginTop: 18, fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                  We&rsquo;ll text {phone} to confirm. Questions, call{" "}
                  <a href={telHref(PHONE_DIGITS)} style={{ color: "var(--brass-hi)" }}>{PHONE_DISPLAY}</a>.
                </p>
                <p style={{ marginTop: 16, display: "inline-block", padding: "8px 12px", border: "1px solid rgba(246,237,224,0.14)", fontSize: 11, color: "var(--muted)" }}>
                  Demo booking — nothing was charged.
                </p>
                <button onClick={reset} style={{ display: "block", marginTop: 16, fontSize: 13, color: "var(--brass-hi)", textDecoration: "underline" }}>
                  Book another chair
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {/* the calendar leads */}
                <section>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <button aria-label="Previous month"
                      onClick={() => setCursor((c) => (c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 }))}
                      style={{ padding: "6px 12px", border: "1px solid rgba(246,237,224,0.16)", color: "var(--ink)" }}>←</button>
                    <p style={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>
                      {MONTHS[cursor.m]} {cursor.y}
                    </p>
                    <button aria-label="Next month"
                      onClick={() => setCursor((c) => (c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 }))}
                      style={{ padding: "6px 12px", border: "1px solid rgba(246,237,224,0.16)", color: "var(--ink)" }}>→</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
                    {DOW.map((d, i) => (
                      <span key={i} style={{ textAlign: "center", fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)", paddingBottom: 6 }}>{d}</span>
                    ))}
                    {grid.map((c, i) =>
                      c === null ? <span key={`e${i}`} /> : (
                        <button key={c.key} disabled={c.past}
                          onClick={() => { setDateKey(c.key); setBand(""); setTime(""); }}
                          aria-label={pretty(c.key)} aria-pressed={dateKey === c.key}
                          style={cell(dateKey === c.key, c.past)}>{c.day}</button>
                      )
                    )}
                  </div>
                </section>

                {dateKey && (
                  <section>
                    <p style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brass)", marginBottom: 10 }}>Time of day</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {BANDS.map((b) => (
                        <button key={b.key} onClick={() => { setBand(b.key); setTime(""); }} style={chip(band === b.key)}>
                          {b.label}
                          <span style={{ display: "block", fontSize: 10.5, opacity: 0.7, marginTop: 2 }}>
                            {b.from > 12 ? b.from - 12 : b.from}{b.from >= 12 ? "pm" : "am"}–{b.to > 12 ? b.to - 12 : b.to}{b.to >= 12 ? "pm" : "am"}
                          </span>
                        </button>
                      ))}
                    </div>
                    {band && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(76px,1fr))", gap: 6, marginTop: 12 }}>
                        {S.length === 0
                          ? <p style={{ fontSize: 13.5, color: "var(--muted)", gridColumn: "1/-1" }}>Nothing left in that window — try another.</p>
                          : S.map((s) => (
                            <button key={s} onClick={() => setTime(s)} style={{ ...chip(time === s), padding: "8px 0", textAlign: "center", fontSize: 12.5 }}>{s}</button>
                          ))}
                      </div>
                    )}
                  </section>
                )}

                {time && (
                  <section>
                    <p style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brass)", marginBottom: 10 }}>The cut</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {CUTS.map((c) => <button key={c} onClick={() => setCut(c)} style={chip(cut === c)}>{c}</button>)}
                    </div>
                  </section>
                )}

                {cut && (
                  <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 10 }}>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name"
                      style={{ background: "transparent", border: "1px solid rgba(246,237,224,0.16)", padding: "11px 13px", fontSize: 15, color: "var(--ink)" }} />
                    <input value={phone} onChange={(e) => setPhone(formatAsYouType(e.target.value))} inputMode="tel" maxLength={14} placeholder="(973) 000-0000" aria-label="Phone"
                      style={{ background: "transparent", border: "1px solid rgba(246,237,224,0.16)", padding: "11px 13px", fontSize: 15, color: "var(--ink)" }} />
                  </section>
                )}

                <button disabled={!ready} onClick={() => setDone(true)}
                  style={{ padding: "14px 24px", background: "var(--brass)", color: "var(--void)", fontSize: 11.5,
                    letterSpacing: "0.18em", textTransform: "uppercase", opacity: ready ? 1 : 0.3,
                    cursor: ready ? "pointer" : "not-allowed" }}>
                  {ready ? "Hold the chair" : "Pick a day, a time and a cut"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
