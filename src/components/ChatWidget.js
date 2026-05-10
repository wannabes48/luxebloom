"use client";

import { useState } from "react";
import styles from "./ChatWidget.module.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message || !email) return;

    setIsSending(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "inquiry",
          customerName: "Chat User",
          email: email,
          message: message, // I should update the API to handle the message body
        }),
      });

      if (response.ok) {
        setIsSent(true);
        setMessage("");
        setEmail("");
        setTimeout(() => {
          setIsSent(false);
          setIsOpen(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles.widget} id="chat-widget">
      {isOpen && (
        <div className={styles.bubble}>
          <div className={styles.bubbleHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.onlineStatus}></div>
              <span>Live Support</span>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat" className={styles.closeBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className={styles.bubbleBody}>
            {isSent ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <p>Message sent! We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <p className={styles.greeting}>
                  Hi! How can we help you create something special today?
                </p>
                
                <div className={styles.fastOptions}>
                  <a 
                    href="https://wa.me/15551234567" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.whatsappBtn}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Chat on WhatsApp
                  </a>
                </div>

                <div className={styles.divider}>
                  <span>or leave a message</span>
                </div>

                <form onSubmit={handleSend} className={styles.chatForm}>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className={styles.chatInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="How can we help?"
                    className={styles.chatTextarea}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={3}
                  />
                  <button 
                    type="submit" 
                    className={styles.sendBtn} 
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <button
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <div className={styles.fabIcon}>
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
          )}
        </div>
      </button>
    </div>
  );
}
