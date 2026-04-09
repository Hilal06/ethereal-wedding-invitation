import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Map } from 'lucide-react';
import { EventType } from '../types';
import Flower from './Flower';
import Divider from './Divider';

export default function EventDetails({ events }: { events: EventType[] }) {
  const isSingle = events.length === 1;

  return (
    <section className="py-24 bg-stone-50/50 px-4 relative">
      <Flower position="top-right" className="opacity-30 -z-10" />
      <Flower position="bottom-left" className="opacity-30 -z-10" />
      
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <h2 className="text-5xl font-serif mb-2 text-stone-800">The Celebration</h2>
        <Divider />
        <p className="text-wedding-gold uppercase tracking-widest text-sm font-semibold">Join us in our special day</p>
      </div>

      <div className={`mx-auto ${isSingle ? 'max-w-4xl' : 'max-w-5xl grid md:grid-cols-2 gap-8'}`}>
        {events.map((evt, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className={`glass-card p-10 md:p-14 rounded-[3rem] bg-white/60 shadow-lg border border-white/50 ${isSingle ? 'flex flex-col md:flex-row items-center md:gap-16 relative overflow-hidden' : 'text-center'}`}
          >
            {/* Details Side */}
            <div className={`flex-1 ${isSingle ? 'text-center md:text-left z-10 w-full' : ''}`}>
              <div className={`w-20 h-20 bg-wedding-cream rounded-full flex items-center justify-center shadow-inner ${isSingle ? 'mb-8 mx-auto md:mx-0' : 'mx-auto mb-8'}`}>
                {idx === 0 ? <Calendar className="text-wedding-gold w-10 h-10" /> : <Clock className="text-wedding-gold w-10 h-10" />}
              </div>
              <h3 className="text-4xl font-serif mb-6 text-wedding-gold italic">{evt.Name}</h3>
              <div className={`space-y-4 text-stone-700 font-medium ${isSingle ? '' : 'flex flex-col items-center'}`}>
                <p className={`flex items-center gap-4 text-lg ${isSingle ? 'justify-center md:justify-start' : 'justify-center'}`}>
                  <Clock className="text-wedding-gold/70" size={20} /> {evt.Time}
                </p>
                <p className={`flex items-center gap-4 text-lg leading-relaxed max-w-sm ${isSingle ? 'justify-center md:justify-start mx-auto md:mx-0' : 'justify-center mx-auto'}`}>
                  <MapPin className="text-wedding-gold/70 flex-shrink-0" size={20} /> 
                  <span className={isSingle ? "text-center md:text-left" : "text-center"}>{evt.Location}</span>
                </p>
              </div>
              
              {!isSingle && evt.MapURL && evt.MapURL !== '#' && (
                <a 
                  href={evt.MapURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-10 px-8 py-3 border border-wedding-gold text-wedding-gold rounded-full hover:bg-wedding-gold hover:text-white transition-all shadow-sm text-sm uppercase tracking-widest font-bold"
                >
                  View Map
                </a>
              )}
            </div>

            {/* Visual Divider for Single Event */}
            {isSingle && evt.MapURL && evt.MapURL !== '#' && (
               <div className="hidden md:block w-[1px] h-48 bg-gradient-to-b from-transparent via-wedding-gold/30 to-transparent" />
            )}

            {/* Map Action Side for Single Event */}
            {isSingle && evt.MapURL && evt.MapURL !== '#' && (
              <div className="flex-1 w-full flex flex-col justify-center items-center mt-10 md:mt-0 pt-10 md:pt-0 border-t md:border-t-0 border-wedding-gold/20 relative z-10">
                  <div className="w-24 h-24 rounded-full border border-wedding-gold/30 bg-wedding-cream flex items-center justify-center shadow-inner mb-6 relative group overflow-hidden">
                    <Map className="w-10 h-10 text-wedding-gold group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="font-serif text-3xl mb-3 text-stone-800">Venue Map</h4>
                  <p className="text-stone-500 text-sm text-center mb-8 max-w-xs leading-relaxed">
                    Tap to open Google Maps and get direct navigation to our specific venue.
                  </p>
                  <a 
                    href={evt.MapURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-[200px] text-center px-8 py-4 bg-wedding-gold text-white rounded-full hover:bg-stone-800 transition-all font-bold shadow-lg shadow-wedding-gold/30 text-xs uppercase tracking-[0.2em]"
                  >
                    Open Map
                  </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
