"use client";

import { useEffect, useState } from "react";
import { BOOKSY } from "./data";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="wordmark" aria-label="More Than Perfect, home">
          More Than Perfect<span className="dot">.</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#record">The Record</a>
          <a href="#chair">The Chair</a>
          <a href="#work">The Work</a>
          <a href="#visit">Visit</a>
        </nav>
        <a
          href={BOOKSY}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary nav-book"
        >
          Book the Chair
        </a>
      </div>
    </header>
  );
}
