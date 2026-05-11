"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import { categories as localCategories } from "@/data/products";
import styles from "../CategoryPage.module.css";
import Link from "next/link";

export default function SubcategoryPage() {
  const { slug, subslug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubcategoryData() {
      try {
        // 1. Fetch parent category details
        const { data: catList, error: catError } = await supabase
          .from("categories")
          .select("*")
          .eq("slug", slug)
          .limit(1);

        if (catError) throw catError;
        const catData = catList && catList.length > 0 ? catList[0] : null;
        setCategory(catData);

        if (catData) {
          setCategory(catData);
          const { data: prodData, error: prodError } = await supabase
            .from("products")
            .select("*")
            .eq("category_id", catData.id)
            .eq("in_stock", true)
            .order("sort_order", { ascending: true });

          if (prodError) throw prodError;
          setProducts(prodData);
        } else {
          // Fallback to local data
          const localCat = localCategories.find(c => c.slug === slug);
          if (localCat) {
            setCategory(localCat);
            setProducts([]);
          } else {
            setCategory(null);
          }
        }
      } catch (err) {
        console.error("Error fetching subcategory data:", err.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchSubcategoryData();
  }, [slug, subslug]);

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
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{subslug.replace(/-/g, ' ')}</span>
          </nav>
          <h1 className={styles.title} style={{ textTransform: 'capitalize' }}>
            {subslug.replace(/-/g, ' ')}
          </h1>
          <p className={styles.desc}>
            Exclusive {subslug.replace(/-/g, ' ')} arrangements from our {category.name} collection.
          </p>
        </div>
      </header>

      <div className="container">
        {products.length === 0 ? (
          <div className={styles.empty}>
            <p>We're currently preparing new arrangements for this sub-collection. Please check back soon!</p>
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
