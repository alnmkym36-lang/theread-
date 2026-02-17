
import { Product, TranslationDictionary } from './types';

export const EXCHANGE_RATE = 13.5; // 1 SAR = 13.5 EGP (approximate)

export const PRODUCTS: Product[] = [
  // --- Promo/Discounted Products (15% Off) ---
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
  
  // --- New Men's Products ---
  {
    id: 'm1',
    name: { en: "Graphic Oversized Tee", ar: "تيشيرت واسع بطبعة" },
    price: 450,
    rating: 4.8,
    reviews: 56,
    colors: ["أبيض", "أسود"],
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=800&q=80",
    category: 'men'
  },
  {
    id: 'm2',
    name: { en: "Tactical Cargo Pants", ar: "بنطلون كارجو تكتيكال" },
    price: 750,
    rating: 4.7,
    reviews: 89,
    badge: { en: "BESTSELLER", ar: "الأكثر مبيعاً" },
    colors: ["كاكي", "أسود"],
    sizes: ["30", "32", "34", "36"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    category: 'men'
  },

  // --- Women's Collection (Updated with more items) ---
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
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
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
  },
  {
    id: 'w3',
    name: { en: "Oversized Utility Shirt", ar: "تيشيرت يونيفورم واسع" },
    price: 420,
    rating: 4.8,
    reviews: 65,
    colors: ["رمادي"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    category: 'women'
  },
  {
    id: 'w4',
    name: { en: "Street Style Beanie", ar: "أيس كاب ستريت" },
    price: 180,
    rating: 4.9,
    reviews: 210,
    badge: { en: "TRENDING", ar: "تريند" },
    colors: ["فوشيا"],
    sizes: ["واحد"],
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
    category: 'women'
  },

  // --- Accessories Collection ---
  {
    id: 'a1',
    name: { en: "Minimalist Silver Chain", ar: "سلسلة فضة مينياليست" },
    price: 350,
    rating: 4.8,
    reviews: 120,
    colors: ["فضي"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80",
    category: 'accessories'
  },
  {
    id: 'a2',
    name: { en: "Urban Crossbody Bag", ar: "شنطة كروس أربان" },
    price: 550,
    rating: 4.9,
    reviews: 85,
    colors: ["أسود"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    category: 'accessories'
  },
  {
    id: 'a3',
    name: { en: "Retro Future Sunglasses", ar: "نظارة شمسية ريترو" },
    price: 400,
    rating: 4.7,
    reviews: 45,
    colors: ["أسود"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    category: 'accessories'
  }
];

export const TRANSLATIONS: TranslationDictionary = {
  tagline: { en: "Your Style, Your Story", ar: "ستايلك، قصتك" },
  shopNow: { en: "Shop Now", ar: "تسوّق الآن" },
  getDiscount: { en: "Get 15% Off", ar: "احصل على خصم %15" },
  men: { en: "Men", ar: "رجال" },
  women: { en: "Women", ar: "نساء" },
  accessories: { en: "Accessories", ar: "إكسسوارات" },
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
  newsletterTitle: { en: "Unlock 10% Off", ar: "احصل على خصم %10" },
  newsletterDesc: { en: "Subscribe to get your promo code and latest drops.", ar: "اشترك الآن لتحصل على كود الخصم وآخر الإصدارات." },
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
  fastSupportDesc: { en: "Our team is here to help you anytime on WhatsApp.", ar: "فريقنا هنا لمساعدتك في أي وقت عبر الواتساب." },
  
  // --- New Translations for Full Localization ---
  regionalDrop: { en: "EGYPT & KSA DROP", ar: "إصدار مصر والسعودية" },
  regionalFlash: { en: "Regional Flash Event", ar: "عروض فلاش إقليمية" },
  hottestPicks: { en: "Hottest Picks", ar: "أفضل الاختيارات" },
  emailPlaceholder: { en: "YOUR_EMAIL@HERE", ar: "بريدك الإلكتروني" },
  explore: { en: "EXPLORE", ar: "اكتشف" },
  support: { en: "SUPPORT", ar: "الدعم" },
  contact: { en: "CONTACT", ar: "تواصل معنا" },
  copyrightStore: { en: "© 2024 THREAD EXCLUSIVE STORE.", ar: "© 2024 متجر ثريد الحصري." },
  sizeGuide: { en: "Size Guide", ar: "دليل المقاسات" },
  
  // --- Size Guide Section Keys ---
  findYourFit: { en: "Find Your Perfect Fit", ar: "اكتشف مقاسك المثالي" },
  size: { en: "Size", ar: "المقاس" },
  chest: { en: "Chest", ar: "الصدر" },
  length: { en: "Length", ar: "الطول" },
  waist: { en: "Waist", ar: "الوسط" },
  menSizes: { en: "Men's Sizes", ar: "مقاسات الرجال" },
  womenSizes: { en: "Women's Sizes", ar: "مقاسات النساء" },

  // --- Checkout Form Keys ---
  checkoutForm: { en: "Checkout", ar: "إتمام الطلب" },
  fullName: { en: "Full Name", ar: "الاسم بالكامل" },
  phoneNumber: { en: "Phone Number", ar: "رقم الهاتف" },
  governorate: { en: "Governorate / City", ar: "المحافظة / المدينة" },
  addressDetails: { en: "Detailed Address", ar: "العنوان بالتفصيل" },
  confirmOrder: { en: "Confirm Order", ar: "تأكيد الطلب" },
  backToCart: { en: "Back to Cart", ar: "العودة للعربة" },
  fillAllFields: { en: "Please fill all fields", ar: "يرجى ملء جميع البيانات" },
  
  // --- Shipping ---
  shipping: { en: "Shipping", ar: "الشحن" },
  free: { en: "Free", ar: "مجاني" },
  subtotal: { en: "Subtotal", ar: "المجموع الفرعي" },
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
  },
  sizeGuide: {
    title: { en: "Size Guide", ar: "دليل المقاسات" },
    en: "MEN'S TOPS (Chest):\nS: 91-96 cm\nM: 96-101 cm\nL: 101-106 cm\nXL: 106-111 cm\n\nWOMEN'S TOPS (Bust):\nXS: 76-81 cm\nS: 81-86 cm\nM: 86-91 cm\nL: 91-96 cm",
    ar: "ملابس الرجال (محيط الصدر):\nS: 91-96 سم\nM: 96-101 سم\nL: 101-106 سم\nXL: 106-111 سم\n\nملابس النساء (محيط الصدر):\nXS: 76-81 سم\nS: 81-86 سم\nM: 86-91 سم\nL: 91-96 سم"
  }
};
