
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Product } from '../types';

interface CatalogProps {
  onNavigateHome: () => void;
  onNavigateToCart?: () => void;
  cartCount?: number;
  onAddToCart?: (product: Product, quantity: number) => void;
  products: Product[];
}

const Catalog: React.FC<CatalogProps> = ({ onNavigateHome, onNavigateToCart, cartCount = 0, onAddToCart, products }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isGridView, setIsGridView] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [animateCart, setAnimateCart] = useState(false);
  
  // Mobile Sidebar State
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Filters State
  // Calculate max price dynamically to ensure added products are visible
  const maxProductPrice = useMemo(() => {
    return products.length > 0 ? Math.ceil(Math.max(...products.map(p => p.price))) : 500;
  }, [products]);

  // Initialize with a large range to ensure visibility of most products by default
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]); 
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Popularity");

  // Quick Order State
  const [quickOrderInput, setQuickOrderInput] = useState("");

  // Quantities per product
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  // Quick View Zoom State
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Derived Data for Filters
  const allBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products]);
  const allTypes = useMemo(() => Array.from(new Set(products.map(p => p.type))), [products]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== "All") {
       // Mock category filtering logic. 
       if (activeCategory === "Snacks") result = result.filter(p => p.type === "Box" || p.type === "Bag");
       if (activeCategory === "Beverages") result = result.filter(p => p.type === "Case" && p.shippingIcon === "wine_bar");
       if (activeCategory === "Candy") result = result.filter(p => p.title.toLowerCase().includes("candy") || p.description?.toLowerCase().includes("candy"));
    }

    // Improved Search: Token-based matching
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const tokens = q.split(/\s+/).filter(t => t.length > 0);
        result = result.filter(p => {
            const searchString = `${p.title} ${p.brand} ${p.description || ''} ${p.id}`.toLowerCase();
            return tokens.every(token => searchString.includes(token));
        });
    }

    if (selectedBrands.length > 0) {
        result = result.filter(p => selectedBrands.includes(p.brand));
    }
    
    if (selectedTypes.length > 0) {
        result = result.filter(p => selectedTypes.includes(p.type));
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    if (sortBy === "Price: Low to High") {
        result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
        result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "Newest Arrivals") {
        result = [...result].sort((a, b) => b.id - a.id);
    } else if (sortBy === "Alphabetical: A-Z") {
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Alphabetical: Z-A") {
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [products, activeCategory, searchQuery, selectedBrands, selectedTypes, priceRange, sortBy]);


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

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product, getQuantity(product.id));
      setAddedItems(prev => [...prev, product.id]);
      setTimeout(() => {
        setAddedItems(prev => prev.filter(itemId => itemId !== product.id));
      }, 2000);
    }
  };

  const handleQuickOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow searching by ID or exact title match
    const found = products.find(p => p.id.toString() === quickOrderInput || p.title.toLowerCase() === quickOrderInput.toLowerCase());
    
    if (found) {
        handleAddToCart(found);
        setQuickOrderInput("");
        alert(`Successfully added ${found.title} to your cart.`);
    } else {
        alert("Product not found. Please check the Product ID and try again.");
    }
  };

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    imageRef.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  const toggleBrand = (brand: string) => {
      setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const toggleType = (type: string) => {
      setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-background-dark">
      {/* App Specific Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex h-auto lg:h-20 max-w-[1600px] flex-col lg:flex-row items-center justify-between px-6 py-4 lg:py-0 gap-4 lg:gap-8">
          <div className="flex w-full lg:w-auto items-center justify-between gap-12">
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
            {/* Mobile Filter Toggle */}
            <button 
                onClick={() => setShowMobileSidebar(true)}
                className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
                <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>

          <div className="flex-1 max-w-2xl w-full">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                search
              </span>
              <input 
                type="text"
                placeholder="Search by name, brand, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 border-2 focus:border-primary rounded-xl py-3 pl-12 pr-4 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex w-full lg:w-auto items-center justify-between lg:justify-end gap-6">
            <form onSubmit={handleQuickOrder} className="hidden md:flex items-center gap-2 relative group">
                 <input 
                    type="text" 
                    placeholder="Quick ID #"
                    value={quickOrderInput}
                    onChange={(e) => setQuickOrderInput(e.target.value)}
                    className="w-32 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-primary focus:w-40 transition-all"
                 />
                 <button type="submit" className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 shadow-sm active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-sm block">add</span>
                 </button>
                 <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 text-xs p-2 rounded shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity z-20">
                    Enter a Product ID to quickly add it to your cart.
                 </div>
            </form>

            <div className="flex items-center gap-4">
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
                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 hidden lg:block"></div>
                <div className="hidden lg:flex items-center gap-3 pl-2">
                <img 
                    src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" 
                    alt="User" 
                    className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200"
                />
                </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] w-full px-6 py-8 flex items-start gap-8 relative">
        
        {/* Sidebar Overlay for Mobile with Animation */}
        {showMobileSidebar && (
            <div className="fixed inset-0 z-[100] lg:hidden">
                <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" 
                    onClick={() => setShowMobileSidebar(false)}
                ></div>
                <div 
                    className="absolute inset-y-0 left-0 w-80 bg-white dark:bg-slate-900 shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-left duration-300 scroll-smooth"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Filters</h2>
                        <button onClick={() => setShowMobileSidebar(false)} className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    {/* Mobile Quick Order */}
                    <form onSubmit={handleQuickOrder} className="flex items-center gap-2 mb-6">
                         <input 
                            type="text" 
                            placeholder="Quick Order ID #"
                            value={quickOrderInput}
                            onChange={(e) => setQuickOrderInput(e.target.value)}
                            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-primary"
                         />
                         <button type="submit" className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90">
                            <span className="material-symbols-outlined text-sm block">add</span>
                         </button>
                    </form>
                    <hr className="border-slate-100 dark:border-slate-800 mb-6" />
                    <SidebarContent 
                        activeCategory={activeCategory} 
                        setActiveCategory={setActiveCategory}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        maxPrice={Math.max(500, maxProductPrice)}
                        allBrands={allBrands}
                        selectedBrands={selectedBrands}
                        toggleBrand={toggleBrand}
                        allTypes={allTypes}
                        selectedTypes={selectedTypes}
                        toggleType={toggleType}
                    />
                </div>
            </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24" style={{ height: 'fit-content' }}>
            <SidebarContent 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxPrice={Math.max(500, maxProductPrice)}
                allBrands={allBrands}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                allTypes={allTypes}
                selectedTypes={selectedTypes}
                toggleType={toggleType}
            />
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
                  {activeCategory === "All" ? "All Products" : activeCategory}
                </h1>
                <span className="text-slate-400 font-semibold text-lg">({filteredProducts.length} Items)</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
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
                
                <div className="relative min-w-[200px]">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 pl-4 pr-10 text-sm font-bold text-slate-700 dark:text-slate-200 focus:border-primary outline-none cursor-pointer w-full"
                  >
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                    <option>Alphabetical: A-Z</option>
                    <option>Alphabetical: Z-A</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid / List */}
          {filteredProducts.length === 0 ? (
             <div className="text-center py-20 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-300">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search_off</span>
                <p className="text-lg font-bold text-slate-500">No products found matching your filters.</p>
                <button 
                    onClick={() => { setSearchQuery(""); setSelectedBrands([]); setSelectedTypes([]); setPriceRange([0, Math.max(500, maxProductPrice)]); setActiveCategory("All"); }}
                    className="mt-4 text-primary font-bold hover:underline"
                >
                    Clear all filters
                </button>
             </div>
          ) : (
          <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12" : "flex flex-col gap-4 mb-12"}>
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className={`group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-xl hover:border-primary/30 transition-all duration-300 ${!isGridView ? 'flex flex-col sm:flex-row gap-6 items-start' : ''}`}
              >
                {/* Image Area */}
                <div className={`relative rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 ${isGridView ? 'aspect-[4/3] mb-4' : 'w-full sm:w-48 h-48 mb-4 sm:mb-0'}`}>
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
                <div className={!isGridView ? 'flex-1 py-2 w-full' : ''}>
                  <div className="flex justify-between items-start">
                    <div className="text-xs font-semibold text-slate-500 mb-1">{product.brand}</div>
                    <div className="text-[10px] text-slate-400">ID: {product.id}</div>
                  </div>
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
                        onClick={() => handleAddToCart(product)}
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
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">3</button>
            <span className="text-slate-400 px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          )}
        </main>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setQuickViewProduct(null)}></div>
           
           {/* Modal Content */}
           <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in duration-300">
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-slate-900/80 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                  <span className="material-symbols-outlined text-slate-500">close</span>
              </button>

              <div className="w-full md:w-1/2 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center overflow-hidden group">
                  <div 
                    ref={imageRef}
                    className="w-full h-full cursor-zoom-in relative overflow-hidden"
                    onClick={() => setIsZoomed(!isZoomed)}
                    onMouseMove={handleZoomMove}
                    onMouseLeave={() => setIsZoomed(false)}
                    style={{ 
                        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                        backgroundImage: `url(${quickViewProduct.image})`,
                        backgroundPosition: 'center',
                        backgroundSize: isZoomed ? '200%' : 'contain',
                        backgroundRepeat: 'no-repeat'
                    }}
                  >
                      {!isZoomed && <img 
                        src={quickViewProduct.image} 
                        alt={quickViewProduct.title} 
                        className="w-full h-full object-contain p-8 pointer-events-none"
                      />}
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-50 text-xs text-slate-500">
                    {isZoomed ? "Click to zoom out" : "Click image to zoom details"}
                  </div>
              </div>

              <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                 <div className="mb-6">
                    <div className="flex justify-between items-start">
                        <div className="text-sm font-bold text-primary mb-2">{quickViewProduct.brand}</div>
                        <div className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">ID: {quickViewProduct.id}</div>
                    </div>
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
                      onClick={() => handleAddToCart(quickViewProduct)}
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

// Extracted Sidebar Content to avoid duplication
const SidebarContent = ({ 
    activeCategory, 
    setActiveCategory, 
    priceRange, 
    setPriceRange,
    maxPrice,
    allBrands,
    selectedBrands,
    toggleBrand,
    allTypes,
    selectedTypes,
    toggleType
}: any) => (
    <>
        <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Categories</h3>
            <div className="flex flex-col gap-1">
                {['All', 'Snacks', 'Beverages', 'Staples', 'Candy'].map((cat) => (
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
                    {cat === 'All' ? 'apps' : cat === 'Snacks' ? 'cookie' : cat === 'Beverages' ? 'local_cafe' : cat === 'Staples' ? 'inventory_2' : 'icecream'}
                    </span>
                    {cat}
                </button>
                ))}
            </div>
        </div>

        <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Price Range</h3>
            <div className="px-2">
                <input 
                    type="range" 
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between mt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
                </div>
            </div>
        </div>

        <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Filter by Brand</h3>
            <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {allBrands.map((brand: string) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                        onClick={() => toggleBrand(brand)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${selectedBrands.includes(brand) ? 'bg-primary border-primary' : 'border-slate-300 bg-white group-hover:border-primary'}`}
                    >
                    {selectedBrands.includes(brand) && <span className="material-symbols-outlined text-white text-sm">check</span>}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium group-hover:text-primary transition-colors">
                    {brand}
                    </span>
                </label>
                ))}
            </div>
        </div>
        
        <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Product Type</h3>
            <div className="flex flex-col gap-3">
                {allTypes.map((type: string) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                        onClick={() => toggleType(type)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${selectedTypes.includes(type) ? 'bg-primary border-primary' : 'border-slate-300 bg-white group-hover:border-primary'}`}
                    >
                    {selectedTypes.includes(type) && <span className="material-symbols-outlined text-white text-sm">check</span>}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium group-hover:text-primary transition-colors">
                    {type}
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
    </>
);

export default Catalog;
