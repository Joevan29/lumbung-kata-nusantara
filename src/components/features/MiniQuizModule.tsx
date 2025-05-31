// src/components/features/MiniQuizModule.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { QuestionMarkIcon } from '@/components/icons';
import styles from './MiniQuizModule.module.scss';

interface QuizQuestion { 
  id: number; 
  question: string; 
  options: string[]; 
  correctAnswer: string; 
  explanation?: string;
  language: string;
}

const quizData: QuizQuestion[] = [
  // ... (DATA KUIS LENGKAP DARI RESPONS SEBELUMNYA)
  { id: 1, language: "Jawa", question: "Kata 'mangan' dalam Bahasa Jawa artinya...", options: ["Minum", "Makan", "Tidur", "Pergi"], correctAnswer: "Makan", explanation: "'Mangan' adalah kata kerja yang berarti melakukan aktivitas makan."},
  { id: 2, language: "Jawa", question: "'Sugeng rawuh' adalah ucapan untuk...", options: ["Selamat tinggal", "Selamat tidur", "Selamat datang", "Selamat pagi"], correctAnswer: "Selamat datang", explanation: "'Sugeng rawuh' berarti 'selamat datang' dalam Bahasa Jawa krama."},
  { id: 3, language: "Jawa", question: "Apa arti dari 'sekolah' dalam Bahasa Jawa ngoko?", options: ["Pasar", "Kantor", "Sekolah", "Omah"], correctAnswer: "Sekolah", explanation: "Kata 'sekolah' diserap dan digunakan juga dalam Bahasa Jawa."},
  { id: 4, language: "Sunda", question: "Dalam Bahasa Sunda, 'punten' biasanya digunakan untuk...", options: ["Meminta tolong", "Menyapa teman", "Meminta izin/permisi", "Mengucapkan terima kasih"], correctAnswer: "Meminta izin/permisi", explanation: "'Punten' adalah ungkapan sopan untuk permisi atau meminta maaf."},
  { id: 5, language: "Sunda", question: "Bahasa Indonesia dari 'sare' (Bahasa Sunda) adalah...", options: ["Berjalan", "Membaca", "Bermain", "Tidur"], correctAnswer: "Tidur", explanation: "'Sare' adalah kata dalam Bahasa Sunda yang berarti tidur."},
  { id: 6, language: "Sunda", question: "'Hatur nuhun' artinya adalah...", options: ["Selamat pagi", "Apa kabar?", "Terima kasih", "Maaf"], correctAnswer: "Terima kasih", explanation: "'Hatur nuhun' adalah ungkapan terima kasih dalam Bahasa Sunda."},
  { id: 7, language: "Minangkabau", question: "Ungkapan 'lai sehat?' dalam Bahasa Minang berarti...", options: ["Mau kemana?", "Siapa namamu?", "Apa kabar?/Sehat?", "Sudah makan?"], correctAnswer: "Apa kabar?/Sehat?", explanation: "'Lai sehat?' adalah cara bertanya kabar dalam Bahasa Minang."},
  { id: 8, language: "Minangkabau", question: "Kata 'lamak bana' sering diucapkan untuk menyatakan...", options: ["Sangat mahal", "Sangat jauh", "Sangat enak", "Sangat cantik"], correctAnswer: "Sangat enak", explanation: "'Lamak bana' berarti 'enak sekali' atau 'lezat sekali'."},
  { id: 9, language: "Bali", question: "'Rahajeng semeng' adalah salam yang diucapkan pada waktu...", options: ["Siang hari", "Sore hari", "Malam hari", "Pagi hari"], correctAnswer: "Pagi hari", explanation: "'Rahajeng semeng' adalah ucapan selamat pagi dalam Bahasa Bali."},
  { id: 10, language: "Bali", question: "Apa arti 'suksma' dalam Bahasa Bali?", options: ["Maaf", "Tolong", "Terima kasih", "Permisi"], correctAnswer: "Terima kasih", explanation: "'Suksma' adalah ungkapan terima kasih dalam Bahasa Bali."},
  { id: 11, language: "Batak Toba", question: "'Horas!' adalah salam khas Batak yang berarti...", options: ["Selamat bekerja", "Salam sejahtera/Sukacita", "Selamat jalan", "Mohon bantuan"], correctAnswer: "Salam sejahtera/Sukacita", explanation: "'Horas' adalah salam umum yang penuh makna positif."},
  { id: 12, language: "Batak Toba", question: "Kata 'mangan' dalam Bahasa Batak Toba mirip dengan Bahasa Jawa, artinya...", options: ["Minum", "Makan", "Berbicara", "Datang"], correctAnswer: "Makan", explanation: "Seperti dalam Bahasa Jawa, 'mangan' di Bahasa Batak Toba juga berarti 'makan'."},
];

const shuffleArray = (array: QuizQuestion[]): QuizQuestion[] => { // Perbaiki tipe 'any[]' menjadi 'QuizQuestion[]'
  let currentIndex = array.length, randomIndex;
  const newArray = [...array]; // Buat salinan agar tidak memodifikasi array asli secara langsung
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
};

const MiniQuizModule: React.FC = () => {
  const [shuffledQuizData, setShuffledQuizData] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    // Tambahkan sedikit delay untuk efek loading jika diinginkan, atau langsung set
    // setTimeout(() => { // Hapus setTimeout jika tidak perlu delay
      setShuffledQuizData(shuffleArray([...quizData])); 
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsLoading(false);
    // }, 100); // Delay kecil untuk UX
  }, []);

  const currentQuestion = shuffledQuizData[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (showResult || isLoading) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return; // Pastikan currentQuestion ada
    
    // setIsLoading(true); // Tidak perlu isLoading di sini karena prosesnya cepat
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    setShowResult(true);
    // setIsLoading(false);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < shuffledQuizData.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      alert(`Kuis Selesai! Skor Anda: ${score} dari ${shuffledQuizData.length} soal.`);
      // Reset dan acak lagi untuk sesi berikutnya
      setIsLoading(true);
      // setTimeout(() => { // Hapus setTimeout jika tidak perlu delay
        setShuffledQuizData(shuffleArray([...quizData]));
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsLoading(false);
      // }, 100);
    }
  };
  
  if (isLoading || !currentQuestion) {
    return (
      <div className={`${styles.quizCard} ${styles.loadingState}`}>
        <p>Memuat kuis seru...</p>
      </div>
    );
  }

  return (
    <div className={styles.quizCard}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <QuestionMarkIcon className={styles.icon} style={{width: '24px', height: '24px'}} />
        </div>
        <div>
          <h2 className={styles.title}>Kuis Kilat Bahasa</h2>
          {currentQuestion && <p className={styles.subtitleQuiz}>Bahasa: {currentQuestion.language}</p>}
        </div>
      </div>
      
      <div className={styles.questionInfo}>
        <p className={styles.questionCount}>Pertanyaan {currentQuestionIndex + 1}/{shuffledQuizData.length}:</p>
        <p className={styles.questionText}>{currentQuestion.question}</p>
      </div>

      <div className={styles.optionsList}>
        {currentQuestion.options.map((option, index) => ( // Tambahkan index untuk key yang lebih unik jika opsi bisa sama
          <button
            key={`${currentQuestion.id}-option-${index}`} // Key yang lebih unik
            onClick={() => handleAnswerSelect(option)}
            disabled={showResult || isLoading}
            className={`
              ${styles.optionButton}
              ${selectedAnswer === option && !showResult ? styles.selected : ''}
              ${showResult && option === currentQuestion.correctAnswer ? styles.correct : ''}
              ${showResult && selectedAnswer === option && option !== currentQuestion.correctAnswer ? styles.incorrect : ''}
              ${showResult && option !== currentQuestion.correctAnswer && option !== selectedAnswer ? styles.disabledOption : ''} 
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`${styles.resultMessage} ${selectedAnswer === currentQuestion.correctAnswer ? styles.correct : styles.incorrect}`}>
          <p>{selectedAnswer === currentQuestion.correctAnswer ? "Jawaban Benar! 🎉" : "Jawaban Kurang Tepat."}</p>
          {currentQuestion.explanation && <p className={styles.explanation}>{currentQuestion.explanation}</p>}
        </div>
      )}

      <div className={styles.actionsWrapper}>
        {!showResult ? (
          <button 
            onClick={handleSubmitAnswer} 
            disabled={!selectedAnswer || isLoading}
            className={`${styles.actionButton} ${styles.secondary} ${(isLoading && !selectedAnswer) ? styles.disabledButtonFix : ''}`}
          >
            {isLoading && selectedAnswer ? 'Memeriksa...' : 'Cek Jawaban'}
          </button>
        ) : (
          <button 
            onClick={handleNextQuestion}
            disabled={isLoading} // Tambahkan disabled saat loading reset
            className={`${styles.actionButton} ${styles.primary}`}
          >
            {isLoading ? 'Memuat...' : (currentQuestionIndex < shuffledQuizData.length - 1 ? "Pertanyaan Berikutnya →" : "Selesai & Ulangi Kuis ↺")}
          </button>
        )}
      </div>
    </div>
  );
};
export default MiniQuizModule;