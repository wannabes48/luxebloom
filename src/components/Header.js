"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import styles from "./Header.module.css";
import { useState } from "react";

export default function Header() {
  const { totalItems, subtotal, openCart } = useCart();
  const { wishlistItems } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className={styles.header} id="header">
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✿</span>
          <div className={styles.logoText}>
            <span className={styles.brand}>Luxe Bloom</span>
            <span className={styles.tagline}>Premium Money Bouquets & Flowers</span>
          </div>
        </Link>

        {/* Search */}
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search money bouquets, flowers, gifts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            id="header-search"
            aria-label="Search products"
          />
          <button className={styles.searchBtn} aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Link href="/my-account" className={styles.action} id="account-link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className={styles.actionLabel}>Account</span>
          </Link>

          <Link href="/wishlist" className={styles.action} id="wishlist-link">
            <div style={{ position: "relative" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              {wishlistItems.length > 0 && (
                <span className={styles.cartBadge}>{wishlistItems.length}</span>
              )}
            </div>
            <span className={styles.actionLabel}>Wishlist</span>
          </Link>

          <button className={styles.cartBtn} onClick={openCart} id="cart-button">
            <div className={styles.cartIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
            </div>
            <div className={styles.cartInfo}>
              <span className={styles.actionLabel}>Cart</span>
              <span className={styles.cartTotal}>
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
