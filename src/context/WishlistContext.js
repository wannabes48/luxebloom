"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bloomstacks_wishlist");
      if (saved) setWishlistItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("bloomstacks_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some((i) => i.id === productId);
  }, [wishlistItems]);

  const clearWishlist = useCallback(() => setWishlistItems([]), []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
