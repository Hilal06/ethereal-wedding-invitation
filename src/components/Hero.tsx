import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Divider from './Divider';



interface HeroProps {
  weddingDate: Date;
  groomName: string;
  brideName: string;
  groomParents?: string;
  brideParents?: string;
  groomQuote?: string;
  brideQuote?: string;
}

export default function Hero({ weddingDate, groomName, brideName, groomParents, brideParents, groomQuote, brideQuote }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diffTime = weddingDate.getTime() - now.getTime();

      if (diffTime <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div
        animate={{ scale: [1, 1.15] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4 mt-20 md:mt-32"
      >
        <p className="text-lg md:text-xl tracking-[0.3em] uppercase mb-6 font-light">Akad Nikah</p>
        <div className="flex flex-col items-center mb-6 text-center w-full max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif italic leading-tight text-balance mb-2">
            {groomName}
          </h2>
          {groomParents && <p className="text-sm md:text-base tracking-[0.2em] uppercase text-stone-300 mb-2">{groomParents}</p>}
          {groomQuote && <p className="text-xs md:text-sm font-light text-white/80 max-w-md text-balance italic whitespace-pre-line mb-6">{groomQuote}</p>}

          <span className="text-3xl md:text-5xl font-sans text-wedding-gold my-4">&</span>

          <h2 className="text-5xl md:text-7xl font-serif italic leading-tight text-balance mb-2 mt-4">
            {brideName}
          </h2>
          {brideParents && <p className="text-sm md:text-base tracking-[0.2em] uppercase text-stone-300 mb-2">{brideParents}</p>}
          {brideQuote && <p className="text-xs md:text-sm font-light text-white/80 max-w-md text-balance italic whitespace-pre-line">{brideQuote}</p>}
        </div>

        <Divider />

        <div className="mt-8 text-sm md:text-base font-light tracking-widest">
          {(() => {
            const day = String(weddingDate.getDate()).padStart(2, '0');
            const month = String(weddingDate.getMonth() + 1).padStart(2, '0');
            const year = weddingDate.getFullYear();
            return `${day} . ${month} . ${year}`;
          })()}
        </div>

        {timeLeft && (
          <div className="flex justify-center mt-12 px-4">
            <div className="flex items-center gap-4 md:gap-8">
              {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds },
              ].map((item, idx, arr) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                    <span className="text-4xl md:text-5xl font-serif text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-2">{item.value ?? 0}</span>
                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/80">{item.label}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-20"
        >
          <p className="text-xs uppercase tracking-[0.5em] opacity-60">Geser Ke Bawah</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
