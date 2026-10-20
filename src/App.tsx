import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Couple from './components/Couple';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVPForm from './components/RSVPForm';
import Gift from './components/Gift';
import WelcomeOverlay from './components/WelcomeOverlay';
import BottomNav from './components/BottomNav';
import GuestLinkModal from './components/GuestLinkModal';
import EnvelopeEmbellishments from './components/EnvelopeEmbellishments';
import { ThemeProvider } from './components/ThemeContext';
import { Music, Share2, Volume2, VolumeX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { WebData, defaultWebData } from './types';

const CMS_CACHE_KEY = 'ethereal_cached_cms_v1';

function AppContent() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicToast, setMusicToast] = useState<string | null>(null);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('open') === 'true';
    }
    return false;
  });

  // Offline Caching: Initialize with cached data if available, else defaultWebData
  const [data, setData] = useState<WebData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(CMS_CACHE_KEY);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch (err) {
        console.warn("Could not read CMS cache:", err);
      }
    }
    return defaultWebData;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-convert Google Drive links from /view or /preview to direct thumbnail image links
  const sanitizeImageUrl = (url: string | undefined): string | undefined => {
    if (!url) return url;
    const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
    return url;
  };

  useEffect(() => {
    const fetchCMS = async () => {
      const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;
      if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL.includes("YOUR_")) {
        // Fallback gracefully to defaultWebData if not configured yet
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(GOOGLE_SHEET_URL);
        if (response.ok) {
          const result = await response.json();
          let rawGifts = result.gifts;
          if (Array.isArray(rawGifts) && rawGifts.length > 0) {
            rawGifts = rawGifts[0];
          }

          let parsedGifts = defaultWebData.gifts;
          if (rawGifts && (rawGifts.address || rawGifts.bankName1 || rawGifts.bankName2)) {
            const banks = [];
            const accNum1 = rawGifts.accountNumber1 || rawGifts.accountNumber;
            if (rawGifts.bankName1 && accNum1) {
              banks.push({
                bankName: String(rawGifts.bankName1),
                accountName: String(rawGifts.accountName1 || ''),
                accountNumber: String(accNum1)
              });
            }
            if (rawGifts.bankName2 && rawGifts.accountNumber2) {
              banks.push({
                bankName: String(rawGifts.bankName2),
                accountName: String(rawGifts.accountName2 || ''),
                accountNumber: String(rawGifts.accountNumber2)
              });
            }
            parsedGifts = {
              address: rawGifts.address || undefined,
              banks: banks.length > 0 ? banks : undefined
            };
          }

          const freshData: WebData = {
            settings: { ...defaultWebData.settings, ...result.settings },
            couple: {
              ...defaultWebData.couple,
              ...result.couple,
              groomImage: sanitizeImageUrl(result.couple?.groomImage) || defaultWebData.couple.groomImage,
              brideImage: sanitizeImageUrl(result.couple?.brideImage) || defaultWebData.couple.brideImage
            },
            events: result.events?.length ? result.events : defaultWebData.events,
            gallery: result.gallery?.length ? result.gallery.map((url: string) => sanitizeImageUrl(url) || "") : defaultWebData.gallery,
            wishes: result.wishes || defaultWebData.wishes,
            gifts: parsedGifts
          };

          setData(freshData);

          // Save to localStorage for instant offline access
          try {
            localStorage.setItem(CMS_CACHE_KEY, JSON.stringify(freshData));
          } catch (cacheErr) {
            console.warn("Could not cache CMS data:", cacheErr);
          }
        }
      } catch (err) {
        console.warn("Could not fetch CMS data from Google Sheet, keeping cached/default:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCMS();
  }, []);

  // Smooth Audio Management: Play upon gesture opening
  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
        showToast("🎵 Musik Latar Berputar");
      }).catch((err) => {
        console.warn("Autoplay was blocked or requires interaction:", err);
        setIsMusicPlaying(false);
      });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
      showToast("⏸ Musik Latar Dijeda");
    } else {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
        showToast("🎵 Memutar Musik Latar");
      }).catch((err) => {
        console.warn("Error playing audio:", err);
      });
    }
  };

  const showToast = (msg: string) => {
    setMusicToast(msg);
    setTimeout(() => {
      setMusicToast((curr) => (curr === msg ? null : curr));
    }, 2200);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const formattedWeddingDate = (() => {
    if (!data.settings.weddingDate) return "25 Desember 2026";
    try {
      const d = new Date(data.settings.weddingDate);
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return "25 Desember 2026";
    }
  })();

  return (
    <div className="min-h-screen relative parchment-texture transition-colors duration-500">
      {/* Subtle Stationery Embellishments (Non-intrusive envelope aesthetic) */}
      <EnvelopeEmbellishments />

      {/* Persistent Audio Element: guarantees smooth pause/resume without resetting track */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
        src={import.meta.env.VITE_BACKGROUND_MUSIC_URL || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
      />

      {/* 1. Welcome Overlay (Envelope Opening Experience) */}
      <AnimatePresence>
        {!isOpen && (
          <WelcomeOverlay
            onOpen={handleOpen}
            groomName={data.couple.groomName || ""}
            brideName={data.couple.brideName || ""}
            groomNickName={data.couple.groomNickName || ""}
            brideNickName={data.couple.brideNickName || ""}
            weddingDate={data.settings.weddingDate}
            isLoading={isLoading}
            error={error}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Invitation Content: Authentic Envelope & Trifold Wax Letter Sequence */}
      <main className={isOpen ? 'opacity-100 transition-opacity duration-700' : 'opacity-0 pointer-events-none'}>
        {/* Fold 1: Sealed Letterhead Invitation Cover */}
        <Hero
          weddingDate={new Date(data.settings.weddingDate || "2026-12-25T08:00:00")}
          groomName={data.couple.groomName || ""}
          brideName={data.couple.brideName || ""}
          groomParents={data.couple.groomParents}
          brideParents={data.couple.brideParents}
          groomQuote={data.couple.groomQuote}
          brideQuote={data.couple.brideQuote}
        />

        {/* Fold 2: Epistolary Couple Introduction with Paperclipped Polaroids */}
        <Couple couple={data.couple} settings={data.settings} />

        {/* Fold 3: Formal Royal Decree & Event Timetable */}
        <EventDetails
          events={data.events}
          groomName={data.couple.groomNickName || data.couple.groomName}
          brideName={data.couple.brideNickName || data.couple.brideName}
        />

        {/* Carte Postale Vintage Photo Album */}
        {data.gallery && data.gallery.length > 0 && (
          <Gallery images={data.gallery} />
        )}

        {/* Postal Remittance Envelope Slip & Gifts */}
        {data.gifts && <Gift gifts={data.gifts} />}

        {/* Carte Postale RSVP Reply Card & Guestbook Wishes */}
        <RSVPForm initialWishes={data.wishes} />

        {/* Epistolary Wax Seal Sign-Off Footer with Airmail Ribbon */}
        <footer className="footer-quieter-1 text-center bg-[#1E1714] text-[#E8DFD5] px-4 pb-24 md:pb-16 relative overflow-hidden">
          <div className="airmail-ribbon absolute top-0 left-0 right-0 opacity-30" />

          <div className="w-12 h-12 wax-seal mx-auto mb-4 shadow-md flex items-center justify-center opacity-90">
            <span className="font-serif text-[#FFD8DE] text-sm font-semibold tracking-wider">
              {data.couple.groomNickName?.[0] || 'R'}&amp;{data.couple.brideNickName?.[0] || 'F'}
            </span>
          </div>

          <span className="font-serif italic text-xs tracking-widest text-[#C8A97E] block mb-2 opacity-85">
            Signum Amoris &bull; Materai Tanda Cinta
          </span>

          <h2 className="text-2xl sm:text-4xl font-serif mb-3 text-[#F4ECE1] font-medium">
            {data.couple.groomNickName || data.couple.groomName} &amp; {data.couple.brideNickName || data.couple.brideName}
          </h2>
          <p className="text-stone-400 font-serif italic text-sm max-w-sm mx-auto mb-5 leading-relaxed">
            "Terima kasih telah menjadi bagian berharga dalam lembaran warkat kisah bahagia kami."
          </p>

          {/* Calon Pengantin Dispatch Tool Button */}
          <div className="mb-6">
            <button
              onClick={() => setIsGuestModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 text-[#FAF6F0] rounded-full border border-[#FAF6F0]/25 text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xs active:scale-95"
              title="Buka Generator Tautan Undangan Personal untuk WhatsApp"
            >
              <Share2 size={13} className="text-[#E2B755]" />
              <span>Biro Pengiriman Undangan Tamu</span>
            </button>
          </div>

          <div className="w-12 h-[1px] bg-stone-800 mx-auto mb-3" />
          <p className="text-[9px] text-stone-500 uppercase tracking-[0.2em] font-mono">
            WARKAT RESMI &bull; 2026
          </p>
        </footer>
      </main>

      {/* Mobile Floating Bottom Dock Navigation (Only on mobile viewport) */}
      <BottomNav isVisible={isOpen} />

      {/* Floating Controls: Ambient Background Music Toggle */}
      <div className="fixed bottom-22 sm:bottom-6 right-3 sm:right-6 z-[110] flex items-center gap-2">
        <AnimatePresence>
          {musicToast && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="hidden sm:block px-3 py-1.5 rounded-full bg-stone-900/90 text-[#FDFBF7] text-[10px] font-mono tracking-wider shadow-lg border border-stone-700 pointer-events-none"
            >
              {musicToast}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {isMusicPlaying && (
            <div className="absolute inset-0 rounded-full border-2 border-[#8C1C2E] animate-ripple pointer-events-none" />
          )}
          <button
            onClick={toggleMusic}
            className="relative z-10 w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer border-2"
            style={{
              backgroundColor: isMusicPlaying ? '#8C1C2E' : '#FAF7F2',
              color: isMusicPlaying ? '#FFFFFF' : '#8C1C2E',
              borderColor: '#8C1C2E'
            }}
            title={isMusicPlaying ? "Jeda Musik Latar" : "Putar Musik Latar Warkat"}
            aria-label={isMusicPlaying ? "Jeda Musik Latar" : "Putar Musik Latar Warkat"}
          >
            {isMusicPlaying ? (
              <Music
                size={18}
                className="animate-[spin_4s_linear_infinite]"
              />
            ) : (
              <VolumeX size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Guest Link & WhatsApp Dispatch Generator Modal */}
      <GuestLinkModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        groomName={data.couple.groomNickName || data.couple.groomName || ""}
        brideName={data.couple.brideNickName || data.couple.brideName || ""}
        weddingDateStr={formattedWeddingDate}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
