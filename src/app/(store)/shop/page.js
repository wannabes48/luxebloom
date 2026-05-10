"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import styles from "./ShopPage.module.css";
import Link from "next/link";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Categories
        const { data: catData } = await supabase.from("categories").select("*");
        setCategories(catData || []);

        // Fetch Products
        let query = supabase.from("products").select("*").eq("in_stock", true);

        if (activeCategory !== "all") {
          query = query.eq("category_id", activeCategory);
        }

        if (sortBy === "price-low") {
          query = query.order("price_usd", { ascending: true });
        } else if (sortBy === "price-high") {
          query = query.order("price_usd", { ascending: false });
        } else {
          query = query.order("created_at", { ascending: false });
        }

        const { data: prodData } = await query;
        setProducts(prodData || []);
      } catch (err) {
        console.error("Error fetching shop data:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [activeCategory, sortBy]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>All Arrangements</h1>
          <p className={styles.subtitle}>Explore our complete collection of luxury money bouquets and premium florals.</p>
        </div>
      </header>

      <div className="container">
        {/* Filters & Sorting */}
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <button 
              className={`${styles.filterBtn} ${activeCategory === "all" ? styles.activeFilter : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.activeFilter : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className={styles.sort}>
            <label htmlFor="sort">Sort By:</label>
            <select 
              id="sort" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Gathering the finest blooms...</p>
          </div>
        ) : (
          <>
            <div className={styles.resultsCount}>
              Showing {products.length} {products.length === 1 ? "product" : "products"}
            </div>
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {products.length === 0 && (
              <div className={styles.empty}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or check back later for new arrivals.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
