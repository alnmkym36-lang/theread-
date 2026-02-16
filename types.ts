
export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type Region = 'EG' | 'SA';

export interface Product {
  id: string;
  name: { en: string; ar: string };
  price: number; // Base price in EGP
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: { en: string; ar: string };
  colors: string[];
  sizes: string[];
  image: string;
  category: 'men' | 'women';
  description?: { en: string; ar: string };
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    ar: string;
  };
}
