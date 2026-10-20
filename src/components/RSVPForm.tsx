import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MailCheck, Check, Search, Filter, Users, MessageCircleHeart } from 'lucide-react';
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

  // Guestbook enhancements: Search, Filter, and Reactions
  const [filterType, setFilterType] = useState<'all' | 'yes' | 'no'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [likes, setLikes] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ethereal_wish_likes');
        return stored ? JSON.parse(stored) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    setWishes(initialWishes || []);
  }, [initialWishes]);

  const handleLike = (idxKey: string) => {
    setLikes((prev) => {
      const current = prev[idxKey] || 0;
      const updated = { ...prev, [idxKey]: current + 1 };
      try {
        localStorage.setItem('ethereal_wish_likes', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || '';

    const newWish: WishType = {
      Name: formData.name,
      Email: formData.email,
      Attendance: formData.attendance,
      Guests: formData.attendance === 'yes' ? formData.guests : '0',
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
      setTimeout(() => setSubmitSuccess(false), 4500);
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

  // Filtered & Searched Wishes
  const filteredWishes = useMemo(() => {
    return wishes.filter((w) => {
      const matchSearch =
        w.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.Message.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchSearch) return false;

      if (filterType === 'yes') return w.Attendance === 'yes';
      if (filterType === 'no') return w.Attendance === 'no';
      return true;
    });
  }, [wishes, filterType, searchTerm]);

  const yesCount = useMemo(() => wishes.filter(w => w.Attendance === 'yes').length, [wishes]);
  const noCount = useMemo(() => wishes.filter(w => w.Attendance === 'no').length, [wishes]);

  const formatTimestamp = (ts?: string) => {
    if (!ts) return '';
    try {
      const d = new Date(ts);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <section id="section-rsvp" className="py-16 px-4 parchment-texture">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
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
          {/* Kolom Kiri: Form Kartu Balasan */}
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nama Lengkap */}
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

              {/* Konfirmasi Kehadiran */}
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

              {/* Input Jumlah Tamu (Pax) - Hanya Muncul jika Hadir */}
              <AnimatePresence>
                {formData.attendance === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3.5 bg-[#FAF6F0] rounded-xs border border-[#E5DACD] space-y-2">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-[#8C1C2E]" />
                        <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C1C2E] font-bold">
                          JUMLAH TAMU YANG HADIR (PAX) *
                        </label>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: '1', label: '1 Orang' },
                          { val: '2', label: '2 Orang' },
                          { val: '3+', label: '3+ Orang' },
                        ].map((pax) => (
                          <button
                            key={pax.val}
                            type="button"
                            onClick={() => setFormData({ ...formData, guests: pax.val })}
                            className={`py-2 px-2 rounded-xs font-mono text-[9.5px] uppercase tracking-wider font-bold transition-all border cursor-pointer text-center ${
                              formData.guests === pax.val
                                ? 'bg-[#8C1C2E] text-white border-[#8C1C2E] shadow-2xs'
                                : 'bg-white text-stone-700 border-[#D6C8B6] hover:bg-[#FAF6F0]'
                            }`}
                          >
                            {pax.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-[9.5px] font-serif italic text-stone-500">
                        *Membantu kami menyiapkan kebutuhan jamuan katering dengan baik.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Untaian Doa Restu */}
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[#8C1C2E] hover:bg-[#701524] text-white rounded-xs font-mono text-xs uppercase tracking-[0.25em] font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#A32236]"
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

          {/* Kolom Kanan: Kotak Surat Doa Live Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="trifold-letter-card p-6 sm:p-8 relative overflow-hidden flex flex-col h-full"
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

            {/* Filter Tabs & Search Bar */}
            <div className="space-y-2.5 mb-4">
              {/* Search Bar */}
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari nama pengirim atau isi doa..."
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FAF6F0] border border-[#DFD5C8] rounded-xs font-serif text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#8C1C2E]"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[9px] font-mono">
                <button
                  type="button"
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 rounded-xs font-bold uppercase transition-colors cursor-pointer ${
                    filterType === 'all'
                      ? 'bg-[#8C1C2E] text-white'
                      : 'bg-[#FAF6F0] text-stone-600 hover:bg-[#EAE1D5] border border-[#DFD5C8]'
                  }`}
                >
                  Semua ({wishes.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('yes')}
                  className={`px-2.5 py-1 rounded-xs font-bold uppercase transition-colors cursor-pointer ${
                    filterType === 'yes'
                      ? 'bg-[#8C1C2E] text-white'
                      : 'bg-[#FAF6F0] text-stone-600 hover:bg-[#EAE1D5] border border-[#DFD5C8]'
                  }`}
                >
                  Hadir ({yesCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('no')}
                  className={`px-2.5 py-1 rounded-xs font-bold uppercase transition-colors cursor-pointer ${
                    filterType === 'no'
                      ? 'bg-[#2F241F] text-white'
                      : 'bg-[#FAF6F0] text-stone-600 hover:bg-[#EAE1D5] border border-[#DFD5C8]'
                  }`}
                >
                  Berhalangan ({noCount})
                </button>
              </div>
            </div>

            {/* Wishes Scrollable Feed */}
            <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
              {filteredWishes.length === 0 ? (
                <div className="text-center py-10 bg-[#FAF6F0]/60 rounded-xs border border-dashed border-[#DFD5C8]">
                  <MessageCircleHeart size={28} className="mx-auto text-stone-400 mb-2 opacity-70" />
                  <p className="font-serif italic text-stone-500 text-xs">
                    {searchTerm ? "Tidak ada warkat yang cocok dengan kata pencarian." : "Belum ada warkat doa. Jadilah yang pertama mengirimkan doa!"}
                  </p>
                </div>
              ) : (
                filteredWishes.map((w, idx) => {
                  const wishKey = `${w.Name}-${w.Timestamp || idx}`;
                  const currentLikes = likes[wishKey] || 0;

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xs bg-[#FAF6F0] border border-[#E5DACD] relative overflow-hidden shadow-xs hover:border-[#8C1C2E]/40 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2 pb-1.5 border-b border-dotted border-stone-300">
                        <div>
                          <span className="font-serif font-bold text-sm text-[#2F241F] flex items-center gap-1.5">
                            <span className="text-stone-400 font-mono text-[9px]">#{String(idx + 1).padStart(2, '0')}</span>
                            <span>{w.Name}</span>
                          </span>
                          {w.Timestamp && (
                            <span className="font-mono text-[7.5px] text-stone-400 block mt-0.5">
                              {formatTimestamp(w.Timestamp)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {w.Attendance === 'yes' && w.Guests && w.Guests !== '0' && (
                            <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded-xs bg-[#FAF6F0] text-stone-600 border border-stone-300">
                              {w.Guests} Tamu
                            </span>
                          )}
                          <span
                            className={`text-[8px] font-mono px-2 py-0.5 rounded-xs uppercase tracking-wider font-bold ${
                              w.Attendance === 'yes'
                                ? 'bg-[#8C1C2E]/10 text-[#8C1C2E] border border-[#8C1C2E]/20'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {w.Attendance === 'yes' ? 'Hadir' : 'Absen'}
                          </span>
                        </div>
                      </div>

                      <p className="font-serif text-xs text-stone-700 italic leading-relaxed whitespace-pre-wrap">
                        "{w.Message}"
                      </p>

                      {/* Footer Reaction Button */}
                      <div className="mt-2.5 pt-1.5 border-t border-dashed border-[#DFD5C8] flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleLike(wishKey)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[9px] font-mono text-stone-500 hover:text-[#8C1C2E] bg-white border border-[#DFD5C8] hover:border-[#8C1C2E]/40 cursor-pointer transition-all active:scale-95"
                          title="Kirimkan rasa suka / cinta untuk ucapan ini"
                        >
                          <Heart
                            size={11}
                            className={currentLikes > 0 ? 'text-[#8C1C2E] fill-[#8C1C2E]' : 'text-stone-400'}
                          />
                          <span>{currentLikes > 0 ? currentLikes : 'Aamiin'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
