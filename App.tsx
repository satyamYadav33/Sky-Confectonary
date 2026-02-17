
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import FeaturedProducts from './components/FeaturedProducts';
import TrustSection from './components/TrustSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import OrderTracking from './components/OrderTracking';
import Support from './components/Support';
import Login from './components/Login';
import Admin from './components/Admin';
import SplashScreen from './components/SplashScreen';
import { Product, CartItem } from './types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    brand: "Sky Blue Essentials",
    title: "Blue Raspberry Rock Candy",
    price: 45.00,
    basePrice: 45.00,
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
    customBadges: [
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
    basePrice: 128.50,
    type: "Case",
    unitPriceText: "$5.35 per bag (24 bags/case)",
    moq: "5 Cases",
    shipping: "Organic",
    shippingIcon: "eco",
    description: "Slow-roasted almonds lightly dusted with sea salt. Packaged in resealable retail-ready bags. Sourced from certified organic orchards in California.",
    badges: [
      { text: "LIMITED STOCK", bg: "bg-orange-100", color: "text-orange-800" }
    ],
    customBadges: [
      { text: "LIMITED STOCK", bg: "bg-orange-100", color: "text-orange-800" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDJ4P1k1CqcALlj2aozwBmFsg_k9G-FviRj3mJgCeBjSCFv0411KyTVzi_3vGuTV4hDjUQe29N11f0d_Nkyub18oojaZxxgkQ3_RkMWqZEpZXqAKI6E_ot5fdb1OjyGP25-LKVmzICOzNVY21HhrQt-sX_iz-j1rTRVaEyoiyIk6dZVGDzpRGYElwiRWbKNGCwtSkiOsVGXNPiJgXzZo0K0AOk9ABRkw6cL69L9FJavgqOEFKO8-iNpuVbXA0moe7vmCSOngS3yiw"
  },
  {
    id: 3,
    brand: "Vintage Sweets Co.",
    title: "Classic Cream Soda Pack",
    price: 32.20,
    basePrice: 32.20,
    type: "Case",
    unitPriceText: "$1.34 per bottle (24 bottles/case)",
    moq: "20 Cases",
    shipping: "Glass Bottles",
    shippingIcon: "wine_bar",
    description: "Old-fashioned vanilla cream soda in classic glass bottles. Made with real cane sugar and natural vanilla bean extract for a nostalgic taste.",
    badges: [
      { text: "NEW ARRIVAL", bg: "bg-white border border-slate-200", color: "text-slate-700" }
    ],
    customBadges: [
      { text: "NEW ARRIVAL", bg: "bg-white border border-slate-200", color: "text-slate-700" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2Y9VCMAYqrfdwL319_PJ01D597nh642tdmUHxuoprAtHQafCJwDdxIM3v0aiIEAymLIVAmhXz4CWmYs_kJZKxHIaDGqBAj8cmLHHqcsHWA_hlTZ9tT1xbAsTj-6wFpUc45i4c4bOWQSwug9gbkYa6g8Ia-zsUKYKozs0XrZrbXlPOUAfGznmGYvY1roGRhJAeDzInK5b7UV71QPal6EW4PtUkj5d1JSHNd_3OPoXEz65jyLkO-OrxEetAWER8igY3Zsdg02SxRqY"
  },
  {
    id: 4,
    brand: "Global Treats Ltd.",
    title: "Jumbo Gummy Bear 5lb Bag",
    price: 18.75,
    basePrice: 18.75,
    type: "Unit",
    unitPriceText: "$75.00 per case (4 units/case)",
    moq: "25 Cases",
    shipping: "Pre-Order",
    shippingIcon: "schedule",
    description: "Giant 5lb bag of assorted fruit gummy bears. Ideal for bulk bins and repackaging. Flavors include cherry, lime, lemon, orange, and pineapple.",
    badges: [],
    customBadges: [],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlOtbuxazz6j7gVdcqNV5MX8afhj0IK61ghyPsW0tfIOc59IKy6hrrPruX1gKyiujIiaaPiLwnWDQFWd16sop2xx1gtVJBDy2tekyefcEUVlGmFG78Uy7ZyGng2ILoUE5S2Y5lwf2cSVouUWRcjc11-5Nmp1T9tLEKiFK3OUl5icD9bGm8pvTOBKhfP-fefKzIdGFa_bhcDVygXUwVz_LsmtXXdYFMYusKNP_9hnUlrgR0wv2pL-5ORwSpv5Zq5fI9IfRaKOnkP0c"
  },
  {
    id: 5,
    brand: "Sky Blue Essentials",
    title: "Sea Salt Dark Chocolate...",
    price: 84.00,
    basePrice: 84.00,
    type: "Case",
    unitPriceText: "$7.00 per slab (12 slabs/case)",
    moq: "8 Cases",
    shipping: "Temperature Ctl",
    shippingIcon: "thermostat",
    description: "72% cacao dark chocolate slabs sprinkled with hand-harvested sea salt. Requires temperature controlled shipping during summer months.",
    badges: [],
    customBadges: [],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEYU1Z3F4wTXA-SIf3ITi5DsrUif13h3hJIJw-39DlhOOJ4pDowQLWcA9Igj8RtYC5JQaxGltiA4n3kQz3qsYw4u4mzbfh1jblW2w0Feg9gLX21w-CQUh4TXZ8Vbk83cURPuHfQl4Xr_KnC8jgo_xBpvn7CXZ2Oya6qaJV02vrlYlJWlf90v68W1hfgjg1DVgRL5RFmg5jRmsV-v8B-eD23Doy5E_2eE1wPYID_RxXErO9ckUdAJLfSJwt_NbnaoUAVs92hc0b-G4"
  },
  {
    id: 6,
    brand: "Global Treats Ltd.",
    title: "Assorted Fruit Hard Candies",
    price: 120.00,
    basePrice: 120.00,
    type: "Bulk Box",
    unitPriceText: "$0.05 per unit (approx. 2400 units)",
    moq: "2 Boxes",
    shipping: "Certified",
    shippingIcon: "verified_user",
    description: "Classic individually wrapped hard candies in assorted fruit flavors. Perfect for hospitality, banks, and offices.",
    badges: [],
    customBadges: [],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApCK91c23hYJEuSdNiPmFJccSLscxgd-OMs2o09CmzRQlk-jOqZR34DxRK6kNFXcP1c2Hxa9UMVN1tZJX-Qq9_9paBJAfmgs-at1PlH1LrJP3o-2FtSDBHN9u6bVbMYuOYfisPo10Br3Y-iEunzHRRNkiDizxt4kMuq6v_8oRucb1vdXDsn34fwss7Tj4FEpHsQ3rQAAkRweSz2qNK45WGqOHSSKzGRHGQB6-ljPtZYzsalOyCEby0kh4wowUaji40Ovwvjhse2ZM"
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'cart' | 'order-confirmation' | 'tracking' | 'support' | 'login' | 'admin'>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [showSplash, setShowSplash] = useState(true);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const navigateToCatalog = () => {
    window.scrollTo(0, 0);
    setCurrentPage('catalog');
  };

  const navigateToHome = () => {
    window.scrollTo(0, 0);
    setCurrentPage('home');
  };

  const navigateToCart = () => {
    window.scrollTo(0, 0);
    setCurrentPage('cart');
  };

  const navigateToOrderConfirmation = () => {
    window.scrollTo(0, 0);
    setCurrentPage('order-confirmation');
    clearCart();
  };

  const navigateToTracking = () => {
    window.scrollTo(0, 0);
    setCurrentPage('tracking');
  };

  const navigateToSupport = () => {
    window.scrollTo(0, 0);
    setCurrentPage('support');
  };

  const navigateToLogin = () => {
    window.scrollTo(0, 0);
    setCurrentPage('login');
  };

  const navigateToAdmin = () => {
    window.scrollTo(0, 0);
    setCurrentPage('admin');
  };

  const renderContent = () => {
    if (currentPage === 'login') {
      return (
          <Login 
            onNavigateHome={navigateToHome} 
            onNavigateToCatalog={navigateToCatalog} 
            onNavigateToAdmin={navigateToAdmin}
          />
      );
    }

    if (currentPage === 'admin') {
      return (
        <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
          <Admin 
            onNavigateHome={navigateToHome} 
            onNavigateToCatalog={navigateToCatalog}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            products={products}
          />
        </div>
      );
    }

    if (currentPage === 'catalog') {
      return (
        <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
          <Catalog 
            onNavigateHome={navigateToHome} 
            onNavigateToCart={navigateToCart} 
            cartCount={cartCount}
            onAddToCart={addToCart}
            products={products}
          />
          <Footer 
            onNavigateToCatalog={navigateToCatalog}
            onNavigateToSupport={navigateToSupport}
            onNavigateToHome={navigateToHome}
          />
        </div>
      );
    }

    if (currentPage === 'cart') {
      return (
        <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
          <Cart 
            onNavigateHome={navigateToHome} 
            onNavigateToCatalog={navigateToCatalog} 
            onNavigateToCheckout={navigateToOrderConfirmation}
            cartCount={cartCount}
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
          />
          <Footer 
            onNavigateToCatalog={navigateToCatalog}
            onNavigateToSupport={navigateToSupport}
            onNavigateToHome={navigateToHome}
          />
        </div>
      );
    }

    if (currentPage === 'order-confirmation') {
      return (
        <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
          <OrderConfirmation 
            onNavigateHome={navigateToHome} 
            onNavigateToCatalog={navigateToCatalog}
            onNavigateToTracking={navigateToTracking}
            onNavigateToSupport={navigateToSupport}
          />
          <Footer 
            onNavigateToCatalog={navigateToCatalog}
            onNavigateToSupport={navigateToSupport}
            onNavigateToHome={navigateToHome}
          />
        </div>
      );
    }

    if (currentPage === 'tracking') {
      return (
        <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
          <OrderTracking 
            onNavigateHome={navigateToHome} 
            onNavigateToCatalog={navigateToCatalog}
            onNavigateToSupport={navigateToSupport}
          />
          <Footer 
            onNavigateToCatalog={navigateToCatalog}
            onNavigateToSupport={navigateToSupport}
            onNavigateToHome={navigateToHome}
          />
        </div>
      );
    }

    if (currentPage === 'support') {
      return (
        <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
          <Support 
            onNavigateHome={navigateToHome} 
            onNavigateToCatalog={navigateToCatalog}
          />
          <Footer 
            onNavigateToCatalog={navigateToCatalog}
            onNavigateToSupport={navigateToSupport}
            onNavigateToHome={navigateToHome}
          />
        </div>
      );
    }

    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans">
        <Header 
          onNavigateToCatalog={navigateToCatalog} 
          onNavigateToHome={navigateToHome}
          onNavigateToSupport={navigateToSupport}
          onNavigateToLogin={navigateToLogin}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          cartCount={cartCount}
        />
        <main className="flex-1">
          <Hero 
            onNavigateToCatalog={navigateToCatalog} 
            onNavigateToSupport={navigateToSupport}
          />
          <StatsBar />
          <FeaturedProducts 
            onNavigateToCatalog={navigateToCatalog}
            onAddToCart={addToCart}
          />
          <TrustSection />
          <Newsletter />
        </main>
        <Footer 
          onNavigateToCatalog={navigateToCatalog}
          onNavigateToSupport={navigateToSupport}
          onNavigateToHome={navigateToHome}
        />
      </div>
    );
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {renderContent()}
    </>
  );
};

export default App;
