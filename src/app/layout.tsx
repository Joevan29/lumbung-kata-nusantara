// src/app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google"; // Impor font
import "./globals.scss"; // Impor global SCSS
import AppThemeProvider from "./theme-provider"; // Impor provider tema
import Header from "@/components/layout/Header";   // Impor Header
import Footer from "@/components/layout/Footer";   // Impor Footer

// Inisialisasi font
const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-nunito' // CSS variable untuk digunakan di SCSS/CSS
});

// Metadata untuk SEO
export const metadata: Metadata = {
  title: "Lumbung Kata Nusantara | Jembatan Bahasa Daerah Indonesia",
  description: "Platform interaktif untuk menerjemahkan, belajar kosakata, dan menguji pemahaman bahasa daerah. Mendukung SDG 4 untuk pendidikan inklusif di daerah 3T.",
  keywords: "kamus daerah, penerjemah bahasa daerah, kuis bahasa, SDG 4, pendidikan inklusif, 3T, hackathon, nextjs, scss, azure ai, lumbung kata, budaya indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Terapkan variabel font ke tag html
    <html lang="id" className={`${nunito.variable} antialiased`} suppressHydrationWarning>
      {/* Terapkan kelas font utama ke body */}
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
