import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquare } from 'lucide-react';
import { WishType } from '../types';
import Flower from './Flower';

export default function RSVPForm({ initialWishes }: { initialWishes: WishType[] }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'yes',
    guests: '1',
    message: ''
  });

  const [wishes, setWishes] = useState<WishType[]>([]);

  // Update wishes when initialWishes from CMS loads
  useEffect(() => {
    setWishes(initialWishes);
  }, [initialWishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // URL Web App Google Apps Script dari .env
    const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || '';

    const newWish: WishType = {
      Name: formData.name,
      Email: formData.email,
      Attendance: formData.attendance,
      Guests: formData.guests,
      Message: formData.message,
      Timestamp: new Date().toISOString()
    };

    // Tetap simpan di local state untuk feedback instan di UI
    setWishes([newWish, ...wishes]);

    try {
      // Mengirim data ke Google Sheets
      if (GOOGLE_SHEET_URL) {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors', // Penting untuk Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      
      alert('Terima kasih! Data RSVP Anda telah tersimpan di Google Sheets kami.');
    } catch (error) {
      console.error('Error sending to Google Sheets:', error);
      alert('Terima kasih! Ucapan Anda telah terkirim.');
    }

    setFormData({
      name: '',
      email: '',
      attendance: 'yes',
      guests: '1',
      message: ''
    });
  };

  return (
    <section className="py-24 bg-wedding-cream px-4 relative">
      <Flower position="top-left" delay={0.2} className="opacity-40 -z-10" />
      <Flower position="bottom-right" delay={0.5} className="opacity-40 -z-10" />
      
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        {/* Form Side */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 rounded-[40px] h-fit bg-white/60 backdrop-blur-md"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif mb-4">RSVP</h2>
            <p className="text-stone-500 text-sm italic">Konfirmasi kehadiran Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 mt-4">
            <div className="grid grid-cols-2 gap-8">
              <div className="relative">
                <input 
                  type="text" 
                  id="name"
                  required
                  className="peer w-full bg-transparent border-b border-stone-200 py-3 text-stone-800 focus:outline-none focus:border-wedding-gold transition-colors placeholder-transparent"
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <label htmlFor="name" className="absolute left-0 -top-3.5 text-[10px] md:text-xs uppercase tracking-widest text-stone-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-wedding-gold pointer-events-none">
                  Nama Lengkap
                </label>
              </div>
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  required
                  className="peer w-full bg-transparent border-b border-stone-200 py-3 text-stone-800 focus:outline-none focus:border-wedding-gold transition-colors placeholder-transparent"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-[10px] md:text-xs uppercase tracking-widest text-stone-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-wedding-gold pointer-events-none">
                  Email
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-2">
              <div className="relative">
                <label className="absolute left-0 -top-3.5 text-[10px] md:text-xs uppercase tracking-widest text-stone-500 pointer-events-none">Kehadiran</label>
                <select 
                  className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-800 focus:outline-none focus:border-wedding-gold transition-colors appearance-none cursor-pointer"
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                >
                  <option value="yes">Hadir</option>
                  <option value="no">Tidak Hadir</option>
                </select>
              </div>
              <div className="relative">
                <label className="absolute left-0 -top-3.5 text-[10px] md:text-xs uppercase tracking-widest text-stone-500 pointer-events-none">Jumlah Tamu</label>
                <select 
                  className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-800 focus:outline-none focus:border-wedding-gold transition-colors appearance-none cursor-pointer"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                </select>
              </div>
            </div>

            <div className="relative pt-2">
              <textarea 
                id="message"
                rows={4}
                required
                className="peer w-full bg-transparent border-b border-stone-200 py-3 text-stone-800 focus:outline-none focus:border-wedding-gold transition-colors resize-none placeholder-transparent"
                placeholder="Ucapan & Doa"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              <label htmlFor="message" className="absolute left-0 -top-3.5 text-[10px] md:text-xs uppercase tracking-widest text-stone-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-wedding-gold pointer-events-none">
                Ucapan & Doa
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-stone-800 text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors uppercase tracking-[0.2em] text-sm mt-8"
            >
              <Send size={16} /> Kirim RSVP
            </button>
          </form>
        </motion.div>

        {/* Wishes List Side */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="text-wedding-gold" />
            <h3 className="text-2xl font-serif">Ucapan & Doa</h3>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {wishes.map((wish, idx) => (
                <motion.div 
                  key={wish.Timestamp + idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/50 p-6 rounded-2xl border border-stone-100"
                >
                  <p className="font-medium text-stone-800 mb-1">{wish.Name}</p>
                  <p className="text-stone-600 text-sm leading-relaxed italic">"{wish.Message}"</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-tighter mt-3">
                    {wish.Timestamp ? new Date(wish.Timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
