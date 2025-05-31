// src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image"; // Impor next/image
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/components/icons"; // LogoIcon tidak diimpor lagi jika diganti
import styles from "./Header.module.scss";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const publicLogoPath = "/logo/bahasa.png"; // Path ke logo Anda

  // Placeholder untuk SSR/hydration mismatch
  if (!mounted) {
    return (
      <header className={styles.header}>
        <div className={styles.container} style={{ height: '72px' /* atau sesuai tinggi header Anda */ }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--brand-border)' }} />
            <div style={{ width: '120px', height: '24px', borderRadius: '0.25rem', backgroundColor: 'var(--brand-border)' }} />
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--brand-border)' }} />
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink} aria-label="Beranda Lumbung Kata Nusantara">
          <Image
            src={publicLogoPath}
            alt="Lumbung Kata Logo"
            width={36} // Sesuaikan ukuran logo Anda (lebar)
            height={36} // Sesuaikan ukuran logo Anda (tinggi)
            priority // Jika logo adalah bagian penting dari LCP (Largest Contentful Paint)
            className={styles.logoImage} // Kelas baru untuk styling jika perlu (misal, efek hover)
          />
          <span className={styles.logoTitle}>Lumbung Kata</span>
        </Link>
        <nav className={styles.nav}>
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={styles.themeToggle}
          >
            {theme === 'dark' ? 
              <SunIcon style={{width: '22px', height: '22px'}}/> : 
              <MoonIcon style={{width: '22px', height: '22px'}}/>
            }
          </button>
        </nav>
      </div>
    </header>
  );
}