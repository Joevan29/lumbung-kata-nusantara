// src/components/features/WordOfTheDayModule.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { BookOpenIcon } from '@/components/icons';
import styles from './WordOfTheDayModule.module.scss';

interface WordEntry { lang: string; word: string; meaning: string; example?: string; }
const words: WordEntry[] = [
  { lang: "Jawa", word: "Sugeng enjing", meaning: "Selamat pagi", example: "\"Sugeng enjing, Bu Guru!\" sapa Budi." },
  { lang: "Sunda", word: "Kumaha damang?", meaning: "Bagaimana kabarnya?", example: "Ujang naros, \"Kumaha damang, Pa?\"" },
  { lang: "Jawa", word: "Matur nuwun", meaning: "Terima kasih", example: "Siti ngucap, \"Matur nuwun atas bantuanna.\""},
  { lang: "Sunda", word: "Hatur nuhun", meaning: "Terima kasih", example: "\"Hatur nuhun pisan,\" walon Euis."},
  { lang: "Bali", word: "Rahajeng", meaning: "Selamat (umum)", example: "Made ngucap \"Rahajeng\" ka semeton."}
];

const WordOfTheDayModule: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<WordEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getNewWord = () => {
    setIsLoading(true);
    // Simulasi fetch data
    setTimeout(() => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * words.length);
      } while (currentWord && words[randomIndex].word === currentWord.word && words.length > 1);
      setCurrentWord(words[randomIndex]);
      setIsLoading(false);
    }, 300); // Delay untuk efek loading
  };

  useEffect(() => {
    getNewWord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && !currentWord) { // Tampilkan loading hanya jika currentWord belum ada
    return (
        <div className={`${styles.wordCard} ${styles.loadingState}`}>
            <p>Memuat kata inspirasi...</p>
        </div>
    );
  }
  
  if (!currentWord) { // Jika setelah loading tetap tidak ada kata
     return (
        <div className={`${styles.wordCard} ${styles.emptyState}`}>
            <p>Belum ada kata untuk hari ini.</p>
        </div>
    );
  }


  return (
    <div className={styles.wordCard}>
      <div>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <BookOpenIcon className={styles.icon} />
          </div>
          <h2 className={styles.title}>Kata Hari Ini <span>({currentWord.lang})</span></h2>
        </div>
        <div className={styles.content}>
          <p className={styles.word}>{currentWord.word}</p>
          <p className={styles.meaning}>
            <span>Artinya:</span> {currentWord.meaning}
          </p>
          {currentWord.example && (
            <p className={styles.example}>
              Contoh: &quot;{currentWord.example}&quot;
            </p>
          )}
        </div>
      </div>
      <button 
        onClick={getNewWord}
        className={styles.actionButton}
        disabled={isLoading}
      >
        {isLoading ? "Memuat..." : "Lihat Kata Lainnya"}
      </button>
    </div>
  );
};
export default WordOfTheDayModule;