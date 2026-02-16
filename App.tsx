
import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Plus, 
  Minus, 
  Trash2, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Star,
  Instagram,
  Twitter,
  Facebook, 
  ArrowUp, 
  Smartphone, 
  Send, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  Tag, 
  Mail, 
  Clock, 
  MapPin, 
  Sun, 
  Moon, 
  Users, 
  Award, 
  Palette, 
  MessageSquare, 
  Baby 
} from 'lucide-react';
import { 
  Language, 
  Theme, 
  Region, 
  Product, 
  CartItem 
} from './types';
import { 
  PRODUCTS, 
  TRANSLATIONS, 
  FAQ_DATA, 
  POLICIES, 
  EXCHANGE_RATE 
} from './constants';

// --- Contexts ---

const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  region: Region;
  setRegion: (r: Region) => void;
}>({ lang: 'ar', setLang: () => {}, t: () => '', region: 'EG', setRegion: () => {} });

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: 'dark', toggleTheme: () => {} });

// --- Helper Components ---

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  const { lang, t } = useContext(LanguageContext);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 dark:bg-black/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white dark:bg-brand-dark w-full max-w-lg rounded-[3rem] p-10 animate-in zoom-in-95 duration-300 border border-black/5 dark:border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-brand-accent">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors">
            <X className="w-8 h-8 text-black dark:text-white" />
          </button>
        </div>
        <div className="text-gray-700 dark:text-white/60 font-bold text-lg leading-relaxed mb-10 uppercase tracking-tighter italic text-start">
          {children}
        </div>
        <button onClick={onClose} className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-xl hover:bg-brand-accent hover:text-white transition-all uppercase italic">
          {t('close')}
        </button>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; onAddToCart: (p: Product, size: string, color: string) => void }> = ({ product, onAddToCart }) => {
  const { lang, t, region } = useContext(LanguageContext);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const convertPrice = (price: number) => {
    if (region === 'EG') return price;
    return Math.round(price / EXCHANGE_RATE);
  };

  const currencyLabel = t(region === 'EG' ? 'egp' : 'sar');

  return (
    <div className="group relative bg-white dark:bg-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-accent/5 h-full flex flex-col border border-black/5 dark:border-white/5 shadow-sm">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name[lang]} 
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        {product.badge && (
          <span className="absolute top-4 start-4 bg-brand-accent text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-xl flex items-center gap-1">
            <Tag className="w-3 h-3" /> {product.badge[lang]}
          </span>
        )}
      </div>
      
      <div className="p-6 relative flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-black italic uppercase tracking-tighter line-clamp-1 text-black dark:text-white">{product.name[lang]}</h3>
          <div className="flex items-center text-brand-accent">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs font-black ms-1 text-gray-400 dark:text-white/50">({product.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-black text-black dark:text-white">{convertPrice(product.price)} {currencyLabel}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 dark:text-white/30 line-through font-bold">{convertPrice(product.originalPrice)} {currencyLabel}</span>
          )}
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1.5 text-[10px] font-black rounded-lg border transition-all ${selectedSize === size ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-lg' : 'border-black/10 dark:border-white/10 text-gray-400 dark:text-white/40 hover:border-black/30 dark:hover:border-white/30'}`}
              >
                {size}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => onAddToCart(product, selectedSize, product.colors[0])}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-brand-accent hover:text-white transition-all border-b-4 border-black/10"
          >
            <ShoppingBag className="w-5 h-5" />
            {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

const CartDrawer: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[]; 
  onUpdate: (id: string, size: string, color: string, delta: number) => void; 
  onRemove: (id: string, size: string, color: string) => void 
}> = ({ isOpen, onClose, items, onUpdate, onRemove }) => {
  const { lang, t, region } = useContext(LanguageContext);
  
  const convertPrice = (price: number) => {
    if (region === 'EG') return price;
    return Math.round(price / EXCHANGE_RATE);
  };

  const currencyLabel = t(region === 'EG' ? 'egp' : 'sar');
  const total = items.reduce((acc, item) => acc + convertPrice(item.price) * item.quantity, 0);

  const handleCheckout = () => {
    const itemStrings = items.map(item => 
      `- ${item.name[lang]} (${item.selectedSize}) x${item.quantity}: ${convertPrice(item.price) * item.quantity} ${currencyLabel}`
    ).join('\n');
    const summary = encodeURIComponent(`طلب جديد (${region}):\n\n${itemStrings}\n\nالإجمالي: ${total} ${currencyLabel}`);
    window.open(`https://wa.me/201119241396?text=${summary}`, '_blank');
  };

  return (
    <div className={`fixed inset-0 z-[120] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className={`absolute top-0 bottom-0 ${lang === 'ar' ? 'left-0' : 'right-0'} w-full max-w-md bg-white dark:bg-brand-dark border-x border-black/5 dark:border-white/5 shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : (lang === 'ar' ? '-translate-x-full' : 'translate-x-full')} flex flex-col`}>
        <div className="p-8 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-black dark:text-white">{t('cart')}</h2>
          <button onClick={onClose} className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
            <X className="w-6 h-6 text-black dark:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
              <ShoppingBag className="w-24 h-24 mb-6 stroke-1 text-black dark:text-white" />
              <p className="text-xl font-black italic uppercase text-black dark:text-white">{t('continueShopping')}</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex gap-6 group animate-in slide-in-from-bottom-4">
                <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5">
                  <img src={item.image} className="w-full h-full object-cover filter grayscale" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-black text-sm italic uppercase mb-1 text-black dark:text-white">{item.name[lang]}</h4>
                    <p className="text-[10px] text-gray-400 dark:text-white/40 font-black uppercase tracking-widest">{item.selectedSize}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl">
                      <button onClick={() => onUpdate(item.id, item.selectedSize, item.selectedColor, -1)} className="text-black dark:text-white hover:text-brand-accent transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="font-black text-sm text-black dark:text-white">{item.quantity}</span>
                      <button onClick={() => onUpdate(item.id, item.selectedSize, item.selectedColor, 1)} className="text-black dark:text-white hover:text-brand-accent transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                    <p className="font-black text-brand-accent">{convertPrice(item.price) * item.quantity} {currencyLabel}</p>
                  </div>
                  <button onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)} className="text-[10px] font-black uppercase tracking-tighter text-gray-300 dark:text-white/20 hover:text-red-500 transition-colors flex items-center gap-1 mt-2">
                    <Trash2 className="w-3 h-3" /> {t('remove')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-black/5 dark:border-white/5 space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-gray-400 dark:text-white/40 font-black uppercase text-xs tracking-widest">{t('total')}</span>
              <span className="text-4xl font-black italic text-black dark:text-white">{total} <span className="text-sm font-normal">{currencyLabel}</span></span>
            </div>
            <button onClick={handleCheckout} className="w-full bg-brand-accent text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-transform shadow-[0_20px_40px_-10px_rgba(255,0,61,0.4)]">
              <Send className="w-6 h-6" /> {t('checkoutViaWhatsapp')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'ar');
  const [region, setRegion] = useState<Region>(() => (localStorage.getItem('region') as Region) || 'EG');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'men' | 'women' | 'all'>('all');
  const [policyModal, setPolicyModal] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Ref for horizontal scrolling
  const offersScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, size: string, color: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      (item.id === id && item.selectedSize === size) ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const handleRemoveItem = (id: string, size: string, color: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };
  
  const scrollOffers = (direction: 'left' | 'right') => {
    if (offersScrollRef.current) {
      const { current } = offersScrollRef;
      const scrollAmount = current.clientWidth * 0.75;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredProducts = PRODUCTS.filter(p => activeCategory === 'all' || p.category === activeCategory);
  
  const categoryImages = {
    men: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
    women: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    all: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80'
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, region, setRegion }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={`min-h-screen bg-white dark:bg-brand-dark text-black dark:text-white selection:bg-brand-accent selection:text-white ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
          
          {/* Header */}
          <header className={`fixed top-0 inset-x-0 z-[100] flex items-center transition-all duration-300 ${isScrolled ? 'h-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg' : 'h-24 bg-transparent'}`}>
            <div className="container mx-auto px-8 flex items-center justify-between">
              
              {/* Tools on Left */}
              <div className="flex items-center gap-4">
                 <button onClick={() => setIsCartOpen(true)} className={`p-3 rounded-xl group relative transition-all ${isScrolled ? 'bg-black/5 text-black dark:bg-white/10 dark:text-white' : 'glass-card text-black dark:text-white border-black/10 dark:border-white/10'}`}>
                   <ShoppingBag className="w-5 h-5"/>
                   {cartItems.length > 0 && (
                     <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">{cartItems.length}</span>
                   )}
                 </button>
                 <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className={`p-3 rounded-xl text-[10px] font-black uppercase transition-all ${isScrolled ? 'bg-black/5 text-black dark:bg-white/10 dark:text-white' : 'glass-card text-black dark:text-white border-black/10 dark:border-white/10'}`}>{lang === 'ar' ? 'EN' : 'AR'}</button>
                 <button onClick={toggleTheme} className={`p-3 rounded-xl transition-all ${isScrolled ? 'bg-black/5 text-black dark:bg-white/10 dark:text-white' : 'glass-card text-black dark:text-white border-black/10 dark:border-white/10'}`}>{theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}</button>
                 <div className={`flex rounded-xl p-1 transition-all ${isScrolled ? 'bg-black/5 dark:bg-white/10' : 'glass-card bg-white/10 border-black/10 dark:border-white/10'}`}>
                    <button onClick={() => setRegion('SA')} className={`px-2 py-1.5 rounded-lg text-[8px] font-black transition-colors ${region === 'SA' ? 'bg-brand-accent text-white' : (isScrolled ? 'text-gray-400' : 'text-gray-400 dark:text-gray-300')}`}>SA</button>
                    <button onClick={() => setRegion('EG')} className={`px-2 py-1.5 rounded-lg text-[8px] font-black transition-colors ${region === 'EG' ? 'bg-brand-accent text-white' : (isScrolled ? 'text-gray-400' : 'text-gray-400 dark:text-gray-300')}`}>EG</button>
                 </div>
              </div>

              {/* Navigation in Center */}
              <nav className="hidden lg:flex items-center gap-10">
                {['offers', 'women', 'men'].map(cat => (
                  <button key={cat} onClick={() => { cat === 'offers' ? scrollToSection('offers') : scrollToSection('categories'); if (cat !== 'offers') setActiveCategory(cat as any); }} className={`text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-black/70 hover:text-brand-accent dark:text-white/80'}`}>
                    {t(cat)}
                  </button>
                ))}
              </nav>

              {/* Logo on Right */}
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-3xl font-black italic tracking-tighter transition-colors text-black dark:text-white">THREAD</a>
            </div>
          </header>

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover filter grayscale transition-all duration-700 brightness-[0.9] dark:brightness-[0.3]" />
              <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-transparent to-white/95 dark:from-black/95 dark:to-black/95 transition-all duration-700"></div>
            </div>

            <div className="container mx-auto px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 pt-20">
              {/* Headline Text on Left */}
              <div className="order-2 lg:order-1 flex-1 flex flex-col items-start text-start animate-slide-left">
                <span className="inline-block px-4 py-1.5 bg-brand-accent text-white text-[10px] font-black uppercase tracking-widest mb-10 rounded-full shadow-lg">{t('regionalDrop')}</span>
                <h1 className="hero-headline text-[10vw] lg:text-[10rem] text-black dark:text-white leading-[1.15] transition-colors duration-500">
                  {lang === 'ar' ? 'ستايلك،' : 'YOUR STYLE,'} <br />
                  <span className="text-brand-accent text-glow">{lang === 'ar' ? 'قصتك' : 'STORY'}</span>
                </h1>
                <p className="mt-10 text-gray-600 dark:text-white/50 text-lg font-bold max-w-lg uppercase italic tracking-tighter leading-snug transition-colors duration-500">
                  {t('brandBio')}
                </p>
              </div>

              {/* Action Buttons on Right */}
              <div className="order-1 lg:order-2 flex flex-col gap-6 w-full lg:w-auto animate-slide-right items-center lg:items-end">
                <button onClick={() => scrollToSection('featured')} className="group w-full lg:w-[450px] bg-brand-accent text-white px-10 py-7 rounded-[2.5rem] font-black hover:scale-[1.05] transition-all shadow-[0_30px_60px_rgba(255,0,60,0.6)] flex items-center justify-between border-b-8 border-black/20">
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform" />
                  <span className="text-3xl italic">{t('shopNow')}</span>
                </button>
                <button onClick={() => scrollToSection('offers')} className="w-full lg:w-[450px] bg-white/50 backdrop-blur-md border border-black/5 text-black dark:glass-card dark:bg-white/10 dark:text-white dark:border-white/5 px-10 py-7 rounded-[2.5rem] font-black hover:bg-white/80 dark:hover:bg-white/20 transition-all flex items-center justify-between italic tracking-tighter border-b-8">
                  <Zap className="w-7 h-7 text-brand-accent" />
                  <span className="text-2xl">{t('getDiscount')}</span>
                </button>
              </div>
            </div>

            {/* Bottom Footer Info Bar */}
            <div className="absolute bottom-12 inset-x-0 z-20">
              <div className="container mx-auto px-8 flex flex-wrap gap-12 justify-center lg:justify-end opacity-60">
                {[{ icon: Truck, text: t('fastDelivery') }, { icon: ShieldCheck, text: t('securePayment') }, { icon: RotateCcw, text: t('easyReturns') }, { icon: Star, text: t('satisfiedCustomers') }].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-brand-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-white transition-colors duration-500">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Offers Section */}
          <section id="offers" className="py-12 bg-brand-accent/5 backdrop-blur-3xl relative overflow-hidden border-y border-black/5 dark:border-white/5">
            <div className="container mx-auto px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                <div className="text-start max-w-2xl">
                  <span className="text-brand-accent font-black uppercase tracking-[0.5em] text-[10px] mb-2 block animate-pulse">{t('regionalFlash')}</span>
                  <h2 className="hero-headline text-4xl lg:text-6xl text-black dark:text-white uppercase leading-none">{t('exclusiveOffers')}</h2>
                </div>
                
                {/* Scroll Controls */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => scrollOffers('left')} 
                    className="p-3 rounded-full bg-white border border-black/5 shadow-sm hover:bg-brand-accent hover:text-white transition-all group dark:bg-white/5 dark:border-white/10"
                    aria-label="Scroll Left"
                  >
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => scrollOffers('right')} 
                    className="p-3 rounded-full bg-white border border-black/5 shadow-sm hover:bg-brand-accent hover:text-white transition-all group dark:bg-white/5 dark:border-white/10"
                    aria-label="Scroll Right"
                  >
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Scrollable Container */}
              <div 
                ref={offersScrollRef}
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing"
              >
                {PRODUCTS.filter(p => p.originalPrice).map(p => (
                  <div key={p.id} className="min-w-[70vw] sm:min-w-[280px] lg:min-w-[300px] snap-center">
                    <ProductCard product={p} onAddToCart={handleAddToCart} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Category Switcher Card */}
          <section id="categories" className="py-12 container mx-auto px-8">
            <div className="relative group h-[500px] overflow-hidden rounded-[3rem] shadow-2xl transition-all duration-700 border-4 border-white/5">
              <div className="absolute inset-0 z-0">
                <img src={categoryImages[activeCategory === 'all' ? 'all' : activeCategory]} className="w-full h-full object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-1000 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-12 items-center text-center">
                <h2 className="hero-headline text-5xl lg:text-7xl text-white mb-8">{t(activeCategory === 'all' ? 'featured' : activeCategory)}</h2>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {['men', 'women'].map((cat: any) => (
                    <button key={cat} onClick={() => { setActiveCategory(cat); scrollToSection('featured'); }} className={`px-8 py-4 rounded-2xl font-black text-xl uppercase italic tracking-tighter transition-all ${activeCategory === cat ? 'bg-brand-accent text-white scale-105 shadow-xl' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                      {t(cat)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Why Thread Section */}
          <section id="why-us" className="py-24 container mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="hero-headline text-5xl lg:text-7xl text-black dark:text-white">{t('whyUs')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Award, title: t('premiumQuality'), desc: t('premiumQualityDesc') },
                { icon: Palette, title: t('uniqueDesign'), desc: t('uniqueDesignDesc') },
                { icon: MessageSquare, title: t('fastSupport'), desc: t('fastSupportDesc') }
              ].map((feature, i) => (
                <div key={feature.title} className="bg-white border border-black/5 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-[2.5rem] p-10 text-center hover:border-brand-accent transition-all group">
                  <div className="w-20 h-20 bg-brand-accent text-white rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-xl">
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black italic uppercase mb-4 text-black dark:text-white">{feature.title}</h3>
                  <p className="text-sm font-bold text-gray-500 dark:text-white/40 uppercase tracking-tighter italic">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Grid */}
          <section id="featured" className="py-24 bg-gray-50 dark:bg-white/5 backdrop-blur-3xl">
            <div className="container mx-auto px-8">
              <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                <div className="text-start">
                  <span className="text-brand-accent font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">{t('hottestPicks')}</span>
                  <h2 className="hero-headline text-5xl lg:text-7xl text-black dark:text-white uppercase">{t('featuredProducts')}</h2>
                </div>
                <div className="flex gap-3">
                  {['all', 'men', 'women'].map((cat: any) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-brand-accent text-white shadow-xl' : 'bg-white border border-gray-100 text-gray-400 hover:text-black dark:bg-white/5 dark:border-transparent dark:hover:text-white'}`}>
                      {t(cat)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />)}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-24 container mx-auto px-8 max-w-4xl">
            <h2 className="hero-headline text-5xl lg:text-7xl text-center mb-16 text-black dark:text-white uppercase">{t('faq')}</h2>
            <div className="grid gap-4">
              {FAQ_DATA.map((faq, i) => (
                <div key={i} className="bg-white border border-black/5 shadow-sm dark:bg-white/5 dark:border-white/5 rounded-2xl p-8 hover:border-brand-accent/30 transition-all text-start">
                  <h3 className="text-2xl font-black italic uppercase mb-4 text-brand-accent">{faq.q[lang]}</h3>
                  <p className="text-lg font-bold text-gray-500 dark:text-white/40 leading-relaxed uppercase tracking-tighter">{faq.a[lang]}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <section id="newsletter" className="py-24 container mx-auto px-8 text-center">
            <div className="relative bg-white border border-black/5 shadow-xl dark:bg-white/5 dark:border-white/5 rounded-[4rem] p-12 lg:p-20 overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="hero-headline text-5xl lg:text-7xl text-black dark:text-white mb-8">{t('newsletterTitle')}</h2>
                <p className="text-xl font-black uppercase italic tracking-tighter text-gray-500 dark:text-white/50 mb-12">{t('newsletterDesc')}</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <input type="email" placeholder={t('emailPlaceholder')} className="flex-1 px-8 py-5 bg-gray-50 border-2 border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl text-black dark:text-white font-black text-lg focus:outline-none focus:border-brand-accent uppercase italic" />
                  <button className="px-12 py-5 bg-brand-accent text-white rounded-2xl font-black text-xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                    {t('subscribe')} <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Footer */}
          <footer className="py-24 border-t border-white/5 bg-brand-dark overflow-hidden relative">
            <div className="container mx-auto px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-start">
                <div>
                  <h2 className="hero-headline text-5xl italic tracking-tighter mb-8 text-white">THREAD.</h2>
                  <p className="text-white/30 font-black uppercase tracking-tighter text-md leading-snug mb-8">{t('brandBio')}</p>
                  <div className="flex gap-4">
                    <a href="#" className="text-white/30 hover:text-brand-accent transition-colors"><Instagram className="w-6 h-6" /></a>
                    <a href="#" className="text-white/30 hover:text-brand-accent transition-colors"><Twitter className="w-6 h-6" /></a>
                    <a href="#" className="text-white/30 hover:text-brand-accent transition-colors"><Facebook className="w-6 h-6" /></a>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-8">{t('explore')}</h4>
                  <ul className="space-y-4 text-xl font-black italic uppercase text-white/60">
                    <li><button onClick={() => { setActiveCategory('men'); scrollToSection('categories'); }} className="hover:text-brand-accent transition-colors">{t('men')}</button></li>
                    <li><button onClick={() => { setActiveCategory('women'); scrollToSection('categories'); }} className="hover:text-brand-accent transition-colors">{t('women')}</button></li>
                    <li><button onClick={() => scrollToSection('offers')} className="hover:text-brand-accent transition-colors">{t('offers')}</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-8">{t('support')}</h4>
                  <ul className="space-y-4 text-xs font-black italic uppercase text-white/30 tracking-widest">
                    <li><button onClick={() => setPolicyModal('terms')} className="hover:text-white transition-colors uppercase">{t('terms')}</button></li>
                    <li><button onClick={() => setPolicyModal('privacy')} className="hover:text-white transition-colors uppercase">{t('privacy')}</button></li>
                    <li><button onClick={() => setPolicyModal('exchange')} className="hover:text-white transition-colors uppercase">{t('exchangePolicy')}</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-8">{t('contact')}</h4>
                  <ul className="space-y-4 text-md font-black italic uppercase text-white/40 tracking-tighter">
                    <li>
                      <a href="https://wa.me/201119241396" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                        <Smartphone className="w-5 h-5 text-brand-accent" /> 01119241396
                      </a>
                    </li>
                    <li>
                      <a href="mailto:alnmkym36@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                        <Mail className="w-5 h-5 text-brand-accent" /> alnmkym36@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="pt-12 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic text-center">{t('copyrightStore')} {t('rights')}</p>
            </div>
          </footer>

          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onUpdate={handleUpdateQuantity} onRemove={handleRemoveItem} />
          
          <Modal isOpen={policyModal !== null} onClose={() => setPolicyModal(null)} title={policyModal ? POLICIES[policyModal].title[lang] : ''}>
            {policyModal ? POLICIES[policyModal][lang] : ''}
          </Modal>

          {/* Floating Buttons matches screenshot */}
          <div className="fixed bottom-12 left-12 z-[110] flex flex-col gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-7 glass-card bg-white/10 rounded-3xl hover:bg-brand-accent transition-all border-b-4 border-white/10 shadow-xl group">
              <ArrowUp className="w-7 h-7 text-white group-hover:scale-110 transition-transform"/>
            </button>
            <a href="https://wa.me/201119241396" target="_blank" rel="noreferrer" className="p-7 bg-brand-accent text-white rounded-3xl shadow-2xl hover:scale-110 transition-all border-b-4 border-black/30">
              <Smartphone className="w-7 h-7"/>
            </a>
          </div>
        </div>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
