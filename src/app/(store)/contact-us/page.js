"use client";

import styles from "./ContactUs.module.css";

export default function ContactUsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>We're here to help you create the perfect gift.</p>
        </div>
      </header>

      <div className="container">
        <div className={styles.grid}>
          {/* Contact Info */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <h3>Visit Our Atelier</h3>
              <p>123 Bloom Avenue, Suite 100<br />New York, NY 10001</p>
            </div>
            
            <div className={styles.infoCard}>
              <h3>Speak with a Florist</h3>
              <p><a href="tel:+15551234567">+1 (555) 123-4567</a></p>
              <p>Mon – Fri: 9:00 AM – 6:00 PM EST</p>
            </div>

            <div className={styles.infoCard}>
              <h3>Email Inquiries</h3>
              <p><a href="mailto:hello@bloomstacksgifts.com">hello@bloomstacksgifts.com</a></p>
              <p>For custom orders: <a href="mailto:bespoke@bloomstacksgifts.com">bespoke@bloomstacksgifts.com</a></p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formCol}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" placeholder="john@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-input">
                  <option>General Inquiry</option>
                  <option>Custom Money Bouquet</option>
                  <option>Order Status</option>
                  <option>Corporate Gifting</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows="6" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="btn btn-emerald btn-lg" style={{ width: "100%" }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
