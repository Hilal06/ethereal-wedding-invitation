import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { intervalToDuration } from 'date-fns';
import Divider from './Divider';

const Petal = ({ delay, left, duration }: { delay: number, left: string, duration: number }) => (
  <motion.div
    initial={{ y: -50, x: 0, opacity: 0, rotate: 0 }}
    animate={{ y: '100vh', x: 50, opacity: [0, 0.8, 0.8, 0], rotate: 360 }}
    transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    className="absolute top-0 w-3 h-3 bg-wedding-gold/50 rounded-[40%_100%_40%_100%] shadow-[0_0_10px_rgba(255,255,255,0.5)] z-0"
    style={{ left }}
  />
);

interface HeroProps {
  weddingDate: Date;
  groomName: string;
  brideName: string;
}

export default function Hero({ weddingDate, groomName, brideName }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const duration = intervalToDuration({
        start: new Date(),
        end: weddingDate,
      });
      setTimeLeft(duration);
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
        <Petal delay={0} left="10%" duration={8} />
        <Petal delay={2} left="30%" duration={12} />
        <Petal delay={5} left="50%" duration={9} />
        <Petal delay={1} left="70%" duration={11} />
        <Petal delay={4} left="90%" duration={10} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4 mt-20 md:mt-32"
      >
        <p className="text-lg md:text-xl tracking-[0.3em] uppercase mb-6 font-light">The Wedding of</p>
        <h1 className="flex flex-col items-center gap-2 text-5xl md:text-7xl font-serif mb-2 italic text-center w-full max-w-4xl mx-auto leading-tight">
          <span className="text-balance">{groomName}</span>
          <span className="text-3xl md:text-5xl not-italic font-sans text-wedding-gold my-2">&</span>
          <span className="text-balance">{brideName}</span>
        </h1>
        
        <Divider />
        
        {timeLeft && (
          <div className="flex gap-4 md:gap-8 justify-center mt-12">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
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
          <p className="text-xs uppercase tracking-[0.5em] opacity-60">Scroll to Explore</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
