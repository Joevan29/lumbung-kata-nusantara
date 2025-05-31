// src/components/features/EssentialPhrasesModule.tsx
"use client";
import React, { useState, useEffect } from 'react';
import styles from './EssentialPhrasesModule.module.scss'; // Impor SCSS Module
import { ChatBubbleIcon } from '@/components/icons'; // Pastikan path impor ikon benar

interface Phrase {
  id: string;
  language: string; 
  phrase_local: string;
  phrase_id: string;
  category?: string; 
}

// Contoh Data Statis (Untuk MVP, idealnya dari API atau localStorage)
const DUMMY_PHRASES: Phrase[] = [
  { id: 'jv1', language: 'Jawa', phrase_local: 'Sugeng rawuh', phrase_id: 'Selamat datang', category: 'Salam Umum' },
  { id: 'su1', language: 'Sunda', phrase_local: 'Wilujeng sumping', phrase_id: 'Selamat datang', category: 'Salam Umum' },
  { id: 'jv2', language: 'Jawa', phrase_local: 'Pinten regine?', phrase_id: 'Berapa harganya?', category: 'Bertanya Harga' },
  { id: 'su2', language: 'Sunda', phrase_local: 'Sabaraha hargana?', phrase_id: 'Berapa harganya?', category: 'Bertanya Harga' },
  { id: 'jv3', language: 'Jawa', phrase_local: 'Kulo badhe sinau', phrase_id: 'Saya mau belajar', category: 'Pendidikan' },
  { id: 'su3', language: 'Sunda', phrase_local: 'Abdi hoyong diajar', phrase_id: 'Saya mau belajar', category: 'Pendidikan' },
  { id: 'min1', language: 'Minangkabau', phrase_local: 'Ba\'a kabanyo?', phrase_id: 'Apa kabar?', category: 'Sapaan' },
  { id: 'ban1', language: 'Bali', phrase_local: 'Om Swastiastu', phrase_id: 'Salam (semoga dalam keadaan baik)', category: 'Salam Umum' },
];

const EssentialPhrasesModule: React.FC = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true); // Tandai bahwa komponen sudah di-mount di client
    // Simulasi pengambilan data
    setIsLoading(true);
    setTimeout(() => {
      setPhrases(DUMMY_PHRASES); // Anda bisa mengganti ini dengan fetch API jika perlu
      setIsLoading(false);
    }, 300); // Sedikit delay untuk efek loading
  }, []);

  // Placeholder sederhana jika belum mounted (untuk menghindari hydration error jika ada dependensi client)
  if (!isMounted) { 
    return (
        <div className={`${styles.phrasesCard} ${styles.loadingState}`}>
            {/* Skeleton sederhana untuk loading awal */}
            <div className={styles.skeletonHeader}></div>
            <div className={styles.skeletonContent}></div>
            <div className={styles.skeletonContent}></div>
        </div>
    );
  }

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
        <p>Belum ada frasa untuk ditampilkan saat ini.</p>
      </div>
    );
  }

  return (
    <div className={styles.phrasesCard}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <ChatBubbleIcon 
            className={styles.icon} 
            style={{width: '28px', height: '28px'}} // Atur ukuran ikon via style prop
          />
        </div>
        <div>
            <h2 className={styles.title}>Frasa Penting Nusantara</h2>
            <p className={styles.subtitle}>Pelajari ungkapan sehari-hari dari berbagai daerah</p>
        </div>
      </div>

      <div className={styles.listContainer}>
        {phrases.map(p => (
          <div key={p.id} className={styles.phraseItem}>
            <div className={styles.phraseHeader}>
                <span className={styles.phraseLang}>{p.language}</span>
                {p.category && <span className={styles.phraseCategory}>{p.category}</span>}
            </div>
            <p className={styles.phraseTextLocal}>{p.phrase_local}</p>
            <p className={styles.phraseTextId}>{p.phrase_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EssentialPhrasesModule;
