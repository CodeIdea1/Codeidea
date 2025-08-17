import type { Metadata } from "next";
import { Inter, Berkshire_Swash, Playfair_Display } from 'next/font/google';
import "./globals.css";
import Header from "./components/Header";

// خط أساسي للموقع (لجميع النصوص العادية)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// خط للعناصر التي لديها كلاس title
const berkshireSwash = Berkshire_Swash({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-berkshire-swash',
  display: 'swap',
});

// خط للعناصر التي لديها كلاس secondTitle
const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Codeidea",
  description: "Custom Websites That Elevate Your Business",
  icons: "/icon.ico"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${berkshireSwash.variable} ${playfairDisplay.variable}`}>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}