"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bloomstacks_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Re-normalize items to fix legacy data
        const normalized = parsed.map(item => ({
          ...item,
          price: item.price ?? item.sale_price_usd ?? item.price_usd ?? item.salePrice ?? 0,
          image: item.image ?? item.image_url ?? item.imageUrl,
        }));
        setItems(normalized);
      }
    } catch {}
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("bloomstacks_cart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product) => {
    // Normalize product data for consistent cart usage
    const normalizedProduct = {
      ...product,
      price: product.sale_price_usd ?? product.price_usd ?? product.salePrice ?? product.price ?? 0,
      image: product.image_url ?? product.image ?? product.imageUrl,
    };

    setItems((prev) => {
      const existing = prev.find((i) => i.id === normalizedProduct.id);
      if (existing) {
        return prev.map((i) =>
          i.id === normalizedProduct.id ? { ...i, quantity: i.quantity + (product.quantity || 1) } : i
        );
      }
      return [...prev, { ...normalizedProduct, quantity: product.quantity || 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = items.reduce((sum, i) => {
    return sum + (i.price ?? 0) * i.quantity;
  }, 0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
