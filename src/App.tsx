import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Couple from './components/Couple';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVPForm from './components/RSVPForm';
import Gift from './components/Gift';
import WelcomeOverlay from './components/WelcomeOverlay';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { Music, Palette, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WebData, defaultWebData } from './types';

const GlobalPetal = ({ delay, left, duration }: { delay: number, left: string, duration: number }) => (
  <motion.div
    initial={{ y: '-10vh', x: 0, opacity: 0, rotate: 0 }}
    animate={{ y: '110vh', x: 100, opacity: [0, 0.6, 0.6, 0], rotate: 360 }}
    transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    className="absolute top-0 w-3 h-4 bg-wedding-gold/40 rounded-[40%_100%_40%_100%] shadow-[0_0_15px_rgba(255,255,255,0.4)] z-0"
    style={{ left }}
  />
);

function AppContent() {
  const { theme, setTheme } = useTheme();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<WebData>(defaultWebData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-convert Google Drive links from /view or /preview to direct image links
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
        setError("Please add your Google Sheet URL to the .env file.");
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
              banks.push({ bankName: String(rawGifts.bankName1), accountName: String(rawGifts.accountName1 || ''), accountNumber: String(accNum1) });
            }
            if (rawGifts.bankName2 && rawGifts.accountNumber2) {
              banks.push({ bankName: String(rawGifts.bankName2), accountName: String(rawGifts.accountName2 || ''), accountNumber: String(rawGifts.accountNumber2) });
            }
            parsedGifts = {
              address: rawGifts.address || undefined,
              banks: banks.length > 0 ? banks : undefined
            };
          }

          setData({
            settings: { ...defaultWebData.settings, ...result.settings },
            couple: {
              ...defaultWebData.couple,
              ...result.couple,
              groomImage: sanitizeImageUrl(result.couple.groomImage),
              brideImage: sanitizeImageUrl(result.couple.brideImage)
            },
            events: result.events?.length ? result.events : defaultWebData.events,
            gallery: result.gallery?.length ? result.gallery.map((url: string) => sanitizeImageUrl(url) || "") : defaultWebData.gallery,
            wishes: result.wishes || [],
            gifts: parsedGifts
          });
        } else {
          setError("Failed to fetch data from Google Sheets.");
        }
      } catch (error) {
        console.error("Failed to fetch CMS data:", error);
        setError("Network error. Could not connect to Google Sheets.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCMS();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMusicPlaying(true);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const themes: { id: 'classic' | 'modern' | 'sage' | 'burgundy', name: string, color: string }[] = [
    { id: 'modern', name: 'Gelap Modern', color: '#1a1a1a' },
    { id: 'sage', name: 'Hijau Sage', color: '#87A96B' },
    { id: 'burgundy', name: 'Burgundy Mewah', color: '#800020' },
  ];

  return (
    <div className="min-h-screen relative">
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

      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
          <GlobalPetal left="5%" delay={0} duration={20} />
          <GlobalPetal left="20%" delay={8} duration={25} />
          <GlobalPetal left="35%" delay={3} duration={22} />
          <GlobalPetal left="55%" delay={12} duration={26} />
          <GlobalPetal left="75%" delay={5} duration={19} />
          <GlobalPetal left="90%" delay={10} duration={24} />
        </div>
      )}

      <main className={isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}>
        <Hero
          groomName={data.couple.groomName || ""}
          brideName={data.couple.brideName || ""}
          weddingDate={new Date(data.settings.weddingDate || "")}
          groomParents={data.couple.groomParents}
          brideParents={data.couple.brideParents}
          groomQuote={data.couple.groomQuote}
          brideQuote={data.couple.brideQuote}
        />

        <Couple couple={data.couple} settings={data.settings} />

        <EventDetails events={data.events} />

        <Gallery images={data.gallery} />

        {data.gifts && <Gift gifts={data.gifts} />}

        <RSVPForm initialWishes={data.wishes} />

        <footer className="py-16 text-center bg-stone-900 text-white">
          <Heart className="mx-auto mb-6 text-red-500 animate-pulse" fill="currentColor" />
          <h2 className="text-5xl md:text-6xl font-script mb-4 text-wedding-gold">{data.couple.groomNickName} & {data.couple.brideNickName}</h2>
          <p className="text-wedding-cream/90 text-sm tracking-widest uppercase drop-shadow-sm">Terima kasih telah menjadi bagian dari kisah kami</p>
          <div className="mt-12 text-[10px] text-wedding-cream/60 tracking-widest uppercase">
            Dibuat dengan Penuh Cinta &bull; 2026
          </div>
        </footer>

        {/* Floating Controls */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
          <button
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${isMusicPlaying ? 'bg-wedding-gold text-white rotate-12' : 'bg-white text-stone-800'}`}
          >
            <Music size={20} className={isMusicPlaying ? 'animate-bounce' : ''} />
          </button>
        </div>

        {/* Hidden Audio Element */}
        {isMusicPlaying && (
          <audio autoPlay loop className="hidden">
            <source src={import.meta.env.VITE_BACKGROUND_MUSIC_URL || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} type="audio/mpeg" />
          </audio>
        )}
      </main>
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

