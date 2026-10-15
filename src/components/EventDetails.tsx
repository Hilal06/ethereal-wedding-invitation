import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, ExternalLink, Navigation, Calendar, Copy, Check } from 'lucide-react';
import { EventType } from '../types';

interface EventDetailsProps {
  events: EventType[];
  groomName?: string;
  brideName?: string;
}

export default function EventDetails({ events, groomName = "Rifaul", brideName = "Firda" }: EventDetailsProps) {
  const isSingle = events.length === 1;
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyLocation = async (loc: string, idx: number) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(loc);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = loc;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2500);
    } catch {
      alert("Alamat: " + loc);
    }
  };

  const getCalendarUrl = (evt: EventType) => {
    const coupleTitle = `${groomName} & ${brideName}`;
    const title = encodeURIComponent(`${evt.Name} - Pernikahan ${coupleTitle}`);
    const details = encodeURIComponent(`Waktu Pelaksanaan: ${evt.Time}\nLokasi: ${evt.Location}\n\nUndangan Resmi Warkat Pernikahan ${coupleTitle}.`);
    const location = encodeURIComponent(evt.Location);
    // Standard Google Calendar event url
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Envelope / Trifold Wax Letter: Fold 3 - Warkat Ketiga (Jadwal & Lokasi Resmi)
  return (
    <section className="py-16 px-4 relative parchment-texture">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9 }}
        className="max-w-4xl mx-auto"
      >
        <div className="trifold-letter-card p-6 sm:p-8 mb-8 text-center">
          <div className="flex items-center justify-between border-b border-[#DFD5C8] pb-3 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold">
              WARKAT KETIGA &bull; JADWAL &amp; LOKASI RESMI
            </span>
            <span className="font-serif italic text-xs text-stone-500">
              Halaman 3 dari 3
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8C1C2E] font-bold block mb-1">
            Waktu &amp; Tempat Perhelatan
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2F241F] font-bold mb-3">
            Rangkaian Acara
          </h2>
          <p className="font-serif italic text-stone-600 text-sm max-w-md mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir pada waktu yang telah ditentukan:
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 opacity-70">
            <div className="w-16 h-[1px] bg-[#8C1C2E]/40" />
            <span className="font-mono text-xs text-[#8C1C2E]">&sect;</span>
            <div className="w-16 h-[1px] bg-[#8C1C2E]/40" />
          </div>
        </div>

        <div className={`mx-auto ${isSingle ? 'max-w-xl' : 'grid md:grid-cols-2 gap-6'}`}>
          {events.map((evt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="invitation-docket p-6 sm:p-8 flex flex-col justify-between relative"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#8C1C2E]" />

              {/* Perforation Docket Notches & Tear Line */}
              <div className="docket-notch-top right-12" />
              <div className="docket-notch-bottom right-12" />
              <div className="docket-perforation-v right-14 opacity-40" />

              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-dashed border-[#DFD5C8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8C1C2E] text-white flex items-center justify-center font-serif text-sm font-bold shadow-sm">
                      {idx === 0 ? 'I' : 'II'}
                    </div>
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-widest text-[#8C1C2E] font-bold block">
                        DOKET PERHELATAN &bull; NO. WKT-0{idx + 1}
                      </span>
                      <h3 className="text-2xl font-serif text-[#2F241F] font-bold">
                        {evt.Name}
                      </h3>
                    </div>
                  </div>

                  <div className="postmark-circle w-12 h-12 text-[7px] leading-tight scale-90">
                    <span>{evt.Name.toLowerCase().includes('resepsi') ? 'RESEPSI' : 'AKAD'}</span>
                    <span className="font-bold">2026</span>
                  </div>
                </div>

                <div className="space-y-4 my-6 text-stone-700 text-sm">
                  <div className="flex items-start gap-3 bg-[#FAF6F0] p-3.5 rounded-xs border border-[#E5DACD]">
                    <Clock size={16} className="text-[#8C1C2E] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 font-bold block">
                        WAKTU PELAKSANAAN RESMI
                      </span>
                      <span className="font-serif font-bold text-base text-[#2F241F]">{evt.Time}</span>
                    </div>
                  </div>

                  <div className="bg-[#FAF6F0] p-3.5 rounded-xs border border-[#E5DACD]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-[#8C1C2E] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 font-bold block">
                            LOKASI GEDUNG / TEMPAT
                          </span>
                          <span className="font-serif leading-relaxed text-[#2F241F] text-sm block mt-0.5 font-medium">
                            {evt.Location}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyLocation(evt.Location, idx)}
                        className="text-[9px] font-mono text-[#8C1C2E] hover:text-[#6b1422] flex items-center gap-1 flex-shrink-0 px-2 py-1 rounded-xs bg-[#EAE1D5]/60 border border-[#D6C8B6] cursor-pointer transition-colors"
                        title="Salin teks alamat lengkap"
                      >
                        {copiedIdx === idx ? <Check size={11} /> : <Copy size={11} />}
                        <span>{copiedIdx === idx ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Google Maps & Add to Calendar */}
              <div className="pt-4 mt-2 border-t border-dashed border-[#DFD5C8] grid sm:grid-cols-2 gap-2.5">
                {evt.MapURL && evt.MapURL !== '#' && (
                  <a
                    href={evt.MapURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-[#8C1C2E] hover:bg-[#701524] text-white rounded-xs font-mono text-[9.5px] uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Navigation size={12} />
                    <span>PETUNJUK ARAH MAPS</span>
                    <ExternalLink size={10} className="opacity-75" />
                  </a>
                )}

                <a
                  href={getCalendarUrl(evt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-[#FAF6F0] hover:bg-[#F0E6D8] text-[#8C1C2E] border border-[#D6C8B6] rounded-xs font-mono text-[9.5px] uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Calendar size={12} />
                  <span>SIMPAN KE KALENDER</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fold Crease to Lampiran & Galeri */}
      <div className="w-full max-w-3xl mx-auto mt-10">
        <div className="trifold-fold-divider" />
      </div>
    </section>
  );
}
