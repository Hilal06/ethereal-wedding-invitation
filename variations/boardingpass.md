# Variasi Desain: The Boarding Pass (Aviation Theme)

Variasi ini mengadopsi tema penerbangan internasional kelas utama (*First Class Flight & Boarding Pass*), di mana undangan bertindak sebagai paspor dan tiket keberangkatan resmi menuju gerbang kehidupan baru.

---

## 1. Palet Warna & Identitas Visual
- **Aviation Deep Navy:** `#14213D` (Background utama & cover paspor)
- **Flight Metallic Gold:** `#E2B755` (Border perforasi, stempel visa & teks aksen)
- **Flight Clean White:** `#FAF8F5` (Permukaan tiket penerbangan)
- **Charcoal Slate:** `#1A2634` (Teks informasi penerbangan)
- **Indikator Aktif Hijau:** `#34D399` (Lampu sinyal *boarding gate*)

---

## 2. Alur Urutan Layout (*Sequencing*)
1. **Welcome Overlay**: Tiket Boarding Pass dengan barcode SVG, notch lubang robekan tiket di kiri/kanan, stempel visa imigrasi *Approved*, nomor gate, dan tombol *"Buka Tiket & Boarding Pass"*.
2. **Hero**: Tiket First Class dengan rute `CGK &rarr; LOVE`, hitung mundur stasiun bandara (*Split-Flap Airport Countdown*), dan nama kedua mempelai.
3. **Pita Marquee Jadwal Bandara**: Pita penunjuk waktu keberangkatan dengan lampu indikator hijau berkedip (*Final Call & Gate Status*).
4. **Event Details (Gate 01 & Gate 02) di Depan**: Pada penerbangan, nomor terminal dan jadwal gerbang (*Gate 01: Akad*, *Gate 02: Resepsi*) adalah informasi terpenting yang langsung dilihat penumpang.
5. **Couple**: Buku Paspor Ganda Resmi (*Dual Passport Clearance*) dengan pasfoto 4x5, lambang negara cinta, stempel visa biometrik, kutipan cinta, dan data silsilah keluarga.
6. **RSVP Form**: Reservasi Manifest Penumpang Pesawat (*First Class Passenger Manifest & Seat Reservation*).
7. **Gift**: Klaim Bagasi (*Baggage Tag & Cargo Drop*) untuk pengiriman kado fisik serta nomor rekening transfer.
8. **Gallery**: Rekaman Foto Perjalanan Udara (*In-Flight Travel Memories*).
9. **Footer**: *Flight Arrived Safely at Destination: Forever &bull; Passenger Log Closed*.

---

## 3. Komponen-Komponen Kode Lengkap

### A. Welcome Overlay (`WelcomeOverlay.tsx`)
```tsx
if (theme === 'boardingpass') {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -120, filter: 'blur(10px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] boardingpass-texture flex flex-col items-center justify-between py-8 px-4 text-center overflow-y-auto select-none"
    >
      {/* Top Airline Boarding Banner */}
      <div className="relative z-10 w-full max-w-md flex items-center justify-between border-b border-[#E2B755]/30 pb-3 pt-2 text-[#E2B755]">
        <div className="flex items-center gap-2">
          <Plane size={16} className="text-[#E2B755] transform -rotate-45" />
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold">
            ETHEREAL AIRWAYS • FIRST CLASS
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[#E2B755]/15 font-bold">
          GATE 01A
        </span>
      </div>

      {/* Boarding Pass Ticket Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="relative z-10 w-full max-w-md boardingpass-ticket p-6 my-auto"
      >
        <div className="ticket-notch-left" />
        <div className="ticket-notch-right" />

        <div className="flex items-center justify-between border-b border-dashed border-[#D8CFC4] pb-4 mb-4">
          <div className="text-left">
            <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#14213D]/70 font-bold block">
              OFFICIAL BOARDING PASS
            </span>
            <h3 className="font-serif text-xl font-bold text-[#14213D] leading-tight mt-0.5">
              Flight to Eternity
            </h3>
          </div>
          <div className="visa-stamp scale-90 origin-top-right">
            <span className="text-[6px] font-bold">PASSPORT CONTROL</span>
            <span className="text-[8px] font-bold my-0.5">APPROVED</span>
            <span className="text-[6px]">IMMIGRATION</span>
          </div>
        </div>

        <div className="bg-[#F0EAE1] p-3.5 rounded-lg border border-[#D8CFC4] text-left mb-4">
          <span className="text-[8px] font-mono uppercase tracking-widest text-stone-500 font-bold block">
            PASSENGER / TAMU UNDANGAN
          </span>
          <div className="text-xl sm:text-2xl font-serif text-[#14213D] font-bold mt-1">
            {guestName || "VIP Guest"}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#DFD5C8] text-[9px] font-mono text-stone-600">
            <span>CLASS: <strong>FIRST CLASS (VIP)</strong></span>
            <span>SEAT: <strong>01A / PRIORITY</strong></span>
          </div>
        </div>

        <div className="my-5 text-center">
          <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-[#14213D] mb-1">
            <span className="text-base font-bold">CGK</span>
            <div className="flex items-center gap-1.5 text-[#E2B755]">
              <div className="w-6 h-[1px] bg-[#14213D]/30" />
              <Plane size={14} className="transform rotate-90 text-[#14213D]" />
              <div className="w-6 h-[1px] bg-[#14213D]/30" />
            </div>
            <span className="text-base font-bold">LOVE</span>
          </div>
          <p className="text-[9px] font-mono uppercase tracking-wider text-stone-500 mb-2">
            NON-STOP FLIGHT TO THE WEDDING OF
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#14213D] font-bold">
            {groomName} &amp; {brideName}
          </h2>
        </div>

        <div className="pt-3 border-t border-dashed border-[#D8CFC4] flex items-center justify-between">
          <div className="text-left font-mono text-[8px] text-stone-600">
            <span>DATE: <strong>{formattedDate}</strong></span><br />
            <span>BOARDING: <strong>08:00 WIB</strong></span>
          </div>
          <div className="flex flex-col items-end">
            <svg className="w-28 h-6" viewBox="0 0 100 24" fill="#14213D">
              <rect x="0" y="0" width="3" height="24" /><rect x="5" y="0" width="2" height="24" />
              <rect x="9" y="0" width="4" height="24" /><rect x="15" y="0" width="1" height="24" />
              <rect x="18" y="0" width="3" height="24" /><rect x="23" y="0" width="5" height="24" />
              <rect x="30" y="0" width="2" height="24" /><rect x="34" y="0" width="4" height="24" />
              <rect x="40" y="0" width="1" height="24" /><rect x="43" y="0" width="3" height="24" />
              <rect x="48" y="0" width="2" height="24" /><rect x="52" y="0" width="5" height="24" />
              <rect x="59" y="0" width="3" height="24" /><rect x="64" y="0" width="1" height="24" />
              <rect x="67" y="0" width="4" height="24" /><rect x="73" y="0" width="2" height="24" />
              <rect x="77" y="0" width="5" height="24" /><rect x="84" y="0" width="2" height="24" />
              <rect x="88" y="0" width="4" height="24" /><rect x="94" y="0" width="2" height="24" />
              <rect x="98" y="0" width="2" height="24" />
            </svg>
            <span className="text-[7px] font-mono tracking-widest text-stone-500 mt-0.5">
              *WED-2026-BOARDING*
            </span>
          </div>
        </div>

        <div className="mt-5">
          <button
            onClick={handleOpenClick}
            className="w-full py-3.5 px-6 bg-[#14213D] hover:bg-[#0B131F] text-[#FAF8F5] rounded-xl font-mono text-xs uppercase tracking-[0.2em] font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-[#E2B755]/40"
          >
            <Plane size={15} className="text-[#E2B755]" />
            <span>Buka Tiket &amp; Boarding Pass &rarr;</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

### B. Hero (`Hero.tsx`)
```tsx
if (theme === 'boardingpass') {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 boardingpass-texture text-[#FAF8F5] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl boardingpass-ticket p-6 sm:p-10 text-stone-900"
      >
        <div className="ticket-notch-left" />
        <div className="ticket-notch-right" />

        <div className="flex items-center justify-between border-b-2 border-dashed border-[#D8CFC4] pb-4 mb-6">
          <div className="flex items-center gap-2 text-[#14213D]">
            <Plane size={20} className="text-[#E2B755] transform -rotate-45" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold">
              ETHEREAL AIRWAYS • FLIGHT WED-2026
            </span>
          </div>
          <span className="font-mono text-xs text-[#E2B755] font-bold bg-[#14213D] px-2.5 py-1 rounded-sm">
            FIRST CLASS
          </span>
        </div>

        <div className="text-center my-4">
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-500 font-bold block mb-1">
            PASSENGER TICKET &amp; BAGGAGE CHECK
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#14213D] font-bold leading-tight">
            {groomName} &amp; {brideName}
          </h1>
          <p className="font-mono text-xs text-stone-600 mt-2 tracking-wider">
            DEPARTURE DATE: {formattedDateStr} • GATE DEPARTURE: 08:00 WIB
          </p>
        </div>

        {/* Airport Split-Flap Countdown */}
        {timeLeft && (
          <div className="airport-countdown my-6 p-4">
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#E2B755] font-bold block text-center mb-3">
              TIME REMAINING UNTIL DEPARTURE
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HRS', value: timeLeft.hours },
                { label: 'MIN', value: timeLeft.minutes },
                { label: 'SEC', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="airport-digit-box">
                  <span className="digit text-2xl font-mono text-[#FAF8F5] font-bold">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="label text-[7px] font-mono text-[#E2B755] uppercase mt-1">
                    {item.label}
                  </span>
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
<div className="bg-[#14213D] border-y border-[#E2B755]/40 py-3.5 px-4 text-[#FAF8F5] overflow-hidden shadow-md">
  <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-[#E2B755]">
    <div className="flex items-center gap-2.5">
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
      <span className="font-bold text-white">ETHEREAL AIRWAYS • FLIGHT WED-2026 NOW BOARDING</span>
    </div>
    <div className="flex items-center gap-3 text-stone-300">
      <span className="text-[#E2B755]">GATE 01: AKAD</span>
      <span>•</span>
      <span className="text-[#E2B755]">GATE 02: RESEPSI</span>
      <span>•</span>
      <span className="text-white font-bold tracking-normal bg-[#0B131F] px-2 py-0.5 rounded-xs border border-[#E2B755]/40">FINAL CALL</span>
    </div>
  </div>
</div>
```

### D. CSS Utilitas Tematik (`src/index.css`)
```css
.boardingpass-texture {
  background-color: #0E1826;
  background-image: 
    radial-gradient(rgba(226, 183, 85, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, #0E1826 0%, #14213D 100%);
  background-size: 24px 24px, 100% 100%;
}

.boardingpass-ticket {
  background: #FAF8F5;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.ticket-notch-left, .ticket-notch-right {
  position: absolute;
  top: 50%;
  width: 24px;
  height: 24px;
  background: #0E1826;
  border-radius: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
.ticket-notch-left { left: -12px; }
.ticket-notch-right { right: -12px; }

.airport-countdown {
  background: #0B131F;
  border: 1px solid rgba(226, 183, 85, 0.3);
  border-radius: 12px;
}

.airport-digit-box {
  background: #14213D;
  border: 1px solid rgba(226, 183, 85, 0.4);
  border-radius: 6px;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.visa-stamp {
  border: 2px dashed #C83232;
  color: #C83232;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotate(-12deg);
  text-align: center;
  font-family: monospace;
}
```
