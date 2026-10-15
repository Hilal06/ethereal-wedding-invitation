import React from 'react';
import { motion } from 'motion/react';
import { WebData } from '../types';

interface CoupleProps {
  couple: WebData['couple'];
  settings: WebData['settings'];
}

export default function Couple({ couple, settings }: CoupleProps) {
  // Envelope / Trifold Wax Letter: Fold 2 - Warkat Kedua (Doa & Kisah Kasih)
  return (
    <section id="fold-2-couple" className="py-16 px-4 max-w-5xl mx-auto relative parchment-texture">
      {/* Letter Fold 2: Sacred Invocation & Love Letter Excerpt */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9 }}
        className="trifold-letter-card max-w-3xl mx-auto p-6 sm:p-10 mb-12"
      >
        {/* Top Paper Fold Tag */}
        <div className="flex items-center justify-between border-b border-[#DFD5C8] pb-3 mb-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold">
            WARKAT KEDUA &bull; DOA &amp; KISAH KASIH
          </span>
          <span className="font-serif italic text-xs text-stone-500">
            Halaman 2 dari 3
          </span>
        </div>

        {/* Sacred Verse Opening */}
        <div className="typeset-verse text-center mb-8 px-2">
          {settings.openingGreeting && (
            <h3 className="verse-arabic text-[#701524] mb-4 font-serif whitespace-pre-line select-text font-normal" dir="auto">
              {settings.openingGreeting}
            </h3>
          )}

          {settings.openingQuote && (
            <p className="verse-quote text-[#4A3E39] italic font-serif my-3 leading-relaxed">
              <span className="text-[#8C1C2E] font-normal mr-1.5 select-none font-serif text-base">«</span>
              {settings.openingQuote}
              <span className="text-[#8C1C2E] font-normal ml-1.5 select-none font-serif text-base">»</span>
            </p>
          )}

          {settings.openingQuoteSource && (
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold flex items-center justify-center gap-2 mt-4">
              <span className="text-stone-400 font-serif text-xs">❧</span>
              <span>{settings.openingQuoteSource}</span>
              <span className="text-stone-400 font-serif text-xs">❧</span>
            </p>
          )}
        </div>

        {/* Delicate Pencil Sketch Divider */}
        <div className="flex items-center justify-center gap-3 my-6 opacity-60">
          <div className="w-20 h-[1px] bg-stone-400" />
          <span className="font-serif text-sm italic text-stone-500">&hearts;</span>
          <div className="w-20 h-[1px] bg-stone-400" />
        </div>

        {/* Couple Portraits Pinned via Antique Brass Paperclip */}
        <div className="couple-scrapbook-grid grid sm:grid-cols-2 mt-6 pt-4 items-start">
          {/* Groom Polaroid */}
          <div className="groom-wrap relative transition-transform duration-300 hover:rotate-0 hover:z-10">
            <div className="brass-paperclip" title="Paperclipped to letter" />
            <div className="bg-white p-3.5 pb-6 border border-[#E2D9CC] shadow-md">
              {couple.groomImage && (
                <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-3 border border-stone-200 relative">
                  <div className="photo-mounting-corner top-left" />
                  <div className="photo-mounting-corner top-right" />
                  <div className="photo-mounting-corner bottom-left" />
                  <div className="photo-mounting-corner bottom-right" />
                  <img
                    src={couple.groomImage}
                    alt={couple.groomName || "Groom"}
                    className="w-full h-full object-cover filter contrast-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="text-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C1C2E] font-bold block">
                  MEMPELAI PRIA
                </span>
                <h4 className="font-serif text-2xl text-[#2F241F] font-bold mt-1">
                  {couple.groomName || "Mempelai Pria"}
                </h4>
                {couple.groomParents && (
                  <p className="text-stone-500 text-xs font-serif italic mt-1">
                    Putra tercinta dari {couple.groomParents}
                  </p>
                )}
                {couple.groomQuote && (
                  <div className="mt-3 pt-2 bg-[#FAF6F0] p-2.5 rounded-xs border-y border-dashed border-[#DFD2C0]">
                    <span className="font-mono text-[8px] text-[#8C1C2E] uppercase tracking-widest block font-bold mb-0.5">
                      CATATAN TULISAN TANGAN
                    </span>
                    <p className="font-serif text-xs text-stone-700 italic">
                      "{couple.groomQuote}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bride Polaroid */}
          <div className="bride-wrap relative transition-transform duration-300 hover:rotate-0 hover:z-10">
            <div className="brass-paperclip" title="Paperclipped to letter" />
            <div className="bg-white p-3.5 pb-6 border border-[#E2D9CC] shadow-md">
              {couple.brideImage && (
                <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-3 border border-stone-200 relative">
                  <div className="photo-mounting-corner top-left" />
                  <div className="photo-mounting-corner top-right" />
                  <div className="photo-mounting-corner bottom-left" />
                  <div className="photo-mounting-corner bottom-right" />
                  <img
                    src={couple.brideImage}
                    alt={couple.brideName || "Bride"}
                    className="w-full h-full object-cover filter contrast-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="text-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C1C2E] font-bold block">
                  MEMPELAI WANITA
                </span>
                <h4 className="font-serif text-2xl text-[#2F241F] font-bold mt-1">
                  {couple.brideName || "Mempelai Wanita"}
                </h4>
                {couple.brideParents && (
                  <p className="text-stone-500 text-xs font-serif italic mt-1">
                    Putri tercinta dari {couple.brideParents}
                  </p>
                )}
                {couple.brideQuote && (
                  <div className="mt-3 pt-2 bg-[#FAF6F0] p-2.5 rounded-xs border-y border-dashed border-[#DFD2C0]">
                    <span className="font-mono text-[8px] text-[#8C1C2E] uppercase tracking-widest block font-bold mb-0.5">
                      CATATAN TULISAN TANGAN
                    </span>
                    <p className="font-serif text-xs text-stone-700 italic">
                      "{couple.brideQuote}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fold Crease to Warkat Ketiga */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="trifold-fold-divider" />
      </div>
    </section>
  );
}
