import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, AlertCircle, Heart } from 'lucide-react';

interface WelcomeOverlayProps {
  onOpen: () => void;
  groomName: string;
  brideName: string;
  groomNickName: string;
  brideNickName: string;
  weddingDate?: string;
  isLoading?: boolean;
  error?: string | null;
}

export default function WelcomeOverlay({
  onOpen,
  groomName,
  brideName,
  groomNickName,
  brideNickName,
  weddingDate,
  isLoading,
  error
}: WelcomeOverlayProps) {
  const [guestName, setGuestName] = useState<string>('');
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get('to') || urlParams.get('u') || urlParams.get('nama');
    if (toParam) {
      setGuestName(decodeURIComponent(toParam.replace(/\+/g, ' ')));
    }
  }, []);

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 450);
  };

  const formattedDate = weddingDate ? (
    (() => {
      const d = new Date(weddingDate);
      return `${d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    })()
  ) : (
    "25 DESEMBER 2026"
  );

  if (error) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#EAE1D5] flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="w-16 h-16 text-[#8C1C2E] mb-4" />
        <p className="text-stone-800 font-serif text-2xl font-bold">Koneksi Spreadsheet Tertunda</p>
        <p className="text-stone-600 text-sm mt-2 max-w-md">{error}</p>
        <button
          onClick={onOpen}
          className="mt-6 px-8 py-3 bg-[#8C1C2E] text-white rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-[#681321] transition-all cursor-pointer"
        >
          Tetap Buka Undangan
        </button>
      </div>
    );
  }





  // ==========================================
  // 8. DEFAULT: TRIFOLD WAX LETTER ENTRANCE
  // ==========================================
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -120, filter: 'blur(10px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#EAE1D5] parchment-texture flex flex-col items-center justify-between py-10 px-4 text-center overflow-y-auto select-none"
    >
      {/* Top Airmail Ribbon Stripe */}
      <div className="airmail-ribbon fixed top-0 left-0 right-0 z-20" />

      {/* Postage Stamp & Cancellation Mark (Top Right Corner) */}
      <div className="absolute top-6 right-6 flex items-center gap-2 pointer-events-none z-20">
        <div className="cancellation-lines-animated hidden sm:flex flex-col gap-1">
          <div className="w-14 h-[1px] bg-[#8C1C2E]" />
          <div className="w-16 h-[1px] bg-[#8C1C2E]" />
          <div className="w-12 h-[1px] bg-[#8C1C2E]" />
        </div>

        <div className="postmark-circle postmark-circle-animated w-14 h-14 text-[7px] border-[#8C1C2E]/70 text-[#8C1C2E]/80 shadow-xs">
          <span>POS RESMI</span>
          <span className="font-bold my-0.5">25.12.26</span>
          <span>LOVE MAIL</span>
        </div>

        <div className="postage-stamp-box postage-stamp-animated shadow-md">
          <span className="text-[6px] tracking-widest text-[#8C1C2E] font-bold">INDONESIA</span>
          <div className="w-8 h-8 rounded-full bg-[#8C1C2E]/10 flex items-center justify-center text-[#8C1C2E]">
            <Heart size={14} fill="currentColor" />
          </div>
          <span className="text-[7px] font-mono text-[#8C1C2E] font-bold">VIP 2026</span>
        </div>
      </div>

      {/* Top Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 pt-4"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#8C1C2E] font-bold">
          &bull; WARKAT RESMI PERNIKAHAN &bull;
        </span>
        <p className="text-stone-500 font-serif italic text-xs mt-1">Special Delivery &bull; Private Invitation</p>
      </motion.div>

      {/* Main Physical Envelope Body */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.9 }}
        className="relative z-10 w-full max-w-sm trifold-letter-card p-6 md:p-8 my-auto overflow-hidden shadow-2xl border-2 border-[#D6C8B6]"
      >
        {/* Top Envelope Flap Triangle */}
        <div className="envelope-v-flap" />

        {/* Envelope Flap Fold Line with Tactile Wax Seal */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            onClick={handleOpenClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={isOpening ? { scale: 1.25, rotate: 12, opacity: 0.8 } : {}}
            className="wax-seal w-16 h-16 shadow-xl"
            title="Klik segel lilin untuk membuka surat warkat"
          >
            <span className="font-serif text-[#FFD8DE] text-xl font-bold tracking-widest drop-shadow-xs">
              {groomNickName?.[0] || 'R'}&amp;{brideNickName?.[0] || 'F'}
            </span>
          </motion.div>
        </div>

        <div className="pt-20 pb-2 text-center">
          <span className="text-[9px] uppercase font-mono tracking-[0.3em] text-[#8C1C2E] font-bold">
            WARKAT TERTUJU KEPADA:
          </span>
          <div className="text-2xl md:text-3xl font-serif text-[#2F241F] font-bold mt-2 mb-1">
            {guestName || "Tamu Undangan Terhormat"}
          </div>
          <p className="text-[11px] font-serif italic text-stone-500">
            di Tempat
          </p>
        </div>

        <div className="crease-line my-4" />

        <div className="text-center py-2">
          <p className="text-stone-500 font-serif text-xs italic mb-2">
            Dengan penuh rasa syukur dan hormat, kami mengundang Anda untuk menyaksikan ikrar suci pernikahan:
          </p>
          <h2 className="text-2xl md:text-3xl font-serif text-[#8C1C2E] font-bold my-2 flex flex-col items-center leading-tight drop-shadow-[0_1px_2px_rgba(140,28,46,0.08)]">
            <span>{groomName || "Rifaul Hilal"}</span>
            <span className="font-script text-2xl font-normal text-[#E2B755] my-0.5">&amp;</span>
            <span>{brideName || "Safirda Dwi"}</span>
          </h2>
        </div>

        <div className="mt-6 pt-2">
          <button
            onClick={handleOpenClick}
            className="w-full py-3.5 px-6 bg-[#8C1C2E] hover:bg-[#681321] text-[#FDFBF7] rounded-sm font-serif text-xs uppercase tracking-[0.25em] font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={14} className="text-[#E2B755]" />
            <span>Buka &amp; Baca Surat Undangan &rarr;</span>
          </button>
          {isLoading && (
            <p className="text-[9px] font-mono text-stone-400 mt-2 italic tracking-wider">
              Menyinkronkan data Google Sheets...
            </p>
          )}
        </div>
      </motion.div>

      {/* Bottom Envelope Date & Watermark */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8 }}
        className="relative z-10 text-stone-500 font-mono text-[9px] uppercase tracking-widest"
      >
        <span>{formattedDate}</span>
        <span className="mx-2">&bull;</span>
        <span>JAWA TIMUR &bull; INDONESIA</span>
      </motion.div>
    </motion.div>
  );
}
