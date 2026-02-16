import React, { useState, useEffect, useRef } from 'react';

interface CatalogProps {
  onNavigateHome: () => void;
  onNavigateToCart?: () => void;
  cartCount?: number;
  onAddToCart?: (quantity: number) => void;
}

interface Product {
  id: number;
  brand: string;
  title: string;
  price: number;
  unitPriceText: string;
  moq: string;
  shipping: string;
  badges: Array<{ text: string; color: string; bg: string }>;
  image: string;
  type: string;
  shippingIcon: string;
  description?: string;
}

const products: Product[] = [
  {
    id: 1,
    brand: "Sky Blue Essentials",
    title: "Blue Raspberry Rock Candy",
    price: 45.00,
    type: "Case",
    unitPriceText: "$0.45 per unit (100 units/case)",
    moq: "10 Cases",
    shipping: "Ships 24h",
    shippingIcon: "local_shipping",
    description: "Premium blue raspberry flavored rock candy strings. Perfect for candy buffets, party favors, and high-end retail displays. Made with pure cane sugar and natural flavorings.",
    badges: [
      { text: "IN STOCK", bg: "bg-green-100", color: "text-green-700" },
      { text: "BESTSELLER", bg: "bg-primary", color: "text-white" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlOtbuxazz6j7gVdcqNV5MX8afhj0IK61ghyPsW0tfIOc59IKy6hrrPruX1gKyiujIiaaPiLwnWDQFWd16sop2xx1gtVJBDy2tekyefcEUVlGmFG78Uy7ZyGng2ILoUE5S2Y5lwf2cSVouUWRcjc11-5Nmp1T9tLEKiFK3OUl5icD9bGm8pvTOBKhfP-fefKzIdGFa_bhcDVygXUwVz_LsmtXXdYFMYusKNP_9hnUlrgR0wv2pL-5ORwSpv5Zq5fI9IfRaKOnkP0c"
  },
  {
    id: 2,
    brand: "Artisanal Crunch",
    title: "Roasted Salted Almonds",
    price: 128.50,
    type: "Case",
    unitPriceText: "$5.35 per bag (24 bags/case)",
    moq: "5 Cases",
    shipping: "Organic",
    shippingIcon: "eco",
    description: "Slow-roasted almonds lightly dusted with sea salt. Packaged in resealable retail-ready bags. Sourced from certified organic orchards in California.",
    badges: [
      { text: "LIMITED STOCK", bg: "bg-orange-100", color: "text-orange-800" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDJ4P1k1CqcALlj2aozwBmFsg_k9G-FviRj3mJgCeBjSCFv0411KyTVzi_3vGuTV4hDjUQe29N11f0d_Nkyub18oojaZxxgkQ3_RkMWqZEpZXqAKI6E_ot5fdb1OjyGP25-LKVmzICOzNVY21HhrQt-sX_iz-j1rTRVaEyoiyIk6dZVGDzpRGYElwiRWbKNGCwtSkiOsVGXNPiJgXzZo0K0AOk9ABRkw6cL69L9FJavgqOEFKO8-iNpuVbXA0moe7vmCSOngS3yiw"
  },
  {
    id: 3,
    brand: "Vintage Sweets Co.",
    title: "Classic Cream Soda Pack",
    price: 32.20,
    type: "Case",
    unitPriceText: "$1.34 per bottle (24 bottles/case)",
    moq: "20 Cases",
    shipping: "Glass Bottles",
    shippingIcon: "wine_bar",
    description: "Old-fashioned vanilla cream soda in classic glass bottles. Made with real cane sugar and natural vanilla bean extract for a nostalgic taste.",
    badges: [
      { text: "NEW ARRIVAL", bg: "bg-white border border-slate-200", color: "text-slate-700" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2Y9VCMAYqrfdwL319_PJ01D597nh642tdmUHxuoprAtHQafCJwDdxIM3v0aiIEAymLIVAmhXz4CWmYs_kJZKxHIaDGqBAj8cmLHHqcsHWA_hlTZ9tT1xbAsTj-6wFpUc45i4c4bOWQSwug9gbkYa6g8Ia-zsUKYKozs0XrZrbXlPOUAfGznmGYvY1roGRhJAeDzInK5b7UV71QPal6EW4PtUkj5d1JSHNd_3OPoXEz65jyLkO-OrxEetAWER8igY3Zsdg02SxRqY"
  },
  {
    id: 4,
    brand: "Global Treats Ltd.",
    title: "Jumbo Gummy Bear 5lb Bag",
    price: 18.75,
    type: "Unit",
    unitPriceText: "$75.00 per case (4 units/case)",
    moq: "25 Cases",
    shipping: "Pre-Order",
    shippingIcon: "schedule",
    description: "Giant 5lb bag of assorted fruit gummy bears. Ideal for bulk bins and repackaging. Flavors include cherry, lime, lemon, orange, and pineapple.",
    badges: [],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlOtbuxazz6j7gVdcqNV5MX8afhj0IK61ghyPsW0tfIOc59IKy6hrrPruX1gKyiujIiaaPiLwnWDQFWd16sop2xx1gtVJBDy2tekyefcEUVlGmFG78Uy7ZyGng2ILoUE5S2Y5lwf2cSVouUWRcjc11-5Nmp1T9tLEKiFK3OUl5icD9bGm8pvTOBKhfP-fefKzIdGFa_bhcDVygXUwVz_LsmtXXdYFMYusKNP_9hnUlrgR0wv2pL-5ORwSpv5Zq5fI9IfRaKOnkP0c"
  },
  {
    id: 5,
    brand: "Sky Blue Essentials",
    title: "Sea Salt Dark Chocolate...",
    price: 84.00,
    type: "Case",
    unitPriceText: "$7.00 per slab (12 slabs/case)",
    moq: "8 Cases",
    shipping: "Temperature Ctl",
    shippingIcon: "thermostat",
    description: "72% cacao dark chocolate slabs sprinkled with hand-harvested sea salt. Requires temperature controlled shipping during summer months.",
    badges: [],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEYU1Z3F4wTXA-SIf3ITi5DsrUif13h3hJIJw-39DlhOOJ4pDowQLWcA9Igj8RtYC5JQaxGltiA4n3kQz3qsYw4u4mzbfh1jblW2w0Feg9gLX21w-CQUh4TXZ8Vbk83cURPuHfQl4Xr_KnC8jgo_xBpvn7CXZ2Oya6qaJV02vrlYlJWlf90v68W1hfgjg1DVgRL5RFmg5jRmsV-v8B-eD23Doy5E_2eE1wPYID_RxXErO9ckUdAJLfSJwt_NbnaoUAVs92hc0b-G4"
  },
  {
    id: 6,
    brand: "Global Treats Ltd.",
    title: "Assorted Fruit Hard Candies",
    price: 120.00,
    type: "Bulk Box",
    unitPriceText: "$0.05 per unit (approx. 2400 units)",
    moq: "2 Boxes",
    shipping: "Certified",
    shippingIcon: "verified_user",
    description: "Classic individually wrapped hard candies in assorted fruit flavors. Perfect for hospitality, banks, and offices.",
    badges: [],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApCK91c23hYJEuSdNiPmFJccSLscxgd-OMs2o09CmzRQlk-jOqZR34DxRK6kNFXcP1c2Hxa9UMVN1tZJX-Qq9_9paBJAfmgs-at1PlH1LrJP3o-2FtSDBHN9u6bVbMYuOYfisPo10Br3Y-iEunzHRRNkiDizxt4kMuq6v_8oRucb1vdXDsn34fwss7Tj4FEpHsQ3rQAAkRweSz2qNK45WGqOHSSKzGRHGQB6-ljPtZYzsalOyCEby0kh4wowUaji40Ovwvjhse2ZM"
  }
];

const Catalog: React.FC<CatalogProps> = ({ onNavigateHome, onNavigateToCart, cartCount = 0, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState("Snacks");
  const [isGridView, setIsGridView] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [animateCart, setAnimateCart] = useState(false);
  
  // State for quantities per product
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  // State for wishlist
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  // Quick View Zoom State
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const getQuantity = (id: number) => quantities[id] || 1;

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const newValue = Math.max(1, current + delta);
      return { ...prev, [id]: newValue };
    });
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddToCart = (id: number) => {
    if (onAddToCart) {
      onAddToCart(getQuantity(id));
      setAddedItems(prev => [...prev, id]);
      setTimeout(() => {
        setAddedItems(prev => prev.filter(itemId => itemId !== id));
      }, 2000);
    }
  };

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-background-dark">
      {/* App Specific Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 gap-8">
          <div className="flex items-center gap-12">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={onNavigateHome}
            >
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <span className="material-symbols-outlined block">bakery_dining</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Sky Confectionery
              </h2>
            </div>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                search
              </span>
              <input 
                type="text"
                placeholder="Search bulk inventory..."
                className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 border-2 focus:border-primary rounded-xl py-3 pl-12 pr-4 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">bolt</span>
              Quick Order
            </button>
            <button 
              onClick={onNavigateToCart}
              className={`relative p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-all ${animateCart ? 'scale-110 text-primary' : ''}`}
            >
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-in zoom-in duration-200">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex items-center gap-3 pl-2">
              <button className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 p-1">
                <span className="material-symbols-outlined text-slate-400">menu</span>
              </button>
              <img 
                src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" 
                alt="User" 
                className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] w-full px-6 py-8 flex items-start gap-8 relative">
        
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24" style={{ height: 'fit-content' }}>
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Categories</h3>
            <div className="flex flex-col gap-1">
              {['Snacks', 'Beverages', 'Staples', 'Candy'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                    activeCategory === cat 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`material-symbols-outlined text-lg ${activeCategory === cat ? 'fill-1' : ''}`}>
                    {cat === 'Snacks' ? 'cookie' : cat === 'Beverages' ? 'local_cafe' : cat === 'Staples' ? 'inventory_2' : 'icecream'}
                  </span>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Price Per Case</h3>
            <div className="px-2">
              <input type="range" className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
              <div className="flex justify-between mt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span>$10</span>
                <span>$500+</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Premium Brands</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Sky Blue Essentials', checked: true },
                { name: 'Vintage Sweets Co.', checked: false },
                { name: 'Global Treats Ltd.', checked: false },
                { name: 'Artisanal Crunch', checked: false },
              ].map((brand, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${brand.checked ? 'bg-primary border-primary' : 'border-slate-300 bg-white group-hover:border-primary'}`}>
                    {brand.checked && <span className="material-symbols-outlined text-white text-sm">check</span>}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium group-hover:text-primary transition-colors">
                    {brand.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
            <h4 className="text-primary font-bold mb-2">Partner Benefits</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Get an extra 5% off on orders above 100 cases.
            </p>
            <button className="w-full bg-primary text-white text-xs font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors">
              Learn More
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumbs & Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
              <span 
                className="hover:text-primary cursor-pointer"
                onClick={onNavigateHome}
              >
                Home
              </span>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span>Wholesale Catalog</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                  Snacks & Confectionery
                </h1>
                <span className="text-slate-400 font-semibold text-lg">(428 Items)</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                  <button 
                    onClick={() => setIsGridView(true)}
                    className={`p-1.5 rounded transition-colors ${isGridView ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                  >
                    <span className="material-symbols-outlined text-xl block">grid_view</span>
                  </button>
                  <button 
                    onClick={() => setIsGridView(false)}
                    className={`p-1.5 rounded transition-colors ${!isGridView ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                  >
                    <span className="material-symbols-outlined text-xl block">view_list</span>
                  </button>
                </div>
                
                <div className="relative">
                  <select className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 pl-4 pr-10 text-sm font-bold text-slate-700 dark:text-slate-200 focus:border-primary outline-none cursor-pointer">
                    <option>Sort by Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid / List */}
          <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12" : "flex flex-col gap-4 mb-12"}>
            {products.map((product) => (
              <div 
                key={product.id}
                className={`group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-xl hover:border-primary/30 transition-all duration-300 ${!isGridView ? 'flex flex-row gap-6 items-start' : ''}`}
              >
                {/* Image Area */}
                <div className={`relative rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 ${isGridView ? 'aspect-[4/3] mb-4' : 'w-48 h-48'}`}>
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.badges.map((badge, i) => (
                      <span 
                        key={i} 
                        className={`text-[10px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-wider ${badge.bg} ${badge.color}`}
                      >
                        {badge.text}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-900/90 rounded-full text-slate-400 hover:text-red-500 transition-colors z-10"
                  >
                    <span className={`material-symbols-outlined text-lg block ${wishlist.has(product.id) ? 'fill-current text-red-500' : ''} ${wishlist.has(product.id) ? 'font-variation-FILL-1' : ''}`}>
                        favorite
                    </span>
                  </button>
                  
                  {/* Quick View Button Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center">
                     <button 
                        onClick={() => { setQuickViewProduct(product); setIsZoomed(false); }}
                        className="bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                     >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        Quick View
                     </button>
                  </div>
                </div>

                {/* Content */}
                <div className={!isGridView ? 'flex-1 py-2' : ''}>
                  <div className="text-xs font-semibold text-slate-500 mb-1">{product.brand}</div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-3">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-black text-primary">${product.price.toFixed(2)}</span>
                    <span className="text-sm font-medium text-slate-400">/ {product.type}</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-4">{product.unitPriceText}</div>
                  
                  {!isGridView && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {product.description || "High quality product suitable for retail and bulk purchase."}
                      </p>
                  )}

                  <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-base">inventory_2</span>
                      MOQ: {product.moq}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-base">{product.shippingIcon}</span>
                      {product.shipping}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-lg p-1 border border-slate-100 dark:border-slate-800">
                        <button 
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="font-bold text-slate-900 dark:text-white w-8 text-center">{getQuantity(product.id)}</span>
                        <button 
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button 
                        onClick={() => handleAddToCart(product.id)}
                        className={`flex-1 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95 text-sm ${
                            addedItems.includes(product.id) 
                            ? "bg-green-600 text-white hover:bg-green-700" 
                            : "bg-primary text-white hover:bg-primary/90"
                        }`}
                        >
                            {addedItems.includes(product.id) ? (
                            <>
                                <span className="material-symbols-outlined text-lg">check</span>
                                Added!
                            </>
                            ) : (
                            <>
                                <span className="material-symbols-outlined text-lg">shopping_cart</span>
                                Add ${(product.price * getQuantity(product.id)).toFixed(2)}
                            </>
                            )}
                        </button>
                        {!isGridView && (
                            <button 
                                onClick={() => { setQuickViewProduct(product); setIsZoomed(false); }}
                                className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl text-slate-600 dark:text-slate-400">visibility</span>
                            </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">3</button>
            <span className="text-slate-400 px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">18</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            <div className="ml-6 text-sm text-slate-500 font-medium">
              Showing 1-12 of 428 products
            </div>
          </div>
        </main>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setQuickViewProduct(null)}></div>
           
           {/* Modal Content */}
           <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-slate-900/80 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                  <span className="material-symbols-outlined text-slate-500">close</span>
              </button>

              <div className="w-full md:w-1/2 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center overflow-hidden group">
                  <div 
                    ref={imageRef}
                    className="w-full h-full flex items-center justify-center cursor-zoom-in relative"
                    onClick={() => setIsZoomed(!isZoomed)}
                    onMouseMove={handleZoomMove}
                    onMouseLeave={() => setIsZoomed(false)}
                    style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
                  >
                      <img 
                        src={quickViewProduct.image} 
                        alt={quickViewProduct.title} 
                        className="max-h-[60vh] object-contain drop-shadow-xl transition-transform duration-200 ease-out"
                        style={{
                            transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                        }}
                      />
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-50 text-xs text-slate-500">
                    {isZoomed ? "Click to zoom out" : "Click image to zoom details"}
                  </div>
              </div>

              <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                 <div className="mb-6">
                    <div className="text-sm font-bold text-primary mb-2">{quickViewProduct.brand}</div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight">{quickViewProduct.title}</h2>
                    <div className="flex gap-2 mb-4">
                        {quickViewProduct.badges.map((badge, i) => (
                           <span key={i} className={`text-[10px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-wider ${badge.bg} ${badge.color}`}>
                              {badge.text}
                           </span>
                        ))}
                    </div>
                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                        ${quickViewProduct.price.toFixed(2)}
                        <span className="text-lg text-slate-500 font-medium ml-2">/ {quickViewProduct.type}</span>
                    </div>
                    <div className="text-sm text-slate-500">{quickViewProduct.unitPriceText}</div>
                 </div>

                 <div className="prose prose-sm prose-slate dark:prose-invert mb-8">
                    <p>{quickViewProduct.description || "This premium bulk item is available for immediate shipment. Perfect for retail displays and repackaging opportunities."}</p>
                 </div>

                 <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">MOQ</div>
                        <div className="font-bold text-slate-900 dark:text-white">{quickViewProduct.moq}</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Shipping</div>
                        <div className="font-bold text-slate-900 dark:text-white">{quickViewProduct.shipping}</div>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                        <button 
                            onClick={() => updateQuantity(quickViewProduct.id, -1)}
                            className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="px-2 font-bold min-w-[30px] text-center">{getQuantity(quickViewProduct.id)}</span>
                        <button 
                            onClick={() => updateQuantity(quickViewProduct.id, 1)}
                            className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(quickViewProduct.id)}
                      className={`flex-1 font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-95 ${
                         addedItems.includes(quickViewProduct.id) 
                         ? "bg-green-600 text-white hover:bg-green-700" 
                         : "bg-primary text-white hover:bg-primary/90"
                      }`}
                    >
                        {addedItems.includes(quickViewProduct.id) ? (
                          <>
                            <span className="material-symbols-outlined">check</span>
                            Added!
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined">add_shopping_cart</span>
                            Add Order (${(quickViewProduct.price * getQuantity(quickViewProduct.id)).toFixed(2)})
                          </>
                        )}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;