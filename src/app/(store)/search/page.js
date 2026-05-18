import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import styles from '@/components/ProductGrid.module.css';

export const metadata = {
  title: 'Search Results | BloomStacks Gifts Co.',
  description: 'Search our premium money bouquets and fresh floral arrangements.',
};

export default async function SearchResultsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.q || '';

  // Query Supabase: Look for matches in the product name
  let { data: products, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .eq('in_stock', true);

  if (error) {
    console.error("Error fetching search results:", error);
    products = [];
  }

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '60vh' }}>
      <h1 style={{ marginBottom: '10px' }}>
        Search Results for "{query}"
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
        Found {products.length} product{products.length !== 1 ? 's' : ''}
      </p>

      {products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 0', background: 'var(--bg-soft)', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '15px' }}>We couldn't find any matches.</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try checking your spelling or using more general terms like "Money" or "Roses".</p>
        </div>
      )}
    </div>
  );
}
