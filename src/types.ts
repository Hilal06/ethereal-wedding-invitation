export interface EventType {
  Name: string;
  Time: string;
  Location: string;
  MapURL: string;
}

export interface WishType {
  Timestamp: string;
  Name: string;
  Email?: string;
  Attendance: string;
  Guests: string;
  Message: string;
}

export interface WebData {
  settings: {
    weddingDate?: string;
    openingGreeting?: string;
    openingQuote?: string;
    openingQuoteSource?: string;
  };
  couple: {
    groomName?: string;
    brideName?: string;
    groomParents?: string;
    brideParents?: string;
    groomQuote?: string;
    brideQuote?: string;
    groomImage?: string;
    brideImage?: string;
  };
  events: EventType[];
  gallery: string[];
  wishes: WishType[];
}

export const defaultWebData: WebData = {
  settings: { 
    weddingDate: '2026-12-25T08:00:00',
    openingGreeting: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم\nالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    openingQuote: '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."',
    openingQuoteSource: 'QS. Ar-Rum: 21'
  },
  couple: {
    groomName: 'Aris',
    brideName: 'Siska',
    groomParents: 'Bapak & Ibu Groom',
    brideParents: 'Bapak & Ibu Bride',
    groomQuote: '"Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."',
    brideQuote: '"I have found the one whom my soul loves. We are bound together by a love that is pure and eternal."',
    groomImage: 'https://images.unsplash.com/photo-1550005816-091e19aba47f?auto=format&fit=crop&q=80&w=400&h=500',
    brideImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400&h=500'
  },
  events: [
    { Name: 'Akad Nikah', Time: '08:00 - 10:00 WIB', Location: 'Masjid Agung Al-Azhar, Jakarta', MapURL: '#' },
    { Name: 'Resepsi', Time: '11:00 - 14:00 WIB', Location: 'Grand Ballroom Hotel Indonesia', MapURL: '#' }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1465495910483-0d6749ee9f4a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
  ],
  wishes: []
};
