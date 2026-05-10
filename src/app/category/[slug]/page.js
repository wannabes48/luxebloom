"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import styles from "./CategoryPage.module.css";
import Link from "next/link";

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        // 1. Fetch category details
        const { data: catData, error: catError } = await supabase
          .from("categories")
          .select("*")
          .eq("slug", slug)
          .single();

        if (catError) throw catError;
        setCategory(catData);

        // 2. Fetch products in this category
        const { data: prodData, error: prodError } = await supabase
          .from("products")
          .select("*")
          .eq("category_id", catData.id)
          .eq("in_stock", true)
          .order("sort_order", { ascending: true });

        if (prodError) throw prodError;
        setProducts(prodData);
      } catch (err) {
        console.error("Error fetching category data:", err.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchCategoryData();
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Curating your collection...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className={styles.notFound}>
        <h1>Category Not Found</h1>
        <p>The collection you are looking for does not exist.</p>
        <Link href="/" className="btn btn-emerald">Explore All</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{category.name}</span>
          </nav>
          <h1 className={styles.title}>{category.name}</h1>
          {category.description && <p className={styles.desc}>{category.description}</p>}
        </div>
      </header>

      <div className="container">
        {products.length === 0 ? (
          <div className={styles.empty}>
            <p>We're currently preparing new arrangements for this collection. Please check back soon!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
