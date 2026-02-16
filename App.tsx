
import React, { useState, useEffect, createContext, useContext } from 'react';
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
  MessageSquare
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
      <div className="relative glass-card bg-white/80 dark:bg-brand-dark/80 w-full max-w-lg rounded-[3rem] p-10 animate-in zoom-in-95 duration-300 border-brand-accent/20">
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
    <div className="group relative glass-card bg-white/5 dark:bg-white/3 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-accent/5">
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
      
      <div className="p-6 relative">
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

        <div className="space-y-4">
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
    <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('region', region);
  }, [region]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
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
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const setCategoryAndScroll = (cat: 'men' | 'women' | 'all') => {
    setActiveCategory(cat);
    scrollToSection('categories');
  };

  const filteredProducts = PRODUCTS.filter(p => activeCategory === 'all' || p.category === activeCategory);
  const offerProducts = PRODUCTS.filter(p => p.originalPrice);

  const categoryImages = {
    men: 'https://images.unsplash.com/photo-1488161628813-244aa2f8ce73?auto=format&fit=crop&w=1200&q=80',
    women: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    all: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80'
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, region, setRegion }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={`min-h-screen bg-white dark:bg-brand-dark text-black dark:text-white transition-colors duration-300 selection:bg-brand-accent selection:text-white ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
          
          {/* Header */}
          <header className="fixed top-0 inset-x-0 z-50 h-24 flex items-center bg-white/50 dark:bg-brand-dark/50 backdrop-blur-xl border-b border-black/5 dark:border-white/5">
            <div className="container mx-auto px-8 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-3 glass-card rounded-2xl">
                  <Menu className="w-6 h-6 text-black dark:text-white" />
                </button>
                <a href="#" className="text-4xl font-black italic tracking-tighter hover:text-brand-accent transition-all text-black dark:text-white">THREAD</a>
              </div>

              <nav className="hidden lg:flex items-center gap-12">
                <button onClick={() => setCategoryAndScroll('men')} className="text-xs font-black uppercase tracking-[0.2em] hover:text-brand-accent transition-all relative group text-black/70 dark:text-white/70">
                  {t('men')}
                  <span className={`absolute -bottom-2 inset-x-0 h-1 bg-brand-accent transition-transform origin-center ${activeCategory === 'men' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                <button onClick={() => setCategoryAndScroll('women')} className="text-xs font-black uppercase tracking-[0.2em] hover:text-brand-accent transition-all relative group text-black/70 dark:text-white/70">
                  {t('women')}
                  <span className={`absolute -bottom-2 inset-x-0 h-1 bg-brand-accent transition-transform origin-center ${activeCategory === 'women' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                <button onClick={() => scrollToSection('offers')} className="text-xs font-black uppercase tracking-[0.2em] hover:text-brand-accent transition-all relative group text-black/70 dark:text-white/70">
                  {t('offers')}
                  <span className="absolute -bottom-2 inset-x-0 h-1 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></span>
                </button>
                <button onClick={() => scrollToSection('featured')} className="text-xs font-black uppercase tracking-[0.2em] hover:text-brand-accent transition-all relative group text-black/70 dark:text-white/70">
                  {t('featured')}
                  <span className="absolute -bottom-2 inset-x-0 h-1 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></span>
                </button>
              </nav>

              <div className="flex items-center gap-4">
                {/* Region Selector */}
                <div className="flex glass-card rounded-2xl p-1 overflow-hidden">
                   <button onClick={() => setRegion('EG')} className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all ${region === 'EG' ? 'bg-brand-accent text-white shadow-lg' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}>🇪🇬</button>
                   <button onClick={() => setRegion('SA')} className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all ${region === 'SA' ? 'bg-brand-accent text-white shadow-lg' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}>🇸🇦</button>
                </div>

                <button onClick={toggleTheme} className="p-3 glass-card rounded-2xl hover:bg-brand-accent hover:text-white transition-all text-black dark:text-white">
                  {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
                <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="p-3 glass-card rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all text-black dark:text-white">
                  {lang === 'en' ? 'AR' : 'EN'}
                </button>
                <button onClick={() => setIsCartOpen(true)} className="relative p-3 glass-card rounded-2xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group text-black dark:text-white">
                  <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[9px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-brand-dark animate-pulse">
                      {cartItems.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=2000&q=80" 
                className="w-full h-full object-cover opacity-60 filter grayscale animate-slow-zoom" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 dark:from-brand-dark/95 via-white/40 dark:via-brand-dark/40 to-transparent"></div>
            </div>

            <div className="container mx-auto px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="order-2 lg:order-1 flex flex-col gap-6 w-full lg:w-auto animate-slide-left">
                <button 
                  onClick={() => scrollToSection('featured')} 
                  className="group bg-brand-accent text-white px-12 py-6 rounded-[2rem] font-black text-3xl hover:scale-105 transition-all shadow-[0_30px_60px_-15px_rgba(255,0,61,0.5)] flex items-center justify-between gap-8 border-b-8 border-black/30"
                >
                  <span>{t('shopNow')}</span>
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-3 transition-transform" />
                </button>
                <button onClick={() => scrollToSection('offers')} className="glass-card bg-black/5 dark:bg-white/5 text-black dark:text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all text-start border-b-8 border-black/5 dark:border-white/5 flex items-center justify-between uppercase italic tracking-tighter">
                  {t('getDiscount')}
                  <Zap className="w-6 h-6 text-brand-accent" />
                </button>
              </div>

              <div className="order-1 lg:order-2 text-center lg:text-end animate-slide-right">
                <span className="inline-block px-6 py-2 bg-brand-accent text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 rounded-full rotate-3 shadow-2xl">Egypt & KSA Drop</span>
                <h1 className="hero-headline text-[15vw] lg:text-[14rem] text-black dark:text-white">
                  {lang === 'ar' ? 'ستايلك،' : 'YOUR'} <br />
                  <span className="text-stroke-light dark:text-stroke">{lang === 'ar' ? 'قصتك' : 'STORY'}</span>
                </h1>
                <p className="mt-8 text-gray-500 dark:text-white/40 text-lg font-black max-w-md lg:ms-auto uppercase italic tracking-tighter leading-tight">
                  {t('brandBio')}
                </p>
              </div>
            </div>

            {/* Floating Trust Bar */}
            <div className="absolute bottom-12 inset-x-0 z-20 pointer-events-none">
              <div className="container mx-auto px-8">
                <div className="flex flex-wrap gap-x-16 gap-y-4 opacity-60 dark:opacity-40 justify-center lg:justify-start">
                  {[
                    { icon: Truck, text: t('fastDelivery') },
                    { icon: ShieldCheck, text: t('securePayment') },
                    { icon: RotateCcw, text: t('easyReturns') },
                    { icon: Star, text: t('satisfiedCustomers') }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-brand-accent" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* OFFERS SECTION */}
          <section id="offers" className="py-20 bg-brand-accent/5 backdrop-blur-3xl relative overflow-hidden border-y border-black/5 dark:border-white/5">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-5">
                <h1 className="hero-headline text-[15rem] whitespace-nowrap leading-none select-none text-black dark:text-white">OFFERS</h1>
            </div>
            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                  <span className="text-brand-accent font-black uppercase tracking-[0.5em] text-xs mb-4 block animate-pulse">Regional Flash Event</span>
                  <h2 className="hero-headline text-6xl lg:text-8xl text-black dark:text-white">{t('exclusiveOffers')}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {offerProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />)}
                </div>
            </div>
          </section>

          {/* UNIFIED CATEGORY SWITCHER */}
          <section id="categories" className="py-12 container mx-auto px-8">
            <div className="relative group h-[350px] lg:h-[450px] overflow-hidden rounded-[3rem] shadow-2xl transition-all duration-700">
              <div className="absolute inset-0 z-0">
                <img 
                  src={categoryImages[activeCategory === 'all' ? 'all' : activeCategory]} 
                  className="w-full h-full object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-1000 scale-105 group-hover:scale-100 object-center" 
                  alt="Category background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              </div>

              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 lg:p-12 text-center items-center">
                <span className="text-brand-accent font-black uppercase tracking-[0.6em] text-[8px] mb-3 flex items-center gap-2">
                  <Users className="w-3 h-3" /> Regional Collection
                </span>
                
                <h2 className="hero-headline text-4xl lg:text-7xl text-white mb-6">
                  {t(activeCategory === 'all' ? 'featured' : activeCategory)}
                </h2>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {['men', 'women'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat as any)}
                      className={`px-6 py-3 rounded-xl font-black text-md uppercase italic tracking-tighter transition-all flex items-center gap-2 ${activeCategory === cat ? 'bg-brand-accent text-white scale-105 shadow-xl shadow-brand-accent/40' : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'}`}
                    >
                      {t(cat)}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => scrollToSection('featured')}
                  className="bg-white text-black px-10 py-3 rounded-2xl font-black text-lg hover:bg-brand-accent hover:text-white transition-all border-b-4 border-black/20 flex items-center gap-3 group/btn"
                >
                  {t('shopNow')} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </section>

          {/* WHY US / ADVANTAGES SECTION */}
          <section id="why-us" className="py-20 container mx-auto px-8 relative overflow-hidden">
            <div className="text-center mb-16">
              <h2 className="hero-headline text-5xl lg:text-7xl text-black dark:text-white">{t('whyUs')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Award, title: t('premiumQuality'), desc: t('premiumQualityDesc') },
                { icon: Palette, title: t('uniqueDesign'), desc: t('uniqueDesignDesc') },
                { icon: MessageSquare, title: t('fastSupport'), desc: t('fastSupportDesc') }
              ].map((feature, i) => (
                <div key={i} className="glass-card bg-black/5 dark:bg-white/5 rounded-[2.5rem] p-8 text-center group hover:border-brand-accent transition-all duration-500 border-b-8 border-black/5 dark:border-white/5">
                  <div className="w-16 h-16 bg-brand-accent text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-brand-accent/20">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black italic uppercase mb-4 text-black dark:text-white">{feature.title}</h3>
                  <p className="text-sm font-bold text-gray-500 dark:text-white/40 font-bold uppercase tracking-tighter italic">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Products Grid */}
          <section id="featured" className="py-20 bg-black/5 dark:bg-white/5 backdrop-blur-3xl relative overflow-hidden">
            <div className="container mx-auto px-8 relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                <div className="text-start">
                  <span className="text-brand-accent font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">Hottest Picks</span>
                  <h2 className="hero-headline text-5xl lg:text-7xl text-black dark:text-white">{t('featuredProducts')}</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['all', 'men', 'women'].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat as any)} 
                      className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border-b-4 ${activeCategory === cat ? 'bg-brand-accent text-white border-black/30' : 'glass-card bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white border-black/5 dark:border-white/5'}`}
                    >
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

          {/* Newsletter Subscription */}
          <section id="newsletter" className="py-24 container mx-auto px-8 text-center">
            <div className="relative glass-card bg-black/5 dark:bg-white/5 rounded-[4rem] p-12 lg:p-20 overflow-hidden border-b-8 border-brand-accent/30 shadow-[0_40px_80px_-20px_rgba(255,0,61,0.15)]">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent/20 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="text-brand-accent font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">EG & KSA Exclusive</span>
                <h2 className="hero-headline text-5xl lg:text-7xl text-black dark:text-white mb-8">{t('newsletterTitle')}</h2>
                <p className="text-xl font-black uppercase italic tracking-tighter text-gray-500 dark:text-white/50 mb-12">{t('newsletterDesc')}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <input type="email" placeholder="YOUR_EMAIL@HERE" className="flex-1 px-8 py-5 bg-black/5 dark:bg-white/5 border-2 border-black/10 dark:border-white/10 rounded-2xl text-black dark:text-white font-black text-lg focus:outline-none focus:border-brand-accent transition-all placeholder:text-gray-300 dark:placeholder:text-white/10 uppercase italic" />
                  <button className="px-12 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-xl hover:bg-brand-accent hover:text-white transition-all border-b-4 border-black/10 flex items-center justify-center gap-3">
                    {t('subscribe')} <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-20 container mx-auto px-8 max-w-4xl">
            <h2 className="hero-headline text-5xl lg:text-7xl text-center mb-16 text-black dark:text-white">{t('faq')}</h2>
            <div className="grid gap-4">
              {FAQ_DATA.map((faq, i) => (
                <div key={i} className="glass-card bg-black/5 dark:bg-white/5 rounded-2xl p-6 hover:border-brand-accent/30 transition-all cursor-default group border-b-4 border-black/5 dark:border-white/5">
                  <h3 className="text-xl font-black italic uppercase mb-3 text-brand-accent group-hover:translate-x-2 transition-transform text-start">{faq.q[lang]}</h3>
                  <p className="text-md font-bold text-gray-500 dark:text-white/40 leading-relaxed uppercase tracking-tighter text-start">{faq.a[lang]}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-20 border-t border-black/5 dark:border-white/5 bg-gray-50 dark:bg-brand-dark overflow-hidden relative">
            <div className="container mx-auto px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                <div className="lg:col-span-1">
                  <h2 className="hero-headline text-5xl italic tracking-tighter mb-6 text-black dark:text-white">THREAD.</h2>
                  <p className="text-gray-500 dark:text-white/40 font-black uppercase tracking-tighter text-md leading-snug mb-8 text-start">{t('brandBio')}</p>
                  <div className="flex gap-3">
                    <a href="#" className="p-3 glass-card bg-white dark:bg-white/5 rounded-xl text-gray-400 dark:text-white/30 hover:text-brand-accent hover:border-brand-accent transition-all shadow-sm"><Instagram className="w-5 h-5" /></a>
                    <a href="#" className="p-3 glass-card bg-white dark:bg-white/5 rounded-xl text-gray-400 dark:text-white/30 hover:text-brand-accent hover:border-brand-accent transition-all shadow-sm"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="p-3 glass-card bg-white dark:bg-white/5 rounded-xl text-gray-400 dark:text-white/30 hover:text-brand-accent hover:border-brand-accent transition-all shadow-sm"><Facebook className="w-5 h-5" /></a>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-8">EXPLORE</h4>
                  <ul className="space-y-3 text-lg font-black italic uppercase">
                    <li><button onClick={() => setCategoryAndScroll('men')} className="text-black/70 dark:text-white/70 hover:text-brand-accent transition-colors text-start">{t('men')}</button></li>
                    <li><button onClick={() => setCategoryAndScroll('women')} className="text-black/70 dark:text-white/70 hover:text-brand-accent transition-colors text-start">{t('women')}</button></li>
                    <li><button onClick={() => scrollToSection('offers')} className="text-black/70 dark:text-white/70 hover:text-brand-accent transition-colors text-start">{t('offers')}</button></li>
                    <li><button onClick={() => scrollToSection('featured')} className="text-black/70 dark:text-white/70 hover:text-brand-accent transition-colors text-start">{t('featured')}</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-8">SUPPORT</h4>
                  <ul className="space-y-3 text-gray-400 dark:text-white/40 font-black uppercase text-xs tracking-widest italic">
                    <li><button onClick={() => setPolicyModal('terms')} className="hover:text-black dark:hover:text-white transition-colors text-start">{t('terms')}</button></li>
                    <li><button onClick={() => setPolicyModal('privacy')} className="hover:text-black dark:hover:text-white transition-colors text-start">{t('privacy')}</button></li>
                    <li><button onClick={() => setPolicyModal('payment')} className="hover:text-black dark:hover:text-white transition-colors text-start">{t('paymentMethods')}</button></li>
                    <li><button onClick={() => setPolicyModal('exchange')} className="hover:text-black dark:hover:text-white transition-colors text-start">{t('exchangePolicy')}</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-8">CONTACT</h4>
                  <ul className="space-y-4 text-gray-400 dark:text-white/40 font-black italic uppercase text-md tracking-tighter">
                    <li>
                      <a href="https://wa.me/201119241396" target="_blank" className="flex items-center gap-3 hover:text-brand-accent transition-colors">
                        <Smartphone className="w-5 h-5 text-brand-accent" /> 01119241396
                      </a>
                    </li>
                    <li>
                      <a href="mailto:alnmkym36@gmail.com" className="flex items-center gap-3 hover:text-brand-accent transition-colors break-all">
                        <Mail className="w-5 h-5 text-brand-accent" /> alnmkym36@gmail.com
                      </a>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <h4 className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-accent mb-3">{t('location')}</h4>
                    <p className="text-[10px] font-bold text-gray-400 flex items-center gap-2"><MapPin className="w-3 h-3"/> {t('locationVal')}</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-gray-300 dark:text-white/20 italic">© 2024 THREAD EXCLUSIVE STORE. {t('rights')}</span>
                <div className="flex gap-6 opacity-30 hover:opacity-100 transition-opacity">
                  <Truck className="w-4 h-4 text-black dark:text-white" />
                  <ShieldCheck className="w-4 h-4 text-black dark:text-white" />
                  <RotateCcw className="w-4 h-4 text-black dark:text-white" />
                </div>
              </div>
            </div>
          </footer>

          {/* Floating Buttons */}
          <div className={`fixed bottom-12 ${lang === 'ar' ? 'left-12' : 'right-12'} z-[60] flex flex-col gap-6 transition-all duration-700`}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-7 glass-card bg-white/10 dark:bg-white/5 rounded-3xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all border-b-4 border-brand-accent/20">
              <ArrowUp className="w-7 h-7" />
            </button>
            <a href="https://wa.me/201119241396" target="_blank" className="p-7 bg-brand-accent text-white rounded-3xl hover:scale-110 transition-all border-b-4 border-black/30 shadow-[0_20px_40px_-10px_rgba(255,0,61,0.4)]">
              <Smartphone className="w-7 h-7" />
            </a>
          </div>

          <Modal 
            isOpen={policyModal !== null} 
            onClose={() => setPolicyModal(null)} 
            title={policyModal ? POLICIES[policyModal].title[lang] : ''}
          >
            {policyModal ? POLICIES[policyModal][lang] : ''}
          </Modal>

          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onUpdate={handleUpdateQuantity} onRemove={handleRemoveItem} />

          <style>{`
            @keyframes slow-zoom {
              0% { transform: scale(1); }
              100% { transform: scale(1.15); }
            }
            .animate-slow-zoom {
              animation: slow-zoom 25s ease-in-out infinite alternate;
            }
            .text-stroke {
              -webkit-text-stroke: 2px rgba(255,255,255,0.6);
              color: rgba(255,255,255,0.05);
              text-shadow: 0 0 15px rgba(255,255,255,0.1);
            }
            .text-stroke-light {
              -webkit-text-stroke: 2px rgba(0,0,0,0.3);
              color: rgba(0,0,0,0.05);
              text-shadow: 0 0 10px rgba(0,0,0,0.05);
            }
          `}</style>
        </div>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
