import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface DividerProps {
  className?: string;
}

export default function Divider({ className = "justify-center" }: DividerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`flex items-center gap-4 my-8 ${className}`}
    >
      <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-wedding-gold to-wedding-gold opacity-50" />
      <Heart size={14} className="text-wedding-gold animate-pulse fill-wedding-gold/20" />
      <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent via-wedding-gold to-wedding-gold opacity-50" />
    </motion.div>
  );
}
