"use client";

import { useCart } from "@/context/CartContext";
import { CldImage } from "next-cloudinary";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <div className={`${styles.drawer} font-montserrat`} role="dialog" aria-label="Shopping cart">
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Your Cart
            <span className={styles.count}>({items.length})</span>
          </h2>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🛒</span>
              <p>Your cart is empty</p>
              <button className="btn btn-primary btn-sm" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemImage}>
                    {item.image ? (
                      item.image.startsWith("http") ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <CldImage
                          width="80"
                          height="80"
                          src={item.image}
                          alt={item.name}
                          crop="fill"
                        />
                      )
                    ) : (
                      <div className={styles.imagePlaceholder}>✿</div>
                    )}
                  </div>
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <span className={styles.itemPrice}>
                      ${(item.price ?? 0).toFixed(2)}
                    </span>
                    <div className={styles.qtyRow}>
                      <div className={styles.qtyControl}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span>Subtotal</span>
              <span className={styles.subtotalAmount}>${subtotal.toFixed(2)}</span>
            </div>
            <p className={styles.shippingNote}>Shipping & taxes calculated at checkout</p>
            <a href="/checkout" className="btn btn-gold btn-lg" style={{ width: "100%" }}>
              Proceed to Checkout
            </a>
            <button className={styles.continueShopping} onClick={closeCart}>
              or Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
