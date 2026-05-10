"use client";

import { useState } from "react";
import styles from "./ChatWidget.module.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.widget} id="chat-widget">
      {isOpen && (
        <div className={styles.bubble}>
          <div className={styles.bubbleHeader}>
            <span>💬 Live Chat</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <div className={styles.bubbleBody}>
            <p className={styles.greeting}>
              Hi there! 👋<br />
              How can we help you today?
            </p>
            <p className={styles.info}>
              Text us at <strong>+1 (555) 123-4567</strong> or send us a message below.
            </p>
            <div className={styles.inputRow}>
              <input
                type="text"
                placeholder="Type your message..."
                className={styles.chatInput}
                id="chat-input"
              />
              <button className={styles.sendBtn} aria-label="Send message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className={styles.fab}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        )}
      </button>
    </div>
  );
}
