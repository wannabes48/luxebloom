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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className={styles.actionLabel}>Profile</span>
          </Link>

          <Link href="/wishlist" className={styles.action} id="wishlist-link">
            <div style={{ position: "relative" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {wishlistItems.length > 0 && (
                <span className={styles.cartBadge}>{wishlistItems.length}</span>
              )}
            </div>
            <span className={styles.actionLabel}>Wishlist</span>
          </Link>

          <button className={styles.cartBtn} onClick={openCart} id="cart-button">
            <div className={styles.cartIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
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
