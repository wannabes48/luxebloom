"use client";

import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import styles from "./WishlistPage.module.css";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>Your Wishlist</span>
          </nav>
          <h1 className={styles.title}>Your Wishlist</h1>
          <p className={styles.subtitle}>Keep track of the arrangements you love most.</p>
        </div>
      </header>

      <div className="container">
        {wishlistItems.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🤍</div>
            <h3>Your wishlist is empty</h3>
            <p>Save your favorite bouquets here to keep them organized.</p>
            <Link href="/shop" className="btn btn-emerald">Start Shopping</Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
