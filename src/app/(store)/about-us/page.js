"use client";

import styles from "./AboutUs.module.css";

export default function AboutUsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className="container">
          <span className={styles.subtitle}>Our Story</span>
          <h1 className={styles.title}>Crafting Moments of Luxury</h1>
        </div>
      </header>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.textSide}>
              <h2>The BloomStacks Vision</h2>
              <p>
                Founded in the heart of New York, BloomStacks Gifts Co. was born out of a desire to redefine the art of gifting. 
                We believe that every celebration deserves a touch of extraordinary elegance. 
                Whether it's a milestone graduation, a diamond anniversary, or a simple "thinking of you," 
                our arrangements are designed to speak volumes.
              </p>
              <p>
                Our signature <strong>Money Bouquets</strong> combine the timeless beauty of premium florals with 
                the practical luxury of artisanal currency presentation, creating a gift that is both stunning and unforgettable.
              </p>
            </div>
            <div className={styles.imageSide}>
              {/* Image Placeholder */}
              <div className={styles.imagePlaceholder}>
                <span className={styles.logoIcon}>✿</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>Premium Quality</h3>
              <p>We source only the finest blooms from sustainable farms, ensuring every petal is perfect.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Artisanal Design</h3>
              <p>Every money bouquet is handcrafted by our master florists with surgical precision.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Nationwide Care</h3>
              <p>Our specialized white-glove shipping ensures your gift arrives in pristine condition anywhere in the US.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
