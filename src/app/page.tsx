// src/app/page.tsx
import TranslatorModule from "@/components/features/TranslatorModule";
import WordOfTheDayModule from "@/components/features/WordOfTheDayModule";
import MiniQuizModule from "@/components/features/MiniQuizModule";
import EssentialPhrasesModule from "@/components/features/EssentialPhrasesModule";
import InteractiveStoryModule from "@/components/features/InteractiveStoryModule";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";

const HeroLogoDisplay = () => (
  <div className={styles.heroLogoContainer}>
    <Image
      src="/logo/bahasa.png" // PASTIKAN PATH INI BENAR
      alt="Logo Lumbung Kata Nusantara"
      width={352} // COBA PERBESAR NILAI INI (misalnya dari 144 ke 192 atau 200)
      height={360} // SESUAIKAN TINGGI INI agar proporsional dengan lebar baru
      priority
      className={styles.heroLogoImage} 
    />
  </div>
);

export default function HomePage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={`main-container ${styles.heroContent}`}>
            <HeroLogoDisplay />
            <h1 className={styles.heroTitle}>
              Dari Indonesia, <span>Menjangkau Dunia</span>!
            </h1>
            <p className={`${styles.heroSubtitle} lead`}>
              Lumbung Kata menghubungkan Bahasa Indonesia dengan berbagai bahasa dunia, sambil tetap melestarikan kekayaan bahasa daerah Nusantara. Solusi cerdas untuk pendidikan dan pemahaman lintas budaya.
            </p>
            <Link href="#main-features" className={`${styles.ctaButton} btn-primary`}>
              Mulai Sekarang
            </Link>
        </div>
      </section>

      {/* Features Section */}
      <div id="main-features" className={`main-container ${styles.featuresSection}`}>
        <h2 className={styles.sectionTitle}>Jelajahi Fitur Kami</h2>
        
        <div className={styles.featuresGrid}>
          <div className={`${styles.moduleItem} ${styles.translatorItem} animate-slide-up`} style={{animationDelay: '0.1s'}}>
            <TranslatorModule /> {/* Modul ini sudah mendukung terjemahan global */}
          </div>
          
          {/* Modul-modul dengan nuansa Indonesia tetap penting */}
          <div className={`${styles.moduleItem} ${styles.wordOfTheDayItem} animate-slide-up`} style={{animationDelay: '0.2s'}}>
            <WordOfTheDayModule />
          </div>
          <div className={`${styles.moduleItem} ${styles.essentialPhrasesItem} animate-slide-up`} style={{animationDelay: '0.3s'}}>
             <EssentialPhrasesModule />
          </div>
          <div className={`${styles.moduleItem} ${styles.miniQuizItem} animate-slide-up`} style={{animationDelay: '0.4s'}}>
            <MiniQuizModule />
          </div>
          <div className={`${styles.moduleItem} ${styles.interactiveStoryItem} animate-slide-up`} style={{animationDelay: '0.5s'}}>
            <InteractiveStoryModule />
          </div>
        </div>
      </div>
      
      {/* SDG Section */}
      <section className={styles.sdgSection}>
        <div className="main-container animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h2 className={styles.sdgTitle}>
            Misi Kami: <span>Pendidikan Berkualitas & Pemahaman Global</span>
          </h2>
          <p className={styles.sdgDescription}>
            Lumbung Kata Nusantara berkomitmen mendukung <span>SDG 4: Pendidikan Berkualitas</span>. Kami percaya bahwa akses mudah terhadap pemahaman bahasa adalah kunci untuk pendidikan yang inklusif dan pemahaman lintas budaya yang lebih baik.
          </p>
        </div>
      </section>
    </div>
  );
}