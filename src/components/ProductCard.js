"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CldImage } from 'next-cloudinary';
import styles from "./ProductCard.module.css";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const displayPrice = product.sale_price_usd ?? product.price_usd;
  const hasDiscount = product.sale_price_usd != null;

  return (
    <article className={styles.card} id={`product-${product.id}`}>
      {/* Image */}
      <div className={styles.imageWrap}>
        {product.badge && (
          <span
            className={`badge ${
              product.badge === "SALE"
                ? "badge-sale"
                : product.badge === "NEW"
                ? "badge-new"
                : "badge-bestseller"
            } ${styles.badge}`}
          >
            {product.badge}
          </span>
        )}

        <button
          className={`${styles.wishBtn} ${isWishlisted ? styles.wishlisted : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        <Link href={`/product/${product.slug}`}>
          <CldImage
            width="400"
            height="500"
            src={product.image_url}
            alt={product.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            crop="fill"
            gravity="center"
            className={styles.image}
          />
        </Link>

        <div className={styles.overlay}>
          <button
            className={`btn btn-primary btn-sm ${styles.quickAdd}`}
            onClick={() => addItem(product)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <span className={styles.category}>{product.categoryLabel}</span>
        <h3 className={styles.name}>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className={styles.pricing}>
          <span className={styles.price}>${displayPrice.toFixed(2)}</span>
          {hasDiscount && (
            <span className={styles.originalPrice}>${product.price_usd.toFixed(2)}</span>
          )}
        </div>
      </div>

      {/* Mobile Add to Cart */}
      <button
        className={`btn btn-primary btn-sm ${styles.mobileAdd}`}
        onClick={() => addItem(product)}
      >
        Add to Cart
      </button>
    </article>
  );
}
