"use client";

import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import CartDrawer from "@/components/CartDrawer";

export default function StoreLayout({ children }) {
  return (
    <>
      <TopBar />
      <Header />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <CartDrawer />
      <ChatWidget />
    </>
  );
}
