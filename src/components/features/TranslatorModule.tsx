// src/components/features/TranslatorModule.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { GlobeAltIcon, ClipboardIcon, XCircleIcon, ArrowsRightLeftIcon } from '@/components/icons';
import styles from './TranslatorModule.module.scss';

// Daftar bahasa yang lebih komprehensif (subset dari dukungan Azure)
// Nama bahasa dalam format "Nama Lokal (Nama Inggris)" untuk kemudahan
const comprehensiveLanguagesList = [
  // Bahasa Utama & Internasional
  { code: 'id', name: 'Indonesia (Indonesian)' },
  { code: 'en', name: 'Inggris (English)' },
  { code: 'es', name: 'Spanyol (Español)' },
  { code: 'fr', name: 'Prancis (Français)' },
  { code: 'de', name: 'Jerman (Deutsch)' },
  { code: 'ja', name: 'Jepang (日本語)' },
  { code: 'ko', name: 'Korea (한국어)' },
  { code: 'zh-Hans', name: 'Mandarin (Sederhana)' },
  { code: 'ar', name: 'Arab (العربية)' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'ru', name: 'Rusia (Русский)' },
  { code: 'pt', name: 'Portugis (Português)' },
  { code: 'it', name: 'Italia (Italiano)' },
  { code: 'nl', name: 'Belanda (Nederlands)' },
  { code: 'sv', name: 'Swedia (Svenska)' },
  { code: 'tr', name: 'Turki (Türkçe)' },
  { code: 'vi', name: 'Vietnam (Tiếng Việt)' },
  { code: 'th', name: 'Thailand (ไทย)' },
  { code: 'ms', name: 'Melayu (Bahasa Melayu)' }, // Penting untuk regional

  // --- BAHASA DAERAH INDONESIA ---
  // (Pastikan kode ini sesuai dengan yang didukung Azure Translator jika ada dukungan spesifik)
  // Jika tidak ada kode spesifik di Azure, terjemahan mungkin melalui Bahasa Indonesia atau Melayu.
  { code: 'ace', name: 'Aceh (Bahsa Acèh)' },
  { code: 'ban', name: 'Bali (Basa Bali)' },
  { code: 'bbc', name: 'Batak Toba (Batak Toba)' }, // Kode ISO 639-3
  // Untuk Batak lain, Azure mungkin tidak membedakan secara spesifik, seringkali digabung ke 'id' atau 'ms'
  // { code: 'btk', name: 'Batak (Umum)' }, // Kode umum, mungkin tidak spesifik di Azure
  { code: 'bug', name: 'Bugis (Basa Ugi)' },
  { code: 'gor', name: 'Gorontalo (Bahasa Hulontalo)' },
  { code: 'jv', name: 'Jawa (Basa Jawa)' },
  { code: 'mad', name: 'Madura (Bhâsa Madhurâ)' },
  { code: 'mak', name: 'Makassar (Basa Mangkasara)' },
  { code: 'min', name: 'Minangkabau (Baso Minang)' },
  { code: 'nij', name: 'Ngaju (Dayak Ngaju)' }, // Dayak Ngaju, Kalimantan Tengah
  { code: 'sas', name: 'Sasak (Base Sasak)' }, // Lombok
  { code: 'su', name: 'Sunda (Basa Sunda)' },
  // Tambahkan bahasa daerah lain dari 37 provinsi jika Anda menemukan kode yang didukung Azure
  // Ini adalah contoh representatif, menambahkan "seluruhnya" akan sangat panjang
  // dan bergantung pada ketersediaan model terjemahan di Azure.

  // --- BAHASA DUNIA LAINNYA (Contoh dari daftar sebelumnya) ---
  { code: 'af', name: 'Afrikaans (Afrikaans)' },
  { code: 'sq', name: 'Albania (Shqip)' },
  { code: 'am', name: 'Amharik (አማርኛ)' },
  { code: 'hy', name: 'Armenia (Հայերեն)' },
  { code: 'az', name: 'Azerbaijan (Azərbaycan)' },
  { code: 'eu', name: 'Basque (Euskara)' },
  { code: 'be', name: 'Belarusia (Беларуская)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'bs', name: 'Bosnia (Bosanski)' },
  { code: 'bg', name: 'Bulgaria (Български)' },
  { code: 'ca', name: 'Katalan (Català)' },
  { code: 'ceb', name: 'Cebuano (Cebuano)' }, // Filipina
  { code: 'zh-Hant', name: 'Mandarin (Tradisional)' },
  { code: 'co', name: 'Korsika (Corsu)' },
  { code: 'hr', name: 'Kroasia (Hrvatski)' },
  { code: 'cs', name: 'Ceko (Čeština)' },
  { code: 'da', name: 'Denmark (Dansk)' },
  { code: 'dv', name: 'Divehi (Maladewa)' },
  { code: 'eo', name: 'Esperanto (Esperanto)' },
  { code: 'et', name: 'Estonia (Eesti)' },
  { code: 'fi', name: 'Finlandia (Suomi)' },
  { code: 'gl', name: 'Galisia (Galego)' },
  { code: 'ka', name: 'Georgia (ქართული)' },
  { code: 'el', name: 'Yunani (Ελληνικά)' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  { code: 'ht', name: 'Kreol Haiti (Kreyòl Ayisyen)' },
  { code: 'ha', name: 'Hausa (Hausa)' },
  { code: 'haw', name: 'Hawaii (Ōlelo Hawaiʻi)' },
  { code: 'he', name: 'Ibrani (עברית)' },
  { code: 'hu', name: 'Hungaria (Magyar)' },
  { code: 'is', name: 'Islandia (Íslenska)' },
  // ... (Anda bisa melanjutkan daftar bahasa dunia dari respons sebelumnya jika diperlukan)
].sort((a, b) => {
  if (a.code === 'id' && b.code !== 'id') return -1;
  if (b.code === 'id' && a.code !== 'id') return 1;
  if (a.code === 'en' && b.code !== 'en' && b.code !== 'id') return -1;
  if (b.code === 'en' && a.code !== 'en' && a.code !== 'id') return 1;
  return a.name.localeCompare(b.name);
});

const TranslatorModule: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>(''); // Ini untuk hasil terjemahan
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState<string>('id'); 
  const [targetLanguage, setTargetLanguage] = useState<string>('en'); 
  const [copySuccessInput, setCopySuccessInput] = useState<string>('');
  const [copySuccessOutput, setCopySuccessOutput] = useState<string>('');
  const outputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const availableLanguages = comprehensiveLanguagesList; 

  const clearNotificationsAndOutput = () => {
    setError(null);
    setCopySuccessInput('');
    setCopySuccessOutput('');
    setOutputText(''); // Pastikan output juga direset saat ganti bahasa atau clear input
  };

  const handleTranslate = async () => { 
    clearNotificationsAndOutput(); // Bersihkan output sebelumnya juga
    const currentSourceLangNameForError = availableLanguages.find(l => l.code === sourceLanguage)?.name.split(" (")[0] || sourceLanguage;
    if (!inputText.trim()) {
      setError(`Teks ${currentSourceLangNameForError} tidak boleh kosong.`); 
      return;
    }
    if (sourceLanguage === targetLanguage) {
        setError("Bahasa sumber dan target tidak boleh sama.");
        return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/translate', { // Pastikan API ini mengembalikan { translatedText: "..." }
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, sourceLanguage, targetLanguage }),
      });
      const data = await response.json();
      if (!response.ok) {
        // Jika error dari API kita, data.error atau data.details mungkin berisi pesan
        throw new Error(data.details || data.error || `Gagal menerjemahkan (status: ${response.status})`);
      }
      if (data.translatedText) { // Pastikan properti ini ada di respons API
        setOutputText(data.translatedText);
      } else {
        throw new Error("Format respons terjemahan tidak sesuai.");
      }
    } catch (err) {
      let msg = 'Gagal menerjemahkan. Periksa koneksi atau coba bahasa lain.';
      if (err instanceof Error) msg = err.message; else if (typeof err === 'string') msg = err;
      setError(msg); console.error("Translation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk membersihkan notifikasi copy dan error saja (tidak outputText)
  const clearNotifications = () => {
    setError(null);
    setCopySuccessInput('');
    setCopySuccessOutput('');
  };

  const handleCopyToClipboard = (textToCopy: string, type: 'input' | 'output') => { 
    clearNotifications(); // Bersihkan notifikasi lain sebelum menampilkan yang baru
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => { 
          if (type === 'input') {
            setCopySuccessInput("Teks asal disalin!");
            setTimeout(() => setCopySuccessInput(''), 2000);
          } else {
            setCopySuccessOutput("Teks terjemahan disalin!");
            setTimeout(() => setCopySuccessOutput(''), 2000);
          }
        })
        .catch(err => { 
          console.error("Copy error:", err); 
          setError("Gagal menyalin teks."); 
          setTimeout(() => setError(null), 3000); 
        });
    }
  };

  const handleClearInput = () => { 
    setInputText(''); 
    clearNotificationsAndOutput(); 
    inputTextAreaRef.current?.focus();
  };

  const handleSwapLanguages = () => {
    if (sourceLanguage === targetLanguage || isLoading) return;
    const tempSource = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempSource);
    // Tukar teks hanya jika outputText ada (berarti inputText sebelumnya sudah diterjemahkan)
    if(outputText) {
        setInputText(outputText); 
        setOutputText(inputText); // Ini akan dikosongkan atau diisi ulang oleh terjemahan baru
    } else if (inputText) { // Jika output kosong tapi input ada, pindahkan input ke output (untuk ditukar)
        setOutputText(inputText);
        setInputText(''); // Input dikosongkan, siap untuk teks bahasa baru
    }
    clearNotifications();
  };

  const currentSourceLanguageName = availableLanguages.find(l => l.code === sourceLanguage)?.name.split(" (")[0] || sourceLanguage;
  const currentTargetLanguageName = availableLanguages.find(l => l.code === targetLanguage)?.name.split(" (")[0] || targetLanguage;
  
  if (!isMounted) { 
    return (
      <div className={styles.translatorCard}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <GlobeAltIcon className={styles.icon} style={{width: '28px', height: '28px'}}/>
          </div>
          <div>
            <h2 className={styles.title}>Penerjemah Global & Nusantara</h2>
            <p className={styles.subtitle}>Memuat modul penerjemah...</p>
          </div>
        </div>
        <div className={styles.formBody}>
          <div style={{textAlign: 'center', padding: '2rem'}}>
            <svg className={styles.loadingSpinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="40" height="40">
              <circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div>Memuat...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.translatorCard}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
            <GlobeAltIcon className={styles.icon} style={{width: '28px', height: '28px'}}/>
        </div>
        <div>
            <h2 className={styles.title}>Penerjemah Global & Nusantara</h2>
            <p className={styles.subtitle}>Terjemahkan Antar Bahasa dengan Mudah</p>
        </div>
      </div>
      
      <div className={styles.formBody}>
        <div className={styles.languageSelectors}>
            <div>
                <label htmlFor="sourceLang" className={styles.formLabel}>Dari Bahasa:</label>
                <select 
                    id="sourceLang" 
                    value={sourceLanguage} 
                    onChange={(e) => { setSourceLanguage(e.target.value); clearNotificationsAndOutput(); }}
                    className={styles.formSelect}
                >
                    {availableLanguages.map(lang => (
                      <option key={`source-${lang.code}`} value={lang.code}>{lang.name}</option>
                    ))}
                </select>
            </div>
            
            <button 
                onClick={handleSwapLanguages} 
                className={styles.swapButton} 
                title="Tukar Bahasa" 
                aria-label="Tukar Bahasa"
                disabled={isLoading}
            >
                <ArrowsRightLeftIcon style={{width: '20px', height: '20px'}}/>
            </button>
            
             <div>
                <label htmlFor="targetLang" className={styles.formLabel}>Ke Bahasa:</label>
                <select 
                    id="targetLang" 
                    value={targetLanguage} 
                    onChange={(e) => { setTargetLanguage(e.target.value); clearNotificationsAndOutput(); }}
                    className={styles.formSelect}
                >
                    {availableLanguages.map(lang => (
                      <option key={`target-${lang.code}`} value={lang.code}>{lang.name}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Tata Letak Dua Kolom untuk Input dan Output */}
        <div className={styles.translationGrid}>
          {/* Kolom Input Teks Asal */}
          <div className={styles.gridColumn}>
            <div className={styles.inputHeader}>
              <label htmlFor="inputTextTranslator" className={styles.formLabel}>
                Teks Asal ({currentSourceLanguageName}):
              </label>
              <div className={styles.columnActions}>
                {inputText && (
                  <button onClick={handleClearInput} className={`${styles.actionButtonSmall} ${styles.clearButton}`} title="Bersihkan teks input">
                    <XCircleIcon style={{width:'16px', height:'16px'}}/> Bersihkan
                  </button>
                )}
                {inputText && (
                  <button onClick={() => handleCopyToClipboard(inputText, 'input')} className={`${styles.actionButtonSmall} ${styles.copyButton}`} title="Salin teks asal">
                    <ClipboardIcon style={{width:'16px', height:'16px'}}/> Salin
                  </button>
                )}
              </div>
            </div>
            <textarea
              id="inputTextTranslator"
              ref={inputTextAreaRef}
              rows={8} 
              className={styles.formTextarea}
              value={inputText}
              onChange={(e) => { setInputText(e.target.value); clearNotifications(); }}
              placeholder={`Masukkan teks ${currentSourceLanguageName}...`}
            />
            {copySuccessInput && <p role="status" className={`${styles.notificationInline} ${styles.success}`}>{copySuccessInput}</p>}
          </div>

          {/* Kolom Output Hasil Terjemahan */}
          <div className={styles.gridColumn}>
            <div className={styles.inputHeader}>
              <label htmlFor="outputTextTranslator" className={styles.formLabel}>
                Hasil Terjemahan ({currentTargetLanguageName}):
              </label>
              {outputText && !isLoading && !error && ( // Hanya tampilkan tombol copy jika ada output, tidak loading, dan tidak error
                <button onClick={() => handleCopyToClipboard(outputText, 'output')} className={`${styles.actionButtonSmall} ${styles.copyButton}`} title="Salin hasil terjemahan">
                  <ClipboardIcon style={{width:'16px', height:'16px'}}/> Salin
                </button>
              )}
            </div>
            <textarea
              id="outputTextTranslator"
              ref={outputTextAreaRef}
              rows={8} 
              readOnly
              className={`${styles.formTextarea} ${styles.readOnlyTextarea}`}
              value={isLoading ? "Menerjemahkan..." : (error ? "" : outputText)} // Jika error, kosongkan output
              placeholder={isLoading ? "" : "Hasil terjemahan akan muncul di sini..."}
            />
            {copySuccessOutput && <p role="status" className={`${styles.notificationInline} ${styles.success}`}>{copySuccessOutput}</p>}
          </div>
        </div>
        {/* Akhir Tata Letak Dua Kolom */}

        <button
          onClick={handleTranslate}
          disabled={isLoading || !inputText.trim() || sourceLanguage === targetLanguage}
          className={`${styles.actionButton} ${styles.primary}`}
        >
          {isLoading ? ( 
            <>
              <svg className={styles.loadingSpinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>Menerjemahkan...</span>
            </>
          ) : ( 
            <> <GlobeAltIcon style={{width: '20px', height: '20px'}}/> <span>Terjemahkan</span></> 
          )}
        </button>

        {error && <p role="alert" className={`${styles.notification} ${styles.error}`}>{error}</p>}
        {/* Notifikasi sukses copy sudah inline di bawah masing-masing textarea */}
      </div>
    </div>
  );
};
export default TranslatorModule;