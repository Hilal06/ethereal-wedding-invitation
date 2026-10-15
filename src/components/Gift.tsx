import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, CreditCard, PackageCheck } from 'lucide-react';
import { GiftData } from '../types';

interface GiftProps {
  gifts: GiftData;
}

const BankLogoOrIcon = ({ bankName, iconColor = "#8C1C2E" }: { bankName: string; iconColor?: string }) => {
  const [hasError, setHasError] = useState(false);
  const normalized = bankName.toLowerCase().trim();
  let logoUrl = null;

  if (normalized.includes('bca')) logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg';
  else if (normalized.includes('mandiri')) logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg';
  else if (normalized.includes('bni')) logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Bank_Negara_Indonesia_logo_%282004%29.svg';
  else if (normalized.includes('bri')) logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg';
  else if (normalized.includes('bsi')) logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Bank_Syariah_Indonesia.svg';
  else if (normalized.includes('jago')) logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Logo-jago.svg';
  else if (normalized.includes('seabank')) logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Seabank-logo.webp';

  if (logoUrl && !hasError) {
    return (
      <img
        src={logoUrl}
        alt={bankName}
        className="h-6 object-contain"
        onError={() => setHasError(true)}
      />
    );
  }
  return <CreditCard size={20} style={{ color: iconColor }} />;
};

export default function Gift({ gifts }: GiftProps) {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyBank = async (accountNumber: string, bankName: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(accountNumber);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = accountNumber;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedBank(bankName);
      setTimeout(() => setCopiedBank(null), 2500);
    } catch {
      alert("Silakan salin nomor rekening secara manual: " + accountNumber);
    }
  };

  const handleCopyAddress = async (addr: string) => {
    try {
      await navigator.clipboard.writeText(addr);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    } catch {
      alert("Silakan salin alamat secara manual: " + addr);
    }
  };

  const hasBanks = gifts.banks && gifts.banks.length > 0;
  const hasAddress = Boolean(gifts.address);

  if (!hasBanks && !hasAddress) return null;

  // Envelope / Trifold Wax Letter: Warkat Titipan (Tanda Kasih & Kado)
  return (
    <section className="py-16 px-4 parchment-texture">
      <div className="max-w-4xl mx-auto">
        {/* Header Letter Voucher */}
        <div className="trifold-letter-card p-6 sm:p-8 mb-8 text-center">
          <div className="flex items-center justify-between border-b border-[#DFD5C8] pb-3 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold">
              WARKAT TITIPAN &bull; TANDA KASIH &amp; KADO
            </span>
            <span className="font-serif italic text-xs text-stone-500">
              Lampiran Resmi
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8C1C2E] font-bold block mb-1">
            Amplop Digital &bull; Digital Remittance
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2F241F] font-bold mb-3">
            Tanda Kasih
          </h2>
          <p className="font-serif italic text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, dapat disalurkan melalui warkat resmi di bawah ini:
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 opacity-70">
            <div className="w-16 h-[1px] bg-[#8C1C2E]/40" />
            <span className="font-mono text-xs text-[#8C1C2E]">&infin;</span>
            <div className="w-16 h-[1px] bg-[#8C1C2E]/40" />
          </div>
        </div>

        {/* Bank Account Remittance Slips */}
        {hasBanks && (
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {gifts.banks?.map((bank, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
                className="postal-money-order p-6 sm:p-7 flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#DFD5C8] mb-4">
                    <BankLogoOrIcon bankName={bank.bankName} iconColor="#8C1C2E" />
                    <div className="flex items-center gap-2">
                      <span className="postal-frank-stamp">TERAAN POS</span>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C1C2E] font-bold">
                        WESEL #{idx + 1}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[8px] font-mono text-stone-500 uppercase border-b border-dotted border-stone-300 pb-1">
                      <span>SERI PENERIMAAN</span>
                      <span className="text-[#8C1C2E] font-bold">WKT-TF/{String(idx + 1).padStart(2, '0')}/2026</span>
                    </div>

                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-stone-500 font-bold block">
                        ATAS NAMA PENERIMA WARKAT
                      </span>
                      <p className="font-serif text-xl font-bold text-[#2F241F] mt-0.5">
                        {bank.accountName}
                      </p>
                    </div>

                    <div className="bg-[#FAF6F0] p-3 rounded-xs border border-[#E5DACD] relative">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C1C2E] font-bold block">
                        NOMOR REKENING / WESEL DIGITAL
                      </span>
                      <p className="font-mono text-2xl text-[#8C1C2E] font-bold tracking-wider mt-1">
                        {bank.accountNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-[#DFD5C8]">
                  <button
                    onClick={() => handleCopyBank(bank.accountNumber, bank.bankName)}
                    className="w-full py-2.5 px-4 bg-[#8C1C2E] hover:bg-[#701524] text-white rounded-xs font-mono text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    {copiedBank === bank.bankName ? (
                      <>
                        <Check size={14} className="text-white" />
                        <span>NOMOR REKENING TERSALIN!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>SALIN NOMOR REKENING</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Physical Gift Parcel Slip */}
        {hasAddress && gifts.address && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="trifold-letter-card p-6 sm:p-8 max-w-2xl mx-auto border-2 border-[#8C1C2E]/40 text-center relative overflow-hidden"
          >
            <div className="airmail-ribbon absolute top-0 left-0 right-0" />

            <div className="flex items-center justify-center gap-2 mb-2 pt-2">
              <PackageCheck size={20} className="text-[#8C1C2E]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C1C2E] font-bold">
                LABEL PARSEL POS / PENGIRIMAN BINGKISAN FISIK
              </span>
            </div>

            <h3 className="text-2xl font-serif text-[#2F241F] font-bold mb-2">
              Alamat Kediaman Mempelai
            </h3>

            <p className="font-serif text-stone-700 text-sm leading-relaxed mb-6 whitespace-pre-line bg-[#FAF6F0] p-4 rounded-xs border border-[#E5DACD] max-w-lg mx-auto">
              {gifts.address}
            </p>

            <button
              onClick={() => handleCopyAddress(gifts.address || "")}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#8C1C2E] hover:bg-[#701524] text-white rounded-xs font-mono text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xs cursor-pointer"
            >
              {copiedAddress ? (
                <>
                  <Check size={14} />
                  <span>ALAMAT TELAH TERSALIN!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>SALIN ALAMAT LENGKAP PENGIRIMAN</span>
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Fold Crease to RSVP */}
        <div className="w-full max-w-3xl mx-auto mt-12">
          <div className="trifold-fold-divider" />
        </div>
      </div>
    </section>
  );
}
