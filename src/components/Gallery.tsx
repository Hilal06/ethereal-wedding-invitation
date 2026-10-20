import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Layers, Grid, ChevronDown, ChevronUp } from 'lucide-react';

export default function Gallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentSheet, setCurrentSheet] = useState(0);
  const [isExpandedAll, setIsExpandedAll] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const total = images ? images.length : 0;
  const photosPerSheet = 3;
  const totalSheets = Math.ceil(total / photosPerSheet);

  const toRoman = (idx: number) => {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return romans[idx] || String(idx + 1);
  };

  const handlePrevSheet = () => {
    setCurrentSheet((prev) => (prev > 0 ? prev - 1 : totalSheets - 1));
  };

  const handleNextSheet = () => {
    setCurrentSheet((prev) => (prev < totalSheets - 1 ? prev + 1 : 0));
  };

  const handlePrev = useCallback(() => {
    if (selectedIndex === null || total === 0) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : total - 1));
  }, [selectedIndex, total]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null || total === 0) return;
    setSelectedIndex((prev) => (prev! < total - 1 ? prev! + 1 : 0));
  }, [selectedIndex, total]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  // Touch swipe support for smartphone Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  if (!images || total === 0) return null;

  // Active photos for current folio sheet
  const sheetPhotos = images.slice(
    currentSheet * photosPerSheet,
    (currentSheet + 1) * photosPerSheet
  );

  // Helper renderer for authentic tactile Polaroid cards
  const renderPolaroid = (
    src: string,
    globalIdx: number,
    localIdx: number,
    options: { isCompact?: boolean; tiltOverride?: string } = {}
  ) => {
    const defaultTilts = ['-rotate-1', 'rotate-1.5', '-rotate-2'];
    const tiltClass = options.tiltOverride || defaultTilts[localIdx % defaultTilts.length];
    const hasPaperclip = localIdx === 0;
    const hasTape = localIdx === 1;
    const hasMountCorners = localIdx === 2;

    return (
      <div
        key={globalIdx}
        onClick={() => setSelectedIndex(globalIdx)}
        className={`bg-white p-2.5 sm:p-3.5 pb-4 sm:pb-6 border border-[#DFD5C8] shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer relative group rounded-xs transform ${tiltClass} hover:rotate-0 hover:z-10`}
      >
        {/* Physical Stationery Pin Ornaments */}
        {hasPaperclip && (
          <div className="brass-paperclip scale-90 sm:scale-100" title="Paperclipped to scrapbook" />
        )}
        {hasTape && (
          <div className="washi-tape -top-2.5 left-1/2 -translate-x-1/2 scale-90 sm:scale-100" />
        )}

        <div className="overflow-hidden bg-stone-100 border border-stone-200 relative mt-1 aspect-[4/5]">
          {hasMountCorners && (
            <>
              <div className="photo-mounting-corner top-left" />
              <div className="photo-mounting-corner top-right" />
              <div className="photo-mounting-corner bottom-left" />
              <div className="photo-mounting-corner bottom-right" />
            </>
          )}
          <img
            src={src}
            alt={`Dokumentasi ${globalIdx + 1}`}
            className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="mt-2.5 sm:mt-3 flex items-center justify-between px-1">
          <span className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-widest text-[#8C1C2E] font-bold">
            POLAROID N&deg; {String(globalIdx + 1).padStart(2, '0')}
          </span>
          <span className="font-serif italic text-[9px] sm:text-[10px] text-stone-500">
            Perbesar &rarr;
          </span>
        </div>

        <div className="absolute inset-0 bg-[#2F241F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 flex items-center justify-center text-[#8C1C2E] shadow-sm">
            <ZoomIn size={15} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="section-gallery" className="py-16 px-4 parchment-texture">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
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

        {/* ========================================================
            ALBUM FOLIO LEMBARAN MADING (Compact & Tactile)
            ======================================================== */}
        {!isExpandedAll ? (
          <div>
            {/* Sheet Tabs Bar (Kearsipan Pos Vintage) */}
            {totalSheets > 1 && (
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-[70%]">
                  {Array.from({ length: totalSheets }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSheet(idx)}
                      className={`px-3 py-1 rounded-xs font-mono text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer border ${
                        currentSheet === idx
                          ? 'bg-[#8C1C2E] text-white border-[#8C1C2E] shadow-xs scale-105'
                          : 'bg-[#FAF6F0] text-stone-600 border-[#DFD5C8] hover:bg-[#EAE1D5]'
                      }`}
                      title={`Buka Lembar ${toRoman(idx)}`}
                    >
                      <span>Lembar {toRoman(idx)}</span>
                    </button>
                  ))}
                </div>

                {/* Toggle to expand full grid */}
                <button
                  onClick={() => setIsExpandedAll(true)}
                  className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-[#8C1C2E] hover:underline font-bold py-1 px-2.5 rounded-xs bg-[#FAF6F0] border border-[#DFD5C8] cursor-pointer"
                  title="Buka seluruh papan foto mading sekaligus"
                >
                  <Grid size={11} />
                  <span>Semua ({total})</span>
                </button>
              </div>
            )}

            {/* Mading Pinboard Sheet Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSheet}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-[#FAF6F0] p-4 sm:p-6 border border-[#DFD5C8] rounded-sm shadow-md"
              >
                {/* Airmail Ribbon Header for Sheet */}
                <div className="airmail-ribbon absolute top-0 left-0 right-0 h-[3px] opacity-60" />

                {/* Sheet Title Stamp */}
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-dashed border-[#DFD5C8]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8C1C2E]" />
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold">
                      DOKUMENTASI LEMBAR {toRoman(currentSheet)} &bull; SERI {currentSheet * photosPerSheet + 1}–{Math.min((currentSheet + 1) * photosPerSheet, total)} DARI {total}
                    </span>
                  </div>
                  <span className="font-serif italic text-xs text-stone-500">
                    Mading Arsip Pos
                  </span>
                </div>

                {/* ========================================================
                    MOBILE VIEWPORT (<sm): ASYMMETRIC 1 + 2 SCRAPBOOK COLLAGE
                    Featured Photo 1 on top + Photos 2 & 3 side-by-side
                    ======================================================== */}
                <div className="sm:hidden space-y-3">
                  {/* Photo 1: Large Featured Polaroid with Brass Clip */}
                  {sheetPhotos[0] && (
                    <div className="max-w-[280px] mx-auto">
                      {renderPolaroid(sheetPhotos[0], currentSheet * photosPerSheet, 0, {
                        tiltOverride: '-rotate-1',
                      })}
                    </div>
                  )}

                  {/* Photos 2 & 3: Paired Side-by-Side Polaroids */}
                  {sheetPhotos.length > 1 && (
                    <div className="grid grid-cols-2 gap-2.5 items-start pt-1">
                      {sheetPhotos.slice(1).map((src, idx) => (
                        <div key={idx}>
                          {renderPolaroid(
                            src,
                            currentSheet * photosPerSheet + 1 + idx,
                            idx + 1,
                            {
                              tiltOverride: idx === 0 ? 'rotate-1.5' : '-rotate-1',
                              isCompact: true,
                            }
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ========================================================
                    DESKTOP & TABLET VIEWPORT (>=sm): 3-COLUMN ASYMMETRIC PINBOARD
                    ======================================================== */}
                <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-5 items-start">
                  {sheetPhotos.map((src, localIdx) => (
                    renderPolaroid(src, currentSheet * photosPerSheet + localIdx, localIdx)
                  ))}
                </div>

                {/* Sheet Navigation Controls (Prev & Next Sheet) */}
                {totalSheets > 1 && (
                  <div className="mt-6 pt-4 border-t border-dashed border-[#DFD5C8] flex items-center justify-between text-stone-700">
                    <button
                      onClick={handlePrevSheet}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xs bg-white hover:bg-[#FAF6F0] border border-[#DFD5C8] font-mono text-[9px] uppercase tracking-wider font-bold text-stone-700 transition-colors cursor-pointer shadow-2xs"
                    >
                      <ChevronLeft size={13} />
                      <span>Lembar Sebelumnya</span>
                    </button>

                    <div className="text-center font-mono text-[9px] text-[#8C1C2E] uppercase tracking-widest font-bold">
                      Halaman {currentSheet + 1} dari {totalSheets}
                    </div>

                    <button
                      onClick={handleNextSheet}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xs bg-white hover:bg-[#FAF6F0] border border-[#DFD5C8] font-mono text-[9px] uppercase tracking-wider font-bold text-stone-700 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>Lembar Selanjutnya</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* ========================================================
             EXPANDED FULL MADING GRID (When user toggles "Semua")
             ======================================================== */
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#8C1C2E] font-bold">
                SELURUH KOLEKSI FOTO ({total} POTRET)
              </span>
              <button
                onClick={() => setIsExpandedAll(false)}
                className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-[#8C1C2E] hover:underline font-bold py-1 px-2.5 rounded-xs bg-[#FAF6F0] border border-[#DFD5C8] cursor-pointer"
                title="Lipat kembali ke lembaran album"
              >
                <Layers size={11} />
                <span>Lipat ke Lembaran Album</span>
              </button>
            </div>

            <div className="gallery-pinboard-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 items-start">
              {images.map((src, idx) =>
                renderPolaroid(src, idx, idx % 3)
              )}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setIsExpandedAll(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF6F0] hover:bg-[#EAE1D5] text-[#8C1C2E] border border-[#DFD5C8] rounded-xs font-mono text-[9.5px] uppercase tracking-wider font-bold transition-all cursor-pointer shadow-xs"
              >
                <ChevronUp size={13} />
                <span>Lipat Kembali ke Lembaran Album</span>
              </button>
            </div>
          </div>
        )}

        <div className="w-full max-w-3xl mx-auto mt-12">
          <div className="trifold-fold-divider" />
        </div>

        {/* Enhanced Lightbox Modal with Next/Prev and Touch Swipe */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="fixed inset-0 z-[130] bg-stone-950/90 backdrop-blur-sm flex flex-col items-center justify-between p-4 sm:p-6 select-none"
            >
              {/* Top Bar with Counter and Close Button */}
              <div
                className="w-full max-w-4xl flex items-center justify-between z-20 pt-2 px-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-stone-900/80 px-3 py-1.5 rounded-full border border-stone-700/60 text-stone-200">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#FFD8DE]">
                    Foto {selectedIndex + 1} dari {total} &bull; CARTE POSTALE
                  </span>
                </div>

                <button
                  onClick={() => setSelectedIndex(null)}
                  className="w-10 h-10 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 flex items-center justify-center transition-colors cursor-pointer border border-stone-700"
                  title="Tutup Galeri (Esc)"
                  aria-label="Tutup Galeri"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Image Container & Side Navigation Controls */}
              <div
                className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-auto px-2 sm:px-12"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-1 sm:left-2 z-20 w-11 h-11 rounded-full bg-stone-900/80 hover:bg-[#8C1C2E] text-white flex items-center justify-center transition-all cursor-pointer border border-stone-700 shadow-xl active:scale-95"
                  title="Foto Sebelumnya (Panah Kiri)"
                  aria-label="Foto Sebelumnya"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Animated Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="relative max-h-[75vh] flex items-center justify-center"
                  >
                    <img
                      src={images[selectedIndex]}
                      alt={`Dokumentasi ${selectedIndex + 1}`}
                      className="max-w-full max-h-[75vh] rounded-xs object-contain shadow-2xl border-4 border-white bg-white"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-1 sm:right-2 z-20 w-11 h-11 rounded-full bg-stone-900/80 hover:bg-[#8C1C2E] text-white flex items-center justify-center transition-all cursor-pointer border border-stone-700 shadow-xl active:scale-95"
                  title="Foto Selanjutnya (Panah Kanan)"
                  aria-label="Foto Selanjutnya"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Bottom Instructions / Caption */}
              <div
                className="text-stone-400 font-mono text-[9px] uppercase tracking-wider text-center py-2"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="hidden sm:inline">Gunakan tombol panah &larr; &rarr; pada keyboard &bull; </span>
                <span>Geser layar untuk berpindah foto</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
