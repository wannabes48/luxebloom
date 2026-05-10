"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../Admin.module.css";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setCustomers(data);
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <h1>Customer Directory</h1>
      </header>

      <section className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h3>Total Registered: {customers.length}</h3>
        </div>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '4rem' }}><div className={styles.spinner}></div></td></tr>
            ) : customers.length > 0 ? (
              customers.map((user) => (
                <tr key={user.id}>
                  <td style={{ fontWeight: 600 }}>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={styles.badge} style={{ background: user.role === 'admin' ? '#FEE2E2' : '#F3F4F6', color: user.role === 'admin' ? '#991B1B' : '#374151' }}>
                      {user.role || 'customer'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No customers registered yet.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
