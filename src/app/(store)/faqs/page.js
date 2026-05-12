"use client";

import { useState } from "react";
import styles from "./FAQs.module.css";

const faqData = [
  {
    category: "Ordering & Delivery",
    items: [
      {
        q: "Do you deliver nationwide?",
        a: "Yes! BloomStacks Gifts Co. delivers to all 50 states within the US. Our specialized shipping ensures your bouquets arrive fresh and intact."
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
      },
      {
        q: "What denominations are available?",
        a: "We offer arrangements using $1, $5, $10, $20, $50, and $100 bills. Custom denomination requests can be arranged through our concierge service."
      }
    ]
  },
  {
    category: "Custom Orders",
    items: [
      {
        q: "Can I request a custom amount of money?",
        a: "Yes! While we have standard options, you can contact our concierge for bespoke arrangements with any specific denomination or amount."
      },
      {
        q: "How far in advance should I order?",
        a: "For standard arrangements, 3-5 business days is sufficient. For custom or large-scale orders, we recommend placing your order at least 7-10 days in advance."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your refund policy?",
        a: "Due to the perishable nature of our products and the inclusion of real currency, we handle returns on a case-by-case basis. Please contact our support team within 24 hours of delivery if you're unsatisfied."
      },
      {
        q: "What if my bouquet arrives damaged?",
        a: "We take great care in packaging, but if your arrangement arrives damaged, please send us photos within 24 hours and we'll arrange a replacement or full refund."
      }
    ]
  }
];

// Build FAQ structured data for all items
const faqSchemaItems = faqData.flatMap((cat) =>
  cat.items.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a,
    },
  }))
);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqSchemaItems,
};

export default function FAQsPage() {
  const [search, setSearch] = useState("");

  // Filter FAQs based on search
  const filteredData = faqData.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className={styles.container}>
      {/* FAQ Schema Markup for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '1rem' }}>
            Find answers to common questions about money bouquets, delivery, custom orders, and more.
          </p>
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
              aria-label="Search frequently asked questions"
            />
          </div>
        </div>
      </header>

      <div className="container">
        <div className={styles.faqContent}>
          {filteredData.map((cat, idx) => (
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
          {filteredData.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>
              No matching questions found. Try a different search term.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
