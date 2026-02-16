
import { Product, TranslationDictionary } from './types';

export const EXCHANGE_RATE = 13.5; // 1 SAR = 13.5 EGP (approximate)

export const PRODUCTS: Product[] = [
  // المنتجات الجديدة بخصم 15%
  {
    id: 'promo-1',
    name: { en: "Urban Stealth Jacket", ar: "جاكيت أربان ستيلث" },
    price: 850,
    originalPrice: 1000,
    rating: 5.0,
    reviews: 24,
    badge: { en: "-15% OFF", ar: "خصم %15" },
    colors: ["أسود"],
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    category: 'men'
  },
  {
    id: 'promo-2',
    name: { en: "Midnight Tech Hoodie", ar: "هودي ميدينايت تيك" },
    price: 680,
    originalPrice: 800,
    rating: 4.9,
    reviews: 42,
    badge: { en: "-15% OFF", ar: "خصم %15" },
    colors: ["كحلي"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    category: 'men'
  },
  {
    id: 'promo-3',
    name: { en: "Cyber Cargo Pants", ar: "بنطلون كارغو سايبر" },
    price: 595,
    originalPrice: 700,
    rating: 4.8,
    reviews: 19,
    badge: { en: "-15% OFF", ar: "خصم %15" },
    colors: ["زيتوني"],
    sizes: ["30", "32", "34"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    category: 'men'
  },
  {
    id: 'promo-4',
    name: { en: "Aesthetic Graphic Tee", ar: "تيشرت جرافيك مودرن" },
    price: 340,
    originalPrice: 400,
    rating: 4.9,
    reviews: 56,
    badge: { en: "-15% OFF", ar: "خصم %15" },
    colors: ["أبيض"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    category: 'men'
  },
  {
    id: 'off1',
    name: { en: "Utility Tech Vest", ar: "فيست تيكنيكال" },
    price: 499,
    originalPrice: 750,
    rating: 4.9,
    reviews: 156,
    badge: { en: "HOT", ar: "ساخن" },
    colors: ["أسود"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    category: 'men'
  },
  {
    id: 'w1',
    name: { en: "Cropped Urban Jacket", ar: "جاكيت أربان قصير" },
    price: 549,
    originalPrice: 799,
    rating: 4.9,
    reviews: 128,
    badge: { en: "OFFER", ar: "عرض" },
    colors: ["بيج"],
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    category: 'women'
  },
  {
    id: 'w2',
    name: { en: "Neon Logo Sweatshirt", ar: "سويت شيرت بشعار نيون" },
    price: 399,
    rating: 4.7,
    reviews: 184,
    badge: { en: "New", ar: "جديد" },
    colors: ["أسود"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    category: 'women'
  }
];

export const TRANSLATIONS: TranslationDictionary = {
  tagline: { en: "Your Style, Your Story", ar: "ستايلك، قصتك" },
  shopNow: { en: "Shop Now", ar: "تسوّق الآن" },
  getDiscount: { en: "Get 15% Off", ar: "احصل على خصم %15" },
  men: { en: "Men", ar: "رجال" },
  women: { en: "Women", ar: "نساء" },
  all: { en: "All", ar: "الكل" },
  offers: { en: "Offers", ar: "العروض" },
  featured: { en: "Featured", ar: "المميزة" },
  newArrivals: { en: "New Arrivals", ar: "وصل حديثاً" },
  fastDelivery: { en: "EG & KSA Delivery", ar: "توصيل مصر والسعودية" },
  securePayment: { en: "Secure Payment", ar: "دفع آمن" },
  easyReturns: { en: "14 Days Returns", ar: "إرجاع 14 يوم" },
  satisfiedCustomers: { en: "+50k Customers", ar: "+50 ألف عميل" },
  featuredProducts: { en: "Featured Products", ar: "منتجات مميزة" },
  exclusiveOffers: { en: "Exclusive Offers", ar: "عروض حصرية" },
  newsletterTitle: { en: "Join the Club", ar: "انضم إلينا" },
  newsletterDesc: { en: "Get the latest drops first.", ar: "كن أول من يحصل على الإصدارات." },
  subscribe: { en: "Subscribe", ar: "اشترك" },
  faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
  cart: { en: "Cart", ar: "العربة" },
  checkoutViaWhatsapp: { en: "Order via WhatsApp", ar: "اطلب عبر واتساب" },
  total: { en: "Total", ar: "الإجمالي" },
  egp: { en: "EGP", ar: "ج.م" },
  sar: { en: "SAR", ar: "ر.س" },
  addToCart: { en: "Add to Cart", ar: "أضف للعربة" },
  remove: { en: "Remove", ar: "حذف" },
  continueShopping: { en: "Shop More", ar: "تسوق المزيد" },
  menCatDesc: { en: "Rugged urban styles.", ar: "ستايل أربان قوي." },
  womenCatDesc: { en: "Bold feminine looks.", ar: "إطلالات أنثوية جريئة." },
  brandBio: { en: "The first Egyptian brand with a global touch dedicated to a generation that knows no bounds, now shipping to Saudi Arabia.", ar: "أول براند مصري بلمسة عالمية مخصص لجيل لا يعرف الحدود، نشحن الآن للمملكة العربية السعودية." },
  close: { en: "Close", ar: "إغلاق" },
  rights: { en: "All rights reserved to THREAD", ar: "جميع الحقوق محفوظة لـ THREAD" },
  paymentMethods: { en: "Payment Methods", ar: "طرق الدفع" },
  exchangePolicy: { en: "Exchange Policy", ar: "سياسة الاستبدال" },
  privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  terms: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
  workingHours: { en: "Working Hours", ar: "مواعيد العمل" },
  hoursVal: { en: "Everyday: 10 AM - 10 PM (GMT+2)", ar: "يومياً: 10 ص - 10 م" },
  location: { en: "Locations", ar: "المواقع" },
  locationVal: { en: "Cairo, Egypt | Riyadh, KSA", ar: "القاهرة، مصر | الرياض، السعودية" },
  whyUs: { en: "Why Thread?", ar: "لماذا ثريد؟" },
  premiumQuality: { en: "Premium Quality", ar: "جودة ممتازة" },
  premiumQualityDesc: { en: "High-grade Egyptian fabrics tailored for durability.", ar: "أقمشة مصرية عالية الجودة مصممة لتدوم طويلاً." },
  uniqueDesign: { en: "Unique Design", ar: "تصميم فريد" },
  uniqueDesignDesc: { en: "Streetwear that tells a story, unlike anything else.", ar: "ستريت وير يحكي قصة، لا يشبه أي شيء آخر." },
  fastSupport: { en: "24/7 Support", ar: "دعم 24/7" },
  fastSupportDesc: { en: "Our team is here to help you anytime on WhatsApp.", ar: "فريقنا هنا لمساعدتك في أي وقت عبر الواتساب." }
};

export const FAQ_DATA = [
  {
    q: { en: "Shipping time?", ar: "وقت الشحن؟" },
    a: { en: "2-3 days for Egypt, 4-6 days for Saudi Arabia.", ar: "2-3 أيام لمصر، و4-6 أيام للسعودية." }
  },
  {
    q: { en: "Payment methods?", ar: "طرق الدفع؟" },
    a: { en: "COD (Egypt only), Credit Cards, Tamara & Tabby (KSA).", ar: "دفع عند الاستلام (مصر فقط)، فيزا، تمارا وتابي (السعودية)." }
  },
  {
    q: { en: "Exchange policy?", ar: "سياسة الاستبدال؟" },
    a: { en: "14 days return window for both regions.", ar: "إرجاع خلال 14 يوم لكلا البلدين." }
  }
];

export const POLICIES: Record<string, { en: string; ar: string; title: { en: string; ar: string } }> = {
  terms: {
    title: { en: "Terms", ar: "الشروط" },
    en: "Standard Terms & Conditions apply to all orders placed through THREAD in Egypt and KSA.",
    ar: "تطبق الشروط والأحكام القياسية على جميع الطلبات في مصر والسعودية."
  },
  privacy: {
    title: { en: "Privacy", ar: "الخصوصية" },
    en: "Your data is protected under local laws. We only use it for delivery and improving your experience.",
    ar: "بياناتك محمية بموجب القوانين المحلية. نستخدمها فقط للتوصيل وتحسين تجربتك."
  },
  payment: {
    title: { en: "Payment", ar: "الدفع" },
    en: "Egypt: COD & Cards. KSA: Cards, Apple Pay, Tamara, Tabby.",
    ar: "مصر: دفع عند الاستلام وكروت. السعودية: كروت، ابل باي، تمارا، تابي."
  },
  exchange: {
    title: { en: "Exchange", ar: "الاستبدال" },
    en: "Free exchange for defective items. Return shipping may apply for other reasons depending on your country.",
    ar: "تبديل مجاني للمنتجات المعيبة. قد يتم تطبيق رسوم شحن الإرجاع لأسباب أخرى حسب بلدك."
  }
};
