import React, { useState, useEffect } from 'react';
import { Mail, Heart, Calendar, Image as ImageIcon, Gift, MessageSquare } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  num: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'section-hero', label: 'Cover', num: '01', icon: Mail },
  { id: 'section-couple', label: 'Mempelai', num: '02', icon: Heart },
  { id: 'section-events', label: 'Acara', num: '03', icon: Calendar },
  { id: 'section-gallery', label: 'Galeri', num: '04', icon: ImageIcon },
  { id: 'section-gift', label: 'Kado', num: '05', icon: Gift },
  { id: 'section-rsvp', label: 'RSVP', num: '06', icon: MessageSquare },
];

export default function BottomNav({ isVisible }: { isVisible: boolean }) {
  const [activeSection, setActiveSection] = useState<string>('section-hero');

  useEffect(() => {
    if (!isVisible) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isVisible]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  if (!isVisible) return null;

  return (
    <nav
      className="md:hidden fixed bottom-2 left-2 right-2 z-[95] pointer-events-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Navigasi Lembaran Prangko Pos"
    >
      <div className="stamp-dock-strip max-w-sm mx-auto p-1 sm:p-1.5 flex items-end justify-between gap-0.5 sm:gap-1 relative">
        {/* Subtle airmail ribbon top border */}
        <div className="airmail-ribbon absolute top-0 left-0 right-0 h-[3px] opacity-70" />

        {/* Postage Stamp Strip Header Bar */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2F241F] text-[#FAF6F0] px-3 py-0.5 rounded-full text-[6.5px] font-mono tracking-[0.25em] uppercase font-bold shadow-xs">
          BUKLET PRANGKO POS &bull; VIP
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`mini-postage-stamp ${isActive ? 'active-stamp' : ''}`}
              title={`Buka seksi ${item.label}`}
              aria-label={`Buka seksi ${item.label}`}
            >
              {/* Top Denomination / Number */}
              <div className="w-full flex items-center justify-between px-0.5">
                <span className={`text-[6.5px] font-mono tracking-tighter leading-none font-bold ${
                  isActive ? 'text-[#FFD8DE]' : 'text-[#8C1C2E]'
                }`}>
                  {item.num}
                </span>
                <span className={`text-[5px] font-mono tracking-widest leading-none ${
                  isActive ? 'text-[#FFD8DE]/80' : 'text-stone-400'
                }`}>
                  POS
                </span>
              </div>

              {/* Central Stamp Icon */}
              <div className="relative my-0.5">
                <Icon size={14} className={isActive ? 'animate-pulse' : ''} />
                
                {/* Active Postmark Cancellation Wave Lines */}
                {isActive && (
                  <svg
                    className="stamp-postmark-wave"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C6 9 10 15 14 12C18 9 22 15 26 12C30 9 34 15 38 12"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 20C6 17 10 23 14 20C18 17 22 23 26 20C30 17 34 23 38 20"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 28C6 25 10 31 14 28C18 25 22 31 26 28C30 25 34 31 38 28"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>

              {/* Bottom Stamp Label */}
              <span className={`stamp-label text-[7.5px] font-mono uppercase tracking-wider font-bold leading-none truncate w-full text-center ${
                isActive ? 'text-white' : 'text-stone-600'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
