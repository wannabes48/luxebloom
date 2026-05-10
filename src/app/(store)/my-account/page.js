"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { US_STATES } from "@/data/products";
import styles from "./MyAccount.module.css";

export default function MyAccountPage() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, orders, addresses, details
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: authError } = await signIn(loginForm.email, loginForm.password);
      if (authError) throw authError;
      router.refresh();
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: authError } = await signUp(registerForm.email, registerForm.password, {
        first_name: registerForm.firstName,
        last_name: registerForm.lastName,
        display_name: `${registerForm.firstName} ${registerForm.lastName.charAt(0)}.`
      });
      if (authError) throw authError;
      
      // If registration is successful, inform the user about verification
      alert("Registration successful! Please check your email to verify your account.");
      router.refresh();
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (activeTab === "orders" && user) {
      const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
          const { data, error: fetchError } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (fetchError) throw fetchError;
          setOrders(data || []);
        } catch (err) {
          console.error("Error fetching orders:", err.message);
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab, user]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className="container" style={{ textAlign: "center" }}>
          <p>Loading account...</p>
        </div>
      </div>
    );
  }

  // --- LOGGED OUT VIEW ---
  if (!user) {
    return (
      <div className={styles.container}>
        <div className="container">
          <h1 className={styles.pageTitle}>My Account</h1>
          
          {error && (
            <div className={styles.errorBanner}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <div className={styles.authGrid}>
            {/* Login */}
            <div className={styles.authCol}>
              <h2 className={styles.colTitle}>Login</h2>
              <form className={styles.form} onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">Username or email address *</label>
                  <input 
                    className="form-input" 
                    type="email" 
                    id="login-email" 
                    required 
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-password">Password *</label>
                  <input 
                    className="form-input" 
                    type="password" 
                    id="login-password" 
                    required 
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  />
                </div>
                <div className={styles.rememberRow}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#" className={styles.lostPassword}>Lost your password?</a>
                </div>
                <button type="submit" className="btn btn-primary submitBtn" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Log in"}
                </button>
              </form>
            </div>

            {/* Register */}
            <div className={styles.authCol}>
              <h2 className={styles.colTitle}>Register</h2>
              <form className={styles.form} onSubmit={handleRegister}>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-first">First Name *</label>
                  <input 
                    className="form-input" 
                    type="text" 
                    id="reg-first" 
                    required 
                    value={registerForm.firstName}
                    onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-last">Last Name *</label>
                  <input 
                    className="form-input" 
                    type="text" 
                    id="reg-last" 
                    required 
                    value={registerForm.lastName}
                    onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">Email address *</label>
                  <input 
                    className="form-input" 
                    type="email" 
                    id="reg-email" 
                    required 
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-password">Password *</label>
                  <input 
                    className="form-input" 
                    type="password" 
                    id="reg-password" 
                    required 
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  />
                </div>
                <p className={styles.registerPrivacy}>
                  Your personal data will be used to support your experience throughout this website, 
                  to manage access to your account, and for other purposes described in our privacy policy.
                </p>
                <button type="submit" className="btn btn-navy submitBtn" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LOGGED IN VIEW ---
  return (
    <div className={styles.container}>
      <div className="container">
        <h1 className={styles.pageTitle}>My Account</h1>
        
        <div className={styles.dashboardLayout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <nav className={styles.sidebarNav}>
              <button 
                className={`${styles.navItem} ${activeTab === "dashboard" ? styles.activeNavItem : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
              <button 
                className={`${styles.navItem} ${activeTab === "orders" ? styles.activeNavItem : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </button>
              <button 
                className={`${styles.navItem} ${activeTab === "addresses" ? styles.activeNavItem : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                Addresses
              </button>
              <button 
                className={`${styles.navItem} ${activeTab === "details" ? styles.activeNavItem : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Account Details
              </button>
              <button 
                className={`${styles.navItem} ${styles.logoutItem}`}
                onClick={signOut}
              >
                Logout
              </button>
            </nav>
          </aside>

          {/* Main Content Pane */}
          <main className={styles.contentArea}>
            {activeTab === "dashboard" && (
              <div>
                <h2 className={styles.contentTitle}>Dashboard</h2>
                <p className={styles.welcomeText}>
                  Hello <strong>{user.user_metadata?.first_name || user.email}</strong>!
                </p>
                <p className={styles.welcomeText}>
                  From your account dashboard you can view your <strong>recent orders</strong>, 
                  manage your <strong>shipping and billing addresses</strong>, and edit your 
                  <strong>password and account details</strong>.
                </p>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className={styles.contentTitle}>Your Orders</h2>
                {ordersLoading ? (
                  <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No orders has been made yet.</p>
                    <Link href="/" className="btn btn-outline btn-sm">Go Shop</Link>
                  </div>
                ) : (
                  <>
                    {/* Ongoing Orders */}
                    {orders.some(o => ['processing', 'confirmed', 'preparing', 'shipped'].includes(o.order_status)) && (
                      <div style={{ marginBottom: '3rem' }}>
                        <h3 className={styles.ordersSubTitle}>Ongoing Orders</h3>
                        <div className={styles.tableWrapper}>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders
                                .filter(o => ['processing', 'confirmed', 'preparing', 'shipped'].includes(o.order_status))
                                .map((order) => (
                                  <tr key={order.id}>
                                    <td><strong>#{order.order_number.split('-').pop()}</strong></td>
                                    <td>{new Date(order.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    <td>
                                      <span className={`${styles.statusBadge} ${styles[`status-${order.order_status}`]}`}>
                                        {order.order_status}
                                      </span>
                                    </td>
                                    <td>${order.total.toFixed(2)}</td>
                                    <td><button className="btn btn-outline btn-sm">Track</button></td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Past Orders */}
                    <div>
                      <h3 className={styles.ordersSubTitle}>Order History</h3>
                      <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th>Order</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Total</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders
                              .filter(o => ['delivered', 'cancelled'].includes(o.order_status))
                              .map((order) => (
                                <tr key={order.id}>
                                  <td>#{order.order_number.split('-').pop()}</td>
                                  <td>{new Date(order.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                  <td>
                                    <span className={`${styles.statusBadge} ${styles[`status-${order.order_status}`]}`}>
                                      {order.order_status}
                                    </span>
                                  </td>
                                  <td>${order.total.toFixed(2)}</td>
                                  <td><button className="btn btn-outline btn-sm">Reorder</button></td>
                                </tr>
                              ))}
                            {orders.filter(o => ['delivered', 'cancelled'].includes(o.order_status)).length === 0 && (
                              <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                  No past orders found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <h2 className={styles.contentTitle}>Addresses</h2>
                <p className={styles.welcomeText} style={{ marginBottom: "2rem" }}>
                  The following addresses will be used on the checkout page by default.
                </p>
                <div className={styles.addressGrid}>
                  <div className={styles.addressBox}>
                    <div className={styles.addressHeader}>
                      <h3>Billing Address</h3>
                      <button className={styles.editLink}>Edit</button>
                    </div>
                    <address className={styles.addressText}>
                      John Doe<br />
                      123 Bloom Avenue<br />
                      Suite 100<br />
                      New York, NY 10001
                    </address>
                  </div>
                  <div className={styles.addressBox}>
                    <div className={styles.addressHeader}>
                      <h3>Shipping Address</h3>
                      <button className={styles.editLink}>Edit</button>
                    </div>
                    <address className={styles.addressText}>
                      John Doe<br />
                      123 Bloom Avenue<br />
                      Suite 100<br />
                      New York, NY 10001
                    </address>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div>
                <h2 className={styles.contentTitle}>Account Details</h2>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                  <div className={styles.row}>
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input className="form-input" type="text" defaultValue={user.user_metadata?.first_name} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <input className="form-input" type="text" defaultValue={user.user_metadata?.last_name} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Display Name *</label>
                    <input className="form-input" type="text" defaultValue={user.user_metadata?.display_name} />
                    <span className={styles.registerPrivacy}>This will be how your name will be displayed in the account section and in reviews.</span>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" defaultValue={user.email} />
                  </div>
                  
                  <fieldset style={{ border: "1px solid var(--border-light)", padding: "1.5rem", borderRadius: "var(--radius-lg)", marginTop: "1rem" }}>
                    <legend style={{ padding: "0 0.5rem", fontWeight: "600", color: "var(--navy)" }}>Password Change</legend>
                    <div className="form-group">
                      <label className="form-label">Current password (leave blank to leave unchanged)</label>
                      <input className="form-input" type="password" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New password (leave blank to leave unchanged)</label>
                      <input className="form-input" type="password" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirm new password</label>
                      <input className="form-input" type="password" />
                    </div>
                  </fieldset>

                  <button type="submit" className="btn btn-gold btn-lg" style={{ marginTop: "1.5rem" }}>
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
