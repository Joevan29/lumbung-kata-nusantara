// src/app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google"; // Atau font lain yang Anda gunakan
import "./globals.scss"; // Atau globals.css jika Anda tidak menggunakan SCSS
import AppThemeProvider from "./theme-provider"; // Jika Anda menggunakan theme provider
import Header from "@/components/layout/Header";   // Jika Anda memiliki komponen Header
import Footer from "@/components/layout/Footer";   // Jika Anda memiliki komponen Footer

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-nunito' 
});

export const metadata: Metadata = {
  title: "Lumbung Kata Nusantara", // Ganti dengan judul aplikasi Anda
  description: "Deskripsi aplikasi Anda.", // Ganti dengan deskripsi aplikasi Anda
  // Anda bisa menambahkan metadata lain di sini
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Next.js akan otomatis menambahkan tag <meta charset="utf-8" /> dan <meta name="viewport" ... /> */}
        
        {/* === TAMBAHKAN TAG META DARI DICODING DI SINI === */}
        <meta name="dicoding:email" content="joevanpramanaachmad2022@student.unas.ac.id" /> 
        {/* Pastikan emailnya adalah email Anda yang terdaftar di Dicoding */}

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
