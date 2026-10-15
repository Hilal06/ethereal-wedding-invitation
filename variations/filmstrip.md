# Variasi Desain: 35mm Filmstrip Cinema (Cannes Premiere)

Variasi ini mengadopsi estetika sinematografi seluloid 35mm (*Cinema World Premiere & Hollywood Film Roll*). Tamu undangan diperlakukan layaknya penonton VIP festival film Cannes yang menerima tiket emas eksklusif.

---

## 1. Palet Warna & Identitas Visual
- **Cine Noir Dark:** `#0A0A0A` (Latar belakang gelap bioskop)
- **Premiere Gold:** `#D4AF37` (Emas tiket pemutaran perdana)
- **Celluloid Deep Black:** `#141414` (Pita roll film klise seluloid)
- **Sprocket Hole White:** `#FFFFFF` (Lubang gerigi film berbaris)
- **Director's Platinum:** `#E0E0E0` (Tipografi naskah skenario)

---

## 2. Alur Urutan Layout (*Sequencing*)
1. **Welcome Overlay**: Tiket Emas Premiere (*Admit Two • No. 002026*), lubang gerigi klise film di atas dan bawah, dan tombol *"Roll Film & Buka Tiket"*.
2. **Hero**: Tiket Masuk Bioskop Emas dengan countdown leader hitung mundur pemutaran film (*Scene 01 / Showtime: 08:00 WIB*).
3. **Gallery (Stills Cuplikan Adegan) di Depan**: Penonton bioskop disajikan cuplikan adegan film (*Production Stills & Teasers*) terlebih dahulu sebelum berkenalan dengan pemeran.
4. **Pita Intertitle Rol Klise Film 35mm**: Banner penunjuk adegan (*"▶ SCENE 01 / TAKE 01 • NOW INTRODUCING THE PRINCIPAL CAST & DIRECTORS"*).
5. **Couple**: Jajaran Bintang Utama (*Cast & Character Billing: Leading Man & Leading Lady*).
6. **Event Details**: Jadwal Penayangan Perdana (*Screening Schedule: Act I Matinee & Act II Gala Premiere*).
7. **RSVP Form**: Reservasi Kursi Tamu VIP Karpet Merah (*VIP Red Carpet Guestlist & RSVP Ticket Reservation*).
8. **Gift**: Dana Produksi & Box Office (*Box Office & Production Backers Fund*).
9. **Footer**: *Roll End Credits* (Directed by, Produced by, Genre: True Romance, © 2026 35mm Cinemascope).

---

## 3. Komponen-Komponen Kode Lengkap

### A. Welcome Overlay (`WelcomeOverlay.tsx`)
```tsx
if (theme === 'filmstrip') {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -120, filter: 'blur(10px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] filmstrip-texture flex flex-col items-center justify-between py-8 px-4 text-center overflow-y-auto select-none"
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold pt-2">
        • 35MM CINEMA PREMIERE •
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="cinema-gold-ticket max-w-md w-full p-6 sm:p-8 my-auto"
      >
        <div className="film-sprockets-top rounded-t-lg mb-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="sprocket-hole" />
          ))}
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37]">
          <span>ADMIT TWO</span>
          <span className="font-bold">PREMIERE PASS</span>
          <span>NO. 002026</span>
        </div>

        <div className="my-5 text-center">
          <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">
            GUEST ADMISSION:
          </span>
          <div className="text-xl sm:text-2xl font-serif text-white font-bold my-1">
            {guestName || "VIP Audience"}
          </div>
          <div className="w-12 h-[1px] bg-[#D4AF37]/50 mx-auto my-3" />
          <span className="font-mono text-[8px] text-[#D4AF37] uppercase tracking-[0.25em] block">
            A LOVE STORY PRESENTED BY
          </span>
          <h2 className="text-3xl font-serif text-white font-bold mt-1">
            {groomName} &amp; {brideName}
          </h2>
        </div>

        <div className="film-sprockets-bottom rounded-b-lg mt-4 mb-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="sprocket-hole" />
          ))}
        </div>

        <button
          onClick={handleOpenClick}
          className="w-full py-3.5 px-6 bg-[#D4AF37] hover:bg-[#b89528] text-stone-950 font-mono text-xs uppercase tracking-[0.2em] font-bold rounded-lg shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
        >
          <Film size={15} />
          <span>Roll Film &amp; Buka Tiket &rarr;</span>
        </button>
      </motion.div>

      <div className="text-[8px] font-mono text-stone-500 uppercase tracking-widest">
        DIRECTOR'S CUT • GOLDEN EDITION
      </div>
    </motion.div>
  );
}
```

### B. Hero (`Hero.tsx`)
```tsx
if (theme === 'filmstrip') {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 filmstrip-texture overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl cinema-gold-ticket p-6 sm:p-10 text-center"
      >
        <div className="film-sprockets-top rounded-t-lg mb-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="sprocket-hole" />
          ))}
        </div>

        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold block mb-1">
          CINEMATIC PREMIERE PASS • SCENE 01
        </span>

        <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight my-2">
          {groomName} &amp; {brideName}
        </h1>

        <p className="font-mono text-xs text-[#D4AF37] tracking-widest my-3">
          DATE: {formattedDateStr} • SHOWTIME: 08:00 WIB
        </p>

        {timeLeft && (
          <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto my-6 border-y border-[#D4AF37]/30 py-4">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HRS', value: timeLeft.hours },
              { label: 'MIN', value: timeLeft.minutes },
              { label: 'SEC', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl font-mono text-[#D4AF37] font-bold">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[7px] font-mono text-stone-400 mt-1 font-bold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="film-sprockets-bottom rounded-b-lg mt-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="sprocket-hole" />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

### C. Marquee Inter-Section Banner (`App.tsx`)
```tsx
<div className="bg-[#141414] border-y border-[#D4AF37]/40 py-3 px-4 text-center font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] relative">
  <div className="flex items-center justify-center gap-3">
    <span className="text-[10px] text-amber-500">▶ SCENE 01 / TAKE 01</span>
    <span className="text-stone-500">•</span>
    <span className="font-bold">NOW INTRODUCING THE PRINCIPAL CAST &amp; DIRECTORS</span>
    <span className="text-stone-500">•</span>
    <span className="text-[10px] text-amber-500">CANNES PREMIERE</span>
  </div>
</div>
```

### D. CSS Utilitas Tematik (`src/index.css`)
```css
.filmstrip-texture {
  background-color: #0A0A0A;
  background-image: linear-gradient(to bottom, #0A0A0A 0%, #121212 100%);
}

.cinema-gold-ticket {
  background: #141414;
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
}

.film-sprockets-top, .film-sprockets-bottom {
  display: flex;
  justify-content: space-between;
  background: #000000;
  padding: 6px 12px;
}

.sprocket-hole {
  width: 10px;
  height: 14px;
  background: #FFFFFF;
  border-radius: 2px;
}
```
