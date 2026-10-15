import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, MailCheck, Check } from 'lucide-react';
import { WishType } from '../types';

export default function RSVPForm({ initialWishes }: { initialWishes: WishType[] }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'yes',
    guests: '1',
    message: ''
  });

  const [wishes, setWishes] = useState<WishType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setWishes(initialWishes || []);
  }, [initialWishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || '';

    const newWish: WishType = {
      Name: formData.name,
      Email: formData.email,
      Attendance: formData.attendance,
      Guests: formData.guests,
      Message: formData.message,
      Timestamp: new Date().toISOString()
    };

    setWishes([newWish, ...wishes]);

    try {
      if (GOOGLE_SHEET_URL) {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
      setFormData({
        name: '',
        email: '',
        attendance: 'yes',
        guests: '1',
        message: ''
      });
    } catch {
      alert("Gagal mengirim ucapan, silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Envelope / Trifold Wax Letter: Kartu Pos Balasan (RSVP & Buku Tamu)
  return (
    <section className="py-16 px-4 parchment-texture">
      <div className="max-w-5xl mx-auto">
        <div className="trifold-letter-card p-6 sm:p-8 mb-8 text-center">
          <div className="flex items-center justify-between border-b border-[#DFD5C8] pb-3 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold">
              KARTU POS BALASAN &bull; CARTE POSTALE
            </span>
            <span className="font-serif italic text-xs text-stone-500">
              Konfirmasi &amp; Doa
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8C1C2E] font-bold block mb-1">
            RSVP &amp; Buku Tamu
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2F241F] font-bold mb-3">
            Konfirmasi Kehadiran
          </h2>
          <p className="font-serif italic text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
            Kehadiran dan doa restu Anda merupakan kado terindah bagi kami. Mohon isi kartu pos balasan berikut:
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 opacity-70">
            <div className="w-16 h-[1px] bg-[#8C1C2E]/40" />
            <span className="font-mono text-xs text-[#8C1C2E]">&diams;</span>
            <div className="w-16 h-[1px] bg-[#8C1C2E]/40" />
          </div>
        </div>

        <div className="rsvp-overdrive-1 grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="trifold-letter-card p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="airmail-ribbon absolute top-0 left-0 right-0 opacity-60" />

            <div className="flex items-start justify-between border-b border-[#DFD5C8] pb-4 mb-6 pt-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#8C1C2E]/10 rounded-xs mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C1C2E] animate-pulse" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold">
                    LEMBAR JAWABAN TAMU
                  </span>
                </div>
                <p className="font-serif italic text-xs text-stone-500">
                  Goreskan tinta warkat untuk kedua mempelai
                </p>
              </div>
              <div className="postage-stamp-box scale-90 origin-top-right shadow-sm border border-[#8C1C2E]/40">
                <span className="text-[7px] tracking-widest text-[#8C1C2E] font-bold">REPLY</span>
                <Heart size={12} className="text-[#8C1C2E]" fill="currentColor" />
                <span className="text-[7px] font-mono text-[#8C1C2E]">OFFICIAL</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C1C2E] font-bold mb-1">
                  NAMA LENGKAP PENULIS WARKAT *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tuliskan nama lengkap Anda..."
                  className="ruled-stationery-input focus:bg-white/80 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C1C2E] font-bold mb-2">
                  KONFIRMASI KEHADIRAN RESMI *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'yes' })}
                    className={`py-3 px-3 rounded-xs font-mono text-[10px] uppercase tracking-wider font-bold transition-all border cursor-pointer flex items-center justify-center gap-2 ${
                      formData.attendance === 'yes'
                        ? 'bg-[#8C1C2E] text-white border-[#8C1C2E] shadow-md scale-[1.02]'
                        : 'bg-[#FAF6F0] text-stone-700 border-[#DFD5C8] hover:bg-[#EAE1D5]'
                    }`}
                  >
                    <span className="text-xs">✓</span>
                    <span>Hadir dengan Sukacita</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'no' })}
                    className={`py-3 px-3 rounded-xs font-mono text-[10px] uppercase tracking-wider font-bold transition-all border cursor-pointer flex items-center justify-center gap-2 ${
                      formData.attendance === 'no'
                        ? 'bg-[#2F241F] text-white border-[#2F241F] shadow-md scale-[1.02]'
                        : 'bg-[#FAF6F0] text-stone-700 border-[#DFD5C8] hover:bg-[#EAE1D5]'
                    }`}
                  >
                    <span className="text-xs">✕</span>
                    <span>Maaf, Berhalangan</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C1C2E] font-bold mb-1">
                  UNTAIAN WARKAT DOA RESTU *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Goreskan untaian ucapan dan doa restu Anda..."
                  className="ruled-stationery-input resize-none leading-relaxed focus:bg-white/80 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-[#8C1C2E] hover:bg-[#701524] text-white rounded-xs font-mono text-xs uppercase tracking-[0.25em] font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#A32236]"
              >
                {isSubmitting ? (
                  <span>Mengirimkan Warkat Pos...</span>
                ) : submitSuccess ? (
                  <>
                    <Check size={16} />
                    <span>Terima Kasih, Warkat Doa Diterima!</span>
                  </>
                ) : (
                  <>
                    <MailCheck size={16} />
                    <span>KIRIM WARKAT DOA RESTU &rarr;</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Kotak Surat Doa Live Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="trifold-letter-card p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="airmail-ribbon absolute top-0 left-0 right-0 opacity-60" />

            <div className="flex items-center justify-between pb-3 border-b border-[#DFD5C8] mb-4 pt-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C1C2E] font-bold">
                  KOTAK SURAT DOA
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#8C1C2E] text-white font-mono text-[8px] font-bold">
                  {wishes.length}
                </span>
              </div>
              <span className="font-serif italic text-xs text-stone-500">
                Warkat Doa Terkirim
              </span>
            </div>

            <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
              {wishes.map((w, idx) => (
                <div key={idx} className="p-4 rounded-xs bg-[#FAF6F0] border border-[#E5DACD] relative overflow-hidden shadow-xs hover:border-[#8C1C2E]/40 transition-colors">
                  <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-dotted border-stone-300">
                    <span className="font-serif font-bold text-sm text-[#2F241F] flex items-center gap-1.5">
                      <span className="text-stone-400 font-mono text-[10px]">#{String(idx + 1).padStart(2, '0')}</span>
                      <span>{w.Name}</span>
                    </span>
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded-xs uppercase tracking-wider font-bold ${
                      w.Attendance === 'yes'
                        ? 'bg-[#8C1C2E]/10 text-[#8C1C2E] border border-[#8C1C2E]/20'
                        : 'bg-stone-200 text-stone-600'
                    }`}>
                      {w.Attendance === 'yes' ? 'Hadir' : 'Absen'}
                    </span>
                  </div>
                  <p className="font-serif text-xs text-stone-700 italic leading-relaxed">"{w.Message}"</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
