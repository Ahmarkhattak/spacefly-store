import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpaceFly - Premium E-Commerce Store',
  description: 'Shop the best products at the best prices. Electronics, Clothing, Home & more.',
  keywords: 'ecommerce, shopping, online store, Pakistan, electronics, clothing',
  authors: [{ name: 'SpaceFly' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <CartProvider>

          <SplashScreen />

          <Navbar />

          {children}

        </CartProvider>

      </body>
    </html>
  );
}
