"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../Admin.module.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price_usd: "",
    sale_price_usd: "",
    category_id: "",
    image_url: "",
    badge: "",
    in_stock: true,
    is_featured: false,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });
    
    if (!error) setProducts(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('id, name');
    setCategories(data || []);
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        price_usd: product.price_usd || "",
        sale_price_usd: product.sale_price_usd || "",
        category_id: product.category_id || "",
        image_url: product.image_url || "",
        badge: product.badge || "",
        in_stock: product.in_stock ?? true,
        is_featured: product.is_featured ?? false,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        price_usd: "",
        sale_price_usd: "",
        category_id: "",
        image_url: "",
        badge: "",
        in_stock: true,
        is_featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { 
      ...formData, 
      price_usd: parseFloat(formData.price_usd),
      sale_price_usd: formData.sale_price_usd ? parseFloat(formData.sale_price_usd) : null,
      badge: formData.badge || null
    };

    if (editingProduct) {
      const { error } = await supabase.from('products').update(data).eq('id', editingProduct.id);
      if (!error) fetchProducts();
    } else {
      const { error } = await supabase.from('products').insert([data]);
      if (!error) fetchProducts();
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (product) => {
    const confirmation = prompt(`To delete "${product.name}", please type "DELETE" below:`);
    
    if (confirmation === "DELETE") {
      const { error } = await supabase.from('products').delete().eq('id', product.id);
      if (!error) {
        fetchProducts();
      } else {
        alert("Error deleting product: " + error.message);
      }
    } else if (confirmation !== null) {
      alert("Deletion cancelled. The confirmation text did not match.");
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h1>Product Catalog</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add New Product
        </button>
      </header>

      {loading ? (
        <div className={styles.spinner}></div>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productThumb}>
                <img src={product.image_url} alt={product.name} />
                {product.badge && (
                  <span className={styles.badge} style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--gold)', color: 'var(--navy)' }}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className={styles.productInfo}>
                <span className={styles.productName}>{product.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {product.categories?.name || 'Uncategorized'}
                </span>
                <div className={styles.productMeta} style={{ marginTop: '0.5rem' }}>
                  <span className={styles.price}>
                    ${Number(product.price_usd).toFixed(2)}
                    {product.sale_price_usd && <span style={{ textDecoration: 'line-through', fontSize: '0.75rem', marginLeft: '0.5rem', opacity: 0.5 }}>${Number(product.sale_price_usd).toFixed(2)}</span>}
                  </span>
                  <span className={styles.stock} style={{ color: product.in_stock ? 'var(--emerald)' : '#EF4444' }}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-outline btn-sm btn-full"
                    onClick={() => handleOpenModal(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-outline btn-sm" 
                    style={{ color: '#EF4444', borderColor: '#EF4444' }}
                    onClick={() => handleDelete(product)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Modal */}
      {isModalOpen && (
        <div className={styles.loadingOverlay} style={{ background: 'rgba(0,0,0,0.6)', padding: '2rem' }}>
          <div className={styles.tableSection} style={{ 
            width: '100%', 
            maxWidth: '800px', 
            maxHeight: '90vh', 
            overflowY: 'auto',
            padding: '3rem', 
            margin: 'auto',
            position: 'relative'
          }}>
            <h2 style={{ marginBottom: '2.5rem', fontFamily: 'var(--font-heading)' }}>
              {editingProduct ? 'Edit Product Details' : 'Create New Luxury Arrangement'}
            </h2>
            <form className={styles.adminForm} onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className={styles.formGroup}>
                    <label>Product Name</label>
                    <input 
                      type="text" 
                      className={styles.formControl} 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Slug (URL Handle)</label>
                    <input 
                      type="text" 
                      className={styles.formControl} 
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Price (USD)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className={styles.formControl} 
                      value={formData.price_usd}
                      onChange={(e) => setFormData({...formData, price_usd: e.target.value})}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Sale Price (USD) - Optional</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className={styles.formControl} 
                      value={formData.sale_price_usd}
                      onChange={(e) => setFormData({...formData, sale_price_usd: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Category</label>
                    <select 
                      className={styles.formControl}
                      value={formData.category_id}
                      onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className={styles.formGroup}>
                    <label>Image URL</label>
                    <input 
                      type="text" 
                      className={styles.formControl} 
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Promo Badge</label>
                    <select 
                      className={styles.formControl}
                      value={formData.badge}
                      onChange={(e) => setFormData({...formData, badge: e.target.value})}
                    >
                      <option value="">No Badge</option>
                      <option value="NEW">NEW</option>
                      <option value="SALE">SALE</option>
                      <option value="BESTSELLER">BESTSELLER</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Product Description</label>
                    <textarea 
                      className={styles.formControl} 
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      style={{ resize: 'vertical' }}
                    ></textarea>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.in_stock}
                        onChange={(e) => setFormData({...formData, in_stock: e.target.checked})}
                      />
                      <span>In Stock</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                      />
                      <span>Featured Product</span>
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                <button type="submit" className="btn btn-primary btn-full">
                  {editingProduct ? 'Save Changes' : 'Publish Arrangement'}
                </button>
                <button type="button" className="btn btn-outline btn-full" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
