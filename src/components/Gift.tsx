import React, { useState } from 'react';
import { Gift as GiftIcon, Copy, CheckCircle, MapPin, CreditCard } from 'lucide-react';
import { GiftData } from '../types';
import Divider from './Divider';

interface GiftProps {
  gifts: GiftData;
}

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
      alert("Failed to copy. Please manually copy the number.");
    }
  };

  if (!gifts.address && (!gifts.banks || gifts.banks.length === 0)) {
    return null;
  }

  return (
    <section className="py-24 bg-wedding-cream relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <GiftIcon className="w-12 h-12 mx-auto text-wedding-gold mb-6" />
        <h2 className="text-4xl md:text-5xl font-script text-wedding-burgundy mb-6">Wedding Gift</h2>
        <p className="text-stone-500 font-light mb-8 max-w-2xl mx-auto">
          Your blessing and presence at our wedding are the greatest gifts. However, if you wish to honor us with a gift, you may send it via the details below.
        </p>

        <Divider />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center">
          {/* Address Box */}
          {gifts.address && (
            <div className="glass-card rounded-2xl p-8 flex flex-col items-center h-full justify-center min-h-[200px]">
              <MapPin className="w-8 h-8 text-wedding-sage mb-4" />
              <h3 className="text-xl font-serif text-wedding-burgundy mb-4">Send a Gift</h3>
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
                  <CreditCard className="w-6 h-6 text-wedding-gold mb-3" />
                  <h4 className="font-bold text-stone-800">{bank.bankName}</h4>
                  <p className="text-stone-500 text-sm mb-1">{bank.accountName}</p>
                  <p className="text-xl font-mono text-wedding-burgundy mb-4 tracking-wider">{bank.accountNumber}</p>

                  <button
                    onClick={() => handleCopy(bank.accountNumber, bank.bankName)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-wedding-sage text-xs uppercase tracking-widest text-wedding-sage hover:bg-wedding-sage hover:text-white transition-colors"
                  >
                    {copiedBank === bank.bankName ? (
                      <><CheckCircle size={14} /> Copied</>
                    ) : (
                      <><Copy size={14} /> Copy Number</>
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
