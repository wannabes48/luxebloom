"use client";

import styles from "./Legal.module.css";

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      {/* Left Side: Visual */}
      <div className={styles.imageSide}>
        <img 
          src="https://res.cloudinary.com/dgp7jehvx/image/upload/v1778444113/337724519_207344298571171_4733005124648978824_n-700x871_m7bjs3.jpg" 
          alt="Luxury Florals" 
          className={styles.img}
        />
      </div>

      {/* Right Side: Content */}
      <div className={styles.contentSide}>
        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <h1>Privacy Policy</h1>
            <p>Last Updated: May 10, 2026</p>
          </header>

          <div className={styles.content}>
            <section>
              <h2>1. Information We Collect</h2>
              <p>At BloomStacks Gifts Co., we collect information that you provide directly to us when you create an account, make a purchase, or communicate with our team. This includes:</p>
              <ul>
                <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</li>
                <li><strong>Payment Information:</strong> Credit card details and billing address (processed securely via our payment partners).</li>
                <li><strong>Gift Information:</strong> Recipient names, addresses, and custom gift messages.</li>
              </ul>
            </section>

            <section>
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, including to process transactions, send confirmations, and respond to your comments and questions.</p>
            </section>

            <section>
              <h2>3. Security of Your Data</h2>
              <p>We implement industry-standard security measures to protect your personal data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2>4. Third-Party Services</h2>
              <p>We may share your information with third-party vendors, such as shipping carriers (UPS, FedEx) and payment processors (Stripe), only as necessary to fulfill your orders.</p>
            </section>

            <section>
              <h2>5. Your Choices</h2>
              <p>You may update or correct your account information at any time by logging into your account settings. You may also opt-out of marketing communications by following the instructions in those emails.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
