import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/CartDrawer";

// Configure the serif font for headings
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

// Configure the sans-serif font for body text and UI
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Luxe Bloom | Premium Money Bouquets & Fresh Flowers',
  description: 'America’s premier destination for luxury money bouquets and fresh floral arrangements.',
};

export default function RootLayout({ children }) {
  return (
    // Inject the font variables into the root HTML tag
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <WishlistProvider>
            <TopBar />
            <Header />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <CartDrawer />
            <ChatWidget />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
