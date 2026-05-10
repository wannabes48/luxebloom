"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { CldImage } from "next-cloudinary";
import styles from "./ProductDetail.module.css";
import Link from "next/link";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*, categories(name, slug)")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading luxury...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>
        <p>The arrangement you are looking for has been moved or is no longer available.</p>
        <Link href="/" className="btn btn-emerald">Back to Shop</Link>
      </div>
    );
  }

  const allImages = [product.image_url, ...(product.images || [])];
  const displayPrice = product.sale_price_usd ?? product.price_usd;

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href={`/category/${product.categories?.slug}`}>{product.categories?.name}</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{product.name}</span>
        </nav>

        <div className={styles.grid}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <CldImage
                width="800"
                height="1000"
                src={allImages[activeImage]}
                alt={product.name}
                crop="fill"
                gravity="center"
                className={styles.actualImage}
              />
            </div>
            {allImages.length > 1 && (
              <div className={styles.thumbnails}>
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`${styles.thumb} ${activeImage === idx ? styles.activeThumb : ""}`}
                    onClick={() => setActiveImage(idx)}
                  >
                    <CldImage width="100" height="100" src={img} alt={`${product.name} thumbnail`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className={styles.info}>
            <div className={styles.header}>
              {product.badge && <span className={`badge badge-sale ${styles.badge}`}>{product.badge}</span>}
              <h1 className={styles.title}>{product.name}</h1>
              <div className={styles.pricing}>
                <span className={styles.price}>${displayPrice.toFixed(2)}</span>
                {product.sale_price_usd && (
                  <span className={styles.oldPrice}>${product.price_usd.toFixed(2)}</span>
                )}
              </div>
            </div>

            <div className={styles.description}>
              <p>{product.description}</p>
            </div>

            <div className={styles.actions}>
              <div className={styles.quantityWrap}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button 
                className="btn btn-emerald btn-lg" 
                style={{ flex: 1 }}
                onClick={() => addItem({ ...product, quantity })}
              >
                Add to Cart — ${(displayPrice * quantity).toFixed(2)}
              </button>
            </div>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <strong>SKU:</strong> <span>{product.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className={styles.metaItem}>
                <strong>Category:</strong> <span>{product.categories?.name}</span>
              </div>
              <div className={styles.metaItem}>
                <strong>Delivery:</strong> <span>Next-Day Available</span>
              </div>
            </div>

            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
                <p>Nationwide Shipping</p>
              </div>
              <div className={styles.trustItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                <p>Secure Checkout</p>
              </div>
              <div className={styles.trustItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                <p>Premium Quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
