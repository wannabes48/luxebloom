"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Money Bouquets", href: "#products" },
  { label: "Fresh Florals", href: "#products" },
  { label: "Graduation", href: "#products" },
  { label: "Anniversaries", href: "#products" },
  { label: "Custom Add-Ons", href: "#products" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar} id="main-nav" aria-label="Main Navigation">
      <div className={`container ${styles.inner}`}>
        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          id="nav-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop + Mobile Nav Links */}
        <ul className={`${styles.links} ${isMenuOpen ? styles.open : ""}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.link}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Delivery Notice */}
        <div className={styles.delivery}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="6" y="4" rx="2"/><path d="m2 7 4-2v13l-4-2z"/><circle cx="18" cy="17" r="0"/></svg>
          Next-Day Delivery Available
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}
