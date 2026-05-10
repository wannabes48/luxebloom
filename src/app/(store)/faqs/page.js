"use client";

import { useState } from "react";
import styles from "./FAQs.module.css";

const faqData = [
  {
    category: "Ordering & Delivery",
    items: [
      {
        q: "Do you deliver nationwide?",
        a: "Yes! Luxe Bloom delivers to all 50 states within the US. Our specialized shipping ensures your bouquets arrive fresh and intact."
      },
      {
        q: "How long does delivery take?",
        a: "Standard shipping takes 3-5 business days. We also offer Express (2-day) and Next-Day delivery for urgent celebrations."
      },
      {
        q: "Can I choose a specific delivery date?",
        a: "Absolutely. During checkout, you can select your preferred delivery date from our calendar."
      }
    ]
  },
  {
    category: "Money Bouquets",
    items: [
      {
        q: "Is real currency used?",
        a: "Yes, we use crisp, authentic USD bills. The total value of the currency is included in the final price of the bouquet."
      },
      {
        q: "How are the bills attached?",
        a: "Our artisans use a proprietary, non-destructive folding and mounting technique that ensures the bills remain legal tender and are easy to remove without damage."
      }
    ]
  },
  {
    category: "Custom Orders",
    items: [
      {
        q: "Can I request a custom amount of money?",
        a: "Yes! While we have standard options, you can contact our concierge for bespoke arrangements with any specific denomination or amount."
      }
    ]
  }
];

export default function FAQsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </header>

      <div className="container">
        <div className={styles.faqContent}>
          {faqData.map((cat, idx) => (
            <div key={idx} className={styles.categorySection}>
              <h2 className={styles.catTitle}>{cat.category}</h2>
              <div className={styles.accordion}>
                {cat.items.map((item, i) => (
                  <details key={i} className={styles.faqItem}>
                    <summary className={styles.question}>{item.q}</summary>
                    <div className={styles.answer}>
                      <p>{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
