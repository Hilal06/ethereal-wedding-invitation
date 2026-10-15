import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';

export default function Gallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  // Envelope / Trifold Wax Letter: Album Foto & Galeri Mempelai
  return (
    <section className="py-16 px-4 parchment-texture">
      <div className="max-w-5xl mx-auto">
        <div className="trifold-letter-card p-6 sm:p-8 mb-8 text-center">
          <div className="flex items-center justify-between border-b border-[#DFD5C8] pb-3 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold">
              LAMPIRAN WARKAT &bull; ALBUM FOTO DOKUMENTER
            </span>
            <span className="font-serif italic text-xs text-stone-500">
              Kenangan Terindah
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8C1C2E] font-bold block mb-1">
            Galeri Mempelai
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2F241F] font-bold mb-3">
            Goresan Jejak Langkah
          </h2>
          <p className="font-serif italic text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
            Potret kebersamaan dan perjalanan kisah kami sebelum mengikat ikrar suci pernikahan:
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 opacity-70">
            <div className="w-16 h-[1px] bg-[#8C1C2E]/40" />
            <span className="font-mono text-xs text-[#8C1C2E]">&loz;</span>
            <div className="w-16 h-[1px] bg-[#8C1C2E]/40" />
          </div>
        </div>

        {/* Asymmetric Mosaic Grid */}
        <div className="gallery-pinboard-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start">
          {images.map((src, idx) => {
            const tilts = ['-rotate-1.5', 'rotate-1.5 sm:mt-5', '-rotate-1', 'rotate-1 sm:-mt-3', '-rotate-2 sm:mt-4', 'rotate-2'];
            const tiltClass = tilts[idx % tilts.length];
            const hasClip = idx % 2 === 0;

            return (
              <div
                key={idx}
                onClick={() => setSelectedImage(src)}
                className={`bg-white p-3.5 pb-6 border border-[#DFD5C8] shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer relative group rounded-xs transform ${tiltClass} hover:rotate-0 hover:z-10`}
              >
                {hasClip ? (
                  <div className="brass-paperclip" title="Paperclipped to board" />
                ) : (
                  <div className="washi-tape -top-2.5 left-1/2 -translate-x-1/2" />
                )}

                <div className="overflow-hidden bg-stone-100 border border-stone-200 relative mt-1 aspect-[4/5]">
                  <div className="photo-mounting-corner top-left" />
                  <div className="photo-mounting-corner top-right" />
                  <div className="photo-mounting-corner bottom-left" />
                  <div className="photo-mounting-corner bottom-right" />
                  <img
                    src={src}
                    alt={`Potret ${idx + 1}`}
                    className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#8C1C2E] font-bold">
                    POLAROID N&deg; {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif italic text-[10px] text-stone-500">
                    Scrapbook Pin
                  </span>
                </div>

                <div className="absolute inset-0 bg-[#2F241F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-[#8C1C2E] shadow-sm">
                    <ZoomIn size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full max-w-3xl mx-auto mt-12">
          <div className="trifold-fold-divider" />
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
              <motion.img
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.92 }}
                src={selectedImage}
                alt="Preview"
                className="max-w-full max-h-[85vh] rounded-xs object-contain shadow-2xl border-4 border-white"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
