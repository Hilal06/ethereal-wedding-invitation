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
    <section className="py-24 px-4 max-w-6xl mx-auto relative bg-wedding-cream">
      <Flower position="top-left" delay={0.2} className="opacity-40 -z-10" />
      <Flower position="top-right" delay={0.4} className="opacity-40 -z-10" />

      {/* Opening Quote Section */}
      <div className="max-w-3xl mx-auto text-center mb-24 relative z-10 px-4">
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
          <p className="text-stone-500 text-xs font-bold tracking-widest uppercase mb-16">
            {settings.openingQuoteSource}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="text-center md:text-right">
          <div className="relative inline-block mb-8 mix-blend-multiply">
            <img 
              src={couple.groomImage || "https://images.unsplash.com/photo-1550005816-091e19aba47f?auto=format&fit=crop&q=80&w=400&h=500"} 
              alt={couple.groomName}
              className="w-64 h-80 object-cover rounded-t-full border-4 border-wedding-gold/30"
              referrerPolicy="no-referrer"
            />
            <Flower position="bottom-left" delay={0.6} className="!w-28 md:!w-40 translate-y-6 -translate-x-4" />
            <Flower position="top-right" delay={0.7} className="!w-24 md:!w-32 -translate-y-4 translate-x-4" />
          </div>
          <h2 className="text-4xl font-serif mb-2">{couple.groomName}</h2>
          <Divider className="justify-center md:justify-end" />
          <p className="text-stone-500 italic mb-4">{couple.groomParents}</p>
          <p className="text-sm leading-relaxed text-stone-600 max-w-sm ml-auto">
            {couple.groomQuote}
          </p>
        </div>

        <div className="text-center md:text-left">
          <div className="relative inline-block mb-8 mix-blend-multiply">
            <img 
              src={couple.brideImage || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400&h=500"} 
              alt={couple.brideName}
              className="w-64 h-80 object-cover rounded-t-full border-4 border-wedding-gold/30"
              referrerPolicy="no-referrer"
            />
            <Flower position="bottom-right" delay={0.8} className="!w-28 md:!w-40 translate-y-6 translate-x-4" />
            <Flower position="top-left" delay={0.9} className="!w-24 md:!w-32 -translate-y-4 -translate-x-4" />
          </div>
          <h2 className="text-4xl font-serif mb-2">{couple.brideName}</h2>
          <Divider className="justify-center md:justify-start" />
          <p className="text-stone-500 italic mb-4">{couple.brideParents}</p>
          <p className="text-sm leading-relaxed text-stone-600 max-w-sm mr-auto">
            {couple.brideQuote}
          </p>
        </div>
      </div>
    </section>
  );
}
