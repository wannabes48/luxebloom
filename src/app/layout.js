import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

/* ============================================
   SEO + Metadata Setup — BloomStacks Gifts Co.
   ============================================ */
export const metadata = {
  metadataBase: new URL('https://bloomstacksgifts.com'),
  title: {
    default: 'BloomStacks Gifts Co. | Premium Money Bouquets & Fresh Flowers',
    template: '%s | BloomStacks Gifts Co.',
  },
  description: 'Discover premium money bouquets, fresh flower arrangements, and luxury gifts for every occasion. Handcrafted with love, delivered nationwide across the US.',
  keywords: [
    'money bouquets',
    'cash bouquets',
    'money flower arrangements',
    'premium gifts',
    'luxury bouquets',
    'birthday flowers',
    'anniversary gifts',
    'graduation bouquets',
    'fresh flowers delivery',
    'BloomStacks Gifts',
  ],
  authors: [{ name: 'BloomStacks Gifts Co.' }],
  creator: 'BloomStacks Gifts Co.',
  publisher: 'BloomStacks Gifts Co.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bloomstacksgifts.com',
    siteName: 'BloomStacks Gifts Co.',
    title: 'BloomStacks Gifts Co. | Premium Money Bouquets & Fresh Flowers',
    description: 'Discover premium money bouquets, fresh flower arrangements, and luxury gifts for every occasion. Handcrafted with love, delivered nationwide.',
    images: [
      {
        url: '/bloomstacks-logo.png',
        width: 1200,
        height: 630,
        alt: 'BloomStacks Gifts Co. — Premium Money Bouquets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BloomStacks Gifts Co. | Premium Money Bouquets & Fresh Flowers',
    description: 'Discover premium money bouquets, fresh flower arrangements, and luxury gifts for every occasion.',
    images: ['/bloomstacks-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/bloomstacks-logo.png',
    apple: '/bloomstacks-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        {/* JSON-LD Structured Data — Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BloomStacks Gifts Co.",
              "url": "https://bloomstacksgifts.com",
              "logo": "https://bloomstacksgifts.com/bloomstacks-logo.png",
              "description": "America's premier destination for luxury money bouquets, fresh flower arrangements, and premium gifts.",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Bloom Avenue, Suite 100",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "postalCode": "10001",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://facebook.com/bloomstacksgifts",
                "https://instagram.com/bloomstacksgifts",
                "https://tiktok.com/@bloomstacksgifts",
                "https://pinterest.com/bloomstacksgifts"
              ]
            }),
          }}
        />
      </head>
      <body>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
