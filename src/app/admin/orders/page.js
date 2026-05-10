"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../Admin.module.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (filterStatus !== "all") {
      query = query.eq('order_status', filterStatus);
    }

    if (searchQuery) {
      query = query.or(`customer_first_name.ilike.%${searchQuery}%,customer_last_name.ilike.%${searchQuery}%,order_number.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (!error) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [filterStatus, searchQuery]);

  const updateStatus = async (orderId, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ order_status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, order_status: newStatus } : o));
    }
  };

  const handleViewDetails = (order) => {
    alert(`Order Details: ${order.order_number}\n\nCustomer: ${order.customer_first_name} ${order.customer_last_name}\nAddress: ${order.shipping_street}, ${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip}\n\nGift Message: ${order.gift_message || "None"}\n\nTotal: $${order.total}`);
  };

  return (
    <div>
      <header className={styles.header}>
        <h1>Order Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search orders..." 
            className={styles.formControl}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '300px' }}
          />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.formControl}
          >
            <option value="all">All Statuses</option>
            <option value="processing">Processing</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </header>

      <section className={styles.tableSection}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '4rem' }}><div className={styles.spinner}></div></td></tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.order_number}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>{order.customer_first_name} {order.customer_last_name}</td>
                  <td style={{ fontWeight: 600 }}>${Number(order.total).toFixed(2)}</td>
                  <td>
                    <select 
                      value={order.order_status || "processing"} 
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`${styles.badge} ${styles['badge' + (order.order_status || 'processing')]}`}
                      style={{ border: 'none', cursor: 'pointer', appearance: 'none' }}
                    >
                      <option value="processing">Processing</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
