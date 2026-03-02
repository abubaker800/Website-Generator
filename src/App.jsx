import React, { useState } from 'react';
import { 
  Smartphone, Download, Layout, Type, CheckCircle, ExternalLink, Menu, X, 
  MapPin, Phone, Clock, MessageCircle, Image as ImageIcon, Palette, 
  ShoppingBag, Plus, Trash2, Star, Facebook, Instagram, Twitter, Grid, 
  ChevronDown, ChevronUp, Globe, Briefcase, Settings, Calendar
} from 'lucide-react';

// --- Stock Image Library (Unsplash IDs) ---
const CATEGORIES = {
  restaurant: {
    label: 'Restaurant / Food',
    type: 'product',
    hero: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    about: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
    color: '#ea580c', // Orange
    defaults: {
        headline: 'Taste the Tradition of Multan',
        subheadline: 'Authentic flavors, fresh ingredients, and a warm atmosphere. Experience dining like never before.',
        services: [
            { title: 'Dine-In Experience', desc: 'Enjoy our ambiance with family and friends.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
            { title: 'Home Delivery', desc: 'Hot and fresh food delivered to your doorstep.', image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80' }
        ],
        items: [
            { name: 'Special Mutton Karahi', price: '2500', desc: 'Half kg, cooked in desi ghee.', image: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=800&q=80' },
            { name: 'Chicken Biryani', price: '500', desc: 'Aromatic basmati rice with tender chicken.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80' },
            { name: 'Zinger Burger', price: '450', desc: 'Crispy fillet with cheese and mayo.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' }
        ],
        testimonials: [
            { name: 'Ali Khan', comment: 'Best food in Multan! The Karahi was absolutely delicious.', stars: 5 },
            { name: 'Sara Ahmed', comment: 'Great ambiance and very fast service. Highly recommended.', stars: 5 }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
        ]
    }
  },
  fashion: {
    label: 'Fashion / Boutique',
    type: 'product',
    hero: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
    about: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80',
    color: '#be185d', // Pink
    defaults: {
        headline: 'Elegance in Every Stitch',
        subheadline: 'Discover the latest trends in Eastern and Western wear. Premium quality fabrics for the modern you.',
        services: [
            { title: 'Custom Tailoring', desc: 'Perfect fit guaranteed by our expert tailors.', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80' },
            { title: 'Bridal Collection', desc: 'Make your special day unforgettable.', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80' }
        ],
        items: [
            { name: 'Summer Lawn 3pc', price: '3500', desc: 'Digital printed lawn with chiffon dupatta.', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80' },
            { name: 'Embroidered Kurti', price: '1800', desc: 'Ready to wear, available in all sizes.', image: 'https://images.unsplash.com/photo-1551232864-3f522c69cb38?auto=format&fit=crop&w=800&q=80' }
        ],
        testimonials: [
            { name: 'Fatima Z.', comment: 'Loved the stitching quality. Fits perfectly!', stars: 5 },
            { name: 'Hina B.', comment: 'The fabric is very soft and the design is unique.', stars: 4 }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
        ]
    }
  },
  tech: {
    label: 'Electronics / Repair',
    type: 'product',
    hero: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=1600&q=80',
    about: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&w=800&q=80',
    color: '#2563eb', // Blue
    defaults: {
        headline: 'Expert Repair & Gadgets',
        subheadline: 'Your one-stop shop for mobile repairs, accessories, and new devices. Trusted by thousands.',
        services: [
            { title: 'Mobile Repair', desc: 'Screen replacement and hardware fixes in 30 mins.', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80' },
            { title: 'Used Phones', desc: 'Certified used phones with warranty.', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' }
        ],
        items: [
            { name: 'Fast Charger 20W', price: '1200', desc: 'Original quality, type-C supported.', image: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=800&q=80' },
            { name: 'Glass Protector', price: '500', desc: '9D tempered glass for all models.', image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=800&q=80' }
        ],
        testimonials: [
            { name: 'Usman K.', comment: 'Fixed my iPhone screen in 20 minutes. Great job!', stars: 5 },
            { name: 'Bilal A.', comment: 'Bought a used Samsung here, works perfectly.', stars: 5 }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80'
        ]
    }
  },
  gym: {
    label: 'Gym / Fitness',
    type: 'service',
    hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
    about: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    color: '#dc2626', // Red
    defaults: {
        headline: 'Transform Your Body Today',
        subheadline: 'State of the art equipment, expert trainers, and a community that motivates you.',
        services: [
            { title: 'Personal Training', desc: '1-on-1 coaching to reach your goals faster.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80' },
            { title: 'Cardio Zone', desc: 'Treadmills, rowers, and bikes available.', image: 'https://images.unsplash.com/photo-1538805060504-d1d52d15523d?auto=format&fit=crop&w=800&q=80' }
        ],
        items: [
            { name: 'Monthly Membership', price: '3000', desc: 'Full access to gym and cardio.', image: 'https://images.unsplash.com/photo-1574680096141-1cddd32e01f5?auto=format&fit=crop&w=800&q=80' },
            { name: 'Protein Shake', price: '800', desc: 'Post-workout recovery drink.', image: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?auto=format&fit=crop&w=800&q=80' }
        ],
        testimonials: [
            { name: 'Zainab R.', comment: 'Lost 5kg in my first month. The trainers are amazing.', stars: 5 },
            { name: 'Ahmed S.', comment: 'Best gym equipment in the area.', stars: 5 }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80'
        ]
    }
  }
};

// --- Helper: Collapsible Section ---
const Section = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden mb-4 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition text-left"
      >
        <div className="flex items-center gap-2 font-bold text-gray-700 text-sm uppercase tracking-wide">
          <Icon size={16} className="text-indigo-600" /> {title}
        </div>
        {isOpen ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
      </button>
      {isOpen && <div className="p-4 border-t border-gray-100">{children}</div>}
    </div>
  );
};

// --- PREVIEW COMPONENT ---
const ClientWebsitePreview = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Dynamic Theme Colors
  const themeBg = data.theme === 'dark' ? 'bg-slate-900' : 'bg-white';
  const themeText = data.theme === 'dark' ? 'text-white' : 'text-slate-900';
  const themeCard = data.theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50';
  const brandColor = data.brandColor || '#4f46e5';

  const isService = data.businessType === 'service';
  const buttonText = isService ? 'Book Now' : 'Order Now';
  const whatsappVerb = isService ? 'book' : 'order';
  const ButtonIcon = isService ? Calendar : ShoppingBag;

  return (
    <div className={`h-full w-full overflow-y-auto font-sans ${themeBg} ${themeText}`}>
      {/* Nav */}
      <nav className={`p-4 flex justify-between items-center sticky top-0 z-20 backdrop-blur-md ${data.theme === 'dark' ? 'bg-slate-900/90 border-b border-slate-800' : 'bg-white/90 shadow-sm'}`}>
        <span className="font-bold text-lg tracking-tight" style={{ color: brandColor }}>{data.businessName}</span>
        <div className="flex items-center gap-3">
             <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-24 px-6 text-center flex flex-col items-center justify-center min-h-[450px]">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${data.theme === 'dark' ? 'bg-black/70' : 'bg-slate-900/60'}`}></div>
        </div>
        <div className="relative z-10 text-white max-w-lg mx-auto">
            <div className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                Welcome to {data.businessName}
            </div>
            <h1 className="text-4xl font-extrabold mb-4 leading-tight drop-shadow-lg">{data.headline}</h1>
            <p className="text-lg mb-8 opacity-90 leading-relaxed font-light drop-shadow-md">
                {data.subheadline}
            </p>
            <div className="flex flex-col gap-3">
                <button 
                    style={{ backgroundColor: brandColor }}
                    className="text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition shadow-lg flex items-center justify-center gap-2"
                >
                    <Phone size={18} /> {data.ctaText}
                </button>
            </div>
        </div>
      </header>

      {/* About */}
      <section className={`py-12 px-6 ${data.theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
        <div className="rounded-2xl overflow-hidden mb-6 shadow-lg">
            <img src={data.aboutImage} alt="About Us" className="w-full h-56 object-cover" />
        </div>
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: brandColor }}>
            <CheckCircle size={20}/> About Us
        </h2>
        <p className="opacity-70 leading-relaxed text-sm">{data.aboutText}</p>
      </section>

      {/* Menu / Products */}
      <section className={`py-12 px-6 ${themeBg}`}>
        <h2 className="text-2xl font-bold text-center mb-2">{isService ? 'Plans / Services' : 'Our Products'}</h2>
        <div className="w-16 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: brandColor }}></div>
        
        <div className="grid grid-cols-1 gap-6">
            {(data.items || []).map((item, idx) => (
                <div key={idx} className={`rounded-2xl overflow-hidden border flex ${themeCard}`}>
                    <div className="w-1/3 bg-gray-200 relative">
                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 w-2/3 flex flex-col justify-center">
                        <h4 className="font-bold text-sm mb-1 leading-tight">{item.name}</h4>
                        <p className="text-[10px] opacity-70 mb-2 line-clamp-2">{item.desc}</p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="font-bold text-sm" style={{ color: brandColor }}>Rs. {item.price}</span>
                             <a 
                                href="#"
                                style={{ backgroundColor: brandColor }}
                                className="text-[10px] text-white px-3 py-1.5 rounded-lg font-bold"
                            >
                                {buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Gallery */}
      {data.gallery.length > 0 && (
          <section className={`py-12 px-6 ${data.theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
            <h2 className="text-xl font-bold text-center mb-6">Gallery</h2>
            <div className="grid grid-cols-2 gap-2">
                {data.gallery.map((img, idx) => (
                    <img key={idx} src={img} className={`w-full h-32 object-cover rounded-lg ${idx === 0 ? 'col-span-2 h-48' : ''}`} />
                ))}
            </div>
          </section>
      )}

      {/* Testimonials */}
      <section className={`py-12 px-6 ${themeBg}`}>
        <h2 className="text-xl font-bold text-center mb-8">Happy Customers</h2>
        <div className="space-y-4">
             {data.testimonials.map((t, idx) => (
                 <div key={idx} className={`p-4 rounded-xl border ${themeCard}`}>
                     <div className="flex text-yellow-400 mb-2">
                         {[...Array(t.stars)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                     </div>
                     <p className="text-xs opacity-70 italic mb-2">"{t.comment}"</p>
                     <p className="text-xs font-bold text-right">- {t.name}</p>
                 </div>
             ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 ${data.theme === 'dark' ? 'bg-black' : 'bg-slate-900'} text-white`}>
        <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">{data.businessName}</h2>
            <div className="flex justify-center gap-4">
                {data.socials?.facebook && <div className="p-2 bg-white/10 rounded-full"><Facebook size={18}/></div>}
                {data.socials?.instagram && <div className="p-2 bg-white/10 rounded-full"><Instagram size={18}/></div>}
            </div>
            <div className="text-sm opacity-70 space-y-2">
                <p>{data.address}</p>
                <p>{data.phone}</p>
            </div>
            <p className="text-[10px] opacity-30 mt-8">&copy; 2025 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// --- MAIN ADMIN APP ---
export default function WebBuilder() {
  const [activeTab, setActiveTab] = useState('editor');
  
  // Custom Category State
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState({ name: '', type: 'service' });

  // INITIAL STATE
  const [formData, setFormData] = useState({
    category: 'restaurant',
    businessType: 'product', // 'product' or 'service'
    businessName: 'Multan Karahi House',
    headline: 'Best Mutton Karahi in Gulgasht',
    subheadline: 'Serving authentic taste with desi ghee since 1995.',
    aboutText: 'Located in the heart of Multan, we bring you recipes passed down through generations.',
    ctaText: 'Order Now',
    phone: '+92 300 1234567',
    whatsapp: '923001234567',
    address: 'Shop #5, Gol Bagh, Gulgasht Colony, Multan',
    brandColor: '#ea580c',
    theme: 'light',
    heroImage: CATEGORIES.restaurant.hero,
    aboutImage: CATEGORIES.restaurant.about,
    services: CATEGORIES.restaurant.defaults.services,
    items: CATEGORIES.restaurant.defaults.items,
    testimonials: CATEGORIES.restaurant.defaults.testimonials,
    gallery: CATEGORIES.restaurant.defaults.gallery,
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com' }
  });

  const applyCategory = (catKey) => {
    const cat = CATEGORIES[catKey];
    setFormData(prev => ({
        ...prev,
        category: catKey,
        businessType: cat.type,
        brandColor: cat.color,
        heroImage: cat.hero,
        aboutImage: cat.about,
        headline: cat.defaults.headline,
        subheadline: cat.defaults.subheadline,
        services: cat.defaults.services,
        items: cat.defaults.items || [],
        testimonials: cat.defaults.testimonials || [],
        gallery: cat.defaults.gallery || []
    }));
    setIsCustomMode(false);
  };

  const applyCustomCategory = () => {
    const { name, type } = customInput;
    const isService = type === 'service';
    const cta = isService ? 'Book Now' : 'Shop Now';
    
    setFormData(prev => ({
        ...prev,
        category: 'custom',
        businessType: type,
        headline: `Best ${name} in Multan`,
        subheadline: `Professional ${name.toLowerCase()} services tailored to your specific needs. Quality you can trust.`,
        aboutText: `We are a leading ${name.toLowerCase()} business dedicated to providing top-notch quality and customer satisfaction.`,
        ctaText: cta,
        items: [
            { name: isService ? 'Basic Service' : 'Product 1', price: '1000', desc: isService ? 'Standard consultation and service.' : 'High quality premium product.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
            { name: isService ? 'Premium Service' : 'Product 2', price: '2500', desc: isService ? 'Full package with extra support.' : 'Advanced features included.', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80' }
        ],
        heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80', // Generic business image
        aboutImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    }));
    setIsCustomMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (key, value) => {
      setFormData(prev => ({ ...prev, socials: { ...prev.socials, [key]: value } }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = value;
    setFormData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const addItemToArray = (arrayName, emptyObj) => {
    setFormData(prev => ({ ...prev, [arrayName]: [...prev[arrayName], emptyObj] }));
  };

  const removeItemFromArray = (arrayName, index) => {
    setFormData(prev => ({ ...prev, [arrayName]: prev[arrayName].filter((_, i) => i !== index) }));
  };

  // --- GENERATE CODE ---
  const generateCode = () => {
    const isService = formData.businessType === 'service';
    const buttonText = isService ? 'Book Now' : 'Order Now';
    const whatsappVerb = isService ? 'book' : 'order';
    const sectionTitle = isService ? 'Membership & Plans' : 'Our Products';
    const brand = formData.brandColor;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.businessName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .brand-text { color: ${brand}; }
        .brand-bg { background-color: ${brand}; }
        .brand-border { border-color: ${brand}; }
        .brand-btn:hover { filter: brightness(110%); }
    </style>
</head>
<body class="${formData.theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} antialiased">
    
    <!-- Navbar -->
    <nav class="p-4 flex justify-between items-center sticky top-0 z-50 ${formData.theme === 'dark' ? 'bg-slate-900/90 border-b border-slate-800' : 'bg-white/90 shadow-sm'} backdrop-blur-md">
        <span class="font-bold text-xl tracking-tight brand-text">${formData.businessName}</span>
        ${formData.whatsapp ? `
        <a href="https://wa.me/${formData.whatsapp}" class="brand-bg text-white px-4 py-2 rounded-full text-sm font-bold brand-btn transition flex items-center gap-2 shadow-lg shadow-${brand}/30">
            <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp
        </a>` : ''}
    </nav>

    <!-- Hero -->
    <header class="relative py-32 px-6 text-center flex flex-col items-center justify-center min-h-[550px]">
        <div class="absolute inset-0 z-0">
          <img src="${formData.heroImage}" alt="Hero" class="w-full h-full object-cover" />
          <div class="absolute inset-0 ${formData.theme === 'dark' ? 'bg-black/70' : 'bg-slate-900/60'}"></div>
        </div>
        <div class="relative z-10 text-white max-w-3xl mx-auto">
            <div class="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                Welcome to ${formData.businessName}
            </div>
            <h1 class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-2xl">${formData.headline}</h1>
            <p class="text-xl mb-10 opacity-90 leading-relaxed font-light drop-shadow-md max-w-2xl mx-auto">
                ${formData.subheadline}
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:${formData.phone}" class="brand-bg text-white px-8 py-4 rounded-xl font-bold brand-btn transition shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-1">
                    <i data-lucide="phone" class="w-5 h-5"></i> ${formData.ctaText}
                </a>
            </div>
        </div>
    </header>

    <!-- About Us -->
    <section class="py-20 px-6 max-w-6xl mx-auto ${formData.theme === 'dark' ? 'bg-slate-900' : 'bg-white'}">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div class="rounded-3xl overflow-hidden shadow-2xl h-[400px] transform hover:scale-[1.02] transition duration-500">
                 <img src="${formData.aboutImage}" alt="About" class="w-full h-full object-cover" />
            </div>
            <div>
                <h2 class="text-3xl font-bold mb-6 flex items-center gap-3 brand-text">
                   <i data-lucide="check-circle" class="w-8 h-8"></i> About Us
                </h2>
                <p class="opacity-80 leading-relaxed text-lg">${formData.aboutText}</p>
                <div class="mt-8 flex gap-8">
                    <div>
                        <p class="text-3xl font-bold brand-text">5k+</p>
                        <p class="text-sm opacity-60">Customers</p>
                    </div>
                    <div>
                        <p class="text-3xl font-bold brand-text">4.9</p>
                        <p class="text-sm opacity-60">Rating</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- MENU / ITEMS SECTION -->
    <section class="py-24 px-6 ${formData.theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold text-center mb-4">${sectionTitle}</h2>
            <div class="w-20 h-1 brand-bg mx-auto rounded-full mb-12"></div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                ${formData.items.map(item => `
                <div class="rounded-3xl overflow-hidden border ${formData.theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-white shadow-xl'} transition hover:-translate-y-2 duration-300 flex flex-col group h-full">
                    <div class="h-64 w-full overflow-hidden relative">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                    </div>
                    <div class="p-8 flex-1 flex flex-col">
                        <div class="flex justify-between items-start mb-3">
                             <h3 class="font-bold text-xl ${formData.theme === 'dark' ? 'text-white' : 'text-slate-900'}">${item.name}</h3>
                             <span class="brand-text font-bold text-lg">Rs. ${item.price}</span>
                        </div>
                        <p class="opacity-70 leading-relaxed mb-6 flex-1 text-sm">${item.desc}</p>
                        <a href="https://wa.me/${formData.whatsapp}?text=I want to ${whatsappVerb} ${item.name}" class="w-full brand-bg text-white py-3 rounded-xl font-bold brand-btn transition flex items-center justify-center gap-2">
                             ${buttonText}
                        </a>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
     ${formData.gallery.length > 0 ? `
    <section class="py-20 px-6 max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">Gallery</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            ${formData.gallery.map((img, i) => `
                <div class="rounded-2xl overflow-hidden h-64 shadow-md ${i === 0 ? 'md:col-span-2 md:h-full' : ''}">
                    <img src="${img}" class="w-full h-full object-cover hover:scale-105 transition duration-500"/>
                </div>
            `).join('')}
        </div>
    </section>` : ''}

    <!-- Testimonials -->
    <section class="py-20 px-6 ${formData.theme === 'dark' ? 'bg-slate-800' : 'bg-indigo-50'}">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-12">What Our Customers Say</h2>
            <div class="grid md:grid-cols-2 gap-6">
                ${formData.testimonials.map(t => `
                    <div class="p-8 rounded-3xl ${formData.theme === 'dark' ? 'bg-slate-900' : 'bg-white shadow-lg'} text-left">
                        <div class="flex text-yellow-400 mb-4 gap-1">
                            ${Array(5).fill(0).map((_, i) => `<i data-lucide="star" class="w-4 h-4 ${i < t.stars ? 'fill-current' : 'text-gray-300'}"></i>`).join('')}
                        </div>
                        <p class="italic opacity-80 mb-6 text-lg">"${t.comment}"</p>
                        <p class="font-bold brand-text">- ${t.name}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-16 px-6 ${formData.theme === 'dark' ? 'bg-black text-white' : 'bg-slate-900 text-white'} text-center">
        <div class="max-w-md mx-auto space-y-8">
            <h2 class="text-3xl font-bold brand-text">${formData.businessName}</h2>
            <div class="flex justify-center gap-6">
                ${formData.socials.facebook ? `<a href="${formData.socials.facebook}" class="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"><i data-lucide="facebook" class="w-6 h-6"></i></a>` : ''}
                ${formData.socials.instagram ? `<a href="${formData.socials.instagram}" class="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"><i data-lucide="instagram" class="w-6 h-6"></i></a>` : ''}
            </div>
            <div class="flex flex-col gap-4 text-sm font-medium pt-8">
                <div class="flex items-center justify-center gap-2 opacity-80">
                    <i data-lucide="map-pin" class="w-4 h-4"></i> <span>${formData.address}</span>
                </div>
                <div class="flex items-center justify-center gap-2 opacity-80">
                    <i data-lucide="phone" class="w-4 h-4"></i> <span>${formData.phone}</span>
                </div>
            </div>
            <p class="text-xs opacity-40 mt-12">&copy; 2025 ${formData.businessName}. Built with PocketAgency.</p>
        </div>
    </footer>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.businessName.replace(/\s+/g, '_')}_Pro.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col md:flex-row h-screen overflow-hidden">
      
      {/* Sidebar / Editor Panel */}
      <div className={`w-full md:w-1/2 lg:w-5/12 bg-white border-r border-gray-200 flex flex-col h-full ${activeTab === 'preview' ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-white z-20 shadow-sm">
          <div className="flex items-center gap-2">
            <Layout className="text-indigo-600" />
            <h1 className="font-bold text-xl tracking-tight">PocketAgency <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Ultimate</span></h1>
          </div>
          <button onClick={() => setActiveTab('preview')} className="md:hidden text-sm font-medium text-indigo-600 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-full">
            Preview <ExternalLink size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin bg-gray-50/50">
          
          {/* Quick Select & Custom Category */}
          <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
             <h2 className="text-xs uppercase tracking-wider text-indigo-800 font-bold flex items-center gap-2 mb-3">
              <Palette size={14} /> Auto-Fill Template
            </h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
                {Object.keys(CATEGORIES).map(catKey => (
                    <button key={catKey} onClick={() => applyCategory(catKey)} className={`text-sm py-2 px-3 rounded-lg border transition ${formData.category === catKey ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50'}`}>
                        {CATEGORIES[catKey].label}
                    </button>
                ))}
            </div>
            
            {/* Custom Category Toggle */}
            <button 
                onClick={() => setIsCustomMode(!isCustomMode)}
                className="w-full text-xs font-bold text-indigo-600 flex items-center justify-center gap-1 py-2 border border-dashed border-indigo-300 rounded-lg hover:bg-indigo-50"
            >
                <Plus size={12}/> Create Custom Business
            </button>

            {/* Custom Category Form */}
            {isCustomMode && (
                <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100 space-y-3 animate-in slide-in-from-top-2 fade-in">
                    <div>
                        <label className="text-xs font-bold text-indigo-800 block mb-1">Business Type Name</label>
                        <input 
                            placeholder="e.g. Car Wash, Bakery, Dentist" 
                            className="w-full p-2 text-sm border border-indigo-200 rounded-md focus:outline-indigo-500"
                            value={customInput.name}
                            onChange={(e) => setCustomInput(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-indigo-800 block mb-1">Selling Type</label>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setCustomInput(prev => ({ ...prev, type: 'service' }))}
                                className={`flex-1 py-1.5 text-xs rounded-md border ${customInput.type === 'service' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-indigo-200 text-indigo-600'}`}
                            >
                                Service (Booking)
                            </button>
                            <button 
                                onClick={() => setCustomInput(prev => ({ ...prev, type: 'product' }))}
                                className={`flex-1 py-1.5 text-xs rounded-md border ${customInput.type === 'product' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-indigo-200 text-indigo-600'}`}
                            >
                                Product (Order)
                            </button>
                        </div>
                    </div>
                    <button 
                        onClick={applyCustomCategory}
                        disabled={!customInput.name}
                        className="w-full bg-indigo-800 text-white py-2 rounded-md text-xs font-bold hover:bg-indigo-900 disabled:opacity-50"
                    >
                        Generate Template
                    </button>
                </div>
            )}
          </div>

          {/* Section: Identity */}
          <Section title="Brand Identity" icon={Type} defaultOpen={true}>
            <div className="space-y-4">
              <div>
                <label className="label">Business Name</label>
                <input name="businessName" value={formData.businessName} onChange={handleInputChange} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Theme Mode</label>
                    <select name="theme" value={formData.theme} onChange={handleInputChange} className="input-field">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    </select>
                  </div>
                   <div>
                    <label className="label">Brand Color</label>
                    <div className="flex items-center gap-2">
                        <input type="color" name="brandColor" value={formData.brandColor} onChange={handleInputChange} className="h-10 w-12 rounded cursor-pointer border border-gray-300 p-1" />
                        <span className="text-xs text-gray-500 font-mono">{formData.brandColor}</span>
                    </div>
                  </div>
              </div>
            </div>
          </Section>

          {/* Section: Hero */}
          <Section title="Hero Section" icon={ImageIcon}>
             <div className="space-y-4">
                <div>
                    <label className="label">Main Headline</label>
                    <input name="headline" value={formData.headline} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                    <label className="label">Sub-headline</label>
                    <textarea name="subheadline" value={formData.subheadline} onChange={handleInputChange} rows={2} className="input-field resize-none" />
                </div>
                <div>
                    <label className="label">Hero Image URL</label>
                    <input name="heroImage" value={formData.heroImage} onChange={handleInputChange} className="input-field font-mono text-xs" />
                </div>
                <div>
                    <label className="label">Button Text</label>
                    <input name="ctaText" value={formData.ctaText} onChange={handleInputChange} className="input-field" />
                </div>
             </div>
          </Section>

          {/* Section: Items */}
          <Section title={formData.businessType === 'service' ? 'Services / Plans' : 'Products / Menu'} icon={ShoppingBag}>
            <div className="space-y-4">
              {formData.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm relative group space-y-2">
                   <button onClick={() => removeItemFromArray('items', idx)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500"><Trash2 size={14}/></button>
                   <div className="flex gap-2">
                       <input value={item.name} onChange={(e) => handleArrayChange('items', idx, 'name', e.target.value)} placeholder="Item Name" className="input-field flex-1" />
                       <input value={item.price} onChange={(e) => handleArrayChange('items', idx, 'price', e.target.value)} placeholder="Price" className="input-field w-20" />
                   </div>
                   <input value={item.desc} onChange={(e) => handleArrayChange('items', idx, 'desc', e.target.value)} placeholder="Description" className="input-field" />
                   <input value={item.image} onChange={(e) => handleArrayChange('items', idx, 'image', e.target.value)} placeholder="Image URL" className="input-field font-mono text-xs" />
                </div>
              ))}
              <button onClick={() => addItemToArray('items', { name: '', price: '', desc: '', image: '' })} className="add-btn"><Plus size={14}/> Add Item</button>
            </div>
          </Section>

          {/* Section: Gallery */}
          <Section title="Photo Gallery" icon={Grid}>
             <div className="space-y-3">
                 {formData.gallery.map((img, idx) => (
                     <div key={idx} className="flex gap-2">
                         <input value={img} onChange={(e) => handleArrayChange('gallery', idx, null, e.target.value)} className="input-field font-mono text-xs flex-1" />
                         <button onClick={() => removeItemFromArray('gallery', idx)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                     </div>
                 ))}
                 <button onClick={() => addItemToArray('gallery', '')} className="add-btn"><Plus size={14}/> Add Image</button>
             </div>
          </Section>

          {/* Section: Testimonials */}
          <Section title="Testimonials" icon={Star}>
             <div className="space-y-4">
                 {formData.testimonials.map((t, idx) => (
                     <div key={idx} className="p-3 bg-white border rounded-lg relative">
                         <button onClick={() => removeItemFromArray('testimonials', idx)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500"><Trash2 size={14}/></button>
                         <div className="flex gap-2 mb-2">
                            <input value={t.name} onChange={(e) => handleArrayChange('testimonials', idx, 'name', e.target.value)} placeholder="Customer Name" className="input-field flex-1" />
                            <input type="number" max={5} value={t.stars} onChange={(e) => handleArrayChange('testimonials', idx, 'stars', e.target.value)} placeholder="5" className="input-field w-16" />
                         </div>
                         <textarea value={t.comment} onChange={(e) => handleArrayChange('testimonials', idx, 'comment', e.target.value)} placeholder="Review..." className="input-field resize-none" rows={2} />
                     </div>
                 ))}
                 <button onClick={() => addItemToArray('testimonials', { name: '', comment: '', stars: 5 })} className="add-btn"><Plus size={14}/> Add Review</button>
             </div>
          </Section>

          {/* Section: Contact */}
          <Section title="Contact Info" icon={Smartphone}>
            <div className="grid gap-4">
               <div><label className="label">WhatsApp (No +)</label><input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="input-field" /></div>
               <div><label className="label">Phone</label><input name="phone" value={formData.phone} onChange={handleInputChange} className="input-field" /></div>
               <div><label className="label">Address</label><input name="address" value={formData.address} onChange={handleInputChange} className="input-field" /></div>
               <div className="grid grid-cols-2 gap-4">
                   <div><label className="label">Facebook URL</label><input value={formData.socials.facebook} onChange={(e) => handleSocialChange('facebook', e.target.value)} className="input-field text-xs" /></div>
                   <div><label className="label">Instagram URL</label><input value={formData.socials.instagram} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="input-field text-xs" /></div>
               </div>
            </div>
          </Section>

        </div>

        <div className="p-5 border-t border-gray-200 bg-white">
          <button onClick={generateCode} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition flex items-center justify-center gap-2 transform active:scale-95">
            <Download size={20} /> Export Professional Website
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className={`w-full md:w-1/2 lg:w-7/12 bg-slate-100 flex items-center justify-center p-4 md:p-8 relative ${activeTab === 'editor' ? 'hidden md:flex' : 'flex'}`}>
        <button onClick={() => setActiveTab('editor')} className="absolute top-4 left-4 md:hidden bg-white p-2 rounded-full shadow-lg z-20"><X size={20} /></button>
        <div className="relative h-[720px] w-[360px] bg-slate-900 rounded-[3rem] shadow-2xl border-[8px] border-slate-900 overflow-hidden ring-4 ring-slate-200">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-7 w-32 bg-slate-900 rounded-b-xl z-30"></div>
          <div className="h-full w-full bg-white overflow-hidden scrollbar-hide">
             <ClientWebsitePreview data={formData} />
          </div>
        </div>
      </div>

      <style>{`
        .input-field { width: 100%; padding: 0.5rem; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem; font-size: 0.875rem; outline: none; transition: all; }
        .input-field:focus { background-color: white; border-color: #6366f1; ring: 2px solid #e0e7ff; }
        .label { display: block; font-size: 0.75rem; font-weight: 700; color: #6b7280; margin-bottom: 0.25rem; text-transform: uppercase; }
        .add-btn { width: 100%; padding: 0.5rem; border: 1px dashed #cbd5e1; border-radius: 0.5rem; color: #64748b; font-size: 0.875rem; display: flex; align-items: center; justify-content: center; gap: 0.25rem; transition: all; }
        .add-btn:hover { background-color: #f1f5f9; color: #475569; border-color: #94a3b8; }
      `}</style>
    </div>
  );
}