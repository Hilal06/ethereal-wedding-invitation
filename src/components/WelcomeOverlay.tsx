import React from 'react';
import { motion } from 'motion/react';
import { MailOpen, AlertCircle } from 'lucide-react';
import Flower from './Flower';
import Divider from './Divider';

interface WelcomeOverlayProps {
  onOpen: () => void;
  groomName: string;
  brideName: string;
  isLoading?: boolean;
  error?: string | null;
}

export default function WelcomeOverlay({ onOpen, groomName, brideName, isLoading, error }: WelcomeOverlayProps) {
  if (error) {
    return (
      <div className="fixed inset-0 z-[100] bg-wedding-cream flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-red-500 font-bold text-xl">Error loading Invitation</p>
        <p className="text-stone-500 text-sm mt-2">{error}</p>
        <p className="text-stone-400 text-xs mt-4 max-w-md">Please make sure your Google Sheet is correctly formatted and your URL is in the .env file.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -1000 }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] bg-wedding-cream flex flex-col items-center justify-center text-center px-4"
    >
      <Flower position="top-left" delay={0.3} className="opacity-70" />
      <Flower position="bottom-right" delay={0.6} className="opacity-70" />
      
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")',
        }}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10"
      >
        <p className="text-stone-500 uppercase tracking-[0.4em] text-xs mb-8">Wedding Invitation</p>
        
        {isLoading ? (
          <div className="flex justify-center flex-col items-center h-24 mb-4 gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-wedding-gold"></div>
            <p className="text-stone-400 text-xs italic tracking-widest">Loading from Google Sheets...</p>
          </div>
        ) : (
          <h1 className="flex flex-col items-center gap-2 text-5xl md:text-7xl font-serif mb-4 italic text-center w-full max-w-2xl mx-auto leading-tight">
            <span className="text-balance">{groomName}</span>
            <span className="text-2xl md:text-4xl not-italic font-sans text-wedding-gold my-2">&</span>
            <span className="text-balance">{brideName}</span>
          </h1>
        )}
        
        <p className="text-stone-400 font-light tracking-widest mb-4">25 . 12 . 2026</p>
        
        <Divider />
        
        <button 
          onClick={onOpen}
          disabled={isLoading}
          className="group relative px-8 py-4 bg-stone-800 text-white rounded-full overflow-hidden transition-all hover:pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-xs">
            <MailOpen size={16} /> {isLoading ? 'Loading...' : 'Open Invitation'}
          </span>
          <div className="absolute inset-0 bg-wedding-gold translate-x-full group-hover:translate-x-0 transition-transform duration-300 disabled:hidden" />
        </button>
      </motion.div>
    </motion.div>
  );
}
