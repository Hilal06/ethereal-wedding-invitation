import React from 'react';
import { motion } from 'motion/react';

export default function Gallery({ images }: { images: string[] }) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-serif mb-6">Momen Bahagia Kami</h2>
        <p className="text-stone-500 uppercase tracking-widest text-sm">Our Journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="relative group aspect-[4/5] rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
            <img
              src={src}
              alt={`Gallery ${idx}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
