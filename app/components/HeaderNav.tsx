"use client";

import { useState } from "react";

function Logo() { return <img className="brand-logo" src="/zevray-logo.png" alt="Zevray" />; }

export function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav">
      <a className="wordmark" href="#top" aria-label="Zevray home" onClick={closeMenu}><Logo /></a>
      <button className="menu-button" aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
      <nav id="nav-links" className={menuOpen ? "open" : ""} aria-label="Primary navigation">
        <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="/journals" onClick={closeMenu}>Journal</a>
        <a className="say-hello" href="mailto:hi@zevray.com" onClick={closeMenu}>Say hello <span>↗</span></a>
      </nav>
    </header>
  );
}
