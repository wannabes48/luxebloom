"use client";

import styles from "./Legal.module.css";

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <div className="container">
        <header className={styles.header}>
          <h1>Privacy Policy</h1>
          <p>Last Updated: May 10, 2026</p>
        </header>

        <div className={styles.content}>
          <section>
            <h2>1. Information We Collect</h2>
            <p>At Luxe Bloom, we collect information that you provide directly to us when you create an account, make a purchase, or communicate with our team. This includes:</p>
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
        </div>
      </div>
    </div>
  );
}
