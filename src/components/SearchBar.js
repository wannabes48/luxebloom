"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const debounceTimer = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch live suggestions
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      setShowDropdown(false);
      return;
    }

    let cancelled = false;

    const fetchSuggestions = async () => {
      setIsSearching(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price_usd, sale_price_usd, image_url, slug')
          .or(`name.ilike.%${searchTerm.trim()}%,description.ilike.%${searchTerm.trim()}%`)
          .eq('in_stock', true)
          .limit(5);

        if (cancelled) return;

        if (error) {
          console.error('Supabase search error:', error);
          setSuggestions([]);
        } else {
          setSuggestions(data || []);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error('Error fetching live suggestions:', err);
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    };

    // Debounce
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(fetchSuggestions, 300);

    return () => {
      cancelled = true;
      clearTimeout(debounceTimer.current);
    };
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleFocus = () => {
    if (searchTerm.trim().length >= 2) {
      setShowDropdown(true);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  return (
    <div className={styles.searchContainer} ref={dropdownRef}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search money bouquets, gifts..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className={styles.searchInput}
          aria-label="Search products"
        />
        <button type="submit" className={styles.searchBtn} aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>
      </form>

      {/* Live Suggestions Dropdown */}
      {showDropdown && searchTerm.trim().length >= 2 && (
        <div 
          className={styles.dropdown}
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            width: '100%',
            backgroundColor: '#ffffff',
            zIndex: 99999,
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
        >
          {isSearching ? (
            <div className={styles.loading} style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>Searching...</div>
          ) : suggestions.length > 0 ? (
            <>
              <ul className={styles.suggestionList} style={{ listStyle: 'none', margin: 0, padding: 0, maxHeight: '350px', overflowY: 'auto' }}>
                {suggestions.map((item) => (
                  <li key={item.id} className={styles.suggestionItem}>
                    <Link 
                      href={`/product/${item.slug}`} 
                      className={styles.suggestionLink}
                      style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', textDecoration: 'none', color: '#111827', borderBottom: '1px solid #f3f4f6' }}
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className={styles.suggestionImage} style={{ width: '48px', height: '48px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#f3f4f6', flexShrink: 0 }}>
                        <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className={styles.suggestionInfo} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span className={styles.suggestionName} style={{ fontSize: '14px', fontWeight: '500' }}>{item.name}</span>
                        <span className={styles.suggestionPrice} style={{ fontSize: '12px', color: '#047857', fontWeight: '600' }}>${(item.sale_price_usd ?? item.price_usd ?? 0).toFixed(2)}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/search?q=${encodeURIComponent(searchTerm.trim())}`}
                className={styles.viewAll}
                style={{ display: 'block', padding: '12px', textAlign: 'center', backgroundColor: '#f9fafb', color: '#047857', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}
                onClick={() => setShowDropdown(false)}
              >
                View all results for "{searchTerm}"
              </Link>
            </>
          ) : (
            <div className={styles.empty} style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>
              No matches found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
