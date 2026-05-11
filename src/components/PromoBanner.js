import styles from "./PromoBanner.module.css";

export default function PromoBanner() {
  return (
    <section className={styles.banner} aria-label="Promotional banner">
      <div className={`container ${styles.content}`}>
        <span className={`${styles.eyebrow} font-montserrat`}>Exclusive Arrangements</span>
        <h2 className={styles.title}>
          America's Premier<br />Money Bouquet Destination
        </h2>
        <p className={`${styles.desc} font-montserrat`}>
          From intimate celebrations to grand gestures, our artisans craft each bouquet
          with meticulous attention to detail. Real US currency, real flowers, unforgettable moments.
        </p>
        <a href="#products" className="btn btn-gold btn-lg">
          Shop the Collection
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  );
}
