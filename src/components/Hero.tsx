import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Divider from './Divider';



interface HeroProps {
  weddingDate: Date;
  groomName: string;
  brideName: string;
}

export default function Hero({ weddingDate, groomName, brideName }: HeroProps) {
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
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4 mt-20 md:mt-32"
      >
        <p className="text-lg md:text-xl tracking-[0.3em] uppercase mb-6 font-light">Pernikahan</p>
        <h1 className="flex flex-col items-center gap-2 text-5xl md:text-7xl font-serif mb-2 italic text-center w-full max-w-4xl mx-auto leading-tight">
          <span className="text-balance">{groomName}</span>
          <span className="text-3xl md:text-5xl not-italic font-sans text-wedding-gold my-2">&</span>
          <span className="text-balance">{brideName}</span>
        </h1>
        
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
          <div className="flex gap-4 md:gap-8 justify-center mt-12">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-serif">{item.value ?? 0}</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-80">{item.label}</span>
              </div>
            ))}
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
