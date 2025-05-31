// src/components/TranslationCard.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

// Ikon bisa diimpor dari library atau sebagai komponen SVG
const TranslateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3H7.5a3 3 0 01-3-3V7.5a3 3 0 013-3h7.5a3 3 0 013 3v1.875M10.5 21V3.375c0-.621.504-1.125 1.125-1.125h.375c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
);

const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125V7.5m0 10.5V12m0 0a2.25 2.25 0 00-2.25-2.25H7.5a2.25 2.25 0 00-2.25 2.25M12 7.5V12m0 0a2.25 2.25 0 01-2.25-2.25H7.5a2.25 2.25 0 01-2.25 2.25" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);


const TranslationCard: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState<string>('jv');
  const [copySuccess, setCopySuccess] = useState<string>('');
  const outputTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  const supportedLanguages = [
    { code: 'jv', name: 'Jawa' },
    { code: 'su', name: 'Sunda' },
    // { code: 'ban', name: 'Bali' },
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Teks tidak boleh kosong. Silakan masukkan teks yang ingin diterjemahkan.");
      setOutputText('');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutputText('');
    setCopySuccess('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, sourceLanguage: sourceLanguage, targetLanguage: 'id' }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || data.error || `Gagal menerjemahkan (status: ${response.status})`);
      }
      setOutputText(data.translatedText);
    } catch (err) {
      let errorMessage = 'Terjadi kesalahan saat mencoba menerjemahkan.';
      if (err instanceof Error) errorMessage = err.message;
      else if (typeof err === 'string') errorMessage = err;
      setError(errorMessage);
      console.error("Translation fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (outputText && outputTextAreaRef.current) {
      outputTextAreaRef.current.select(); // Pilih teks di textarea (baik untuk mobile)
      navigator.clipboard.writeText(outputText)
        .then(() => {
          setCopySuccess("Teks berhasil disalin!");
          setTimeout(() => setCopySuccess(''), 2000); // Hilangkan pesan setelah 2 detik
        })
        .catch(err => {
          console.error("Gagal menyalin teks:", err);
          setError("Gagal menyalin teks. Browser Anda mungkin tidak mendukung fitur ini.");
          setTimeout(() => setError(null), 3000);
        });
    }
  };
  
  const handleClearInput = () => {
    setInputText('');
    setOutputText('');
    setError(null);
    setCopySuccess('');
  }

  const currentLanguageName = supportedLanguages.find(l => l.code === sourceLanguage)?.name || sourceLanguage;

  if (!mounted) return null; // Hindari hydration mismatch untuk theme toggle

  return (
    <div className="w-full max-w-2xl p-6 sm:p-10 bg-white rounded-2xl shadow-card border border-slate-200 dark:bg-slate-800 dark:border-slate-700 relative">
      <button
        aria-label="Toggle Dark Mode"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className="flex flex-col items-center mb-8">
         <div className="p-3 bg-brand-primary/10 dark:bg-dark-brand-primary/10 rounded-full mb-3">
            <TranslateIcon />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-brand-primary dark:text-dark-brand-primary">
          Kamus Daerah Cendekia
        </h1>
        <p className="text-md text-brand-muted dark:text-dark-brand-muted mt-2 text-center max-w-md">
          Solusi cerdas menerjemahkan Bahasa Daerah ke Bahasa Indonesia, mendukung pendidikan inklusif di seluruh Nusantara.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="sourceLang" className="block text-sm font-semibold text-brand-text dark:text-dark-brand-text mb-1.5">
            Pilih Bahasa Sumber:
          </label>
          <select 
            id="sourceLang" 
            value={sourceLanguage} 
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl shadow-input text-brand-text focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-sm transition-colors bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-dark-brand-text dark:focus:ring-dark-brand-primary dark:focus:border-dark-brand-primary"
          >
            {supportedLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="inputText" className="block text-sm font-semibold text-brand-text dark:text-dark-brand-text">
              Teks Bahasa Daerah ({currentLanguageName}):
            </label>
            {inputText && (
              <button onClick={handleClearInput} className="text-xs text-brand-secondary dark:text-dark-brand-secondary hover:underline">
                Bersihkan
              </button>
            )}
          </div>
          <textarea
            id="inputText"
            rows={5}
            className="w-full p-3 border border-slate-300 rounded-xl shadow-input text-brand-text focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-sm transition-colors bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-dark-brand-text dark:focus:ring-dark-brand-primary dark:focus:border-dark-brand-primary resize-y min-h-[120px]"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ketik atau tempel teks Bahasa ${currentLanguageName} di sini...`}
          />
        </div>

        <button
          onClick={handleTranslate}
          disabled={isLoading}
          className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-150 ease-in-out disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:focus:ring-offset-dark-brand-light dark:bg-dark-brand-primary dark:hover:bg-dark-brand-primary-hover flex items-center justify-center gap-2 text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sedang Menerjemahkan...
            </>
          ) : (
            <>
              <TranslateIcon />
              Terjemahkan Sekarang
            </>
          )}
        </button>

        {error && <p role="alert" className="text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 p-3 rounded-lg text-sm mt-4 text-center shadow-sm">{error}</p>}
        {copySuccess && <p role="status" className="text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30 border border-green-300 dark:border-green-700/50 p-3 rounded-lg text-sm mt-4 text-center shadow-sm">{copySuccess}</p>}

        {outputText && !error && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="outputText" className="block text-sm font-semibold text-brand-text dark:text-dark-brand-text">
                Hasil Terjemahan (Bahasa Indonesia):
              </label>
              <button
                onClick={handleCopyToClipboard}
                className="text-xs text-brand-primary dark:text-dark-brand-primary hover:underline font-semibold flex items-center gap-1 p-1 rounded transition-colors"
                title="Salin teks hasil terjemahan"
              >
                <ClipboardIcon />
                Salin
              </button>
            </div>
            <textarea
              id="outputText"
              ref={outputTextAreaRef}
              rows={5}
              readOnly
              className="w-full p-3 border border-slate-300 rounded-xl bg-slate-100 text-brand-text text-sm cursor-default dark:bg-slate-700 dark:border-slate-600 dark:text-dark-brand-text resize-y min-h-[120px]"
              value={outputText}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationCard;