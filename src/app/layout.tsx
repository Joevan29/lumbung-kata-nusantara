// src/app/layout.tsx
import type { Metadata } // Pastikan Metadata diimpor jika Anda menggunakannya untuk metadata lain
import { Nunito } from "next/font/google";
import "./globals.scss";
import AppThemeProvider from "./theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-nunito'
});

// Anda bisa mendefinisikan metadata default di sini
export const metadata: Metadata = {
  title: "Lumbung Kata Nusantara | Jembatan Bahasa Daerah Indonesia",
  description: "Platform interaktif untuk menerjemahkan, belajar kosakata, dan menguji pemahaman bahasa daerah. Mendukung SDG 4 untuk pendidikan inklusif di daerah 3T.",
  // Anda juga bisa menambahkan tag meta kustom di sini jika formatnya didukung Next.js Metadata API
  // Namun, untuk tag meta yang sangat spesifik seperti "dicoding:email", lebih aman menambahkannya langsung di <head>
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Tag meta lain yang mungkin sudah ada (seperti charset, viewport) akan otomatis ditambahkan oleh Next.js */}
        {/* Tambahkan tag meta Dicoding Anda di sini */}
        <meta name="dicoding:email" content="joevanpramanaachmad2022@student.unas.ac.id" />
        {/* Anda juga bisa menambahkan tag meta lain di sini jika diperlukan */}
      </head>
      <body className={nunito.className}>
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
