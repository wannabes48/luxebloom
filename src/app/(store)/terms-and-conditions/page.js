"use client";

import styles from "./Legal.module.css";

export default function TermsPage() {
  return (
    <div className={styles.page}>
      {/* Left Side: Visual */}
      <div className={styles.imageSide}>
        <img 
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=1200" 
          alt="Luxe Bloom Service" 
          className={styles.img}
        />
      </div>

      {/* Right Side: Content */}
      <div className={styles.contentSide}>
        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <h1>Terms & Conditions</h1>
            <p>Last Updated: May 10, 2026</p>
          </header>

          <div className={styles.content}>
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using Luxe Bloom's website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our site.</p>
            </section>

            <section>
              <h2>2. Product Representation</h2>
              <p>Luxe Bloom strives to be as accurate as possible in our product descriptions and images. However, as flowers are natural products and money bouquets are handcrafted, slight variations in color and arrangement may occur.</p>
            </section>

            <section>
              <h2>3. Currency Handling</h2>
              <p>For all Money Bouquets, Luxe Bloom acts as a service provider for the artistic arrangement of legal tender provided by or purchased on behalf of the customer. We guarantee that all currency used is authentic USD bills.</p>
            </section>

            <section>
              <h2>4. Cancellations and Refunds</h2>
              <p>Due to the perishable nature of flowers and the customized nature of money bouquets, orders must be cancelled at least 48 hours before the scheduled delivery date for a full refund. Custom orders may be subject to non-refundable service fees.</p>
            </section>

            <section>
              <h2>5. Shipping and Delivery</h2>
              <p>Luxe Bloom is not responsible for delivery delays caused by shipping carriers or incorrect address information provided by the customer. Risk of loss passes to the customer upon delivery of the item to the carrier.</p>
            </section>

            <section>
              <h2>6. Limitation of Liability</h2>
              <p>Luxe Bloom shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or for the cost of procurement of substitute goods.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
