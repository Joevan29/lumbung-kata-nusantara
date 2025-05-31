// src/components/features/EssentialPhrasesModule.tsx
"use client";
import React, { useState, useEffect } from 'react';
import styles from './EssentialPhrasesModule.module.scss';
// Ganti dengan ikon yang sesuai, misalnya ikon percakapan atau buku catatan
const ChatBubbleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.543-3.091c-.95.16-1.953.233-3 .233H8.25c-1.107 0-2.08-.93-2.08-2.086V12.73c0-.95.58-1.797 1.423-2.072M15.75 14.25L18 12V7.5c0-1.107-.932-2.08-2.086-2.08H6.75C5.643 5.42 4.71 6.393 4.71 7.5V12m11.04-7.89c.23-.083.47-.15.72-.213M4.71 5.42c-.23.083-.47.15-.72.213M12 9.75h.008v.008H12V9.75z" /></svg> );


interface Phrase {
  id: string;
  language: string; // e.g., "Jawa", "Sunda"
  phrase_local: string;
  phrase_id: string;
  category?: string; // e.g., "Salam", "Pasar", "Sekolah"
}

// Contoh Data Statis (Untuk MVP, idealnya dari API atau localStorage)
const DUMMY_PHRASES: Phrase[] = [
  { id: 'jv1', language: 'Jawa', phrase_local: 'Sugeng rawuh', phrase_id: 'Selamat datang', category: 'Salam' },
  { id: 'su1', language: 'Sunda', phrase_local: 'Wilujeng sumping', phrase_id: 'Selamat datang', category: 'Salam' },
  { id: 'jv2', language: 'Jawa', phrase_local: 'Pinten regine?', phrase_id: 'Berapa harganya?', category: 'Pasar' },
  { id: 'su2', language: 'Sunda', phrase_local: 'Sabaraha hargana?', phrase_id: 'Berapa harganya?', category: 'Pasar' },
  { id: 'jv3', language: 'Jawa', phrase_local: 'Kulo badhe sinau', phrase_id: 'Saya mau belajar', category: 'Sekolah' },
];

const EssentialPhrasesModule: React.FC = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [filterCategory, setFilterCategory] = useState<string | null>(null); // Untuk filter nanti

  useEffect(() => {
    // Simulasi pengambilan data
    setIsLoading(true);
    setTimeout(() => {
      setPhrases(DUMMY_PHRASES);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className={`${styles.phrasesCard} ${styles.loadingState}`}>
        <p>Memuat frasa penting...</p>
      </div>
    );
  }

  if (phrases.length === 0) {
     return (
      <div className={`${styles.phrasesCard} ${styles.emptyState}`}>
        <p>Belum ada frasa untuk ditampilkan.</p>
      </div>
    );
  }

  return (
    <div className={styles.phrasesCard}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <ChatBubbleIcon className={styles.icon} />
        </div>
        <h2 className={styles.title}>Frasa Penting Sehari-hari</h2>
      </div>

      {/* Nanti bisa ditambahkan filter berdasarkan bahasa atau kategori */}
      {/* <div className="mb-4"> ... filter UI ... </div> */}

      <div className="space-y-3"> {/* Menggunakan class Tailwind untuk spasi jika mudah */}
        {phrases.map(p => (
          <div key={p.id} className={styles.phraseItem}>
            <p className={styles.phraseLang}>{p.language} - {p.category}</p>
            <p className={styles.phraseText}>{p.phrase_local}</p>
            <p className={styles.phraseText} style={{color: 'var(--brand-muted)'}}>{p.phrase_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EssentialPhrasesModule;