import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Heart } from 'lucide-react';

interface HeroProps {
  weddingDate: Date;
  groomName: string;
  brideName: string;
  groomParents?: string;
  brideParents?: string;
  groomQuote?: string;
  brideQuote?: string;
}

export default function Hero({
  weddingDate,
  groomName,
  brideName,
  groomParents,
  brideParents,
}: HeroProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diffTime = weddingDate.getTime() - now.getTime();

      if (isNaN(diffTime) || diffTime <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  const formattedDateStr = (() => {
    const day = String(weddingDate.getDate()).padStart(2, '0');
    const month = weddingDate.toLocaleDateString('id-ID', { month: 'long' });
    const year = weddingDate.getFullYear();
    return `${day} ${month} ${year}`;
  })();

  // Envelope / Trifold Wax Letter: Fold 1 - The Letterhead & Official Royal Dispatch
  return (
    <section id="section-hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 parchment-texture overflow-hidden">
      {/* Top Airmail Ribbon Decorative Edge */}
      <div className="airmail-ribbon fixed top-0 left-0 right-0 z-30 opacity-90" />

      {/* Main Trifold Letter Card (Fold 1: The Letterhead) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl trifold-letter-card p-6 sm:p-10 text-center mt-6"
      >
        {/* Postmark & Stamp Dispatch Header */}
        <div className="flex justify-between items-start border-b border-[#DFD5C8] pb-4 mb-6 text-left">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8C1C2E] font-bold block">
              SURAT RESMI PERNIKAHAN
            </span>
            <span className="font-serif italic text-xs text-stone-500">
              No. Registrasi: ARS-SSK/2026/XI
            </span>
          </div>

          {/* Postal Stamp with Postmark */}
          <div className="stamp-anim-3 flex items-center gap-1.5 cursor-pointer">
            <div className="hidden sm:block text-right font-mono text-[8px] text-[#8C1C2E] leading-tight">
              <span>POS RESMI</span><br />
              <span className="font-bold">AKAD NIKAH</span>
            </div>
            <div className="postage-stamp-box scale-90 origin-top-right relative">
              <span className="text-[6px] tracking-widest text-[#8C1C2E] font-bold">POS RI</span>
              <div className="relative">
                <Heart size={12} className="text-[#8C1C2E] relative z-10" fill="currentColor" />
                <span className="absolute inset-0 rounded-full bg-[#8C1C2E]/30 animate-ping opacity-60 pointer-events-none" />
              </div>
              <span className="text-[7px] font-mono text-[#8C1C2E]">2026</span>
            </div>
          </div>
        </div>

        {/* Vintage Fountain Pen / Pencil Sketch Divider */}
        <div className="flex items-center justify-center gap-3 my-2 opacity-75">
          <div className="w-16 h-[1px] bg-[#8C1C2E]/40" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15 8L12 22L9 8L12 2Z" stroke="#8C1C2E" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M12 2V12" stroke="#8C1C2E" strokeWidth="1.2" />
          </svg>
          <div className="w-16 h-[1px] bg-[#8C1C2E]/40" />
        </div>

        {/* Salutation Text */}
        <p className="font-serif italic text-sm text-stone-600 mb-2 mt-4">
          Dengan penuh cinta dan rasa syukur, kami memohon kehadiran Anda pada pernikahan kami:
        </p>

        {/* Couple Calligraphy Typography */}
        <div className="my-6">
          <h1 className="text-4xl sm:text-6xl font-serif text-[#2F241F] font-bold tracking-normal leading-tight">
            <span className="block">{groomName}</span>
            <span className="block my-1 font-script text-4xl sm:text-5xl text-[#8C1C2E] font-normal" aria-hidden="true">&amp;</span>
            <span className="block">{brideName}</span>
          </h1>
        </div>

        {/* Parental Blessing Mention */}
        {groomParents && brideParents && (
          <p className="font-serif text-xs text-stone-500 uppercase tracking-[0.2em] max-w-md mx-auto my-3">
            Keluarga {groomParents} &bull; Keluarga {brideParents}
          </p>
        )}

        {/* Official Date Stamp */}
        <div className="my-6 py-2 px-6 inline-block border-y border-[#8C1C2E]/30 text-stone-800">
          <span className="font-serif text-base sm:text-lg font-bold tracking-[0.15em] uppercase">
            {formattedDateStr}
          </span>
        </div>

        {/* Fold Crease separator */}
        <div className="crease-line" />

        {/* Countdown Ribbon Section */}
        {timeLeft && (
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#8C1C2E]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold">
                HITUNG MUNDUR HARI PERIKATAN JANJI
              </span>
              <span className="w-2 h-2 rounded-full bg-[#8C1C2E]" />
            </div>

            <div className="bg-[#FAF6F0] p-4 rounded-sm border-2 border-dashed border-[#8C1C2E]/40 relative overflow-hidden max-w-md mx-auto shadow-xs">
              <div className="absolute top-1 right-2 font-mono text-[7px] text-[#8C1C2E]/70 uppercase tracking-widest font-bold">
                POSTAL FRANKING &bull; 2026
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto mt-2">
                {[
                  { label: 'HARI', value: timeLeft.days, rot: '-rotate-1' },
                  { label: 'JAM', value: timeLeft.hours, rot: 'rotate-1' },
                  { label: 'MENIT', value: timeLeft.minutes, rot: '-rotate-1' },
                  { label: 'DETIK', value: timeLeft.seconds, rot: 'rotate-2' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`stamp-tile rounded-xs py-2 px-1 text-center ${item.rot}`}
                  >
                    <div className="text-[6.5px] font-mono tracking-widest text-[#8C1C2E]/60 uppercase font-bold leading-none mb-1">
                      POS &bull; VIP
                    </div>
                    <div className="stamp-num text-xl sm:text-2xl font-bold leading-none">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="stamp-label text-[8px] uppercase mt-1 font-bold">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Gentle Scroll Down Indicator & Trifold Fold Crease */}
      <div className="relative z-10 w-full max-w-3xl mt-6">
        <div className="trifold-fold-divider" />
        <motion.div
          onClick={() => {
            const el = document.getElementById('section-couple') || document.getElementById('fold-2-couple');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-stone-500 flex flex-col items-center gap-1 cursor-pointer select-none"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold">
            Buka Warkat Lipatan Kedua &darr;
          </span>
          <ChevronDown size={14} className="text-[#8C1C2E]" />
        </motion.div>
      </div>
    </section>
  );
}
