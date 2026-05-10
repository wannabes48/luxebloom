"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { US_STATES } from "@/data/products";
import { supabase } from "@/lib/supabase";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./checkout.module.css";

// Load Stripe outside of component to avoid re-creation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [stripeError, setStripeError] = useState(null);

  const shippingCost = subtotal >= 150 ? 0 : 14.99;
  const taxRate = 0.0875;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  const [form, setForm] = useState({
    firstName: user?.user_metadata?.first_name || "",
    lastName: user?.user_metadata?.last_name || "",
    email: user?.email || "",
    phone: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    cardName: user?.user_metadata?.display_name || "",
    giftMessage: "",
  });

  // Update form if user data loads later
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        firstName: prev.firstName || user.user_metadata?.first_name || "",
        lastName: prev.lastName || user.user_metadata?.last_name || "",
        email: prev.email || user.email || "",
        cardName: prev.cardName || user.user_metadata?.display_name || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0 || !stripe || !elements) return;
    
    setIsProcessing(true);
    setStripeError(null);

    try {
      // 1. Create PaymentIntent on the server
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: total,
          metadata: { customer_email: form.email }
        }),
      });

      const { clientSecret, error: backendError } = await response.json();
      if (backendError) throw new Error(backendError);

      // 2. Confirm Payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error: stripeErr } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: form.cardName || `${form.firstName} ${form.lastName}`,
            email: form.email,
          },
        },
      });

      if (stripeErr) {
        setStripeError(stripeErr.message);
        throw new Error(stripeErr.message);
      }

      if (paymentIntent.status === "succeeded") {
        // 3. Save Order to Supabase
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
        .insert([
          {
            customer_first_name: form.firstName,
            customer_last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            shipping_street: form.street,
            shipping_apt: form.apt,
            shipping_city: form.city,
            shipping_state: form.state,
            shipping_zip: form.zip,
            subtotal: subtotal,
            shipping_cost: shippingCost,
            tax: tax,
            total: total,
            user_id: user?.id || null,
            payment_method: "stripe",
            payment_status: "completed",
            order_status: "processing",
            gift_message: form.giftMessage,
            stripe_payment_id: paymentIntent.id
          }
        ])
          .select()
          .single();

        if (orderError) throw orderError;

        // 4. Create Order Items
        const orderItems = items.map((item) => ({
          order_id: orderData.id,
          product_id: item.id,
          product_name: item.name,
          product_image: item.image,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems);

        if (itemsError) throw itemsError;

        // 5. Send Confirmation Email
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'order',
              email: form.email,
              customerName: `${form.firstName} ${form.lastName}`,
              orderId: orderData.id,
              total: total.toFixed(2),
            }),
          });
        } catch (emailErr) {
          console.error("Email sending failed:", emailErr);
        }

        // 6. Finalize
        setPlacedOrderId(orderData.id.slice(-6).toUpperCase());
        setOrderPlaced(true);
        clearCart();
        window.scrollTo(0, 0);
      }

    } catch (err) {
      console.error("Checkout error:", err.message);
      setStripeError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className={styles.success}>
        <div className={styles.successCard}>
          <span className={styles.successIcon}>✓</span>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order. We'll send a confirmation email shortly.</p>
          <p className={styles.orderId}>Order #LB-{placedOrderId}</p>
          <a href="/" className="btn btn-primary btn-lg">
            Back to Shop
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your cart is empty</h2>
        <p>Add some beautiful bouquets before checking out.</p>
        <a href="/" className="btn btn-primary">
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.pageTitle}>Checkout</h1>

        <form onSubmit={handleSubmit} className={styles.layout}>
          <div className={styles.formSide}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.stepNum}>1</span>
                Shipping Information
              </h2>

              <div className={styles.row}>
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">First Name *</label>
                  <input className="form-input" type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">Last Name *</label>
                  <input className="form-input" type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className={styles.row}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input className="form-input" type="email" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number *</label>
                  <input className="form-input" type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="street">Street Address *</label>
                <input className="form-input" type="text" id="street" name="street" value={form.street} onChange={handleChange} required placeholder="123 Main St" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="apt">Apt / Suite / Unit</label>
                <input className="form-input" type="text" id="apt" name="apt" value={form.apt} onChange={handleChange} placeholder="Apt 4B" />
              </div>

              <div className={styles.row3}>
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City *</label>
                  <input className="form-input" type="text" id="city" name="city" value={form.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="state">State *</label>
                  <select className="form-input form-select" id="state" name="state" value={form.state} onChange={handleChange} required>
                    <option value="">Select State</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="zip">ZIP Code *</label>
                  <input className="form-input" type="text" id="zip" name="zip" value={form.zip} onChange={handleChange} required placeholder="10001" maxLength={10} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="giftMessage">Gift Message (Optional)</label>
                <textarea
                  className="form-input"
                  id="giftMessage"
                  name="giftMessage"
                  value={form.giftMessage}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Add a personal message for the recipient..."
                  style={{ resize: "vertical" }}
                />
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.stepNum}>2</span>
                Payment Method
              </h2>

              <div className={`${styles.paymentOption} ${styles.paymentActive}`}>
                <div className={styles.paymentHeader}>
                  <div className={styles.paymentRadio}>
                    <div className={`${styles.radio} ${styles.radioChecked}`}>
                      <div className={styles.radioDot} />
                    </div>
                    <span className={styles.paymentLabel}>Secure Credit / Debit Card</span>
                  </div>
                  <div className={styles.cardBrands}>
                    {/* Visa */}
                    <svg width="32" height="20" viewBox="0 0 24 15" fill="none"><path d="M12.023 11.233h2.383L15.895 2.11h-2.383l-1.489 9.123zM22.502 2.213c-.452-.178-1.164-.37-2.023-.37-2.228 0-3.8 1.185-3.81 2.883-.014 1.255 1.121 1.956 1.977 2.373.878.428 1.173.704 1.17 1.087-.006.587-.704.856-1.353.856-.9 0-1.382-.14-2.118-.466l-.296-.142-.315 1.956c.528.243 1.5.452 2.511.463 2.37.011 3.914-1.17 3.93-2.98.01-.994-.593-1.75-1.89-2.373-.787-.394-1.272-.659-1.272-1.062 0-.356.39-.738 1.237-.738.696-.011 1.2.15 1.589.317l.189.083.393-2.083-.35-.144zM8.332 2.11 5.922 8.324l-.258-1.298C5.21 5.434 4.14 4.135 2.89 3.473L1.082 2.5l-.022.106c2.477.585 3.961 2.052 4.542 4.316l1.624 6.2h2.51L13.56 2.11H8.332zM.446 2.11.023 2.51a.066.066 0 0 0 .01.106c1.1.272 1.83.673 2.42 1.196.368.324.471.606.592 1.062L5.05 15h2.507L11.396 2.11H.446z" fill="#1A1F71"/></svg>
                    {/* Mastercard */}
                    <svg width="28" height="20" viewBox="0 0 24 15" fill="none"><circle cx="7" cy="7.5" r="7" fill="#EB001B" fillOpacity="0.8"/><circle cx="17" cy="7.5" r="7" fill="#F79E1B" fillOpacity="0.8"/><path d="M12 12.38a6.97 6.97 0 0 0 2.27-4.88 6.97 6.97 0 0 0-2.27-4.88 6.97 6.97 0 0 1-2.27 4.88 6.97 6.97 0 0 1 2.27 4.88z" fill="#FF5F00"/></svg>
                  </div>
                </div>

                <div className={styles.paymentBody}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cardName">Cardholder Name *</label>
                    <input className="form-input" type="text" id="cardName" name="cardName" value={form.cardName} onChange={handleChange} required placeholder="John Doe" />
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label className="form-label">Card Details *</label>
                    <div className={styles.stripeElementContainer}>
                      <CardElement 
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#1A1F71",
                              "::placeholder": { color: "#9CA3AF" },
                            },
                          },
                        }} 
                      />
                    </div>
                  </div>

                  {stripeError && <div className={styles.errorMsg}>{stripeError}</div>}

                  <div className={styles.secureNote}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Payments are encrypted and processed securely by Stripe.
                  </div>
                </div>
              </div>
            </section>

            <button
              type="submit"
              className={`btn btn-gold btn-lg ${styles.placeOrder}`}
              disabled={isProcessing || !stripe}
            >
              {isProcessing ? (
                <>
                  <span className={styles.spinner} />
                  Processing...
                </>
              ) : (
                <>Pay & Place Order — ${total.toFixed(2)}</>
              )}
            </button>
          </div>

          <aside className={styles.summary}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryItems}>
                {items.map((item) => (
                  <div key={item.id} className={styles.summaryItem}>
                    <div className={styles.summaryItemImage}>
                      <img src={item.image} alt={item.name} />
                      <span className={styles.summaryQty}>{item.quantity}</span>
                    </div>
                    <div className={styles.summaryItemInfo}>
                      <span className={styles.summaryItemName}>{item.name}</span>
                      <span className={styles.summaryItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.summaryLines}>
                <div className={styles.summaryLine}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryLine}>
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? <span className={styles.freeShipping}>FREE</span> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className={styles.summaryLine}>
                  <span>Tax (8.75%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryLine} ${styles.summaryTotal}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
