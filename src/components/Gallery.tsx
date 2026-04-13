import React from 'react';
import { motion } from 'motion/react';

export default function Gallery({ images }: { images: string[] }) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-serif mb-6">Momen Bahagia Kami</h2>
        <p className="text-stone-500 uppercase tracking-widest text-sm">Kilas balik perjalanan kami</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto space-y-4">
        {images.map((src, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="break-inside-avoid"
          >
            <img 
              src={src} 
              alt={`Gallery ${idx}`} 
              className="w-full rounded-2xl shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
