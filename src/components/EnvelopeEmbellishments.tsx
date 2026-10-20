import React from 'react';

/**
 * EnvelopeEmbellishments provides refined, non-intrusive physical stationery accents:
 * - Subtle antique botanical engravings on opposite corners (pressed-flower look)
 * - Faint postal postmark & cancellation watermark lines
 * - Follows Impeccable Trifold Wax Letter aesthetic: strictly non-intrusive, no tacky clutter
 */
export default function EnvelopeEmbellishments() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none opacity-40">
      {/* Top Left Antique Stationery Filigree / Pressed Botanical Corner */}
      <div className="absolute -top-10 -left-10 w-44 h-44 sm:w-60 sm:h-60 opacity-30 mix-blend-multiply pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#8C1C2E]">
          <path
            d="M20 20C45 20 80 40 90 70C100 100 120 120 150 130M30 10C55 25 70 50 75 80M10 30C25 55 50 70 80 75"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
          <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 2" />
          <path
            d="M35 15C50 18 65 32 70 48M15 35C18 50 32 65 48 70"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </svg>
      </div>

      {/* Bottom Right Antique Postmark Watermark */}
      <div className="absolute -bottom-8 -right-8 w-48 h-48 sm:w-64 sm:h-64 opacity-25 mix-blend-multiply pointer-events-none rotate-[-12deg]">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#2F241F]">
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.75" />
          <path d="M45 85H155M40 100H160M45 115H155" stroke="currentColor" strokeWidth="0.6" />
          <text
            x="100"
            y="65"
            textAnchor="middle"
            fill="currentColor"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="2"
          >
            WARKAT POS RESMI
          </text>
          <text
            x="100"
            y="142"
            textAnchor="middle"
            fill="currentColor"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="2"
          >
            OFFICIAL DISPATCH
          </text>
        </svg>
      </div>
    </div>
  );
}
