import React from 'react';
import { motion } from 'motion/react';

interface FlowerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  delay?: number;
}

export default function Flower({ position, className = "", delay = 0 }: FlowerProps) {
  let positionClasses = "";
  let rotateClass = "";

  switch (position) {
    case 'top-left':
      positionClasses = "top-0 left-0";
      rotateClass = "rotate-0";
      break;
    case 'top-right':
      positionClasses = "top-0 right-0";
      rotateClass = "rotate-[90deg]";
      break;
    case 'bottom-right':
      positionClasses = "bottom-0 right-0";
      rotateClass = "rotate-[180deg]";
      break;
    case 'bottom-left':
      positionClasses = "bottom-0 left-0";
      rotateClass = "-rotate-[90deg]";
      break;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.85, scale: 1 }}
      transition={{ duration: 1.5, delay }}
      viewport={{ once: true }}
      className={`absolute w-32 md:w-64 pointer-events-none mix-blend-multiply ${positionClasses} ${className}`}
    >
      <img 
        src="/flower.png" 
        alt="Rose floral accent" 
        className={`w-full h-full object-contain ${rotateClass}`} 
      />
    </motion.div>
  );
}
