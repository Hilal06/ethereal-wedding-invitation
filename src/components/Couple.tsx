import React from 'react';
import { motion } from 'motion/react';
import { WebData } from '../types';
import Flower from './Flower';
import Divider from './Divider';

interface CoupleProps {
  couple: WebData['couple'];
  settings: WebData['settings'];
}

export default function Couple({ couple, settings }: CoupleProps) {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto relative bg-wedding-cream overflow-hidden">
      {/* Background Decor */}
      <Flower position="top-left" delay={0.2} className="opacity-40 -z-10" />
      <Flower position="top-right" delay={0.4} className="opacity-40 -z-10" />

      {/* Opening Quote Section */}
      <div className="max-w-3xl mx-auto text-center relative z-10 px-4">
        {settings.openingGreeting && (
           <h3 className="text-3xl md:text-5xl text-wedding-gold mb-8 font-serif leading-relaxed whitespace-pre-line" dir="auto">
             {settings.openingGreeting}
           </h3>
        )}
        {settings.openingQuote && (
          <p className="text-stone-600 text-sm md:text-base leading-relaxed italic mb-4 whitespace-pre-line font-medium">
            {settings.openingQuote}
          </p>
        )}
        {settings.openingQuoteSource && (
          <p className="text-stone-500 text-xs font-bold tracking-widest uppercase">
            {settings.openingQuoteSource}
          </p>
        )}
      </div>
    </section>
  );
}
