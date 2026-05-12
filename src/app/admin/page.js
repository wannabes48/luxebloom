"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./Admin.module.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    orderCount: 0,
    customerCount: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Total Sales (using sum)
        const { data: salesData, error: salesError } = await supabase
          .from('orders')
          .select('total')
          .not('order_status', 'eq', 'cancelled'); // Don't count cancelled orders

        if (salesError) throw salesError;
        const totalSales = salesData.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

        // 2. Fetch Order Count (using count)
        const { count: orderCount, error: orderError } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });

        if (orderError) throw orderError;

        // 3. Fetch Recent Orders (limited)
        const { data: recentOrders, error: recentError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);

        if (recentError) throw recentError;

        // 4. Fetch Customer Count
        const { count: customerCount, error: customerError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (customerError) throw customerError;

        setStats({
          totalSales,
          orderCount: orderCount || 0,
          customerCount: customerCount || 0,
          recentOrders: recentOrders || [],
        });
      } catch (err) {
        console.error("Dashboard error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const downloadReport = () => {
    const csvContent = "Date,Reference,Status,Total\n" + 
      stats.recentOrders.map(o => `${new Date(o.created_at).toLocaleDateString()},#LB-${new Date(o.created_at).getTime().toString().slice(-6)},${o.order_status},${o.total}`).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BloomStacks_Report_${new Date().toLocaleDateString()}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Real-time business performance and transaction tracking.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className="btn btn-primary" onClick={downloadReport}>Download Report</button>
        </div>
      </header>

      {/* Stats Cards - Pure Live Data */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Lifetime Revenue</span>
          <span className={styles.statValue}>${stats.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Volume</span>
          <span className={styles.statValue}>{stats.orderCount} Orders</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Client Base</span>
          <span className={styles.statValue}>{stats.customerCount} Registered</span>
        </div>
      </div>

      {/* Recent Activity - Pure Live Data */}
      <section className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h3>Latest Transactions</h3>
          <button className="btn btn-outline btn-sm">View All Orders</button>
        </div>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 500 }}>
                    {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles['badge' + (order.order_status?.toLowerCase() || 'processing')]}`}>
                      {order.order_status || 'processing'}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>${Number(order.total).toFixed(2)}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    #LB-{new Date(order.created_at).getTime().toString().slice(-6)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                  No transaction data available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
