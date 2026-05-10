"use client";

import { useAuth } from "@/hooks/useAuth";
import styles from "../Admin.module.css";

export default function SettingsPage() {
  const { profile } = useAuth();

  return (
    <div>
      <header className={styles.header}>
        <h1>Admin Settings</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h3>My Admin Profile</h3>
          </div>
          <div style={{ padding: '2rem' }}>
            <div className={styles.formGroup}>
              <label>Display Name</label>
              <input type="text" className={styles.formControl} defaultValue={profile?.display_name || ''} />
            </div>
            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
              <label>Email Address</label>
              <input type="email" className={styles.formControl} value={profile?.email || ''} readOnly disabled />
            </div>
            <button className="btn btn-primary" style={{ marginTop: '2rem' }}>Update Profile</button>
          </div>
        </section>

        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h3>Global Store Status</h3>
          </div>
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span>Storefront Visible</span>
              <span className={styles.badge} style={{ background: '#DCFCE7', color: '#15803D' }}>ACTIVE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span>Maintenance Mode</span>
              <span className={styles.badge} style={{ background: '#F3F4F6', color: '#374151' }}>OFF</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Order Notifications</span>
              <span className={styles.badge} style={{ background: '#DCFCE7', color: '#15803D' }}>ENABLED</span>
            </div>
            
            <button className="btn btn-outline btn-full" style={{ marginTop: '3.5rem' }}>System Log</button>
          </div>
        </section>
      </div>
    </div>
  );
}
