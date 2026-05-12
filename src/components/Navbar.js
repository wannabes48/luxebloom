"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/products";
import styles from "./Navbar.module.css";

const mainLinks = [
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleCat = (slug) => {
    setExpandedCats((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <>
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

          {/* Desktop Nav Links */}
          <ul className={`${styles.desktopLinks} font-montserrat`}>
            {mainLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Dynamic Categories */}
            {categories.map((cat) => (
              <li 
                key={cat.id} 
                className={styles.desktopCat}
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={`/category/${cat.slug}`} className={styles.link}>
                  {cat.name}
                  {cat.subcategories && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}><path d="m6 9 6 6 6-6"/></svg>
                  )}
                </Link>
                {activeDropdown === cat.id && cat.subcategories && (
                  <div className={styles.dropdown}>
                    <ul className={styles.dropdownLinks}>
                      {cat.subcategories.map((sub) => (
                        <li key={sub.slug}>
                          <Link href={`/category/${cat.slug}/${sub.slug}`} className={styles.dropdownLink}>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Delivery Notice */}
          <div className={`${styles.delivery} font-montserrat`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v2M23 13v2a2 2 0 0 1-2 2h-2.14M7 18h8"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M15 18H9"/><path d="M10 6h4"/><path d="m21 13-2-3h-4v7h4l2-4Z"/></svg>
            <span>Hand-Delivered Excellence</span>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ""}`}>
        <div className={`${styles.sidebarHeader} font-montserrat`}>
          <div className={styles.sidebarBrand}>BloomStacks Gifts Co.</div>
          <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className={styles.sidebarContent}>
          {/* Main Links */}
          <section className={`${styles.sidebarSection} font-montserrat`}>
            <div className={styles.sectionLabel}>Navigation</div>
            <ul className={styles.sidebarLinks}>
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.sidebarLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/my-account" className={styles.sidebarLink}>
                  My Account
                </Link>
              </li>
            </ul>
          </section>

          {/* Categories */}
          <section className={`${styles.sidebarSection} font-montserrat`}>
            <div className={styles.sectionLabel}>Shop by Collection</div>
            <ul className={styles.sidebarLinks}>
              {categories.map((cat) => (
                <li key={cat.id} className={styles.catItem}>
                  <div className={styles.catHeader}>
                    <Link href={`/category/${cat.slug}`} className={styles.sidebarLink}>
                      {cat.name}
                    </Link>
                    <button 
                      className={`${styles.catToggle} ${expandedCats[cat.slug] ? styles.catToggleActive : ""}`}
                      onClick={() => toggleCat(cat.slug)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                  </div>
                  {expandedCats[cat.slug] && cat.subcategories && (
                    <ul className={`${styles.subLinks} font-montserrat`}>
                      {cat.subcategories.map((sub) => (
                        <li key={sub.slug}>
                          <Link href={`/category/${cat.slug}/${sub.slug}`} className={styles.subLink}>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {expandedCats[cat.slug] && !cat.subcategories && (
                    <ul className={`${styles.subLinks} font-montserrat`}>
                      <li><Link href={`/category/${cat.slug}?view=bestsellers`} className={styles.subLink}>Bestsellers</Link></li>
                      <li><Link href={`/category/${cat.slug}?view=new`} className={styles.subLink}>New Arrivals</Link></li>
                      <li><Link href={`/category/${cat.slug}?view=sale`} className={styles.subLink}>Current Offers</Link></li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section className={styles.sidebarSection}>
            <div className={styles.sectionLabel}>Support</div>
            <div className={styles.sidebarEmail}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              hello@bloomstacksgifts.com
            </div>
          </section>
        </div>
      </aside>

      {/* Backdrop */}
      <div 
        className={`${styles.backdrop} ${isMenuOpen ? styles.backdropVisible : ""}`} 
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
}
