import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, Send, ExternalLink, Sparkles, UserCheck } from 'lucide-react';

interface GuestLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomName: string;
  brideName: string;
  weddingDateStr?: string;
}

export default function GuestLinkModal({
  isOpen,
  onClose,
  groomName,
  brideName,
  weddingDateStr = "25 Desember 2026",
}: GuestLinkModalProps) {
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [greetingType, setGreetingType] = useState<'formal' | 'casual' | 'family'>('formal');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [originUrl, setOriginUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use clean origin and pathname
      setOriginUrl(`${window.location.origin}${window.location.pathname}`);
    }
  }, []);

  const cleanName = guestName.trim();
  const encodedName = encodeURIComponent(cleanName);
  const invitationUrl = cleanName
    ? `${originUrl}?to=${encodedName}`
    : originUrl;

  const getWhatsAppMessage = () => {
    const coupleName = `${groomName || 'Rifaul'} & ${brideName || 'Firda'}`;
    const nameDisplay = cleanName || "Bapak/Ibu/Saudara/i";

    if (greetingType === 'formal') {
      return `Kepada Yth.
${nameDisplay}
di Tempat

Assalamu’alaikum Wr. Wb. / Salam Sejahtera,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami:

💍 *${coupleName}*
📅 ${weddingDateStr}

Buka warkat surat undangan resmi melalui tautan berikut:
${invitationUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta melingkupi ikrar suci kami dengan doa kebaikan.

Mohon maaf perihal undangan yang disampaikan melalui media digital ini. Terima kasih atas perhatian dan doa restunya.

Wassalamu’alaikum Wr. Wb.
Salam hangat dan hormat kami,
*${coupleName}*`;
    }

    if (greetingType === 'family') {
      return `Kepada Yth. Keluarga Besar
${nameDisplay}

Assalamu’alaikum Wr. Wb.

Dengan penuh rasa syukur dan sukacita, kami bermaksud memohon kehadiran dan doa restu dari segenap keluarga besar pada acara perikatan janji suci kami:

💍 *${coupleName}*
📅 ${weddingDateStr}

Detail jadwal acara, lokasi, dan konfirmasi kehadiran dapat diakses pada tautan warkat resmi berikut:
${invitationUrl}

Kehadiran dan kehangatan keluarga tercinta adalah anugerah terbesar bagi kami.

Wassalamu’alaikum Wr. Wb.
*${coupleName}* & Keluarga`;
    }

    // Casual / Sahabat
    return `Halo ${nameDisplay}! ✨

Kabar bahagia untuk kita semua! Kami mengundangmu untuk menjadi bagian istimewa di hari pernikahan kami:

💍 *${coupleName}*
📅 ${weddingDateStr}

Yuk intip detail acara dan konfirmasi kehadiranmu di sini ya:
${invitationUrl}

Kehadiran dan doa terbaikmu bakal melengkapi kebahagiaan kami berdua! Sampai jumpa di hari bahagia nanti! 🎉

Salam hangat,
*${coupleName}*`;
  };

  const handleCopy = async (text: string, type: 'link' | 'message') => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      } else {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2200);
      }
    } catch {
      alert("Teks: " + text);
    }
  };

  const handleOpenWhatsApp = () => {
    const message = getWhatsAppMessage();
    let phone = guestPhone.replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) {
      phone = '62' + phone.slice(1);
    }
    const targetUrl = phone
      ? `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(targetUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/75 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 30 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#FDFBF7] border-t sm:border border-[#DFD5C8] shadow-2xl rounded-t-2xl sm:rounded-sm overflow-hidden flex flex-col max-h-[90vh] pb-[env(safe-area-inset-bottom,0px)]"
        >
          {/* Mobile Bottom-sheet Drag Notch Handle */}
          <div className="sm:hidden w-10 h-1 bg-stone-300 rounded-full mx-auto my-2" />

          {/* Header Airmail Ribbon */}
          <div className="airmail-ribbon w-full" />

          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#DFD5C8] bg-[#FAF6F0]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#8C1C2E] text-white flex items-center justify-center shadow-xs">
                <Share2 size={15} />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold block">
                  ALAT MEMPELAI &bull; DISPATCH BUREAU
                </span>
                <h3 className="font-serif text-lg font-bold text-[#2F241F]">
                  Generator Undangan Tamu &amp; WhatsApp
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Tutup"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-stone-800 text-sm">
            {/* Input Nama Tamu */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C1C2E] font-bold mb-1">
                NAMA TAMU / KELUARGA YANG DIUNDANG *
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: Bapak Ir. H. Bambang & Keluarga"
                className="ruled-stationery-input focus:bg-white transition-colors"
                autoFocus
              />
              <span className="text-[10px] font-serif italic text-stone-500 mt-1 block">
                Nama ini akan dicetak otomatis di segel amplop dan lembaran kartu undangan.
              </span>
            </div>

            {/* Nomor HP Tamu (Opsional) */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C1C2E] font-bold mb-1">
                NOMOR WHATSAPP TAMU (OPSIONAL)
              </label>
              <input
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="Contoh: 08123456789 atau kosongkan"
                className="ruled-stationery-input focus:bg-white transition-colors"
              />
              <span className="text-[10px] font-serif italic text-stone-500 mt-1 block">
                Jika diisi, WhatsApp akan langsung terbuka ke kontak tamu tersebut.
              </span>
            </div>

            {/* Pilihan Nada Ucapan */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C1C2E] font-bold mb-2">
                PILIH GAYA BAHASA PENGANTAR
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'formal', label: 'Formal / Umum' },
                  { id: 'family', label: 'Keluarga Besar' },
                  { id: 'casual', label: 'Teman / Sahabat' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGreetingType(item.id as any)}
                    className={`py-2 px-2 rounded-xs font-mono text-[9px] uppercase tracking-wider font-bold transition-all border cursor-pointer text-center ${
                      greetingType === item.id
                        ? 'bg-[#8C1C2E] text-white border-[#8C1C2E] shadow-xs'
                        : 'bg-[#FAF6F0] text-stone-700 border-[#DFD5C8] hover:bg-[#EAE1D5]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Tautan Undangan */}
            <div className="bg-[#FAF6F0] p-3.5 rounded-xs border border-[#E5DACD] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-wider text-stone-500 font-bold">
                  TAUTAN PERSONAL GENERATED
                </span>
                {cleanName && (
                  <a
                    href={invitationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] font-mono text-[#8C1C2E] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Uji Pratinjau</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <p className="font-mono text-xs text-[#8C1C2E] break-all bg-white p-2 rounded-xs border border-stone-200 select-all">
                {invitationUrl}
              </p>
            </div>

            {/* Preview Teks WhatsApp */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C1C2E] font-bold mb-1">
                PRATINJAU FORMAT PESAN WHATSAPP
              </label>
              <pre className="font-serif text-xs text-stone-700 bg-white p-3 rounded-xs border border-stone-200 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {getWhatsAppMessage()}
              </pre>
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="p-4 border-t border-[#DFD5C8] bg-[#FAF6F0] grid sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => handleCopy(invitationUrl, 'link')}
              className="py-2.5 px-3 bg-white hover:bg-[#F0EAE1] text-stone-800 border border-[#D6C8B6] rounded-xs font-mono text-[9px] uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copiedLink ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copiedLink ? 'Tersalin!' : 'Salin Tautan'}</span>
            </button>

            <button
              onClick={() => handleCopy(getWhatsAppMessage(), 'message')}
              className="py-2.5 px-3 bg-white hover:bg-[#F0EAE1] text-[#8C1C2E] border border-[#8C1C2E]/40 rounded-xs font-mono text-[9px] uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copiedMessage ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copiedMessage ? 'Tersalin!' : 'Salin Pesan WA'}</span>
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xs font-mono text-[9px] uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send size={13} />
              <span>Buka WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
