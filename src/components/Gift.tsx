import React, { useState } from 'react';
import { Gift as GiftIcon, Copy, CheckCircle, MapPin, CreditCard } from 'lucide-react';
import { GiftData } from '../types';
import Divider from './Divider';

interface GiftProps {
  gifts: GiftData;
}

const BankIcon = ({ bankName }: { bankName: string }) => {
  const [imgError, setImgError] = useState(false);
  const normalized = bankName.toLowerCase().trim();
  let src = null;
  
  if (normalized.includes('bca')) src = 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg';
  else if (normalized.includes('mandiri')) src = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg';
  else if (normalized.includes('bni')) src = 'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/BankNegaraIndonesia46-logo.svg/1200px-BankNegaraIndonesia46-logo.svg.png';
  else if (normalized.includes('bri')) src = 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg';
  else if (normalized.includes('bsi')) src = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Bank_Syariah_Indonesia.svg';
  else if (normalized.includes('cimb')) src = 'https://upload.wikimedia.org/wikipedia/commons/3/38/CIMB_Niaga_logo.svg';
  else if (normalized.includes('permata')) src = 'https://upload.wikimedia.org/wikipedia/commons/f/f8/PermataBank_logo.svg';
  else if (normalized.includes('jenius')) src = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Jenius-logo.svg';
  else if (normalized.includes('ovo')) src = 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Ovo_Purple.svg';
  else if (normalized.includes('gopay')) src = 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg';
  else if (normalized.includes('dana')) src = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg';
  else if (normalized.includes('jago')) src = 'https://upload.wikimedia.org/wikipedia/commons/9/90/Bank_Jago_logo.svg';
  else if (normalized.includes('seabank')) src = 'https://upload.wikimedia.org/wikipedia/commons/f/f4/SeaBank_logo.png';

  if (src && !imgError) {
    return <img src={src} alt={bankName} className="h-6 object-contain mb-3 drop-shadow-sm" onError={() => setImgError(true)} />;
  }
  return <CreditCard className="w-6 h-6 text-wedding-gold mb-3" />;
};

export default function Gift({ gifts }: GiftProps) {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const handleCopy = async (accountNumber: string, bankName: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(accountNumber);
      } else {
        // Fallback for non-HTTPS or missing clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = accountNumber;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedBank(bankName);
      setTimeout(() => setCopiedBank(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
      // Even if fallback fails, we can flash it just for visual feedback or alert
      alert("Gagal menyalin. Silakan salin nomor secara manual.");
    }
  };

  if (!gifts.address && (!gifts.banks || gifts.banks.length === 0)) {
    return null;
  }

  return (
    <section className="py-24 bg-wedding-cream relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <GiftIcon className="w-12 h-12 mx-auto text-wedding-gold mb-6" />
        <h2 className="text-4xl md:text-5xl font-script text-wedding-burgundy mb-6">Hadiah Pernikahan</h2>
        <p className="text-stone-500 font-light mb-8 max-w-2xl mx-auto">
          Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami. Namun, jika Anda ingin memberikan tanda kasih, Anda dapat mengirimkannya melalui detail di bawah ini.
        </p>
        
        <Divider />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center">
          {/* Address Box */}
          {gifts.address && (
            <div className="glass-card rounded-2xl p-8 flex flex-col items-center h-full justify-center min-h-[200px]">
              <MapPin className="w-8 h-8 text-wedding-sage mb-4" />
              <h3 className="text-xl font-serif text-wedding-burgundy mb-4">Kirim Hadiah</h3>
              <p className="text-stone-600 leading-relaxed max-w-[250px] whitespace-pre-wrap">
                {gifts.address}
              </p>
            </div>
          )}

          {/* Banks */}
          {gifts.banks && gifts.banks.length > 0 && (
            <div className="flex flex-col gap-4 w-full">
              {gifts.banks.map((bank, index) => (
                <div key={index} className="glass-card rounded-2xl p-6 flex flex-col items-center relative overflow-hidden group">
                  <BankIcon bankName={bank.bankName} />
                  <h4 className="sr-only">{bank.bankName}</h4>
                  <p className="text-stone-500 text-sm mb-1">{bank.accountName}</p>
                  <p className="text-xl font-mono text-wedding-burgundy mb-4 tracking-wider">{bank.accountNumber}</p>

                  <button
                    onClick={() => handleCopy(bank.accountNumber, bank.bankName)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-wedding-sage text-xs uppercase tracking-widest text-wedding-sage hover:bg-wedding-sage hover:text-white transition-colors"
                  >
                    {copiedBank === bank.bankName ? (
                      <><CheckCircle size={14} /> Disalin</>
                    ) : (
                      <><Copy size={14} /> Salin Nomor</>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
