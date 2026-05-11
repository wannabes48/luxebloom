import { categories } from "@/data/products";
import Link from "next/link";
import styles from "./Categories.module.css";

export default function Categories() {
  return (
    <section className={`section ${styles.categories}`} id="categories" aria-label="Shop by Category">
      <div className="container">
        <div className="section-title">
          <h2>Shop by Category</h2>
        </div>
        <div className={styles.grid}>
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/category/${cat.slug}`} 
              className={styles.card} 
              id={`category-${cat.slug}`}
              style={{ backgroundImage: `url(${cat.image})` }}
            >
              <div className={styles.overlay} />
              <div className={styles.content}>
                <div className={styles.iconWrap}>
                  <span className={styles.emoji}>{cat.icon}</span>
                </div>
                <h3 className={styles.name}>{cat.name}</h3>
                <p className={`${styles.desc} font-montserrat`}>{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
