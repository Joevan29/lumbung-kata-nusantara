// src/components/features/InteractiveStoryModule.tsx
"use client";
import React, { useState, useEffect } from 'react'; // useEffect ditambahkan untuk simulasi loading
import styles from './InteractiveStoryModule.module.scss';
import { BookOpenIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';

interface StorySegment { local: string; id: string; }
interface Story {
  id: string;
  titleLocal: string;
  titleId: string;
  language: string;
  origin: string;
  segments: StorySegment[];
  moralValue?: string;
}

const DUMMY_STORIES: Story[] = [
  // ... (DATA CERITA LENGKAP DARI RESPONS SEBELUMNYA - 5 CERITA) ...
  { id: 'timunmas_jv', titleLocal: "Timun Mas", titleId: "Timun Emas", language: "Jawa", origin: "Jawa Tengah", segments: [ { local: "Ing jaman biyen, ana mbok randha sepuh sing kepengin banget duwe anak.", id: "Pada zaman dahulu, ada seorang janda tua yang sangat ingin memiliki anak." }, { local: "Dheweke banjur dedonga lan diparingi wiji timun dening buta ijo.", id: "Ia kemudian berdoa dan diberi biji mentimun oleh raksasa hijau." }, { local: "Buta ijo janji, menawa anake wis gedhe, arep dijaluk kanggo dipangan.", id: "Raksasa hijau berjanji, jika anaknya sudah besar, akan diminta untuk disantap." }, { local: "Wiji ditandur, dadi timun gedhe, lan ing njero ana bayi ayu jenenge Timun Mas.", id: "Biji ditanam, menjadi mentimun besar, dan di dalamnya ada bayi cantik bernama Timun Emas." }, { local: "Nalika Timun Mas dewasa, buta teka nagih janji. Timun Mas diwenehi gaman dening pertapa kanggo nglawan buta.", id: "Ketika Timun Mas dewasa, raksasa datang menagih janji. Timun Mas diberi senjata oleh pertapa untuk melawan raksasa." } ], moralValue: "Keberanian, kecerdikan, dan doa dapat mengatasi kesulitan dan kejahatan.", },
  { id: 'sangkuriang_su', titleLocal: "Sangkuriang", titleId: "Sangkuriang", language: "Sunda", origin: "Jawa Barat", segments: [ { local: "Kacaritakeun Sangkuriang, budak lalaki nu resep moro, indit ka leuweung jeung anjingna, Si Tumang.", id: "Dikisahkan Sangkuriang, seorang anak laki-laki yang suka berburu, pergi ke hutan bersama anjingnya, Si Tumang." }, { local: "Si Tumang teh sabenerna bapana, titisan dewa. Indungna, Dayang Sumbi, awet ngora.", id: "Si Tumang sebenarnya adalah ayahnya, titisan dewa. Ibunya, Dayang Sumbi, awet muda." }, { local: "Sangkuriang teu nyahoeun, tuluy maehan Si Tumang. Dayang Sumbi ambek, nakol Sangkuriang nepi ka aya tapakna.", id: "Sangkuriang tidak tahu, lalu membunuh Si Tumang. Dayang Sumbi marah, memukul Sangkuriang hingga ada bekas lukanya." }, { local: "Mangtaun-taun ti harita, Sangkuriang papanggih deui jeung Dayang Sumbi, tuluy bogoh. Dayang Sumbi apaleun eta teh anakna tina tapak raheutna.", id: "Bertahun-tahun kemudian, Sangkuriang bertemu lagi dengan Dayang Sumbi, lalu jatuh cinta. Dayang Sumbi tahu itu anaknya dari bekas lukanya." }, { local: "Pikeun nolak, Dayang Sumbi menta Sangkuriang nyieun parahu jeung situ sapeuting. Sangkuriang ampir hasil, tapi Dayang Sumbi ngagagalkeun ku cara nyieun suasana isuk-isuk.", id: "Untuk menolak, Dayang Sumbi meminta Sangkuriang membuat perahu dan danau dalam semalam. Sangkuriang hampir berhasil, tapi Dayang Sumbi menggagalkannya dengan membuat suasana seolah-olah pagi." }, { local: "Sangkuriang ambek, najong parahuna jadi Gunung Tangkuban Parahu.", id: "Sangkuriang marah, menendang perahunya menjadi Gunung Tangkuban Parahu." } ], moralValue: "Janganlah menuruti hawa nafsu dan amarah, serta hormatilah orang tua.", },
  { id: 'malinkundang_mn', titleLocal: "Malin Kundang", titleId: "Malin Kundang", language: "Minangkabau", origin: "Sumatera Barat", segments: [ { local: "[Teks Bahasa Minang 1] Malin Kundang anak nan durhako ka mandehnyo.", id: "Malin Kundang adalah anak yang durhaka kepada ibunya." }, { local: "[Teks Bahasa Minang 2] Duluinyo miskin, pai marantau, sudah tu jadi saudagar kayo.", id: "Dahulunya miskin, pergi merantau, kemudian menjadi saudagar kaya." }, { local: "[Teks Bahasa Minang 3] Sangkek pulang ka kampuang, inyo malu maaku mandehnyo nan tuo jo miskin.", id: "Ketika pulang ke kampung, ia malu mengakui ibunya yang tua dan miskin." }, { local: "[Teks Bahasa Minang 4] Mandehnyo sakik hati, lalu manyumpahi Malin jadi batu.", id: "Ibunya sakit hati, lalu menyumpahi Malin menjadi batu." } ], moralValue: "Hormatilah ibumu, jangan pernah melupakan jasa dan pengorbanannya.", },
  { id: 'rorojonggrang_jv', titleLocal: "Rara Jonggrang", titleId: "Roro Jonggrang", language: "Jawa", origin: "Yogyakarta/Jawa Tengah", segments: [ { local: "[Teks Bahasa Jawa 1] Bandung Bandawasa tresna marang Rara Jonggrang lan kersa ndadosaken garwa.", id: "Bandung Bondowoso jatuh cinta pada Roro Jonggrang dan ingin menikahinya." }, { local: "[Teks Bahasa Jawa 2] Rara Jonggrang gelem, nanging paring syarat: yasa sewu candi ing wekdal setunggal dalu.", id: "Roro Jonggrang bersedia, tetapi memberi syarat: membangun seribu candi dalam waktu satu malam." }, { local: "[Teks Bahasa Jawa 3] Bandung Bandawasa nyuwun pitulungan marang para jin. Candi meh rampung.", id: "Bandung Bondowoso meminta bantuan para jin. Candi hampir selesai." }, { local: "[Teks Bahasa Jawa 4] Rara Jonggrang ndhawuhi para prawan nutu pantun lan ngobong damen, supaya dikira wis esuk. Jin padha mlayu.", id: "Roro Jonggrang memerintahkan para perawan menumbuk padi dan membakar jerami, agar dikira sudah pagi. Para jin lari." }, { local: "[Teks Bahasa Jawa 5] Bandung Bandawasa duka lan Rara Jonggrang dipun sabda dados reca kaping sewu.", id: "Bandung Bondowoso marah dan Roro Jonggrang dikutuk menjadi arca keseribu." } ], moralValue: "Kecurangan akan membawa petaka, dan janji harus ditepati.", },
  { id: 'situ_bagendit_su', titleLocal: "Situ Bagendit", titleId: "Situ Bagendit", language: "Sunda", origin: "Jawa Barat", segments: [ { local: "[Teks Bahasa Sunda 1] Nyai Endit katelah jalma beunghar tapi koret pisan.", id: "Nyai Endit terkenal sebagai orang kaya tetapi sangat pelit." }, { local: "[Teks Bahasa Sunda 2] Hiji poe, aya aki-aki nu menta sedekah, tapi ku Nyai Endit diusir jeung dihina.", id: "Suatu hari, ada seorang kakek tua yang meminta sedekah, tetapi oleh Nyai Endit diusir dan dihina." }, { local: "[Teks Bahasa Sunda 3] Si aki-aki teh tuluy nancebkeun iteukna kana taneuh. Cai kaluar tarik pisan nepi ka ngeueum lembur jeung imah Nyai Endit.", id: "Kakek tua itu lalu menancapkan tongkatnya ke tanah. Air keluar sangat deras hingga menenggelamkan desa dan rumah Nyai Endit." }, { local: "[Teks Bahasa Sunda 4] Lembur eta jadi situ nu katelah Situ Bagendit.", id: "Desa itu menjadi danau yang terkenal dengan nama Situ Bagendit." } ], moralValue: "Janganlah menjadi orang yang kikir dan sombong, karena kekayaan tidak akan dibawa mati dan bisa mendatangkan malapetaka.", }
];

const InteractiveStoryModule: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]); // Awalnya kosong, diisi di useEffect
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulasi pengambilan data cerita
    setIsLoading(true);
    // setTimeout(() => { // Hapus timeout jika data langsung tersedia
      setStories(DUMMY_STORIES); // Langsung set data statis
      setCurrentStoryIndex(0); // Pastikan index mulai dari 0
      setIsLoading(false);
    // }, 300); // Delay kecil untuk efek loading
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  const currentStory = stories[currentStoryIndex];

  const handleNextStory = () => {
    if (stories.length === 0) return;
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
    setShowTranslation(true); // Reset tampilan terjemahan saat ganti cerita
  };

  const handlePrevStory = () => {
    if (stories.length === 0) return;
    setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
    setShowTranslation(true);
  };
  
  if (isLoading) {
    return (
      <div className={`${styles.storyCard} ${styles.loadingState}`}>
        <p>Memuat cerita rakyat...</p>
      </div>
    );
  }

  if (!currentStory || stories.length === 0) {
    return (
      <div className={`${styles.storyCard} ${styles.emptyState}`}>
        <p>Belum ada cerita untuk ditampilkan atau terjadi kesalahan.</p>
      </div>
    );
  }

  return (
    <div className={styles.storyCard}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <BookOpenIcon className={styles.icon} style={{width: '28px', height: '28px'}}/>
        </div>
        <div>
          <h2 className={styles.title}>Cerita Rakyat Nusantara</h2>
          <p className={styles.subtitle}>Belajar Bahasa dan Budaya dari {currentStory.origin}</p>
        </div>
      </div>

      <div className={styles.storyContent}>
        <h3 className={styles.storyTitle}>{currentStory.titleLocal} <span className={styles.storyLang}>({currentStory.language})</span></h3>
        {showTranslation && <h4 className={styles.storyTitleId}>{currentStory.titleId}</h4>}

        <div className={styles.storySegments}>
          {currentStory.segments.map((segment, index) => (
            <div key={`${currentStory.id}-segment-${index}`} className={styles.segmentPair}>
              <p className={styles.segmentLocal}>{segment.local}</p>
              {showTranslation && <p className={styles.segmentId}>{segment.id}</p>}
            </div>
          ))}
        </div>

        {currentStory.moralValue && (
            <p className={styles.moralValue}>
                <strong>Pesan Moral:</strong> {currentStory.moralValue}
            </p>
        )}
      </div>
      
      <div className={styles.controls}>
        <button onClick={() => setShowTranslation(!showTranslation)} className={styles.toggleButton}>
          {showTranslation ? "Sembunyikan" : "Tampilkan"} Terjemahan
        </button>
        {stories.length > 1 && (
            <div className={styles.navigationButtons}>
                <button onClick={handlePrevStory} className={styles.navButton} aria-label="Cerita Sebelumnya" title="Cerita Sebelumnya">
                    <ChevronLeftIcon style={{width: '20px', height: '20px'}} />
                </button>
                <span className={styles.storyCounter}>{currentStoryIndex + 1} / {stories.length}</span>
                <button onClick={handleNextStory} className={styles.navButton} aria-label="Cerita Berikutnya" title="Cerita Berikutnya">
                    <ChevronRightIcon style={{width: '20px', height: '20px'}} />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveStoryModule;