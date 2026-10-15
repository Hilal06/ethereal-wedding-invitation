import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeVariant =
  | 'trifold'       // The Trifold Wax Letter (Warkat Fisik, Segel Lilin & Prangko)
  | 'boardingpass'  // The Wedding Boarding Pass (Tiket Pesawat & Paspor)
  | 'newspaper'     // The Broadsheet Newspaper (The Wedding Gazette)
  | 'filmstrip';    // 35mm Filmstrip Cinema (Klise Negatif & Tiket Emas Premiere)

export interface ThemeOption {
  id: ThemeVariant;
  name: string;
  tag: string;
  accent: string;
  bg: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'trifold', name: 'Trifold Wax Letter', tag: 'Surat Lipat, Segel Lilin, Pensil & Prangko Pos', accent: '#8C1C2E', bg: '#EAE1D5' },
  { id: 'boardingpass', name: 'The Boarding Pass', tag: 'Tiket Perforasi, Paspor, Visa & Luggage Tag', accent: '#E2B755', bg: '#14213D' },
  { id: 'newspaper', name: 'The Wedding Gazette', tag: 'Koran Broadsheet 2-Kolom & Kupon Gunting ✂', accent: '#8C2A3E', bg: '#F4EFE6' },
  { id: 'filmstrip', name: '35mm Filmstrip Cinema', tag: 'Klise Film Negatif & Tiket Premiere Emas', accent: '#D4AF37', bg: '#0A0A0A' },
];

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  options: ThemeOption[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeVariant>('trifold');

  useEffect(() => {
    // Keep document class in sync with selected theme
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, options: THEME_OPTIONS }}>
      <div className={`theme-${theme} min-h-screen transition-colors duration-500`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
