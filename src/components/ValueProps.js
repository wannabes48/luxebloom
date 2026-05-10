import styles from "./ValueProps.module.css";

const props = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="6" y="4" rx="2"/><path d="m2 7 4-2v13l-4-2z"/><circle cx="14" cy="10.5" r="0"/></svg>
    ),
    title: "Nationwide Shipping",
    desc: "We deliver to all 50 states with insured, temperature-controlled packaging.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    title: "Next-Day Delivery",
    desc: "Available in select states. Order by 2 PM ET for guaranteed next-day arrival.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
    title: "Secure Checkout",
    desc: "256-bit SSL encryption. Major credit cards accepted. Your data is always safe.",
  },
];

export default function ValueProps() {
  return (
    <section className={`section ${styles.section}`} aria-label="Why choose us">
      <div className="container">
        <div className={styles.grid}>
          {props.map((prop, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{prop.icon}</div>
              <h3 className={styles.title}>{prop.title}</h3>
              <p className={styles.desc}>{prop.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
