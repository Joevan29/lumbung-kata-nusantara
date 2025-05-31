// src/components/layout/Footer.tsx
import Link from "next/link";
import { InfoIcon } from "@/components/icons"; // Pastikan path ini benar
import styles from "./Footer.module.scss"; // Pastikan file SCSS ini ada dan benar

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.infoLine}>
            {/* Pastikan ikon bisa menerima className atau style untuk ukuran */}
            <InfoIcon className={styles.infoIcon} style={{width: '16px', height: '16px'}}/> 
            <span>ElevAIte with Dicoding Hackathon 2025</span>
        </div>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Lumbung Kata Nusantara.
        </p>
        <p className={styles.sdgText}>
          Dibangun untuk <span>SDG 4: Pendidikan Berkualitas</span>.
        </p>
        
        {/* Wrapper untuk menengahkan link GitHub */}
        <div className={styles.githubLinkWrapper}> 
          <Link 
            href="https://github.com/Joevan29" // Link GitHub Anda sudah benar
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.githubLink}
          >
            Lihat Kode di GitHub
          </Link>
        </div>

      </div>
    </footer>
  );
}