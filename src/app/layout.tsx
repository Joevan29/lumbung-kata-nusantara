// src/app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.scss"; // Pastikan ini .scss
import AppThemeProvider from "./theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'], // Tambahkan 500 untuk medium
  display: 'swap',
  variable: '--font-nunito'
});

export const metadata: Metadata = {
  title: "Lumbung Kata Nusantara | Jembatan Bahasa Daerah Indonesia",
  description: "Platform interaktif untuk menerjemahkan, belajar kosakata, dan menguji pemahaman bahasa daerah. Mendukung SDG 4 untuk pendidikan inklusif di daerah 3T.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} antialiased`} suppressHydrationWarning>
      <body className={nunito.className}> {/* Kelas font Nunito diterapkan */}
        <AppThemeProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </AppThemeProvider>
      </body>
    </html>
  );
}