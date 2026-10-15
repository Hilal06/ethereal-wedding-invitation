# Variasi Desain: The Wedding Gazette (Broadsheet Newspaper)

Variasi ini mengadopsi format surat kabar broadsheet klasik abad ke-19 (*19th Century Broadsheet Newspaper & Press Wire*). Seluruh informasi disajikan layaknya tajuk berita utama harian dengan gaya tipografi jurnalisme klasik.

---

## 1. Palet Warna & Identitas Visual
- **Newsprint Aged Cream:** `#F4EFE6` (Background kertas koran antik)
- **Printing Ink Black:** `#111111` (Tinta cetak linotype hitam legam)
- **Editor's Crimson:** `#8C2A3E` (Pita Breaking News & stempel pers)
- **Halftone Gray:** `#555555` (Garis pembatas & teks metadata koran)
- **Pure Paper White:** `#FFFFFF` (Kotak artikel tajuk utama)

---

## 2. Alur Urutan Layout (*Sequencing*)
1. **Welcome Overlay**: Halaman Depan Edisi Khusus Surat Kabar (*Vol. XXVI No. 12*), tajuk berita utama, dan tombol *"Buka & Baca Surat Kabar Lengkap"*.
2. **Hero**: Kepala Surat Kabar (*Masthead*), Tanggal Terbit, Harga Cetak (Gratis), dan Tajuk Berita Pernikahan Resmi.
3. **Pita Breaking News Ticker Tape**: Pita merah marun berjalan melintasi layar (*"EXTRA! EXTRA! SPECIAL EDITION WEDDING DISPATCH"*).
4. **Couple**: Liputan Utama (*Front-Page Feature Article*) & Biografi Mendalam Kedua Mempelai.
5. **Gallery (Foto Jurnalistik) di Depan**: Tepat di bawah artikel utama, pembaca langsung disajikan arsip foto still dan potret dokumenter bergaya rotogravure pers.
6. **Event Details**: Jadwal Maklumat Acara & Warta Resmi (*Official Order of Events & Timetable Dispatch*).
7. **RSVP Form**: Kupon Gunting Putus-Putus ✂ (*Scissor-cut coupon: Cut along the dotted line and telegraph to the newsroom desk*).
8. **Gift**: Halaman Iklan Baris (*Classified Advertisements & Congratulatory Endowment*).
9. **Footer**: Kolofon Percetakan Broadsheet (*The Wedding Gazette Colophon & Linotype Press Imprint*).

---

## 3. Komponen-Komponen Kode Lengkap

### A. Welcome Overlay (`WelcomeOverlay.tsx`)
```tsx
if (theme === 'newspaper') {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -120, filter: 'blur(10px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] gazette-texture flex flex-col items-center justify-between py-8 px-4 text-center overflow-y-auto select-none"
    >
      <div className="w-full max-w-md border-b-2 border-stone-800 pb-2 text-stone-800 font-mono text-[9px] flex justify-between items-center tracking-widest">
        <span>VOL. XXVI NO. 12</span>
        <span className="font-bold uppercase">EDISI KHUSUS PERNIKAHAN RESMI</span>
        <span>HARGA: GRATIS</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="w-full max-w-md newspaper-card p-6 sm:p-8 my-auto"
      >
        <div className="border-b-4 border-double border-stone-900 pb-3 mb-4 text-center">
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-500 font-bold block mb-1">
            THE DAILY ROMANCE JOURNAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-black tracking-tight uppercase">
            The Wedding Gazette
          </h1>
          <p className="font-serif italic text-xs text-stone-600 mt-1">
            "Kabar Bahagia Penyatuan Dua Hati dalam Ikrar Suci"
          </p>
        </div>

        <div className="bg-stone-900 text-white font-mono text-[9px] uppercase tracking-widest py-1 px-3 mb-4 font-bold flex items-center justify-center gap-2">
          <Newspaper size={12} />
          <span>TAJUK UTAMA: UNDANGAN ISTIMEWA</span>
        </div>

        <div className="bg-stone-100 p-3.5 border-l-4 border-stone-800 text-left mb-4">
          <span className="font-mono text-[8px] text-stone-500 uppercase tracking-widest block font-bold">
            KABAR DITUJUKAN KEPADA:
          </span>
          <div className="font-serif text-xl sm:text-2xl text-stone-900 font-bold mt-0.5">
            {guestName || "Tamu Undangan Yang Berbahagia"}
          </div>
          <p className="text-[10px] font-serif italic text-stone-600 mt-1">
            Diharapkan kehadirannya sebagai saksi sejarah penyatuan cinta
          </p>
        </div>

        <div className="my-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-black leading-tight">
            {groomName} &amp; {brideName}
          </h2>
          <div className="w-16 h-[1px] bg-stone-900 mx-auto my-3" />
          <p className="font-serif text-xs text-stone-700 italic max-w-xs mx-auto">
            Akan melangsungkan akad &amp; resepsi pernikahan resmi pada tanggal {formattedDate}.
          </p>
        </div>

        <div className="mt-6 pt-3 border-t border-stone-300">
          <button
            onClick={handleOpenClick}
            className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white font-serif text-xs uppercase tracking-[0.2em] font-bold shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Newspaper size={14} />
            <span>Buka &amp; Baca Surat Kabar Lengkap &rarr;</span>
          </button>
        </div>
      </motion.div>

      <div className="text-stone-500 font-mono text-[8px] uppercase tracking-widest">
        &copy; 2026 THE WEDDING GAZETTE &bull; LIVE PRESS EDITION
      </div>
    </motion.div>
  );
}
```

### B. Hero (`Hero.tsx`)
```tsx
if (theme === 'newspaper') {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 gazette-texture overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl newspaper-card p-6 sm:p-12 text-stone-900"
      >
        <div className="border-b-4 border-double border-stone-900 pb-4 mb-6 text-center">
          <div className="flex justify-between items-center text-[9px] font-mono text-stone-600 border-b border-stone-400 pb-1 mb-2">
            <span>EDISI ISTIMEWA</span>
            <span>KOTA CINTA, {formattedDateStr.toUpperCase()}</span>
            <span>NO. 01 / TAHUN 2026</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-stone-950 font-black tracking-tight uppercase leading-none">
            The Wedding Gazette
          </h1>
          <p className="font-serif italic text-xs text-stone-700 mt-2">
            "Berita Utama: Janji Suci Dua Hati Dipersatukan Selamanya"
          </p>
        </div>

        <div className="text-center my-6">
          <span className="bg-stone-900 text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold inline-block mb-3">
            HEADLINE REPORT
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-950 font-bold leading-tight">
            {groomName} &amp; {brideName}
          </h2>
          <p className="font-serif text-xs sm:text-sm text-stone-700 max-w-md mx-auto mt-3 leading-relaxed">
            Menyampaikan kabar sukacita kepada handai taulan dan sanak saudara untuk hadir memanjatkan doa restu.
          </p>
        </div>

        {timeLeft && (
          <div className="my-6 border-y-2 border-stone-900 py-3 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-stone-700 block mb-2">
              COUNTDOWN TO MATRIMONY
            </span>
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {[
                { label: 'HARI', value: timeLeft.days },
                { label: 'JAM', value: timeLeft.hours },
                { label: 'MENIT', value: timeLeft.minutes },
                { label: 'DETIK', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="border border-stone-800 p-2">
                  <div className="text-xl sm:text-2xl font-serif font-black text-stone-900">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-[7px] font-mono text-stone-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
```

### C. Marquee Inter-Section Banner (`App.tsx`)
```tsx
<div className="bg-[#8C2A3E] text-white py-2.5 px-4 border-y-2 border-stone-900 font-serif text-xs uppercase tracking-widest text-center shadow-inner">
  <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-3">
    <span className="bg-white text-[#8C2A3E] px-2 py-0.5 font-bold font-mono text-[9px] rounded-xs animate-pulse">
      EXTRA! EXTRA!
    </span>
    <span className="font-semibold tracking-wider">
      ★ SPECIAL EDITION WEDDING DISPATCH ★ TWO SOULS UNITED IN SACRED MATRIMONY ★ READ FULL REPORTAGE ★
    </span>
  </div>
</div>
```

### D. CSS Utilitas Tematik (`src/index.css`)
```css
.gazette-texture {
  background-color: #F4EFE6;
  background-image: 
    radial-gradient(rgba(17, 17, 17, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, #F4EFE6 0%, #EDE6D8 100%);
  background-size: 16px 16px, 100% 100%;
}

.newspaper-card {
  background: #FFFFFF;
  border: 1px solid #D5CEBF;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
}
```
